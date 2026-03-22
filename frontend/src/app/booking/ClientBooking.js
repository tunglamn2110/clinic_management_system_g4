"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

import BookingSummary from "./BookingSummary";

export default function ClientBooking() {
  const search = useSearchParams();
  const router = useRouter();
  const service = search.get("service") || "";

  const [step, setStep] = useState(1);
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [loading, setLoading] = useState(false);
  const [confirmed, setConfirmed] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (service && !specialist) setSpecialist("Dr. Sarah Jenkins");
  }, [service]);

  function Next() {
    if (step === 1) {
      if (!fullName || !phone) return setError("Vui lòng nhập tên và số điện thoại.");
      setError(null);
      setStep(2);
      return;
    }
    if (step === 2) {
      if (!date || !time) return setError("Vui lòng chọn ngày và giờ.");
      setError(null);
      setStep(3);
    }
  }

  function Back() {
    setError(null);
    setStep((s) => Math.max(1, s - 1));
  }

  async function confirmBooking() {
    setLoading(true);
    setError(null);
    try {
      const scheduledAt = new Date(`${date}T${time}`).toISOString();
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ serviceName: service, specialist, fullName, phone, scheduledAt })
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.message || "Booking failed");
      }
      const body = await res.json();
      setConfirmed(body.booking);
      setStep(4);
    } catch (err) {
      setError(err.message || String(err));
    } finally {
      setLoading(false);
    }
  }

  // Modal-style confirmation overlay
  function ConfirmationModal({ booking }) {
    if (!booking) return null;
    return (
      <div className="booking-modal-overlay">
        <div className="booking-modal-card">
          <div className="modal-check">✓</div>
          <h3>Booking Confirmed!</h3>
          <p>Booking ID: {booking.booking_id}</p>
          <p>{booking.service_name}</p>
          <p>{new Date(booking.scheduled_at).toLocaleString()}</p>
          <div style={{ marginTop: 12 }}>
            <button className="elite-primary-button" onClick={() => { setConfirmed(null); router.push('/profile'); }}>View My Schedule</button>
            <button className="elite-outline-button" style={{ marginLeft: 8 }} onClick={() => { setConfirmed(null); router.push('/'); }}>Return Home</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <main className="elite-container">
      <div className="booking-grid">
        <div>
          <h2>Booking — {service || 'Choose service'}</h2>

          <div className="steps-indicator">Step {step} of 3</div>

          {step === 1 && (
            <section className="booking-step">
              <h3>1. Information</h3>
              <div>
                <label>Full name</label>
                <input value={fullName} onChange={(e) => setFullName(e.target.value)} />
              </div>
              <div>
                <label>Phone</label>
                <input value={phone} onChange={(e) => setPhone(e.target.value)} />
              </div>
              <div>
                <label>Specialist</label>
                <select value={specialist} onChange={(e) => setSpecialist(e.target.value)}>
                  <option>Dr. Sarah Jenkins</option>
                  <option>Dr. Lam</option>
                  <option>Dr. Elena Sterling</option>
                </select>
              </div>
            </section>
          )}

          {step === 2 && (
            <section className="booking-step">
              <h3>2. Schedule</h3>
              <div>
                <label>Date</label>
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
              </div>
              <div>
                <label>Time</label>
                <div className="time-slots">
                  {['09:00','09:45','10:30','11:15','13:00','14:30','15:15','16:00'].map((t) => (
                    <button
                      key={t}
                      type="button"
                      className={time===t? 'time-slot active':'time-slot'}
                      onClick={() => setTime(t)}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </section>
          )}

          {step === 3 && (
            <section className="booking-step">
              <h3>3. Confirm</h3>
              <div className="booking-summary">
                <p><strong>Service:</strong> {service}</p>
                <p><strong>Specialist:</strong> {specialist}</p>
                <p><strong>Name:</strong> {fullName}</p>
                <p><strong>Phone:</strong> {phone}</p>
                <p><strong>When:</strong> {date} {time}</p>
              </div>
            </section>
          )}

          <div style={{ marginTop: 16 }}>
            {error && <div className="error">{error}</div>}
            <div style={{ display: 'flex', gap: 8 }}>
              {step > 1 && <button className="elite-outline-button" onClick={Back}>Back</button>}
              {step < 3 && <button className="elite-primary-button" onClick={Next}>Next</button>}
              {step === 3 && (
                <button className="elite-primary-button" onClick={confirmBooking} disabled={loading}>
                  {loading ? 'Booking...' : 'Confirm Booking'}
                </button>
              )}
            </div>
          </div>
        </div>

        <BookingSummary service={service} specialist={specialist} date={date} time={time} />
      </div>

      {confirmed && <ConfirmationModal booking={confirmed} />}
    </main>
  );
}
