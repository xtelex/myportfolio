import React, { useState, useEffect } from 'react';
import './App.css';
import profilePic from '../pp.jpg';

function App() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [pageLoaded, setPageLoaded] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [stats, setStats] = useState({ projects: 0, clients: 0, experience: 0 });
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : true;
  });

  useEffect(() => {
    setPageLoaded(true);
  }, []);

  useEffect(() => {
    document.body.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  // Animated statistics counter
  useEffect(() => {
    if (pageLoaded) {
      const interval = setInterval(() => {
        setStats(prev => ({
          projects: prev.projects < 30 ? prev.projects + 1 : 30,
          clients: prev.clients < 50 ? prev.clients + 1 : 50,
          experience: prev.experience < 8 ? prev.experience + 1 : 8
        }));
      }, 100);
      return () => clearInterval(interval);
    }
  }, [pageLoaded]);

  // Smooth scroll behavior and section tracking
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'projects', 'contact'];
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2;
        }
        return false;
      });
      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll('.fade-in-section');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.18, rootMargin: '0px 0px -10% 0px' }
    );

    sections.forEach((section, index) => {
      section.style.setProperty('--reveal-delay', `${index * 80}ms`);
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  // Handle section navigation with transition effect
  const handleNavClick = (e, sectionId) => {
    e.preventDefault();
    setIsTransitioning(true);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveSection(sectionId);
    }
    setTimeout(() => {
      setIsTransitioning(false);
    }, 520);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleContact = async (e) => {
    e.preventDefault();

    const endpoint = "https://formspree.io/f/mkovbnnp";
  
    const response = await fetch("https://formspree.io/f/mkovbnnp", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: { "Content-Type": "application/json" }
    }).catch(() => null);

    console.log("Form Submitted:", formData);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setFormData({ name: '', email: '', message: '' });
  };

  const projects = [
    {
      title: "Mangkulas Tricycle Shop Website",
      description: "A custom tricycle shop website built in React featuring a modern homepage hero, featured model slideshow, inventory browsing, and quote request flow tailored for local dealership needs.",
      tech: "React | JSX | CSS | Responsive UI",
      link: "#",
      year: "2024"
    },
    {
      title: "AI-Powered Analytics Dashboard",
      description: "Real-time analytics platform with machine learning capabilities for data visualization and predictive analytics. Processes 100,000+ data points per second with custom visualization components.",
      tech: "React | Python | TensorFlow | D3.js",
      link: "#",
      year: "2024"
    },
    {
      title: "Project Management Suite",
      description: "Enterprise-grade project management tool with drag-and-drop interface, real-time collaboration, team analytics, and integrated communication features for distributed teams.",
      tech: "React | Node.js | Socket.io | PostgreSQL",
      link: "#",
      year: "2023"
    },
    {
      title: "Weather Intelligence App",
      description: "Advanced weather application with real-time data, 7-day forecasting, severe weather alerts, and location-based recommendations. Serves 50,000+ monthly active users.",
      tech: "React | OpenWeather API | Mapbox | PWA",
      link: "#",
      year: "2023"
    },
    {
      title: "Social Media Analytics Tool",
      description: "Comprehensive social media management platform with audience insights, content scheduling, performance tracking, and engagement metrics across multiple platforms.",
      tech: "React | Express | Kafka | Redis",
      link: "#",
      year: "2023"
    },
    {
      title: "Healthcare Management System",
      description: "HIPAA-compliant healthcare platform enabling appointment scheduling, patient records management, telemedicine capabilities, and secure medical data handling.",
      tech: "React | Node.js | TypeScript | PostgreSQL",
      link: "#",
      year: "2022"
    }
  ];

  const projectThumbnails = [
    "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1530908295418-a12e326966ba?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=1200&q=80"
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Product Manager at TechVenture",
      content: "Exceptional developer with remarkable attention to detail. Delivered our e-commerce platform ahead of schedule and exceeded all performance expectations. A true professional.",
      image: "SC",
      rating: 5
    },
    {
      name: "Marcus Johnson",
      role: "CTO at TechStart Solutions",
      content: "One of the most talented full-stack developers I've worked with. Demonstrated deep technical knowledge, excellent problem-solving skills, and outstanding communication throughout our partnership.",
      image: "MJ",
      rating: 5
    },
    {
      name: "Emily Rodriguez",
      role: "Lead Designer at Creative Studios",
      content: "Perfect collaboration from concept to deployment. Transformed our UI/UX designs into pixel-perfect, performant implementations. Would definitely work together again!",
      image: "ER",
      rating: 5
    },
    {
      name: "David Park",
      role: "CEO at StartupHub",
      content: "Brought our MVP to life with unmatched expertise. The codebase quality and architecture decisions impressed our entire technical team. Highly recommended for any ambitious project.",
      image: "DP",
      rating: 5
    },
    {
      name: "Lisa Anderson",
      role: "Project Lead at WebSolutions Inc",
      content: "Professional, reliable, and incredibly skilled. Successfully managed complex projects with tight deadlines. Excellent at adapting to our team's workflow and best practices.",
      image: "LA",
      rating: 5
    }
  ];

  const features = [
    {
      title: "Lightning-Fast Performance",
      description: "Optimized applications with sub-second load times, implementing advanced caching strategies, code splitting, and lazy loading",
      icon: "FAST",
      thumbnail: "https://images.unsplash.com/photo-1518773553398-650c184e0bb3?auto=format&fit=crop&w=600&q=80"
    },
    {
      title: "Mobile-First Responsive Design",
      description: "Seamless experiences across all devices with progressive web app capabilities and adaptive layouts",
      icon: "RESP",
      thumbnail: "https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&w=600&q=80"
    },
    {
      title: "Enterprise-Grade Code Quality",
      description: "Well-architected, thoroughly tested, and documented code following SOLID principles and industry standards",
      icon: "CODE",
      thumbnail: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=600&q=80"
    },
    {
      title: "Scalable Modern Architecture",
      description: "Built with latest React, Node.js, and cloud technologies designed to grow with your business",
      icon: "SCALE",
      thumbnail: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80"
    },
    {
      title: "Security-First Development",
      description: "OWASP compliant applications with encryption, secure authentication, and vulnerability protection",
      icon: "SEC",
      thumbnail: "https://images.unsplash.com/photo-1563206767-5b18f218e8de?auto=format&fit=crop&w=600&q=80"
    },
    {
      title: "Agile & Transparent Collaboration",
      description: "Clear communication, regular updates, and collaborative development ensuring your vision comes to life",
      icon: "TEAM",
      thumbnail: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80"
    }
  ];

  const skills = [
    {
      category: "Frontend Development",
      technologies: ["React.js", "Vue.js", "TypeScript", "Tailwind CSS", "Material-UI", "Next.js", "Redux", "Webpack", "Vite"],
      icon: "FE",
      thumbnail: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?auto=format&fit=crop&w=600&q=80"
    },
    {
      category: "Backend Development",
      technologies: ["Node.js", "Express.js", "Python", "Django", "GraphQL", "REST APIs", "MongoDB", "PostgreSQL", "MySQL"],
      icon: "BE",
      thumbnail: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=80"
    },
    {
      category: "DevOps & Cloud",
      technologies: ["Docker", "Kubernetes", "AWS", "Google Cloud", "CI/CD", "GitHub Actions", "Jenkins", "Linux"],
      icon: "CLOUD",
      thumbnail: "https://images.unsplash.com/photo-1603695762547-fba8bcca33ce?auto=format&fit=crop&w=600&q=80"
    },
    {
      category: "Tools & Platforms",
      technologies: ["Git", "GitHub", "GitLab", "Jira", "VS Code", "Firebase", "Heroku", "Netlify"],
      icon: "TOOLS",
      thumbnail: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=600&q=80"
    }
  ];

  const experience = [
    {
      position: "Senior Full Stack Developer",
      company: "Tech Startup Inc.",
      period: "2024 - Present",
      description: "Leading development of scalable web applications serving 100k+ users. Architected microservices infrastructure, mentored junior developers, and improved system performance by 40%."
    },
    {
      position: "Full Stack Developer",
      company: "Digital Solutions Agency",
      period: "2023 - 2024",
      description: "Developed 15+ responsive web applications for Fortune 500 clients. Implemented CI/CD pipelines, optimized database queries, and reduced load times by 30%. Led code reviews and established best practices."
    },
    {
      position: "Frontend Developer",
      company: "Creative Digital Labs",
      period: "2022 - 2023",
      description: "Built interactive user interfaces using React and modern CSS frameworks. Collaborated with designers to translate mockups into pixel-perfect implementations with focus on UX/UI excellence."
    },
    {
      position: "Junior Web Developer",
      company: "Learning & Development Center",
      period: "2021 - 2022",
      description: "Developed foundational skills in web development. Built portfolio projects demonstrating HTML5, CSS3, JavaScript, and basic React proficiency. Completed certification in full-stack development."
    }
  ];

  const socialLinks = [
    { name: "GitHub", url: "https://github.com/xtelex" },
    { name: "LinkedIn", url: "https://www.linkedin.com/in/manievo-christian-paul-e-53724a3a8/" },
    { name: "Twitter", url: "#" },
    { name: "Email", url: "#" }
  ];

  const floatingLanguages = [
    {
      name: "JavaScript",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg"
    },
    {
      name: "TypeScript",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg"
    },
    {
      name: "Python",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg"
    },
    {
      name: "Go",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original-wordmark.svg"
    },
    {
      name: "Ruby",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ruby/ruby-original.svg"
    },
    {
      name: "Java",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg"
    },
    {
      name: "C++",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg"
    },
    {
      name: "PHP",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg"
    }
  ];

  const renderSocialIcon = (name) => {
    switch (name) {
      case "GitHub":
        return (
          <svg className="social-icon" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M9 19c-4.5 1.3-4.5-2-6-2" />
            <path d="M15 22v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6.2 0-1.4-.5-2.6-1.3-3.5.1-.3.6-1.7-.1-3.5 0 0-1.1-.3-3.6 1.3a12.4 12.4 0 0 0-6 0C6.5 3 5.4 3.3 5.4 3.3c-.7 1.8-.2 3.2-.1 3.5C4.5 7.7 4 8.9 4 10.3c0 4.8 2.7 5.9 5.5 6.2-.6.6-.6 1.2-.5 2V22" />
          </svg>
        );
      case "LinkedIn":
        return (
          <svg className="social-icon" viewBox="0 0 24 24" aria-hidden="true">
            <rect x="3" y="3" width="18" height="18" rx="4" />
            <path d="M8.5 10.5v6M8.5 7.5h.01M12 16.5v-3.3c0-1.1.8-1.7 1.7-1.7s1.8.6 1.8 1.7v3.3" />
          </svg>
        );
      case "Twitter":
        return (
          <svg className="social-icon" viewBox="0 0 24 24" aria-hidden="true">
            <path d="m4 4 6.6 7.8L4.3 20h2.7l4.9-6.1 5.1 6.1H20l-6.9-8.2L19.3 4h-2.7l-4.8 5.9L7 4H4Z" />
          </svg>
        );
      default:
        return (
          <svg className="social-icon" viewBox="0 0 24 24" aria-hidden="true">
            <rect x="3" y="5" width="18" height="14" rx="2.5" />
            <path d="m4 7 8 6 8-6" />
          </svg>
        );
    }
  };

  return (
    <div className={`portfolio-container ${pageLoaded ? 'page-loaded' : ''} ${isTransitioning ? 'transitioning' : ''}`}>
      {isDarkMode && (
        <div className="aurora-background" aria-hidden="true">
          <span className="aurora-wave aurora-wave-1"></span>
          <span className="aurora-wave aurora-wave-2"></span>
          <span className="aurora-wave aurora-wave-3"></span>
        </div>
      )}

      {/* Transition Overlay */}
      {isTransitioning && <div className="transition-overlay"></div>}
      
      {/* Navigation */}
      <nav className="navbar">
        <h2 className="logo">DevPort</h2>
        <ul>
          <li><a href="#home" onClick={(e) => handleNavClick(e, 'home')} className={activeSection === 'home' ? 'active' : ''}>Home</a></li>
          <li><a href="#about" onClick={(e) => handleNavClick(e, 'about')} className={activeSection === 'about' ? 'active' : ''}>About</a></li>
          <li><a href="#skills" onClick={(e) => handleNavClick(e, 'skills')} className={activeSection === 'skills' ? 'active' : ''}>Skills</a></li>
          <li><a href="#projects" onClick={(e) => handleNavClick(e, 'projects')} className={activeSection === 'projects' ? 'active' : ''}>Projects</a></li>
          <li><a href="#contact" onClick={(e) => handleNavClick(e, 'contact')} className={activeSection === 'contact' ? 'active' : ''}>Contact</a></li>
        </ul>
        <button
          className="dark-mode-toggle"
          onClick={toggleDarkMode}
          aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          title={isDarkMode ? 'Light mode' : 'Dark mode'}
        >
          {isDarkMode ? (
            <svg className="theme-icon" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 1 0 9.8 9.8Z" />
            </svg>
          ) : (
            <svg className="theme-icon" viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="12" cy="12" r="4.2" />
              <path d="M12 2.5v2.2M12 19.3v2.2M4.7 4.7l1.6 1.6M17.7 17.7l1.6 1.6M2.5 12h2.2M19.3 12h2.2M4.7 19.3l1.6-1.6M17.7 6.3l1.6-1.6" />
            </svg>
          )}
        </button>
      </nav>

      {/* Hero Section - Two Column Layout */}
      <header id="home" className={`hero-section fade-in-section ${pageLoaded ? 'visible' : ''}`}>
        <div className="hero-left">
          <div className="hero-badge">* Welcome to My Portfolio</div>
          <h1 className="hero-title">
            <span className="hero-title-main">Full-Stack Developer &amp; </span><span className="aurora-text">Digital Innovator</span>
          </h1>
          <p className="hero-subtitle">Crafting elegant, scalable web solutions with React, Node.js, and cutting-edge technologies. I transform ideas into high-performance applications that drive business growth.</p>
          <div className="hero-buttons">
            <a href="#projects" className="cta-button primary">View My Work</a>
            <a href="#contact" className="cta-button secondary">Get In Touch</a>
          </div>
        </div>
        <div className="hero-right">
          <div className="profile-picture-container">
            <div className="floating-tech-layer" aria-hidden="true">
              {floatingLanguages.map((lang, index) => (
                <div key={lang.name} className={`floating-tech floating-tech-${index + 1}`}>
                  <img src={lang.icon} alt={lang.name} className="floating-tech-icon" loading="lazy" />
                  <span className="floating-tech-name">{lang.name}</span>
                </div>
              ))}
            </div>
            <div className="profile-picture">
              <img src={profilePic} alt="Profile" className="profile-avatar" />
            </div>
          </div>
          <div className="hero-card">
            <div className="card-header">Senior Full-Stack Developer</div>
            <p>Transforming visions into scalable digital solutions</p>
          </div>
        </div>
      </header>

      {/* Statistics Section */}
      <section className="stats-section">
        <div className="section-container">
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-number">{stats.projects}+</div>
              <div className="stat-label">Projects Delivered</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">{stats.clients}+</div>
              <div className="stat-label">Satisfied Clients</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">{stats.experience}+</div>
              <div className="stat-label">Years of Experience</div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about-section fade-in-section">
        <div className="section-container">
          <p className="section-badge">About Our Connection</p>
          <h2 className="section-title">Professional Background</h2>
          <div className="about-content">
            <div className="about-text">
              <p>I'm a results-driven Senior Full-Stack Developer with 8+ years of experience building enterprise-level web applications that solve real-world problems. My expertise spans modern JavaScript frameworks, cloud technologies, and DevOps practices to deliver robust, scalable solutions.</p>
              <p>Throughout my career, I've worked with Fortune 500 companies and innovative startups, leading technical initiatives that improved system performance, reduced infrastructure costs, and enhanced user experiences. I'm passionate about writing clean, maintainable code and mentoring junior developers to raise team standards.</p>
              <p>Beyond coding, I'm an active open-source contributor, a speaker at tech conferences, and an advocate for best practices in software engineering. I thrive in collaborative environments where I can share knowledge, solve complex problems, and drive innovation.</p>
            </div>
            <div className="experience-timeline">
              <h3 className="timeline-title">Experience Timeline</h3>
              {experience.map((exp, index) => (
                <div key={index} className="timeline-item">
                  <div className="timeline-marker"></div>
                  <div className="timeline-content">
                    <h4>{exp.position}</h4>
                    <p className="company">{exp.company}</p>
                    <p className="period">{exp.period}</p>
                    <p className="description">{exp.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="skills-section fade-in-section">
        <div className="section-container">
          <p className="section-badge">Core Competencies</p>
          <h2 className="section-title">Technology Stack & Expertise</h2>
          <div className="skills-grid">
            {skills.map((skillGroup, index) => (
              <div key={index} className="skill-card">
                <div className="skill-icon">
                  <img src={skillGroup.thumbnail} alt={`${skillGroup.category} thumbnail`} loading="lazy" />
                </div>
                <h3>{skillGroup.category}</h3>
                <div className="tech-tags">
                  {skillGroup.technologies.map((tech, i) => (
                    <span key={i} className="tech-tag">{tech}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section fade-in-section">
        <div className="section-container">
          <p className="section-badge">Why Partners Choose Us</p>
          <h2 className="section-title">Development Excellence</h2>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">
                  <img src={feature.thumbnail} alt={`${feature.title} thumbnail`} loading="lazy" />
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section id="projects" className="projects-section fade-in-section">
        <div className="section-container">
          <p className="section-badge">Proven Track Record</p>
          <h2 className="section-title">Selected Portfolio</h2>
          <div className="grid">
            {projects.map((project, index) => (
              <div key={index} className="project-card slide-in-section">
                <div className="project-thumbnail">
                  <img src={projectThumbnails[index % projectThumbnails.length]} alt={`${project.title} thumbnail`} loading="lazy" />
                  <span className="project-year">{project.year}</span>
                </div>
                <div className="card-content">
                  <h3>{project.title}</h3>
                  <p className="project-description">{project.description}</p>
                  <p className="tech-stack">{project.tech}</p>
                </div>
                <div className="card-overlay">
                  <a href={project.link} className="view-button">View Project -&gt;</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section fade-in-section">
        <div className="section-container">
          <p className="section-badge">Client Testimonials</p>
          <h2 className="section-title">What Industry Leaders Say</h2>
          <div className="testimonials-grid">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="testimonial-card">
                <p className="testimonial-content">"{testimonial.content}"</p>
                <div className="testimonial-author">
                  <div className="author-avatar">{testimonial.image}</div>
                  <div className="author-info">
                    <h4>{testimonial.name}</h4>
                    <p>{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Get In Touch Section */}
      <section id="contact" className="contact-section">
        <h2 className="section-title">Get In Touch</h2>
        {submitted ? (
          <div className="success-message animate-success">
            <span className="success-icon">*</span>
            Salamattt wag mo kalimutang isa kang kupal AHAHHA.
          </div>
        ) : (
          <form onSubmit={handleContact} className="contact-form">
            <input 
              type="text" 
              placeholder="Your Name" 
              required 
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
            <input 
              type="email" 
              placeholder="Your Email" 
              required 
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
            <textarea 
              placeholder="Your Message" 
              rows="6" 
              required
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
            ></textarea>
            <button type="submit" className="submit-button">Send Message</button>
          </form>
        )}
      </section>

      <footer>
        <div className="footer-content">
          <div className="footer-section">
            <h4>DevPort</h4>
            <p>Full-stack web developer creating beautiful and functional web experiences.</p>
          </div>
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#home">Home</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#skills">Skills</a></li>
              <li><a href="#projects">Projects</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Connect</h4>
            <div className="social-links">
              {socialLinks.map((social, index) => (
                <a key={index} href={social.url} className="social-link" title={social.name}>
                  {renderSocialIcon(social.name)}
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2026 Ian's Portfolio. Built with React & Vite. All rights reserved.</p>
          <div className="footer-meta">
            <a href="#home">Privacy Policy</a> • <a href="#home">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;


