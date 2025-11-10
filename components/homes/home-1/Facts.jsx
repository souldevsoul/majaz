import Counter from "@/components/common/Counter";
import { counters } from "@/data/facts";
import React from "react";

export default function Facts() {
  return (
    <section className="boxcar-fun-fact-section" style={{
      padding: '5rem 0'
    }}>
      <div className="large-container">
        <div className="fact-counter">
          <div className="row">
            {/* Counter block Two*/}
            {counters.map((counter, index) => (
              <div
                className="counter-block col-lg-3 col-md-3 col-sm-4 wow fadeInUp"
                data-wow-delay={counter.wowDelay}
                key={index}
              >
                <div
                  className="inner wow fadeInUp"
                  data-wow-delay={counter.wowDelay}
                >
                  <div className="content">
                    <div
                      className="widget-counter"
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontWeight: '300',
                        fontSize: '3.5rem',
                        color: 'var(--majaz-gold)',
                        letterSpacing: '0.05em'
                      }}
                    >
                      <span className="count-text">
                        <Counter max={counter.stop} />
                      </span>
                      {index === 0 ? '+' : index === 1 ? '+' : index === 2 ? '%' : '%'}
                    </div>
                    <h6
                      className="counter-title"
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontWeight: '400',
                        fontSize: '0.9rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.15em',
                        color: '#D4AF37',
                        marginTop: '1rem'
                      }}
                    >{counter.title}</h6>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
