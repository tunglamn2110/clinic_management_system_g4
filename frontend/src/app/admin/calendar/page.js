"use client";
import { useEffect, useState } from 'react';

export default function AdminCalendar() {
  const [bookings, setBookings] = useState([]);
  const [selected, setSelected] = useState(null);

  async function load() {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL||'http://localhost:4000'}/api/bookings`);
      const body = await res.json();
      setBookings(body.bookings || []);
    } catch (e) { console.warn(e.message); }
  }

  useEffect(()=>{ load(); },[]);

  function viewBooking(b){ setSelected(b); }
  function closeModal(){ setSelected(null); }

  async function cancelBooking(id){
    if (!confirm('Cancel this booking?')) return;
    const token = localStorage.getItem('elysian_admin_token');
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL||'http://localhost:4000'}/api/bookings/${id}/cancel`,{method:'PATCH', headers:{ Authorization: token?`Bearer ${token}`:'' }});
      if (!res.ok) throw new Error('Cancel failed');
      await load();
      if (selected && selected.booking_id === id) closeModal();
    } catch (e) { alert(e.message || String(e)); }
  }

  return (
    <div className="p-8">
      <div className="mb-6">
        <h3 className="text-2xl font-bold">Appointment Calendar</h3>
        <p className="text-slate-500">View, inspect and manage scheduled bookings.</p>
      </div>

      <div className="admin-card">
        <table className="admin-table">
          <thead>
            <tr>
              <th>When</th>
              <th>Service / Specialist</th>
              <th>Patient</th>
              <th className="right">Status</th>
              <th className="right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map(b => (
              <tr key={b.booking_id}>
                <td style={{whiteSpace:'nowrap'}}>{new Date(b.scheduled_at).toLocaleString()}</td>
                <td>{b.service_name} • <span className="muted">{b.specialist}</span></td>
                <td>{b.full_name} • <span className="muted">{b.phone}</span></td>
                <td className="right">{b.canceled ? 'Canceled' : 'Scheduled'}</td>
                <td className="right">
                  <button className="elite-secondary-button" onClick={()=>viewBooking(b)}>View</button>
                  {!b.canceled && <button className="elite-danger-button" onClick={()=>cancelBooking(b.booking_id)} style={{marginLeft:8}}>Cancel</button>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selected && (
        <div className="modal-overlay">
          <div className="admin-card" style={{width:560}}>
            <h3>Booking Details</h3>
            <div style={{display:'grid',gap:8}}>
              <div><strong>Service:</strong> {selected.service_name}</div>
              <div><strong>Specialist:</strong> {selected.specialist}</div>
              <div><strong>When:</strong> {new Date(selected.scheduled_at).toLocaleString()}</div>
              <div><strong>Patient:</strong> {selected.full_name} — {selected.phone}</div>
              <div><strong>Notes:</strong> {selected.notes || <span className="muted">—</span>}</div>
              <div style={{display:'flex',justifyContent:'flex-end',gap:8}}>
                {!selected.canceled && <button className="elite-danger-button" onClick={()=>cancelBooking(selected.booking_id)}>Cancel</button>}
                <button onClick={closeModal} className="elite-secondary-button">Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
