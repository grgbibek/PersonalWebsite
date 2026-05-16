import React, { useState, useEffect } from 'react';
import { Save, CheckCircle, Plus, Trash2, Edit3, X } from 'lucide-react';
import { usePortfolio } from '../../../context/PortfolioContext';
import { ConfirmDialog } from '../AdminPanel';

const ICON_OPTIONS = ['Database', 'Layers', 'Cpu', 'Smartphone', 'RefreshCw', 'Code2', 'GitBranch', 'Wrench'];

const TagsEditor = ({ tags, onChange }) => {
  const [inputVal, setInputVal] = useState('');

  const addTag = () => {
    const trimmed = inputVal.trim();
    if (trimmed && !tags.includes(trimmed)) {
      onChange([...tags, trimmed]);
    }
    setInputVal('');
  };

  const removeTag = (tag) => onChange(tags.filter(t => t !== tag));

  return (
    <div className="tags-editor">
      {tags.map(tag => (
        <span key={tag} className="tag-chip">
          {tag}
          <button onClick={() => removeTag(tag)}><X size={11} /></button>
        </span>
      ))}
      <input
        className="admin-field tag-add-input"
        value={inputVal}
        onChange={e => setInputVal(e.target.value)}
        onKeyDown={e => { if (e.key === 'Enter' || e.key === ',') { e.preventDefault(); addTag(); } }}
        placeholder="Type & press Enter..."
      />
    </div>
  );
};

const AdminSkills = ({ showToast }) => {
  const { data, updateData } = usePortfolio();
  const [skills, setSkills] = useState([]);
  const [saved, setSaved] = useState(false);
  const [editingCat, setEditingCat] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  useEffect(() => {
    if (data?.skills) setSkills(data.skills);
  }, [data?.skills]);

  const handleSave = () => {
    updateData(prev => ({ ...prev, skills }));
    setSaved(true);
    showToast('Skills saved!');
    setTimeout(() => setSaved(false), 2500);
  };

  const saveCat = (cat) => {
    if (cat.id && skills.find(s => s.id === cat.id)) {
      setSkills(prev => prev.map(s => s.id === cat.id ? cat : s));
    } else {
      setSkills(prev => [...prev, { ...cat, id: Date.now() }]);
    }
    setEditingCat(null);
  };

  const deleteCat = (id) => {
    setSkills(prev => prev.filter(s => s.id !== id));
    setDeleteTarget(null);
    showToast('Category deleted', 'info');
  };

  return (
    <div>
      <div className="admin-section-header">
        <h2>Technical Skills</h2>
        <p>Manage skill categories and individual skills</p>
      </div>

      <div className="admin-card">
        <div className="admin-card-header">
          <h3>Skill Categories</h3>
          <button className="btn-add" onClick={() => setEditingCat({ iconName: 'Code2', title: '', skills: [] })}>
            <Plus size={14} /> Add Category
          </button>
        </div>
        <div className="admin-list">
          {skills.map((cat) => (
            <div key={cat.id} className="admin-list-item">
              <div className="admin-list-item-body">
                <p className="admin-list-item-title">{cat.title}</p>
                <p className="admin-list-item-sub">{(cat.skills || []).join(', ')}</p>
              </div>
              <div className="admin-list-item-actions">
                <button className="btn-icon edit" onClick={() => setEditingCat({ ...cat, skills: [...(cat.skills || [])] })}><Edit3 size={14} /></button>
                <button className="btn-icon delete" onClick={() => setDeleteTarget(cat.id)}><Trash2 size={14} /></button>
              </div>
            </div>
          ))}
          {skills.length === 0 && <div className="admin-empty"><p>No skill categories yet.</p></div>}
        </div>
      </div>

      <div className="admin-save-bar">
        <button className={`btn-save ${saved ? 'saved' : ''}`} onClick={handleSave}>
          {saved ? <><CheckCircle size={16} /> Saved!</> : <><Save size={16} /> Save Changes</>}
        </button>
      </div>

      {/* Category Modal */}
      {editingCat && (
        <div className="admin-modal-overlay">
          <div className="admin-modal">
            <h3>{editingCat.id ? 'Edit Category' : 'Add Category'}</h3>

            <div className="admin-form-row">
              <div className="admin-field">
                <label>Category Name</label>
                <input value={editingCat.title} onChange={e => setEditingCat(p => ({ ...p, title: e.target.value }))} placeholder="Backend Development" />
              </div>
              <div className="admin-field">
                <label>Icon</label>
                <select value={editingCat.iconName} onChange={e => setEditingCat(p => ({ ...p, iconName: e.target.value }))}>
                  {ICON_OPTIONS.map(ico => <option key={ico} value={ico}>{ico}</option>)}
                </select>
              </div>
            </div>

            <div className="admin-field" style={{ marginTop: '0.5rem' }}>
              <label>Skills (press Enter or comma to add)</label>
              <TagsEditor
                tags={editingCat.skills || []}
                onChange={tags => setEditingCat(p => ({ ...p, skills: tags }))}
              />
            </div>

            <div className="admin-modal-actions">
              <button className="btn-modal-cancel" onClick={() => setEditingCat(null)}><X size={14} /> Cancel</button>
              <button className="btn-modal-save" onClick={() => saveCat(editingCat)}><Save size={14} /> Save</button>
            </div>
          </div>
        </div>
      )}

      {deleteTarget && (
        <ConfirmDialog
          message="Delete this skill category? This cannot be undone."
          onConfirm={() => deleteCat(deleteTarget)}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </div>
  );
};

export default AdminSkills;
