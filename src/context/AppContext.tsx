import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  User, 
  UserRole, 
  Project, 
  PortfolioPost, 
  Community, 
  CommunityDiscussion, 
  FreelancerTeam, 
  Proposal, 
  NotificationItem, 
  MessageConversation, 
  DisputeCase, 
  ProjectMilestone,
  AiWorkAnalysisResult 
} from '../types';
import { 
  CURRENT_FREELANCER_USER, 
  CURRENT_CLIENT_USER, 
  CURRENT_ADMIN_USER, 
  MOCK_FREELANCERS, 
  MOCK_POSTS, 
  MOCK_PROJECTS, 
  MOCK_COMMUNITIES, 
  MOCK_DISCUSSIONS, 
  MOCK_TEAMS, 
  MOCK_NOTIFICATIONS, 
  MOCK_CONVERSATIONS, 
  MOCK_DISPUTES 
} from '../data/mockData';

export type AppView = 
  | 'home' 
  | 'marketplace' 
  | 'project-details'
  | 'post-project' 
  | 'feed' 
  | 'communities' 
  | 'community-detail' 
  | 'teams' 
  | 'team-detail' 
  | 'talent' 
  | 'profile' 
  | 'workspace' 
  | 'messages' 
  | 'notifications' 
  | 'dashboard' 
  | 'saved' 
  | 'disputes' 
  | 'settings';

export interface Toast {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  message: string;
}

interface SavedItemsState {
  projects: string[];
  talent: string[];
  posts: string[];
  communities: string[];
}

