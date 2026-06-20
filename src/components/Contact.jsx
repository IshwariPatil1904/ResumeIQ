import React from 'react';
import { Mail, Github, Linkedin, Globe } from 'lucide-react';

export default function Contact() {
  return (
    <section id="contact-section" className="contact-view-wrapper container" aria-labelledby="contact-title">
      <div className="contact-card-box hover-lift">
        <div className="contact-avatar-wrapper" aria-hidden="true">👩‍💻</div>
        <h1 id="contact-title">Get in Touch</h1>
        <p>Built with passion by a developer who believes in privacy-first tools.</p>

        <div className="contact-links-grid">
          <a href="mailto:ishwari.patil24@vit.edu" className="contact-link-pill hover-scale">
            <Mail size={16} /> ishwari.patil24@vit.edu
          </a>
          <a href="https://github.com/ishwari-patil" target="_blank" rel="noopener noreferrer" className="contact-link-pill hover-scale">
            <Github size={16} /> GitHub
          </a>
          <a href="https://linkedin.com/in/ishwari-patil" target="_blank" rel="noopener noreferrer" className="contact-link-pill hover-scale">
            <Linkedin size={16} /> LinkedIn
          </a>
          <a href="https://digitalheroesco.com" target="_blank" rel="noopener noreferrer" className="contact-link-pill hover-scale">
            <Globe size={16} /> Portfolio
          </a>
        </div>

        <p style={{ marginTop: 32, fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
          <strong style={{ color: 'var(--text-primary)' }}>Ishwari Ajaykumar Patil</strong><br />
          Full Stack Developer · VIT Graduate
        </p>
      </div>
    </section>
  );
}
