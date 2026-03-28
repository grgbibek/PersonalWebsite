import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Award } from 'lucide-react';
import './Education.css';

const Education = () => {
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
              <h4>Bachelor of Science in Computer Science and Information Technology</h4>
              <p className="institution">Tribhuvan University</p>
              <div className="edu-date">2013 - 2017</div>
              <p className="edu-desc">
                Foundation in software engineering, algorithms, data structures, and computer architecture.
              </p>
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
              <div className="cert-card glass-panel">
                <div className="cert-badge">
                  <Award size={24} />
                </div>
                <div>
                  <h4>SAFe 6 Practitioner</h4>
                  <p className="cert-provider">Scaled Agile Framework</p>
                </div>
              </div>

              <div className="cert-card glass-panel">
                <div className="cert-badge">
                  <Award size={24} />
                </div>
                <div>
                  <h4>Build App using Angular and .NET Core</h4>
                  <p className="cert-provider">Udemy (35hrs course)</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Education;
