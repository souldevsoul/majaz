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
              style={{ marginBottom: "2rem" }}
            >
              <h1
                style={{
                  fontFamily: "Playfair Display, serif",
                  fontSize: "4rem",
                  fontWeight: "700",
                  color: "#D4AF37",
                  textShadow: "2px 2px 8px rgba(0,0,0,0.8)",
                  marginBottom: "0.5rem",
                  letterSpacing: "0.1em",
                }}
              >
                MAJAZ
              </h1>
              <div
                style={{
                  fontFamily: "IBM Plex Sans Arabic, sans-serif",
                  fontSize: "3rem",
                  fontWeight: "600",
                  color: "#D4AF37",
                  textShadow: "2px 2px 8px rgba(0,0,0,0.8)",
                  marginBottom: "1rem",
                }}
              >
                مجاز
              </div>
            </div>

            <span
              className="wow fadeInUp"
              style={{
                fontSize: "1.2rem",
                color: "#FFFFF0",
                textShadow: "1px 1px 4px rgba(0,0,0,0.8)",
                fontWeight: "500",
              }}
            >
              Premium Vehicle Concierge for UAE
            </span>

            <h2
              className="wow fadeInUp"
              data-wow-delay="100ms"
              style={{
                fontSize: "3rem",
                color: "#FFFFF0",
                textShadow: "2px 2px 6px rgba(0,0,0,0.8)",
                fontFamily: "Playfair Display, serif",
                marginTop: "1rem",
                marginBottom: "2rem",
              }}
            >
              Bespoke Vehicle Intelligence
            </h2>

            <p
              className="wow fadeInUp"
              data-wow-delay="200ms"
              style={{
                fontSize: "1.3rem",
                color: "#FFFFF0",
                textShadow: "1px 1px 4px rgba(0,0,0,0.8)",
                maxWidth: "800px",
                margin: "0 auto 2rem",
                lineHeight: "1.6",
              }}
            >
              Expert pre-purchase assessment, market analysis, and white-glove
              concierge service for discerning buyers in Dubai and the UAE
            </p>

            <div
              className="btn-box wow fadeInUp"
              data-wow-delay="300ms"
              style={{
                display: "flex",
                gap: "1.5rem",
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <Link href="/en/requests/new" className="theme-btn">
                <button
                  type="button"
                  style={{
                    background:
                      "linear-gradient(135deg, #D4AF37 0%, #B8941E 100%)",
                    color: "#111111",
                    border: "none",
                    padding: "1rem 2.5rem",
                    fontSize: "1.1rem",
                    fontWeight: "600",
                    borderRadius: "8px",
                    cursor: "pointer",
                    boxShadow: "0 4px 16px rgba(212, 175, 55, 0.4)",
                    transition: "all 0.3s ease",
                  }}
                >
                  Begin Assessment
                </button>
              </Link>
              <Link href="/en/about" className="theme-btn-secondary">
                <button
                  type="button"
                  style={{
                    background: "rgba(255, 255, 240, 0.1)",
                    color: "#FFFFF0",
                    border: "2px solid #D4AF37",
                    padding: "1rem 2.5rem",
                    fontSize: "1.1rem",
                    fontWeight: "600",
                    borderRadius: "8px",
                    cursor: "pointer",
                    backdropFilter: "blur(10px)",
                    transition: "all 0.3s ease",
                  }}
                >
                  Learn More
                </button>
              </Link>
            </div>

            <div
              className="services-quick-links wow fadeInUp"
              data-wow-delay="400ms"
              style={{
                marginTop: "3rem",
                display: "flex",
                gap: "2rem",
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <Link
                href="/en/pricing"
                style={{
                  color: "#D4AF37",
                  textDecoration: "none",
                  fontSize: "1rem",
                  fontWeight: "500",
                  textShadow: "1px 1px 3px rgba(0,0,0,0.8)",
                  transition: "all 0.3s ease",
                  borderBottom: "1px solid transparent",
                }}
              >
                View Pricing
              </Link>
              <Link
                href="/en/how-it-works"
                style={{
                  color: "#D4AF37",
                  textDecoration: "none",
                  fontSize: "1rem",
                  fontWeight: "500",
                  textShadow: "1px 1px 3px rgba(0,0,0,0.8)",
                  transition: "all 0.3s ease",
                }}
              >
                How It Works
              </Link>
              <Link
                href="/en/contact"
                style={{
                  color: "#D4AF37",
                  textDecoration: "none",
                  fontSize: "1rem",
                  fontWeight: "500",
                  textShadow: "1px 1px 3px rgba(0,0,0,0.8)",
                  transition: "all 0.3s ease",
                }}
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
      <style jsx global>{`
        .boxcar-header .navigation a,
        .boxcar-header .navigation button,
        .boxcar-header .right-box a,
        .boxcar-header .right-box button,
        .boxcar-header .logo-box a {
          color: #fffff0 !important;
        }

        .boxcar-header .navigation a:hover {
          color: #d4af37 !important;
        }

        .boxcar-header {
          background: rgba(10, 10, 10, 0.8) !important;
          backdrop-filter: blur(10px);
        }

        .boxcar-banner-section-v1 {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
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
          justify-content: center;
          background: linear-gradient(
            180deg,
            rgba(10, 10, 10, 0.3) 0%,
            rgba(10, 10, 10, 0.7) 100%
          );
          z-index: 1;
        }

        .banner-content {
          text-align: center;
          padding: 2rem;
          max-width: 1200px;
          margin: 0 auto;
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
