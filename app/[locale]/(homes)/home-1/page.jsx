import Footer1 from "@/components/footers/Footer1";
import Hero from "@/components/homes/home-1/Hero";
import Facts from "@/components/homes/home-1/Facts";
import Features from "@/components/homes/home-1/Features";
import Features2 from "@/components/homes/home-1/Features2";
import Testimonials from "@/components/homes/home-1/Testimonials";
import Cta from "@/components/common/Cta";

export const metadata = {
  title: "MAJAZ - Premium Vehicle Concierge for UAE",
  description: "Luxury vehicle assessment and concierge services in Dubai and UAE. Expert pre-purchase inspections, market analysis, and white-glove concierge service.",
};

export default function HomePage1() {
  return (
    <>
      <Hero />
      <Facts />
      <Features />
      <Features2 />
      <Testimonials />
      <Cta />
      <Footer1 />
    </>
  );
}
