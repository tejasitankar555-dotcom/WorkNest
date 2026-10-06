import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { DemoToolbar } from './components/layout/DemoToolbar';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { ToastContainer } from './components/layout/ToastContainer';
import { GlobalSearchModal } from './components/layout/GlobalSearchModal';
import { AiAssistantDrawer } from './components/layout/AiAssistantDrawer';

// Modals
import { AuthModal } from './components/auth/AuthModal';
import { OnboardingModal } from './components/auth/OnboardingModal';
import { SkillVerificationModal } from './components/talent/SkillVerificationModal';
import { AiWorkAnalysisModal } from './components/workspace/AiWorkAnalysisModal';
import { ApplyProposalModal } from './components/projects/ApplyProposalModal';
import { CreatePostModal } from './components/feed/CreatePostModal';
import { CreateTeamModal } from './components/teams/CreateTeamModal';
import { FileDisputeModal } from './components/disputes/FileDisputeModal';

// Views
import { LandingPage } from './components/home/LandingPage';
import { MarketplacePage } from './components/projects/MarketplacePage';
import { PostProjectPage } from './components/projects/PostProjectPage';
import { PortfolioFeedPage } from './components/feed/PortfolioFeedPage';
import { CommunitiesHubPage } from './components/communities/CommunitiesHubPage';
import { CommunityDetailPage } from './components/communities/CommunityDetailPage';
import { TeamsDirectoryPage } from './components/teams/TeamsDirectoryPage';
import { TalentDirectoryPage } from './components/talent/TalentDirectoryPage';
import { FreelancerProfilePage } from './components/talent/FreelancerProfilePage';
import { ProjectWorkspacePage } from './components/workspace/ProjectWorkspacePage';
import { MessagesPage } from './components/messages/MessagesPage';
import { NotificationsPage } from './components/notifications/NotificationsPage';
import { DashboardHub } from './components/dashboard/DashboardHub';
import { SavedItemsPage } from './components/saved/SavedItemsPage';
import { DisputesSupportPage } from './components/disputes/DisputesSupportPage';
import { SettingsPage } from './components/settings/SettingsPage';

const AppContent: React.FC = () => {
  const { view } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-slate-900 selection:bg-orange-500 selection:text-white">
      {/* Top Prototype Demo Bar for Quick Role & Flow Jumps */}
      <DemoToolbar />

      {/* Main Adaptive Navbar */}
      <Navbar />

      {/* Main Dynamic View */}
      <main className="flex-1">
        {view === 'home' && <LandingPage />}
        {view === 'marketplace' && <MarketplacePage />}
        {view === 'post-project' && <PostProjectPage />}
        {view === 'feed' && <PortfolioFeedPage />}
        {view === 'communities' && <CommunitiesHubPage />}
        {view === 'community-detail' && <CommunityDetailPage />}
        {view === 'teams' && <TeamsDirectoryPage />}
        {view === 'talent' && <TalentDirectoryPage />}
        {view === 'profile' && <FreelancerProfilePage />}
        {view === 'workspace' && <ProjectWorkspacePage />}
        {view === 'messages' && <MessagesPage />}
        {view === 'notifications' && <NotificationsPage />}
        {view === 'dashboard' && <DashboardHub />}
        {view === 'saved' && <SavedItemsPage />}
        {view === 'disputes' && <DisputesSupportPage />}
        {view === 'settings' && <SettingsPage />}
      </main>

      {/* Global Startup Footer */}
      <Footer />

      {/* Overlays, Drawers & Modals */}
      <ToastContainer />
      <GlobalSearchModal />
      <AiAssistantDrawer />
      <AuthModal />
      <OnboardingModal />
      <SkillVerificationModal />
      <AiWorkAnalysisModal />
      <ApplyProposalModal />
      <CreatePostModal />
      <CreateTeamModal />
      <FileDisputeModal />
    </div>
  );
};

export function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
