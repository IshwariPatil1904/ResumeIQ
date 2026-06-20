const KEYS = {
  AUTH: 'resumeiq_auth',
  PROFILE: 'resumeiq_profile',
  USERS: 'resumeiq_users',
  SETTINGS: 'resumeiq_settings',
  HISTORY: 'resumeiq_history',
  SAVED_REPORTS: 'resumeiq_saved_reports',
  STATS: 'resumeiq_stats',
  NOTIFICATIONS: 'resumeiq_notifications',
};

function read(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function write(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function loadUsers() {
  return read(KEYS.USERS, []);
}

export function saveUsers(users) {
  write(KEYS.USERS, users);
}

export function findUserByEmail(email) {
  if (!email) return null;
  return loadUsers().find((user) => user.email?.toLowerCase() === email.toLowerCase());
}

export function saveUser(user) {
  if (!user?.email) return;
  const users = loadUsers();
  const existingIndex = users.findIndex((item) => item.email?.toLowerCase() === user.email.toLowerCase());
  const nextUsers = [...users];

  if (existingIndex >= 0) {
    nextUsers[existingIndex] = { ...nextUsers[existingIndex], ...user };
  } else {
    nextUsers.push(user);
  }

  saveUsers(nextUsers);
}

export function getDefaultProfile() {
  return {
    name: 'Guest User',
    email: '',
    avatar: '👤',
    resumeCount: 0,
    lastAnalysis: null,
    savedReportsCount: 0,
  };
}

export function getDefaultSettings() {
  return {
    notifications: true,
    animations: true,
    language: 'en',
  };
}

export function getDefaultStats() {
  return {
    atsAverage: 0,
    resumeUploads: 0,
    reportsGenerated: 0,
    interviewQuestions: 0,
    suggestions: 0,
    keywordsFound: 0,
    totalAnalyses: 0,
    atsScores: [],
  };
}

export function loadAuth() {
  return read(KEYS.AUTH, null);
}

export function saveAuth(auth) {
  if (auth) write(KEYS.AUTH, auth);
  else localStorage.removeItem(KEYS.AUTH);
}

export function loadProfile() {
  return read(KEYS.PROFILE, getDefaultProfile());
}

export function saveProfile(profile) {
  write(KEYS.PROFILE, profile);
}

export function loadSettings() {
  return read(KEYS.SETTINGS, getDefaultSettings());
}

export function saveSettings(settings) {
  write(KEYS.SETTINGS, settings);
}

export function loadHistory() {
  return read(KEYS.HISTORY, []);
}

export function saveHistory(history) {
  write(KEYS.HISTORY, history);
}

export function loadSavedReports() {
  return read(KEYS.SAVED_REPORTS, []);
}

export function saveSavedReports(reports) {
  write(KEYS.SAVED_REPORTS, reports);
}

export function loadStats() {
  return read(KEYS.STATS, getDefaultStats());
}

export function saveStats(stats) {
  write(KEYS.STATS, stats);
}

export function loadNotifications() {
  return read(KEYS.NOTIFICATIONS, []);
}

export function saveNotifications(notifications) {
  write(KEYS.NOTIFICATIONS, notifications);
}

export function addNotification(message) {
  const list = loadNotifications();
  const entry = { id: Date.now(), message, read: false, timestamp: new Date().toISOString() };
  const updated = [entry, ...list].slice(0, 20);
  saveNotifications(updated);
  return updated;
}

export function recordAnalysis({
  fileName,
  score,
  matchingKeywords,
  missingSkills,
  suggestions,
  questions,
  analysisResults,
  analytics,
}) {
  const stats = loadStats();
  const profile = loadProfile();
  const historyEntry = {
    id: Date.now(),
    fileName: fileName || 'Untitled Resume',
    score,
    timestamp: new Date().toISOString(),
    matchingKeywordsCount: matchingKeywords?.length || 0,
    missingSkillsCount: missingSkills?.length || 0,
    suggestionsCount: suggestions?.length || 0,
    questionsCount: questions?.length || 0,
  };

  const history = [historyEntry, ...loadHistory()].slice(0, 50);
  saveHistory(history);

  const scores = [...(stats.atsScores || []), score].slice(-20);
  const atsAverage = scores.length
    ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
    : 0;

  const updatedStats = {
    ...stats,
    atsAverage,
    resumeUploads: stats.resumeUploads + 1,
    reportsGenerated: stats.reportsGenerated + 1,
    interviewQuestions: stats.interviewQuestions + (questions?.length || 0),
    suggestions: stats.suggestions + (suggestions?.length || 0),
    keywordsFound: stats.keywordsFound + (matchingKeywords?.length || 0),
    totalAnalyses: stats.totalAnalyses + 1,
    atsScores: scores,
  };
  saveStats(updatedStats);

  saveProfile({
    ...profile,
    resumeCount: profile.resumeCount + 1,
    lastAnalysis: historyEntry.timestamp,
    savedReportsCount: loadSavedReports().length,
  });

  return { history, stats: updatedStats };
}

export function saveAnalysisReport({
  title,
  score,
  strength,
  analysisResults,
  suggestions,
  questions,
  analytics,
  fileName,
}) {
  const reports = loadSavedReports();
  const report = {
    id: Date.now(),
    title: title || fileName || `Analysis ${score}%`,
    score,
    strength,
    fileName,
    timestamp: new Date().toISOString(),
    data: { analysisResults, suggestions, questions, analytics },
  };
  const updated = [report, ...reports].slice(0, 30);
  saveSavedReports(updated);

  const profile = loadProfile();
  saveProfile({ ...profile, savedReportsCount: updated.length });

  return updated;
}

export function clearHistory() {
  saveHistory([]);
}

export function resetApplication() {
  Object.values(KEYS).forEach((key) => localStorage.removeItem(key));
  localStorage.removeItem('theme');
}
