import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import Terms from "@/components/otherPages/Terms";

import React from "react";

export const metadata = {
  title: "Terms || MAJAZ - Premium Vehicle Assessment",
  description: "MAJAZ - Premium Vehicle Assessment",
};
export default function TermsPage() {
  return (
    <>
      <Header1 headerClass="majaz-header header-style-v1 style-two inner-header cus-style-1" />
      <Terms />

      <Footer1 parentClass="footer-style-one v1 cus-st-1" />
    </>
  );
}
