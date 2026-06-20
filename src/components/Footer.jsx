import React from 'react';
import { Mail, Shield, CheckCircle, FileCheck, Github } from 'lucide-react';

export default function Footer({ onNavigate }) {
  const scrollTo = (id) => {
    onNavigate?.('home');
    setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 100);
  };

  return (
    <footer className="footer" role="contentinfo">
      <div className="footer-container container">
        <div className="footer-four-columns">
          <div className="footer-col footer-brand">
            <p className="footer-title">
              <FileCheck size={18} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 8 }} />
              ResumeIQ
            </p>
            <p className="footer-tagline">Upload · Analyze · Improve · Prepare</p>
            <div className="footer-features-badges">
              <div className="badge-item"><Shield size={12} className="text-primary" /> <span>Privacy First</span></div>
              <div className="badge-item"><CheckCircle size={12} className="text-success" /> <span>100% Client Side</span></div>
              <div className="badge-item"><CheckCircle size={12} className="text-success" /> <span>No Data Stored</span></div>
              <div className="badge-item"><CheckCircle size={12} className="text-success" /> <span>Free Forever</span></div>
            </div>
          </div>

          <div className="footer-col">
            <h4>Product</h4>
            <ul className="footer-links-list">
              <li><button type="button" className="btn-link-style" onClick={() => scrollTo('dashboard-section')}>Dashboard</button></li>
              <li><button type="button" className="btn-link-style" onClick={() => scrollTo('analyzer-section')}>Analyzer</button></li>
              <li><button type="button" className="btn-link-style" onClick={() => scrollTo('insights-section')}>Insights</button></li>
              <li><button type="button" className="btn-link-style" onClick={() => onNavigate?.('history')}>History</button></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Resources</h4>
            <ul className="footer-links-list">
              <li><button type="button" className="btn-link-style" onClick={() => scrollTo('features-section')}>Features</button></li>
              <li><button type="button" className="btn-link-style" onClick={() => scrollTo('faq-section')}>FAQ</button></li>
              <li><button type="button" className="btn-link-style" onClick={() => scrollTo('about-section')}>About</button></li>
              <li><button type="button" className="btn-link-style" onClick={() => onNavigate?.('saved-reports')}>Saved Reports</button></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Developer</h4>
            <ul className="footer-links-list">
              <li>
                <a
                  href="https://www.linkedin.com/in/ishwari-patil-in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="dev-link"
                >
                  Ishwari Ajaykumar Patil
                </a>
              </li>
              <li>
                <a href="mailto:ishwari.patil24@vit.edu" className="dev-email">
                  <Mail size={12} /> ishwari.patil24@vit.edu
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/ishwari-patil-in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-link-style"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/IshwariPatil1904/ResumeIQ"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-link-style"
                >
                  <Github size={12} style={{ verticalAlign: 'middle', marginRight: 6 }} /> GitHub
                </a>
              </li>
              <li><button type="button" className="btn-link-style" onClick={() => scrollTo('contact-section')}>Contact</button></li>
              <li><button type="button" className="btn-link-style" onClick={() => onNavigate?.('settings')}>Settings</button></li>
            </ul>
          </div>
        </div>

        <div className="footer-hero-branding">
          <a
            href="https://digitalheroesco.com"
            target="_blank"
            rel="noopener noreferrer"
            className="button button-primary button-sm btn-digital-heroes hover-scale hover-glow"
            aria-label="Visit Digital Heroes Website"
          >
            Built for Digital Heroes
          </a>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-flex">
          <p className="copyright-text">&copy; {new Date().getFullYear()} ResumeIQ. Clean client-side analysis.</p>
          <button type="button" className="scroll-top-link btn-link-style" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            Back to Top ↑
          </button>
        </div>
      </div>
    </footer>
  );
}
