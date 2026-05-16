import React, { useState, useEffect } from 'react';
import { User, Save, CheckCircle } from 'lucide-react';
import { usePortfolio } from '../../../context/PortfolioContext';

const AdminHero = ({ showToast }) => {
  const { data, updateData } = usePortfolio();
  const [form, setForm] = useState({});
  const [imagesText, setImagesText] = useState('');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (data?.hero) {
      setForm(data.hero);
      setImagesText((data.hero.profileImages || []).join('\n'));
    }
  }, [data?.hero]);

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = () => {
    const profileImages = imagesText
      .split('\n')
      .map(s => s.trim())
      .filter(Boolean);

    updateData(prev => ({ ...prev, hero: { ...form, profileImages } }));
    setSaved(true);
    showToast('Hero section saved!');
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div>
      <div className="admin-section-header">
        <h2>Hero / Profile</h2>
        <p>Update your name, title, tagline, contact info, and social links</p>
      </div>

      <div className="admin-card">
        <div className="admin-card-header">
          <h3><User size={16} /> Personal Info</h3>
        </div>

        <div className="admin-form-row">
          <div className="admin-field">
            <label>Greeting Text</label>
            <input name="greeting" value={form.greeting || ''} onChange={handleChange} placeholder="Hello, I'm" />
          </div>
          <div className="admin-field">
            <label>Full Name</label>
            <input name="name" value={form.name || ''} onChange={handleChange} placeholder="Bibek Gurung" />
          </div>
        </div>

        <div className="admin-form-row">
          <div className="admin-field">
            <label>Job Title</label>
            <input name="title" value={form.title || ''} onChange={handleChange} placeholder="Senior Software Engineer" />
          </div>
          <div className="admin-field">
            <label>Location</label>
            <input name="location" value={form.location || ''} onChange={handleChange} placeholder="Kathmandu, Nepal" />
          </div>
        </div>

        <div className="admin-form-row single">
          <div className="admin-field">
            <label>Summary / Tagline</label>
            <textarea name="summary" value={form.summary || ''} onChange={handleChange} rows={3} placeholder="Brief professional summary..." />
          </div>
        </div>

        <div className="admin-form-row">
          <div className="admin-field">
            <label>Email</label>
            <input name="email" type="email" value={form.email || ''} onChange={handleChange} placeholder="you@example.com" />
          </div>
          <div className="admin-field">
            <label>Phone</label>
            <input name="phone" value={form.phone || ''} onChange={handleChange} placeholder="+1 234 567 890" />
          </div>
        </div>

        <div className="admin-form-row">
          <div className="admin-field">
            <label>LinkedIn URL</label>
            <input name="linkedinUrl" value={form.linkedinUrl || ''} onChange={handleChange} placeholder="https://linkedin.com/in/..." />
          </div>
          <div className="admin-field">
            <label>Instagram URL</label>
            <input name="instagramUrl" value={form.instagramUrl || ''} onChange={handleChange} placeholder="https://instagram.com/..." />
          </div>
        </div>

        <div className="admin-form-row single">
          <div className="admin-field">
            <label>Profile Images (one path per line)</label>
            <textarea
              value={imagesText}
              onChange={e => setImagesText(e.target.value)}
              rows={4}
              placeholder={"/photo1.jpg\n/photo2.jpg\n/photo3.jpg"}
            />
          </div>
        </div>

        <div className="admin-save-bar">
          <button className={`btn-save ${saved ? 'saved' : ''}`} onClick={handleSave}>
            {saved ? <><CheckCircle size={16} /> Saved!</> : <><Save size={16} /> Save Changes</>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminHero;
