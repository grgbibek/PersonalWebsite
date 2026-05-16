import React from 'react';
import { Mail } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import './Footer.css';

const LinkedinIcon = ({ size }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

const InstagramIcon = ({ size }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const Footer = () => {
  const { data } = usePortfolio();
  const hero = data?.hero || {};

  return (
    <footer className="footer section">
      <div className="container">
        <div className="footer-content">
          <div className="footer-logo">
            <h2>{hero.name?.split(' ')[0] || 'Bibek'}<span className="highlight">.</span></h2>
            <p>{hero.title || 'Senior Software Engineer'} building scalable, high-performance solutions.</p>
          </div>

          <div className="footer-links">
            {hero.linkedinUrl && (
              <a href={hero.linkedinUrl} target="_blank" rel="noopener noreferrer" className="footer-icon">
                <LinkedinIcon size={22} />
              </a>
            )}
            {hero.instagramUrl && (
              <a href={hero.instagramUrl} target="_blank" rel="noopener noreferrer" className="footer-icon">
                <InstagramIcon size={22} />
              </a>
            )}
            {hero.email && (
              <a href={`mailto:${hero.email}`} className="footer-icon">
                <Mail size={22} />
              </a>
            )}
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} {hero.name || 'Bibek Gurung'}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
