import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ResumeUploader from './components/ResumeUploader';
import ResumePreview from './components/ResumePreview';
import JobDescription from './components/JobDescription';
import AnalyzeButton from './components/AnalyzeButton';
import Dashboard from './components/Dashboard';
import Footer from './components/Footer';
import UserDashboard from './components/UserDashboard';
import Features from './components/Features';
import Insights from './components/Insights';
import FAQ from './components/FAQ';
import About from './components/About';
import Contact from './components/Contact';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import ProfilePage from './components/ProfilePage';
import SettingsPage from './components/SettingsPage';
import HistoryPage from './components/HistoryPage';
import SavedReportsPage from './components/SavedReportsPage';
import { analyzeATS } from './utils/atsEngine';
import { analyzeResume } from './utils/analyticsEngine';
import { generateSuggestions } from './utils/suggestionEngine';
import { generateInterviewQuestions } from './utils/interviewEngine';
import { DEMO_RESUME, DEMO_JOB_DESCRIPTION } from './utils/constants';
import {
  loadAuth, loadProfile, loadSettings, loadStats, loadHistory, loadSavedReports,
  loadNotifications, saveNotifications, saveHistory, saveSavedReports, saveAuth,
  saveProfile, saveUser, findUserByEmail, recordAnalysis, saveAnalysisReport, getDefaultProfile,
  getDefaultSettings, getDefaultStats, addNotification,
} from './utils/storage';
import { Brain, Sparkles } from 'lucide-react';

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved ? saved === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  const [currentView, setCurrentView] = useState('home');
  const [user, setUser] = useState(() => {
    const auth = loadAuth();
    const profile = auth ? findUserByEmail(auth.email) : null;
    if (auth && profile) return { ...profile, isLoggedIn: true };
    const fallback = loadProfile();
    return { ...fallback, isLoggedIn: false };
  });
  const [settings, setSettings] = useState(loadSettings);
  const [stats, setStats] = useState(loadStats);
  const [history, setHistory] = useState(loadHistory);
  const [savedReports, setSavedReports] = useState(loadSavedReports);
  const [notifications, setNotifications] = useState(loadNotifications);

  const [resumeText, setResumeText] = useState('');
  const [jobText, setJobText] = useState('');
  const [fileName, setFileName] = useState('');

  const [isExtracting, setIsExtracting] = useState(false);
  const [extractionError, setExtractionError] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisStep, setAnalysisStep] = useState(0);

  const [toasts, setToasts] = useState([]);

  const [analysisResults, setAnalysisResults] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark-mode');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark-mode');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView]);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
    addToast(`Switched to ${!isDarkMode ? 'Dark' : 'Light'} Mode`, 'info');
  };

  const protectedViews = new Set(['profile', 'settings', 'history', 'saved-reports']);

  const handleNavigate = (view) => {
    if (protectedViews.has(view) && !user?.isLoggedIn) {
      addToast('Sign in to access this page', 'info');
      setCurrentView('login');
      return;
    }
    setCurrentView(view);
  };

  const addToast = useCallback((message, type = 'success') => {
    if (settings.notifications === false && type !== 'error') return;
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  }, [settings.notifications]);

  const handleLogin = (userData) => {
    const userRecord = { ...userData, isLoggedIn: true };
    setUser(userRecord);
    saveAuth({ email: userData.email, remember: userData.remember });
    saveUser(userData);
    saveProfile({ ...loadProfile(), ...userData });
    setCurrentView('home');
  };

  const handleLogout = () => {
    saveAuth(null);
    const profile = { ...loadProfile(), isLoggedIn: false };
    setUser(profile);
    setCurrentView('home');
    addToast('Signed out', 'info');
  };

  const handleClearNotifications = () => {
    saveNotifications([]);
    setNotifications([]);
  };

  const scrollToAnalyzer = () => {
    if (!user?.isLoggedIn) {
      addToast('Sign in to access the resume analyzer', 'info');
      setCurrentView('login');
      return;
    }
    setCurrentView('home');
    setTimeout(() => {
      document.getElementById('analyzer-section')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const persistAnalysis = (results, resAnalytics, resSuggestions, resQuestions, name) => {
    const { stats: updatedStats } = recordAnalysis({
      fileName: name,
      score: results.score,
      matchingKeywords: results.matchingKeywords,
      missingSkills: results.missingSkills,
      suggestions: resSuggestions,
      questions: resQuestions,
      analysisResults: results,
      analytics: resAnalytics,
    });
    setStats(updatedStats);
    setHistory(loadHistory());
    setUser((prev) => ({ ...loadProfile(), isLoggedIn: prev.isLoggedIn }));
    setNotifications(addNotification(`Analysis complete — ${results.score}% ATS score`));
  };

  const runAnalysis = (rText, jText, name) => {
    setIsAnalyzing(true);
    setAnalysisStep(1);

    const stepsInterval = setInterval(() => {
      setAnalysisStep((prev) => {
        if (prev < 6) return prev + 1;
        clearInterval(stepsInterval);
        return 6;
      });
    }, 350);

    setTimeout(() => {
      try {
        const results = analyzeATS(rText, jText);
        const resAnalytics = analyzeResume(rText, results.matchingSkills);
        const resSuggestions = generateSuggestions(results.missingSkills, results.score);
        const resQuestions = generateInterviewQuestions(results.matchingSkills);

        setAnalysisResults(results);
        setAnalytics(resAnalytics);
        setSuggestions(resSuggestions);
        setQuestions(resQuestions);

        persistAnalysis(results, resAnalytics, resSuggestions, resQuestions, name);
        addToast('Resume scanned successfully!', 'success');

        setTimeout(() => {
          document.getElementById('results-dashboard')?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } catch (err) {
        console.error('Analysis pipeline failed', err);
        setExtractionError('An error occurred during comparison calculations. Please try again.');
        addToast('Analysis failed. Check inputs.', 'error');
      } finally {
        setIsAnalyzing(false);
        setAnalysisStep(0);
      }
    }, 2400);
  };

  const handleAnalyze = () => {
    if (!resumeText.trim() || !jobText.trim()) return;
    if (!user?.isLoggedIn) {
      addToast('Please sign in to analyze resumes', 'info');
      setCurrentView('login');
      return;
    }
    runAnalysis(resumeText, jobText, fileName);
  };

  const handleTryDemo = () => {
    if (!user?.isLoggedIn) {
      addToast('Sign in to try the demo', 'info');
      setCurrentView('login');
      return;
    }

    setResumeText(DEMO_RESUME);
    setJobText(DEMO_JOB_DESCRIPTION);
    setFileName('ishwari_patil_resume.pdf');
    setExtractionError('');
    setCurrentView('home');
    addToast('Demo materials loaded', 'info');
    runAnalysis(DEMO_RESUME, DEMO_JOB_DESCRIPTION, 'ishwari_patil_resume.pdf');
  };

  const handleReset = () => {
    setResumeText('');
    setJobText('');
    setFileName('');
    setExtractionError('');
    setAnalysisResults(null);
    setSuggestions([]);
    setQuestions([]);
    setAnalytics(null);
    addToast('Reset complete', 'info');
    setTimeout(() => {
      document.getElementById('analyzer-section')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleSaveReport = () => {
    if (!analysisResults) return;
    const updated = saveAnalysisReport({
      title: fileName || `Analysis ${analysisResults.score}%`,
      score: analysisResults.score,
      strength: analysisResults.strength,
      analysisResults,
      suggestions,
      questions,
      analytics,
      fileName,
    });
    setSavedReports(updated);
    addToast('Analysis saved to reports!', 'success');
  };

  const handleLoadReport = (report) => {
    const { data } = report;
    setAnalysisResults(data.analysisResults);
    setSuggestions(data.suggestions);
    setQuestions(data.questions);
    setAnalytics(data.analytics);
    setFileName(report.fileName || report.title);
    setCurrentView('home');
    addToast('Report loaded', 'success');
    setTimeout(() => {
      document.getElementById('results-dashboard')?.scrollIntoView({ behavior: 'smooth' });
    }, 200);
  };

  const handleDeleteHistory = (id) => {
    const updated = history.filter((h) => h.id !== id);
    saveHistory(updated);
    setHistory(updated);
  };

  const handleDeleteReport = (id) => {
    const updated = savedReports.filter((r) => r.id !== id);
    saveSavedReports(updated);
    setSavedReports(updated);
    saveProfile({ ...loadProfile(), savedReportsCount: updated.length });
  };

  const handleResetApp = () => {
    setUser(getDefaultProfile());
    setSettings(getDefaultSettings());
    setStats(getDefaultStats());
    setHistory([]);
    setSavedReports([]);
    setNotifications([]);
    setAnalysisResults(null);
    setSuggestions([]);
    setQuestions([]);
    setAnalytics(null);
    setResumeText('');
    setJobText('');
    setFileName('');
    setCurrentView('home');
    setIsDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches);
  };

  const searchData = useMemo(() => ({
    keywords: analysisResults
      ? [...(analysisResults.matchingKeywords || []), ...(analysisResults.missingKeywords || [])]
      : [],
    suggestions,
    questions,
    reports: savedReports,
  }), [analysisResults, suggestions, questions, savedReports]);

  const isFormValid = resumeText.trim().length > 0 && jobText.trim().length > 0;
  const animationsEnabled = settings.animations !== false;

  const renderPage = () => {
    switch (currentView) {
      case 'login':
        return <LoginPage onNavigate={handleNavigate} onLogin={handleLogin} addToast={addToast} />;
      case 'register':
        return <RegisterPage onNavigate={handleNavigate} onLogin={handleLogin} addToast={addToast} />;
      case 'profile':
        return <ProfilePage profile={user} stats={stats} onProfileUpdate={setUser} addToast={addToast} />;
      case 'settings':
        return (
          <SettingsPage
            settings={settings}
            onSettingsChange={setSettings}
            isDarkMode={isDarkMode}
            toggleTheme={toggleTheme}
            addToast={addToast}
            onResetApp={handleResetApp}
          />
        );
      case 'history':
        return (
          <HistoryPage
            history={history}
            onDelete={handleDeleteHistory}
            onView={() => addToast('Open a saved report to reload full results', 'info')}
            addToast={addToast}
          />
        );
      case 'saved-reports':
        return (
          <SavedReportsPage
            reports={savedReports}
            onDelete={handleDeleteReport}
            onLoad={handleLoadReport}
            addToast={addToast}
          />
        );
      default:
        return null;
    }
  };

  const pageContent = renderPage();

  return (
    <div className={`app-layout ${animationsEnabled ? '' : 'animations-disabled'}`}>
      <div className="bg-glow bg-glow-1" aria-hidden="true" />
      <div className="bg-glow bg-glow-2" aria-hidden="true" />

      <Navbar
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme}
        onNavigate={handleNavigate}
        currentView={currentView}
        user={user}
        notifications={notifications}
        onClearNotifications={handleClearNotifications}
        onLogout={handleLogout}
        searchData={searchData}
      />

      <main className="main-content">
        {pageContent || (
          <>
            {!analysisResults && (
              <div className="container">
                <Hero onDemoClick={handleTryDemo} />
              </div>
            )}

            {!analysisResults && (
              <UserDashboard stats={stats} onNavigate={handleNavigate} onScrollToAnalyzer={scrollToAnalyzer} />
            )}

            <section
              id="analyzer-section"
              className={`analyzer-section ${analysisResults ? 'analyzer-section-collapsed' : ''}`}
              aria-label="Resume Scanner Input"
            >
              <div className="container">
                {!analysisResults && (
                  <div className="section-title-wrapper" data-aos="fade-up">
                    <div className="section-badge">
                      <Sparkles size={12} className="text-primary" />
                      <span>Interactive Core Scanner</span>
                    </div>
                    <h2 className="section-title-label">Configure Scan Parameters</h2>
                    <p className="section-description-text">Provide your professional resume and the job targets below.</p>
                  </div>
                )}

                {!analysisResults && (
                  <div className="uploader-row-grid">
                    <ResumeUploader
                      resumeText={resumeText}
                      setResumeText={setResumeText}
                      fileName={fileName}
                      setFileName={setFileName}
                      isExtracting={isExtracting}
                      setIsExtracting={setIsExtracting}
                      extractionError={extractionError}
                      setExtractionError={setExtractionError}
                      onUploadSuccess={() => addToast('Resume parsed successfully!', 'success')}
                    />
                    <JobDescription jobText={jobText} setJobText={setJobText} />
                  </div>
                )}

                {!analysisResults && !isFormValid && (
                  <div className="empty-state-card card animate-fade-in" data-aos="fade-up">
                    <div className="empty-state-illustration-container">
                      <div className="empty-state-glow" />
                      <Brain className="empty-state-icon text-primary animate-pulse" size={64} />
                    </div>
                    <h3 className="empty-state-title">Ready to Analyze</h3>
                    <p className="empty-state-subtitle">Upload your resume and paste a job description to begin.</p>
                  </div>
                )}

                {!analysisResults && resumeText && (
                  <ResumePreview resumeText={resumeText} fileName={fileName} />
                )}

                {!analysisResults && (
                  <div className="action-button-centered-row">
                    <AnalyzeButton
                      onClick={handleAnalyze}
                      isDisabled={!isFormValid}
                      isAnalyzing={isAnalyzing}
                    />
                  </div>
                )}
              </div>
            </section>

            {analysisResults && (
              <section className="results-section" aria-label="ATS Scan Dashboard">
                <Dashboard
                  analysisResults={analysisResults}
                  suggestions={suggestions}
                  questions={questions}
                  analytics={analytics}
                  onReset={handleReset}
                  addToast={addToast}
                  onSaveReport={handleSaveReport}
                  fileName={fileName}
                />
              </section>
            )}

            <Insights analysisResults={analysisResults} suggestions={suggestions} analytics={analytics} />
            <Features />
            <FAQ />
            <About />
            <Contact />
          </>
        )}
      </main>

      <Footer onNavigate={handleNavigate} />

      {isAnalyzing && (
        <div className="analysis-overlay" role="dialog" aria-modal="true" aria-label="Analyzing resume">
          <div className="analysis-overlay-card card">
            <div className="overlay-header">
              <Brain className="overlay-brain spinner text-primary" size={32} />
              <h2>Processing Analytics</h2>
              <p>Analyzing resume compatibility against requirements...</p>
            </div>

            <div className="overlay-timeline">
              {[
                'Uploading',
                'Extracting Text',
                'Finding Keywords',
                'Calculating ATS',
                'Generating Suggestions',
                'Preparing Interview Questions',
              ].map((label, i) => {
                const step = i + 1;
                const done = analysisStep > step;
                const active = analysisStep === step;
                const pct = done ? '100%' : active ? '50%' : '0%';
                const width = done ? '100%' : active ? '50%' : '0%';
                return (
                  <div key={label} className={`timeline-step ${analysisStep >= step ? 'completed' : ''} ${active ? 'active' : ''}`}>
                    <div className="step-header-row">
                      <span className="step-check">{done ? '✓' : step}</span>
                      <span className="step-text">{label}</span>
                      <span className="step-percent">{pct}</span>
                    </div>
                    <div className="step-mini-bar">
                      <div className="step-mini-fill" style={{ width }} />
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="overlay-progress-bar">
              <div className="overlay-progress-fill" style={{ width: `${Math.round((analysisStep / 6) * 100)}%` }} />
            </div>
          </div>
        </div>
      )}

      <div className="toast-container" role="status" aria-live="polite">
        {toasts.map((toast) => (
          <div key={toast.id} className={`toast toast-${toast.type} animate-slide-in`}>
            <span className="toast-icon-wrapper">
              {toast.type === 'success' ? '✓' : toast.type === 'error' ? '✕' : 'ℹ'}
            </span>
            <span className="toast-message-text">{toast.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
