import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { prisma } from "@/lib/db";
import { sendEmail, generatePackagePurchaseEmail, getPackagePurchaseTextEmail } from "@/lib/email";
import { getPackageBySlug } from "@/data/packages";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = request.headers.get("stripe-signature");

    if (!signature) {
      return NextResponse.json(
        { success: false, error: "No signature provided" },
        { status: 400 }
      );
    }

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err: any) {
      console.error("Webhook signature verification failed:", err.message);
      return NextResponse.json(
        { success: false, error: `Webhook Error: ${err.message}` },
        { status: 400 }
      );
    }

    // Handle the event
    switch (event.type) {
      case "payment_intent.succeeded": {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        await handlePaymentSuccess(paymentIntent);
        break;
      }

      case "payment_intent.payment_failed": {
        const failedPayment = event.data.object as Stripe.PaymentIntent;
        await handlePaymentFailure(failedPayment);
        break;
      }

      case "charge.refunded": {
        const refund = event.data.object as Stripe.Charge;
        await handleRefund(refund);
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ success: true, received: true });

  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { success: false, error: "Webhook handler failed" },
      { status: 500 }
    );
  }
}

async function handlePaymentSuccess(paymentIntent: Stripe.PaymentIntent) {
  try {
    const paymentId = paymentIntent.id;
    const metadata = paymentIntent.metadata;

    // Check if this is a package purchase
    const packageId = metadata.packageId;
    const duration = metadata.duration;
    const customerEmail = paymentIntent.receipt_email || metadata.customerEmail;
    const customerName = metadata.customerName || 'Valued Customer';

    if (packageId && duration && customerEmail) {
      // This is a package purchase, send confirmation email
      try {
        const pkg = await getPackageBySlug(metadata.packageSlug || packageId);

        if (pkg) {
          const packageName = metadata.locale === 'ar' ? pkg.nameAr : pkg.name;
          const price = pkg.price[duration as 'monthly' | 'quarterly' | 'annual'];

          await sendEmail({
            to: customerEmail,
            subject: metadata.locale === 'ar'
              ? `تأكيد الاشتراك في ${packageName} - مجاز`
              : `${packageName} Subscription Confirmed - MAJAZ`,
            html: generatePackagePurchaseEmail(
              customerName,
              packageName,
              price,
              pkg.currency,
              duration,
              metadata.locale || 'en'
            ),
            text: getPackagePurchaseTextEmail(
              customerName,
              packageName,
              price,
              pkg.currency,
              duration,
              metadata.locale || 'en'
            )
          });

          console.log(`Package purchase confirmation email sent to ${customerEmail}`);
        }
      } catch (emailError) {
        console.error("Error sending package purchase email:", emailError);
      }
    }

    // Handle regular request payments
    const request = await prisma.request.findFirst({
      where: {
        OR: [
          { stripePaymentId: paymentId },
          { stripeDepositId: paymentId }
        ]
      }
    });

    if (request) {
      const isDeposit = metadata.type === "deposit";

      // Update request
      await prisma.request.update({
        where: { id: request.id },
        data: {
          status: "PAYMENT_RECEIVED",
          paidAt: new Date(),
        }
      });

      // Create event log
      await prisma.event.create({
        data: {
          requestId: request.id,
          type: isDeposit ? "DEPOSIT_RECEIVED" : "PAYMENT_RECEIVED",
          description: isDeposit
            ? `Deposit payment received: AED ${(paymentIntent.amount / 100).toFixed(2)}`
            : `Service fee payment received: AED ${(paymentIntent.amount / 100).toFixed(2)}`,
          payload: {
            paymentIntentId: paymentId,
            amount: paymentIntent.amount / 100,
            currency: paymentIntent.currency,
            isDeposit,
          }
        }
      });

      console.log(`Payment successful for request ${request.id}`);
    }
  } catch (error) {
    console.error("Error handling payment success:", error);
  }
}

async function handlePaymentFailure(paymentIntent: Stripe.PaymentIntent) {
  try {
    const paymentId = paymentIntent.id;

    // Find request by payment ID
    const request = await prisma.request.findFirst({
      where: {
        OR: [
          { stripePaymentId: paymentId },
          { stripeDepositId: paymentId }
        ]
      }
    });

    if (!request) {
      console.error("Request not found for failed payment:", paymentId);
      return;
    }

    // Update request status
    await prisma.request.update({
      where: { id: request.id },
      data: {
        status: "FAILED",
      }
    });

    // Create event log
    await prisma.event.create({
      data: {
        requestId: request.id,
        type: "STATUS_CHANGED",
        description: "Payment failed",
        payload: {
          paymentIntentId: paymentId,
          error: paymentIntent.last_payment_error?.message,
        }
      }
    });

    console.log(`Payment failed for request ${request.id}`);
  } catch (error) {
    console.error("Error handling payment failure:", error);
  }
}

async function handleRefund(charge: Stripe.Charge) {
  try {
    const paymentIntentId = charge.payment_intent as string;

    // Find request by payment ID
    const request = await prisma.request.findFirst({
      where: {
        OR: [
          { stripePaymentId: paymentIntentId },
          { stripeDepositId: paymentIntentId }
        ]
      }
    });

    if (!request) {
      console.error("Request not found for refund:", paymentIntentId);
      return;
    }

    // Update request status
    await prisma.request.update({
      where: { id: request.id },
      data: {
        status: "REFUNDED",
      }
    });

    // Create event log
    await prisma.event.create({
      data: {
        requestId: request.id,
        type: "REFUND_ISSUED",
        description: `Refund issued: AED ${(charge.amount_refunded / 100).toFixed(2)}`,
        payload: {
          chargeId: charge.id,
          amountRefunded: charge.amount_refunded / 100,
          currency: charge.currency,
        }
      }
    });

    console.log(`Refund processed for request ${request.id}`);
  } catch (error) {
    console.error("Error handling refund:", error);
  }
}
