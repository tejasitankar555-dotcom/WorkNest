export type UserRole = 'freelancer' | 'client' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: UserRole;
  headline: string;
  bio?: string;
  location?: string;
  hourlyRate?: number;
  availability?: 'Available' | 'Busy' | 'Part-time' | 'Not Available';
  rating?: number;
  reviewsCount?: number;
  completedProjectsCount?: number;
  reputationScore?: number; // 0 - 100
  verifiedSkills?: VerifiedSkill[];
  skills?: string[];
  languages?: string[];
  education?: string[];
  certifications?: string[];
  portfolioLinks?: { title: string; url: string }[];
  companyName?: string;
  spentTotal?: number;
  hiresCount?: number;
  joinedDate?: string;
}

export interface VerifiedSkill {
  name: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  score: number; // percentage
  verifiedAt: string;
  badgeUrl?: string;
}

export interface PortfolioPost {
  id: string;
  authorId: string;
  authorName: string;
  authorAvatar: string;
  authorHeadline: string;
  title: string;
  description: string;
  category: string;
  mediaUrl: string;
  mediaType: 'image' | 'video' | 'interactive';
  skills: string[];
  technologies: string[];
  likesCount: number;
  commentsCount: number;
  savesCount: number;
  isLiked?: boolean;
  isSaved?: boolean;
  comments?: PostComment[];
  createdAt: string;
  liveUrl?: string;
  githubUrl?: string;
  aiInsights?: {
    detectedSkills: string[];
    complexityScore: number; // 1-10
    complexityLabel: 'Low' | 'Moderate' | 'High' | 'Enterprise';
    workQualityScore: number; // 1-10
    usabilityScore: number;
    codeArchitectureScore: number;
    highlights: string[];
    suggestedImprovements: string[];
    isPublic: boolean;
  };
}

export interface PostComment {
  id: string;
  authorId: string;
  authorName: string;
  authorAvatar: string;
  text: string;
  createdAt: string;
  likes: number;
}

export interface ProjectMilestone {
  id: string;
  title: string;
  description: string;
  amount: number;
  dueDate: string;
  status: 'Pending' | 'In Progress' | 'Submitted' | 'Approved' | 'Paid';
  submittedWork?: {
    submissionDate: string;
    notes: string;
    deliverableUrl?: string;
    githubUrl?: string;
    attachments?: string[];
    aiAnalysis?: AiWorkAnalysisResult;
  };
}

export interface AiWorkAnalysisResult {
  requirementsFulfilledPercentage: number;
  overallQualityScore: number; // 1-10
  completenessChecklist: { item: string; satisfied: boolean; note?: string }[];
  detectedSkills: string[];
  missingOrWeakPoints: string[];
  technicalQuality: {
    codeArchitecture: number;
    uiResponsiveness: number;
    securityStandards: number;
    performanceEstimate: number;
  };
  suggestedImprovements: string[];
  summaryNote: string;
}

export interface Project {
  id: string;
  clientId: string;
  clientName: string;
  clientAvatar: string;
  clientRating: number;
  clientSpent: number;
  clientLocation: string;
  title: string;
  description: string;
  category: string;
  skills: string[];
  budgetType: 'Fixed' | 'Hourly';
  budgetMin: number;
  budgetMax: number;
  experienceLevel: 'Entry' | 'Intermediate' | 'Expert';
  duration: string;
  location: string;
  isRemote: boolean;
  postedAt: string;
  deadline: string;
  proposalsCount: number;
  status: 'Open' | 'Active' | 'Completed' | 'In Review' | 'Disputed';
  assignedFreelancerId?: string;
  assignedFreelancerName?: string;
  assignedFreelancerAvatar?: string;
  assignedTeamId?: string;
  aiBreakdown?: {
    complexityScore: number;
    complexityLabel: string;
    estimatedTimeline: string;
    recommendedTier: string;
    recommendedTeamSize: string;
    suggestedBudget: string;
    milestoneRoadmap: { title: string; duration: string; estimatedAmount: number; skills: string[] }[];
  };
  milestones?: ProjectMilestone[];
  workspaceTasks?: WorkspaceTask[];
}

export interface WorkspaceTask {
  id: string;
  title: string;
  assignedTo: string;
  status: 'To Do' | 'In Progress' | 'Done';
  priority: 'Low' | 'Medium' | 'High';
  dueDate: string;
}

