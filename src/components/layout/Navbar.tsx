import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Sparkles, 
  Search, 
  Bell, 
  Bookmark, 
  MessageSquare, 
  User as UserIcon, 
  Settings, 
  HelpCircle, 
  LogOut, 
  Menu, 
  X, 
  Briefcase, 
  ShieldCheck, 
  Layers, 
  PlusCircle, 
  Compass, 
  Check, 
  ArrowRight,
  TrendingUp
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { 
    role, 
    setRole, 
    currentUser, 
    view, 
    navigateTo, 
    notifications, 
    markNotificationAsRead, 
    markAllNotificationsAsRead,
    setIsGlobalSearchOpen,
    setIsAiAssistantOpen,
    openAuthModal,
    conversations
  } = useApp();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  const unreadNotifications = notifications.filter(n => !n.isRead);
  const unreadMessagesCount = conversations.reduce((acc, c) => acc + c.unreadCount, 0);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setIsNotificationsOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-6">
            <button 
              onClick={() => navigateTo('home')} 
              className="flex items-center gap-2.5 group text-left"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#FF5520] to-[#FF8042] flex items-center justify-center text-white shadow-md shadow-orange-500/20 group-hover:scale-105 transition-transform">
                <span className="font-extrabold text-xl tracking-tight">W</span>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xl font-bold tracking-tight text-slate-900 group-hover:text-[#FF5520] transition-colors">
                    WorkNest
                  </span>
                  <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-teal-50 text-teal-700 border border-teal-200/60">
                    <Sparkles className="w-2.5 h-2.5 mr-0.5 text-teal-500" />
                    AI Core
                  </span>
                </div>
                <span className="text-[10px] text-slate-500 font-medium hidden sm:block tracking-wide">
                  Proof-of-Work Platform
                </span>
              </div>
            </button>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
              <button
                onClick={() => navigateTo('home')}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  view === 'home'
                    ? 'text-[#FF5520] bg-orange-50'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                }`}
              >
                Home
              </button>

              {role === 'freelancer' && (
                <>
                  <button
                    onClick={() => navigateTo('marketplace')}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                      view === 'marketplace'
                        ? 'text-[#FF5520] bg-orange-50'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                    }`}
                  >
                    Discover Work
                  </button>
                  <button
                    onClick={() => navigateTo('feed')}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                      view === 'feed'
                        ? 'text-[#FF5520] bg-orange-50'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                    }`}
                  >
                    Portfolio Feed
                  </button>
                  <button
                    onClick={() => navigateTo('communities')}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                      view === 'communities' || view === 'community-detail'
                        ? 'text-[#FF5520] bg-orange-50'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                    }`}
                  >
                    Communities
                  </button>
                  <button
                    onClick={() => navigateTo('teams')}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                      view === 'teams' || view === 'team-detail'
                        ? 'text-[#FF5520] bg-orange-50'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                    }`}
                  >
                    Teams
                  </button>
                  <button
                    onClick={() => navigateTo('workspace', { projectId: 'proj-1' })}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                      view === 'workspace'
                        ? 'text-[#FF5520] bg-orange-50'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                    }`}
                  >
                    <Layers className="w-4 h-4 text-orange-500" />
                    Workspace
                  </button>
                </>
              )}

              {role === 'client' && (
                <>
                  <button
                    onClick={() => navigateTo('talent')}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                      view === 'talent'
                        ? 'text-[#FF5520] bg-orange-50'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                    }`}
                  >
                    Find Talent
                  </button>
                  <button
                    onClick={() => navigateTo('feed')}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                      view === 'feed'
                        ? 'text-[#FF5520] bg-orange-50'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                    }`}
                  >
                    Proof Feed
                  </button>
                  <button
                    onClick={() => navigateTo('teams')}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                      view === 'teams'
                        ? 'text-[#FF5520] bg-orange-50'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                    }`}
                  >
                    Hire Teams
                  </button>
                  <button
                    onClick={() => navigateTo('workspace', { projectId: 'proj-1' })}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                      view === 'workspace'
                        ? 'text-[#FF5520] bg-orange-50'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                    }`}
                  >
                    <Layers className="w-4 h-4 text-orange-500" />
                    Workspace
                  </button>
                  <button
                    onClick={() => navigateTo('post-project')}
                    className="ml-2 bg-[#FF5520] hover:bg-[#E04615] text-white px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all shadow-sm shadow-orange-500/25 flex items-center gap-1.5 hover:shadow-md"
                  >
                    <PlusCircle className="w-4 h-4" />
                    Post Project
                  </button>
                </>
              )}

              {role === 'admin' && (
                <>
                  <button
                    onClick={() => navigateTo('dashboard')}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                      view === 'dashboard'
                        ? 'text-[#FF5520] bg-orange-50'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                    }`}
                  >
                    Admin Console
                  </button>
                  <button
                    onClick={() => navigateTo('marketplace')}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                      view === 'marketplace'
                        ? 'text-[#FF5520] bg-orange-50'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                    }`}
                  >
                    Project Moderation
                  </button>
                  <button
                    onClick={() => navigateTo('disputes')}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                      view === 'disputes'
                        ? 'text-[#FF5520] bg-orange-50'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                    }`}
                  >
                    Disputes Center
                  </button>
                </>
              )}
            </nav>
          </div>

          {/* Right Section: Global Search, AI Assistant, Notifications, Profile */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Global Search Shortcut */}
            <button
              onClick={() => setIsGlobalSearchOpen(true)}
              className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200/80 text-slate-500 hover:text-slate-800 px-3 py-1.5 rounded-lg text-xs font-medium border border-slate-200 transition-colors"
              title="Search everything (Ctrl+K)"
            >
              <Search className="w-3.5 h-3.5 text-slate-400" />
              <span className="hidden lg:inline">Search projects, talent, posts...</span>
              <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-semibold text-slate-500 bg-white border border-slate-300 rounded shadow-2xs">
                ⌘K
              </kbd>
            </button>

            {/* AI Assistant Drawer Trigger */}
            <button
              onClick={() => setIsAiAssistantOpen(true)}
              className="relative p-2 rounded-xl bg-teal-50 hover:bg-teal-100/80 text-teal-700 border border-teal-200/70 transition-colors flex items-center gap-1.5 text-xs font-semibold"
              title="WorkNest AI Assistant"
            >
              <Sparkles className="w-4 h-4 text-teal-600" />
              <span className="hidden sm:inline">AI Help</span>
            </button>

            {/* Messages */}
            <button
              onClick={() => navigateTo('messages')}
              className={`relative p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors ${
                view === 'messages' ? 'bg-slate-100 text-slate-900' : ''
              }`}
              title="Messages"
            >
              <MessageSquare className="w-5 h-5" />
              {unreadMessagesCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#FF5520] ring-2 ring-white"></span>
              )}
            </button>

            {/* Saved Items */}
            <button
              onClick={() => navigateTo('saved')}
              className={`p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors ${
                view === 'saved' ? 'bg-slate-100 text-slate-900' : ''
              }`}
              title="Saved Items"
            >
              <Bookmark className="w-5 h-5" />
            </button>

            {/* Notifications Dropdown */}
            <div className="relative" ref={notifRef}>
              <button
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                className="relative p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                title="Notifications"
              >
                <Bell className="w-5 h-5" />
                {unreadNotifications.length > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 rounded-full bg-[#FF5520] text-white text-[10px] font-bold flex items-center justify-center ring-2 ring-white">
                    {unreadNotifications.length}
                  </span>
                )}
              </button>

              {isNotificationsOpen && (
                <div className="absolute right-0 mt-2 w-84 sm:w-96 bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="p-3.5 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm text-slate-900">Notifications</span>
                      <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-orange-100 text-[#FF5520]">
                        {unreadNotifications.length} new
                      </span>
                    </div>
                    {unreadNotifications.length > 0 && (
                      <button
                        onClick={markAllNotificationsAsRead}
                        className="text-xs text-[#FF5520] hover:text-[#E04615] font-medium"
                      >
                        Mark all as read
                      </button>
                    )}
                  </div>
                  
                  <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
                    {notifications.length === 0 ? (
                      <div className="p-6 text-center text-sm text-slate-400">
                        No notifications yet.
                      </div>
                    ) : (
                      notifications.map((n) => (
                        <div
                          key={n.id}
                          onClick={() => {
                            markNotificationAsRead(n.id);
                            if (n.actionUrl) {
                              if (n.actionUrl.includes('workspace')) navigateTo('workspace', { projectId: 'proj-1' });
                              if (n.actionUrl.includes('communities')) navigateTo('communities');
                              if (n.actionUrl.includes('projects')) navigateTo('marketplace');
                            }
                            setIsNotificationsOpen(false);
                          }}
                          className={`p-3.5 hover:bg-slate-50 cursor-pointer transition-colors flex items-start gap-3 ${
                            !n.isRead ? 'bg-orange-50/40' : ''
                          }`}
                        >
                          <div className={`w-2 h-2 mt-1.5 rounded-full shrink-0 ${
                            !n.isRead ? 'bg-[#FF5520]' : 'bg-transparent'
                          }`} />
                          <div className="flex-1">
                            <p className="text-xs font-semibold text-slate-900 leading-snug">
                              {n.title}
                            </p>
                            <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                              {n.description}
                            </p>
                            <span className="text-[10px] text-slate-400 mt-1 block">
                              {n.timestamp}
                            </span>
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  <div className="p-2 border-t border-slate-100 bg-slate-50 text-center">
                    <button
                      onClick={() => {
                        navigateTo('notifications');
                        setIsNotificationsOpen(false);
                      }}
                      className="text-xs font-semibold text-slate-700 hover:text-[#FF5520] transition-colors py-1 block w-full"
                    >
                      View All Notifications
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* User Profile Dropdown */}
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                className="flex items-center gap-2 p-1 rounded-xl hover:bg-slate-100 transition-colors"
              >
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-8 h-8 rounded-full object-cover ring-2 ring-[#FF5520]/20"
                />
                <span className="text-xs font-semibold text-slate-800 hidden xl:inline">
                  {currentUser.name.split(' ')[0]}
                </span>
              </button>

              {isProfileMenuOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden z-50">
                  <div className="p-3.5 border-b border-slate-100 bg-slate-50/70">
                    <p className="font-semibold text-sm text-slate-900">{currentUser.name}</p>
                    <p className="text-xs text-slate-500 truncate">{currentUser.email}</p>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-200 text-slate-800">
                        {role}
                      </span>
                      {currentUser.reputationScore && (
                        <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                          Reputation: {currentUser.reputationScore}/100
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="p-1.5 space-y-0.5 text-xs">
                    <button
                      onClick={() => {
                        navigateTo('dashboard');
                        setIsProfileMenuOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 rounded-lg text-slate-700 hover:bg-slate-100 flex items-center gap-2 font-medium"
                    >
                      <TrendingUp className="w-4 h-4 text-slate-500" />
                      Dashboard
                    </button>

                    <button
                      onClick={() => {
                        navigateTo('profile', { freelancerId: currentUser.id });
                        setIsProfileMenuOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 rounded-lg text-slate-700 hover:bg-slate-100 flex items-center gap-2 font-medium"
                    >
                      <UserIcon className="w-4 h-4 text-slate-500" />
                      My Public Profile
                    </button>

                    <button
                      onClick={() => {
                        navigateTo('settings');
                        setIsProfileMenuOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 rounded-lg text-slate-700 hover:bg-slate-100 flex items-center gap-2 font-medium"
                    >
                      <Settings className="w-4 h-4 text-slate-500" />
                      Account & Security
                    </button>

                    <button
                      onClick={() => {
                        navigateTo('disputes');
                        setIsProfileMenuOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 rounded-lg text-slate-700 hover:bg-slate-100 flex items-center gap-2 font-medium"
                    >
                      <HelpCircle className="w-4 h-4 text-slate-500" />
                      Help & Dispute Center
                    </button>

                    <div className="border-t border-slate-100 my-1"></div>

                    <button
                      onClick={() => {
                        openAuthModal('login');
                        setIsProfileMenuOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 rounded-lg text-slate-700 hover:bg-slate-100 flex items-center gap-2 font-medium"
                    >
                      <LogOut className="w-4 h-4 text-slate-500" />
                      Switch Account / Sign In
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-2">
          <div className="grid grid-cols-2 gap-2 pb-3 border-b border-slate-100">
            <button
              onClick={() => { navigateTo('home'); setIsMobileMenuOpen(false); }}
              className="text-left px-3 py-2 rounded-lg text-sm font-medium text-slate-800 bg-slate-50"
            >
              Home
            </button>
            <button
              onClick={() => { navigateTo('marketplace'); setIsMobileMenuOpen(false); }}
              className="text-left px-3 py-2 rounded-lg text-sm font-medium text-slate-800 bg-slate-50"
            >
              Find Work
            </button>
            <button
              onClick={() => { navigateTo('talent'); setIsMobileMenuOpen(false); }}
              className="text-left px-3 py-2 rounded-lg text-sm font-medium text-slate-800 bg-slate-50"
            >
              Find Talent
            </button>
            <button
              onClick={() => { navigateTo('feed'); setIsMobileMenuOpen(false); }}
              className="text-left px-3 py-2 rounded-lg text-sm font-medium text-slate-800 bg-slate-50"
            >
              Portfolio Feed
            </button>
            <button
              onClick={() => { navigateTo('communities'); setIsMobileMenuOpen(false); }}
              className="text-left px-3 py-2 rounded-lg text-sm font-medium text-slate-800 bg-slate-50"
            >
              Communities
            </button>
            <button
              onClick={() => { navigateTo('teams'); setIsMobileMenuOpen(false); }}
              className="text-left px-3 py-2 rounded-lg text-sm font-medium text-slate-800 bg-slate-50"
            >
              Teams
            </button>
            <button
              onClick={() => { navigateTo('workspace', { projectId: 'proj-1' }); setIsMobileMenuOpen(false); }}
              className="text-left px-3 py-2 rounded-lg text-sm font-medium text-slate-800 bg-slate-50 col-span-2 flex items-center justify-between"
            >
              <span>Project Workspace</span>
              <Layers className="w-4 h-4 text-[#FF5520]" />
            </button>
            <button
              onClick={() => { navigateTo('post-project'); setIsMobileMenuOpen(false); }}
              className="text-center px-3 py-2 rounded-lg text-sm font-medium text-white bg-[#FF5520] col-span-2 shadow-sm"
            >
              + Post a Project with AI
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
