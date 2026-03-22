"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import TopNav from "../../components/TopNav";

const services = [
  {
    name: "Advanced Acne Therapy",
    need: "mụn",
    duration: "60 - 90 mins",
    price: "3.500.000 VND",
    description: "Blue-light protocol and anti-inflammatory care plan for active acne and post-acne redness.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAdQNmcTZIggdNJ-W-WwgkABNMbo0iFz-e6GFTUF70jXAz9O_43VznNDYPtLfTgOUoEFBeEC8_2KsI_0sLLcHdoltMurmZPdhp-2HEi3PbzMuKSVwqlccavqfY8xMJF4A6DtWdZ2clQXm9Ww1IUSc_6IQ3QAGb0mYEyEdWxFvgIH86ktZL0SaDa2O9wS3oAVp48LOVgIFZIo6-AS20rPwcGg8VKO_6d4_xfN3NWlv6Yc-_QYUBVYPqyB_-J4BQtZOnLX1QC0ygJHDM"
  },
  {
    name: "Hydra Renewal",
    need: "cấp ẩm",
    duration: "45 - 60 mins",
    price: "2.200.000 VND",
    description: "Vortex cleansing and serum infusion to restore hydration and improve skin glow.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA7NodBa1UePjGVp5ERMypTbH9CsPOkX29j5vrOYM7VnyIbIP573pRE7176Px7Ae1BzALxVVQYqWW0Ak9Ojfz1_zKnxxfaHuUS-Pq9-Z9Rjnhf8BMtXY88smHrf3v064nqKNdjJ1Tj2l6we64FLPr_zgY4tmJeKiZVFMkQ3CpqJ0aRsiPRp1-vIsIB0JITQ2M1MB7dIHy--E4-Q87yNCDYclZly0GKF2ndge4327ZUdCNUSZEwwed0pSwGg212pFU04NgZ2KJOd6WA"
  },
  {
    name: "Fractional Laser Resurfacing",
    need: "sẹo rỗ",
    duration: "75 - 100 mins",
    price: "4.800.000 VND",
    description: "Controlled microthermal resurfacing to improve scar depth, pores, and uneven texture.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCf3NhIyjVguXrIDH8gJErQz00BPNVt5OGF1VevrfLuh3USiQ9_OJUOQHbPGR37kmn94seV8RKOek8o0U4eYoHCerBQ_zaRt0KWluu-MUnsti1Z9SUUC1cYYXdpMAr4X9CMukSoOVtecotDZvRIDAG-254NDQcfd8_3P88ZXQacXTQwGeusXTy3blYqKeDhr0pm4K_F2B06YTuH7fEaJB92cdrMO_KTLIAX7IqOV4lYi6zMB3rAy7GjUuAnOu2IV-kNCsdR0gU1Y3A"
  },
  {
    name: "Pigment Control Therapy",
    need: "nám/sạm",
    duration: "60 mins",
    price: "3.200.000 VND",
    description: "Targeted treatment for melasma and pigmentation with brightening and barrier support.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC7VCBFCrKk83LlrerjjaWna9_mJNyoJ3BIJV5CSJLcO0vEfpVncUxzYIhLStiEC8q_ELQiz81V4-fOVLslLAjkJu1S-V3xxfPqB_8xLftWrSnJMg0nsn3-NU7gNSn-8GCY2gPBFrjdMII0I-Ys60gqfvNUsgmzSYF9KlzxTZ_xGF-Y-eXD8P3ANJ0ngZJILNfvFHOwoPvvoHLYVO_9s8b7JN2o_4CyU06oHu23uQhXOvlLJbuqpeTJ8dQQEpaizQ53Y_y8m7P8z-M"
  },
  {
    name: "Collagen Lift RF",
    need: "chống lão hóa",
    duration: "55 - 70 mins",
    price: "3.900.000 VND",
    description: "Radiofrequency lifting session designed for contour firmness and fine-line softening.",
    image:
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=900&q=80"
  },
  {
    name: "Sensitive Skin Recovery",
    need: "da nhạy cảm",
    duration: "45 mins",
    price: "1.900.000 VND",
    description: "Low-irritation facial protocol to calm skin barrier and reduce chronic sensitivity.",
    image:
      "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=900&q=80"
  },
  {
    name: "Clinical Anti-Aging Program",
    need: "chống lão hóa",
    duration: "90 mins",
    price: "5.200.000 VND",
    description: "Comprehensive anti-aging protocol combining infusion, RF and recovery technologies.",
    image:
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=900&q=80"
  },
  {
    name: "Body Acne Back Peel",
    need: "mụn",
    duration: "50 mins",
    price: "2.600.000 VND",
    description: "Targeted back treatment for inflammatory acne, congestion and post-acne marks.",
    image:
      "https://images.unsplash.com/photo-1596178067639-9ff703c7f438?auto=format&fit=crop&w=900&q=80"
  },
  {
    name: "Glass Skin Brightening",
    need: "nám/sạm",
    duration: "65 mins",
    price: "3.000.000 VND",
    description: "Even-tone protocol to reduce dullness, boost radiance and balance skin texture.",
    image:
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=900&q=80"
  },
  {
    name: "Hydration Booster Infusion",
    need: "cấp ẩm",
    duration: "40 mins",
    price: "1.800.000 VND",
    description: "Fast hydration support for dehydrated skin before events and seasonal changes.",
    image:
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=900&q=80"
  }
];

const filterNeeds = ["tất cả", "mụn", "nám/sạm", "chống lão hóa", "cấp ẩm", "sẹo rỗ", "da nhạy cảm"];

export default function ServiceDetailPage() {
  const [selectedNeed, setSelectedNeed] = useState("tất cả");

  const filteredServices = useMemo(() => {
    if (selectedNeed === "tất cả") {
      return services;
    }
    return services.filter((item) => item.need === selectedNeed);
  }, [selectedNeed]);

  return (
    <main className="service-page">
      <TopNav />

      <div className="elite-container service-content">
        <section className="service-journey">
          <h2>Service List</h2>
          <p className="service-intro">
            Chọn nhu cầu da để lọc nhanh các liệu trình clinic phù hợp nhất với mục tiêu của bạn.
          </p>
          <div className="service-filter">
            {filterNeeds.map((need) => (
              <button
                key={need}
                type="button"
                className={selectedNeed === need ? "service-filter-chip active" : "service-filter-chip"}
                onClick={() => setSelectedNeed(need)}
              >
                {need}
              </button>
            ))}
          </div>
          <div className="service-list-grid">
            {filteredServices.map((item) => (
              <article className="service-list-card" key={item.name}>
                <img src={item.image} alt={item.name} />
                <div className="service-list-body">
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                  <div className="service-list-meta">
                    <span>{item.need}</span>
                    <span>{item.duration}</span>
                  </div>
                  <div className="service-list-price-row">
                    <strong>{item.price}</strong>
                    <Link
                      href={`/booking?service=${encodeURIComponent(item.name)}`}
                      className="elite-primary-button small"
                    >
                      Book Now
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
