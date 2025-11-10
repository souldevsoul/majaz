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
        padding: '6rem 0'
      }}>
        <div className="large-container">
          <div className="row g-0">
            {/* image-column */}
            <div className="image-column col-lg-6 col-md-12 col-sm-12">
              <div className="inner-column">
                <div className="image-box">
                  <figure className="image">
                    <Image
                      alt="Professional vehicle inspection in Dubai"
                      src="/images/brand/inspection-scene.jpg"
                      width={836}
                      height={700}
                      style={{ objectFit: 'cover', borderRadius: '24px' }}
                    />
                  </figure>
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
                    marginBottom: '2rem',
                    lineHeight: '1.3'
                  }}>
                    Expert <span style={{ color: '#D4AF37' }}>Assessment</span>
                  </h2>
                </div>
                <ul
                  className="list-style-one wow fadeInUp"
                  data-wow-delay="100ms"
                  style={{ marginBottom: '2.5rem', listStyle: 'none', padding: 0 }}
                >
                  <li style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '1rem',
                    fontWeight: '400',
                    color: '#111111',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    marginBottom: '1rem',
                    display: 'flex',
                    alignItems: 'center'
                  }}>
                    <i className="fa-solid fa-check" style={{ color: '#D4AF37', marginRight: '1rem' }} />
                    200+ Point Inspection
                  </li>
                  <li style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '1rem',
                    fontWeight: '400',
                    color: '#111111',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    marginBottom: '1rem',
                    display: 'flex',
                    alignItems: 'center'
                  }}>
                    <i className="fa-solid fa-check" style={{ color: '#D4AF37', marginRight: '1rem' }} />
                    UAE Market Analysis
                  </li>
                  <li style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '1rem',
                    fontWeight: '400',
                    color: '#111111',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    display: 'flex',
                    alignItems: 'center'
                  }}>
                    <i className="fa-solid fa-check" style={{ color: '#D4AF37', marginRight: '1rem' }} />
                    Premium PDF Reports
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
