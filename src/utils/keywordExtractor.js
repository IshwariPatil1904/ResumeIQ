import { ALL_SKILLS, STOP_WORDS } from './constants';

/**
 * Cleans text by converting to lowercase, replacing punctuation with spaces, and normalizing whitespace.
 * Preserves special characters common in technology names (like +, -, #, .).
 * @param {string} text - Raw input text
 * @returns {string} Cleaned text
 */
export const cleanText = (text) => {
  if (!text) return '';
  return text
    .toLowerCase()
    .replace(/[^\w\s\+\-\#\.]/g, ' ') // Keep alphanumeric, whitespace, +, -, #, .
    .replace(/\s+/g, ' ')
    .trim();
};

/**
 * Extracts recognized skills from our constants database based on synonyms.
 * Employs word boundaries and regex safety to avoid false positives.
 * @param {string} text - Raw resume or job description text
 * @returns {string[]} List of matched skill names (unique)
 */
export const extractSkills = (text) => {
  if (!text) return [];
  const cleanedText = cleanText(text);
  const matchedSkills = new Set();

  ALL_SKILLS.forEach((skill) => {
    const isMatched = skill.synonyms.some((synonym) => {
      // Escape special characters for regex safety
      const escaped = synonym.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
      
      // Build word boundaries. If synonym contains symbol like C++, word boundary \b won't work on the end.
      // So we use custom boundaries matching whitespace, punctuation or start/end of string.
      const pattern = `(?:^|\\s|[,;.:()\\/[])${escaped}(?:$|\\s|[,;.:()\\/]])`;
      const regex = new RegExp(pattern, 'i');
      return regex.test(cleanedText) || regex.test(text.toLowerCase());
    });

    if (isMatched) {
      matchedSkills.add(skill.name);
    }
  });

  return Array.from(matchedSkills);
};

/**
 * Tokenizes general words, filters out stop words, numbers, and very short terms.
 * @param {string} text - Raw input text
 * @returns {string[]} List of unique significant words
 */
export const extractKeywords = (text) => {
  if (!text) return [];
  const cleaned = cleanText(text);
  const words = cleaned.split(/\s+/);
  const keywords = new Set();

  words.forEach((word) => {
    // Remove trailing/leading punctuation that might have survived
    const cleanWord = word.replace(/^[.,;:()\-]+|[.,;:()\-]+$/g, '');
    
    if (
      cleanWord.length > 2 && 
      !STOP_WORDS.has(cleanWord) && 
      !/^\d+$/.test(cleanWord) && // Exclude pure numbers
      /[a-z+#-]/i.test(cleanWord) // Must contain at least one letter, +, # or -
    ) {
      keywords.add(cleanWord);
    }
  });

  return Array.from(keywords);
};
