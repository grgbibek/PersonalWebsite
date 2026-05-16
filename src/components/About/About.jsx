import React from 'react';
import { motion } from 'framer-motion';
import { User, Code, Database, Globe } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import './About.css';

const iconMap = {
  Globe: <Globe size={32} className="about-icon" />,
  Database: <Database size={32} className="about-icon" />,
  Code: <Code size={32} className="about-icon" />,
  User: <User size={32} className="about-icon" />,
};

const About = () => {
  const { data } = usePortfolio();
  const about = data?.about || {};
  const cards = about.cards || [];
  const paragraphs = about.paragraphs || [];

  return (
    <section id="about" className="section">
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          About <span className="highlight">Me</span>
        </motion.h2>

        <div className="about-content">
          <motion.div
            className="about-text glass-panel"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="about-header">
              <User size={24} className="highlight" />
              <h3>Professional Summary</h3>
            </div>
            {paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </motion.div>

          <div className="about-cards">
            {cards.map((card, index) => (
              <motion.div
                key={card.id || index}
                className="about-card glass-panel"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 + (index * 0.1) }}
              >
                {iconMap[card.iconName] || <Globe size={32} className="about-icon" />}
                <h4>{card.title}</h4>
                <p>{card.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
