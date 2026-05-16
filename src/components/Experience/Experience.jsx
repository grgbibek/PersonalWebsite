import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import './Experience.css';

const Experience = () => {
  const { data } = usePortfolio();
  const experiences = data?.experiences || [];

  return (
    <section id="experience" className="section">
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Professional <span className="highlight">Experience</span>
        </motion.h2>

        <div className="timeline">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              className="timeline-item"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="timeline-dot">
                <Briefcase size={20} />
              </div>

              <div className="timeline-content glass-panel">
                <div className="timeline-header">
                  <h3 className="timeline-role">{exp.role}</h3>
                  <div className="timeline-company">{exp.company}</div>
                </div>

                <div className="timeline-period">
                  <Calendar size={16} />
                  <span>{exp.period}</span>
                </div>

                <ul className="timeline-achievements">
                  {(exp.achievements || []).map((achievement, i) => (
                    <li key={i}>{achievement}</li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
