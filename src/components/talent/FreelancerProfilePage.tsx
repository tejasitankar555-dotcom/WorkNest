import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Star, 
  MapPin, 
  Check, 
  Sparkles, 
  Award, 
  MessageSquare, 
  Briefcase, 
  Calendar, 
  ExternalLink, 
  ShieldCheck, 
  UserCheck, 
  Cpu, 
  TrendingUp,
  Layers,
  Heart
} from 'lucide-react';
import { MOCK_REVIEWS } from '../../data/mockData';

export const FreelancerProfilePage: React.FC = () => {
  const { 
    selectedFreelancerId, 
    freelancers, 
    currentUser, 
    posts, 
    openSkillAssessment, 
    navigateTo, 
    addToast 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'overview' | 'skills' | 'portfolio' | 'reviews' | 'reputation'>('overview');

  const profileUser = freelancers.find(f => f.id === selectedFreelancerId) || currentUser;
  const isOwnProfile = profileUser.id === currentUser.id;

  const userPosts = posts.filter(p => p.authorId === profileUser.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Profile Card */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
        
        {/* Banner Graphic */}
        <div className="h-36 sm:h-48 bg-gradient-to-r from-slate-900 via-slate-800 to-orange-950/80 relative">
          <div className="absolute top-4 right-4 flex items-center gap-2">
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white border border-white/20">
              WorkNest Verified Creator
            </span>
          </div>
        </div>

        {/* Profile Content Details */}
        <div className="px-6 pb-6 pt-0 sm:px-8 relative">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 -mt-16 sm:-mt-20 mb-6">
            
            <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4">
              <img
                src={profileUser.avatar}
                alt={profileUser.name}
                className="w-28 h-28 sm:w-36 sm:h-36 rounded-3xl object-cover ring-4 ring-white shadow-lg bg-white"
              />
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                    {profileUser.name}
                  </h1>
                  <span className="text-xs font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-full border border-teal-200 flex items-center gap-1">
                    <Check className="w-3 h-3 text-teal-600" />
                    Verified ✓
                  </span>
                </div>
                <p className="text-sm font-semibold text-slate-700">{profileUser.headline}</p>
                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 pt-0.5">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    {profileUser.location || 'Remote'}
                  </span>
                  <span>•</span>
                  <span className="flex items-center text-amber-500 font-bold">
                    <Star className="w-3.5 h-3.5 fill-current mr-1" />
                    {profileUser.rating} ({profileUser.reviewsCount} reviews)
                  </span>
                  <span>•</span>
                  <span className="text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    {profileUser.availability}
                  </span>
                </div>
              </div>
            </div>

            {/* Actions & Rate */}
            <div className="flex flex-col sm:items-end gap-2 w-full sm:w-auto">
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-extrabold text-slate-900">${profileUser.hourlyRate}</span>
                <span className="text-xs text-slate-400 font-medium">/ hour</span>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={() => navigateTo('messages')}
                  className="flex-1 sm:flex-none border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold px-4 py-2.5 rounded-xl transition-colors flex items-center justify-center gap-1.5"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Message</span>
                </button>

                <button
                  onClick={() => {
                    addToast(`Contract invitation opened for ${profileUser.name}`, 'info');
                    navigateTo('post-project');
                  }}
                  className="flex-1 sm:flex-none bg-[#FF5520] hover:bg-[#E04615] text-white text-xs font-semibold px-5 py-2.5 rounded-xl shadow-md shadow-orange-500/20 transition-all flex items-center justify-center gap-1.5"
                >
                  <UserCheck className="w-3.5 h-3.5" />
                  <span>Hire Freelancer</span>
                </button>
              </div>
            </div>

          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-2 border-b border-slate-200 overflow-x-auto text-xs font-bold">
            <button
              onClick={() => setActiveTab('overview')}
              className={`pb-3 px-3 transition-colors border-b-2 ${
                activeTab === 'overview'
                  ? 'border-[#FF5520] text-[#FF5520]'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              Overview & Bio
            </button>

            <button
              onClick={() => setActiveTab('skills')}
              className={`pb-3 px-3 transition-colors border-b-2 flex items-center gap-1.5 ${
                activeTab === 'skills'
                  ? 'border-[#FF5520] text-[#FF5520]'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              <Award className="w-3.5 h-3.5" />
              Verified Skills ({profileUser.verifiedSkills?.length || 0})
            </button>

            <button
              onClick={() => setActiveTab('portfolio')}
              className={`pb-3 px-3 transition-colors border-b-2 flex items-center gap-1.5 ${
                activeTab === 'portfolio'
                  ? 'border-[#FF5520] text-[#FF5520]'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              Work Feed Posts ({userPosts.length})
            </button>

            <button
              onClick={() => setActiveTab('reviews')}
              className={`pb-3 px-3 transition-colors border-b-2 ${
                activeTab === 'reviews'
                  ? 'border-[#FF5520] text-[#FF5520]'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              Client Reviews ({MOCK_REVIEWS.length})
            </button>

            <button
              onClick={() => setActiveTab('reputation')}
              className={`pb-3 px-3 transition-colors border-b-2 flex items-center gap-1.5 ${
                activeTab === 'reputation'
                  ? 'border-[#FF5520] text-[#FF5520]'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              <TrendingUp className="w-3.5 h-3.5 text-[#FF5520]" />
              WorkNest Reputation ({profileUser.reputationScore || 96}/100)
            </button>
          </div>
        </div>

      </div>

      {/* Tab Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Content Area (2 cols) */}
        <div className="lg:col-span-2 space-y-6">
          
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* About */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">About Aditya</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                  {profileUser.bio || 'Experienced engineering specialist delivering high-performance web applications and agentic workflows.'}
                </p>
              </div>

              {/* Verified Proof Highlights */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center justify-between">
                  <span>Work Proof Highlights</span>
                  <span className="text-xs font-semibold text-teal-700">AST Tested</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {userPosts.map(p => (
                    <div key={p.id} className="border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
                      <img src={p.mediaUrl} alt={p.title} className="w-full h-36 object-cover" />
                      <div className="p-3.5 space-y-1.5 text-xs">
                        <span className="text-[10px] font-bold text-[#FF5520] bg-orange-50 px-2 py-0.5 rounded">
                          {p.category}
                        </span>
                        <h4 className="font-bold text-slate-900 line-clamp-1">{p.title}</h4>
                        {p.aiInsights && (
                          <span className="text-[11px] text-teal-700 font-semibold block">
                            AI Quality: {p.aiInsights.workQualityScore}/10 • {p.aiInsights.complexityLabel}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'skills' && (
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                    AI-Verified Skill Assessments
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Evaluated through hands-on technical problem sets and algorithmic benchmarks.
                  </p>
                </div>

                <button
                  onClick={() => openSkillAssessment('Python')}
                  className="bg-[#FF5520] hover:bg-[#E04615] text-white text-xs font-semibold px-4 py-2 rounded-xl transition-colors shadow-xs flex items-center gap-1.5"
                >
                  <Award className="w-3.5 h-3.5" />
                  <span>Take Assessment</span>
                </button>
              </div>

              <div className="space-y-3">
                {(profileUser.verifiedSkills || []).map((skill, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl border border-teal-200 bg-teal-50/50 flex items-center justify-between text-xs"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-teal-600 text-white flex items-center justify-center font-bold">
                        <Check className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-slate-900 text-sm">{skill.name}</h4>
                          <span className="text-[10px] font-bold text-teal-800 bg-teal-100 px-2 py-0.5 rounded-full">
                            Verified ✓
                          </span>
                        </div>
                        <p className="text-slate-500 text-[11px]">Level: {skill.level} • Benchmarked {skill.verifiedAt}</p>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-base font-extrabold text-teal-900">{skill.score}%</span>
                      <span className="text-[10px] text-slate-400 block font-medium">Evaluation Score</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* All Skills List */}
              <div className="pt-4 border-t border-slate-100 space-y-2">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                  All Listed Technologies & Competencies
                </span>
                <div className="flex flex-wrap gap-2">
                  {(profileUser.skills || []).map((s, idx) => (
                    <span key={idx} className="bg-slate-100 text-slate-800 text-xs px-3 py-1.5 rounded-lg border border-slate-200 font-medium">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'portfolio' && (
            <div className="space-y-6">
              {userPosts.map(post => (
                <div key={post.id} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-bold text-slate-900">{post.title}</h3>
                    <span className="text-xs font-bold text-[#FF5520] bg-orange-50 px-2.5 py-0.5 rounded-full border border-orange-200">
                      {post.category}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{post.description}</p>
                  <img src={post.mediaUrl} alt={post.title} className="w-full h-56 object-cover rounded-xl" />
                  {post.aiInsights && (
                    <div className="p-3 bg-teal-50 border border-teal-200 rounded-xl text-xs space-y-1">
                      <span className="font-bold text-teal-900 block">AI Code Quality Audit: {post.aiInsights.workQualityScore}/10</span>
                      <p className="text-[11px] text-teal-800">
                        {post.aiInsights.highlights.join(' • ')}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-6">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                Verified Client Reviews ({MOCK_REVIEWS.length})
              </h3>
              <div className="space-y-4">
                {MOCK_REVIEWS.map(rev => (
                  <div key={rev.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <img src={rev.reviewerAvatar} alt={rev.reviewerName} className="w-7 h-7 rounded-full object-cover" />
                        <div>
                          <span className="font-bold text-slate-900 block">{rev.reviewerName}</span>
                          <span className="text-[10px] text-slate-400">{rev.projectTitle}</span>
                        </div>
                      </div>
                      <div className="flex items-center text-amber-500 font-bold">
                        <Star className="w-3.5 h-3.5 fill-current mr-1" />
                        {rev.ratingOverall}
                      </div>
                    </div>
                    <p className="text-slate-700 leading-relaxed italic">
                      "{rev.comment}"
                    </p>
                    <div className="grid grid-cols-4 gap-2 pt-2 border-t border-slate-200/60 text-[10px] text-slate-500">
                      <span>Communication: 5.0</span>
                      <span>Quality: 5.0</span>
                      <span>Timeliness: 5.0</span>
                      <span>Professionalism: 5.0</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'reputation' && (
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                    WorkNest Reputation Score Breakdown
                  </h3>
                  <p className="text-xs text-slate-500">
                    Transparent mathematical formula based on verified work, not bought reviews.
                  </p>
                </div>
                <span className="text-3xl font-extrabold text-[#FF5520]">
                  {profileUser.reputationScore || 96}<span className="text-base text-slate-400 font-normal">/100</span>
                </span>
              </div>

              <div className="space-y-4 text-xs">
                <div>
                  <div className="flex justify-between font-semibold text-slate-800 mb-1">
                    <span>1. Completed Contracts & Milestone Delivery (40% Weight)</span>
                    <span className="text-emerald-600 font-bold">98 / 100</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2">
                    <div className="bg-emerald-500 h-2 rounded-full w-[98%]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between font-semibold text-slate-800 mb-1">
                    <span>2. AI Practical Skill Verification (25% Weight)</span>
                    <span className="text-teal-600 font-bold">96 / 100</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2">
                    <div className="bg-teal-500 h-2 rounded-full w-[96%]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between font-semibold text-slate-800 mb-1">
                    <span>3. Client Milestone Reviews & Ratings (20% Weight)</span>
                    <span className="text-amber-500 font-bold">99 / 100</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2">
                    <div className="bg-amber-500 h-2 rounded-full w-[99%]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between font-semibold text-slate-800 mb-1">
                    <span>4. Community Q&A & Open-Source Artifacts (15% Weight)</span>
                    <span className="text-indigo-600 font-bold">91 / 100</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2">
                    <div className="bg-indigo-500 h-2 rounded-full w-[91%]" />
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Sidebar Info (1 col) */}
        <div className="space-y-6">
          {/* Key Metrics */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4 text-xs">
            <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
              Contract Highlights
            </h4>
            <div className="space-y-2.5">
              <div className="flex justify-between">
                <span className="text-slate-500">Completed Contracts:</span>
                <span className="font-bold text-slate-900">{profileUser.completedProjectsCount || 42}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">First-Milestone Approval:</span>
                <span className="font-bold text-emerald-600">96.8%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Average Turnaround:</span>
                <span className="font-bold text-slate-900">3.2 Weeks</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Member Since:</span>
                <span className="font-bold text-slate-900">{profileUser.joinedDate || 'March 2024'}</span>
              </div>
            </div>
          </div>

          {/* Education & Certifications */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3 text-xs">
            <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
              Education & Certifications
            </h4>
            <div className="space-y-2 text-slate-600">
              {(profileUser.education || ['B.S. in Computer Science, UC Berkeley']).map((edu, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-1.5 shrink-0" />
                  <span>{edu}</span>
                </div>
              ))}
              {(profileUser.certifications || ['AWS Certified Solutions Architect']).map((cert, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-500 mt-1.5 shrink-0" />
                  <span>{cert}</span>
                </div>
              ))}
            </div>
          </div>

          {/* External Links */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3 text-xs">
            <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
              Verified External Handles
            </h4>
            <div className="space-y-2">
              {(profileUser.portfolioLinks || []).map((link, idx) => (
                <a
                  key={idx}
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between text-slate-700 hover:text-[#FF5520] transition-colors p-2 bg-slate-50 rounded-xl"
                >
                  <span className="font-medium">{link.title}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
