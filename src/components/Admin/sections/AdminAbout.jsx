import React, { useState, useEffect } from 'react';
import { Save, CheckCircle, Plus, Trash2, Edit3, X } from 'lucide-react';
import { usePortfolio } from '../../../context/PortfolioContext';
import { ConfirmDialog } from '../AdminPanel';

const ICON_OPTIONS = ['Globe', 'Database', 'Code', 'User', 'Cpu', 'Layers', 'Smartphone', 'Wrench'];

const AdminAbout = ({ showToast }) => {
  const { data, updateData } = usePortfolio();
  const [paragraphs, setParagraphs] = useState([]);
  const [cards, setCards] = useState([]);
  const [saved, setSaved] = useState(false);
  const [editingCard, setEditingCard] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  useEffect(() => {
    if (data?.about) {
      setParagraphs(data.about.paragraphs || []);
      setCards(data.about.cards || []);
    }
  }, [data?.about]);

  const handleSave = () => {
    updateData(prev => ({ ...prev, about: { paragraphs, cards } }));
    setSaved(true);
    showToast('About section saved!');
    setTimeout(() => setSaved(false), 2500);
  };

  const updateParagraph = (index, value) => {
    setParagraphs(prev => prev.map((p, i) => i === index ? value : p));
  };

  const addParagraph = () => setParagraphs(prev => [...prev, '']);

  const removeParagraph = (index) => {
    setParagraphs(prev => prev.filter((_, i) => i !== index));
  };

  const saveCard = (card) => {
    if (card.id && cards.find(c => c.id === card.id)) {
      setCards(prev => prev.map(c => c.id === card.id ? card : c));
    } else {
      setCards(prev => [...prev, { ...card, id: Date.now() }]);
    }
    setEditingCard(null);
  };

  const deleteCard = (id) => {
    setCards(prev => prev.filter(c => c.id !== id));
    setDeleteTarget(null);
    showToast('Card deleted', 'info');
  };

  return (
    <div>
      <div className="admin-section-header">
        <h2>About Me</h2>
        <p>Manage your professional summary paragraphs and feature cards</p>
      </div>

      {/* Paragraphs */}
      <div className="admin-card">
        <div className="admin-card-header">
          <h3>Professional Summary Paragraphs</h3>
          <button className="btn-add" onClick={addParagraph}><Plus size={14} /> Add Paragraph</button>
        </div>
        <div className="admin-list">
          {paragraphs.map((p, i) => (
            <div key={i} className="achievement-row">
              <div className="admin-field" style={{ flex: 1 }}>
                <textarea
                  value={p}
                  onChange={e => updateParagraph(i, e.target.value)}
                  rows={3}
                  placeholder="Enter paragraph text..."
                />
              </div>
              <button className="btn-icon delete" onClick={() => removeParagraph(i)} style={{ marginTop: '0.4rem' }}>
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Cards */}
      <div className="admin-card">
        <div className="admin-card-header">
          <h3>Feature Cards</h3>
          <button className="btn-add" onClick={() => setEditingCard({ iconName: 'Globe', title: '', desc: '' })}>
            <Plus size={14} /> Add Card
          </button>
        </div>
        <div className="admin-list">
          {cards.map(card => (
            <div key={card.id} className="admin-list-item">
              <div className="admin-list-item-body">
                <p className="admin-list-item-title">{card.title}</p>
                <p className="admin-list-item-sub">{card.desc?.substring(0, 80)}...</p>
              </div>
              <div className="admin-list-item-actions">
                <button className="btn-icon edit" onClick={() => setEditingCard({ ...card })}><Edit3 size={14} /></button>
                <button className="btn-icon delete" onClick={() => setDeleteTarget(card.id)}><Trash2 size={14} /></button>
              </div>
            </div>
          ))}
          {cards.length === 0 && <div className="admin-empty"><p>No cards yet. Add one above.</p></div>}
        </div>
      </div>

      <div className="admin-save-bar">
        <button className={`btn-save ${saved ? 'saved' : ''}`} onClick={handleSave}>
          {saved ? <><CheckCircle size={16} /> Saved!</> : <><Save size={16} /> Save Changes</>}
        </button>
      </div>

      {/* Card Modal */}
      {editingCard && (
        <div className="admin-modal-overlay">
          <div className="admin-modal">
            <h3>{editingCard.id ? 'Edit Card' : 'Add Card'}</h3>
            <div className="admin-field" style={{ marginBottom: '1rem' }}>
              <label>Icon</label>
              <select value={editingCard.iconName} onChange={e => setEditingCard(p => ({ ...p, iconName: e.target.value }))}>
                {ICON_OPTIONS.map(ico => <option key={ico} value={ico}>{ico}</option>)}
              </select>
            </div>
            <div className="admin-field" style={{ marginBottom: '1rem' }}>
              <label>Title</label>
              <input value={editingCard.title} onChange={e => setEditingCard(p => ({ ...p, title: e.target.value }))} placeholder="Card title" />
            </div>
            <div className="admin-field">
              <label>Description</label>
              <textarea value={editingCard.desc} onChange={e => setEditingCard(p => ({ ...p, desc: e.target.value }))} rows={3} placeholder="Card description..." />
            </div>
            <div className="admin-modal-actions">
              <button className="btn-modal-cancel" onClick={() => setEditingCard(null)}><X size={14} /> Cancel</button>
              <button className="btn-modal-save" onClick={() => saveCard(editingCard)}><Save size={14} /> Save Card</button>
            </div>
          </div>
        </div>
      )}

      {deleteTarget && (
        <ConfirmDialog
          message="Delete this card? This action cannot be undone."
          onConfirm={() => deleteCard(deleteTarget)}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </div>
  );
};

export default AdminAbout;
