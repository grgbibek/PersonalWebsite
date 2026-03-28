import React from 'react';
import { motion } from 'framer-motion';
import { Layers, Database, Code2, Cpu, Wrench, RefreshCw, Smartphone, GitBranch } from 'lucide-react';
import './Skills.css';

const Skills = () => {
  const skillCategories = [
    {
      title: "Backend Development",
      icon: <Database className="skill-icon" size={24} />,
      skills: ["C#", "ASP.NET MVC / CORE", "Entity Framework", "Dapper", "REST API", "Microservices"]
    },
    {
      title: "Database & Caching",
      icon: <Layers className="skill-icon" size={24} />,
      skills: ["SQL Server", "MySQL", "Postgres", "Redis", "RabbitMQ"]
    },
    {
      title: "Cloud & Serverless",
      icon: <Cpu className="skill-icon" size={24} />,
      skills: ["Azure (App Service, Key Vault)", "Azure Service Bus / Storage", "AWS Lambda", "AWS S3 / Event Bridge"]
    },
    {
      title: "Frontend Development",
      icon: <Smartphone className="skill-icon" size={24} />,
      skills: ["React", "Angular", "VueJS", "Javascript / ES6", "Typescript", "HTML / CSS / Tailwind"]
    },
    {
      title: "DevOps & CI/CD",
      icon: <RefreshCw className="skill-icon" size={24} />,
      skills: ["Azure CI/CD", "Bamboo", "Octopus"]
    },
    {
      title: "Testing Frameworks",
      icon: <Code2 className="skill-icon" size={24} />,
      skills: ["MS Test", "NUnit", "Moq", "Unit Testing"]
    },
    {
      title: "Version Control",
      icon: <GitBranch className="skill-icon" size={24} />,
      skills: ["Git", "SVN", "TFS"]
    },
    {
      title: "Methodologies & Tools",
      icon: <Wrench className="skill-icon" size={24} />,
      skills: ["Agile (Scrum/Kanban)", "SAFe Framework", "Jira", "Trello", "Redmine"]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
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
              key={index} 
              className="skill-category glass-panel"
              variants={itemVariants}
            >
              <div className="category-header">
                {category.icon}
                <h3>{category.title}</h3>
              </div>
              <ul className="skill-list">
                {category.skills.map((skill, i) => (
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
