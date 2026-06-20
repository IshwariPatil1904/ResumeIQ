import React from 'react';
import { Award, AlertTriangle, CheckCircle, Shield } from 'lucide-react';
/**
 * Renders the rating summary and quality ranking details of the resume match.
 */
export default function StrengthCard({ score, strength }) {
  
  // Icon and text styling configs based on strength
  const getConfig = () => {
    switch (strength) {
      case 'Excellent':
        return {
          icon: <Award className="strength-icon text-success" size={24} />,
          class: 'strength-excellent',
          desc: 'Your resume is highly optimized for this job description. You have a stellar presence of core skills and keywords!'
        };
      case 'Good':
        return {
          icon: <CheckCircle className="strength-icon text-primary" size={24} />,
          class: 'strength-good',
          desc: 'Great job! Your resume matches the key criteria. A few additions of missing skills could put you in the top tier.'
        };
      case 'Average':
        return {
          icon: <AlertTriangle className="strength-icon text-warning" size={24} />,
          class: 'strength-average',
          desc: 'Moderate compatibility. Consider adding more details about missing skills to improve ATS indexing odds.'
        };
      case 'Needs Improvement':
      default:
        return {
          icon: <Shield className="strength-icon text-danger" size={24} />,
          class: 'strength-needs-improvement',
          desc: 'Low match score. Tailor your resume specifically to the keywords in the job description to get past ATS filters.'
        };
    }
  };

  const config = getConfig();

  return (
    <div className={`strength-card-wrapper card ${config.class}`} data-aos="fade-up">
      <div className="card-header-simple">
        {config.icon}
        <div>
          <span className="strength-label-top">Resume Strength</span>
          <h2 className="strength-value-title">{strength}</h2>
        </div>
      </div>
      
      <div className="card-body-simple">
        <div className="strength-bar-track">
          <div 
            className="strength-bar-fill" 
            style={{ width: `${score}%` }}
            role="progressbar"
            aria-valuenow={score}
            aria-valuemin="0"
            aria-valuemax="100"
          ></div>
        </div>
        <p className="strength-description-text">{config.desc}</p>
      </div>

      <div className="strength-milestones">
        <span className={score <= 30 ? 'active' : ''}>0-30 Need Imp.</span>
        <span className={score > 30 && score <= 60 ? 'active' : ''}>31-60 Avg.</span>
        <span className={score > 60 && score <= 80 ? 'active' : ''}>61-80 Good</span>
        <span className={score > 80 ? 'active' : ''}>81-100 Exc.</span>
      </div>
    </div>
  );
}
