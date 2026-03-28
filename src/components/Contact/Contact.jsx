import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, MapPin, Phone, Send, CheckCircle2, Loader2, XCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState('idle'); // idle, sending, success, error

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status === 'sending') return;

    setStatus('sending');

    // EmailJS service, template and public key from environment variables
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    try {
      const templateParams = {
        name: formData.name,       // Matches {{name}} in your template
        email: formData.email,      // Matches {{email}} in your template
        reply_to: formData.email,   // Matches {{email}} in Reply To
        title: formData.subject,    // Matches {{title}} in Subject
        message: formData.message,  // Matches {{message}} in Content
        to_name: 'Bibek',
      };
      console.log(templateParams);
      await emailjs.send(serviceId, templateId, templateParams, publicKey);

      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });

      // Reset back to idle after 5 seconds
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      console.error('Error sending email:', error);
      setStatus('error');
      // Reset to idle to allow re-trying
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <section id="contact" className="section">
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Get In <span className="highlight">Touch</span>
        </motion.h2>

        <div className="contact-wrapper">
          <motion.div
            className="contact-info glass-panel"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3>Contact Information</h3>
            <p className="contact-desc">
              Whether you have a question, a project idea, or just want to say hi,
              feel free to reach out. I'll get back to you as soon as possible!
            </p>

            <div className="info-list">
              <div className="info-item">
                <div className="info-icon">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4>Location</h4>
                  <p>Kathmandu, Nepal</p>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon">
                  <Phone size={24} />
                </div>
                <div>
                  <h4>Phone Number</h4>
                  <p>+971 9841543104</p>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon">
                  <Mail size={24} />
                </div>
                <div>
                  <h4>Email Address</h4>
                  <p>grgbibek22@gmail.com</p>
                </div>
              </div>
            </div>

            <div className="extras">
              <h4>Extras:</h4>
              <p>• Familiar with Logistics, Fintech, and Insurtech Systems.</p>
              <p>• Proficient in analyzing complex problems & logical solutions.</p>
              <p>• Quickly adapt to innovative technologies & methodologies.</p>
            </div>
          </motion.div>

          <motion.div
            className="contact-form glass-panel"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  placeholder="John Doe"
                  required
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  placeholder="john@example.com"
                  required
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input
                  type="text"
                  id="subject"
                  placeholder="Project Inquiry"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  rows="5"
                  placeholder="Your message here..."
                  required
                  value={formData.message}
                  onChange={handleChange}
                ></textarea>
              </div>

              <button
                type="submit"
                className={`btn btn-primary submit-btn ${status !== 'idle' ? 'disabled' : ''}`}
                disabled={status !== 'idle'}
              >
                <AnimatePresence mode="wait">
                  {status === 'sending' ? (
                    <motion.div
                      key="sending"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="btn-content"
                    >
                      <span>Sending...</span>
                      <Loader2 size={18} className="animate-spin" />
                    </motion.div>
                  ) : status === 'success' ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="btn-content success"
                    >
                      <span>Sent!</span>
                      <CheckCircle2 size={18} />
                    </motion.div>
                  ) : status === 'error' ? (
                    <motion.div
                      key="error"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="btn-content error"
                    >
                      <span>Error!</span>
                      <XCircle size={18} />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="idle"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="btn-content"
                    >
                      <span>Send Message</span>
                      <Send size={18} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
