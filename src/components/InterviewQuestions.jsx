import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, BookOpen, Copy, Check } from 'lucide-react';

/**
 * Renders technical and general interview questions matched to the resume's skills in an accordion layout.
 */
export default function InterviewQuestions({ questions, addToast }) {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [copiedId, setCopiedId] = useState(null);

  if (!questions || questions.length === 0) return null;

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const handleCopyQuestion = (e, index, questionText, answerText) => {
    e.stopPropagation(); // Prevent toggling the accordion
    const fullText = `Q: ${questionText}\nA: ${answerText}`;
    navigator.clipboard.writeText(fullText);
    setCopiedId(index);
    if (addToast) {
      addToast('Interview question copied!', 'success');
    }
    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

  // Consistent difficulty assignment based on index
  const getDifficulty = (index) => {
    if (index % 3 === 0) return { label: 'Intermediate', class: 'diff-medium' };
    if (index % 3 === 1) return { label: 'Advanced', class: 'diff-hard' };
    return { label: 'Beginner', class: 'diff-easy' };
  };

  return (
    <div className="interview-questions-card card" data-aos="fade-up">
      <div className="card-header">
        <div className="card-title-group">
          <BookOpen className="text-primary" size={20} />
          <h2>Tailored Interview Questions</h2>
        </div>
        <p className="card-subtitle-small">Practice answering these questions based on matching skills found in your resume.</p>
      </div>

      <div className="card-body">
        <div className="questions-accordion">
          {questions.map((item, index) => {
            const isExpanded = expandedIndex === index;
            const diff = getDifficulty(index);
            return (
              <div 
                key={`q-${index}`} 
                className={`accordion-item ${isExpanded ? 'expanded' : ''}`}
              >
                <div
                  onClick={() => toggleExpand(index)}
                  className="accordion-header"
                  role="button"
                  aria-expanded={isExpanded}
                  aria-controls={`q-answer-${index}`}
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      toggleExpand(index);
                    }
                  }}
                >
                  <div className="accordion-title-meta">
                    <div className="question-tags-row">
                      <span className="question-category-tag">{item.category}</span>
                      <span className={`difficulty-badge ${diff.class}`}>{diff.label}</span>
                    </div>
                    <h3 className="question-text-title">{item.question}</h3>
                  </div>
                  
                  <div className="accordion-right-actions">
                    <button
                      type="button"
                      onClick={(e) => handleCopyQuestion(e, index, item.question, item.answer)}
                      className="icon-button-copy-mini hover-scale"
                      title="Copy Question &amp; Answer"
                      aria-label="Copy question details"
                    >
                      {copiedId === index ? <Check size={14} className="text-success" /> : <Copy size={14} />}
                    </button>
                    <span className="accordion-toggle-icon">
                      {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </span>
                  </div>
                </div>

                {isExpanded && (
                  <div id={`q-answer-${index}`} className="accordion-content">
                    <div className="answer-wrapper">
                      <h4 className="answer-label">Suggested Answer:</h4>
                      <p className="answer-text">{item.answer}</p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

