import React from 'react';
import { BarChart3, HelpCircle, Link2, Zap } from 'lucide-react';

/**
 * Analytics component to show word/character metrics, action verbs, and links.
 */
export default function Analytics({ analyticsData }) {
  if (!analyticsData || analyticsData.wordCount === 0) return null;

  const {
    wordCount,
    charCount,
    skillsCount,
    projectsDetected,
    actionVerbsFound,
    linksFound
  } = analyticsData;

  return (
    <div className="analytics-card card" data-aos="fade-up">
      <div className="card-header">
        <div className="card-title-group">
          <BarChart3 className="text-primary" size={20} />
          <h2>Resume Analytics</h2>
        </div>
        <p className="card-subtitle-small">Visual metrics of your resume's vocabulary and structure.</p>
      </div>

      <div className="card-body">
        {/* Metric stats grid */}
        <div className="analytics-metrics-grid">
          <div className="analytic-stat-box">
            <span className="stat-box-label">Words Count</span>
            <span className="stat-box-value">{wordCount}</span>
            <span className="stat-box-info">{wordCount < 400 ? 'Too short' : wordCount > 800 ? 'Review length' : 'Good length'}</span>
          </div>
          <div className="analytic-stat-box">
            <span className="stat-box-label">Characters</span>
            <span className="stat-box-value">{charCount}</span>
            <span className="stat-box-info">Total character density</span>
          </div>
          <div className="analytic-stat-box">
            <span className="stat-box-label">Skills Identified</span>
            <span className="stat-box-value">{skillsCount}</span>
            <span className="stat-box-info">Total skills matched</span>
          </div>
          <div className="analytic-stat-box">
            <span className="stat-box-label">Projects Found</span>
            <span className="stat-box-value">{projectsDetected}</span>
            <span className="stat-box-info">{projectsDetected === 0 ? 'Add projects' : 'Good detail'}</span>
          </div>
        </div>

        {/* Action Verbs Section */}
        <div className="analytics-sub-section">
          <h3 className="sub-section-title">
            <Zap size={15} className="text-primary" />
            Action Verbs Used ({actionVerbsFound.length})
          </h3>
          {actionVerbsFound.length > 0 ? (
            <div className="badges-wrapper-small">
              {actionVerbsFound.map((verb, idx) => (
                <span key={`verb-${idx}`} className="badge-verb">
                  {verb}
                </span>
              ))}
            </div>
          ) : (
            <p className="sub-section-fallback">No strong action verbs found. Try starting bullets with verbs like "Led", "Optimized", or "Built".</p>
          )}
        </div>

        {/* Links Found Section */}
        <div className="analytics-sub-section">
          <h3 className="sub-section-title">
            <Link2 size={15} className="text-primary" />
            Extracted Links &amp; Contacts ({linksFound.length})
          </h3>
          {linksFound.length > 0 ? (
            <ul className="extracted-links-list">
              {linksFound.map((link, idx) => (
                <li key={`link-${idx}`} className="extracted-link-item">
                  <Link2 size={12} className="link-bullet" />
                  <span className="link-text">{link}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="sub-section-fallback">No active contact links (email, portfolio, github) detected in your resume.</p>
          )}
        </div>
      </div>
    </div>
  );
}
