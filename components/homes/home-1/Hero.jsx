"use client";
import Link from "next/link";
import Image from "next/image";
import React from "react";

export default function Hero() {
  return (
    <section className="boxcar-banner-section-v1">
      <div className="boxcar-banner-section">
        <Image
          alt="MAJAZ Hero"
          src="/images/brand/hero-majaz-dubai.jpg"
          fill
          className="banner-img"
          priority
          style={{ objectFit: "cover" }}
        />
        <div className="transform-center">
          <div className="banner-content">
            <div
              className="logo-section wow fadeInUp"
              style={{ marginBottom: "3rem" }}
            >
              <h1
                style={{
                  fontFamily: "Raleway, sans-serif",
                  fontSize: "6rem",
                  fontWeight: "800",
                  color: "#D4AF37",
                  marginBottom: "1rem",
                  letterSpacing: "0.05em",
                }}
              >
                MAJAZ
              </h1>
              <div
                style={{
                  fontFamily: "Noto Sans Arabic, sans-serif",
                  fontSize: "4rem",
                  fontWeight: "700",
                  color: "#D4AF37",
                  marginBottom: "2rem",
                }}
              >
                مجاز
              </div>
            </div>

            <span
              className="wow fadeInUp"
              style={{
                fontSize: "1.25rem",
                color: "#FFFFFF",
                fontWeight: "400",
                fontFamily: "Raleway, sans-serif",
                display: "block",
                marginBottom: "1.5rem",
                textTransform: "uppercase",
                letterSpacing: "0.2em",
              }}
            >
              Exclusive Vehicle Concierge
            </span>

            <h2
              className="wow fadeInUp"
              data-wow-delay="100ms"
              style={{
                fontSize: "3.5rem",
                color: "#FFFFFF",
                fontFamily: "Raleway, sans-serif",
                fontWeight: "200",
                marginBottom: "2rem",
                lineHeight: "1.3",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
              }}
            >
              Never Buy or Sell <br />
              <span style={{ color: "#D4AF37" }}>a Car Alone Again</span>
            </h2>

            <p
              className="wow fadeInUp"
              data-wow-delay="200ms"
              style={{
                fontSize: "1.25rem",
                color: "rgba(255, 255, 255, 0.9)",
                maxWidth: "750px",
                marginBottom: "1.5rem",
                lineHeight: "1.7",
                fontFamily: "Raleway, sans-serif",
                fontWeight: "400",
              }}
            >
              Expert pre-purchase inspections • Market intelligence • Auction representation • Global vehicle sourcing • White-glove concierge service
            </p>

            <p
              className="wow fadeInUp"
              data-wow-delay="250ms"
              style={{
                fontSize: "1rem",
                color: "rgba(255, 255, 255, 0.7)",
                maxWidth: "700px",
                marginBottom: "3rem",
                lineHeight: "1.6",
                fontFamily: "Raleway, sans-serif",
                fontWeight: "300",
                fontStyle: "italic",
              }}
            >
              From 49 AED inspections to $10,000/year concierge memberships. Dubai's premier automotive advisory for discerning collectors.
            </p>

            <div
              className="btn-box wow fadeInUp"
              data-wow-delay="300ms"
              style={{
                display: "flex",
                gap: "1.5rem",
                justifyContent: "flex-start",
                flexWrap: "wrap",
              }}
            >
              <Link href="/en/interview" className="theme-btn">
                <button
                  type="button"
                  style={{
                    background:
                      "linear-gradient(135deg, #D4AF37 0%, #B8941E 100%)",
                    color: "#111111",
                    border: "none",
                    padding: "1.25rem 3rem",
                    fontSize: "1.125rem",
                    fontWeight: "600",
                    borderRadius: "12px",
                    cursor: "pointer",
                    boxShadow: "0 4px 20px rgba(212, 175, 55, 0.5)",
                    transition: "all 0.3s ease",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <rect x="9" y="2" width="6" height="11" rx="3" stroke="currentColor" strokeWidth="2"/>
                    <path d="M5 10v1a7 7 0 0014 0v-1M12 18v4m-4 0h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                  Speak with AI Advisor
                </button>
              </Link>
              <Link href="/en/what-we-offer" className="theme-btn-secondary">
                <button
                  type="button"
                  style={{
                    background: "rgba(255, 255, 255, 0.05)",
                    color: "#FFFFFF",
                    border: "2px solid rgba(212, 175, 55, 0.6)",
                    padding: "1.25rem 3rem",
                    fontSize: "1.125rem",
                    fontWeight: "600",
                    borderRadius: "12px",
                    cursor: "pointer",
                    backdropFilter: "blur(10px)",
                    transition: "all 0.3s ease",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                  }}
                >
                  Explore Services
                </button>
              </Link>
            </div>

            <div
              className="services-quick-links wow fadeInUp"
              data-wow-delay="400ms"
              style={{
                marginTop: "3rem",
                display: "flex",
                gap: "2.5rem",
                justifyContent: "flex-start",
                flexWrap: "wrap",
                alignItems: "center",
              }}
            >
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                color: "rgba(255, 255, 255, 0.8)",
                fontSize: "0.875rem",
                fontWeight: "400",
                letterSpacing: "0.05em",
              }}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M8 1l2 6 6 0-5 4 2 6-5-4-5 4 2-6-5-4 6 0z" fill="#D4AF37"/>
                </svg>
                5000+ Vehicles Assessed
              </div>
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                color: "rgba(255, 255, 255, 0.8)",
                fontSize: "0.875rem",
                fontWeight: "400",
                letterSpacing: "0.05em",
              }}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M8 1l2 6 6 0-5 4 2 6-5-4-5 4 2-6-5-4 6 0z" fill="#D4AF37"/>
                </svg>
                98% Accuracy Rate
              </div>
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                color: "rgba(255, 255, 255, 0.8)",
                fontSize: "0.875rem",
                fontWeight: "400",
                letterSpacing: "0.05em",
              }}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M8 1l2 6 6 0-5 4 2 6-5-4-5 4 2-6-5-4 6 0z" fill="#D4AF37"/>
                </svg>
                UAE's First AI Concierge
              </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx global>{`
        /* Remove header background and make it transparent */
        .boxcar-header {
          background: transparent !important;
          position: absolute !important;
          top: 0 !important;
          left: 0 !important;
          right: 0 !important;
          z-index: 999 !important;
        }

        /* White text for all header elements */
        .boxcar-header .navigation a,
        .boxcar-header .navigation button,
        .boxcar-header .right-box a,
        .boxcar-header .right-box button,
        .boxcar-header .logo-box a,
        .boxcar-header .logo-box span,
        .boxcar-header a,
        .boxcar-header button {
          color: #ffffff !important;
        }

        .boxcar-header .navigation a:hover,
        .boxcar-header .right-box a:hover {
          color: #d4af37 !important;
        }

        /* Use Raleway fonts */
        body {
          font-family: 'Raleway', sans-serif !important;
        }

        body[dir="rtl"] {
          font-family: 'Noto Sans Arabic', sans-serif !important;
        }

        .boxcar-banner-section-v1 {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          overflow: hidden;
          width: 100%;
          margin: 0;
          padding: 0;
        }

        .boxcar-banner-section {
          position: relative;
          width: 100vw;
          height: 100vh;
          margin: 0;
          padding: 0;
        }

        .banner-img {
          z-index: 0;
        }

        .transform-center {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          background: linear-gradient(
            90deg,
            rgba(10, 10, 10, 0.8) 0%,
            rgba(10, 10, 10, 0.4) 50%,
            rgba(10, 10, 10, 0.1) 100%
          );
          z-index: 1;
          padding-left: 5rem;
        }

        .banner-content {
          text-align: left;
          padding: 2rem;
          max-width: 1000px;
        }

        .theme-btn button:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 24px rgba(212, 175, 55, 0.6) !important;
        }

        .theme-btn-secondary button:hover {
          background: rgba(212, 175, 55, 0.2) !important;
          border-color: #e5c76b !important;
        }

        .services-quick-links a:hover {
          border-bottom-color: #d4af37 !important;
          color: #e5c76b !important;
        }

        @media (max-width: 768px) {
          .logo-section h1 {
            font-size: 2.5rem !important;
          }
          .logo-section div {
            font-size: 2rem !important;
          }
          h2 {
            font-size: 2rem !important;
          }
          p {
            font-size: 1.1rem !important;
          }
        }
      `}</style>
    </section>
  );
}
