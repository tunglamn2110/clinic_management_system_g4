"use client";
import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';

export default function PatientDetail() {
  const params = useParams();
  const id = params.id;
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({full_name:'',phone:'',email:''});

  useEffect(()=>{ if(!id) return; (async ()=>{
    const token = localStorage.getItem('elysian_admin_token');
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL||'http://localhost:4000'}/api/auth/users/${id}`, { headers: { Authorization: token ? `Bearer ${token}` : '' } });
    const body = await res.json(); setUser(body.user||null); setForm({...form,...(body.user||{})});
  })(); },[id]);

  async function save(e){
    e.preventDefault();
    const token = localStorage.getItem('elysian_admin_token');
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL||'http://localhost:4000'}/api/auth/users/${id}`,{method:'PUT', headers:{'Content-Type':'application/json', Authorization: token?`Bearer ${token}`:''}, body: JSON.stringify(form)});
    if (res.ok) { setEditing(false); const body=await res.json(); setUser(body.user||user); }
    else { const b = await res.json().catch(()=>({})); alert('Save failed: '+(b.message||res.statusText)); }
  }

  if (!user) return <div style={{padding:20}}>Loading...</div>;

  return (
    <div style={{padding:20}}>
      <button onClick={()=>router.push('/admin/customers')}>← Back</button>
      <h2>Patient: {user.full_name || (user.email||user.phone)}</h2>
      {!editing ? (
        <div style={{display:'grid',gap:8,marginTop:12}}>
          <div><strong>Full name:</strong> {user.full_name}</div>
          <div><strong>Email:</strong> {user.email || <span className="muted">—</span>}</div>
          <div><strong>Phone:</strong> {user.phone || <span className="muted">—</span>}</div>
          <div style={{display:'flex',gap:8,justifyContent:'flex-end',marginTop:12}}>
            <button className="elite-secondary-button" onClick={()=>setEditing(true)}>Edit</button>
          </div>
        </div>
      ) : (
        <form onSubmit={save} style={{display:'grid',gap:8,maxWidth:560}}>
          <input value={form.full_name||''} onChange={e=>setForm({...form,full_name:e.target.value})} />
          <input value={form.email||''} onChange={e=>setForm({...form,email:e.target.value})} />
          <input value={form.phone||''} onChange={e=>setForm({...form,phone:e.target.value})} />
          <div style={{display:'flex',gap:8,justifyContent:'flex-end'}}>
            <button type="button" onClick={()=>setEditing(false)}>Cancel</button>
            <button className="elite-primary-button" type="submit">Save</button>
          </div>
        </form>
      )}
    </div>
  )
}
