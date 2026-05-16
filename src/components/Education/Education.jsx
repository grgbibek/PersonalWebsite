import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Award } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import './Education.css';

const Education = () => {
  const { data } = usePortfolio();
  const edu = data?.education || {};
  const certifications = data?.certifications || [];

  return (
    <section id="education" className="section">
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Education & <span className="highlight">Certifications</span>
        </motion.h2>

        <div className="edu-cert-container">
          <motion.div
            className="edu-section"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="edu-header">
              <GraduationCap size={28} className="highlight" />
              <h3>Education</h3>
            </div>

            <div className="edu-card glass-panel">
              <h4>{edu.degree}</h4>
              <p className="institution">{edu.institution}</p>
              <div className="edu-date">{edu.period}</div>
              <p className="edu-desc">{edu.description}</p>
            </div>
          </motion.div>

          <motion.div
            className="cert-section"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="edu-header">
              <Award size={28} className="highlight" />
              <h3>Certifications</h3>
            </div>

            <div className="cert-cards">
              {certifications.map((cert, i) => (
                <div key={cert.id || i} className="cert-card glass-panel">
                  <div className="cert-badge">
                    <Award size={24} />
                  </div>
                  <div>
                    <h4>{cert.name}</h4>
                    <p className="cert-provider">{cert.provider}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Education;
