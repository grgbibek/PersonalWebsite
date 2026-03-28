import React from 'react';
import { motion } from 'framer-motion';
import { Mic2, Plane, Navigation, Music } from 'lucide-react';
import './Interests.css';

const Interests = () => {
  return (
    <section id="interests" className="section">
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Beyond <span className="highlight">Code</span>
        </motion.h2>

        <div className="interests-wrapper">
          <div className="interests-text-content">
            <motion.div
              className="interest-card glass-panel"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="interest-header">
                <div className="interest-icon-wrapper">
                  <Mic2 size={24} className="interest-icon" />
                  <Music size={16} className="interest-sub-icon" />
                </div>
                <h3>Music & Singing</h3>
              </div>
              <p>
                When I'm not writing code, you can often find me immersed in music. I genuinely love singing
                and enjoy exploring different melodies in my free time. It's my favorite way to recharge and stay creative!
              </p>
            </motion.div>

            <motion.div
              className="interest-card glass-panel"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="interest-header">
                <div className="interest-icon-wrapper">
                  <Plane size={24} className="interest-icon" />
                  <Navigation size={16} className="interest-sub-icon" />
                </div>
                <h3>Traveling the World</h3>
              </div>
              <p>
                I'm a passionate traveler constantly looking for the next adventure. Whether it's exploring new cultures,
                trying exotic cuisines, or just enjoying nature, traveling broadens my perspective and inspires my day-to-day life.
              </p>
            </motion.div>
          </div>

          <motion.div
            className="artistic-gallery"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <div className="photo-frame frame-1">
              <img src="/beyond_code_1.jpg" alt="Music and Singing" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = "https://images.unsplash.com/photo-1506157786151-b8491531f063?q=80&w=800&auto=format&fit=crop"; }} />
            </div>
            <div className="photo-frame frame-2">
              <img src="/beyond_code_2.jpg" alt="Reading Nexus" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=800&auto=format&fit=crop"; }} />
            </div>
            <div className="photo-frame frame-3">
              <img src="/beyond_code_3.jpg" alt="Motorcycle trip" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = "https://images.unsplash.com/photo-1516280440502-a2fc997ee9af?q=80&w=800&auto=format&fit=crop"; }} />
            </div>
            <div className="photo-frame frame-4">
              <img src="/beyond_code_4.jpg" alt="Horse riding adventure" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = "https://images.unsplash.com/photo-1516280440502-a2fc997ee9af?q=80&w=800&auto=format&fit=crop"; }} />
            </div>
            <div className="photo-frame frame-5">
              <img src="/beyond_code_5.jpg" alt="Snow mountain exploration" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = "https://images.unsplash.com/photo-1516280440502-a2fc997ee9af?q=80&w=800&auto=format&fit=crop"; }} />
            </div>

            <div className="gallery-decoration blob-1"></div>
            <div className="gallery-decoration blob-2"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Interests;
