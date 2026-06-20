import React, { useState, useRef } from 'react';
import { Upload, Clipboard, FileText, Check, AlertCircle, RefreshCw, File } from 'lucide-react';
import { extractTextFromFile } from '../utils/pdfExtractor';

/**
 * Component to handle drag & drop file upload or manual resume text pasting.
 */
export default function ResumeUploader({
  resumeText,
  setResumeText,
  fileName,
  setFileName,
  isExtracting,
  setIsExtracting,
  extractionError,
  setExtractionError,
  onUploadSuccess
}) {
  const [activeTab, setActiveTab] = useState('upload'); // 'upload' | 'paste'
  const [isDragActive, setIsDragActive] = useState(false);
  const [fileSizeStr, setFileSizeStr] = useState('');
  const fileInputRef = useRef(null);

  const processFile = async (file) => {
    if (!file) return;

    // Validate size (limit to 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setExtractionError('File is too large. Maximum size allowed is 5MB.');
      return;
    }

    setIsExtracting(true);
    setExtractionError('');
    setFileName(file.name);
    
    // Formatting human-friendly file size
    const kb = Math.round(file.size / 1024);
    setFileSizeStr(kb > 1024 ? `${(kb / 1024).toFixed(1)} MB` : `${kb} KB`);

    try {
      const extractedText = await extractTextFromFile(file);
      setResumeText(extractedText);
      if (onUploadSuccess) onUploadSuccess();
    } catch (err) {
      setExtractionError(err.message || 'Error parsing file.');
      setFileName('');
      setResumeText('');
      setFileSizeStr('');
    } finally {
      setIsExtracting(false);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragActive(true);
    } else if (e.type === 'dragleave') {
      setIsDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const handleTextChange = (e) => {
    setResumeText(e.target.value);
    if (e.target.value.trim()) {
      setFileName('Manual Paste Input');
      setFileSizeStr('Plain Text');
    } else {
      setFileName('');
      setFileSizeStr('');
    }
  };

  const handleClear = () => {
    setResumeText('');
    setFileName('');
    setExtractionError('');
    setFileSizeStr('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const wordCount = resumeText ? resumeText.trim().split(/\s+/).filter(Boolean).length : 0;
  const charCount = resumeText ? resumeText.length : 0;

  return (
    <div className="input-card card hover-lift" data-aos="fade-right">
      <div className="card-header">
        <div className="card-title-group">
          <span className="card-step">Step 1</span>
          <h2>Resume Input</h2>
        </div>
        <div className="tab-buttons" role="tablist">
          <button
            role="tab"
            aria-selected={activeTab === 'upload'}
            onClick={() => setActiveTab('upload')}
            className={`tab-button ${activeTab === 'upload' ? 'active' : ''}`}
          >
            <Upload size={14} className="tab-icon" />
            Upload File
          </button>
          <button
            role="tab"
            aria-selected={activeTab === 'paste'}
            onClick={() => setActiveTab('paste')}
            className={`tab-button ${activeTab === 'paste' ? 'active' : ''}`}
          >
            <Clipboard size={14} className="tab-icon" />
            Paste Text
          </button>
        </div>
      </div>

      <div className="card-body">
        {activeTab === 'upload' ? (
          <div
            className={`drag-drop-zone ${isDragActive ? 'drag-active' : ''} ${resumeText ? 'file-loaded' : ''}`}
            onDragEnter={handleDrag}
            onDragOver={handleDrag}
            onDragLeave={handleDrag}
            onDrop={handleDrop}
          >
            <input
              ref={fileInputRef}
              type="file"
              id="resume-file-input"
              className="file-input-hidden"
              accept=".pdf,.docx,.txt"
              onChange={handleFileChange}
            />
            
            {isExtracting ? (
              <div className="uploader-status-loading">
                <RefreshCw className="spinner text-primary animate-spin" size={40} />
                <p>Extracting resume text locally...</p>
                <div className="micro-progress-fill"></div>
              </div>
            ) : resumeText ? (
              <div className="uploader-status-success animate-fade-in">
                <div className="success-badge-circle">
                  <Check size={28} className="text-success" />
                </div>
                <h3>Resume Loaded Successfully</h3>
                
                <div className="uploaded-file-details-card">
                  <File className="file-card-icon" size={24} />
                  <div className="file-card-meta">
                    <p className="file-card-name">{fileName}</p>
                    <p className="file-card-size">{fileSizeStr}</p>
                  </div>
                  <span className="file-card-status-badge">Ready</span>
                </div>

                <div className="parsed-stats">
                  <span>{wordCount} words</span>
                  <span className="stat-separator">•</span>
                  <span>{charCount} characters</span>
                </div>
                
                <button
                  type="button"
                  onClick={handleClear}
                  className="button button-danger-outline button-sm hover-scale"
                >
                  Clear Resume
                </button>
              </div>
            ) : (
              <label htmlFor="resume-file-input" className="drag-drop-label">
                <div className="upload-icon-pulse-wrapper">
                  <Upload className="upload-icon" size={32} />
                </div>
                <span className="upload-instruction">
                  <strong>Drag &amp; drop</strong> your resume file, or <span className="browse-link">browse</span>
                </span>
                <span className="upload-formats-info">Accepts PDF, DOCX, or TXT (Max 5MB)</span>
              </label>
            )}
          </div>
        ) : (
          <div className="manual-paste-wrapper">
            <textarea
              value={resumeText}
              onChange={handleTextChange}
              placeholder="Paste your formatted resume plain text here to compare compatibility..."
              className="input-textarea resume-textarea focus-glow"
              aria-label="Paste resume content here"
              disabled={isExtracting}
            />
            <div className="textarea-footer">
              <span className="char-word-counter">
                {wordCount} words | {charCount} characters
              </span>
              {resumeText && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="button button-danger-outline button-sm hover-scale"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        )}

        {extractionError && (
          <div className="error-alert animate-fade-in" role="alert">
            <AlertCircle size={16} className="error-icon" />
            <span>{extractionError}</span>
          </div>
        )}
      </div>
    </div>
  );
}
