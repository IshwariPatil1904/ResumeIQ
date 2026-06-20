import React from 'react';
import { Lightbulb, Wrench, AlertCircle, FileText, CheckCircle } from 'lucide-react';

/**
 * Suggestions component displaying rule-based and structural improvement advice.
 */
export default function Suggestions({ suggestions }) {
  if (!suggestions || suggestions.length === 0) return null;

  // Get matching icons for suggestions
  const getIcon = (type) => {
    switch (type) {
      case 'missing_skill':
        return <Wrench size={18} className="text-warning" />;
      case 'structural':
        return <AlertCircle size={18} className="text-danger" />;
      case 'formatting':
        return <FileText size={18} className="text-primary" />;
      case 'compatibility':
        return <CheckCircle size={18} className="text-success" />;
      default:
        return <Lightbulb size={18} className="text-primary" />;
    }
  };

  return (
    <div className="suggestions-card card" data-aos="fade-up">
      <div className="card-header">
        <div className="card-title-group">
          <Lightbulb className="text-primary animate-pulse" size={20} />
          <h2>Tailored Resume Suggestions</h2>
        </div>
        <p className="card-subtitle-small">Actionable tips to improve your ATS compatibility and resume formatting.</p>
      </div>

      <div className="card-body">
        <div className="suggestions-list-grid">
          {suggestions.map((suggestion, index) => (
            <div key={`suggest-${index}`} className={`suggestion-item-card ${suggestion.type}`}>
              <div className="suggestion-icon-wrapper">
                {getIcon(suggestion.type)}
              </div>
              <div className="suggestion-details">
                <h3 className="suggestion-title">{suggestion.title}</h3>
                <p className="suggestion-desc">{suggestion.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
