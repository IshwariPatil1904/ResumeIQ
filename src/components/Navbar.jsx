import React, { useState, useEffect, useRef } from 'react';
import {
  Sun, Moon, Bell, Search, Menu, FileCheck, ChevronDown,
  User, Settings, LogOut, LogIn, History, Bookmark
} from 'lucide-react';
import MobileDrawer from './MobileDrawer';
import GlobalSearch from './GlobalSearch';

const NAV_ITEMS = [
  { id: 'dashboard-section', label: 'Dashboard' },
  { id: 'analyzer-section', label: 'Analyzer' },
  { id: 'features-section', label: 'Features' },
  { id: 'faq-section', label: 'FAQ' },
  { id: 'about-section', label: 'About' },
  { id: 'contact-section', label: 'Contact' },
];

export default function Navbar({
  isDarkMode,
  toggleTheme,
  onNavigate,
  currentView,
  user,
  notifications,
  onClearNotifications,
  onLogout,
  searchData,
}) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [notifyOpen, setNotifyOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const profileRef = useRef(null);
  const notifyRef = useRef(null);

  useEffect(() => {
    if (currentView !== 'home') return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: '-40% 0px -50% 0px', threshold: 0.1 }
    );

    NAV_ITEMS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [currentView]);

  useEffect(() => {
    const handleClick = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) setProfileOpen(false);
      if (notifyRef.current && !notifyRef.current.contains(e.target)) setNotifyOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  useEffect(() => {
    if (drawerOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [drawerOpen]);

  const scrollToSection = (id) => {
    if (currentView !== 'home') {
      onNavigate('home');
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
    setDrawerOpen(false);
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <>
      <header className="header" role="banner">
        <div className="header-container container">
          <button
            type="button"
            className="logo-group"
            onClick={() => onNavigate('home')}
            aria-label="ResumeIQ Home"
          >
            <div className="logo-icon-wrapper">
              <FileCheck className="logo-icon" size={24} />
            </div>
            <span className="logo-text">Resume<span className="logo-highlight">IQ</span></span>
          </button>

          <nav className="nav-menu" role="navigation" aria-label="Main Navigation">
            {NAV_ITEMS.map(({ id, label }) => (
              <button
                key={id}
                type="button"
                onClick={() => scrollToSection(id)}
                className={`nav-link btn-link-style ${activeSection === id && currentView === 'home' ? 'active-link' : ''}`}
              >
                {label}
              </button>
            ))}
          </nav>

          <div className="header-actions">
            <button
              type="button"
              className="icon-button header-search-btn"
              onClick={() => setSearchOpen(true)}
              aria-label="Open global search"
              title="Search"
            >
              <Search size={18} />
            </button>

            <button
              type="button"
              onClick={toggleTheme}
              className="icon-button"
              aria-label={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <div className="header-notify-btn-wrapper" ref={notifyRef}>
              <button
                type="button"
                className="icon-button"
                onClick={() => setNotifyOpen((v) => !v)}
                aria-label="Notifications"
                aria-expanded={notifyOpen}
              >
                <Bell size={18} />
                {unreadCount > 0 && <span className="header-notify-badge" aria-hidden="true" />}
              </button>

              {notifyOpen && (
                <div className="notifications-dropdown-menu" role="menu">
                  <div className="notifications-dropdown-header">
                    <h4>Notifications</h4>
                    {notifications.length > 0 && (
                      <button type="button" className="notifications-clear-btn" onClick={onClearNotifications}>
                        Clear all
                      </button>
                    )}
                  </div>
                  <div className="notification-list-items">
                    {notifications.length === 0 ? (
                      <p className="no-notifications-fallback">No notifications yet</p>
                    ) : (
                      notifications.slice(0, 8).map((n) => (
                        <div key={n.id} className="notification-item-card">
                          {!n.read && <span className="notification-dot-unread" />}
                          <p>{n.message}</p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="header-profile-wrapper" ref={profileRef} style={{ position: 'relative' }}>
              <button
                type="button"
                className="header-avatar-btn"
                onClick={() => setProfileOpen((v) => !v)}
                aria-label="Profile menu"
                aria-expanded={profileOpen}
              >
                {user?.avatar || '👤'}
              </button>

              {profileOpen && (
                <div className="header-dropdown-menu" role="menu">
                  <div className="dropdown-header-info">
                    <p className="dropdown-user-name">{user?.name || 'Guest User'}</p>
                    <p className="dropdown-user-email">{user?.email || 'Not signed in'}</p>
                  </div>
                  {user?.isLoggedIn ? (
                    <>
                      <button type="button" className="dropdown-link-item" onClick={() => { onNavigate('profile'); setProfileOpen(false); }}>
                        <User size={16} /> Profile
                      </button>
                      <button type="button" className="dropdown-link-item" onClick={() => { onNavigate('history'); setProfileOpen(false); }}>
                        <History size={16} /> History
                      </button>
                      <button type="button" className="dropdown-link-item" onClick={() => { onNavigate('saved-reports'); setProfileOpen(false); }}>
                        <Bookmark size={16} /> Saved Reports
                      </button>
                      <button type="button" className="dropdown-link-item" onClick={() => { onNavigate('settings'); setProfileOpen(false); }}>
                        <Settings size={16} /> Settings
                      </button>
                      <button type="button" className="dropdown-link-item logout-item" onClick={() => { onLogout(); setProfileOpen(false); }}>
                        <LogOut size={16} /> Sign Out
                      </button>
                    </>
                  ) : (
                    <>
                      <button type="button" className="dropdown-link-item" onClick={() => { onNavigate('login'); setProfileOpen(false); }}>
                        <LogIn size={16} /> Sign In
                      </button>
                      <button type="button" className="dropdown-link-item" onClick={() => { onNavigate('register'); setProfileOpen(false); }}>
                        <User size={16} /> Create Account
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>

            <button
              type="button"
              className="hamburger-menu-btn icon-button"
              onClick={() => setDrawerOpen(true)}
              aria-label="Open navigation menu"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </header>

      <MobileDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onNavigate={onNavigate}
        onScrollTo={scrollToSection}
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme}
        user={user}
        currentView={currentView}
      />

      {searchOpen && (
        <GlobalSearch
          onClose={() => setSearchOpen(false)}
          searchData={searchData}
          onNavigate={onNavigate}
          onScrollTo={scrollToSection}
        />
      )}
    </>
  );
}
