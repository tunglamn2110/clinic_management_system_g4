"use client";
import { useEffect, useState } from 'react';
import ServiceModal from '../../../components/ServiceModal';

export default function AdminServices() {
  const [services, setServices] = useState([]);
  const [form, setForm] = useState({name:'',price_money:0,duration_minutes:60,category:'',description:'',image_url:''});
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState(null);

  async function load() {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL||'http://localhost:4000'}/api/services`);
      const body = await res.json();
      setServices(body.services||[]);
    } catch (err) {
      console.error('load services', err);
    }
  }

  useEffect(()=>{ load(); },[]);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [modalInitial, setModalInitial] = useState(null);

  async function createFromModal(data){
    const token = localStorage.getItem('elysian_admin_token');
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL||'http://localhost:4000'}/api/services`,{
      method:'POST', headers:{'Content-Type':'application/json', Authorization: token?`Bearer ${token}`:''}, body: JSON.stringify(data)
    });
    if (res.ok) { setModalOpen(false); load(); }
    else { const body = await res.json().catch(()=>({})); alert('Failed: '+(body.message||res.statusText)); }
  }

  async function remove(id){
    if(!confirm('Delete this service?')) return;
    const token = localStorage.getItem('elysian_admin_token');
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL||'http://localhost:4000'}/api/services/${id}`,{method:'DELETE', headers:{Authorization: token?`Bearer ${token}`:''}});
    if (res.ok) load(); else alert('Delete failed');
  }

  function startEdit(s){ setEditId(s.service_id); setEditForm({...s}); setModalMode('edit'); setModalInitial({...s}); setModalOpen(true); }
  function cancelEdit(){ setEditId(null); setEditForm(null); setModalOpen(false); setModalInitial(null); }

  async function submitEditFromModal(data){
    const token = localStorage.getItem('elysian_admin_token');
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL||'http://localhost:4000'}/api/services/${editId}`,{method:'PUT', headers:{'Content-Type':'application/json', Authorization: token?`Bearer ${token}`:''}, body: JSON.stringify(data)});
    if (res.ok) { cancelEdit(); load(); }
    else { const body = await res.json().catch(()=>({})); alert('Update failed: '+(body.message||res.statusText)); }
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h3 className="text-2xl font-bold">Service Gallery</h3>
        <p className="text-slate-500">Manage and preview clinical services for the public catalog.</p>
      </div>

      <div className="flex items-center justify-end mb-4">
        <button className="flex items-center gap-2 px-6 py-2 bg-primary text-slate-900 font-bold rounded-full shadow-lg" onClick={()=>{ setModalMode('add'); setModalInitial(null); setModalOpen(true); }}>
          <span className="material-symbols-outlined">add</span> Add New Service
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {services.map(s => (
          <div key={s.service_id} className="group service-card bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-xl transition-all relative">
            <div className="aspect-[4/3] w-full relative overflow-hidden">
              <img alt={s.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" src={s.image_url || '/default-service.jpg'} />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                <button className="size-10 rounded-full bg-white text-slate-900 flex items-center justify-center hover:bg-primary hover:text-white transition-colors" onClick={()=>startEdit(s)}>
                  <span className="material-symbols-outlined">edit</span>
                </button>
                <button className="size-10 rounded-full bg-white text-slate-900 flex items-center justify-center hover:bg-red-500 hover:text-white transition-colors" onClick={()=>remove(s.service_id)}>
                  <span className="material-symbols-outlined">delete</span>
                </button>
              </div>
            </div>

            <div className="p-5 space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-blue-100 text-blue-600">{s.category || 'General'}</span>
                  <h4 className="font-bold text-slate-900 dark:text-white mt-1 group-hover:text-primary transition-colors">{s.name}</h4>
                </div>
                <div className="text-right">
                  <div className="text-sm font-extrabold text-primary">{typeof s.price_money === 'number' ? new Intl.NumberFormat().format(s.price_money) : s.price_money}</div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
                <div className="flex flex-col">
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">Duration</span>
                  <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">{s.duration_minutes} mins</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className={s.active ? 'service-toggle on' : 'service-toggle'}><div className="dot"/></div>
                  <button onClick={()=>startEdit(s)} className="elite-secondary-button">Edit</button>
                  <button onClick={()=>remove(s.service_id)} className="elite-danger-button">Delete</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <ServiceModal open={modalOpen} initial={modalInitial} mode={modalMode} onClose={()=>{ setModalOpen(false); setModalInitial(null); }} onSave={modalMode==='add'?createFromModal:submitEditFromModal} />
    </div>
  )
}
