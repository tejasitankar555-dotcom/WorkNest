import { 
  User, 
  PortfolioPost, 
  Project, 
  Community, 
  CommunityDiscussion, 
  FreelancerTeam, 
  MessageConversation, 
  NotificationItem, 
  ReviewItem, 
  DisputeCase, 
  TransactionItem 
} from '../types';

export const CURRENT_FREELANCER_USER: User = {
  id: 'fl-1',
  name: 'Aditya Bhoyar',
  email: 'aditya.bhoyar@worknest.ai',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
  role: 'freelancer',
  headline: 'Full-Stack Engineer & AI Agent Architect',
  bio: 'Specialized in building high-performance modern web platforms, autonomous AI agents, and reactive design systems. 6+ years shipping production applications with React, TypeScript, Next.js, Python, and LangChain.',
  location: 'San Francisco, CA (Remote)',
  hourlyRate: 85,
  availability: 'Available',
  rating: 4.96,
  reviewsCount: 38,
  completedProjectsCount: 42,
  reputationScore: 96,
  joinedDate: 'March 2024',
  skills: [
    'React', 'TypeScript', 'Node.js', 'Python', 'Next.js', 
    'Tailwind CSS', 'FastAPI', 'LangChain', 'PostgreSQL', 'Docker'
  ],
  verifiedSkills: [
    { name: 'Python', level: 'Expert', score: 98, verifiedAt: 'Sep 2026' },
    { name: 'React', level: 'Expert', score: 95, verifiedAt: 'Aug 2026' },
    { name: 'UI/UX Engineering', level: 'Advanced', score: 91, verifiedAt: 'Jul 2026' },
    { name: 'FastAPI & Microservices', level: 'Advanced', score: 89, verifiedAt: 'May 2026' },
  ],
  languages: ['English (Fluent)', 'Hindi (Native)', 'Spanish (Basic)'],
  education: ['B.S. in Computer Science, UC Berkeley'],
  certifications: ['DeepLearning.AI Certified LLM Architect', 'AWS Certified Solutions Architect'],
  portfolioLinks: [
    { title: 'Personal Website', url: 'https://adityabhoyar.dev' },
    { title: 'GitHub Profile', url: 'https://github.com/adityabhoyar' },
    { title: 'Substack Tech Blog', url: 'https://neuralcode.substack.com' },
  ],
};

export const CURRENT_CLIENT_USER: User = {
  id: 'cl-1',
  name: 'Marcus Sterling',
  email: 'm.sterling@apexailabs.io',
  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
  role: 'client',
  headline: 'VP of Product Engineering @ Apex AI Labs',
  companyName: 'Apex AI Labs',
  bio: 'Leading product and AI engineering for enterprise intelligence software. We hire top 1% engineers, teams, and designers for high-impact contracts and ongoing product acceleration.',
  location: 'Austin, TX',
  rating: 4.98,
  reviewsCount: 29,
  spentTotal: 184500,
  hiresCount: 24,
  joinedDate: 'January 2024',
};

export const CURRENT_ADMIN_USER: User = {
  id: 'admin-1',
  name: 'Elena Vance',
  email: 'moderation@worknest.ai',
  avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
  role: 'admin',
  headline: 'Head of Trust & Safety & Platform Operations',
  location: 'San Francisco, CA',
  joinedDate: 'November 2023',
};

export const MOCK_FREELANCERS: User[] = [
  CURRENT_FREELANCER_USER,
  {
    id: 'fl-2',
    name: 'Elena Rostova',
    email: 'elena.rostova@designcraft.studio',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
    role: 'freelancer',
    headline: 'Staff Product Designer & Design Systems Architect',
    bio: 'Ex-Stripe and Linear product designer. 8+ years crafting seamless fintech, AI, and developer tool interfaces. Focus on clean typography, accessibility, and micro-interactions.',
    location: 'Berlin, Germany',
    hourlyRate: 110,
    availability: 'Available',
    rating: 5.0,
    reviewsCount: 52,
    completedProjectsCount: 56,
    reputationScore: 99,
    joinedDate: 'February 2024',
    skills: ['UI/UX', 'Figma', 'Design Systems', 'Design Tokens', 'Prototyping', 'Frontend Mentoring'],
    verifiedSkills: [
      { name: 'UI/UX', level: 'Expert', score: 99, verifiedAt: 'Sep 2026' },
      { name: 'Design Systems', level: 'Expert', score: 98, verifiedAt: 'Aug 2026' },
    ],
  },
  {
    id: 'fl-3',
    name: 'Devon Vance',
    email: 'devon@cloudnative.dev',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    role: 'freelancer',
    headline: 'Senior Cloud Architect & Kubernetes Security Lead',
    bio: 'DevOps & SRE specialist with extensive experience scaling zero-downtime microservices on AWS, GCP, and Kubernetes.',
    location: 'Toronto, Canada',
    hourlyRate: 95,
    availability: 'Part-time',
    rating: 4.92,
    reviewsCount: 31,
    completedProjectsCount: 34,
    reputationScore: 94,
    joinedDate: 'May 2024',
    skills: ['DevOps', 'Kubernetes', 'AWS', 'Terraform', 'Docker', 'Go', 'Prometheus'],
    verifiedSkills: [
      { name: 'DevOps & SRE', level: 'Expert', score: 96, verifiedAt: 'Aug 2026' },
      { name: 'Docker & Kubernetes', level: 'Expert', score: 97, verifiedAt: 'Jun 2026' },
    ],
  },
  {
    id: 'fl-4',
    name: 'Dr. Sarah Lin',
    email: 'sarah.lin@cognition.ai',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
    role: 'freelancer',
    headline: 'PhD AI/ML Scientist & Applied LLM Fine-tuner',
    bio: 'Specialized in RAG pipelines, model quantization, agentic tool-use, and multimodality. Published author at NeurIPS.',
    location: 'Cambridge, MA',
    hourlyRate: 140,
    availability: 'Available',
    rating: 4.98,
    reviewsCount: 22,
    completedProjectsCount: 27,
    reputationScore: 98,
    joinedDate: 'December 2024',
    skills: ['AI/ML', 'PyTorch', 'Python', 'LangChain', 'LlamaIndex', 'HuggingFace', 'FastAPI'],
    verifiedSkills: [
      { name: 'AI/ML', level: 'Expert', score: 99, verifiedAt: 'Sep 2026' },
      { name: 'Python', level: 'Expert', score: 97, verifiedAt: 'Jul 2026' },
    ],
  },
  {
    id: 'fl-5',
    name: 'Mateo Morales',
    email: 'mateo@pixelmotion.io',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=400&q=80',
    role: 'freelancer',
    headline: 'Lead Mobile Engineer (React Native & Swift)',
    bio: 'Shipped 15+ iOS and Android consumer apps reaching #1 on App Store categories. Expert in 120fps animations and offline sync.',
    location: 'Barcelona, Spain',
    hourlyRate: 90,
    availability: 'Available',
    rating: 4.89,
    reviewsCount: 44,
    completedProjectsCount: 48,
    reputationScore: 93,
    joinedDate: 'April 2024',
    skills: ['Mobile Development', 'React Native', 'Swift', 'iOS', 'Android', 'Redux', 'Expo'],
    verifiedSkills: [
      { name: 'Mobile Development', level: 'Advanced', score: 92, verifiedAt: 'Aug 2026' },
    ],
  },
];

