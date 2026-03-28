import React from 'react';
import { motion } from 'framer-motion';
import { User, Code, Database, Globe } from 'lucide-react';
import './About.css';

const About = () => {
  const cards = [
    {
      icon: <Globe size={32} className="about-icon" />,
      title: "Full-Stack Development",
      desc: "Building scalable web applications from frontend to backend using modern technologies like .NET, React, and Angular."
    },
    {
      icon: <Database size={32} className="about-icon" />,
      title: "Architecture & Microservices",
      desc: "Designing robust microservices architectures and leveraging message brokers like RabbitMQ to ensure system reliability."
    },
    {
      icon: <Code size={32} className="about-icon" />,
      title: "Clean Code & Best Practices",
      desc: "Dedicated to SOLID principles, design patterns (CQRS, Singleton), and writing maintainable, testable code."
    }
  ];

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
            <p>
              I am an experienced Senior .NET Engineer with over 8 years of proven expertise in software development using Microsoft .NET technologies. 
              My background encompasses the entire full-stack spectrum, bridging heavy lifting on the backend with responsive, user-friendly frontend interfaces.
            </p>
            <p>
              I take pride in delivering high-quality, scalable solutions and thriving in leadership roles, where I mentor teams and ensure effective communication. 
              Always enthusiastic about staying updated on industry trends, I continuously seek ways to enhance our development processes and product quality.
            </p>
          </motion.div>

          <div className="about-cards">
            {cards.map((card, index) => (
              <motion.div 
                key={index}
                className="about-card glass-panel"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 + (index * 0.1) }}
              >
                {card.icon}
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
