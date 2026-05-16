import React, { useState, useEffect } from 'react';
import { Save, CheckCircle, Plus, Trash2, Edit3, X } from 'lucide-react';
import { usePortfolio } from '../../../context/PortfolioContext';
import { ConfirmDialog } from '../AdminPanel';

const AdminEducation = ({ showToast }) => {
  const { data, updateData } = usePortfolio();
  const [edu, setEdu] = useState({});
  const [certifications, setCertifications] = useState([]);
  const [saved, setSaved] = useState(false);
  const [editingCert, setEditingCert] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  useEffect(() => {
    if (data?.education) setEdu(data.education);
    if (data?.certifications) setCertifications(data.certifications);
  }, [data?.education, data?.certifications]);

  const handleSave = () => {
    updateData(prev => ({ ...prev, education: edu, certifications }));
    setSaved(true);
    showToast('Education & Certifications saved!');
    setTimeout(() => setSaved(false), 2500);
  };

  const saveCert = (cert) => {
    if (cert.id && certifications.find(c => c.id === cert.id)) {
      setCertifications(prev => prev.map(c => c.id === cert.id ? cert : c));
    } else {
      setCertifications(prev => [...prev, { ...cert, id: Date.now() }]);
    }
    setEditingCert(null);
  };

  const deleteCert = (id) => {
    setCertifications(prev => prev.filter(c => c.id !== id));
    setDeleteTarget(null);
    showToast('Certification deleted', 'info');
  };

  return (
    <div>
      <div className="admin-section-header">
        <h2>Education & Certifications</h2>
        <p>Update your academic background and professional certifications</p>
      </div>

      {/* Education */}
      <div className="admin-card">
        <div className="admin-card-header">
          <h3>Education</h3>
        </div>

        <div className="admin-form-row single">
          <div className="admin-field">
            <label>Degree / Program</label>
            <input value={edu.degree || ''} onChange={e => setEdu(p => ({ ...p, degree: e.target.value }))} placeholder="Bachelor of Science in Computer Science" />
          </div>
        </div>

        <div className="admin-form-row">
          <div className="admin-field">
            <label>Institution</label>
            <input value={edu.institution || ''} onChange={e => setEdu(p => ({ ...p, institution: e.target.value }))} placeholder="University Name" />
          </div>
          <div className="admin-field">
            <label>Period</label>
            <input value={edu.period || ''} onChange={e => setEdu(p => ({ ...p, period: e.target.value }))} placeholder="2013 - 2017" />
          </div>
        </div>

        <div className="admin-form-row single">
          <div className="admin-field">
            <label>Description</label>
            <textarea value={edu.description || ''} onChange={e => setEdu(p => ({ ...p, description: e.target.value }))} rows={2} />
          </div>
        </div>
      </div>

      {/* Certifications */}
      <div className="admin-card">
        <div className="admin-card-header">
          <h3>Certifications</h3>
          <button className="btn-add" onClick={() => setEditingCert({ name: '', provider: '' })}>
            <Plus size={14} /> Add Certification
          </button>
        </div>
        <div className="admin-list">
          {certifications.map((cert) => (
            <div key={cert.id} className="admin-list-item">
              <div className="admin-list-item-body">
                <p className="admin-list-item-title">{cert.name}</p>
                <p className="admin-list-item-sub">{cert.provider}</p>
              </div>
              <div className="admin-list-item-actions">
                <button className="btn-icon edit" onClick={() => setEditingCert({ ...cert })}><Edit3 size={14} /></button>
                <button className="btn-icon delete" onClick={() => setDeleteTarget(cert.id)}><Trash2 size={14} /></button>
              </div>
            </div>
          ))}
          {certifications.length === 0 && <div className="admin-empty"><p>No certifications yet.</p></div>}
        </div>
      </div>

      <div className="admin-save-bar">
        <button className={`btn-save ${saved ? 'saved' : ''}`} onClick={handleSave}>
          {saved ? <><CheckCircle size={16} /> Saved!</> : <><Save size={16} /> Save Changes</>}
        </button>
      </div>

      {/* Cert Modal */}
      {editingCert && (
        <div className="admin-modal-overlay">
          <div className="admin-modal">
            <h3>{editingCert.id ? 'Edit Certification' : 'Add Certification'}</h3>
            <div className="admin-field" style={{ marginBottom: '1rem' }}>
              <label>Certification Name</label>
              <input value={editingCert.name} onChange={e => setEditingCert(p => ({ ...p, name: e.target.value }))} placeholder="AWS Solutions Architect" />
            </div>
            <div className="admin-field">
              <label>Provider / Issuer</label>
              <input value={editingCert.provider} onChange={e => setEditingCert(p => ({ ...p, provider: e.target.value }))} placeholder="Amazon Web Services" />
            </div>
            <div className="admin-modal-actions">
              <button className="btn-modal-cancel" onClick={() => setEditingCert(null)}><X size={14} /> Cancel</button>
              <button className="btn-modal-save" onClick={() => saveCert(editingCert)}><Save size={14} /> Save</button>
            </div>
          </div>
        </div>
      )}

      {deleteTarget && (
        <ConfirmDialog
          message="Delete this certification? This cannot be undone."
          onConfirm={() => deleteCert(deleteTarget)}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </div>
  );
};

export default AdminEducation;