export const MOCK_POSTS: PortfolioPost[] = [
  {
    id: 'post-1',
    authorId: 'fl-1',
    authorName: 'Aditya Bhoyar',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    authorHeadline: 'Full-Stack Engineer & AI Agent Architect',
    title: 'Autonomous Code-Reviewer Agent with Automated Test Generation',
    description: 'Designed and deployed an event-driven AI workflow agent that hooks into GitHub Pull Requests. It analyzes AST differentials, identifies race conditions, checks security vulnerabilities (OWASP top 10), and produces unit test mocks in Jest and PyTest.',
    category: 'AI/ML',
    mediaUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
    mediaType: 'image',
    skills: ['React', 'Python', 'LangChain', 'Docker', 'FastAPI'],
    technologies: ['TypeScript', 'OpenAI SDK', 'GitHub Webhooks', 'Redis Queue', 'PostgreSQL'],
    likesCount: 142,
    commentsCount: 28,
    savesCount: 65,
    isLiked: false,
    isSaved: false,
    createdAt: '2 hours ago',
    liveUrl: 'https://agent-demo.worknest.ai',
    githubUrl: 'https://github.com/adityabhoyar/code-agent',
    comments: [
      {
        id: 'c-1',
        authorId: 'cl-1',
        authorName: 'Marcus Sterling',
        authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
        text: 'The AST tree comparison logic is remarkably clean. We have an upcoming client project requiring this exact architecture.',
        createdAt: '1 hour ago',
        likes: 12,
      },
      {
        id: 'c-2',
        authorId: 'fl-2',
        authorName: 'Elena Rostova',
        authorAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
        text: 'Love how crisp the diff inspector UI is! Great color contrast on syntax highlighting.',
        createdAt: '45 mins ago',
        likes: 6,
      }
    ],
    aiInsights: {
      detectedSkills: ['AST Parsing', 'Prompt Engineering', 'FastAPI Async Handlers', 'Docker Containerization', 'React State Management'],
      complexityScore: 8.8,
      complexityLabel: 'High',
      workQualityScore: 9.4,
      usabilityScore: 9.2,
      codeArchitectureScore: 9.6,
      highlights: [
        'Robust fallback handlers for large token context windows',
        'Clean modular repository separation between analysis agent and dashboard frontend',
        'High code coverage (94% tested via PyTest)',
      ],
      suggestedImprovements: [
        'Add Redis caching for duplicate git blob hashes to reduce OpenAI token latency',
        'Implement streaming Server-Sent Events (SSE) for real-time line-by-line feedback in the UI',
      ],
      isPublic: true,
    }
  },
  {
    id: 'post-2',
    authorId: 'fl-2',
    authorName: 'Elena Rostova',
    authorAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
    authorHeadline: 'Staff Product Designer & Design Systems Architect',
    title: 'Aura UI: High-Density Design System for Financial Trading Terminals',
    description: 'A 240+ component design system engineered for high-frequency algorithmic traders. Includes sub-millisecond chart visualizers, dark/light ambient contrast modes, keyboard-first navigation shortcuts, and strict WCAG AAA color standards.',
    category: 'UI/UX',
    mediaUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    mediaType: 'image',
    skills: ['UI/UX', 'Figma', 'Design Systems', 'Data Visualization'],
    technologies: ['Figma Variables', 'Tailwind Tokens', 'Storybook', 'WCAG AAA'],
    likesCount: 230,
    commentsCount: 41,
    savesCount: 119,
    isLiked: true,
    isSaved: true,
    createdAt: 'Yesterday',
    liveUrl: 'https://aura-design.system.preview',
    aiInsights: {
      detectedSkills: ['Figma Auto-Layout & Tokens', 'Micro-interactions', 'Data Density Layouts', 'Accessibility Compliance'],
      complexityScore: 9.1,
      complexityLabel: 'Enterprise',
      workQualityScore: 9.8,
      usabilityScore: 9.7,
      codeArchitectureScore: 9.5,
      highlights: [
        'Exceptional information density without cognitive clutter',
        'Comprehensive 14-level token scale for neutral and contextual states',
      ],
      suggestedImprovements: [
        'Provide interactive canvas playground in Storybook for dynamic trade mock tests',
      ],
      isPublic: true,
    }
  },
  {
    id: 'post-3',
    authorId: 'fl-5',
    authorName: 'Mateo Morales',
    authorAvatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=400&q=80',
    authorHeadline: 'Lead Mobile Engineer (React Native & Swift)',
    title: 'PulseFit: Offline-First Health & Biometrics Mobile App',
    description: 'Built with React Native, WatermelonDB, and Apple HealthKit integration. Synchronizes accelerometer and heart rate data locally with zero dropped frames, then safely pushes delta updates when network connectivity resumes.',
    category: 'Mobile Development',
    mediaUrl: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1200&q=80',
    mediaType: 'image',
    skills: ['Mobile Development', 'React Native', 'HealthKit', 'SQLite'],
    technologies: ['TypeScript', 'Reanimated 3', 'WatermelonDB', 'Swift Native Modules'],
    likesCount: 188,
    commentsCount: 19,
    savesCount: 54,
    createdAt: '3 days ago',
    aiInsights: {
      detectedSkills: ['Native Module Bridging', 'Offline Database Sync', 'Gesture Handling'],
      complexityScore: 8.4,
      complexityLabel: 'High',
      workQualityScore: 9.0,
      usabilityScore: 9.4,
      codeArchitectureScore: 8.9,
      highlights: ['Silky 120Hz gesture animations', 'Resilient local-first sync schema'],
      suggestedImprovements: ['Add biometric biometric biometric biometric battery consumption benchmarks'],
      isPublic: true,
    }
  },
  {
    id: 'post-4',
    authorId: 'fl-4',
    authorName: 'Dr. Sarah Lin',
    authorAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
    authorHeadline: 'PhD AI/ML Scientist & Applied LLM Fine-tuner',
    title: 'MedQuery RAG: 99.2% Accurate Clinical Decision Support Pipeline',
    description: 'Engineered a specialized Retrieval Augmented Generation system over 1.2M PubMed articles and FDA drug interaction databases. Implemented hybrid dense/sparse vector retrieval with BGE reranking and strict citation provenance.',
    category: 'AI/ML',
    mediaUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
    mediaType: 'image',
    skills: ['AI/ML', 'Python', 'Qdrant', 'RAG Pipelines'],
    technologies: ['PyTorch', 'LangChain', 'BGE Embeddings', 'FastAPI'],
    likesCount: 310,
    commentsCount: 52,
    savesCount: 167,
    createdAt: '4 days ago',
    aiInsights: {
      detectedSkills: ['Vector Databases', 'Medical NLP', 'Hallucination Mitigation', 'Evaluation Benchmarks'],
      complexityScore: 9.5,
      complexityLabel: 'Enterprise',
      workQualityScore: 9.7,
      usabilityScore: 9.1,
      codeArchitectureScore: 9.8,
      highlights: ['Mathematically sound hallucination guardrails', 'Sub-200ms vector semantic lookups'],
      suggestedImprovements: ['Publish reproducible Docker container on Hugging Face Spaces'],
      isPublic: true,
    }
  }
];

