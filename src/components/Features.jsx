import React from 'react';
import {
  FileSearch, Brain, MessageSquare, BarChart3, Shield, Zap,
  Download, History, Search
} from 'lucide-react';

const FEATURES = [
  { icon: FileSearch, title: 'ATS Keyword Scanner', desc: 'Instantly compare resume keywords against any job description with precision scoring.' },
  { icon: Brain, title: 'Smart Suggestions', desc: 'Get tailored recommendations to fill skill gaps and boost your match rate.' },
  { icon: MessageSquare, title: 'Interview Prep', desc: 'Auto-generate technical questions based on your matching skills with sample answers.' },
  { icon: BarChart3, title: 'Analytics Dashboard', desc: 'Track ATS trends, keyword distribution, and resume completeness over time.' },
  { icon: Shield, title: 'Privacy First', desc: '100% client-side processing. Your resume never touches a server.' },
  { icon: Zap, title: 'Instant Results', desc: 'Multi-step animated analysis delivers comprehensive reports in seconds.' },
  { icon: Download, title: 'Export Reports', desc: 'Copy, download TXT, or print PDF reports of your analysis locally.' },
  { icon: History, title: 'Analysis History', desc: 'Every scan is saved locally so you can track progress across applications.' },
  { icon: Search, title: 'Global Search', desc: 'Find keywords, suggestions, questions, and saved reports instantly.' },
];

export default function Features() {
  return (
    <section id="features-section" className="features-section-wrapper container" aria-labelledby="features-title">
      <div className="section-title-wrapper" style={{ textAlign: 'center', marginBottom: 48 }}>
        <div className="section-badge" style={{ display: 'inline-flex' }}>
          <Zap size={12} /> Features
        </div>
        <h2 id="features-title" className="section-title-label">Everything you need to land the interview</h2>
        <p className="section-description-text">Professional-grade tools, zero compromise on privacy.</p>
      </div>

      <div className="features-grid-premium">
        {FEATURES.map(({ icon: Icon, title, desc }, idx) => (
          <article key={title} className="feature-card-premium hover-lift" style={{ animationDelay: `${idx * 0.05}s` }}>
            <div className="feature-icon-circle">
              <Icon size={22} />
            </div>
            <h3>{title}</h3>
            <p>{desc}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
