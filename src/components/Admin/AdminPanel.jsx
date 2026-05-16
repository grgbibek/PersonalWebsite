import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Shield, LogOut, Eye, RotateCcw, LayoutDashboard,
  User, Briefcase, Code2, GraduationCap, Heart,
  Phone, CheckCircle, AlertCircle, Info
} from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import AdminHero from './sections/AdminHero';
import AdminAbout from './sections/AdminAbout';
import AdminExperience from './sections/AdminExperience';
import AdminSkills from './sections/AdminSkills';
import AdminEducation from './sections/AdminEducation';
import AdminInterests from './sections/AdminInterests';
import AdminContact from './sections/AdminContact';
import './Admin.css';

// ─── Password (simple client-side guard) ───
const ADMIN_PASSWORD = 'JohnWick2';

// ─── Toast ───
export const Toast = ({ toast, onClose }) => {
  if (!toast) return null;
  const icons = { success: <CheckCircle size={18} />, error: <AlertCircle size={18} />, info: <Info size={18} /> };
  return (
    <motion.div
      className={`admin-toast ${toast.type}`}
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
    >
      {icons[toast.type]}
      <span>{toast.message}</span>
    </motion.div>
  );
};

// ─── Confirm Dialog ───
export const ConfirmDialog = ({ message, onConfirm, onCancel }) => (
  <div className="confirm-overlay">
    <motion.div className="confirm-box" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
      <h4>Are you sure?</h4>
      <p>{message}</p>
      <div className="confirm-actions">
        <button className="btn-confirm-no" onClick={onCancel}>Cancel</button>
        <button className="btn-confirm-yes" onClick={onConfirm}>Delete</button>
      </div>
    </motion.div>
  </div>
);

// ─── Login Screen ───
const LoginScreen = ({ onLogin }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      if (password === ADMIN_PASSWORD) {
        onLogin();
      } else {
        setError('Incorrect password. Please try again.');
        setLoading(false);
      }
    }, 600);
  };

  return (
    <div className="admin-login">
      <motion.div className="login-card" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
        <div className="login-logo">
          <div className="login-logo-icon">
            <Shield size={22} color="white" />
          </div>
          <div>
            <h1>Admin Panel</h1>
            <p>Portfolio Management</p>
          </div>
        </div>

        <h2>Welcome back</h2>
        <p>Enter your password to access the admin panel.</p>

        <form onSubmit={handleSubmit}>
          <div className="admin-input-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter admin password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(''); }}
              autoFocus
            />
          </div>

          <AnimatePresence>
            {error && (
              <motion.div className="login-error" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
                <AlertCircle size={16} /> {error}
              </motion.div>
            )}
          </AnimatePresence>

          <button type="submit" className="btn-admin-login" disabled={loading}>
            {loading ? 'Verifying...' : 'Sign In →'}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

// ─── Sidebar Nav ───
const NAV_ITEMS = [
  { id: 'hero', label: 'Hero / Profile', icon: User },
  { id: 'about', label: 'About Me', icon: LayoutDashboard },
  { id: 'experience', label: 'Experience', icon: Briefcase },
  { id: 'skills', label: 'Skills', icon: Code2 },
  { id: 'education', label: 'Education', icon: GraduationCap },
  { id: 'interests', label: 'Interests', icon: Heart },
  { id: 'contact', label: 'Contact Info', icon: Phone },
];

// ─── Main Admin Panel ───
const AdminPanel = () => {
  const { resetToDefaults } = usePortfolio();
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return sessionStorage.getItem('admin_auth') === '1';
  });
  const [activeSection, setActiveSection] = useState('hero');
  const [toast, setToast] = useState(null);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const showToast = useCallback((message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  }, []);

  const handleLogin = () => {
    sessionStorage.setItem('admin_auth', '1');
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('admin_auth');
    setIsLoggedIn(false);
  };

  const handleReset = async () => {
    await resetToDefaults();
    setShowResetConfirm(false);
    showToast('Data reset to defaults successfully!', 'info');
  };

  if (!isLoggedIn) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  const sectionMap = {
    hero: <AdminHero showToast={showToast} />,
    about: <AdminAbout showToast={showToast} />,
    experience: <AdminExperience showToast={showToast} />,
    skills: <AdminSkills showToast={showToast} />,
    education: <AdminEducation showToast={showToast} />,
    interests: <AdminInterests showToast={showToast} />,
    contact: <AdminContact showToast={showToast} />,
  };

  return (
    <div className="admin-wrapper">
      {/* Top Bar */}
      <header className="admin-topbar">
        <div className="topbar-left">
          <div className="topbar-logo-icon">
            <Shield size={18} color="white" />
          </div>
          <div>
            <h2>Portfolio Admin</h2>
            <span>Content Management</span>
          </div>
        </div>
        <div className="topbar-right">
          <a href="/" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
            <button className="btn-topbar preview">
              <Eye size={15} /> Preview Site
            </button>
          </a>
          <button className="btn-topbar reset" onClick={() => setShowResetConfirm(true)}>
            <RotateCcw size={15} /> Reset Defaults
          </button>
          <button className="btn-topbar logout" onClick={handleLogout}>
            <LogOut size={15} /> Logout
          </button>
        </div>
      </header>

      <div className="admin-body">
        {/* Sidebar */}
        <aside className="admin-sidebar">
          <div className="sidebar-section-label">Sections</div>
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                className={`sidebar-nav-btn ${activeSection === item.id ? 'active' : ''}`}
                onClick={() => setActiveSection(item.id)}
              >
                <Icon size={16} />
                {item.label}
              </button>
            );
          })}
        </aside>

        {/* Content */}
        <main className="admin-content">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {sectionMap[activeSection]}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* Toast */}
      <AnimatePresence>
        {toast && <Toast toast={toast} onClose={() => setToast(null)} />}
      </AnimatePresence>

      {/* Reset Confirm */}
      {showResetConfirm && (
        <ConfirmDialog
          message="This will reset ALL content to the original defaults stored in portfolioData.json."
          onConfirm={handleReset}
          onCancel={() => setShowResetConfirm(false)}
        />
      )}
    </div>
  );
};

export default AdminPanel;
