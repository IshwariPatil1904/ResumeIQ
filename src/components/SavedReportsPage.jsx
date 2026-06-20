import React, { useState, useMemo } from 'react';
import { Bookmark, Search, Trash2, Download, Eye } from 'lucide-react';

function scoreBadgeClass(score) {
  if (score >= 80) return 'badge-green';
  if (score >= 60) return 'badge-blue';
  if (score >= 40) return 'badge-orange';
  return 'badge-red';
}

export default function SavedReportsPage({ reports, onDelete, onLoad, addToast }) {
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    if (!search.trim()) return reports;
    const q = search.toLowerCase();
    return reports.filter(
      (r) => r.title.toLowerCase().includes(q) || r.fileName?.toLowerCase().includes(q)
    );
  }, [reports, search]);

  const exportReport = (report) => {
    const blob = new Blob([JSON.stringify(report.data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `ResumeIQ_${report.title.replace(/\s+/g, '_')}.json`;
    link.click();
    URL.revokeObjectURL(url);
    addToast('Report exported', 'success');
  };

  const formatDate = (iso) => new Date(iso).toLocaleDateString(undefined, {
    month: 'short', day: 'numeric', year: 'numeric',
  });

  return (
    <div className="history-view-wrapper container">
      <div className="history-view-header">
        <h1>Saved Reports</h1>
        <p>Bookmark and revisit your best analysis results.</p>
      </div>

      <div className="search-filter-row">
        <div className="search-input-wrapper">
          <Search size={16} className="search-icon-inside" />
          <input
            type="search"
            className="search-input"
            placeholder="Search saved reports..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Search reports"
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="no-history-state">
          <Bookmark size={48} className="no-history-icon" />
          <h3>No saved reports</h3>
          <p>Save an analysis from the results dashboard to see it here.</p>
        </div>
      ) : (
        <div className="history-list-cards">
          {filtered.map((report) => (
            <article key={report.id} className="history-item-card hover-lift">
              <div className="history-item-left">
                <div className="history-file-icon-wrapper"><Bookmark size={20} /></div>
                <div className="history-item-details">
                  <span className="history-item-name-txt">{report.title}</span>
                  <span className="history-item-meta-txt">{formatDate(report.timestamp)} · {report.strength}</span>
                </div>
              </div>
              <div className="history-item-right">
                <span className={`history-score-badge ${scoreBadgeClass(report.score)}`}>{report.score}%</span>
                <div className="history-item-actions">
                  <button type="button" className="icon-button" onClick={() => onLoad(report)} aria-label="Load report">
                    <Eye size={16} />
                  </button>
                  <button type="button" className="icon-button" onClick={() => exportReport(report)} aria-label="Export">
                    <Download size={16} />
                  </button>
                  <button type="button" className="icon-button" onClick={() => { onDelete(report.id); addToast('Report deleted', 'info'); }} aria-label="Delete">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
