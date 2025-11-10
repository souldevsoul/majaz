"use client";
import Image from "next/image";
import Link from "next/link";

const trendingVehicles = [
  {
    id: 1,
    name: "Rolls-Royce Phantom",
    price: "From AED 2,850,000",
    image: "/images/vehicles/rolls-royce-phantom.jpg",
    badge: "#1 Ultra-Luxury",
    color: "Bespoke"
  },
  {
    id: 2,
    name: "Bentley Continental GT",
    price: "From AED 1,200,000",
    image: "/images/vehicles/bentley-continental-gt.jpg",
    badge: "#2 Grand Tourer",
    color: "Glacier White"
  },
  {
    id: 3,
    name: "Mercedes-Benz S-Class",
    price: "From AED 650,000",
    image: "/images/vehicles/mercedes-s-class.jpg",
    badge: "#3 Executive",
    color: "Obsidian Black"
  },
  {
    id: 4,
    name: "Porsche 911 Turbo S",
    price: "From AED 985,000",
    image: "/images/vehicles/porsche-911.jpg",
    badge: "#4 Sports Icon",
    color: "GT Silver"
  },
  {
    id: 5,
    name: "Range Rover Autobiography",
    price: "From AED 750,000",
    image: "/images/vehicles/range-rover.jpg",
    badge: "#5 Luxury SUV",
    color: "Santorini Black"
  },
  {
    id: 6,
    name: "Ferrari 296 GTB",
    price: "From AED 1,800,000",
    image: "/images/vehicles/ferrari-296.jpg",
    badge: "#6 Supercar",
    color: "Rosso Corsa"
  },
  {
    id: 7,
    name: "Lamborghini Urus",
    price: "From AED 1,100,000",
    image: "/images/vehicles/lamborghini-urus.jpg",
    badge: "#7 Super SUV",
    color: "Pearl Capsule"
  },
  {
    id: 8,
    name: "Aston Martin DBX707",
    price: "From AED 1,050,000",
    image: "/images/vehicles/aston-martin-dbx.jpg",
    badge: "#8 Performance SUV",
    color: "Stirling Green"
  },
  {
    id: 9,
    name: "BMW M8 Competition",
    price: "From AED 725,000",
    image: "/images/vehicles/bmw-m8.jpg",
    badge: "#9 M Performance",
    color: "Frozen Marina Bay Blue"
  },
  {
    id: 10,
    name: "Maserati MC20",
    price: "From AED 975,000",
    image: "/images/vehicles/maserati-mc20.jpg",
    badge: "#10 Italian Exotic",
    color: "Bianco Audace"
  }
];

export default function TrendingVehicles() {
  return (
    <section className="trending-vehicles-section">
      <div className="boxcar-container">
        <div className="boxcar-title wow fadeInUp">
          <h2 className="title" style={{
            fontFamily: 'var(--font-display)',
            fontSize: '3rem',
            fontWeight: '300',
            color: 'var(--majaz-text-primary)',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            marginBottom: '1rem'
          }}>
            Top 10 Trending <span style={{color: 'var(--majaz-gold)'}}>Luxury Vehicles</span>
          </h2>
          <p className="subtitle" style={{
            fontFamily: 'var(--font-body)',
            fontSize: '1.125rem',
            color: 'var(--majaz-text-muted)',
            fontWeight: '300',
            letterSpacing: '0.05em'
          }}>
            Most sought-after premium vehicles in the UAE market
          </p>
        </div>

        <div className="trending-grid">
          {trendingVehicles.map((vehicle, index) => (
            <div
              key={vehicle.id}
              className="trending-card glass-card wow fadeInUp"
              data-wow-delay={`${index * 100}ms`}
            >
              <div className="badge-wrapper">
                <span className="trending-badge">{vehicle.badge}</span>
              </div>
              <div className="vehicle-image-wrapper">
                <Image
                  src={vehicle.image}
                  alt={vehicle.name}
                  width={400}
                  height={300}
                  style={{ objectFit: 'cover' }}
                  className="vehicle-image"
                />
              </div>
              <div className="vehicle-info">
                <h3 className="vehicle-name">{vehicle.name}</h3>
                <p className="vehicle-color">{vehicle.color}</p>
                <p className="vehicle-price">{vehicle.price}</p>
                <Link href={`/en/requests/new`} className="btn-assess">
                  Request Assessment
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .trending-vehicles-section {
          padding: 6rem 0;
          background: var(--majaz-bg-primary);
          position: relative;
          overflow: hidden;
        }

        .trending-vehicles-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--majaz-border), transparent);
        }

        .trending-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 2rem;
          margin-top: 3rem;
        }

        .trending-card {
          background: var(--majaz-glass-bg);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid var(--majaz-glass-border);
          border-radius: var(--radius-lg);
          padding: 0;
          overflow: hidden;
          transition: all var(--transition-base);
          position: relative;
        }

        .trending-card:hover {
          border-color: var(--majaz-border-strong);
          box-shadow: var(--majaz-shadow-gold);
          transform: translateY(-8px);
        }

        .badge-wrapper {
          position: absolute;
          top: 1rem;
          right: 1rem;
          z-index: 10;
        }

        .trending-badge {
          background: var(--majaz-gradient-gold);
          color: var(--majaz-black);
          padding: 0.5rem 1rem;
          border-radius: var(--radius-md);
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          box-shadow: var(--majaz-shadow-md);
        }

        .vehicle-image-wrapper {
          position: relative;
          width: 100%;
          height: 240px;
          overflow: hidden;
          background: linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.3) 100%);
        }

        .vehicle-image {
          transition: transform var(--transition-slow);
        }

        .trending-card:hover .vehicle-image {
          transform: scale(1.1);
        }

        .vehicle-info {
          padding: 1.5rem;
        }

        .vehicle-name {
          font-family: var(--font-display);
          font-size: 1.25rem;
          font-weight: 300;
          color: var(--majaz-text-primary);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 0.5rem;
        }

        .vehicle-color {
          font-size: 0.875rem;
          color: var(--majaz-text-muted);
          margin-bottom: 0.75rem;
          font-weight: 300;
          letter-spacing: 0.05em;
        }

        .vehicle-price {
          font-size: 1.125rem;
          color: var(--majaz-gold);
          font-weight: 600;
          margin-bottom: 1.25rem;
          letter-spacing: 0.05em;
        }

        .btn-assess {
          display: inline-block;
          width: 100%;
          text-align: center;
          padding: 0.75rem 1.5rem;
          background: transparent;
          border: 2px solid var(--majaz-gold);
          color: var(--majaz-gold);
          text-decoration: none;
          border-radius: var(--radius-md);
          font-weight: 600;
          font-size: 0.875rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          transition: all var(--transition-base);
        }

        .btn-assess:hover {
          background: var(--majaz-gold);
          color: var(--majaz-black);
          box-shadow: var(--majaz-shadow-gold);
        }

        @media (max-width: 768px) {
          .trending-vehicles-section {
            padding: 4rem 0;
          }

          .trending-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }

          .title {
            font-size: 2rem !important;
          }
        }
      `}</style>
    </section>
  );
}
