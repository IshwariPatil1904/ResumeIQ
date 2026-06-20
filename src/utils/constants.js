// Skills Taxonomy for Keyword Extraction
export const SKILLS_TAXONOMY = {
  frontend: [
    { name: 'React', synonyms: ['react', 'react.js', 'reactjs'] },
    { name: 'Angular', synonyms: ['angular', 'angularjs', 'angular.js'] },
    { name: 'Vue.js', synonyms: ['vue', 'vue.js', 'vuejs'] },
    { name: 'Next.js', synonyms: ['next.js', 'nextjs'] },
    { name: 'Svelte', synonyms: ['svelte', 'sveltejs'] },
    { name: 'Redux', synonyms: ['redux', 'redux-toolkit'] },
    { name: 'Tailwind CSS', synonyms: ['tailwind', 'tailwindcss'] },
    { name: 'Bootstrap', synonyms: ['bootstrap'] },
    { name: 'HTML5', synonyms: ['html', 'html5'] },
    { name: 'CSS3', synonyms: ['css', 'css3'] },
    { name: 'Sass', synonyms: ['sass', 'scss'] },
    { name: 'Vite', synonyms: ['vite', 'vitejs'] },
    { name: 'Webpack', synonyms: ['webpack'] },
    { name: 'TypeScript', synonyms: ['typescript', 'ts'] },
    { name: 'JavaScript', synonyms: ['javascript', 'js', 'es6'] }
  ],
  backend: [
    { name: 'Node.js', synonyms: ['node', 'node.js', 'nodejs'] },
    { name: 'Express.js', synonyms: ['express', 'express.js', 'expressjs'] },
    { name: 'NestJS', synonyms: ['nestjs', 'nest.js'] },
    { name: 'Django', synonyms: ['django'] },
    { name: 'Flask', synonyms: ['flask'] },
    { name: 'FastAPI', synonyms: ['fastapi'] },
    { name: 'Spring Boot', synonyms: ['spring boot', 'springboot', 'spring'] },
    { name: 'ASP.NET', synonyms: ['asp.net', '.net', 'dotnet', 'c#'] },
    { name: 'Ruby on Rails', synonyms: ['rails', 'ruby on rails', 'ror'] },
    { name: 'GraphQL', synonyms: ['graphql', 'apollo'] },
    { name: 'REST API', synonyms: ['rest api', 'restful api', 'restful apis', 'rest apis'] },
    { name: 'Microservices', synonyms: ['microservice', 'microservices'] },
    { name: 'WebSockets', synonyms: ['websocket', 'websockets', 'socket.io'] }
  ],
  database: [
    { name: 'MongoDB', synonyms: ['mongodb', 'mongo'] },
    { name: 'PostgreSQL', synonyms: ['postgresql', 'postgres'] },
    { name: 'MySQL', synonyms: ['mysql'] },
    { name: 'SQLite', synonyms: ['sqlite'] },
    { name: 'Redis', synonyms: ['redis'] },
    { name: 'SQL', synonyms: ['sql'] },
    { name: 'NoSQL', synonyms: ['nosql'] },
    { name: 'DynamoDB', synonyms: ['dynamodb'] },
    { name: 'Cassandra', synonyms: ['cassandra'] },
    { name: 'Firebase', synonyms: ['firebase', 'firestore'] }
  ],
  cloud: [
    { name: 'AWS', synonyms: ['aws', 'amazon web services', 's3', 'ec2', 'lambda', 'rds', 'iam'] },
    { name: 'Azure', synonyms: ['azure', 'microsoft azure'] },
    { name: 'Google Cloud', synonyms: ['gcp', 'google cloud', 'google cloud platform'] },
    { name: 'Vercel', synonyms: ['vercel'] },
    { name: 'Netlify', synonyms: ['netlify'] },
    { name: 'Heroku', synonyms: ['heroku'] }
  ],
  devops: [
    { name: 'Docker', synonyms: ['docker'] },
    { name: 'Kubernetes', synonyms: ['kubernetes', 'k8s'] },
    { name: 'CI/CD', synonyms: ['ci/cd', 'cicd', 'continuous integration', 'continuous deployment'] },
    { name: 'Jenkins', synonyms: ['jenkins'] },
    { name: 'GitHub Actions', synonyms: ['github actions', 'github workflows'] },
    { name: 'GitLab CI', synonyms: ['gitlab ci'] },
    { name: 'Terraform', synonyms: ['terraform'] }
  ],
  languages: [
    { name: 'Python', synonyms: ['python', 'py'] },
    { name: 'Java', synonyms: ['java'] },
    { name: 'C++', synonyms: ['c++', 'cpp'] },
    { name: 'C#', synonyms: ['c#', 'csharp'] },
    { name: 'Ruby', synonyms: ['ruby'] },
    { name: 'Go', synonyms: ['go', 'golang'] },
    { name: 'Rust', synonyms: ['rust'] },
    { name: 'PHP', synonyms: ['php'] },
    { name: 'Swift', synonyms: ['swift'] },
    { name: 'Kotlin', synonyms: ['kotlin'] }
  ],
  tools: [
    { name: 'Git', synonyms: ['git'] },
    { name: 'GitHub', synonyms: ['github'] },
    { name: 'GitLab', synonyms: ['gitlab'] },
    { name: 'Postman', synonyms: ['postman'] },
    { name: 'Jira', synonyms: ['jira'] },
    { name: 'Figma', synonyms: ['figma'] },
    { name: 'Agile', synonyms: ['agile', 'scrum'] }
  ]
};

