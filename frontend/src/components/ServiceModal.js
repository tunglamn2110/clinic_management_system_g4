"use client";
import { useState, useEffect } from 'react';

export default function ServiceModal({ open, initial = {}, mode = 'add', onClose, onSave }) {
  const [form, setForm] = useState({ name:'', description:'', price_money:0, duration_minutes:60, category:'', image_url:'' });
  const [errors, setErrors] = useState({});

  useEffect(()=>{ setForm(prev => ({ ...prev, ...initial })); /* eslint-disable-line react-hooks/exhaustive-deps */ }, [initial, open]);

  if (!open) return null;

  function validate() {
    const e = {};
    if (!form.name || form.name.trim().length < 2) e.name = 'Name is required';
    if (!form.price_money || Number(form.price_money) <= 0) e.price_money = 'Price must be greater than 0';
    if (!form.duration_minutes || Number(form.duration_minutes) <= 0) e.duration_minutes = 'Duration must be greater than 0';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleChange(field, val){ setForm(prev=>({ ...prev, [field]: val })); }

  async function submit(e){
    e.preventDefault();
    if (!validate()) return;
    await onSave(form);
  }

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true">
      <form className="modal-card" onSubmit={submit}>
        <button type="button" className="modal-close" onClick={onClose} aria-label="Close modal">✕</button>
        <h3>{mode === 'add' ? 'Add New Service' : 'Edit Service'}</h3>
        <div className="subtitle">Define the details for a new clinic treatment.</div>

        <div className="section-title">BASIC DETAILS</div>
        <div className="form-row">
          <div className="full">
            <label className="muted">Service Title</label>
            <input placeholder="e.g. Premium Gold Facial Therapy" value={form.name} onChange={e=>handleChange('name', e.target.value)} />
            {errors.name && <div style={{color:'red'}}>{errors.name}</div>}
          </div>
        </div>

        <div style={{marginTop:12}}>
          <label className="muted">Thumbnail Image</label>
          <div style={{display:'flex',alignItems:'center',gap:12,marginTop:8}}>
            <div style={{width:72,height:48,background:'#f3f7fb',border:'1px solid #eef4f8',borderRadius:8,display:'grid',placeItems:'center'}}>
              📷
            </div>
            <div>
              <button type="button" className="elite-outline-button small">Choose Image</button>
              <div style={{color:'#94a3b8',fontSize:12,marginTop:6}}>Max size 2MB (JPG, PNG)</div>
            </div>
          </div>
        </div>

        <div style={{marginTop:14}}>
          <label className="muted">Description</label>
          <textarea placeholder="Enter a comprehensive description of the service and its benefits..." value={form.description||''} onChange={e=>handleChange('description', e.target.value)} rows={4} />
        </div>

        <div className="section-title" style={{marginTop:18}}>PRICING & CATEGORIES</div>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
          <div>
            <label className="muted">Price (VND)</label>
            <input type="number" value={form.price_money} onChange={e=>handleChange('price_money', Number(e.target.value))} />
          </div>
          <div>
            <label className="muted">Category</label>
            <select value={form.category||''} onChange={e=>handleChange('category', e.target.value)}>
              <option value="">Select category...</option>
              <option>Anti-aging</option>
              <option>Acne</option>
              <option>Rejuvenation</option>
            </select>
          </div>
        </div>

        <div style={{marginTop:12}}>
          <label className="muted">Duration (minutes)</label>
          <input placeholder="e.g. 60" value={form.duration_minutes} onChange={e=>handleChange('duration_minutes', Number(e.target.value))} />
        </div>

        <div className="actions">
          <div style={{color:'#64748b'}}>Tip: Use high-quality thumbnail for better presentation.</div>
          <div>
            <button type="button" onClick={onClose} style={{background:'transparent',border:'none',color:'#64748b',marginRight:12}}>Cancel</button>
            <button className="save-btn" type="submit">{mode==='add' ? 'Save Service' : 'Save'}</button>
          </div>
        </div>
      </form>
    </div>
  );
}
