import { extractSkills, extractKeywords } from './keywordExtractor';

/**
 * Calculates the ATS Match Score and identifies matching and missing terms.
 * @param {string} resumeText - Raw text extracted from the resume
 * @param {string} jobDescriptionText - Raw text from the job description
 * @returns {Object} Object containing score, strength, matching, and missing keywords/skills
 */
export const analyzeATS = (resumeText, jobDescriptionText) => {
  // If either text is empty, return a default empty report state
  if (!resumeText.trim() || !jobDescriptionText.trim()) {
    return {
      score: 0,
      strength: 'Needs Improvement',
      matchingSkills: [],
      missingSkills: [],
      matchingKeywords: [],
      missingKeywords: [],
      totalJobKeywords: 0
    };
  }

  // 1. Extract Skills (Canonical names like "React", "Node.js")
  const resumeSkills = extractSkills(resumeText);
  const jobSkills = extractSkills(jobDescriptionText);

  // 2. Extract General Keywords (Filtered tokenized words)
  const resumeKeywords = extractKeywords(resumeText);
  const jobKeywords = extractKeywords(jobDescriptionText);

  // 3. Compute Skills Matching
  const matchingSkills = jobSkills.filter(skill => 
    resumeSkills.some(resSkill => resSkill.toLowerCase() === skill.toLowerCase())
  );
  const missingSkills = jobSkills.filter(skill => 
    !resumeSkills.some(resSkill => resSkill.toLowerCase() === skill.toLowerCase())
  );

  // 4. Compute Keywords Matching (case-insensitive)
  const resumeKeywordsLower = resumeKeywords.map(k => k.toLowerCase());
  const matchingKeywords = jobKeywords.filter(kw => 
    resumeKeywordsLower.includes(kw.toLowerCase())
  );
  const missingKeywords = jobKeywords.filter(kw => 
    !resumeKeywordsLower.includes(kw.toLowerCase())
  );

  // 5. Combine for Overall Score
  // To avoid duplicate score count for things that are both skills and keywords,
  // we unify them into single collections of lowercase terms for scoring.
  const unifiedJobTerms = Array.from(new Set([
    ...jobSkills.map(s => s.toLowerCase()),
    ...jobKeywords.map(k => k.toLowerCase())
  ]));

  const unifiedResumeTerms = Array.from(new Set([
    ...resumeSkills.map(s => s.toLowerCase()),
    ...resumeKeywords.map(k => k.toLowerCase())
  ]));

  const unifiedMatchingTerms = unifiedJobTerms.filter(term => 
    unifiedResumeTerms.includes(term)
  );

  // Formula: Matching / Total * 100
  const totalJobTermsCount = unifiedJobTerms.length;
  let score = 0;
  if (totalJobTermsCount > 0) {
    score = Math.round((unifiedMatchingTerms.length / totalJobTermsCount) * 100);
  }

  // Double check bounds
  score = Math.max(0, Math.min(100, score));

  // Determine Resume Strength Category
  let strength = 'Needs Improvement';
  if (score >= 81) {
    strength = 'Excellent';
  } else if (score >= 61) {
    strength = 'Good';
  } else if (score >= 31) {
    strength = 'Average';
  }

  return {
    score,
    strength,
    matchingSkills,
    missingSkills,
    matchingKeywords,
    missingKeywords,
    totalJobKeywords: totalJobTermsCount
  };
};
