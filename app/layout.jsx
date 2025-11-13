"use client";
import FilterSidebar from "@/components/common/FilterSidebar";
import "./globals.css";
import "photoswipe/dist/photoswipe.css";
import "rc-slider/assets/index.css";
import "../public/css/bootstrap.min.css";
import "../public/css/slick-theme.css";
import "../public/css/slick.css";
import "../public/css/mmenu.css";
import "../public/css/style.css";
import "../public/custom.scss";
import { useEffect } from "react";
import MobileMenu from "@/components/headers/MobileMenu";
import Context from "@/context/Context";
import BackToTop from "@/components/common/BackToTop";
import { usePathname } from "next/navigation";

export default function RootLayout({ children }) {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Import Bootstrap
      import("bootstrap/dist/js/bootstrap.esm").then(() => {
        // Bootstrap loaded
      });
    }

    if (typeof window !== "undefined") {
      // Initialize WOW.js
      const { WOW } = require("wowjs");
      const wow = new WOW({
        mobile: false,
        live: false,
      });
      wow.init();
    }
  }, [pathname]);

  return (
    <html lang="en" dir="ltr">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>MAJAZ - Premium Vehicle Concierge for UAE</title>
        <meta
          name="description"
          content="Luxury vehicle assessment and concierge services in Dubai and UAE"
        />

        {/* MAJAZ Brand Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Raleway - Primary Font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Raleway:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />

        {/* Noto Sans Arabic - Arabic Support */}
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+Arabic:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Context>
          <MobileMenu />
          <div className="majaz-wrapper">
            {children}
          </div>
          <FilterSidebar />
        </Context>
        <BackToTop />
      </body>
    </html>
  );
}
