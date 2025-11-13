import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import TeamList from "@/components/otherPages/TeamList";

import React from "react";

export const metadata = {
  title: "Team List || MAJAZ - Premium Vehicle Assessment",
  description: "MAJAZ - Premium Vehicle Assessment",
};
export default function TeamListPage() {
  return (
    <>
      <Header1 headerClass="majaz-header header-style-v1 style-two inner-header cus-style-1" />
      <TeamList />

      <Footer1 parentClass="footer-style-one v1 cus-st-1" />
    </>
  );
}
