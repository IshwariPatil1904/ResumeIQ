import React from 'react';
import { Shield, Cpu, Lock, Zap, Target, Layers } from 'lucide-react';

export default function About() {
  return (
    <section id="about-section" className="about-view-wrapper container" aria-labelledby="about-title">
      <div className="about-view-header">
        <span className="section-badge" style={{ marginBottom: 12, display: 'inline-flex' }}>
          <Layers size={12} /> About
        </span>
        <h1 id="about-title">About ResumeIQ</h1>
        <p>A premium client-side resume intelligence platform.</p>
      </div>

      <div className="about-content-grid">
        <div className="about-info-block">
          <h2>Project Overview</h2>
          <p>
            ResumeIQ transforms the job application process by giving you instant, actionable feedback on your resume.
            Built with React and modern web APIs, it delivers enterprise-grade ATS analysis without compromising your privacy.
          </p>
          <p>
            Whether you are a student, career switcher, or experienced professional, ResumeIQ helps you identify
            missing keywords, strengthen your resume, and prepare for technical interviews — all in one beautiful interface.
          </p>
        </div>

        <div className="about-info-block">
          <h2>How ATS Works</h2>
          <p>
            Applicant Tracking Systems scan resumes for keywords that match job descriptions. ResumeIQ replicates this
            process locally by extracting skills and terms from both documents, computing overlap scores, and surfacing
            gaps you can address before applying.
          </p>
          <div className="about-infographics-grid">
            <div className="about-info-card-box hover-lift">
              <Target size={20} className="text-primary" />
              <h3>Keyword Extraction</h3>
              <p>Tokenizes and normalizes text to find matching skills and terms.</p>
            </div>
            <div className="about-info-card-box hover-lift">
              <Zap size={20} className="text-primary" />
              <h3>Score Calculation</h3>
              <p>Computes ATS compatibility percentage from skill overlap.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="about-content-grid">
        <div className="about-info-block">
          <h2><Lock size={18} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 8 }} />Privacy</h2>
          <p>
            Your data never leaves your browser. No accounts required, no cookies, no analytics trackers.
            All processing — PDF parsing, keyword extraction, scoring — happens on your device using JavaScript.
          </p>
        </div>
        <div className="about-info-block">
          <h2><Cpu size={18} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 8 }} />Technology</h2>
          <p>
            Built with React 19, Vite, pdf.js, mammoth, and Lucide icons. Styled with a custom design system
            featuring Inter typography, glassmorphism, and pure CSS charts — no chart libraries required.
          </p>
          <div className="about-info-card-box hover-lift" style={{ marginTop: 16 }}>
            <Shield size={20} className="text-success" />
            <h3>Open &amp; Transparent</h3>
            <p>100% client-side. No backend. No API keys. Free forever.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
