import React, { useState } from 'react';
import './App.css';

function App() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleContact = (e) => {
    e.preventDefault();
    // In a real app, you'd send this to a backend. 
    // For now, we'll just trigger a nice UI transition.
    console.log("Form Submitted:", formData);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormData({ name: '', email: '', message: '' });
  };
  return (
    <div className="portfolio-container">
      {/* Navigation */}
      <nav className="navbar">
        <h2 className="logo">DevPort</h2>
        <ul>
          <li><a href="#home">Home</a></li>
          <li><a href="#projects">Projects</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>

      {/* Hero Section with Fade-in Effect */}
      <header id="home" className="hero-section">
        <div className="hero-content">
          <h1 className="fade-in">Hi, I'm <span className="highlight">Creative Coder</span></h1>
          <p className="slide-up">I build digital experiences that move.</p>
          <a href="#projects" className="cta-button">View My Work</a>
        </div>
      </header>

      {/* Projects Grid */}
      <section id="projects" className="projects-section">
        <h2>Selected Projects</h2>
        <div className="grid">
          <div className="project-card">
            <div className="card-overlay">
              <h3>E-Commerce App</h3>
              <p>React & Node.js</p>
            </div>
          </div>
          <div className="project-card">
            <div className="card-overlay">
              <h3>AI Dashboard</h3>
              <p>Python & React</p>
            </div>
          </div>
        </div>
      </section>

      {/* Get In Touch Section */}
      <section id="contact" className="contact-section">
        <h2>Get In Touch</h2>
        {submitted ? (
          <div className="success-message">Thanks! I'll get back to you soon. ✨</div>
        ) : (
          <form onSubmit={handleContact} className="contact-form">
            <input 
              type="text" 
              placeholder="Name" 
              required 
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
            <input 
              type="email" 
              placeholder="Email" 
              required 
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
            <textarea 
              placeholder="Message" 
              rows="5" 
              required
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
            ></textarea>
            <button type="submit">Send Message</button>
          </form>
        )}
      </section>

      <footer>
        <p>© 2026 Portfolio. Built with React.</p>
      </footer>
    </div>
  );
}


export default App;