export const MOCK_PROJECTS: Project[] = [
  {
    id: 'proj-1',
    clientId: 'cl-1',
    clientName: 'Apex AI Labs',
    clientAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    clientRating: 4.98,
    clientSpent: 184500,
    clientLocation: 'Austin, TX',
    title: 'WorkNest AI Workspace & Autonomous Milestone Inspector',
    description: 'We require a senior Full-Stack Engineer or dedicated Team to build the core AI-powered project workspace. Deliverables include real-time milestone tracking, automated deliverable analysis against client requirements, code & asset previewer, and collaborative escrow release workflow.',
    category: 'Web Development',
    skills: ['React', 'TypeScript', 'Node.js', 'Python', 'FastAPI', 'UI/UX'],
    budgetType: 'Fixed',
    budgetMin: 4500,
    budgetMax: 7000,
    experienceLevel: 'Expert',
    duration: '4-6 weeks',
    location: 'Remote (Anywhere)',
    isRemote: true,
    postedAt: '1 day ago',
    deadline: 'Oct 30, 2026',
    proposalsCount: 8,
    status: 'Active',
    assignedFreelancerId: 'fl-1',
    assignedFreelancerName: 'Aditya Bhoyar',
    assignedFreelancerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    aiBreakdown: {
      complexityScore: 8.6,
      complexityLabel: 'High Complexity',
      estimatedTimeline: '4 - 6 weeks',
      recommendedTier: 'Senior / Lead Full-Stack Specialist',
      recommendedTeamSize: '1 Lead Engineer + 1 UI Specialist or Experienced Solo Architect',
      suggestedBudget: '$5,000 - $6,800',
      milestoneRoadmap: [
        { title: 'System Architecture & UI Workspace Scaffold', duration: '1 week', estimatedAmount: 1500, skills: ['React', 'TypeScript', 'Tailwind'] },
        { title: 'Interactive Milestone & File Deliverables Engine', duration: '1.5 weeks', estimatedAmount: 1800, skills: ['Node.js', 'PostgreSQL', 'File Uploads'] },
        { title: 'AI Work Analysis Engine (Requirements vs Deliverable)', duration: '1.5 weeks', estimatedAmount: 2200, skills: ['Python', 'FastAPI', 'LLM Analysis'] },
        { title: 'Testing, Security Audits & Client Escrow Handshake', duration: '1 week', estimatedAmount: 1500, skills: ['Jest', 'E2E Testing', 'Stripe Escrow Mock'] },
      ]
    },
    milestones: [
      {
        id: 'ms-1',
        title: 'Milestone 1: Workspace Architecture & Real-Time State',
        description: 'Complete project scaffold with responsive navigation, task kanban, and live milestone status toggles.',
        amount: 1500,
        dueDate: 'Oct 10, 2026',
        status: 'Approved',
        submittedWork: {
          submissionDate: 'Oct 08, 2026',
          notes: 'Completed complete frontend state container, types, and milestone layout. Fully responsive across tablet and desktop.',
          deliverableUrl: 'https://preview.worknest.ai/workspace/demo',
          githubUrl: 'https://github.com/adityabhoyar/worknest-workspace-core',
          aiAnalysis: {
            requirementsFulfilledPercentage: 100,
            overallQualityScore: 9.6,
            completenessChecklist: [
              { item: 'Responsive layout for all screen breakpoints', satisfied: true },
              { item: 'Typed state management architecture', satisfied: true },
              { item: 'Accessible color contrasts and micro-interactions', satisfied: true }
            ],
            detectedSkills: ['React 18', 'TypeScript', 'Tailwind CSS', 'State Management'],
            missingOrWeakPoints: [],
            technicalQuality: { codeArchitecture: 9.8, uiResponsiveness: 9.6, securityStandards: 9.4, performanceEstimate: 9.7 },
            suggestedImprovements: ['Add skeleton placeholders during initial async fetch'],
            summaryNote: 'Exceptional submission exceeding prompt specifications.'
          }
        }
      },
      {
        id: 'ms-2',
        title: 'Milestone 2: Deliverable Submission & AI Work Inspection',
        description: 'Implement work submission drawer with automated diff comparison against client project brief.',
        amount: 1800,
        dueDate: 'Oct 18, 2026',
        status: 'Submitted',
        submittedWork: {
          submissionDate: 'Oct 16, 2026',
          notes: 'Deliverable ready for client verification. Attached repository link with test suite passing 32/32 unit tests. Integrated AI Work Analysis module that extracts code highlights and verifies each requirement.',
          deliverableUrl: 'https://worknest-inspector-alpha.vercel.app',
          githubUrl: 'https://github.com/adityabhoyar/worknest-deliverable-analyzer',
          attachments: ['architecture-spec-v2.pdf', 'benchmark-results.json'],
          aiAnalysis: {
            requirementsFulfilledPercentage: 94,
            overallQualityScore: 9.2,
            completenessChecklist: [
              { item: 'File and demo URL submission form', satisfied: true },
              { item: 'AI automated comparison against project brief', satisfied: true },
              { item: 'Completeness checklist with passing indicators', satisfied: true },
              { item: 'Rate limiting for frequent analysis requests', satisfied: false, note: 'Mock in-memory rate limiter implemented; redis adapter suggested for production.' }
            ],
            detectedSkills: ['Python FastAPI', 'Prompt Engineering', 'React Components', 'JWT Authentication'],
            missingOrWeakPoints: ['Need higher test coverage on edge cases where submitted deliverable file is corrupted'],
            technicalQuality: { codeArchitecture: 9.3, uiResponsiveness: 9.4, securityStandards: 9.1, performanceEstimate: 9.0 },
            suggestedImprovements: [
              'Add exportable PDF certificate for the AI analysis report',
              'Include visual diff preview for image and SVG deliverables'
            ],
            summaryNote: 'High technical quality. 94% of client requirements verified with zero critical vulnerabilities.'
          }
        }
      },
      {
        id: 'ms-3',
        title: 'Milestone 3: Escrow Payment Release & Dispute Protection',
        description: 'Complete platform payment workflow, milestone sign-off, two-way reviews, and dispute escalation path.',
        amount: 2200,
        dueDate: 'Oct 28, 2026',
        status: 'In Progress'
      },
      {
        id: 'ms-4',
        title: 'Milestone 4: Final Production Polish & Handover',
        description: 'End-to-end user testing, documentation, and production deployment.',
        amount: 1500,
        dueDate: 'Nov 05, 2026',
        status: 'Pending'
      }
    ],
    workspaceTasks: [
      { id: 't-1', title: 'Verify responsive breakpoint on iPhone 15 Pro', assignedTo: 'Aditya Bhoyar', status: 'Done', priority: 'Medium', dueDate: 'Oct 12' },
      { id: 't-2', title: 'Implement client review modal upon milestone sign-off', assignedTo: 'Aditya Bhoyar', status: 'In Progress', priority: 'High', dueDate: 'Oct 19' },
      { id: 't-3', title: 'Connect Escrow transaction ledger mock', assignedTo: 'Aditya Bhoyar', status: 'To Do', priority: 'High', dueDate: 'Oct 22' },
      { id: 't-4', title: 'Client review of Milestone 2 AI Work Analysis report', assignedTo: 'Marcus Sterling', status: 'In Progress', priority: 'High', dueDate: 'Oct 17' },
    ]
  },
  {
    id: 'proj-2',
    clientId: 'cl-2',
    clientName: 'Horizon HealthTech',
    clientAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80',
    clientRating: 4.91,
    clientSpent: 62000,
    clientLocation: 'Boston, MA',
    title: 'HIPAA-Compliant Patient Telehealth Portal & Mobile App',
    description: 'Looking for a verified Full-Stack or Mobile Specialist to build a modern telehealth consultation interface. Must support encrypted WebRTC video sessions, appointment scheduling, and automated clinical note summaries.',
    category: 'Mobile Development',
    skills: ['Mobile Development', 'React Native', 'TypeScript', 'WebRTC', 'Cybersecurity'],
    budgetType: 'Fixed',
    budgetMin: 6000,
    budgetMax: 9500,
    experienceLevel: 'Expert',
    duration: '2-3 months',
    location: 'Remote',
    isRemote: true,
    postedAt: '2 days ago',
    deadline: 'Nov 15, 2026',
    proposalsCount: 12,
    status: 'Open',
    aiBreakdown: {
      complexityScore: 9.0,
      complexityLabel: 'Enterprise Complexity',
      estimatedTimeline: '8 - 12 weeks',
      recommendedTier: 'Senior Mobile & Security Architect',
      recommendedTeamSize: 'Team of 2 (Mobile Lead + Backend Security Specialist)',
      suggestedBudget: '$7,500 - $9,500',
      milestoneRoadmap: [
        { title: 'HIPAA Compliant Architecture & Auth', duration: '2 weeks', estimatedAmount: 2000, skills: ['OAuth', 'Encryption', 'Node.js'] },
        { title: 'React Native Patient & Doctor Mobile Clients', duration: '4 weeks', estimatedAmount: 3500, skills: ['React Native', 'WebRTC'] },
        { title: 'Automated Clinical Summarization Engine', duration: '3 weeks', estimatedAmount: 2500, skills: ['Python', 'NLP'] },
        { title: 'Security Audit, Penetration Test & Store Release', duration: '2 weeks', estimatedAmount: 1500, skills: ['DevOps', 'App Store'] },
      ]
    }
  },
  {
    id: 'proj-3',
    clientId: 'cl-3',
    clientName: 'Vanguard FinTech',
    clientAvatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=400&q=80',
    clientRating: 4.95,
    clientSpent: 94000,
    clientLocation: 'New York, NY',
    title: 'Design System & Micro-Frontend Architecture for Wealth Management',
    description: 'We need a premier UI/UX designer and Frontend Architect to create our next-generation portfolio analytics dashboard. Needs to support ultra-dense tabular data, real-time WebSockets ticker updates, and multi-tenant theming.',
    category: 'UI/UX',
    skills: ['UI/UX', 'Figma', 'React', 'Design Systems', 'Data Visualization'],
    budgetType: 'Hourly',
    budgetMin: 85,
    budgetMax: 120,
    experienceLevel: 'Expert',
    duration: '3-6 months',
    location: 'Remote',
    isRemote: true,
    postedAt: '3 days ago',
    deadline: 'Dec 01, 2026',
    proposalsCount: 15,
    status: 'Open',
  },
  {
    id: 'proj-4',
    clientId: 'cl-1',
    clientName: 'Apex AI Labs',
    clientAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    clientRating: 4.98,
    clientSpent: 184500,
    clientLocation: 'Austin, TX',
    title: 'Multi-Agent Autonomous Research Engine (LangGraph & FastAPI)',
    description: 'We are expanding our intelligence gathering system. Looking for an AI Engineer with proven production experience fine-tuning LLMs, implementing web search agents with LangGraph, and managing distributed Celery task queues.',
    category: 'AI/ML',
    skills: ['AI/ML', 'Python', 'LangChain', 'FastAPI', 'Docker', 'PostgreSQL'],
    budgetType: 'Fixed',
    budgetMin: 5000,
    budgetMax: 8000,
    experienceLevel: 'Expert',
    duration: '1-2 months',
    location: 'Remote',
    isRemote: true,
    postedAt: '4 hours ago',
    deadline: 'Nov 01, 2026',
    proposalsCount: 6,
    status: 'Open',
  }
];

