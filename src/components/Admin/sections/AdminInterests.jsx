import React, { useState, useEffect } from 'react';
import { Save, CheckCircle, Plus, Trash2, Edit3, X } from 'lucide-react';
import { usePortfolio } from '../../../context/PortfolioContext';
import { ConfirmDialog } from '../AdminPanel';

const ICON_OPTIONS = ['Mic2', 'Plane', 'Book', 'Coffee', 'Camera', 'Gamepad2', 'Mountain', 'Bike'];
const SUB_ICON_OPTIONS = ['Music', 'Navigation', 'BookOpen', 'Heart', 'Star', 'Zap'];

const AdminInterests = ({ showToast }) => {
  const { data, updateData } = usePortfolio();
  const [interests, setInterests] = useState([]);
  const [saved, setSaved] = useState(false);
  const [editingInterest, setEditingInterest] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  useEffect(() => {
    if (data?.interests) setInterests(data.interests);
  }, [data?.interests]);

  const handleSave = () => {
    updateData(prev => ({ ...prev, interests }));
    setSaved(true);
    showToast('Interests saved!');
    setTimeout(() => setSaved(false), 2500);
  };

  const saveInterest = (interest) => {
    if (interest.id && interests.find(i => i.id === interest.id)) {
      setInterests(prev => prev.map(i => i.id === interest.id ? interest : i));
    } else {
      setInterests(prev => [...prev, { ...interest, id: Date.now() }]);
    }
    setEditingInterest(null);
  };

  const deleteInterest = (id) => {
    setInterests(prev => prev.filter(i => i.id !== id));
    setDeleteTarget(null);
    showToast('Interest deleted', 'info');
  };

  return (
    <div>
      <div className="admin-section-header">
        <h2>Beyond Code (Interests)</h2>
        <p>Share your hobbies and personal interests</p>
      </div>

      <div className="admin-card">
        <div className="admin-card-header">
          <h3>Interest Cards</h3>
          <button className="btn-add" onClick={() => setEditingInterest({ iconName: 'Mic2', subIconName: 'Music', title: '', description: '' })}>
            <Plus size={14} /> Add Interest
          </button>
        </div>
        <div className="admin-list">
          {interests.map((interest) => (
            <div key={interest.id} className="admin-list-item">
              <div className="admin-list-item-body">
                <p className="admin-list-item-title">{interest.title}</p>
                <p className="admin-list-item-sub">{interest.description?.substring(0, 80)}...</p>
              </div>
              <div className="admin-list-item-actions">
                <button className="btn-icon edit" onClick={() => setEditingInterest({ ...interest })}><Edit3 size={14} /></button>
                <button className="btn-icon delete" onClick={() => setDeleteTarget(interest.id)}><Trash2 size={14} /></button>
              </div>
            </div>
          ))}
          {interests.length === 0 && <div className="admin-empty"><p>No interests added yet.</p></div>}
        </div>
      </div>

      <div className="admin-save-bar">
        <button className={`btn-save ${saved ? 'saved' : ''}`} onClick={handleSave}>
          {saved ? <><CheckCircle size={16} /> Saved!</> : <><Save size={16} /> Save Changes</>}
        </button>
      </div>

      {/* Interest Modal */}
      {editingInterest && (
        <div className="admin-modal-overlay">
          <div className="admin-modal">
            <h3>{editingInterest.id ? 'Edit Interest' : 'Add Interest'}</h3>

            <div className="admin-form-row">
              <div className="admin-field">
                <label>Main Icon</label>
                <select value={editingInterest.iconName} onChange={e => setEditingInterest(p => ({ ...p, iconName: e.target.value }))}>
                  {ICON_OPTIONS.map(ico => <option key={ico} value={ico}>{ico}</option>)}
                </select>
              </div>
              <div className="admin-field">
                <label>Sub Icon</label>
                <select value={editingInterest.subIconName} onChange={e => setEditingInterest(p => ({ ...p, subIconName: e.target.value }))}>
                  {SUB_ICON_OPTIONS.map(ico => <option key={ico} value={ico}>{ico}</option>)}
                </select>
              </div>
            </div>

            <div className="admin-field" style={{ marginBottom: '1rem' }}>
              <label>Title</label>
              <input value={editingInterest.title} onChange={e => setEditingInterest(p => ({ ...p, title: e.target.value }))} placeholder="Music & Singing" />
            </div>

            <div className="admin-field">
              <label>Description</label>
              <textarea value={editingInterest.description} onChange={e => setEditingInterest(p => ({ ...p, description: e.target.value }))} rows={4} placeholder="Share your passion..." />
            </div>

            <div className="admin-modal-actions">
              <button className="btn-modal-cancel" onClick={() => setEditingInterest(null)}><X size={14} /> Cancel</button>
              <button className="btn-modal-save" onClick={() => saveInterest(editingInterest)}><Save size={14} /> Save</button>
            </div>
          </div>
        </div>
      )}

      {deleteTarget && (
        <ConfirmDialog
          message="Delete this interest card? This cannot be undone."
          onConfirm={() => deleteInterest(deleteTarget)}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </div>
  );
};

export default AdminInterests;
