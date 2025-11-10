"use client";
import Link from "next/link";
import { useState } from "react";
import ModalVideo from "react-modal-video";
import Image from "next/image";
export default function Features() {
  const [isOpen, setOpen] = useState(false);
  return (
    <>
      <section className="boxcar-pricing-section pb-0 pt-0" style={{
        background: '#FFFFFF',
        padding: '6rem 0'
      }}>
        <div className="large-container">
          <div className="row g-0">
            {/* image-column */}
            <div className="image-column col-lg-6 col-md-12 col-sm-12">
              <div className="inner-column">
                <div className="image-box">
                  <figure className="image">
                    <a href="#">
                      <Image
                        alt=""
                        src="/images/resource/pricing1-1.jpg"
                        width={836}
                        height={700}
                      />
                    </a>
                  </figure>
                  <a
                    onClick={() => setOpen(true)}
                    className="play-now"
                    data-caption=""
                    style={{
                      background: 'linear-gradient(135deg, #D4AF37 0%, #B8941E 100%)',
                      boxShadow: '0 8px 24px rgba(212, 175, 55, 0.4)'
                    }}
                  >
                    <i className="fa fa-play" aria-hidden="true" style={{ color: '#111111' }} />
                    <span className="ripple" />
                  </a>
                </div>
              </div>
            </div>
            <div className="content-column col-lg-6 col-md-12 col-sm-12">
              <div className="inner-column" style={{ padding: '3rem' }}>
                <div className="boxcar-title wow fadeInUp">
                  <h2 style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '2.5rem',
                    fontWeight: '200',
                    color: '#111111',
                    textTransform: 'uppercase',
                    letterSpacing: '0.15em',
                    marginBottom: '1.5rem',
                    lineHeight: '1.3'
                  }}>
                    Expert <span style={{ color: '#D4AF37' }}>Pre-Purchase</span> Vehicle Assessment in Dubai
                  </h2>
                  <div className="text" style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '1.1rem',
                    fontWeight: '300',
                    color: '#666666',
                    lineHeight: '1.8',
                    marginBottom: '2rem'
                  }}>
                    MAJAZ provides comprehensive vehicle intelligence and expert assessment services to protect your investment in the UAE automotive market.
                  </div>
                </div>
                <ul
                  className="list-style-one wow fadeInUp"
                  data-wow-delay="100ms"
                  style={{ marginBottom: '2.5rem' }}
                >
                  <li style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '1rem',
                    fontWeight: '400',
                    color: '#111111',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    marginBottom: '1rem'
                  }}>
                    <i className="fa-solid fa-check" style={{ color: '#D4AF37', marginRight: '1rem' }} />
                    Comprehensive 200+ Point Inspection by Certified Technicians
                  </li>
                  <li style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '1rem',
                    fontWeight: '400',
                    color: '#111111',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    marginBottom: '1rem'
                  }}>
                    <i className="fa-solid fa-check" style={{ color: '#D4AF37', marginRight: '1rem' }} />
                    Real-Time UAE and GCC Market Analysis with Fair Value Assessment
                  </li>
                  <li style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '1rem',
                    fontWeight: '400',
                    color: '#111111',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                  }}>
                    <i className="fa-solid fa-check" style={{ color: '#D4AF37', marginRight: '1rem' }} />
                    Premium PDF Reports with Detailed Insights in English and Arabic
                  </li>
                </ul>
                <Link
                  href={`/en/requests/new`}
                  className="read-more wow fadeInUp"
                  data-wow-delay="200ms"
                  style={{
                    background: 'linear-gradient(135deg, #D4AF37 0%, #B8941E 100%)',
                    color: '#111111',
                    border: 'none',
                    padding: '1rem 2.5rem',
                    fontSize: '1rem',
                    fontWeight: '600',
                    borderRadius: '8px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    boxShadow: '0 4px 16px rgba(212, 175, 55, 0.4)',
                    transition: 'all 0.3s ease',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.75rem'
                  }}
                >
                  Begin Assessment
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={14}
                    height={14}
                    viewBox="0 0 14 14"
                    fill="none"
                  >
                    <g clipPath="url(#clip0_634_2156)">
                      <path
                        d="M13.6106 0H5.05509C4.84013 0 4.66619 0.173943 4.66619 0.388901C4.66619 0.603859 4.84013 0.777802 5.05509 0.777802H12.6719L0.113453 13.3362C-0.0384687 13.4881 -0.0384687 13.7342 0.113453 13.8861C0.189396 13.962 0.288927 14 0.388422 14C0.487917 14 0.587411 13.962 0.663391 13.8861L13.2218 1.3277V8.94447C13.2218 9.15943 13.3957 9.33337 13.6107 9.33337C13.8256 9.33337 13.9996 9.15943 13.9996 8.94447V0.388901C13.9995 0.173943 13.8256 0 13.6106 0Z"
                        fill="#111111"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_634_2156">
                        <rect width={14} height={14} fill="#111111" />
                      </clipPath>
                    </defs>
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <ModalVideo
        channel="youtube"
        youtube={{ mute: 0, autoplay: 0 }}
        isOpen={isOpen}
        videoId="AC1cREPIw_o"
        onClose={() => setOpen(false)}
      />{" "}
    </>
  );
}
