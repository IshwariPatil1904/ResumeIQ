const QUESTIONS_DATABASE = {
  'React': [
    {
      question: 'Explain the concept of the Virtual DOM and how React handles state updates under the hood.',
      answer: 'React maintains a lightweight representation of the real DOM in memory, called the Virtual DOM. When state changes, a new Virtual DOM tree is created. React compares it with the previous tree using a diffing algorithm (Reconciliation) to calculate the minimal set of changes. It then batches these updates and applies only the changes to the real DOM, avoiding expensive layout repaints.'
    },
    {
      question: 'What are React Hooks, and what are the two main rules that must be followed when using them?',
      answer: 'Hooks are functions that let you use state and other React features in functional components. The two core rules are: 1) Only call Hooks at the top level — do not call them inside loops, conditions, or nested functions, ensuring they execute in the same order on every render. 2) Only call Hooks from React function components or custom Hooks.'
    },
    {
      question: 'What is the difference between useEffect and useState in React?',
      answer: 'useState is a hook that declares a state variable and a setter function, allowing the component to store and update reactive data. useEffect is a hook that lets you synchronize a component with an external system (side effects like data fetching, subscriptions, DOM manipulation), running after layout rendering according to its dependency array.'
    },
    {
      question: 'How do you optimize rendering performance in a React application?',
      answer: 'Optimization techniques include: 1) React.memo to prevent unnecessary re-renders of child components when props do not change. 2) useMemo and useCallback to memoize expensive computations and callback references respectively. 3) Virtualizing long lists (using libraries like react-window). 4) Lazy loading and code-splitting components with React.lazy and Suspense.'
    }
  ],
  'Node.js': [
    {
      question: 'How does Node.js handle concurrency if it is single-threaded?',
      answer: 'Node.js is single-threaded for executing JavaScript, but it delegates I/O operations (file reading, network queries, database lookups) to the operating system kernel or the internal thread pool via the libuv C++ library. Once these asynchronous tasks finish, they trigger callbacks that are put into event queues and executed sequentially on the single main thread via the Event Loop.'
    },
    {
      question: 'What is the difference between synchronous and asynchronous code in Node.js?',
      answer: 'Synchronous operations block execution, meaning the main thread halts and waits for the operation (like fs.readFileSync) to complete before running subsequent code. Asynchronous operations (like fs.readFile) are non-blocking; the callback is registered, execution immediately continues, and the main thread processes other tasks while the background operation runs.'
    }
  ],
  'Express.js': [
    {
      question: 'Explain the role of middleware in Express.js and the significance of the next() function.',
      answer: 'Middleware functions are layers in the Express request-response cycle that have access to the request object (req), response object (res), and the next middleware function in line. They can execute code, modify request/response data, or terminate the cycle. If they do not end the response, they must call next() to pass control to the next middleware; otherwise, the request hangs.'
    }
  ],
  'REST API': [
    {
      question: 'What are the key HTTP methods used in REST APIs and their typical usage/idempotency?',
      answer: '1) GET: Retrieve resources (idempotent, safe). 2) POST: Create new resources (non-idempotent). 3) PUT: Replace/update an existing resource entirely (idempotent). 4) PATCH: Partially modify a resource (non-idempotent). 5) DELETE: Remove resources (idempotent).'
    },
    {
      question: 'What are standard REST API design best practices?',
      answer: 'Best practices include: 1) Using nouns rather than verbs in resource paths (e.g. /users instead of /getUsers). 2) Utilizing plural resource names. 3) Leveraging appropriate HTTP status codes (200 OK, 201 Created, 400 Bad Request, 401 Unauthorized, 404 Not Found, 500 Error). 4) Supporting filtering, pagination, and sorting. 5) Versioning endpoints (e.g. /v1/products).'
    }
  ],
  'JavaScript': [
    {
      question: 'What is a closure in JavaScript, and what is a common real-world use case?',
      answer: 'A closure is the combination of a function bundled together with references to its surrounding state (the lexical environment). In other words, a closure gives an inner function access to the outer function\'s scope even after the outer function has returned. A common use case is data privacy — creating private state variables that can only be modified via public closure methods.'
    },
    {
      question: 'Explain the Event Loop in JavaScript and its execution priority between Microtasks and Macrotasks.',
      answer: 'The Event Loop coordinates code execution, callbacks, and events. When synchronous code finishes, the call stack empties. The loop then runs all pending Microtasks (Promise resolutions, process.nextTick) to completion. Only after the Microtask queue is entirely empty does it fetch and run a single Macrotask (setTimeout, setInterval, I/O events), repeating the cycle.'
    },
    {
      question: 'What is the difference between Promises and Async/Await in JavaScript?',
      answer: 'Promises represent a placeholder for the future result of an asynchronous operation, managed via chaining methods like .then(), .catch(), and .finally(). Async/Await is a syntax layer (syntactic sugar) built on top of Promises. Declaring a function as "async" makes it return a promise, and "await" pauses execution until a promise resolves, leading to asynchronous code that reads like synchronous code.'
    }
  ],
  'TypeScript': [
    {
      question: 'What is the difference between an "interface" and a "type" alias in TypeScript?',
      answer: 'Both are used to define shapes of objects. However, interfaces support "declaration merging" (defining the same interface multiple times appends fields) and are typically better for inheritance/extending. Type aliases can define primitives, unions, tuples, and intersections, making them more versatile for complex type combinations.'
    }
  ],
  'Docker': [
    {
      question: 'Explain the difference between a Docker image and a Docker container.',
      answer: 'A Docker image is a read-only, static template containing the operating system, code, runtimes, environment configurations, and library files needed to run an application. A Docker container is a live, stateful, running instance of a Docker image, sandboxed from other containers and the host OS.'
    },
    {
      question: 'What is the purpose of multi-stage builds in a Dockerfile?',
      answer: 'Multi-stage builds allow developers to use multiple FROM statements in a single Dockerfile. You can compile your application in an initial stage containing all build tools and dependencies, then copy only the compiled binaries/artifacts into a second, minimal stage (like alpine or scratch). This drastically reduces the size of the final production Docker image and enhances security.'
    }
  ],
  'AWS': [
    {
      question: 'What are Amazon S3 and EC2, and what are their typical use cases?',
      answer: 'Amazon S3 (Simple Storage Service) is a highly durable, scalable object storage service used for static assets (images, uploads, static hosting). Amazon EC2 (Elastic Compute Cloud) provides raw virtual servers (instances) in the cloud where developers can install any software, OS, database, and run web servers.'
    },
    {
      question: 'Compare AWS EC2 with AWS Lambda.',
      answer: 'AWS EC2 is Infrastructure-as-a-Service (IaaS) where you pay for virtual servers that run continuously. You must manage patches, OS, scaling, and network setups. AWS Lambda is Function-as-a-Service (FaaS / Serverless) where you upload code that runs only when triggered by events. It scales automatically, and you pay only for the exact milliseconds of execution time.'
    }
  ],
  'MongoDB': [
    {
      question: 'How does a NoSQL document database like MongoDB differ from a SQL database like PostgreSQL?',
      answer: 'MongoDB is non-relational and stores data as BSON documents with dynamic schemas, making it flexible, fast for reads, and easy to scale horizontally via sharding. PostgreSQL is a relational database that uses structured tables, strict schemas, foreign keys, and SQL, providing robust support for ACID transactions, complex joins, and data integrity constraints.'
    }
  ],
  'SQL': [
    {
      question: 'Explain database indexing and how it improves query performance.',
      answer: 'An index is a data structure (commonly a B-Tree) created on table columns to quickly locate rows without scanning the entire table (Sequential Scan). It speeds up SELECT and WHERE operations significantly, but adds overhead, slowing down INSERT, UPDATE, and DELETE operations since the index structure must be updated.'
    }
  ],
  'CI/CD': [
    {
      question: 'What is CI/CD and what are the benefits of automating deployment pipelines?',
      answer: 'CI (Continuous Integration) is the practice of merging code changes into a shared repository frequently, automatically triggering builds and testing. CD (Continuous Deployment/Delivery) automates releasing those verified changes to staging or production. Automated pipelines ensure immediate feedback on bugs, standard code style, and low-friction, reproducible releases.'
    }
  ],
  'Python': [
    {
      question: 'How is memory managed in Python, and what is the Global Interpreter Lock (GIL)?',
      answer: 'Python manages memory automatically using a private heap, allocation systems, reference counting, and a cyclic garbage collector. The GIL is a mutex that protects access to Python objects, preventing multiple native threads from executing Python bytecodes at once. This makes Python single-threaded for CPU-bound tasks, requiring multiprocessing to achieve parallel core utility.'
    }
  ],
  'Java': [
    {
      question: 'What is the Java Virtual Machine (JVM) and how does it achieve platform independence?',
      answer: 'The JVM is an execution engine that runs compiled Java bytecode. Platform independence is achieved because Java source code (.java) is compiled into a universal bytecode format (.class). This bytecode is interpreted or JIT-compiled into platform-specific machine code by the JVM configured for that host operating system ("Write once, run anywhere").'
    }
  ]
};

