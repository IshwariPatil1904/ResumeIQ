import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Search, X, Hash, Lightbulb, MessageCircle, FileText, ArrowRight } from 'lucide-react';

export default function GlobalSearch({ onClose, searchData, onNavigate, onScrollTo }) {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
    const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [onClose]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];

    const items = [];

    (searchData.keywords || []).forEach((kw) => {
      if (kw.toLowerCase().includes(q)) {
        items.push({ type: 'keyword', label: kw, icon: Hash });
      }
    });

    (searchData.suggestions || []).forEach((s) => {
      const text = `${s.title} ${s.description}`.toLowerCase();
      if (text.includes(q)) {
        items.push({ type: 'suggestion', label: s.title, sub: s.description, icon: Lightbulb });
      }
    });

    (searchData.questions || []).forEach((qst) => {
      if (qst.question.toLowerCase().includes(q) || qst.category.toLowerCase().includes(q)) {
        items.push({ type: 'question', label: qst.question, sub: qst.category, icon: MessageCircle });
      }
    });

    (searchData.reports || []).forEach((r) => {
      if (r.title.toLowerCase().includes(q) || r.fileName?.toLowerCase().includes(q)) {
        items.push({ type: 'report', label: r.title, sub: `${r.score}% ATS`, icon: FileText, id: r.id });
      }
    });

    return items.slice(0, 12);
  }, [query, searchData]);

  const handleSelect = (item) => {
    if (item.type === 'report') onNavigate('saved-reports');
    else onScrollTo('results-dashboard');
    onClose();
  };

  return (
    <div className="global-search-overlay" role="dialog" aria-modal="true" aria-label="Global search">
      <div className="global-search-backdrop" onClick={onClose} aria-hidden="true" />
      <div className="global-search-modal card animate-fade-in">
        <div className="global-search-header">
          <Search size={18} className="global-search-icon" />
          <input
            ref={inputRef}
            type="search"
            className="global-search-input"
            placeholder="Search keywords, suggestions, questions, reports..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search"
          />
          <button type="button" className="icon-button" onClick={onClose} aria-label="Close search">
            <X size={18} />
          </button>
        </div>

        <div className="global-search-results">
          {query.trim() === '' && (
            <p className="global-search-hint">Type to find keywords, suggestions, interview questions, or saved reports.</p>
          )}
          {query.trim() !== '' && results.length === 0 && (
            <p className="global-search-hint">No results for &ldquo;{query}&rdquo;</p>
          )}
          {results.map((item, idx) => {
            const Icon = item.icon;
            return (
              <button
                key={`${item.type}-${idx}`}
                type="button"
                className="global-search-result-item hover-lift"
                onClick={() => handleSelect(item)}
              >
                <span className="global-search-result-icon"><Icon size={16} /></span>
                <span className="global-search-result-text">
                  <strong>{item.label}</strong>
                  {item.sub && <span>{item.sub}</span>}
                </span>
                <ArrowRight size={14} className="global-search-result-arrow" />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
