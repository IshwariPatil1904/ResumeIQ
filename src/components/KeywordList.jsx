import React, { useState } from 'react';
import { CheckCircle2, AlertCircle, FileSearch } from 'lucide-react';
/**
 * Keyword lists card showing matching and missing keywords as badges.
 */
export default function KeywordList({ matchingKeywords, missingKeywords }) {
  const [filter, setFilter] = useState('all'); // 'all' | 'matching' | 'missing'

  const totalKeywords = matchingKeywords.length + missingKeywords.length;
  
  if (totalKeywords === 0) return null;

  return (
    <div className="keyword-list-card card" data-aos="fade-up">
      <div className="card-header flex-header">
        <div className="card-title-group">
          <FileSearch className="text-primary" size={20} />
          <h2>Keyword Analysis</h2>
        </div>
        <div className="filter-pill-group">
          <button
            onClick={() => setFilter('all')}
            className={`filter-pill ${filter === 'all' ? 'active' : ''}`}
          >
            All ({totalKeywords})
          </button>
          <button
            onClick={() => setFilter('matching')}
            className={`filter-pill pill-success ${filter === 'matching' ? 'active' : ''}`}
          >
            Matching ({matchingKeywords.length})
          </button>
          <button
            onClick={() => setFilter('missing')}
            className={`filter-pill pill-warning ${filter === 'missing' ? 'active' : ''}`}
          >
            Missing ({missingKeywords.length})
          </button>
        </div>
      </div>

      <div className="card-body">
        <div className="keywords-grid">
          {(filter === 'all' || filter === 'matching') && (
            <div className="keyword-section">
              <div className="keyword-section-header text-success">
                <CheckCircle2 size={16} />
                <h3>Matching Keywords ({matchingKeywords.length})</h3>
              </div>
              {matchingKeywords.length > 0 ? (
                <div className="badges-wrapper">
                  {matchingKeywords.map((word, index) => (
                    <span key={`match-${index}`} className="badge badge-success">
                      {word}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="no-keywords-text">No matching keywords found. Start tailoring your resume.</p>
              )}
            </div>
          )}

          {(filter === 'all' || filter === 'missing') && (
            <div className="keyword-section">
              <div className="keyword-section-header text-warning">
                <AlertCircle size={16} />
                <h3>Missing Keywords ({missingKeywords.length})</h3>
              </div>
              {missingKeywords.length > 0 ? (
                <div className="badges-wrapper">
                  {missingKeywords.map((word, index) => (
                    <span key={`missing-${index}`} className="badge badge-warning">
                      {word}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="no-keywords-text">Excellent! You have zero missing keywords.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
