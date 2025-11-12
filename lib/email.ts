// Email service for MAJAZ
// This is a placeholder implementation. In production, integrate with:
// - Resend (recommended for Next.js)
// - SendGrid
// - AWS SES
// - Mailgun

interface EmailParams {
  to: string
  subject: string
  html: string
  text?: string
}

export async function sendEmail({ to, subject, html, text }: EmailParams) {
  // Development: Log email to console
  if (process.env.NODE_ENV === 'development') {
    console.log('=== EMAIL NOTIFICATION ===')
    console.log(`To: ${to}`)
    console.log(`Subject: ${subject}`)
    console.log(`Text: ${text || 'N/A'}`)
    console.log('==========================')
    return { success: true, messageId: 'dev-' + Date.now() }
  }

  // Production: Integrate with real email service
  // Example with Resend:
  /*
  const resend = new Resend(process.env.RESEND_API_KEY)

  const { data, error } = await resend.emails.send({
    from: 'MAJAZ <noreply@majaz.ae>',
    to,
    subject,
    html,
    text,
  })

  if (error) {
    throw new Error(`Email send failed: ${error.message}`)
  }

  return { success: true, messageId: data.id }
  */

  // Placeholder return
  console.warn('Email service not configured. Email not sent:', { to, subject })
  return { success: false, messageId: null }
}

export function generatePackagePurchaseEmail(
  customerName: string,
  packageName: string,
  packagePrice: number,
  currency: string,
  duration: string,
  locale: string = 'en'
): string {
  const isArabic = locale === 'ar'

  const durationLabels = {
    en: { monthly: 'Monthly', quarterly: 'Quarterly', annual: 'Annual' },
    ar: { monthly: 'شهري', quarterly: 'ربع سنوي', annual: 'سنوي' }
  }

  const durationLabel = durationLabels[isArabic ? 'ar' : 'en'][duration as keyof typeof durationLabels.en] || duration

  return `
<!DOCTYPE html>
<html lang="${isArabic ? 'ar' : 'en'}" dir="${isArabic ? 'rtl' : 'ltr'}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${isArabic ? 'تأكيد الاشتراك - مجاز' : 'Subscription Confirmation - MAJAZ'}</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background-color: #0A0A0A;
      color: #FFFFF0;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 40px 20px;
    }
    .header {
      text-align: center;
      padding: 30px 0;
      border-bottom: 2px solid #D4AF37;
    }
    .logo {
      font-size: 32px;
      font-weight: 300;
      letter-spacing: 0.2em;
      color: #D4AF37;
      text-transform: uppercase;
    }
    .content {
      padding: 40px 20px;
      background: rgba(26, 26, 26, 0.6);
      border-radius: 16px;
      margin: 30px 0;
      border: 1px solid rgba(212, 175, 55, 0.2);
    }
    h1 {
      font-size: 28px;
      font-weight: 300;
      color: #FFFFF0;
      margin: 0 0 20px 0;
      text-align: center;
      letter-spacing: 0.05em;
    }
    .package-details {
      background: rgba(0, 0, 0, 0.4);
      padding: 24px;
      border-radius: 12px;
      margin: 24px 0;
      border-left: 4px solid #D4AF37;
    }
    .detail-row {
      display: flex;
      justify-content: space-between;
      padding: 12px 0;
      border-bottom: 1px solid rgba(212, 175, 55, 0.1);
    }
    .detail-row:last-child {
      border-bottom: none;
    }
    .detail-label {
      color: rgba(255, 255, 240, 0.7);
      font-size: 14px;
    }
    .detail-value {
      color: #D4AF37;
      font-weight: 600;
      font-size: 16px;
    }
    .button {
      display: inline-block;
      padding: 16px 32px;
      background: linear-gradient(135deg, #D4AF37 0%, #B8941E 100%);
      color: #111111;
      text-decoration: none;
      border-radius: 8px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin: 20px auto;
      display: block;
      text-align: center;
      max-width: 250px;
    }
    .next-steps {
      margin: 30px 0;
    }
    .step {
      display: flex;
      gap: 12px;
      margin: 16px 0;
      align-items: flex-start;
    }
    .step-icon {
      width: 24px;
      height: 24px;
      background: #D4AF37;
      border-radius: 50%;
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #111111;
      font-weight: 700;
      font-size: 12px;
    }
    .step-text {
      color: rgba(255, 255, 240, 0.85);
      line-height: 1.6;
      font-size: 14px;
    }
    .footer {
      text-align: center;
      padding: 30px 20px;
      color: rgba(255, 255, 240, 0.5);
      font-size: 12px;
      border-top: 1px solid rgba(212, 175, 55, 0.2);
    }
    .footer a {
      color: #D4AF37;
      text-decoration: none;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo">MAJAZ</div>
      <p style="margin: 10px 0 0 0; color: rgba(255, 255, 240, 0.7); font-size: 14px;">
        ${isArabic ? 'خدمة الكونسيرج الفاخرة للمركبات في الإمارات' : 'Premium Vehicle Concierge for UAE'}
      </p>
    </div>

    <div class="content">
      <h1>${isArabic ? '🎉 مرحباً بك في مجاز' : '🎉 Welcome to MAJAZ'}</h1>

      <p style="text-align: center; color: rgba(255, 255, 240, 0.8); line-height: 1.6; margin: 0 0 30px 0;">
        ${isArabic
          ? `عزيزي ${customerName}،<br/>شكراً لك على اختيار مجاز. تم تفعيل اشتراكك بنجاح.`
          : `Dear ${customerName},<br/>Thank you for choosing MAJAZ. Your subscription has been successfully activated.`}
      </p>

      <div class="package-details">
        <div class="detail-row">
          <span class="detail-label">${isArabic ? 'الباقة' : 'Package'}</span>
          <span class="detail-value">${packageName}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">${isArabic ? 'المدة' : 'Duration'}</span>
          <span class="detail-value">${durationLabel}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">${isArabic ? 'المبلغ' : 'Amount'}</span>
          <span class="detail-value">${packagePrice.toLocaleString()} ${currency}</span>
        </div>
      </div>

      <a href="https://majaz.ae/${locale}/dashboard" class="button">
        ${isArabic ? 'انتقل إلى لوحة التحكم' : 'Go to Dashboard'}
      </a>

      <div class="next-steps">
        <h3 style="color: #D4AF37; font-size: 18px; margin: 0 0 20px 0; text-align: ${isArabic ? 'right' : 'left'};">
          ${isArabic ? 'الخطوات التالية:' : 'Next Steps:'}
        </h3>

        <div class="step">
          <div class="step-icon">1</div>
          <div class="step-text">
            ${isArabic
              ? 'سيتصل بك مدير الكونسيرج المخصص لك خلال 24 ساعة لتعريفك بخدماتنا.'
              : 'Your dedicated concierge manager will contact you within 24 hours to introduce our services.'}
          </div>
        </div>

        <div class="step">
          <div class="step-icon">2</div>
          <div class="step-text">
            ${isArabic
              ? 'يمكنك الآن الوصول إلى لوحة التحكم الخاصة بك وإدارة طلبات التقييم.'
              : 'You can now access your dashboard and manage assessment requests.'}
          </div>
        </div>

        <div class="step">
          <div class="step-icon">3</div>
          <div class="step-text">
            ${isArabic
              ? 'تحقق من بريدك الوارد للحصول على دليل البدء والموارد الحصرية للأعضاء.'
              : 'Check your inbox for your getting started guide and exclusive member resources.'}
          </div>
        </div>
      </div>
    </div>

    <div class="footer">
      <p style="margin: 0 0 10px 0;">
        ${isArabic ? 'هل تحتاج إلى مساعدة؟' : 'Need help?'}
        <a href="mailto:support@majaz.ae">support@majaz.ae</a>
      </p>
      <p style="margin: 0;">
        ${isArabic
          ? '© 2024 مجاز. جميع الحقوق محفوظة.'
          : '© 2024 MAJAZ. All rights reserved.'}
      </p>
    </div>
  </div>
</body>
</html>
  `
}

