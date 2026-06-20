import { ACTION_VERBS } from './constants';

/**
 * Parses resume text to perform structural analytics and build an ATS checklist.
 * @param {string} text - Raw text from the resume
 * @param {string[]} skillsFound - List of skills matched
 * @returns {Object} Analytical report and checklist status
 */
export const analyzeResume = (text, skillsFound = []) => {
  if (!text || !text.trim()) {
    return {
      wordCount: 0,
      charCount: 0,
      skillsCount: 0,
      projectsDetected: 0,
      educationFound: false,
      experienceFound: false,
      actionVerbsFound: [],
      linksFound: [],
      checklist: {
        contactInfo: false,
        skillsSection: false,
        educationSection: false,
        projectsSection: false,
        experienceSection: false,
        githubLink: false,
        linkedinLink: false,
        achievements: false,
        certifications: false
      }
    };
  }

  const lowercaseText = text.toLowerCase();
  
  // 1. Basic Metrics
  const words = text.split(/\s+/).filter(Boolean);
  const wordCount = words.length;
  const charCount = text.length;

  // 2. Link Detection (Email, URLs)
  const emailRegex = /[\w.-]+@[\w.-]+\.[a-zA-Z]{2,}/g;
  // Basic URL regex that matches web domains
  const urlRegex = /(?:https?:\/\/)?(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;
  
  const emails = text.match(emailRegex) || [];
  const urls = text.match(urlRegex) || [];
  // Filter out common false positives and clean URLs
  const cleanUrls = Array.from(new Set([
    ...emails.map(e => e.trim()),
    ...urls
      .map(u => u.trim())
      .filter(u => {
        const lower = u.toLowerCase();
        // Ignore files, emails, or short domain-like parts
        return !lower.includes('@') && 
               lower.includes('.') && 
               !lower.endsWith('.js') && 
               !lower.endsWith('.css') && 
               !lower.endsWith('.png') && 
               !lower.endsWith('.jpg') &&
               lower.length > 4;
      })
  ]));

  // 3. Section Scanning
  const hasEducation = /education|academic|university|college|degree/i.test(lowercaseText);
  const hasExperience = /experience|employment|work history|professional history|internship/i.test(lowercaseText);
  const hasProjects = /projects|personal projects|key projects|academic projects/i.test(lowercaseText);
  const hasCertifications = /certifications|certificates|licenses|credentials|courses/i.test(lowercaseText);
  const hasAchievements = /achievements|awards|honors|won|winner/i.test(lowercaseText);
  const hasSkillsSec = /skills|technical skills|expertise|areas of expertise/i.test(lowercaseText) || skillsFound.length > 0;

  // 4. Project Count Heuristics
  // Count headings or lines that look like project bullet outlines in a projects section
  let projectsCount = 0;
  const lines = text.split('\n');
  let inProjectsSection = false;

  lines.forEach((line) => {
    const trimmed = line.trim();
    if (/projects|personal projects|key projects|academic projects/i.test(trimmed)) {
      inProjectsSection = true;
      return;
    }
    // If we hit another main header after entering projects, exit projects section
    if (inProjectsSection && trimmed.length > 0 && trimmed.length < 35 && /^[A-Z\s]{4,20}$/.test(trimmed) && !/projects/i.test(trimmed)) {
      inProjectsSection = false;
    }
    
    // Count project entries. E.g. "Project Name | React" or "Project Name - Technology" or bullet outlines
    if (inProjectsSection) {
      if (/^[•\-\*]\s*[A-Z]/.test(trimmed) && (trimmed.includes('|') || trimmed.includes('-') || trimmed.includes(':'))) {
        projectsCount++;
      } else if (/^[A-Z][\w\s&]{3,25}\s*\|\s*[A-Z]/.test(trimmed)) {
        projectsCount++;
      }
    }
  });

  // Fallback project scanner (counting occurrences of key phrases)
  if (projectsCount === 0 && hasProjects) {
    const matches = text.match(/project [1-9]|e-commerce|portfolio|dashboard|application|system/gi) || [];
    projectsCount = Math.max(1, Math.min(5, Math.floor(matches.length / 2)));
  }

  // 5. Action Verb Scanning
  const actionVerbsFound = Array.from(new Set(
    words
      .map(w => w.toLowerCase().replace(/[^a-z]/g, ''))
      .filter(w => ACTION_VERBS.has(w))
  ));

  // 6. Contact Details Validation
  const phoneRegex = /(?:\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}|\+?\d{10,12}/g;
  const hasPhone = phoneRegex.test(text);
  const hasEmail = emails.length > 0;
  const hasContactInfo = hasPhone || hasEmail;

  // 7. GitHub and LinkedIn Detection
  const hasGithub = /github\.com/i.test(lowercaseText);
  const hasLinkedin = /linkedin\.com/i.test(lowercaseText);

  // Compile Checklist
  const checklist = {
    contactInfo: hasContactInfo,
    skillsSection: hasSkillsSec,
    educationSection: hasEducation,
    projectsSection: hasProjects,
    experienceSection: hasExperience,
    githubLink: hasGithub,
    linkedinLink: hasLinkedin,
    achievements: hasAchievements,
    certifications: hasCertifications
  };

  return {
    wordCount,
    charCount,
    skillsCount: skillsFound.length,
    projectsDetected: Math.max(projectsCount, hasProjects ? 1 : 0),
    educationFound: hasEducation,
    experienceFound: hasExperience,
    actionVerbsFound: actionVerbsFound.slice(0, 15), // Show top 15 action verbs
    linksFound: cleanUrls.slice(0, 5), // Show top 5 links
    checklist
  };
};
