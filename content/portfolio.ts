export type NavItem = {
  href: string;
  label: string;
};

export type Project = {
  title: string;
  date: string;
  link: string;
  stack: string[];
  summary: string;
  bullets: string[];
};

export type ExperienceItem = {
  title: string;
  organization: string;
  period: string;
  role: string;
  bullets: string[];
};

export type SkillGroup = {
  title: string;
  items: string[];
};

export const navItems: NavItem[] = [
  { href: '#top', label: 'Home' },
  { href: '#projects', label: 'Projects' },
  { href: '#experience', label: 'Experience' },
  { href: '#skills', label: 'Skills' },
  { href: '#education', label: 'Education' },
  { href: '#contact', label: 'Contact' },
];

export const profile = {
  name: 'Shaunak Lad',
  portfolioYear: '2026',
  heroPhrases: ['22 • Engineer', 'Always arriving'],
  subline: 'B.Tech CSE @ G H Patel College of Engineering & Technology',
  tagline:
    'Building production-focused AI systems with clear UX, low-latency inference, and measurable outcomes.',
  availability: 'Available for opportunities',
  location: 'Valsad, Gujarat, India',
  resumeUrl: '/Shaunak_ML_RESUME.pdf',
  github: 'https://github.com/MADSKULL21',
  linkedin: 'https://www.linkedin.com/in/shaunaklad21/',
  email: 'mailto:work.shaunaklad@gmail.com',
};

export const aboutPoints = [
  'I build engineering-first AI systems — from model development to production deployment.',
  'I work on NLP assistants, backend integrations, and AI-powered automation pipelines with a focus on performance, latency, and reliability. My approach is simple: quality and scalability are non-negotiable.',
  'I take full ownership of systems end-to-end — integrating backend logic with intuitive frontends to ship production-ready solutions, not prototypes.',
  'Outside of code, I believe in a disciplined rhythm: wake up, work, play, sleep. Consistency compounds. Long bike rides help me think clearly — some of my best architecture decisions were made mid-ride.',
  'I optimize systems. I ship results. I build to last.',
];

export const projects: Project[] = [
  {
    title: 'ProPlay Assistant Chatbot',
    date: 'Sep 2025',
    link: 'https://github.com/MADSKULL21/ProPlay-Assistant',
    stack: ['Python', 'Streamlit', 'Groq API', 'TensorFlow'],
    summary:
      'AI-driven sports chatbot delivering real-time insights on 20+ sports with optimized inference routing.',
    bullets: [
      'Integrated LLaMA-3.1-70B, Gemma-2-27B, and Mistral with robust fallback flow.',
      'Improved response accuracy by 35% while reducing GPU usage by 30%.',
    ],
  },
  {
    title: 'CHAT-WITH-PDFS-RAG',
    date: 'Jan 2026',
    link: 'https://github.com/MADSKULL21/CHAT-WITH-PDFS-RAG',
    stack: ['Python', 'Streamlit', 'LangChain', 'ChromaDB', 'Groq API'],
    summary:
      'Retrieval-Augmented Generation chatbot that lets users query multiple PDFs with context-aware answers.',
    bullets: [
      'Built RAG pipeline with local embeddings (`all-MiniLM-L6-v2`) and persistent Chroma vector storage.',
      'Integrated Llama-3.3-70b on Groq with chat history and source citations for grounded responses.',
    ],
  },
  {
    title: 'Costumer Churn Prediction',
    date: 'Nov 2025',
    link: 'https://github.com/MADSKULL21/CUSTOMER-CHURN-PREDICTION',
    stack: ['SQL', 'Python', 'Power BI', 'Machine Learning'],
    summary:
      'End-to-end analytics workflow combining warehouse queries, predictive modeling, and actionable BI dashboards.',
    bullets: [
      'Built churn prediction pipeline with feature engineering and model comparison.',
      'Translated model outputs into retention strategy insights for non-technical stakeholders.',
    ],
  },
  {
    title: 'JARVIS AI Agent',
    date: 'Jan 2025',
    link: 'https://github.com/MADSKULL21/JARVIS',
    stack: ['Python', 'Whisper', 'Selenium', 'TTS'],
    summary:
      'Multimodal assistant integrating speech input, task automation, and response generation.',
    bullets: [
      'Automated 10+ system tasks through voice commands and workflow scripts.',
      'Connected STT and TTS layers for smoother real-time interaction.',
    ],
  },
  {
    title: 'Stock Price Predictor',
    date: 'Mar 2025',
    link: 'https://github.com/MADSKULL21/TIME-SERIES-FORCASTING',
    stack: ['Python', 'Keras', 'Scikit-learn', 'Time Series'],
    summary:
      'Forecasting experiments using LSTM and Random Forest on multi-year market signals.',
    bullets: [
      'Compared model behavior across volatile windows and trend periods.',
      'Delivered interactive evaluation visualizations for metric tracking.',
    ],
  },
];

