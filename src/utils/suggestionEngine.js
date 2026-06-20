/**
 * Maps missing skills to specific actionable suggestions
 */
const SKILL_SUGGESTION_MAP = {
  'Docker': 'Add Docker projects. Describe how you containerized applications, created Dockerfiles, and managed multi-container environments using Docker Compose.',
  'AWS': 'Mention cloud technologies. Highlight any experience with AWS services like EC2, S3, Lambda, or list cloud deployment projects.',
  'Google Cloud': 'Highlight Google Cloud Platform (GCP) experience, such as hosting, Cloud Functions, or Cloud Storage deployments.',
  'Azure': 'Showcase Microsoft Azure cloud infrastructure skills, including App Services, Azure VMs, or active directory configs.',
  'Git': 'Explicitly mention Git for version control. Highlight experience with branching, merging, pull requests, and git-based workflows.',
  'GitHub': 'Link your active GitHub profile. Describe working with GitHub Actions, issues, and team repository collaboration.',
  'REST API': 'Mention REST API design and development experience. Detail your knowledge of endpoints, HTTP methods, status codes, and security like JWT.',
  'CI/CD': 'Describe your deployment pipelines or CI/CD experience. Mention setting up automated test and build workflows using GitHub Actions, GitLab CI, or Jenkins.',
  'MongoDB': 'Include database projects featuring MongoDB. Highlight schema design, indexing, or aggregation pipelines for NoSQL databases.',
  'PostgreSQL': 'Specify relational database experience. Detail complex queries, schema designs, or migrations using PostgreSQL.',
  'MySQL': 'Detail relational database projects using MySQL, database performance optimization, or SQL writing.',
  'Redis': 'Mention caching strategies and Redis experience. Detail how you implemented caching to optimize API response times or managed sessions.',
  'React': 'Detail React.js frontend work. Highlight state management (Redux, Context API), reusable components, hooks, or performance optimization.',
  'Node.js': 'Demonstrate backend development capabilities. Describe building scalable backend systems, APIs, or server architectures using Node.js.',
  'Express.js': 'Mention RESTful server routing and middleware design using Express.js for backend services.',
  'TypeScript': 'Showcase TypeScript experience. Emphasize type safety, designing interfaces/types, and migrating JavaScript codebases.',
  'Next.js': 'Showcase Next.js application development. Mention Server-Side Rendering (SSR), Static Site Generation (SSG), or App Router structures.',
  'Kubernetes': 'Detail container orchestration skills using Kubernetes. Explain pod setups, deployments, and cluster management.',
  'Python': 'Highlight Python coding projects. List python libraries, script automations, backend services, or data science applications.',
  'Java': 'Emphasize Java engineering skills. Detail object-oriented programming (OOP), enterprise applications, or Java frameworks.',
  'Spring Boot': 'Highlight backend framework expertise. Detail microservice architectures, dependency injection, and REST API development with Spring Boot.',
  'Agile': 'Incorporate references to Agile or Scrum practices. Show familiarity with sprint planning, daily standups, and cooperative software cycles.',
  'Jira': 'Mention project tracking and ticket management tools like Jira to illustrate standard team workflows.',
  'Figma': 'State experience working with design files in Figma, translating design mockups into pixel-perfect frontend layouts.',
  'Tailwind CSS': 'Showcase utility-first styling skills. Mention design-system integration or UI building using Tailwind CSS.',
  'GraphQL': 'Detail GraphQL API development. Describe creating schemas, queries, mutations, or setting up Apollo clients.'
};

/**
 * Generates custom, actionable recommendations based on missing skills and keyword analysis.
 * @param {string[]} missingSkills - List of missing skills detected
 * @param {number} score - The current ATS score
 * @returns {string[]} List of actionable suggestions
 */
export const generateSuggestions = (missingSkills, score) => {
  const suggestions = [];

  // 1. Generate skill-specific suggestions
  missingSkills.forEach((skill) => {
    if (SKILL_SUGGESTION_MAP[skill]) {
      suggestions.push({
        type: 'missing_skill',
        title: `Add ${skill}`,
        description: SKILL_SUGGESTION_MAP[skill]
      });
    } else {
      suggestions.push({
        type: 'missing_skill',
        title: `Add ${skill}`,
        description: `Ensure you document projects or professional work using ${skill} to satisfy the job requirements.`
      });
    }
  });

  // 2. Add generic ATS quality suggestions if the score is low
  if (score < 40) {
    suggestions.push({
      type: 'structural',
      title: 'Keywords Tailoring',
      description: 'Your resume has very low match overlap. Review the job description and inject key phrases and terms directly into your experience and projects sections.'
    });
  }

  if (score < 70) {
    suggestions.push({
      type: 'content',
      title: 'Quantify Achievements',
      description: 'Strengthen your impact by adding metrics. Instead of "Developed backend API", write "Developed backend API in Node.js, improving load latency by 25% for 10k users".'
    });
    suggestions.push({
      type: 'formatting',
      title: 'Action Verbs',
      description: 'Verify that every bullet point in your Experience and Projects starts with a strong action verb (e.g., "Spearheaded", "Optimized", "Architected", "Refactored").'
    });
  }

  // 3. Always add a reminder about keeping formatting simple for parser compatibility
  suggestions.push({
    type: 'compatibility',
    title: 'ATS Formatting Cleanliness',
    description: 'Ensure your resume uses a single-column layout, standard fonts (like Inter or Arial), and has zero graphic elements, tables, or text boxes that can confuse ATS parsers.'
  });

  return suggestions;
};
