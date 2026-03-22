import Link from "next/link";
import TopNav from "../../components/TopNav";

const values = [
  {
    title: "Data Driven",
    description: "Precise imaging and diagnostics guide every treatment and long-term care strategy."
  },
  {
    title: "Personalized",
    description: "Each protocol is tailored for skin type, tolerance, and your personal goals."
  },
  {
    title: "Client-centric",
    description: "Transparent communication and comfort-focused care through every session."
  }
];

export default function AboutPage() {
  return (
    <main className="about-page">
      <TopNav />

      <section className="about-hero elite-container">
        <div className="about-hero-card">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBPyOnPbW-qucsPK_YvPczW3Q2DdYIecstcOlVMFC-k1ot4y0h4mVVTDX6iGhz3zKHr4K9Y4LqcRoE-fq4fVPSSimy52oNgoFQIHGp_J03wSF67IiOl3gdZo3ZyAkEx4ICLB3HQ2yTj8IYEQ7-n_F7n0mQ7LLVu0hKsMa7zEaHHYQkjEot34vpSfQ8rSzKMfcy9wMtxlw7bVaUrIqH5z8FyPgX8WCN1LE2rIjz1jrNg3Z4Fzlx27431EOryp8HAZUNvYKCW8z1q9Os"
            alt="About hero"
          />
          <div className="about-hero-content">
            <h1>
              Science Meets Soul:
              <br />
              <span>Redefined Skincare</span>
            </h1>
            <p>Personalized skincare protocols blending luxury care with measurable clinical outcomes.</p>
            <Link href="/service-detail" className="elite-primary-button small">
              Book Your Consultation
            </Link>
          </div>
        </div>
      </section>

      <section className="about-feature elite-container">
        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCRemThwRIsoRHnHRpSJcYEEw6N0EdsNeTOzRlKfpy8uIeuBB94x_s-fVAFWZHWZOGemqCh-ZJhzKXK1fDFBaHdoJJhmTHi2hq-XkyDqIjWETs7ECilO477Y1UAUpZd_uQSxKNW2oi3cYWvhRejAhOfG72-EeKYHey9uTPnZt75yACFhh0iqxgIk7duP6U1CSB894ft0yguUpdpnV490YT0MfLFt3J791ig3mrfWrXNUdCjjRTksnkANS7ZwopIZKTScZol-K8JpUI"
          alt="Bespoke products"
        />
        <article>
          <p className="about-eyebrow">Our Philosophy</p>
          <h2>The Bespoke Difference</h2>
          <p>
            We blend data with high-touch service to design skincare journeys that are medically sound,
            results-driven, and deeply personalized.
          </p>
          <p>
            Every treatment plan includes regular progress tracking and evidence-based updates so your skin
            can improve with consistency and confidence.
          </p>
        </article>
      </section>

      <section className="about-values elite-container">
        <h3>Our Core Values</h3>
        <div className="about-value-grid">
          {values.map((item) => (
            <article key={item.title}>
              <h4>{item.title}</h4>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="about-doctor elite-container">
        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAuf5F4sNrirb52J6x6JK7vOWMPToQPryOUyJR3q7NxZdYqyF9Y6WR4rlh0zDwjbXKTJx-wbbxg1Mdr_PwnNhD3oqvJQUDfKtB6ytsfJ5K4nFSlM6_pNKzzcMtI-bOiXrrj0ji4Hg4gJ_tu_Tzou_sOOhjy643m2_X-FI8eg4vMzS0g7LzFWhK-dmCF_Y8DsgOOI1PXvaYYz9MZmQCLsziPZcsaK4iWZpqowRIc5LnPfdHRHIMpT0Wte9pT5QNX0jFWPhPI7jGHHf4"
          alt="Dr. Elena Sterling"
        />
        <article>
          <p className="about-eyebrow">Founder&apos;s Message</p>
          <h3>Dr. Elena Sterling, MD</h3>
          <p>
            At Elysian, our mission is to transform skin health through precision medicine, patient education,
            and compassionate care.
          </p>
          <p>
            We are committed to delivering measurable outcomes while maintaining a calm, premium clinical
            experience for every guest.
          </p>
        </article>
      </section>
    </main>
  );
}