const GENERAL_QUESTIONS = [
  {
    question: 'How do you approach learning a new framework or technology for a project?',
    answer: 'I start by reading the official documentation to understand core architectural concepts, followed by building a small, focused proof-of-concept. I look at community best practices and style guides, and then seek to understand debugging/logging tools to troubleshoot issues quickly.'
  },
  {
    question: 'Describe how you troubleshoot a difficult bug or production performance issue.',
    answer: 'I follow a structured debugging process: 1) Reproduce the bug consistently. 2) Formulate a hypothesis and isolate the faulty component. 3) Examine logs, stack traces, and metrics. 4) Use breakpoints or debugger outputs. 5) Implement a fix, verify it through tests, and review performance/security implications before checking it in.'
  },
  {
    question: 'What are the main principles of clean code and software design that you follow?',
    answer: 'I adhere to: 1) DRY (Don\'t Repeat Yourself) to avoid redundant logic. 2) KISS (Keep It Simple, Stupid) for readability. 3) SOLID design principles to ensure modularity and extensibility. 4) Meaningful naming conventions, comprehensive commenting of complex algorithms, and maintaining a high level of unit test coverage.'
  },
  {
    question: 'Explain the difference between Git merge and Git rebase.',
    answer: 'Merge incorporates changes from the source branch into the target branch by creating a new merge commit, preserving the exact branch timelines. Rebase rewrites history by moving the base of the source branch onto the tip of the target branch, creating a cleaner, linear history without extra merge commits, but altering existing commit hashes.'
  }
];