export const experiences: ExperienceItem[] = [
  {
    title: 'Software Developer Intern (AI/ML Projects)',
    organization: 'Tenup Software Services LLP',
    period: 'December 22, 2025 - April 22, 2026',
    role: 'Software Developer Intern',
    bullets: [
      'Working on AI/ML project development, model-backed features, and workflow automation.',
      'Contributing as a software developer while focusing on applied AI system delivery.',
    ],
  },
  {
    title: 'Summer Intern - Minutes of Meeting Recorder',
    organization: 'Atul Limited (Infotech Division)',
    period: 'Summer 2025',
    role: 'AI/NLP Intern',
    bullets: [
      'Built bilingual speech-to-text workflow with real-time transcription and export support.',
      'Achieved >90% transcription quality in controlled internal tests.',
    ],
  },
  {
    title: 'BCG Data Science Simulation',
    organization: 'Forage',
    period: 'January 2025',
    role: 'Data Science Trainee Project',
    bullets: [
      'Developed churn analysis flow with Python preprocessing and model training.',
      'Generated decision-focused dashboards to improve retention planning.',
    ],
  },
];

export const skillGroups: SkillGroup[] = [
  {
    title: 'Languages',
    items: ['Python', 'SQL', 'JavaScript', 'TypeScript', 'Java'],
  },
  {
    title: 'AI/ML Stack',
    items: ['TensorFlow', 'PyTorch', 'Keras', 'Scikit-learn', 'Transformers', 'LangChain', 'LangGraph'],
  },
  {
    title: 'Data + NLP',
    items: ['Pandas', 'NumPy', 'NLTK', 'SpaCy', 'TorchText', 'Matplotlib', 'Seaborn'],
  },
  {
    title: 'Frontend',
    items: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Redux Toolkit', 'TanStack Query', 'TanStack Table'],
  },
  {
    title: 'Backend + API',
    items: ['Spring Boot', 'Java', 'REST APIs', 'WebFlux', 'JPA/Hibernate', 'PostgreSQL', 'Flyway', 'OAuth2', 'Keycloak', 'Spring Security'],
  },
  {
    title: 'Deployment + DevOps',
    items: ['Docker', 'Docker Compose', 'CI/CD (GitLab)', 'Nginx', 'AWS', 'GCP', 'MLOps', 'Git'],
  },
];

export const education = {
  college: 'G H Patel College of Engineering & Technology',
  degree: "Bachelor's in Computer Science & Engineering",
  duration: 'Sep 2022 - 2026',
  location: 'Anand, Gujarat',
  cgpa: '8.09',
};

export const certifications = [
  'Artificial Intelligence - IBM, Coursera',
  'Generative AI - IBM, Coursera',
  'Python for Data Science - IBM, Coursera',
];

export const achievements = [
  { value: '35%', label: 'Accuracy uplift', note: 'ProPlay optimization pipeline' },
  { value: '30%', label: 'GPU reduction', note: 'Optimized model inference cost' },
  { value: '90%+', label: 'Speech quality', note: 'Bilingual STT internship system' },
  { value: '85%', label: 'Churn prediction', note: 'Forage simulation model result' },
];
