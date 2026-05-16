import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import Experience from './components/Experience/Experience';
import Interests from './components/Interests/Interests';
import Skills from './components/Skills/Skills';
import Education from './components/Education/Education';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';
import AdminPanel from './components/Admin/AdminPanel';
import { usePortfolio } from './context/PortfolioContext';
import './App.css';

function HomePage() {
  return (
    <div className="app">
      <div className="background-effects">
        <div className="glow-orb primary-orb"></div>
        <div className="glow-orb secondary-orb"></div>
      </div>

      <Navbar />

      <main>
        <Hero />
        <About />
        <Experience />
        <Interests />
        <Skills />
        <Education />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}

function App() {
  const { loading } = usePortfolio();

  if (loading) {
    return (
      <div className="app-loading">
        <div className="loader-ring"></div>
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/admin/*" element={<AdminPanel />} />
    </Routes>
  );
}

export default App;
