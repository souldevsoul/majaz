import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import Features from "@/components/homes/home-1/Features";
import Features2 from "@/components/homes/home-1/Features2";
import Team from "@/components/homes/home-5/Team";
import Testimonials from "@/components/homes/home-6/Testimonials";
import About from "@/components/otherPages/About";
import Brands from "@/components/otherPages/Brands";
import Facts from "@/components/otherPages/Facts";
import Faqs from "@/components/otherPages/Faqs";
import React from "react";

export const metadata = {
  title: "About || MAJAZ - Premium Vehicle Assessment",
  description: "MAJAZ - Premium Vehicle Assessment",
};
export default function AboutPage() {
  return (
    <>
      <Header1 headerClass="majaz-header header-style-v1 style-two inner-header cus-style-1" />
      <section className="about-inner-one layout-radius">
        <About />
        <Features2 />
        <Features />
        <Facts />

        <Brands />
        <Team />
        <Testimonials />
        <Faqs />
      </section>
      <Footer1 parentClass="footer-style-one v1 cus-st-1" />
    </>
  );
}
