import React, { useState, useMemo } from 'react';
import { FileText, Search, Trash2, Eye, ArrowUpDown } from 'lucide-react';

function scoreBadgeClass(score) {
  if (score >= 80) return 'badge-green';
  if (score >= 60) return 'badge-blue';
  if (score >= 40) return 'badge-orange';
  return 'badge-red';
}

export default function HistoryPage({ history, onDelete, onView, addToast }) {
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('newest');
  const [filter, setFilter] = useState('all');

  const filtered = useMemo(() => {
    let list = [...history];

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter((h) => h.fileName.toLowerCase().includes(q));
    }

    if (filter === 'high') list = list.filter((h) => h.score >= 70);
    if (filter === 'low') list = list.filter((h) => h.score < 50);

    if (sort === 'newest') list.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    if (sort === 'oldest') list.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
    if (sort === 'score-high') list.sort((a, b) => b.score - a.score);
    if (sort === 'score-low') list.sort((a, b) => a.score - b.score);

    return list;
  }, [history, search, sort, filter]);

  const formatDate = (iso) => new Date(iso).toLocaleString(undefined, {
    month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit',
  });

  return (
    <div className="history-view-wrapper container">
      <div className="history-view-header">
        <h1>Analysis History</h1>
        <p>Recent resume scans stored locally in your browser.</p>
      </div>

      <div className="search-filter-row">
        <div className="search-input-wrapper">
          <Search size={16} className="search-icon-inside" />
          <input
            type="search"
            className="search-input"
            placeholder="Search by resume name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Search history"
          />
        </div>
        <select className="filter-select" value={filter} onChange={(e) => setFilter(e.target.value)} aria-label="Filter">
          <option value="all">All Scores</option>
          <option value="high">High (70%+)</option>
          <option value="low">Low (&lt;50%)</option>
        </select>
        <select className="filter-select" value={sort} onChange={(e) => setSort(e.target.value)} aria-label="Sort">
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="score-high">Score: High to Low</option>
          <option value="score-low">Score: Low to High</option>
        </select>
      </div>

      {filtered.length === 0 ? (
        <div className="no-history-state">
          <FileText size={48} className="no-history-icon" />
          <h3>No history yet</h3>
          <p>Run your first resume analysis to see it here.</p>
        </div>
      ) : (
        <div className="history-list-cards">
          {filtered.map((item) => (
            <article key={item.id} className="history-item-card hover-lift">
              <div className="history-item-left">
                <div className="history-file-icon-wrapper"><FileText size={20} /></div>
                <div className="history-item-details">
                  <span className="history-item-name-txt">{item.fileName}</span>
                  <span className="history-item-meta-txt">{formatDate(item.timestamp)} · {item.matchingKeywordsCount} keywords · {item.suggestionsCount} suggestions</span>
                </div>
              </div>
              <div className="history-item-right">
                <span className={`history-score-badge ${scoreBadgeClass(item.score)}`}>{item.score}%</span>
                <div className="history-item-actions">
                  <button type="button" className="icon-button" onClick={() => onView(item)} aria-label="View analysis">
                    <Eye size={16} />
                  </button>
                  <button type="button" className="icon-button" onClick={() => { onDelete(item.id); addToast('Removed from history', 'info'); }} aria-label="Delete">
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
