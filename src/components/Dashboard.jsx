import React from 'react';
import ScoreCard from './ScoreCard';
import StrengthCard from './StrengthCard';
import KeywordList from './KeywordList';
import SkillCategories from './SkillCategories';
import Suggestions from './Suggestions';
import InterviewQuestions from './InterviewQuestions';
import Analytics from './Analytics';
import Checklist from './Checklist';
import ReportActions from './ReportActions';
import SaveReportButton from './SaveReportButton';
import { ArrowLeft, RefreshCw, Award, ShieldCheck, Code2, CheckCircle2 } from 'lucide-react';
import { SKILLS_TAXONOMY } from '../utils/constants';

/**
 * Dashboard component coordinating the display of ATS analysis results.
 */
export default function Dashboard({
  analysisResults,
  suggestions,
  questions,
  analytics,
  onReset,
  addToast,
  onSaveReport,
  fileName,
}) {
  if (!analysisResults || analysisResults.score === undefined) return null;

  const {
    score,
    strength,
    matchingSkills,
    missingSkills,
    matchingKeywords,
    missingKeywords
  } = analysisResults;

  // 1. Calculate Score Breakdown dynamically
  const keywordMatchPercent = matchingKeywords.length + missingKeywords.length > 0
    ? Math.round((matchingKeywords.length / (matchingKeywords.length + missingKeywords.length)) * 100)
    : 0;

  const technicalSkillsPercent = matchingSkills.length + missingSkills.length > 0
    ? Math.round((matchingSkills.length / (matchingSkills.length + missingSkills.length)) * 100)
    : 50; // default baseline

  const experienceQualityPercent = analytics?.checklist?.experienceSection
    ? Math.min(100, 75 + (analytics?.projectsDetected || 0) * 5)
    : 30;

  const formattingPercent = analytics?.checklist
    ? Math.round((Object.values(analytics.checklist).filter(Boolean).length / Object.keys(analytics.checklist).length) * 100)
    : 40;

  // 2. Calculate Skill Area Distributions for the progress bar visualizations
  const skillDistributions = [];
  const matchedSet = new Set(matchingSkills.map(s => s.toLowerCase()));
  const missingSet = new Set(missingSkills.map(s => s.toLowerCase()));

  const categoryTitles = {
    frontend: 'Frontend',
    backend: 'Backend',
    database: 'Databases',
    cloud: 'Cloud',
    devops: 'DevOps',
    languages: 'Languages',
    tools: 'Dev Tools'
  };

  Object.entries(SKILLS_TAXONOMY).forEach(([key, skillsInTaxonomy]) => {
    let matchedInCat = 0;
    let totalInCat = 0;

    skillsInTaxonomy.forEach((skill) => {
      const nameLower = skill.name.toLowerCase();
      const isMatched = matchedSet.has(nameLower);
      const isMissing = missingSet.has(nameLower);

      if (isMatched || isMissing) {
        totalInCat++;
        if (isMatched) matchedInCat++;
      }
    });

    if (totalInCat > 0) {
      skillDistributions.push({
        name: categoryTitles[key] || key,
        percent: Math.round((matchedInCat / totalInCat) * 100)
      });
    }
  });

  return (
    <div className="dashboard-wrapper container animate-fade-in" id="results-dashboard">
      
      {/* Floating Header Statistics */}
      <div className="floating-statistics-container" data-aos="fade-down">
        <div className="float-stat-pill">
          <span className="pill-dot bg-success"></span>
          <span className="pill-label">Words Count:</span>
          <strong className="pill-value">{analytics?.wordCount || 0}</strong>
        </div>
        <div className="float-stat-pill">
          <span className="pill-dot bg-primary"></span>
          <span className="pill-label">Keywords Found:</span>
          <strong className="pill-value">{matchingKeywords.length}</strong>
        </div>
        <div className="float-stat-pill">
          <span className="pill-dot bg-warning"></span>
          <span className="pill-label">Missing Skills:</span>
          <strong className="pill-value">{missingSkills.length}</strong>
        </div>
        <div className="float-stat-pill">
          <span className="pill-dot bg-danger"></span>
          <span className="pill-label">Suggestions:</span>
          <strong className="pill-value">{suggestions.length}</strong>
        </div>
      </div>

      {/* Dashboard Top Header */}
      <div className="dashboard-header" data-aos="fade-down">
        <div className="dashboard-header-left">
          <button 
            onClick={onReset} 
            className="btn-back-link"
            aria-label="Go back to the resume scanner input form"
          >
            <ArrowLeft size={16} />
            <span>Scan Another Resume</span>
          </button>
          <h1 className="dashboard-title gradient-text">Analysis Dashboard</h1>
          <p className="dashboard-subtitle">Review keywords overlap, missing skills, and interview questions below.</p>
        </div>
        
        <div className="dashboard-header-right" style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          {onSaveReport && (
            <SaveReportButton onSave={onSaveReport} fileName={fileName} score={score} />
          )}
          <button 
            onClick={onReset} 
            className="button button-secondary hover-scale"
            aria-label="Reset forms and clear current resume scan"
          >
            <RefreshCw size={14} className="button-icon" />
            Reset Scan
          </button>
        </div>
      </div>

      {/* Main Results Grid */}
      <div className="dashboard-grid">
        
        {/* Left Column - Score Cards, Breakdown & Checklist */}
        <div className="dashboard-left-col">
          
          {/* Circular Score and rating summary */}
          <div className="metrics-cards-row">
            <ScoreCard score={score} />
            <StrengthCard score={score} strength={strength} />
          </div>

          {/* Dynamic Score Breakdown Card */}
          <div className="score-breakdown-card card hover-lift" data-aos="fade-up">
            <div className="card-header-simple">
              <Award className="text-primary" size={20} />
              <h2>Score Breakdown</h2>
            </div>
            <div className="breakdown-list">
              <div className="breakdown-item">
                <div className="breakdown-label-row">
                  <span>Keyword Match Overlap</span>
                  <strong>{keywordMatchPercent}%</strong>
                </div>
                <div className="breakdown-progress-track">
                  <div className="breakdown-progress-fill" style={{ width: `${keywordMatchPercent}%` }}></div>
                </div>
              </div>
              
              <div className="breakdown-item">
                <div className="breakdown-label-row">
                  <span>Technical Skills Coverage</span>
                  <strong>{technicalSkillsPercent}%</strong>
                </div>
                <div className="breakdown-progress-track">
                  <div className="breakdown-progress-fill bg-success-bar" style={{ width: `${technicalSkillsPercent}%` }}></div>
                </div>
              </div>

              <div className="breakdown-item">
                <div className="breakdown-label-row">
                  <span>Experience &amp; Projects Quality</span>
                  <strong>{experienceQualityPercent}%</strong>
                </div>
                <div className="breakdown-progress-track">
                  <div className="breakdown-progress-fill bg-info-bar" style={{ width: `${experienceQualityPercent}%` }}></div>
                </div>
              </div>

              <div className="breakdown-item">
                <div className="breakdown-label-row">
                  <span>Formatting &amp; Landmark Completeness</span>
                  <strong>{formattingPercent}%</strong>
                </div>
                <div className="breakdown-progress-track">
                  <div className="breakdown-progress-fill bg-warning-bar" style={{ width: `${formattingPercent}%` }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Dynamic Skill Distribution Card */}
          {skillDistributions.length > 0 && (
            <div className="skill-distribution-card card hover-lift" data-aos="fade-up">
              <div className="card-header-simple">
                <Code2 className="text-primary" size={20} />
                <h2>Category Distribution</h2>
              </div>
              <div className="breakdown-list">
                {skillDistributions.map((dist, idx) => (
                  <div key={`dist-${idx}`} className="breakdown-item">
                    <div className="breakdown-label-row">
                      <span>{dist.name}</span>
                      <strong>{dist.percent}% Match</strong>
                    </div>
                    <div className="breakdown-progress-track">
                      <div className="breakdown-progress-fill" style={{ width: `${dist.percent}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Report copy / PDF printing actions */}
          <ReportActions
            score={score}
            strength={strength}
            matchingSkills={matchingSkills}
            missingSkills={missingSkills}
            matchingKeywords={matchingKeywords}
            missingKeywords={missingKeywords}
            suggestions={suggestions}
            questions={questions}
            analytics={analytics}
            addToast={addToast}
          />

          <Checklist checklist={analytics?.checklist} />
          <Analytics analyticsData={analytics} />
        </div>

        {/* Right Column - Keywords, Suggestions, Interview Prep */}
        <div className="dashboard-right-col">
          
          {/* Analysis Timeline confirmation */}
          <div className="analysis-timeline-card card hover-lift animate-slide-up" data-aos="fade-up">
            <div className="card-header-simple">
              <ShieldCheck className="text-success" size={20} />
              <h2>Analysis Timeline</h2>
            </div>
            <div className="timeline-horizontal-grid">
              <div className="timeline-horizontal-node">
                <CheckCircle2 size={14} className="text-success" />
                <span>Resume Uploaded ✓</span>
              </div>
              <div className="timeline-horizontal-node">
                <CheckCircle2 size={14} className="text-success" />
                <span>Text Extracted ✓</span>
              </div>
              <div className="timeline-horizontal-node">
                <CheckCircle2 size={14} className="text-success" />
                <span>Keywords Processed ✓</span>
              </div>
              <div className="timeline-horizontal-node">
                <CheckCircle2 size={14} className="text-success" />
                <span>ATS Calculated ✓</span>
              </div>
              <div className="timeline-horizontal-node">
                <CheckCircle2 size={14} className="text-success" />
                <span>Suggestions Generated ✓</span>
              </div>
              <div className="timeline-horizontal-node">
                <CheckCircle2 size={14} className="text-success" />
                <span>Interview Questions Ready ✓</span>
              </div>
            </div>
          </div>

          <KeywordList 
            matchingKeywords={matchingKeywords} 
            missingKeywords={missingKeywords} 
          />

          <SkillCategories 
            matchingSkills={matchingSkills} 
            missingSkills={missingSkills} 
          />

          <Suggestions suggestions={suggestions} />

          <InterviewQuestions questions={questions} addToast={addToast} />
        </div>

      </div>
    </div>
  );
}
