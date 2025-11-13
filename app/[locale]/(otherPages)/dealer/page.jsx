import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import Dealer from "@/components/otherPages/Dealer";

import React from "react";

export const metadata = {
  title: "Dealer || MAJAZ - Premium Vehicle Assessment",
  description: "MAJAZ - Premium Vehicle Assessment",
};
export default function DealerPage() {
  return (
    <>
      <Header1 headerClass="majaz-header header-style-v1 style-two inner-header cus-style-1" />
      <Dealer />

      <Footer1 parentClass="footer-style-one v1 cus-st-1" />
    </>
  );
}