// Flattened list of all skills for quick lookups
export const ALL_SKILLS = Object.values(SKILLS_TAXONOMY).flat();

// Standard English stop words
export const STOP_WORDS = new Set([
  'the', 'a', 'an', 'is', 'are', 'was', 'were', 'of', 'to', 'for', 'with', 'on', 'in', 'at', 'and', 'or', 'from',
  'into', 'that', 'this', 'it', 'its', 'they', 'them', 'their', 'we', 'our', 'us', 'you', 'your', 'he', 'she',
  'him', 'her', 'i', 'my', 'me', 'by', 'as', 'be', 'about', 'against', 'between', 'during', 'before', 'after',
  'above', 'below', 'through', 'under', 'again', 'further', 'then', 'once', 'here', 'there', 'when', 'where',
  'why', 'how', 'all', 'any', 'both', 'each', 'few', 'more', 'most', 'other', 'some', 'such', 'no', 'nor',
  'not', 'only', 'own', 'same', 'so', 'than', 'too', 'very', 'can', 'will', 'just', 'should', 'now', 'but',
  'has', 'have', 'had', 'having', 'do', 'does', 'did', 'doing', 'should', 'would', 'could', 'who', 'which',
  'whom', 'whose', 'this', 'these', 'those', 'am', 'been', 'being', 'here', 'there', 'all', 'any', 'both'
]);

// Action Verbs for Resume Strength Audit
export const ACTION_VERBS = new Set([
  'led', 'developed', 'optimized', 'designed', 'created', 'implemented', 'managed', 'built',
  'collaborated', 'engineered', 'spearheaded', 'automated', 'integrated', 'architected',
  'refactored', 'formulated', 'directed', 'coordinated', 'pioneered', 'streamlined', 'established',
  'accelerated', 'improved', 'increased', 'reduced', 'maximized', 'minimized', 'launched',
  'customized', 'resolved', 'analyzed', 'facilitated', 'executed', 'mentored', 'strengthened'
]);

// Mock Demo Data
export const DEMO_RESUME = `ISHWARI AJAYKUMAR PATIL
ishwari.patil24@vit.edu | +91 9876543210 | Pune, India
github.com/ishwari-patil | linkedin.com/in/ishwari-patil

PROFESSIONAL SUMMARY
Highly motivated Software Engineering student with experience building full-stack web applications. Skilled in React, JavaScript, Node.js, and database design. Passionate about software development, clean code practices, and modern SaaS design.

EDUCATION
Vishwakarma Institute of Technology, Pune
Bachelor of Technology in Computer Engineering (GPA: 9.2) | 2022 - 2026

EXPERIENCE
Frontend Developer Intern | Digital Heroes Co.
Jan 2026 - Present
- Developed responsive, high-performance UI components using React, CSS, and Vite.
- Optimized landing page loading speed by 35% through lazy loading and asset compression.
- Collaborated with design and product teams to integrate REST APIs and state management.

PROJECTS
E-Commerce SaaS Dashboard | React, Node.js, MongoDB, Express
- Designed and developed a full-stack dashboard with real-time sales charts and order tables.
- Implemented secure JWT authentication and RESTful API endpoints for inventory management.
- Used Redis for caching, reducing database query latencies by 40%.

Developer Portfolio | HTML, CSS, JavaScript, Git
- Built a personal portfolio displaying projects and skills using responsive web design.
- Set up continuous integration and deployment pipeline (CI/CD) using GitHub Actions.

SKILLS
Programming Languages: JavaScript, TypeScript, Python, SQL, HTML, CSS
Frontend: React, Redux, Next.js, Tailwind, Vite
Backend & Database: Node.js, Express, MongoDB, PostgreSQL, Redis
Tools & DevOps: Git, GitHub, Docker, CI/CD, Postman, Vercel

CERTIFICATIONS & ACHIEVEMENTS
- AWS Certified Cloud Practitioner
- Winner of VIT Smart Hackathon 2025`;

export const DEMO_JOB_DESCRIPTION = `Position: Full Stack Engineer
Company: InnovateTech Solutions

About the Role:
We are looking for a talented Full Stack Developer to build out the next generation of our SaaS product. You will work on creating modern user interfaces and building robust, scalable APIs.

Required Skills:
- Strong proficiency in JavaScript, TypeScript, and modern React (Hooks, Context, Redux).
- Experience building scalable backend services using Node.js and Express.
- Solid understanding of SQL and NoSQL databases like PostgreSQL and MongoDB.
- Familiarity with cloud technologies, especially AWS (EC2, S3) and containerization with Docker.
- Experience setting up CI/CD pipelines (GitHub Actions, GitLab CI).
- Version control with Git and GitHub.
- Excellent understanding of REST API design and API security.

Nice to Have:
- Experience with Next.js and Tailwind CSS.
- Knowledge of Redis or caching strategies.
- Familiarity with Agile / Scrum methodologies.`;
