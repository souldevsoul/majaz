import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import Compare from "@/components/otherPages/Compare";

import React from "react";

export const metadata = {
  title: "Compare || MAJAZ - Premium Vehicle Assessment",
  description: "MAJAZ - Premium Vehicle Assessment",
};
export default function ComparePage() {
  return (
    <>
      <Header1 headerClass="majaz-header header-style-v1 style-two inner-header cus-style-1" />
      <Compare />

      <Footer1 parentClass="footer-style-one v1 cus-st-1" />
    </>
  );
}