/**
 * Generates tailored interview preparation questions based on detected skills.
 * @param {string[]} detectedSkills - Array of skills detected in the resume
 * @returns {Object[]} Array of { question, answer, category } questions
 */
export const generateInterviewQuestions = (detectedSkills) => {
  const result = [];
  const processedCategories = new Set();

  // 1. Gather questions for matching technologies
  detectedSkills.forEach((skill) => {
    // Check direct match
    if (QUESTIONS_DATABASE[skill]) {
      QUESTIONS_DATABASE[skill].forEach((item) => {
        result.push({
          ...item,
          category: skill
        });
      });
      processedCategories.add(skill);
    } else {
      // Check partial match (e.g. "PostgreSQL" might trigger "SQL")
      Object.keys(QUESTIONS_DATABASE).forEach((key) => {
        if (!processedCategories.has(key) && skill.toLowerCase().includes(key.toLowerCase())) {
          QUESTIONS_DATABASE[key].forEach((item) => {
            result.push({
              ...item,
              category: key
            });
          });
          processedCategories.add(key);
        }
      });
    }
  });

  // 2. If we have less than 4 questions total, backfill with general engineering questions
  if (result.length < 4) {
    GENERAL_QUESTIONS.forEach((q) => {
      result.push({
        ...q,
        category: 'General Engineering'
      });
    });
  }

  // Shuffle or slice to display a balanced subset
  // Limit to at most 10 questions to keep the list readable and impactful
  return result.slice(0, 10);
};