export interface Proposal {
  id: string;
  projectId: string;
  freelancerId: string;
  freelancerName: string;
  freelancerAvatar: string;
  freelancerHeadline: string;
  freelancerRating: number;
  freelancerCompletedProjects: number;
  coverLetter: string;
  proposedPrice: number;
  deliveryTime: string;
  skills: string[];
  portfolioLinks: string[];
  submittedAt: string;
  status: 'Submitted' | 'Shortlisted' | 'Accepted' | 'Declined';
  aiScore?: number; // 0 - 100 matching score
}

export interface Community {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: string;
  bannerUrl: string;
  icon: string;
  membersCount: number;
  postsCount: number;
  isJoined?: boolean;
  featuredExperts: { name: string; avatar: string; role: string }[];
  tags: string[];
  activeChallenge?: {
    title: string;
    reward: string;
    daysLeft: number;
    participantsCount: number;
    description: string;
  };
}

export interface CommunityDiscussion {
  id: string;
  communityId: string;
  authorId: string;
  authorName: string;
  authorAvatar: string;
  authorBadge?: string;
  title: string;
  content: string;
  category: 'Discussion' | 'Question' | 'Resource' | 'Job' | 'Showcase';
  upvotesCount: number;
  repliesCount: number;
  isUpvoted?: boolean;
  createdAt: string;
  tags: string[];
  answers?: {
    id: string;
    authorName: string;
    authorAvatar: string;
    content: string;
    isAccepted?: boolean;
    upvotes: number;
    createdAt: string;
  }[];
}

export interface FreelancerTeam {
  id: string;
  name: string;
  tagline: string;
  description: string;
  avatar: string;
  bannerUrl: string;
  leadId: string;
  leadName: string;
  leadAvatar: string;
  members: {
    id: string;
    name: string;
    avatar: string;
    role: string;
    rating: number;
    skills: string[];
  }[];
  skills: string[];
  rating: number;
  reviewsCount: number;
  completedProjectsCount: number;
  hourlyRateCombined: number;
  synergyScore: number; // e.g. 98%
  completedProjects: { title: string; category: string; duration: string }[];
}

export interface MessageConversation {
  id: string;
  participants: { id: string; name: string; avatar: string; role: string; isOnline: boolean }[];
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  type: 'direct' | 'team' | 'project';
  projectId?: string;
  projectTitle?: string;
  messages: {
    id: string;
    senderId: string;
    senderName: string;
    senderAvatar: string;
    text: string;
    timestamp: string;
    attachments?: { name: string; size: string; type: string; url?: string }[];
  }[];
}

export interface NotificationItem {
  id: string;
  type: 'proposal' | 'hire' | 'milestone' | 'ai_analysis' | 'community' | 'payment' | 'team';
  title: string;
  description: string;
  timestamp: string;
  isRead: boolean;
  actionUrl?: string;
  targetId?: string;
}

export interface ReviewItem {
  id: string;
  projectId: string;
  projectTitle: string;
  reviewerId: string;
  reviewerName: string;
  reviewerAvatar: string;
  reviewerRole: 'Client' | 'Freelancer';
  targetId: string;
  ratingOverall: number;
  ratingsBreakdown: {
    communication: number;
    quality: number;
    timeliness: number;
    professionalism: number;
  };
  comment: string;
  createdAt: string;
}

export interface DisputeCase {
  id: string;
  projectId: string;
  projectTitle: string;
  complainantName: string;
  complainantRole: 'Client' | 'Freelancer';
  respondentName: string;
  reason: string;
  description: string;
  evidenceFiles: string[];
  requestedResolution: 'Full Refund' | 'Partial Refund' | 'Deliverable Completion' | 'Arbitration';
  status: 'Open' | 'Under Investigation' | 'Awaiting Response' | 'Resolved';
  filedDate: string;
  resolutionNotes?: string;
}

export interface TransactionItem {
  id: string;
  projectId: string;
  projectTitle: string;
  amount: number;
  platformFee: number;
  netAmount: number;
  type: 'Escrow Deposit' | 'Milestone Release' | 'Refund' | 'Withdrawal';
  status: 'Completed' | 'In Escrow' | 'Processing' | 'Failed';
  date: string;
  invoiceId: string;
}
