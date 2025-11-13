import Invoice from "@/components/otherPages/Invoice";
import React from "react";

export const metadata = {
  title: "Invoice || MAJAZ - Premium Vehicle Assessment",
  description: "MAJAZ - Premium Vehicle Assessment",
};
export default function InvoicePage() {
  return (
    <div className="wrapper-invoice">
      <Invoice />
    </div>
  );
}
