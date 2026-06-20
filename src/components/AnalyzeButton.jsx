import React from 'react';
import { Cpu, RefreshCw } from 'lucide-react';

/**
 * Trigger button for starting the resume analysis with animated loading and progress states.
 */
export default function AnalyzeButton({ onClick, isDisabled, isAnalyzing }) {
  return (
    <div className="analyze-action-wrapper">
      <button
        onClick={onClick}
        disabled={isDisabled || isAnalyzing}
        className={`button button-lg btn-analyze ${isAnalyzing ? 'analyzing' : ''}`}
        aria-busy={isAnalyzing}
        aria-live="polite"
      >
        {isAnalyzing ? (
          <>
            <RefreshCw className="button-icon spinner" size={20} />
            <span>Analyzing Resume...</span>
          </>
        ) : (
          <>
            <Cpu className="button-icon" size={20} />
            <span>Scan &amp; Compare Resume</span>
          </>
        )}
      </button>
      
      {isAnalyzing && (
        <div className="analysis-progress-bar-container">
          <div className="analysis-progress-bar-fill"></div>
          <span className="sr-only">Scanning matching keywords, evaluating strength rating, mapping interview questions...</span>
        </div>
      )}
    </div>
  );
}
