import React from 'react';
import { TrendingUp, AlertTriangle, CheckCircle2, Lightbulb, PieChart } from 'lucide-react';
import AnimatedCounter from './AnimatedCounter';

export default function Insights({ analysisResults, suggestions, analytics }) {
  const hasData = analysisResults && analysisResults.score !== undefined;

  const keywordTotal = hasData
    ? (analysisResults.matchingKeywords?.length || 0) + (analysisResults.missingKeywords?.length || 0)
    : 0;
  const keywordMatch = keywordTotal > 0
    ? Math.round((analysisResults.matchingKeywords.length / keywordTotal) * 100)
    : 0;

  const checklist = analytics?.checklist;
  const completeness = checklist
    ? Math.round((Object.values(checklist).filter(Boolean).length / Object.keys(checklist).length) * 100)
    : 0;

  return (
    <section id="insights-section" className="insights-section-wrapper container" aria-labelledby="insights-title">
      <div className="section-title-wrapper" style={{ textAlign: 'center', marginBottom: 48 }}>
        <div className="section-badge" style={{ display: 'inline-flex' }}>
          <PieChart size={12} /> Insights
        </div>
        <h2 id="insights-title" className="section-title-label">Smart Resume Insights</h2>
        <p className="section-description-text">
          {hasData ? 'Key takeaways from your latest analysis.' : 'Run an analysis to unlock personalized insights.'}
        </p>
      </div>

      <div className="insights-grid">
        <div className="insight-card card hover-lift">
          <div className="insight-card-header">
            <TrendingUp size={20} className="text-primary" />
            <h3>ATS Score</h3>
          </div>
          <div className="insight-metric-large">
            {hasData ? <AnimatedCounter value={analysisResults.score} suffix="%" /> : '—'}
          </div>
          <p className="insight-card-desc">Overall compatibility with the job description.</p>
          {hasData && (
            <div className="css-completion-track" style={{ marginTop: 16 }}>
              <div className="css-completion-fill" style={{ width: `${analysisResults.score}%` }} />
            </div>
          )}
        </div>

        <div className="insight-card card hover-lift">
          <div className="insight-card-header">
            <CheckCircle2 size={20} className="text-success" />
            <h3>Keyword Match</h3>
          </div>
          <div className="insight-metric-large">
            {hasData ? <AnimatedCounter value={keywordMatch} suffix="%" /> : '—'}
          </div>
          <p className="insight-card-desc">
            {hasData ? `${analysisResults.matchingKeywords.length} of ${keywordTotal} keywords matched.` : 'Upload a resume to see keyword overlap.'}
          </p>
        </div>

        <div className="insight-card card hover-lift">
          <div className="insight-card-header">
            <AlertTriangle size={20} className="text-warning" />
            <h3>Missing Skills</h3>
          </div>
          <div className="insight-metric-large">
            {hasData ? <AnimatedCounter value={analysisResults.missingSkills?.length || 0} /> : '—'}
          </div>
          <p className="insight-card-desc">Skills in the job description not found in your resume.</p>
        </div>

        <div className="insight-card card hover-lift">
          <div className="insight-card-header">
            <Lightbulb size={20} className="text-primary" />
            <h3>Top Suggestion</h3>
          </div>
          <p className="insight-suggestion-text">
            {hasData && suggestions?.length > 0
              ? suggestions[0].description
              : 'Complete an analysis to receive tailored improvement suggestions.'}
          </p>
        </div>

        <div className="insight-card card hover-lift insight-card-wide">
          <div className="insight-card-header">
            <PieChart size={20} className="text-primary" />
            <h3>Resume Completeness</h3>
          </div>
          <div className="insights-completeness-row">
            <div className="insight-donut-chart" role="img" aria-label={`Resume completeness ${completeness}%`}>
              <svg viewBox="0 0 100 100" className="insight-donut-svg">
                <circle cx="50" cy="50" r="40" fill="none" stroke="var(--border-color)" strokeWidth="12" />
                <circle
                  cx="50" cy="50" r="40" fill="none"
                  stroke="var(--primary-color)" strokeWidth="12"
                  strokeDasharray={`${completeness * 2.51} 251`}
                  strokeLinecap="round"
                  transform="rotate(-90 50 50)"
                />
              </svg>
              <span className="insight-donut-label">{hasData ? `${completeness}%` : '—'}</span>
            </div>
            <div className="insight-completeness-details">
              {hasData && checklist ? (
                Object.entries(checklist).slice(0, 5).map(([key, val]) => (
                  <div key={key} className="insight-check-row">
                    {val ? <CheckCircle2 size={14} className="text-success" /> : <AlertTriangle size={14} className="text-warning" />}
                    <span>{key.replace(/([A-Z])/g, ' $1').replace(/^./, (s) => s.toUpperCase())}</span>
                  </div>
                ))
              ) : (
                <p className="insight-card-desc">Structural checklist appears after your first scan.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
