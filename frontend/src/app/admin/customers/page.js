"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function AdminCustomers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function load() {
      try {
        const token = localStorage.getItem('elysian_admin_token');
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL||'http://localhost:4000'}/api/auth/users`, {
          headers: { Authorization: token ? `Bearer ${token}` : '' }
        });
        const body = await res.json();
        setUsers(body.users || []);
      } catch (e) {
        console.warn(e.message);
      }
    }
    load();
  },[])

  return (
    <div className="p-8">
      <div className="mb-6">
        <h3 className="text-2xl font-bold">Customer Management</h3>
        <p className="text-slate-500">List and manage registered patients.</p>
      </div>

      <div className="admin-card">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Customer</th>
              <th className="muted">Phone / Email</th>
              <th className="right">Created</th>
              <th className="right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u.user_id || u.userId}>
                <td>{u.full_name || u.email || `User #${u.user_id||u.userId}`}</td>
                <td className="muted">{u.phone || ''}{u.email ? ' • ' + u.email : ''}</td>
                <td className="right">{new Date(u.created_at||'').toLocaleString()}</td>
                <td className="right">
                  <Link href={`/admin/customers/${u.user_id||u.userId}`} className="elite-secondary-button">View</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
