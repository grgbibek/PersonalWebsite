import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar } from 'lucide-react';
import './Experience.css';

const Experience = () => {
  const experiences = [
    {
      id: 1,
      role: "Senior Software Engineer",
      company: "Infinite Computer Solutions",
      period: "June 2023 – Present",
      achievements: [
        "Managed customization of clients' systems from requirements to deployment.",
        "Developed and implemented microservices architecture for applications, enhancing scalability.",
        "Integrated RabbitMQ messaging system for seamless communication between microservices.",
        "Implemented secure RESTful APIs with .NET Core 6.",
        "Utilized Angular 14 to develop user-friendly front-end interfaces.",
        "Implemented CQRS pattern to optimize performance and scalability.",
        "Integrated Redis for in-memory caching, reducing database load significantly.",
        "Used Kibana for visualizing and analyzing data to find error logs efficiently."
      ]
    },
    {
      id: 2,
      role: "Senior Software Engineer",
      company: "Vesuvio Labs",
      period: "February 2021 – March 2023",
      achievements: [
        "Oversee the entire software development lifecycle, ensuring alignment with business objectives.",
        "Led Azure CI/CD deployment for seamless software delivery.",
        "Led Upgrade of applications from ASP.NET Core 2.1 to ASP.NET Core 6.",
        "Optimized SQL Server databases by adding indexes and rewriting complex joins.",
        "Implemented design patterns (Singleton, Factory) and followed SOLID principles.",
        "Developed comprehensive unit tests using NUnit and Moq frameworks.",
        "Implemented Route Protection (CanActivate, CanLoad) in Angular to secure application routes.",
        "Minimized JavaScript and CSS files, improving page load time by 40%."
      ]
    },
    {
      id: 3,
      role: "Mid Software Engineer (.NET)",
      company: "Inficare Pvt Ltd",
      period: "August 2019 - February 2021",
      achievements: [
        "Led the migration of applications from Classic ASP to ASP.NET MVC 5.",
        "Demonstrated proficiency in C#, ASP.NET, .NET Core, MVC, Web API, EF, and SQL Server.",
        "Investigated and resolved complex technical issues, performing root cause analyses.",
        "Batched multiple API calls into a single request, improving data synchronization speed by 50%."
      ]
    },
    {
      id: 4,
      role: "Jr Software Engineer (.NET)",
      company: "Inficare Pvt Ltd",
      period: "August 2018 - August 2019",
      achievements: [
        "Assisted in designing, developing, and maintaining .NET applications.",
        "Debugged applications to resolve logical and programming issues.",
        "Contributed to fixing design-related issues improving usability.",
        "Assisted in testing software functionality and performance to ensure quality."
      ]
    }
  ];

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
                  {exp.achievements.map((achievement, i) => (
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
