import React from 'react';
import { ClipboardCheck, CheckCircle2, XCircle } from 'lucide-react';

/**
 * Checklist component to show ATS readiness details.
 */
export default function Checklist({ checklist }) {
  if (!checklist) return null;

  const items = [
    { key: 'contactInfo', label: 'Contact Information (Email/Phone)' },
    { key: 'skillsSection', label: 'Skills Section / Skills List' },
    { key: 'educationSection', label: 'Education Section' },
    { key: 'experienceSection', label: 'Professional Experience Section' },
    { key: 'projectsSection', label: 'Projects Section' },
    { key: 'githubLink', label: 'GitHub Profile Link' },
    { key: 'linkedinLink', label: 'LinkedIn Profile Link' },
    { key: 'achievements', label: 'Achievements / Awards' },
    { key: 'certifications', label: 'Certifications & Courses' }
  ];

  // Count completed items
  const completedCount = Object.values(checklist).filter(Boolean).length;
  const progressPercent = Math.round((completedCount / items.length) * 100);

  return (
    <div className="checklist-card card" data-aos="fade-up">
      <div className="card-header">
        <div className="card-title-group">
          <ClipboardCheck className="text-primary" size={20} />
          <h2>ATS Readiness Checklist</h2>
        </div>
        <p className="card-subtitle-small">Verify if your resume has all the formatting segments scanned by parser bots.</p>
      </div>

      <div className="card-body">
        {/* Progress header */}
        <div className="checklist-progress-summary">
          <div className="checklist-progress-text">
            <span>Ready Score: <strong>{progressPercent}%</strong></span>
            <span>{completedCount} of {items.length} items found</span>
          </div>
          <div className="checklist-progress-track">
            <div 
              className="checklist-progress-fill" 
              style={{ width: `${progressPercent}%` }}
              role="progressbar"
              aria-valuenow={progressPercent}
              aria-valuemin="0"
              aria-valuemax="100"
            ></div>
          </div>
        </div>

        {/* Checklist items list */}
        <ul className="checklist-items-list">
          {items.map((item) => {
            const isCompleted = checklist[item.key];
            return (
              <li 
                key={item.key} 
                className={`checklist-item-row ${isCompleted ? 'completed' : 'incomplete'}`}
              >
                <span className="checklist-icon-status">
                  {isCompleted ? (
                    <CheckCircle2 size={16} className="text-success fill-success-bg" />
                  ) : (
                    <XCircle size={16} className="text-danger fill-danger-bg" />
                  )}
                </span>
                <span className="checklist-item-label">{item.label}</span>
                <span className={`checklist-item-badge ${isCompleted ? 'found' : 'missing'}`}>
                  {isCompleted ? 'Found' : 'Missing'}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