interface AppContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  currentUser: User;
  updateCurrentUser: (updates: Partial<User>) => void;
  
  view: AppView;
  setView: (view: AppView) => void;
  navigateTo: (view: AppView, params?: { 
    projectId?: string; 
    freelancerId?: string; 
    communityId?: string; 
    teamId?: string;
    postId?: string;
  }) => void;
  
  selectedProjectId: string | null;
  setSelectedProjectId: (id: string | null) => void;
  selectedFreelancerId: string | null;
  setSelectedFreelancerId: (id: string | null) => void;
  selectedCommunityId: string | null;
  setSelectedCommunityId: (id: string | null) => void;
  selectedTeamId: string | null;
  setSelectedTeamId: (id: string | null) => void;
  selectedPostId: string | null;
  setSelectedPostId: (id: string | null) => void;

  projects: Project[];
  addProject: (project: Omit<Project, 'id' | 'postedAt' | 'proposalsCount' | 'status'>) => Project;
  updateMilestoneStatus: (projectId: string, milestoneId: string, status: ProjectMilestone['status']) => void;
  submitMilestoneWork: (projectId: string, milestoneId: string, notes: string, deliverableUrl: string, githubUrl: string) => void;
  approveMilestone: (projectId: string, milestoneId: string) => void;

  posts: PortfolioPost[];
  addPost: (newPost: Omit<PortfolioPost, 'id' | 'createdAt' | 'likesCount' | 'commentsCount' | 'savesCount'>) => void;
  toggleLikePost: (postId: string) => void;
  toggleSavePost: (postId: string) => void;
  addPostComment: (postId: string, text: string) => void;

  freelancers: User[];
  communities: Community[];
  toggleJoinCommunity: (communityId: string) => void;

  discussions: CommunityDiscussion[];
  addDiscussion: (discussion: Omit<CommunityDiscussion, 'id' | 'createdAt' | 'upvotesCount' | 'repliesCount'>) => void;
  upvoteDiscussion: (discussionId: string) => void;
  replyDiscussion: (discussionId: string, text: string) => void;

  teams: FreelancerTeam[];
  addTeam: (team: Omit<FreelancerTeam, 'id' | 'rating' | 'reviewsCount' | 'completedProjectsCount' | 'synergyScore'>) => void;

  proposals: Proposal[];
  submitProposal: (proposal: Omit<Proposal, 'id' | 'submittedAt' | 'status'>) => void;

  notifications: NotificationItem[];
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;

  conversations: MessageConversation[];
  activeConversationId: string;
  setActiveConversationId: (id: string) => void;
  sendMessage: (conversationId: string, text: string, attachmentName?: string) => void;

  disputes: DisputeCase[];
  fileDispute: (dispute: Omit<DisputeCase, 'id' | 'filedDate' | 'status'>) => void;

  savedItems: SavedItemsState;
  toggleSaveItem: (type: 'projects' | 'talent' | 'posts' | 'communities', id: string) => void;
  isItemSaved: (type: 'projects' | 'talent' | 'posts' | 'communities', id: string) => boolean;

  toasts: Toast[];
  addToast: (message: string, type?: Toast['type']) => void;
  removeToast: (id: string) => void;

  // Modal Controls
  isAuthModalOpen: boolean;
  authModalMode: 'login' | 'signup';
  openAuthModal: (mode?: 'login' | 'signup') => void;
  closeAuthModal: () => void;
  
  isOnboardingOpen: boolean;
  setIsOnboardingOpen: (open: boolean) => void;

  isSkillAssessmentOpen: boolean;
  skillAssessmentTarget: string | null;
  openSkillAssessment: (skillName: string) => void;
  closeSkillAssessment: () => void;
  awardSkillVerification: (skillName: string, level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert', score: number) => void;

  isGlobalSearchOpen: boolean;
  setIsGlobalSearchOpen: (open: boolean) => void;

  isAiAssistantOpen: boolean;
  setIsAiAssistantOpen: (open: boolean) => void;
  aiAssistantMode: 'freelancer' | 'client';
  setAiAssistantMode: (mode: 'freelancer' | 'client') => void;

  isApplyModalOpen: boolean;
  applyProjectTarget: Project | null;
  openApplyModal: (project: Project) => void;
  closeApplyModal: () => void;

  isCreatePostModalOpen: boolean;
  setIsCreatePostModalOpen: (open: boolean) => void;

  isCreateTeamModalOpen: boolean;
  setIsCreateTeamModalOpen: (open: boolean) => void;

  isFileDisputeModalOpen: boolean;
  setIsFileDisputeModalOpen: (open: boolean) => void;

  isAiWorkAnalysisModalOpen: boolean;
  aiWorkAnalysisTarget: { project: Project; milestone: ProjectMilestone } | null;
  openAiWorkAnalysisModal: (project: Project, milestone: ProjectMilestone) => void;
  closeAiWorkAnalysisModal: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRoleState] = useState<UserRole>('freelancer');
  const [currentUser, setCurrentUserState] = useState<User>(CURRENT_FREELANCER_USER);
  const [view, setView] = useState<AppView>('home');
  
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>('proj-1');
  const [selectedFreelancerId, setSelectedFreelancerId] = useState<string | null>('fl-1');
  const [selectedCommunityId, setSelectedCommunityId] = useState<string | null>('comm-1');
  const [selectedTeamId, setSelectedTeamId] = useState<string | null>('team-1');
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);

  const [projects, setProjects] = useState<Project[]>(MOCK_PROJECTS);
  const [posts, setPosts] = useState<PortfolioPost[]>(MOCK_POSTS);
  const [freelancers, setFreelancers] = useState<User[]>(MOCK_FREELANCERS);
  const [communities, setCommunities] = useState<Community[]>(MOCK_COMMUNITIES);
  const [discussions, setDiscussions] = useState<CommunityDiscussion[]>(MOCK_DISCUSSIONS);
  const [teams, setTeams] = useState<FreelancerTeam[]>(MOCK_TEAMS);
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [notifications, setNotifications] = useState<NotificationItem[]>(MOCK_NOTIFICATIONS);
  const [conversations, setConversations] = useState<MessageConversation[]>(MOCK_CONVERSATIONS);
  const [activeConversationId, setActiveConversationId] = useState<string>('conv-1');
  const [disputes, setDisputes] = useState<DisputeCase[]>(MOCK_DISPUTES);

  const [savedItems, setSavedItems] = useState<SavedItemsState>({
    projects: ['proj-2'],
    talent: ['fl-2', 'fl-4'],
    posts: ['post-2'],
    communities: ['comm-1', 'comm-2']
  });

  const [toasts, setToasts] = useState<Toast[]>([]);

  // Modals
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'signup'>('login');
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);
  const [isSkillAssessmentOpen, setIsSkillAssessmentOpen] = useState(false);
  const [skillAssessmentTarget, setSkillAssessmentTarget] = useState<string | null>(null);
  const [isGlobalSearchOpen, setIsGlobalSearchOpen] = useState(false);
  const [isAiAssistantOpen, setIsAiAssistantOpen] = useState(false);
  const [aiAssistantMode, setAiAssistantMode] = useState<'freelancer' | 'client'>('freelancer');
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [applyProjectTarget, setApplyProjectTarget] = useState<Project | null>(null);
  const [isCreatePostModalOpen, setIsCreatePostModalOpen] = useState(false);
  const [isCreateTeamModalOpen, setIsCreateTeamModalOpen] = useState(false);
  const [isFileDisputeModalOpen, setIsFileDisputeModalOpen] = useState(false);
  const [isAiWorkAnalysisModalOpen, setIsAiWorkAnalysisModalOpen] = useState(false);
  const [aiWorkAnalysisTarget, setAiWorkAnalysisTarget] = useState<{ project: Project; milestone: ProjectMilestone } | null>(null);

  // Sync role changes to default user profile
  const setRole = (newRole: UserRole) => {
    setRoleState(newRole);
    if (newRole === 'freelancer') {
      setCurrentUserState(CURRENT_FREELANCER_USER);
      setAiAssistantMode('freelancer');
    } else if (newRole === 'client') {
      setCurrentUserState(CURRENT_CLIENT_USER);
      setAiAssistantMode('client');
    } else {
      setCurrentUserState(CURRENT_ADMIN_USER);
    }
    addToast(`Switched active view to ${newRole.toUpperCase()} mode`, 'info');
  };

  const updateCurrentUser = (updates: Partial<User>) => {
    setCurrentUserState(prev => ({ ...prev, ...updates }));
    addToast('Profile updated successfully', 'success');
  };

  const navigateTo = (newView: AppView, params?: { 
    projectId?: string; 
    freelancerId?: string; 
    communityId?: string; 
    teamId?: string;
    postId?: string;
  }) => {
    if (params?.projectId) setSelectedProjectId(params.projectId);
    if (params?.freelancerId) setSelectedFreelancerId(params.freelancerId);
    if (params?.communityId) setSelectedCommunityId(params.communityId);
    if (params?.teamId) setSelectedTeamId(params.teamId);
    if (params?.postId) setSelectedPostId(params.postId);
    setView(newView);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const addToast = (message: string, type: Toast['type'] = 'success') => {
    const id = 'toast-' + Date.now() + Math.random().toString(36).substr(2, 4);
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const openAuthModal = (mode: 'login' | 'signup' = 'login') => {
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const openSkillAssessment = (skillName: string) => {
    setSkillAssessmentTarget(skillName);
    setIsSkillAssessmentOpen(true);
  };

  const closeSkillAssessment = () => {
    setIsSkillAssessmentOpen(false);
    setSkillAssessmentTarget(null);
  };

  const awardSkillVerification = (skillName: string, level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert', score: number) => {
    const newVerification = {
      name: skillName,
      level,
      score,
      verifiedAt: 'Just Now'
    };

    setCurrentUserState(prev => {
      const existing = (prev.verifiedSkills || []).filter(s => s.name.toLowerCase() !== skillName.toLowerCase());
      return {
        ...prev,
        verifiedSkills: [...existing, newVerification],
        reputationScore: Math.min(100, (prev.reputationScore || 90) + 2)
      };
    });

    addToast(`Congratulations! Skill verified: ${skillName} (${level} - ${score}%)`, 'success');
  };

  // Projects & Milestones
  const addProject = (newProjectData: Omit<Project, 'id' | 'postedAt' | 'proposalsCount' | 'status'>) => {
    const id = 'proj-' + (projects.length + 1);
    const newProj: Project = {
      ...newProjectData,
      id,
      postedAt: 'Just now',
      proposalsCount: 0,
      status: 'Open'
    };
    setProjects(prev => [newProj, ...prev]);
    addToast('Project published with AI Breakdown roadmap!', 'success');
    return newProj;
  };

  const updateMilestoneStatus = (projectId: string, milestoneId: string, status: ProjectMilestone['status']) => {
    setProjects(prev => prev.map(p => {
      if (p.id !== projectId) return p;
      const updatedMilestones = (p.milestones || []).map(m => {
        if (m.id !== milestoneId) return m;
        return { ...m, status };
      });
      return { ...p, milestones: updatedMilestones };
    }));
    addToast(`Milestone status updated to ${status}`, 'info');
  };

  const submitMilestoneWork = (projectId: string, milestoneId: string, notes: string, deliverableUrl: string, githubUrl: string) => {
    // Generate automated AI Work Analysis
    const mockAiAnalysis: AiWorkAnalysisResult = {
      requirementsFulfilledPercentage: 96,
      overallQualityScore: 9.4,
      completenessChecklist: [
        { item: 'All core acceptance criteria implemented', satisfied: true },
        { item: 'Responsive cross-device testing passing', satisfied: true },
        { item: 'Automated test suite coverage above 90%', satisfied: true },
        { item: 'Documentation and API schema provided', satisfied: true },
      ],
      detectedSkills: ['React', 'TypeScript', 'Clean Architecture', 'API Integration'],
      missingOrWeakPoints: ['Consider adding end-to-end Cypress test coverage for payment edge cases'],
      technicalQuality: {
        codeArchitecture: 9.6,
        uiResponsiveness: 9.5,
        securityStandards: 9.3,
        performanceEstimate: 9.4
      },
      suggestedImprovements: [
        'Add memoization for heavy list rendering components',
        'Cache client responses in service worker for offline resilience'
      ],
      summaryNote: 'AI Work Analysis verified 96% requirement fulfillment with exceptional architectural quality.'
    };

    setProjects(prev => prev.map(p => {
      if (p.id !== projectId) return p;
      const updatedMilestones = (p.milestones || []).map(m => {
        if (m.id !== milestoneId) return m;
        return {
          ...m,
          status: 'Submitted' as const,
          submittedWork: {
            submissionDate: 'Today',
            notes,
            deliverableUrl,
            githubUrl,
            aiAnalysis: mockAiAnalysis
          }
        };
      });
      return { ...p, milestones: updatedMilestones };
    }));

    // Add notification for client
    setNotifications(prev => [
      {
        id: 'notif-' + Date.now(),
        type: 'ai_analysis',
        title: 'Work Submitted & AI Analyzed',
        description: `Deliverable submitted for milestone on project. AI verified 96% compliance.`,
        timestamp: 'Just now',
        isRead: false,
        actionUrl: `/workspace`
      },
      ...prev
    ]);

    addToast('Milestone submitted! AI Work Analysis completed.', 'success');
  };

  const approveMilestone = (projectId: string, milestoneId: string) => {
    let releasedAmount = 0;
    setProjects(prev => prev.map(p => {
      if (p.id !== projectId) return p;
      const updatedMilestones = (p.milestones || []).map(m => {
        if (m.id !== milestoneId) return m;
        releasedAmount = m.amount;
        return { ...m, status: 'Paid' as const };
      });
      return { ...p, milestones: updatedMilestones };
    }));

    // Add notification
    setNotifications(prev => [
      {
        id: 'notif-' + Date.now(),
        type: 'payment',
        title: `Payment Released: $${releasedAmount}`,
        description: `Client approved milestone. Funds transferred from escrow to freelancer balance.`,
        timestamp: 'Just now',
        isRead: false
      },
      ...prev
    ]);

    addToast(`Milestone approved! $${releasedAmount} released from Escrow.`, 'success');
  };

  // Posts & Social Feed
  const addPost = (newPostData: Omit<PortfolioPost, 'id' | 'createdAt' | 'likesCount' | 'commentsCount' | 'savesCount'>) => {
    const id = 'post-' + (posts.length + 1);
    const newPost: PortfolioPost = {
      ...newPostData,
      id,
      createdAt: 'Just now',
      likesCount: 1,
      commentsCount: 0,
      savesCount: 0,
      isLiked: false,
      isSaved: false,
      comments: []
    };
    setPosts(prev => [newPost, ...prev]);
    addToast('Project published to Social Portfolio Feed!', 'success');
  };

  const toggleLikePost = (postId: string) => {
    setPosts(prev => prev.map(post => {
      if (post.id !== postId) return post;
      const isLiked = !post.isLiked;
      return {
        ...post,
        isLiked,
        likesCount: post.likesCount + (isLiked ? 1 : -1)
      };
    }));
  };

  const toggleSavePost = (postId: string) => {
    setPosts(prev => prev.map(post => {
      if (post.id !== postId) return post;
      const isSaved = !post.isSaved;
      return {
        ...post,
        isSaved,
        savesCount: post.savesCount + (isSaved ? 1 : -1)
      };
    }));
    toggleSaveItem('posts', postId);
  };

  const addPostComment = (postId: string, text: string) => {
    if (!text.trim()) return;
    const newComment = {
      id: 'c-' + Date.now(),
      authorId: currentUser.id,
      authorName: currentUser.name,
      authorAvatar: currentUser.avatar,
      text: text.trim(),
      createdAt: 'Just now',
      likes: 0
    };
    setPosts(prev => prev.map(post => {
      if (post.id !== postId) return post;
      return {
        ...post,
        commentsCount: post.commentsCount + 1,
        comments: [...(post.comments || []), newComment]
      };
    }));
    addToast('Comment posted', 'info');
  };

  // Communities
  const toggleJoinCommunity = (communityId: string) => {
    setCommunities(prev => prev.map(c => {
      if (c.id !== communityId) return c;
      const isJoined = !c.isJoined;
      return {
        ...c,
        isJoined,
        membersCount: c.membersCount + (isJoined ? 1 : -1)
      };
    }));
    toggleSaveItem('communities', communityId);
    addToast('Community membership updated', 'info');
  };

  const addDiscussion = (discData: Omit<CommunityDiscussion, 'id' | 'createdAt' | 'upvotesCount' | 'repliesCount'>) => {
    const id = 'disc-' + (discussions.length + 1);
    const newDisc: CommunityDiscussion = {
      ...discData,
      id,
      createdAt: 'Just now',
      upvotesCount: 1,
      repliesCount: 0,
      isUpvoted: true,
      answers: []
    };
    setDiscussions(prev => [newDisc, ...prev]);
    addToast('Discussion published to community!', 'success');
  };

  const upvoteDiscussion = (discussionId: string) => {
    setDiscussions(prev => prev.map(d => {
      if (d.id !== discussionId) return d;
      const isUpvoted = !d.isUpvoted;
      return {
        ...d,
        isUpvoted,
        upvotesCount: d.upvotesCount + (isUpvoted ? 1 : -1)
      };
    }));
  };

  const replyDiscussion = (discussionId: string, text: string) => {
    if (!text.trim()) return;
    const answer = {
      id: 'ans-' + Date.now(),
      authorName: currentUser.name,
      authorAvatar: currentUser.avatar,
      content: text.trim(),
      upvotes: 0,
      createdAt: 'Just now'
    };
    setDiscussions(prev => prev.map(d => {
      if (d.id !== discussionId) return d;
      return {
        ...d,
        repliesCount: d.repliesCount + 1,
        answers: [...(d.answers || []), answer]
      };
    }));
    addToast('Reply submitted', 'success');
  };

  // Teams
  const addTeam = (teamData: Omit<FreelancerTeam, 'id' | 'rating' | 'reviewsCount' | 'completedProjectsCount' | 'synergyScore'>) => {
    const id = 'team-' + (teams.length + 1);
    const newTeam: FreelancerTeam = {
      ...teamData,
      id,
      rating: 5.0,
      reviewsCount: 1,
      completedProjectsCount: 1,
      synergyScore: 96
    };
    setTeams(prev => [newTeam, ...prev]);
    addToast(`Team "${teamData.name}" created successfully!`, 'success');
  };

  // Proposals
  const submitProposal = (proposalData: Omit<Proposal, 'id' | 'submittedAt' | 'status'>) => {
    const id = 'prop-' + (proposals.length + 1);
    const newProp: Proposal = {
      ...proposalData,
      id,
      submittedAt: 'Just now',
      status: 'Submitted',
      aiScore: Math.floor(Math.random() * 12 + 88) // 88% - 100%
    };
    setProposals(prev => [newProp, ...prev]);

    // increment project proposal count
    setProjects(prev => prev.map(p => {
      if (p.id !== proposalData.projectId) return p;
      return { ...p, proposalsCount: p.proposalsCount + 1 };
    }));

    addToast('Proposal submitted with AI Match Score!', 'success');
  };

  // Notifications
  const markNotificationAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  const markAllNotificationsAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
    addToast('All notifications marked as read', 'info');
  };

  // Messages
  const sendMessage = (conversationId: string, text: string, attachmentName?: string) => {
    if (!text.trim() && !attachmentName) return;
    const newMsg = {
      id: 'm-' + Date.now(),
      senderId: currentUser.id,
      senderName: currentUser.name,
      senderAvatar: currentUser.avatar,
      text: text.trim(),
      timestamp: 'Just now',
      attachments: attachmentName ? [{ name: attachmentName, size: '2.4 MB', type: 'file' }] : undefined
    };

    setConversations(prev => prev.map(c => {
      if (c.id !== conversationId) return c;
      return {
        ...c,
        lastMessage: text || (attachmentName ? `Sent ${attachmentName}` : ''),
        lastMessageTime: 'Just now',
        messages: [...c.messages, newMsg]
      };
    }));

    // Auto simulated reply after 2.5s for real interaction feel
    setTimeout(() => {
      const simulatedReply = {
        id: 'm-sim-' + Date.now(),
        senderId: 'sim-partner',
        senderName: currentUser.role === 'freelancer' ? 'Marcus Sterling (Client)' : 'Aditya Bhoyar (Freelancer)',
        senderAvatar: currentUser.role === 'freelancer' 
          ? 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80'
          : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
        text: 'Got your update! Reviewing the details on my end now. Looks very promising.',
        timestamp: 'Just now'
      };
      setConversations(prev => prev.map(c => {
        if (c.id !== conversationId) return c;
        return {
          ...c,
          lastMessage: simulatedReply.text,
          lastMessageTime: 'Just now',
          messages: [...c.messages, simulatedReply]
        };
      }));
    }, 2500);
  };

  // Disputes
  const fileDispute = (disputeData: Omit<DisputeCase, 'id' | 'filedDate' | 'status'>) => {
    const id = 'disp-' + (disputes.length + 101);
    const newDispute: DisputeCase = {
      ...disputeData,
      id,
      filedDate: 'Today',
      status: 'Open',
    };
    setDisputes(prev => [newDispute, ...prev]);
    addToast('Dispute case registered. Mediation team assigned.', 'warning');
  };

  // Saved items
  const toggleSaveItem = (type: 'projects' | 'talent' | 'posts' | 'communities', id: string) => {
    setSavedItems(prev => {
      const exists = prev[type].includes(id);
      const updated = exists 
        ? prev[type].filter(item => item !== id)
        : [...prev[type], id];
      
      addToast(exists ? `Removed from saved ${type}` : `Added to saved ${type}`, 'info');
      return { ...prev, [type]: updated };
    });
  };

  const isItemSaved = (type: 'projects' | 'talent' | 'posts' | 'communities', id: string) => {
    return savedItems[type]?.includes(id) || false;
  };

  const openApplyModal = (project: Project) => {
    setApplyProjectTarget(project);
    setIsApplyModalOpen(true);
  };

  const closeApplyModal = () => {
    setIsApplyModalOpen(false);
    setApplyProjectTarget(null);
  };

  const openAiWorkAnalysisModal = (project: Project, milestone: ProjectMilestone) => {
    setAiWorkAnalysisTarget({ project, milestone });
    setIsAiWorkAnalysisModalOpen(true);
  };

  const closeAiWorkAnalysisModal = () => {
    setIsAiWorkAnalysisModalOpen(false);
    setAiWorkAnalysisTarget(null);
  };

  return (
    <AppContext.Provider value={{
      role,
      setRole,
      currentUser,
      updateCurrentUser,
      view,
      setView,
      navigateTo,
      selectedProjectId,
      setSelectedProjectId,
      selectedFreelancerId,
      setSelectedFreelancerId,
      selectedCommunityId,
      setSelectedCommunityId,
      selectedTeamId,
      setSelectedTeamId,
      selectedPostId,
      setSelectedPostId,
      projects,
      addProject,
      updateMilestoneStatus,
      submitMilestoneWork,
      approveMilestone,
      posts,
      addPost,
      toggleLikePost,
      toggleSavePost,
      addPostComment,
      freelancers,
      communities,
      toggleJoinCommunity,
      discussions,
      addDiscussion,
      upvoteDiscussion,
      replyDiscussion,
      teams,
      addTeam,
      proposals,
      submitProposal,
      notifications,
      markNotificationAsRead,
      markAllNotificationsAsRead,
      conversations,
      activeConversationId,
      setActiveConversationId,
      sendMessage,
      disputes,
      fileDispute,
      savedItems,
      toggleSaveItem,
      isItemSaved,
      toasts,
      addToast,
      removeToast,

      isAuthModalOpen,
      authModalMode,
      openAuthModal,
      closeAuthModal,

      isOnboardingOpen,
      setIsOnboardingOpen,

      isSkillAssessmentOpen,
      skillAssessmentTarget,
      openSkillAssessment,
      closeSkillAssessment,
      awardSkillVerification,

      isGlobalSearchOpen,
      setIsGlobalSearchOpen,

      isAiAssistantOpen,
      setIsAiAssistantOpen,
      aiAssistantMode,
      setAiAssistantMode,

      isApplyModalOpen,
      applyProjectTarget,
      openApplyModal,
      closeApplyModal,

      isCreatePostModalOpen,
      setIsCreatePostModalOpen,

      isCreateTeamModalOpen,
      setIsCreateTeamModalOpen,

      isFileDisputeModalOpen,
      setIsFileDisputeModalOpen,

      isAiWorkAnalysisModalOpen,
      aiWorkAnalysisTarget,
      openAiWorkAnalysisModal,
      closeAiWorkAnalysisModal
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
