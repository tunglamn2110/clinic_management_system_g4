"use client";
import { useEffect, useState } from 'react';

export default function AdminDashboard() {
  const [summary, setSummary] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const token = localStorage.getItem('elysian_admin_token');
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL||'http://localhost:4000'}/api/admin/summary`, { headers: { Authorization: token ? `Bearer ${token}` : '' } });
        if (!res.ok) throw new Error('Unauthorized');
        const body = await res.json();
        setSummary(body);
      } catch (e) {
        setError(e.message);
      }
    }
    load();
  },[])

  return (
    <div style={{padding:20}}>
      <h2>Admin Dashboard</h2>
      {error && <div style={{color:'red'}}>{error}</div>}
      {summary ? (
        <div style={{display:'flex',gap:16}}>
          <div className="admin-stat">Users<br/><strong>{summary.totalUsers}</strong></div>
          <div className="admin-stat">Bookings<br/><strong>{summary.totalBookings}</strong></div>
          <div className="admin-stat">Today<br/><strong>{summary.bookingsToday}</strong></div>
        </div>
      ) : <div>Loading...</div>}
    </div>
  )
}
