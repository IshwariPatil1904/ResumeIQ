import React from 'react';
import { Trash2, RotateCcw, Bell, Sparkles, Globe } from 'lucide-react';
import { saveSettings, clearHistory, resetApplication } from '../utils/storage';

export default function SettingsPage({
  settings,
  onSettingsChange,
  isDarkMode,
  toggleTheme,
  addToast,
  onResetApp,
}) {
  const update = (key, value) => {
    const next = { ...settings, [key]: value };
    onSettingsChange(next);
    saveSettings(next);
  };

  const handleClearHistory = () => {
    clearHistory();
    addToast('History cleared', 'info');
  };

  const handleResetApp = () => {
    if (window.confirm('Reset all local data? This cannot be undone.')) {
      resetApplication();
      onResetApp();
      addToast('Application reset', 'info');
    }
  };

  return (
    <div className="settings-wrapper container">
      <div className="settings-card-layout card">
        <div className="settings-group-section">
          <h3>Appearance</h3>
          <div className="settings-option-item">
            <div className="settings-option-meta">
              <span className="settings-option-title">Theme</span>
              <span className="settings-option-desc">Switch between light and dark mode</span>
            </div>
            <label className="settings-toggle-switch">
              <input type="checkbox" checked={isDarkMode} onChange={toggleTheme} aria-label="Dark mode" />
              <span className="settings-toggle-slider" />
            </label>
          </div>
          <div className="settings-option-item">
            <div className="settings-option-meta">
              <span className="settings-option-title"><Sparkles size={14} /> Animations</span>
              <span className="settings-option-desc">Enable micro-animations and transitions</span>
            </div>
            <label className="settings-toggle-switch">
              <input type="checkbox" checked={settings.animations} onChange={(e) => update('animations', e.target.checked)} />
              <span className="settings-toggle-slider" />
            </label>
          </div>
        </div>

        <div className="settings-group-section">
          <h3>Preferences</h3>
          <div className="settings-option-item">
            <div className="settings-option-meta">
              <span className="settings-option-title"><Bell size={14} /> Notifications</span>
              <span className="settings-option-desc">Show in-app notification toasts</span>
            </div>
            <label className="settings-toggle-switch">
              <input type="checkbox" checked={settings.notifications} onChange={(e) => update('notifications', e.target.checked)} />
              <span className="settings-toggle-slider" />
            </label>
          </div>
          <div className="settings-option-item">
            <div className="settings-option-meta">
              <span className="settings-option-title"><Globe size={14} /> Language</span>
              <span className="settings-option-desc">Interface language (UI only)</span>
            </div>
            <select className="settings-select" value={settings.language} onChange={(e) => update('language', e.target.value)} aria-label="Language">
              <option value="en">English</option>
              <option value="es">Español</option>
              <option value="fr">Français</option>
              <option value="de">Deutsch</option>
            </select>
          </div>
        </div>

        <div className="settings-group-section">
          <h3>Data Management</h3>
          <p className="settings-option-desc" style={{ marginBottom: 16 }}>All data is stored locally in your browser.</p>
          <div className="settings-danger-actions-row">
            <button type="button" className="button button-secondary hover-scale" onClick={handleClearHistory}>
              <Trash2 size={14} className="button-icon" />
              Clear History
            </button>
            <button type="button" className="button button-danger-outline hover-scale" onClick={handleResetApp}>
              <RotateCcw size={14} className="button-icon" />
              Reset Application
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
