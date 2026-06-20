import React from 'react';
import { Upload, Play, Sparkles, Shield, Monitor, Gift } from 'lucide-react';

/**
 * Hero section of the landing page, introducing the product and providing CTA buttons.
 */
export default function Hero({ onDemoClick }) {
  const scrollToUpload = () => {
    const element = document.getElementById('analyzer-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="hero-section" aria-labelledby="hero-title">
      <div className="hero-glow-1" aria-hidden="true" />
      <div className="hero-glow-2" aria-hidden="true" />

      <div className="hero-trust-badges-row animate-fade-in">
        <span className="hero-trust-chip hover-lift"><Shield size={14} /> Privacy First</span>
        <span className="hero-trust-chip hover-lift"><Monitor size={14} /> 100% Client Side</span>
        <span className="hero-trust-chip hover-lift"><Gift size={14} /> Free Forever</span>
      </div>

      <div className="hero-badge animate-badge" data-aos="fade-up">
        <Sparkles className="hero-badge-icon animate-pulse" size={14} />
        <span>Smart ATS &amp; Interview Assistant</span>
      </div>

      <h1 id="hero-title" className="hero-title">
        Smart Resume ATS &amp; <br />
        <span className="gradient-text">Interview Assistant</span>
      </h1>

      <p className="hero-subtitle">
        Upload your resume, compare with any job description, discover missing keywords and prepare for interviews.
      </p>

      <div className="hero-ctas">
        <button
          onClick={scrollToUpload}
          className="button button-primary button-lg hover-scale hover-glow"
          aria-label="Scroll to resume analyzer upload tool"
        >
          <Upload className="button-icon" size={18} />
          Upload Resume
        </button>

        <button
          onClick={scrollToUpload}
          className="button button-secondary button-lg hover-scale"
          aria-label="Scroll to analyzer"
        >
          Analyze
        </button>

        <button
          onClick={onDemoClick}
          className="button button-secondary button-lg hover-scale"
          aria-label="Load demo resume and job description"
        >
          <Play className="button-icon" size={18} />
          Try Demo
        </button>
      </div>

      <div className="hero-stats-row">
        <div className="hero-stat-item hero-stat-glass hover-lift">
          <div className="hero-stat-val text-gradient-gold">★★★★★</div>
          <div className="hero-stat-lbl">Trusted by Students</div>
        </div>
        <div className="hero-stat-item hero-stat-glass hover-lift">
          <div className="hero-stat-val">100%</div>
          <div className="hero-stat-lbl">Free Forever</div>
        </div>
        <div className="hero-stat-item hero-stat-glass hover-lift">
          <div className="hero-stat-val">Local</div>
          <div className="hero-stat-lbl">Client Processing</div>
        </div>
        <div className="hero-stat-item hero-stat-glass hover-lift">
          <div className="hero-stat-val">Secure</div>
          <div className="hero-stat-lbl">Privacy First</div>
        </div>
      </div>

      <div className="hero-features-grid">
        <div className="hero-feat-card hover-lift">
          <div className="feat-number">01</div>
          <h3>Local PDF Extraction</h3>
          <p>Extracts text locally in your browser using pdf.js. Your resume never leaves your computer.</p>
        </div>
        <div className="hero-feat-card hover-lift">
          <div className="feat-number">02</div>
          <h3>ATS Keyword Scan</h3>
          <p>Instantly calculates matching scores and shows missing skills from job descriptions.</p>
        </div>
        <div className="hero-feat-card hover-lift">
          <div className="feat-number">03</div>
          <h3>Interview Prep</h3>
          <p>Generates tailored technical questions based on your matching resume skills.</p>
        </div>
      </div>
    </section>
  );
}
