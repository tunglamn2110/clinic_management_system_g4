import TopNav from "../../components/TopNav";

const contactCards = [
  { title: "Address", detail: "123 Wellness Blvd, Medical District, NY 1001" },
  { title: "Phone", detail: "+1 (555) 010-888 • 0800-BESPOKE" },
  { title: "Email", detail: "hello@bespokeclinic.com • support@bespokeclinic.com" },
  { title: "Opening Hours", detail: "Mon-Fri 9am-7pm • Sat 10am-4pm" }
];

export default function ContactPage() {
  return (
    <main className="contact-page">
      <TopNav />

      <section className="contact-top elite-container">
        <h1>Start Your Skin Journey Today</h1>
        <p>Our experts are ready to listen and craft your unique formula.</p>
      </section>

      <section className="contact-main elite-container">
        <article className="contact-info">
          <h2>Clinic Locations</h2>
          <p>
            Visit our sanctuary of skin wellness in the heart of the medical district. We offer a tranquil
            environment for your personalized treatments.
          </p>
          <div className="contact-card-grid">
            {contactCards.map((item) => (
              <div key={item.title} className="contact-card">
                <h4>{item.title}</h4>
                <p>{item.detail}</p>
              </div>
            ))}
          </div>
        </article>

        <form className="contact-form">
          <h3>Personalized Inquiry</h3>
          <label>Full Name</label>
          <input type="text" placeholder="e.g. Jane Doe" />
          <label>Email Address</label>
          <input type="email" placeholder="jane@example.com" />
          <label>Primary Skin Concern</label>
          <select defaultValue="">
            <option value="" disabled>
              Select your concern
            </option>
            <option>Acne & inflammation</option>
            <option>Pigmentation</option>
            <option>Anti-aging</option>
            <option>Sensitive skin</option>
          </select>
          <label>Message</label>
          <textarea rows={4} placeholder="How can we help you?" />
          <button type="button" className="elite-primary-button">
            Send Inquiry
          </button>
        </form>
      </section>

      <section className="contact-map elite-container">
        <img
          src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1600&q=60"
          alt="Clinic location map"
        />
        <div className="contact-map-card">
          <p>Our Location</p>
          <h4>123 Wellness Blvd, Medical District, NY 1001</h4>
          <a href="#">Get Directions</a>
        </div>
      </section>
    </main>
  );
}
