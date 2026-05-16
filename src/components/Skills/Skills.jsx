import React from 'react';
import { motion } from 'framer-motion';
import { Layers, Database, Code2, Cpu, Wrench, RefreshCw, Smartphone, GitBranch } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import './Skills.css';

const iconMap = {
  Database: <Database className="skill-icon" size={24} />,
  Layers: <Layers className="skill-icon" size={24} />,
  Cpu: <Cpu className="skill-icon" size={24} />,
  Smartphone: <Smartphone className="skill-icon" size={24} />,
  RefreshCw: <RefreshCw className="skill-icon" size={24} />,
  Code2: <Code2 className="skill-icon" size={24} />,
  GitBranch: <GitBranch className="skill-icon" size={24} />,
  Wrench: <Wrench className="skill-icon" size={24} />,
};

const Skills = () => {
  const { data } = usePortfolio();
  const skillCategories = data?.skills || [];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } }
  };

  return (
    <section id="skills" className="section">
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Technical <span className="highlight">Skills</span>
        </motion.h2>

        <motion.div
          className="skills-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.id || index}
              className="skill-category glass-panel"
              variants={itemVariants}
            >
              <div className="category-header">
                {iconMap[category.iconName] || <Wrench className="skill-icon" size={24} />}
                <h3>{category.title}</h3>
              </div>
              <ul className="skill-list">
                {(category.skills || []).map((skill, i) => (
                  <li key={i} className="skill-tag">{skill}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
