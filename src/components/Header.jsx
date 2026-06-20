import React from 'react';
import { Sun, Moon, ExternalLink, FileCheck } from 'lucide-react';
/**
 * Header component featuring logo, sticky navigation, theme toggle, and GitHub link.
 */
export default function Header({ isDarkMode, toggleTheme, onDemoClick, onReset }) {
  return (
    <header className="header" role="banner">
      <div className="header-container container">
        <a href="/" className="logo-group" aria-label="ResumeIQ Home">
          <div className="logo-icon-wrapper">
            <FileCheck className="logo-icon" size={24} />
          </div>
          <span className="logo-text">Resume<span className="logo-highlight">IQ</span></span>
        </a>

        <nav className="nav-menu" role="navigation" aria-label="Main Navigation">
          <a href="#analyzer-section" className="nav-link">Analyze</a>
          <button onClick={onDemoClick} className="nav-link btn-link-style">Try Demo</button>
          <button onClick={onReset} className="nav-link btn-link-style">Reset</button>
        </nav>

        <div className="header-actions">
          <button
            onClick={toggleTheme}
            className="icon-button"
            aria-label={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            title={isDarkMode ? 'Light Mode' : 'Dark Mode'}
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          
          <a
            href="https://github.com/ishwari-patil"
            target="_blank"
            rel="noopener noreferrer"
            className="icon-button github-button"
            aria-label="Visit GitHub Repository"
            title="GitHub Repository"
          >
            <ExternalLink size={20} />
          </a>
        </div>
      </div>
    </header>
  );
}
