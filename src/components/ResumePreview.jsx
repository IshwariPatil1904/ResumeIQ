import React, { useState } from 'react';
import { ChevronDown, ChevronUp, FileText, Eye } from 'lucide-react';

/**
 * Renders a collapsible preview of the extracted resume text to verify parsing.
 */
export default function ResumePreview({ resumeText, fileName }) {
  const [isOpen, setIsOpen] = useState(false);

  if (!resumeText) return null;

  const wordCount = resumeText.trim().split(/\s+/).filter(Boolean).length;
  const characterCount = resumeText.length;

  return (
    <div className="resume-preview-card card" data-aos="fade-up">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="preview-header-btn"
        aria-expanded={isOpen}
        aria-controls="resume-text-preview"
      >
        <div className="preview-meta-info">
          <div className="preview-icon-wrapper">
            <FileText size={18} className="text-primary" />
          </div>
          <div className="preview-title-details">
            <h3>Extracted Text Preview</h3>
            <p className="preview-stats">
              {fileName || 'Document'} • {wordCount} words • {characterCount} characters
            </p>
          </div>
        </div>
        
        <div className="preview-toggle-indicators">
          <span className="preview-badge-status">Ready</span>
          {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>
      </button>

      {isOpen && (
        <div id="resume-text-preview" className="preview-content-box">
          <div className="preview-banner">
            <Eye size={14} className="banner-icon" />
            <span>Below is the raw text extracted client-side. The ATS comparison engine scans this exact text.</span>
          </div>
          <pre className="raw-text-viewer">
            {resumeText}
          </pre>
        </div>
      )}
    </div>
  );
}
