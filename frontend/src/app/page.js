"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import TopNav from "../components/TopNav";

const fallbackData = {
  brand: "Elysian Skin Clinic",
  nav: ["Home", "About", "Treatment", "Auth"],
  hero: {
    titleLine1: "Science Meets Soul:",
    titleLine2: "Redefined Skincare",
    subtitle:
      "Personalized skin care solutions tailored to your skin journey. Explore the science behind visible confidence.",
    cta: "Book Consultation"
  },
  feature: {
    eyebrow: "01 / LAB + LUXURY",
    title: "The Bespoke Difference",
    description:
      "We pair diagnostics with clinical precision to deliver care plans designed for your skin profile."
  },
  values: [
    {
      title: "Data-driven",
      description: "Real skin insights power every treatment decision."
    },
    {
      title: "Personalized",
      description: "Protocols are tuned for your goals and tolerance."
    },
    {
      title: "Client-centric",
      description: "Every journey is transparent, comfortable and guided."
    }
  ],
  doctor: {
    name: "Dr. Elena Sterling, MD",
    role: "Board-certified Dermatologist",
    bio: "15+ years in clinical dermatology and aesthetic medicine."
  },
  cta: {
    title: "Ready to begin your personalized skin journey?",
    subtitle:
      "Book consultation with our clinical team and receive your tailored plan.",
    primary: "Start Your Consultation",
    secondary: "View Treatments"
  }
};

const services = [
  {
    title: "Hydra Renewal",
    description: "Deep cellular hydration and detoxification using advanced vortex technology for immediate radiance.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA7NodBa1UePjGVp5ERMypTbH9CsPOkX29j5vrOYM7VnyIbIP573pRE7176Px7Ae1BzALxVVQYqWW0Ak9Ojfz1_zKnxxfaHuUS-Pq9-Z9Rjnhf8BMtXY88smHrf3v064nqKNdjJ1Tj2l6we64FLPr_zgY4tmJeKiZVFMkQ3CpqJ0aRsiPRp1-vIsIB0JITQ2M1MB7dIHy--E4-Q87yNCDYclZly0GKF2ndge4327ZUdCNUSZEwwed0pSwGg212pFU04NgZ2KJOd6WA"
  },
  {
    title: "Acne Therapy",
    description: "Medical-grade targeted clearing for active acne through high-intensity narrow-band light therapy.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAPUDDkxSGjYuXvX914I4xm-ixZNbKjWDwdkm0xcxT-GIhNdvmaCRffhhB7TpNhN-hj5VJsILRHwTWGH2h04ver45rfzs1rtAPJDWvjeMEW0a8sPkKKLCG5myGlcjsyVb1dmES5fMZ0vdzbRynRFOUckwVIB254BXD_wDJqL89p2J3NE-4s9BQRNbf2nYrNmGlUy8vsqnp48V6I7JH_0mF98eENtoeGajhsxwxJkaOerwReROnnIsG6tt43zNmw1_N_ARhDE8oqGto"
  },
  {
    title: "Fractional Laser",
    description: "Advanced non-ablative resurfacing to stimulate collagen and address deep texture irregularities.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCf3NhIyjVguXrIDH8gJErQz00BPNVt5OGF1VevrfLuh3USiQ9_OJUOQHbPGR37kmn94seV8RKOek8o0U4eYoHCerBQ_zaRt0KWluu-MUnsti1Z9SUUC1cYYXdpMAr4X9CMukSoOVtecotDZvRIDAG-254NDQcfd8_3P88ZXQacXTQwGeusXTy3blYqKeDhr0pm4K_F2B06YTuH7fEaJB92cdrMO_KTLIAX7IqOV4lYi6zMB3rAy7GjUuAnOu2IV-kNCsdR0gU1Y3A"
  },
  {
    title: "Pigment Control",
    description: "Scientific protocols targeting melanin clusters for persistent hyperpigmentation and melasma correction.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC7VCBFCrKk83LlrerjjaWna9_mJNyoJ3BIJV5CSJLcO0vEfpVncUxzYIhLStiEC8q_ELQiz81V4-fOVLslLAjkJu1S-V3xxfPqB_8xLftWrSnJMg0nsn3-NU7gNSn-8GCY2gPBFrjdMII0I-Ys60gqfvNUsgmzSYF9KlzxTZ_xGF-Y-eXD8P3ANJ0ngZJILNfvFHOwoPvvoHLYVO_9s8b7JN2o_4CyU06oHu23uQhXOvlLJbuqpeTJ8dQQEpaizQ53Y_y8m7P8z-M"
  }
];