export const MOCK_COMMUNITIES: Community[] = [
  {
    id: 'comm-1',
    name: 'AI/ML Innovators & Agent Builders',
    slug: 'ai-ml-innovators',
    description: 'The premier community for applied machine learning practitioners, LLM engineers, autonomous agent architects, and researchers.',
    category: 'AI/ML',
    bannerUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    icon: 'Cpu',
    membersCount: 4280,
    postsCount: 1340,
    isJoined: true,
    tags: ['Agents', 'LangChain', 'PyTorch', 'Fine-Tuning', 'RAG'],
    featuredExperts: [
      { name: 'Dr. Sarah Lin', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80', role: 'AI Scientist' },
      { name: 'Aditya Bhoyar', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80', role: 'Agent Architect' },
    ],
    activeChallenge: {
      title: 'Autonomous Multi-Tool Agent in 48 Hours',
      reward: '$2,500 Prize Pool + Verified Badge',
      daysLeft: 4,
      participantsCount: 88,
      description: 'Build an autonomous agent that accomplishes at least 3 distinct multi-step tasks across real-world APIs with zero human intervention.'
    }
  },
  {
    id: 'comm-2',
    name: 'Web Development Craftsmen',
    slug: 'web-development-craftsmen',
    description: 'Engineers obsessive about web performance, clean TypeScript architecture, accessibility, modern state machines, and micro-frontends.',
    category: 'Web Development',
    bannerUrl: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80',
    icon: 'Code',
    membersCount: 6890,
    postsCount: 2890,
    isJoined: true,
    tags: ['React', 'TypeScript', 'Next.js', 'Vite', 'Tailwind'],
    featuredExperts: [
      { name: 'Aditya Bhoyar', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80', role: 'Full-Stack Lead' },
    ],
    activeChallenge: {
      title: 'Sub-50ms Global Edge Function Benchmark',
      reward: '$1,500 Prize + WorkNest Featured Creator',
      daysLeft: 9,
      participantsCount: 114,
      description: 'Benchmark and optimize a dynamic server-rendered page across 6 global edge nodes under heavy latency simulation.'
    }
  },
  {
    id: 'comm-3',
    name: 'UI/UX & Design Systems Collective',
    slug: 'ui-ux-design-systems',
    description: 'Where world-class product designers, design engineers, and typography purists dissect interfaces and share Figma component systems.',
    category: 'UI/UX',
    bannerUrl: 'https://images.unsplash.com/photo-1509343256512-d77a5cb3791b?auto=format&fit=crop&w=1200&q=80',
    icon: 'Layout',
    membersCount: 5120,
    postsCount: 1980,
    isJoined: false,
    tags: ['Design Systems', 'Figma', 'Micro-interactions', 'WCAG AAA'],
    featuredExperts: [
      { name: 'Elena Rostova', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80', role: 'Staff Designer' },
    ]
  },
  {
    id: 'comm-4',
    name: 'Mobile App Architects',
    slug: 'mobile-app-architects',
    description: 'Building snappy iOS and Android experiences with React Native, Swift, Kotlin, and offline-first databases.',
    category: 'Mobile Development',
    bannerUrl: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=1200&q=80',
    icon: 'Smartphone',
    membersCount: 3840,
    postsCount: 1210,
    isJoined: false,
    tags: ['React Native', 'Swift', 'Kotlin', 'Reanimated'],
    featuredExperts: [
      { name: 'Mateo Morales', avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=400&q=80', role: 'Lead Mobile Eng' },
    ]
  },
  {
    id: 'comm-5',
    name: 'Freelance Growth & Agency Builders',
    slug: 'freelance-growth',
    description: 'Learn contract negotiation, value-based pricing, client retention, forming teams, and building a 6-figure independent practice.',
    category: 'Freelance Growth',
    bannerUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    icon: 'TrendingUp',
    membersCount: 8430,
    postsCount: 3450,
    isJoined: true,
    tags: ['Pricing Strategy', 'Client Management', 'Contracts', 'Scaling'],
    featuredExperts: [
      { name: 'Devon Vance', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80', role: 'Cloud Lead' },
    ]
  }
];

export const MOCK_DISCUSSIONS: CommunityDiscussion[] = [
  {
    id: 'disc-1',
    communityId: 'comm-1',
    authorId: 'fl-1',
    authorName: 'Aditya Bhoyar',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    authorBadge: 'Verified Python Expert',
    title: 'How we mitigated 99% of infinite loop hallucinations in autonomous tool agents',
    content: 'When building multi-step reasoning loops with LangChain or LangGraph, circular dependency traps frequently cause agents to repeatedly query the same tool. Here is our state machine pattern with circuit-breaker depth bounds and rollback state...',
    category: 'Resource',
    upvotesCount: 84,
    repliesCount: 22,
    isUpvoted: true,
    createdAt: '5 hours ago',
    tags: ['Agents', 'Best Practices', 'Python', 'LangChain'],
    answers: [
      {
        id: 'ans-1',
        authorName: 'Dr. Sarah Lin',
        authorAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
        content: 'This matches what we observed in our medical retrieval pipeline. Adding a deterministic hash of the last 3 observation payloads gives an instant O(1) loop detector before the model even makes another call.',
        isAccepted: true,
        upvotes: 35,
        createdAt: '3 hours ago'
      }
    ]
  },
  {
    id: 'disc-2',
    communityId: 'comm-2',
    authorId: 'fl-2',
    authorName: 'Elena Rostova',
    authorAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
    authorBadge: 'Verified UI/UX Expert',
    title: 'Why design tokens need to be versioned identically to npm packages in 2026',
    content: 'When teams scale past 4 frontend micro-apps, drifting color hexes and border-radii create subtle visual degradation. Here is how we automated Figma Tokens sync to a single npm package publishing CSS custom properties on Git tag...',
    category: 'Discussion',
    upvotesCount: 61,
    repliesCount: 14,
    createdAt: '1 day ago',
    tags: ['Design Systems', 'CSS', 'Figma', 'Architecture']
  }
];

export const MOCK_TEAMS: FreelancerTeam[] = [
  {
    id: 'team-1',
    name: 'Full-Stack AI Pioneers',
    tagline: 'End-to-End AI Web Applications, from Research to Production Scale',
    description: 'We combine world-class AI scientists, Full-Stack architects, and staff product designers. We deliver complete, turn-key software products in half the time of traditional agencies with transparent, milestone-governed agility.',
    avatar: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=400&q=80',
    bannerUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80',
    leadId: 'fl-1',
    leadName: 'Aditya Bhoyar',
    leadAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    members: [
      {
        id: 'fl-1',
        name: 'Aditya Bhoyar',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
        role: 'Full-Stack & Team Lead',
        rating: 4.96,
        skills: ['React', 'TypeScript', 'Node.js', 'Python']
      },
      {
        id: 'fl-2',
        name: 'Elena Rostova',
        avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
        role: 'Staff Product Designer',
        rating: 5.0,
        skills: ['UI/UX', 'Design Systems', 'Figma']
      },
      {
        id: 'fl-4',
        name: 'Dr. Sarah Lin',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
        role: 'Lead AI/ML Scientist',
        rating: 4.98,
        skills: ['PyTorch', 'LangChain', 'FastAPI']
      },
      {
        id: 'fl-3',
        name: 'Devon Vance',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
        role: 'Cloud & DevOps Lead',
        rating: 4.92,
        skills: ['Kubernetes', 'AWS', 'Docker']
      }
    ],
    skills: ['React', 'TypeScript', 'Python', 'AI/ML', 'UI/UX', 'Cloud DevOps', 'Design Systems'],
    rating: 4.99,
    reviewsCount: 26,
    completedProjectsCount: 28,
    hourlyRateCombined: 290,
    synergyScore: 98,
    completedProjects: [
      { title: 'Global Enterprise AI Search Engine', category: 'AI/ML + Full-Stack', duration: '3 months' },
      { title: 'Fintech Trading Terminal & Mobile Suite', category: 'UI/UX & Mobile', duration: '4 months' },
      { title: 'Automated Document Extraction Cloud', category: 'DevOps & Backend', duration: '2 months' }
    ]
  },
  {
    id: 'team-2',
    name: 'PixelCraft Product Studio',
    tagline: 'Consumer Mobile Apps & Delightful Micro-Interactions',
    description: 'A boutique collective of mobile developers, animators, and design researchers specializing in consumer apps that achieve viral retention.',
    avatar: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=400&q=80',
    bannerUrl: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80',
    leadId: 'fl-5',
    leadName: 'Mateo Morales',
    leadAvatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=400&q=80',
    members: [
      {
        id: 'fl-5',
        name: 'Mateo Morales',
        avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=400&q=80',
        role: 'Lead Mobile Architect',
        rating: 4.89,
        skills: ['React Native', 'Swift', 'Animations']
      },
      {
        id: 'fl-2',
        name: 'Elena Rostova',
        avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
        role: 'Product Designer',
        rating: 5.0,
        skills: ['UI/UX', 'Figma']
      }
    ],
    skills: ['Mobile Development', 'React Native', 'Swift', 'UI/UX', 'Animations'],
    rating: 4.92,
    reviewsCount: 19,
    completedProjectsCount: 22,
    hourlyRateCombined: 185,
    synergyScore: 94,
    completedProjects: [
      { title: 'PulseFit Fitness App (100k+ downloads)', category: 'Mobile App', duration: '3 months' }
    ]
  }
];

export const MOCK_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    type: 'ai_analysis',
    title: 'AI Work Analysis Complete',
    description: 'Milestone 2 deliverable for "WorkNest AI Workspace" verified with 94% requirement fulfillment.',
    timestamp: '15 mins ago',
    isRead: false,
    actionUrl: '/workspace/proj-1'
  },
  {
    id: 'notif-2',
    type: 'proposal',
    title: 'New High-Match Proposal',
    description: 'Elena Rostova applied for your project "Design System for Wealth Management" (98% AI Match).',
    timestamp: '2 hours ago',
    isRead: false,
    actionUrl: '/projects/proj-3'
  },
  {
    id: 'notif-3',
    type: 'community',
    title: 'New Response in AI/ML Community',
    description: 'Dr. Sarah Lin accepted your solution regarding autonomous agent loop detection.',
    timestamp: '3 hours ago',
    isRead: true,
    actionUrl: '/communities/ai-ml-innovators'
  },
  {
    id: 'notif-4',
    type: 'payment',
    title: 'Milestone 1 Payment Released',
    description: 'Escrow payment of $1,500.00 has been deposited to your WorkNest wallet.',
    timestamp: '1 day ago',
    isRead: true,
  }
];

export const MOCK_REVIEWS: ReviewItem[] = [
  {
    id: 'rev-1',
    projectId: 'proj-prev-1',
    projectTitle: 'Enterprise Knowledge Graph & Vector Search',
    reviewerId: 'cl-1',
    reviewerName: 'Marcus Sterling',
    reviewerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    reviewerRole: 'Client',
    targetId: 'fl-1',
    ratingOverall: 5.0,
    ratingsBreakdown: {
      communication: 5.0,
      quality: 5.0,
      timeliness: 4.9,
      professionalism: 5.0,
    },
    comment: 'Aditya is in the top tier of full-stack AI engineers. He grasped our complex ontology immediately, wrote clean maintainable code, and delivered ahead of schedule. The AI Work Analysis verified 100% compliance on the first submission.',
    createdAt: '2 weeks ago',
  },
  {
    id: 'rev-2',
    projectId: 'proj-prev-2',
    projectTitle: 'FastAPI Microservice Migration',
    reviewerId: 'cl-4',
    reviewerName: 'Devin Cole',
    reviewerAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80',
    reviewerRole: 'Client',
    targetId: 'fl-1',
    ratingOverall: 4.9,
    ratingsBreakdown: {
      communication: 4.8,
      quality: 5.0,
      timeliness: 5.0,
      professionalism: 5.0,
    },
    comment: 'Flawless engineering execution. Zero downtime migration and thorough documentation for our internal engineering staff.',
    createdAt: '1 month ago',
  }
];

export const MOCK_TRANSACTIONS: TransactionItem[] = [
  {
    id: 'tx-1',
    projectId: 'proj-1',
    projectTitle: 'WorkNest AI Workspace & Autonomous Milestone Inspector',
    amount: 1500,
    platformFee: 75,
    netAmount: 1425,
    type: 'Milestone Release',
    status: 'Completed',
    date: 'Oct 08, 2026',
    invoiceId: 'INV-2026-0891'
  },
  {
    id: 'tx-2',
    projectId: 'proj-1',
    projectTitle: 'WorkNest AI Workspace & Autonomous Milestone Inspector',
    amount: 1800,
    platformFee: 90,
    netAmount: 1710,
    type: 'Escrow Deposit',
    status: 'In Escrow',
    date: 'Oct 03, 2026',
    invoiceId: 'INV-2026-0870'
  },
  {
    id: 'tx-3',
    projectId: 'proj-prev-1',
    projectTitle: 'Enterprise Knowledge Graph & Vector Search',
    amount: 4200,
    platformFee: 210,
    netAmount: 3990,
    type: 'Milestone Release',
    status: 'Completed',
    date: 'Sep 21, 2026',
    invoiceId: 'INV-2026-0742'
  }
];

export const MOCK_DISPUTES: DisputeCase[] = [
  {
    id: 'disp-101',
    projectId: 'proj-disp-1',
    projectTitle: 'E-Commerce React Native App Checkout Redesign',
    complainantName: 'Sarah Bradley (Client)',
    complainantRole: 'Client',
    respondentName: 'TechFlow Studio (Freelancer)',
    reason: 'Incomplete Deliverables & Unresolved Stripe Webhook Bug',
    description: 'The contractor submitted milestone 3 stating the checkout flow is complete, but real Stripe payments fail in sandbox testing due to missing secret key configuration and unhandled promise rejections.',
    evidenceFiles: ['test-error-logs.txt', 'screen-recording-repro.mp4'],
    requestedResolution: 'Deliverable Completion',
    status: 'Under Investigation',
    filedDate: 'Oct 01, 2026',
    resolutionNotes: 'WorkNest mediator requested revised webhook test coverage from freelancer by Oct 05.'
  },
  {
    id: 'disp-102',
    projectId: 'proj-disp-2',
    projectTitle: 'SaaS Brand Guidelines & Logo Redesign',
    complainantName: 'Kavita Patel (Freelancer)',
    complainantRole: 'Freelancer',
    respondentName: 'SwiftVenture Capital (Client)',
    reason: 'Unreasonable Scope Expansion without Milestone Adjustment',
    description: 'Contract was for 3 logo concepts and standard 12-page PDF guidelines. Client demanded 45 separate social media banner variations not listed in agreed requirements.',
    evidenceFiles: ['signed-scope-agreement.pdf', 'slack-chat-export.pdf'],
    requestedResolution: 'Arbitration',
    status: 'Open',
    filedDate: 'Oct 02, 2026',
  }
];

export const MOCK_CONVERSATIONS: MessageConversation[] = [
  {
    id: 'conv-1',
    type: 'project',
    projectId: 'proj-1',
    projectTitle: 'WorkNest AI Workspace',
    participants: [
      { id: 'fl-1', name: 'Aditya Bhoyar', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80', role: 'Freelancer', isOnline: true },
      { id: 'cl-1', name: 'Marcus Sterling', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80', role: 'Client', isOnline: true }
    ],
    lastMessage: 'I reviewed the AI Work Analysis report for Milestone 2. 94% score is solid! Will sign off today.',
    lastMessageTime: '10:42 AM',
    unreadCount: 1,
    messages: [
      {
        id: 'm-1',
        senderId: 'cl-1',
        senderName: 'Marcus Sterling',
        senderAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
        text: 'Hi Aditya, excited to kick off Milestone 2. How is the AI deliverable comparison module coming along?',
        timestamp: 'Yesterday, 3:15 PM'
      },
      {
        id: 'm-2',
        senderId: 'fl-1',
        senderName: 'Aditya Bhoyar',
        senderAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
        text: 'Hey Marcus! It is going great. I just pushed the deliverable and ran the automated WorkNest AI verification. It tested all 4 requirements and gave us a 94% quality fulfillment score.',
        timestamp: 'Yesterday, 5:40 PM',
        attachments: [
          { name: 'milestone-2-inspector.zip', size: '4.8 MB', type: 'archive' }
        ]
      },
      {
        id: 'm-3',
        senderId: 'cl-1',
        senderName: 'Marcus Sterling',
        senderAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
        text: 'I reviewed the AI Work Analysis report for Milestone 2. 94% score is solid! Will sign off today.',
        timestamp: '10:42 AM'
      }
    ]
  },
  {
    id: 'conv-2',
    type: 'team',
    participants: [
      { id: 'fl-1', name: 'Aditya Bhoyar', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80', role: 'Full-Stack Lead', isOnline: true },
      { id: 'fl-2', name: 'Elena Rostova', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80', role: 'UI Lead', isOnline: false },
      { id: 'fl-4', name: 'Dr. Sarah Lin', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80', role: 'AI Lead', isOnline: true },
    ],
    lastMessage: 'Team pitch for the Horizon HealthTech project has been submitted!',
    lastMessageTime: 'Yesterday',
    unreadCount: 0,
    messages: [
      {
        id: 'm-201',
        senderId: 'fl-1',
        senderName: 'Aditya Bhoyar',
        senderAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
        text: 'Team pitch for the Horizon HealthTech project has been submitted! Let’s keep an eye out for the interview invitation.',
        timestamp: 'Yesterday, 8:12 PM'
      }
    ]
  }
];

export const SKILL_ASSESSMENTS = [
  {
    id: 'test-python',
    skill: 'Python',
    level: 'Expert',
    questionsCount: 5,
    durationMinutes: 10,
    description: 'Evaluates generator pipelines, async concurrency (asyncio), memory profiling, and type annotations.',
    questions: [
      {
        id: 'q1',
        prompt: 'In high-throughput asyncio applications, which of the following is the most efficient way to run 500 independent I/O tasks with a maximum concurrency limit of 20?',
        options: [
          'asyncio.gather(*tasks) with no limits',
          'asyncio.Semaphore(20) used inside a task worker pattern',
          'threading.ThreadPoolExecutor(max_workers=20)',
          'time.sleep(0.01) between calls'
        ],
        correctIndex: 1,
        explanation: 'asyncio.Semaphore(20) bounds concurrent coroutine acquisition without blocking the event loop or thread context overhead.'
      },
      {
        id: 'q2',
        prompt: 'What happens when using mutable default arguments (e.g. def append_to(item, target=[])) in Python?',
        options: [
          'A new empty list is created on every function invocation',
          'The default list is instantiated once at function definition time and shared across subsequent calls',
          'Python raises a SyntaxError at compile time',
          'The list automatically garbage collects after return'
        ],
        correctIndex: 1,
        explanation: 'Python function default parameters are evaluated when the function definition is executed, creating a persistent single reference.'
      },
      {
        id: 'q3',
        prompt: 'Which Python standard library protocol allows an object to support the `async with` context manager statement?',
        options: [
          '__enter__ and __exit__',
          '__aenter__ and __aexit__',
          '__await__ and __aiter__',
          '__async__ and __close__'
        ],
        correctIndex: 1,
        explanation: 'Asynchronous context managers require `__aenter__` and `__aexit__` which return coroutines.'
      }
    ]
  },
  {
    id: 'test-react',
    skill: 'React',
    level: 'Expert',
    questionsCount: 4,
    durationMinutes: 8,
    description: 'Tests React 18/19 concurrency, useEffect lifecycle subtleties, custom hooks, and memoization rules.',
    questions: [
      {
        id: 'rq1',
        prompt: 'When using `useTransition` in React 18+, how does it affect state updates?',
        options: [
          'It forces state updates to be executed synchronously',
          'It marks the state update as non-urgent, allowing urgent updates (like typing) to interrupt the render',
          'It moves component execution to a Web Worker background thread',
          'It caches the component in browser localStorage'
        ],
        correctIndex: 1,
        explanation: '`startTransition` marks updates as transitions which allows React to prioritize user interactions and interrupt rendering if needed.'
      },
      {
        id: 'rq2',
        prompt: 'What is the primary architectural purpose of React Server Components (RSC)?',
        options: [
          'To replace client-side state management completely',
          'To render components exclusively on the server with zero client bundle overhead while seamlessly streaming to interactive client components',
          'To compile React directly to WebAssembly',
          'To deprecate HTML CSS rendering in favor of WebGL'
        ],
        correctIndex: 1,
        explanation: 'RSC allows components to stay on the server with zero client bundle size impact, keeping large libraries on the server.'
      }
    ]
  },
  {
    id: 'test-uiux',
    skill: 'UI/UX Engineering',
    level: 'Advanced',
    questionsCount: 4,
    durationMinutes: 8,
    description: 'Tests design tokens, accessible contrast, Fitts Law, and responsive typography scales.',
    questions: [
      {
        id: 'uq1',
        prompt: 'Under WCAG 2.1 Level AA guidelines, what is the minimum required contrast ratio for normal body text (below 18pt)?',
        options: [
          '3:1',
          '4.5:1',
          '7:1',
          '2.5:1'
        ],
        correctIndex: 1,
        explanation: 'WCAG AA requires a 4.5:1 contrast ratio for normal text and 3:1 for large text (18pt or 14pt bold).'
      }
    ]
  }
];