export function getPackagePurchaseTextEmail(
  customerName: string,
  packageName: string,
  packagePrice: number,
  currency: string,
  duration: string,
  locale: string = 'en'
): string {
  const isArabic = locale === 'ar'

  if (isArabic) {
    return `
مجاز - تأكيد الاشتراك

عزيزي ${customerName}،

شكراً لك على اختيار مجاز. تم تفعيل اشتراكك بنجاح.

تفاصيل الاشتراك:
- الباقة: ${packageName}
- المدة: ${duration}
- المبلغ: ${packagePrice.toLocaleString()} ${currency}

الخطوات التالية:
1. سيتصل بك مدير الكونسيرج المخصص لك خلال 24 ساعة
2. يمكنك الآن الوصول إلى لوحة التحكم الخاصة بك
3. تحقق من بريدك الوارد للحصول على دليل البدء

هل تحتاج إلى مساعدة؟ اتصل بنا على support@majaz.ae

© 2024 مجاز. جميع الحقوق محفوظة.
    `.trim()
  }

  return `
MAJAZ - Subscription Confirmation

Dear ${customerName},

Thank you for choosing MAJAZ. Your subscription has been successfully activated.

Subscription Details:
- Package: ${packageName}
- Duration: ${duration}
- Amount: ${packagePrice.toLocaleString()} ${currency}

Next Steps:
1. Your dedicated concierge manager will contact you within 24 hours
2. You can now access your dashboard
3. Check your inbox for your getting started guide

Need help? Contact us at support@majaz.ae

© 2024 MAJAZ. All rights reserved.
  `.trim()
}
