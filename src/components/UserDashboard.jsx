import React from 'react';
import {
  TrendingUp, Upload, FileText, MessageCircle, Lightbulb, Hash,
  ArrowRight, BarChart3
} from 'lucide-react';
import AnimatedCounter from './AnimatedCounter';

export default function UserDashboard({ stats, onNavigate, onScrollToAnalyzer }) {
  const chartBars = (stats.atsScores || []).slice(-7);
  while (chartBars.length < 7) chartBars.unshift(0);

  const completenessItems = [
    { label: 'Skill Match', value: stats.atsAverage || 0, color: '' },
    { label: 'Keywords Found', value: Math.min(100, stats.keywordsFound * 3), color: 'bg-green' },
    { label: 'Reports Generated', value: Math.min(100, stats.reportsGenerated * 10), color: 'bg-purple' },
    { label: 'Interview Prep', value: Math.min(100, stats.interviewQuestions * 2), color: 'bg-orange' },
  ];

  return (
    <section id="dashboard-section" className="user-dashboard-wrapper container" aria-labelledby="user-dashboard-title">
      <div className="user-dashboard-header">
        <div>
          <h1 id="user-dashboard-title">Dashboard</h1>
          <p>Your resume analysis overview — all data stored locally.</p>
        </div>
        <button type="button" className="button button-primary hover-scale" onClick={onScrollToAnalyzer}>
          <Upload size={16} className="button-icon" />
          New Analysis
        </button>
      </div>

      <div className="user-stats-grid">
        {[
          { label: 'ATS Average', value: stats.atsAverage, suffix: '%', icon: TrendingUp },
          { label: 'Resume Uploads', value: stats.resumeUploads, icon: Upload },
          { label: 'Reports Generated', value: stats.reportsGenerated, icon: FileText },
          { label: 'Interview Questions', value: stats.interviewQuestions, icon: MessageCircle },
          { label: 'Suggestions', value: stats.suggestions, icon: Lightbulb },
          { label: 'Keywords Found', value: stats.keywordsFound, icon: Hash },
        ].map(({ label, value, suffix = '', icon: Icon }) => (
          <div key={label} className="user-stat-card hover-lift">
            <span className="user-stat-header"><Icon size={12} /> {label}</span>
            <span className="user-stat-number">
              <AnimatedCounter value={value} suffix={suffix} />
            </span>
            <span className="user-stat-footer">All time</span>
          </div>
        ))}
      </div>

      <div className="saas-charts-grid">
        <div className="chart-card card hover-lift">
          <h2><BarChart3 size={18} className="text-primary" style={{ display: 'inline', verticalAlign: 'middle', marginRight: 8 }} />ATS Score Trend</h2>
          <p className="chart-card-subtitle">Recent analysis scores</p>
          <div className="css-bar-chart" role="img" aria-label="ATS score bar chart">
            {chartBars.map((val, i) => (
              <div key={i} className="css-bar-col">
                <div className="css-bar-fill-val" style={{ height: `${Math.max(val, 4)}%` }}>
                  <span className="css-bar-tooltip">{val}%</span>
                </div>
                <span className="css-bar-label">{val > 0 ? `${val}%` : '—'}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="chart-card card hover-lift">
          <h2>Resume Completeness</h2>
          <p className="chart-card-subtitle">Aggregate progress indicators</p>
          <div className="css-completion-list">
            {completenessItems.map(({ label, value, color }) => (
              <div key={label} className="css-completion-item">
                <div className="css-completion-meta">
                  <span>{label}</span>
                  <strong>{value}%</strong>
                </div>
                <div className="css-completion-track">
                  <div className={`css-completion-fill ${color}`} style={{ width: `${value}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="dashboard-cta-section hover-lift">
        <div className="dashboard-cta-left">
          <h2>Ready for your next scan?</h2>
          <p>Upload a resume and compare it against any job description in seconds.</p>
        </div>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <button type="button" className="button button-primary hover-scale" onClick={onScrollToAnalyzer}>
            Analyze Resume <ArrowRight size={16} className="button-icon" style={{ marginLeft: 8, marginRight: 0 }} />
          </button>
          <button type="button" className="button button-secondary hover-scale" onClick={() => onNavigate('history')}>
            View History
          </button>
        </div>
      </div>
    </section>
  );
}
