import React, { useState, useEffect } from 'react';
import { Save, CheckCircle, Plus, Trash2, Edit3, X } from 'lucide-react';
import { usePortfolio } from '../../../context/PortfolioContext';
import { ConfirmDialog } from '../AdminPanel';

const AdminExperience = ({ showToast }) => {
  const { data, updateData } = usePortfolio();
  const [experiences, setExperiences] = useState([]);
  const [saved, setSaved] = useState(false);
  const [editingExp, setEditingExp] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  useEffect(() => {
    if (data?.experiences) setExperiences(data.experiences);
  }, [data?.experiences]);

  const handleSave = () => {
    updateData(prev => ({ ...prev, experiences }));
    setSaved(true);
    showToast('Experience section saved!');
    setTimeout(() => setSaved(false), 2500);
  };

  const saveExp = (exp) => {
    if (exp.id && experiences.find(e => e.id === exp.id)) {
      setExperiences(prev => prev.map(e => e.id === exp.id ? exp : e));
    } else {
      setExperiences(prev => [...prev, { ...exp, id: Date.now() }]);
    }
    setEditingExp(null);
  };

  const deleteExp = (id) => {
    setExperiences(prev => prev.filter(e => e.id !== id));
    setDeleteTarget(null);
    showToast('Experience entry deleted', 'info');
  };

  const addAchievement = () => {
    setEditingExp(prev => ({ ...prev, achievements: [...(prev.achievements || []), ''] }));
  };

  const updateAchievement = (i, value) => {
    setEditingExp(prev => ({
      ...prev,
      achievements: prev.achievements.map((a, idx) => idx === i ? value : a)
    }));
  };

  const removeAchievement = (i) => {
    setEditingExp(prev => ({
      ...prev,
      achievements: prev.achievements.filter((_, idx) => idx !== i)
    }));
  };

  return (
    <div>
      <div className="admin-section-header">
        <h2>Professional Experience</h2>
        <p>Add, edit, or reorder your work history</p>
      </div>

      <div className="admin-card">
        <div className="admin-card-header">
          <h3>Work History</h3>
          <button className="btn-add" onClick={() => setEditingExp({ role: '', company: '', period: '', achievements: [''] })}>
            <Plus size={14} /> Add Experience
          </button>
        </div>
        <div className="admin-list">
          {experiences.map((exp) => (
            <div key={exp.id} className="admin-list-item">
              <div className="admin-list-item-body">
                <p className="admin-list-item-title">{exp.role}</p>
                <p className="admin-list-item-sub">{exp.company} · {exp.period}</p>
              </div>
              <div className="admin-list-item-actions">
                <button className="btn-icon edit" onClick={() => setEditingExp({ ...exp, achievements: [...(exp.achievements || [])] })}><Edit3 size={14} /></button>
                <button className="btn-icon delete" onClick={() => setDeleteTarget(exp.id)}><Trash2 size={14} /></button>
              </div>
            </div>
          ))}
          {experiences.length === 0 && <div className="admin-empty"><p>No experience entries yet.</p></div>}
        </div>
      </div>

      <div className="admin-save-bar">
        <button className={`btn-save ${saved ? 'saved' : ''}`} onClick={handleSave}>
          {saved ? <><CheckCircle size={16} /> Saved!</> : <><Save size={16} /> Save Changes</>}
        </button>
      </div>

      {/* Experience Modal */}
      {editingExp && (
        <div className="admin-modal-overlay">
          <div className="admin-modal">
            <h3>{editingExp.id ? 'Edit Experience' : 'Add Experience'}</h3>

            <div className="admin-form-row">
              <div className="admin-field">
                <label>Job Title / Role</label>
                <input value={editingExp.role} onChange={e => setEditingExp(p => ({ ...p, role: e.target.value }))} placeholder="Senior Software Engineer" />
              </div>
              <div className="admin-field">
                <label>Company</label>
                <input value={editingExp.company} onChange={e => setEditingExp(p => ({ ...p, company: e.target.value }))} placeholder="Acme Corp" />
              </div>
            </div>

            <div className="admin-field" style={{ marginBottom: '1rem' }}>
              <label>Period</label>
              <input value={editingExp.period} onChange={e => setEditingExp(p => ({ ...p, period: e.target.value }))} placeholder="January 2022 – Present" />
            </div>

            <div className="admin-field">
              <label>Achievements / Responsibilities</label>
              <div className="achievements-list" style={{ marginTop: '0.5rem' }}>
                {(editingExp.achievements || []).map((a, i) => (
                  <div key={i} className="achievement-row">
                    <input
                      value={a}
                      onChange={e => updateAchievement(i, e.target.value)}
                      placeholder={`Achievement ${i + 1}...`}
                    />
                    <button className="btn-icon delete" onClick={() => removeAchievement(i)} style={{ flexShrink: 0 }}>
                      <X size={12} />
                    </button>
                  </div>
                ))}
                <button className="btn-add" style={{ marginTop: '0.5rem' }} onClick={addAchievement}>
                  <Plus size={14} /> Add Item
                </button>
              </div>
            </div>

            <div className="admin-modal-actions">
              <button className="btn-modal-cancel" onClick={() => setEditingExp(null)}><X size={14} /> Cancel</button>
              <button className="btn-modal-save" onClick={() => saveExp(editingExp)}><Save size={14} /> Save</button>
            </div>
          </div>
        </div>
      )}

      {deleteTarget && (
        <ConfirmDialog
          message="Delete this experience entry? This cannot be undone."
          onConfirm={() => deleteExp(deleteTarget)}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </div>
  );
};

export default AdminExperience;
