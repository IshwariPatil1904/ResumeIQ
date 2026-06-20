import React, { useEffect, useRef } from 'react';
import {
  X, LayoutDashboard, ScanSearch, History, Bookmark,
  HelpCircle, Info, Mail, Settings, Sun, Moon, User, LogIn
} from 'lucide-react';

const DRAWER_LINKS = [
  { type: 'section', id: 'dashboard-section', label: 'Dashboard', icon: LayoutDashboard },
  { type: 'section', id: 'analyzer-section', label: 'Analyzer', icon: ScanSearch },
  { type: 'page', view: 'history', label: 'History', icon: History },
  { type: 'page', view: 'saved-reports', label: 'Saved Analysis', icon: Bookmark },
  { type: 'section', id: 'faq-section', label: 'FAQ', icon: HelpCircle },
  { type: 'section', id: 'about-section', label: 'About', icon: Info },
  { type: 'section', id: 'contact-section', label: 'Contact', icon: Mail },
  { type: 'page', view: 'settings', label: 'Settings', icon: Settings },
];

export default function MobileDrawer({
  isOpen,
  onClose,
  onNavigate,
  onScrollTo,
  isDarkMode,
  toggleTheme,
  user,
  currentView,
}) {
  const drawerRef = useRef(null);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleKey);
      drawerRef.current?.querySelector('button')?.focus();
    }
    return () => document.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  const handleLink = (link) => {
    if (link.type === 'section') onScrollTo(link.id);
    else onNavigate(link.view);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      <div
        className="side-drawer-overlay"
        onClick={onClose}
        onKeyDown={(e) => e.key === 'Enter' && onClose()}
        role="button"
        tabIndex={0}
        aria-label="Close menu overlay"
      />
      <aside
        ref={drawerRef}
        className={`side-drawer-container drawer-open`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
      >
        <div>
          <div className="drawer-header">
            <span className="logo-text">Resume<span className="logo-highlight">IQ</span></span>
            <button type="button" className="drawer-close-btn" onClick={onClose} aria-label="Close menu">
              <X size={22} />
            </button>
          </div>

          <ul className="drawer-nav-list">
            {DRAWER_LINKS.map((link) => {
              const Icon = link.icon;
              const isActive = link.type === 'page' ? currentView === link.view : false;
              return (
                <li key={link.label}>
                  <button
                    type="button"
                    className={`drawer-nav-item ${isActive ? 'active-item' : ''}`}
                    onClick={() => handleLink(link)}
                  >
                    <Icon size={18} />
                    {link.label}
                  </button>
                </li>
              );
            })}

            <li>
              <button type="button" className="drawer-nav-item" onClick={toggleTheme}>
                {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
                Theme
              </button>
            </li>
          </ul>
        </div>

        <div className="drawer-footer">
          <button
            type="button"
            className="drawer-user-info-row"
            onClick={() => {
              onNavigate(user?.isLoggedIn ? 'profile' : 'login');
              onClose();
            }}
          >
            <span className="drawer-user-avatar">{user?.avatar || '👤'}</span>
            <div className="drawer-user-names">
              <span className="drawer-user-name">{user?.name || 'Guest User'}</span>
              <span className="drawer-user-email">{user?.email || 'Tap to sign in'}</span>
            </div>
          </button>
          {!user?.isLoggedIn && (
            <button
              type="button"
              className="button button-primary button-sm hover-scale"
              style={{ width: '100%' }}
              onClick={() => { onNavigate('login'); onClose(); }}
            >
              <LogIn size={14} className="button-icon" />
              Sign In
            </button>
          )}
        </div>
      </aside>
    </>
  );
}