export default function HomePage() {
  const [homeData, setHomeData] = useState(fallbackData);

  useEffect(() => {
    const controller = new AbortController();
    const load = async () => {
      try {
        const response = await fetch("/api/homepage-data", {
          signal: controller.signal
        });
        if (!response.ok) return;
        const payload = await response.json();
        setHomeData(payload);
      } catch {
        setHomeData(fallbackData);
      }
    };
    load();
    return () => controller.abort();
  }, []);

  return (
    <main className="elite-page">
      <TopNav />

      <section className="elite-hero">
        <div className="elite-container elite-grid-hero">
          <div className="elite-hero-image-wrap">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBPyOnPbW-qucsPK_YvPczW3Q2DdYIecstcOlVMFC-k1ot4y0h4mVVTDX6iGhz3zKHr4K9Y4LqcRoE-fq4fVPSSimy52oNgoFQIHGp_J03wSF67IiOl3gdZo3ZyAkEx4ICLB3HQ2yTj8IYEQ7-n_F7n0mQ7LLVu0hKsMa7zEaHHYQkjEot34vpSfQ8rSzKMfcy9wMtxlw7bVaUrIqH5z8FyPgX8WCN1LE2rIjz1jrNg3Z4Fzlx27431EOryp8HAZUNvYKCW8z1q9Os"
              alt="Clinical skincare space"
            />
            <div className="elite-floating-badge">
              <p>Certified Quality</p>
              <h4>ISO 9001 Facility</h4>
            </div>
          </div>
          <div className="elite-hero-content">
            <span className="elite-chip">Medical Grade Excellence</span>
            <h1>
              {homeData.hero.titleLine1}
              <br />
              <span>{homeData.hero.titleLine2}</span>
            </h1>
            <p>{homeData.hero.subtitle}</p>
            <div className="elite-hero-actions">
              <button className="elite-primary-button">Start Your Skin Plan</button>
              <Link href="/service-detail" className="elite-outline-button">
                Explore Treatments
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="elite-protocol">
        <div className="elite-container">
          <h2 className="elite-section-title">The Elysian Protocol</h2>
          <p className="elite-section-subtitle">
            A scientifically-backed, data-driven pathway to optimal skin health and cellular rejuvenation.
          </p>
          <div className="elite-protocol-grid">
            {homeData.values.map((value, index) => (
              <article key={value.title} className="elite-protocol-card">
                <div className="elite-protocol-icon">{index + 1}</div>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="elite-services">
        <div className="elite-container">
          <div className="elite-services-head">
            <div>
              <h2 className="elite-section-title">Service List</h2>
              <p className="elite-section-subtitle">Precision therapies with state-of-the-art clinical technology.</p>
            </div>
            <Link href="/service-detail" className="elite-view-link">
              View Full Menu →
            </Link>
          </div>
          <div className="elite-service-grid">
            {services.map((item) => (
              <article key={item.title} className="elite-service-card">
                <img src={item.image} alt={item.title} />
                <div className="elite-service-body">
                  <h4>{item.title}</h4>
                  <p>{item.description}</p>
                  <Link href="/service-detail">Clinical Details</Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="elite-doctor">
        <div className="elite-container elite-doctor-card">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAuf5F4sNrirb52J6x6JK7vOWMPToQPryOUyJR3q7NxZdYqyF9Y6WR4rlh0zDwjbXKTJx-wbbxg1Mdr_PwnNhD3oqvJQUDfKtB6ytsfJ5K4nFSlM6_pNKzzcMtI-bOiXrrj0ji4Hg4gJ_tu_Tzou_sOOhjy643m2_X-FI8eg4vMzS0g7LzFWhK-dmCF_Y8DsgOOI1PXvaYYz9MZmQCLsziPZcsaK4iWZpqowRIc5LnPfdHRHIMpT0Wte9pT5QNX0jFWPhPI7jGHHf4"
            alt={homeData.doctor.name}
          />
          <div>
            <span className="elite-chip">Specialist Profile</span>
            <h3>{homeData.doctor.name}</h3>
            <h5>{homeData.doctor.role}</h5>
            <p>{homeData.doctor.bio}</p>
          </div>
        </div>
      </section>

      <section className="elite-cta">
        <div className="elite-container elite-cta-box">
          <h3>{homeData.cta.title}</h3>
          <p>{homeData.cta.subtitle}</p>
          <div className="elite-hero-actions">
            <button className="elite-primary-button">{homeData.cta.primary}</button>
            <Link href="/service-detail" className="elite-outline-button">
              {homeData.cta.secondary}
            </Link>
          </div>
        </div>
      </section>

      <footer className="elite-footer">
        <div className="elite-container elite-footer-grid">
          <div>
            <h4>{homeData.brand}</h4>
            <p>Setting the standard for clinical dermatology with evidence-based results.</p>
          </div>
          <div>
            <h5>Navigation</h5>
            <p>Home • Service List • About Us • Contact</p>
          </div>
          <div>
            <h5>Facility</h5>
            <p>88 Clinical Way, Suite 402 • +84 909 123 456</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
