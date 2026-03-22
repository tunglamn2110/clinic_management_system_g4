"use client";
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function AdminLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [adminUser, setAdminUser] = useState(null);

  useEffect(() => {
    // Redirect to the main login if admin token missing
    try {
      const t = localStorage.getItem('elysian_admin_token');
      const u = localStorage.getItem('elysian_admin_user');
      if (!t) router.push('/login');
      if (u) setAdminUser(JSON.parse(u));
    } catch (e) {
      router.push('/login');
    }
  }, [router]);

  function signOut() {
    try { localStorage.removeItem('elysian_admin_token'); localStorage.removeItem('elysian_admin_user'); } catch (e) {}
    router.push('/login');
  }

  function navLink(href, label, icon) {
    const active = pathname === href || pathname?.startsWith(href + '/');
    return (
      <li>
        <Link href={href} className={active ? 'active' : ''}>
          <span className="icon" style={{width:22,display:'inline-block'}}>{icon}</span>
          <span>{label}</span>
        </Link>
      </li>
    );
  }

  return (
    <div>
      <div className="admin-topbar">
        <div className="elite-container">
          <div style={{display:'flex',alignItems:'center',gap:14}}>
            <div style={{display:'flex',alignItems:'center',gap:10}}>
              <div className="elite-logo-square">✦</div>
              <div style={{fontWeight:900,color:'#123047',fontSize:16}}>Elysian</div>
            </div>
            <div style={{marginLeft:12, color:'#64748b'}}>Management Hub</div>
          </div>

          <div className="search-wrap">
            <input type="search" placeholder="Search analytics data..." />
          </div>

          <div className="top-actions">
            <button className="btn-add" onClick={()=>router.push('/admin/services')}>+ Add New Service</button>
            <div className="role-bubble">Admin Role ▾</div>
            <div style={{display:'flex',alignItems:'center',gap:10}}>
              {adminUser && <div style={{color:'#123047',fontWeight:700}}>{adminUser.full_name || adminUser.email}</div>}
              <button onClick={signOut} className="elite-outline-button small">Sign out</button>
            </div>
          </div>
        </div>
      </div>

      <div className="admin-shell">
        <aside className="admin-sidebar">
          <div className="admin-brand">Elysian Management</div>
          <nav>
            <ul>
                {navLink('/admin','Dashboard','🏠')}
                {navLink('/admin/calendar','Calendar','📅')}
                {navLink('/admin/customers','Customers','👥')}
                {navLink('/admin/services','Service Catalog','🧾')}
                {navLink('/admin/reports','Reports','📊')}
            </ul>
          </nav>
          <div className="admin-footer">
            <img src="/avatar-placeholder.png" alt="avatar" />
            <div style={{display:'flex',flexDirection:'column'}}>
              <div className="name">{adminUser ? (adminUser.full_name || adminUser.email) : 'Admin'}</div>
              <div style={{fontSize:12,color:'#64748b'}}>Clinical Director</div>
            </div>
          </div>
        </aside>
        <main className="admin-main">
          {children}
        </main>
        <div style={{display:'none'}} />
      </div>
    </div>
  );
}

