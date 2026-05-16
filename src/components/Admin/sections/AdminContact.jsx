import React, { useState, useEffect } from 'react';
import { Save, CheckCircle, Plus, Trash2, X } from 'lucide-react';
import { usePortfolio } from '../../../context/PortfolioContext';

const AdminContact = ({ showToast }) => {
  const { data, updateData } = usePortfolio();
  const [contact, setContact] = useState({});
  const [extras, setExtras] = useState([]);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (data?.contact) {
      setContact(data.contact);
      setExtras(data.contact.extras || []);
    }
  }, [data?.contact]);

  const handleSave = () => {
    updateData(prev => ({ ...prev, contact: { ...contact, extras } }));
    setSaved(true);
    showToast('Contact info saved!');
    setTimeout(() => setSaved(false), 2500);
  };

  const updateExtra = (i, val) => setExtras(prev => prev.map((e, idx) => idx === i ? val : e));
  const addExtra = () => setExtras(prev => [...prev, '']);
  const removeExtra = (i) => setExtras(prev => prev.filter((_, idx) => idx !== i));

  return (
    <div>
      <div className="admin-section-header">
        <h2>Contact Information</h2>
        <p>Update your contact details and extra bullet points</p>
      </div>

      <div className="admin-card">
        <div className="admin-card-header">
          <h3>Contact Details</h3>
        </div>

        <div className="admin-form-row">
          <div className="admin-field">
            <label>Location</label>
            <input value={contact.location || ''} onChange={e => setContact(p => ({ ...p, location: e.target.value }))} placeholder="Kathmandu, Nepal" />
          </div>
          <div className="admin-field">
            <label>Phone</label>
            <input value={contact.phone || ''} onChange={e => setContact(p => ({ ...p, phone: e.target.value }))} placeholder="+1 234 567 890" />
          </div>
        </div>

        <div className="admin-form-row single">
          <div className="admin-field">
            <label>Email</label>
            <input type="email" value={contact.email || ''} onChange={e => setContact(p => ({ ...p, email: e.target.value }))} placeholder="you@example.com" />
          </div>
        </div>
      </div>

      {/* Extras */}
      <div className="admin-card">
        <div className="admin-card-header">
          <h3>Extra Bullet Points</h3>
          <button className="btn-add" onClick={addExtra}><Plus size={14} /> Add Point</button>
        </div>
        <div className="achievements-list">
          {extras.map((extra, i) => (
            <div key={i} className="achievement-row">
              <input
                value={extra}
                onChange={e => updateExtra(i, e.target.value)}
                placeholder="e.g. Familiar with Logistics, Fintech..."
              />
              <button className="btn-icon delete" onClick={() => removeExtra(i)}>
                <X size={12} />
              </button>
            </div>
          ))}
          {extras.length === 0 && <div className="admin-empty"><p>No extra points added yet.</p></div>}
        </div>
      </div>

      <div className="admin-save-bar">
        <button className={`btn-save ${saved ? 'saved' : ''}`} onClick={handleSave}>
          {saved ? <><CheckCircle size={16} /> Saved!</> : <><Save size={16} /> Save Changes</>}
        </button>
      </div>
    </div>
  );
};

export default AdminContact;
