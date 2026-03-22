"use client";

import React from "react";

export default function BookingSummary({ service = "", specialist = "", date = "", time = "" }) {
  return (
    <aside className="booking-summary-card">
      <div className="summary-inner">
        <h4>Booking Summary</h4>
        <div className="summary-row">
          <div className="summary-label">Selected Service</div>
          <div className="summary-value">{service}</div>
        </div>
        <div className="summary-row">
          <div className="summary-label">Specialist</div>
          <div className="summary-value">{specialist}</div>
        </div>
        <div className="summary-row">
          <div className="summary-label">Time</div>
          <div className="summary-value">{date} {time}</div>
        </div>
        <div className="summary-total">
          <div className="total-label">Total Price</div>
          <div className="total-value">3.500.000 VND</div>
        </div>
        <div className="summary-actions">
          <button className="elite-primary-button">Next: Review & Confirm</button>
        </div>
      </div>
    </aside>
  );
}
