import React from 'react';
import { Briefcase, X } from 'lucide-react';

/**
 * Text area input component for the Job Description.
 */
export default function JobDescription({ jobText, setJobText }) {
  const handleClear = () => {
    setJobText('');
  };

  const wordCount = jobText ? jobText.trim().split(/\s+/).filter(Boolean).length : 0;
  const charCount = jobText ? jobText.length : 0;

  return (
    <div className="input-card card">
      <div className="card-header">
        <div className="card-title-group">
          <span className="card-step">Step 2</span>
          <h2>Job Description</h2>
        </div>
        {jobText && (
          <button
            type="button"
            onClick={handleClear}
            className="icon-button-text"
            aria-label="Clear job description content"
          >
            <X size={14} />
            Clear
          </button>
        )}
      </div>

      <div className="card-body">
        <div className="textarea-wrapper">
          <Briefcase className="textarea-icon" size={20} />
          <textarea
            value={jobText}
            onChange={(e) => setJobText(e.target.value)}
            placeholder="Paste the job description or requirements here to compare against your resume..."
            className="input-textarea job-textarea"
            aria-label="Paste job description here"
          />
        </div>
        
        <div className="textarea-footer">
          <span className="char-word-counter">
            {wordCount} words | {charCount} characters
          </span>
        </div>
      </div>
    </div>
  );
}
