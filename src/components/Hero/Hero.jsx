import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, MapPin, Phone } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import './Hero.css';

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

const Hero = () => {
  const { data } = usePortfolio();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const hero = data?.hero || {};
  const images = hero.profileImages || ["/photo1.jpg", "/photo2.jpg", "/photo3.jpg"];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [images.length]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 10 }
    }
  };

  return (
    <section id="home" className="hero-section">
      <div className="container hero-container">
        <div className="hero-content">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.span variants={itemVariants} className="greeting">{hero.greeting || "Hello, I'm"}</motion.span>
            <motion.h1 variants={itemVariants} className="name">{hero.name || "Bibek Gurung"}</motion.h1>
            <motion.h2 variants={itemVariants} className="title highlight">{hero.title || "Senior Software Engineer"}</motion.h2>

            <motion.p variants={itemVariants} className="summary">
              {hero.summary}
            </motion.p>

            <motion.div variants={itemVariants} className="contact-info">
              <div className="info-item">
                <MapPin size={18} className="info-icon" />
                <span>{hero.location}</span>
              </div>
              <div className="info-item">
                <Phone size={18} className="info-icon" />
                <span>{hero.phone}</span>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="hero-actions">
              <a href="#contact" className="btn btn-primary">Get In Touch</a>
              <a href="#experience" className="btn btn-outline">View Experience</a>
            </motion.div>

            <motion.div variants={itemVariants} className="social-links">
              {hero.linkedinUrl && (
                <a href={hero.linkedinUrl} target="_blank" rel="noopener noreferrer" className="social-icon">
                  <LinkedinIcon size={24} />
                </a>
              )}
              {hero.instagramUrl && (
                <a href={hero.instagramUrl} target="_blank" rel="noopener noreferrer" className="social-icon">
                  <InstagramIcon size={24} />
                </a>
              )}
              {hero.email && (
                <a href={`mailto:${hero.email}`} className="social-icon">
                  <Mail size={24} />
                </a>
              )}
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          className="hero-image-container"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, type: "spring", bounce: 0.4, delay: 0.4 }}
        >
          <div className="profile-image-wrapper">
            <AnimatePresence mode="wait">
              <motion.img
                key={currentImageIndex}
                src={images[currentImageIndex]}
                alt={hero.name || "Profile"}
                className="hero-profile-img"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
              />
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
