import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Users, 
  ArrowLeft, 
  Sparkles, 
  ThumbsUp, 
  MessageSquare, 
  PlusCircle, 
  Zap, 
  Award, 
  Check, 
  Send,
  Share2,
  FileCode,
  Calendar
} from 'lucide-react';
import { CommunityDiscussion } from '../../types';

export const CommunityDetailPage: React.FC = () => {
  const { 
    selectedCommunityId, 
    communities, 
    discussions, 
    addDiscussion, 
    upvoteDiscussion, 
    replyDiscussion, 
    toggleJoinCommunity, 
    currentUser, 
    navigateTo, 
    addToast 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'discussions' | 'challenges' | 'resources' | 'members'>('discussions');
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newCategory, setNewCategory] = useState<'Discussion' | 'Question' | 'Resource'>('Discussion');
  const [replyInputs, setReplyInputs] = useState<{ [id: string]: string }>({});

  const community = communities.find(c => c.id === selectedCommunityId) || communities[0];
  const commDiscussions = discussions.filter(d => d.communityId === community.id);

  const handlePostDiscussion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    addDiscussion({
      communityId: community.id,
      authorId: currentUser.id,
      authorName: currentUser.name,
      authorAvatar: currentUser.avatar,
      authorBadge: currentUser.verifiedSkills?.[0] ? `Verified ${currentUser.verifiedSkills[0].name}` : undefined,
      title: newTitle.trim(),
      content: newContent.trim(),
      category: newCategory,
      isUpvoted: true,
      tags: community.tags.slice(0, 3)
    });

    setNewTitle('');
    setNewContent('');
    setIsCreateOpen(false);
  };

  const submitReply = (discId: string) => {
    const text = replyInputs[discId];
    if (!text || !text.trim()) return;
    replyDiscussion(discId, text);
    setReplyInputs(prev => ({ ...prev, [discId]: '' }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Back button */}
      <button
        onClick={() => navigateTo('communities')}
        className="text-xs font-semibold text-slate-500 hover:text-slate-800 flex items-center gap-1.5 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to All Communities
      </button>

      {/* Community Banner Card */}
      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="h-44 sm:h-56 relative bg-slate-900">
          <img
            src={community.bannerUrl}
            alt={community.name}
            className="w-full h-full object-cover opacity-75"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
          
          <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4 text-white">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-white/20 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-white/20">
                {community.category}
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold mt-1 tracking-tight">
                {community.name}
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
                {community.description}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => toggleJoinCommunity(community.id)}
                className={`px-5 py-2.5 rounded-xl text-xs font-semibold shadow-md transition-all ${
                  community.isJoined
                    ? 'bg-emerald-600 text-white'
                    : 'bg-[#FF5520] hover:bg-[#E04615] text-white'
                }`}
              >
                {community.isJoined ? 'Joined Member ✓' : 'Join Guild'}
              </button>

              <button
                onClick={() => setIsCreateOpen(true)}
                className="bg-white hover:bg-slate-100 text-slate-900 px-4 py-2.5 rounded-xl text-xs font-semibold shadow-sm transition-colors flex items-center gap-1.5"
              >
                <PlusCircle className="w-4 h-4 text-[#FF5520]" />
                <span>New Topic</span>
              </button>
            </div>
          </div>
        </div>

        {/* Tab navigation */}
        <div className="px-6 border-b border-slate-200 flex items-center gap-4 text-xs font-bold bg-slate-50/50">
          <button
            onClick={() => setActiveTab('discussions')}
            className={`py-3.5 border-b-2 transition-colors ${
              activeTab === 'discussions'
                ? 'border-[#FF5520] text-[#FF5520]'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            Discussions & Questions ({commDiscussions.length})
          </button>

          <button
            onClick={() => setActiveTab('challenges')}
            className={`py-3.5 border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === 'challenges'
                ? 'border-[#FF5520] text-[#FF5520]'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Zap className="w-3.5 h-3.5 text-amber-500" />
            Active Challenge (1)
          </button>

          <button
            onClick={() => setActiveTab('resources')}
            className={`py-3.5 border-b-2 transition-colors ${
              activeTab === 'resources'
                ? 'border-[#FF5520] text-[#FF5520]'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            Resources & Repos
          </button>

          <button
            onClick={() => setActiveTab('members')}
            className={`py-3.5 border-b-2 transition-colors ${
              activeTab === 'members'
                ? 'border-[#FF5520] text-[#FF5520]'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            Experts & Members ({community.membersCount.toLocaleString()})
          </button>
        </div>
      </div>

      {/* Main Tab Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Feed (2 cols) */}
        <div className="lg:col-span-2 space-y-6">
          
          {activeTab === 'discussions' && (
            <div className="space-y-4">
              {commDiscussions.map((disc) => (
                <div
                  key={disc.id}
                  className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <img src={disc.authorAvatar} alt={disc.authorName} className="w-9 h-9 rounded-full object-cover" />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-900 text-xs">{disc.authorName}</span>
                          {disc.authorBadge && (
                            <span className="text-[10px] font-bold text-teal-800 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                              {disc.authorBadge}
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] text-slate-400">{disc.createdAt}</span>
                      </div>
                    </div>

                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                      {disc.category}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-slate-900">{disc.title}</h3>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed whitespace-pre-line">
                      {disc.content}
                    </p>
                  </div>

                  {/* Answers if present */}
                  {disc.answers && disc.answers.length > 0 && (
                    <div className="space-y-2 pt-2 border-t border-slate-100">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                        Verified Solution
                      </span>
                      {disc.answers.map(ans => (
                        <div key={ans.id} className="p-3.5 bg-emerald-50/60 border border-emerald-200 rounded-xl text-xs space-y-1">
                          <div className="flex items-center justify-between font-bold text-emerald-950">
                            <span className="flex items-center gap-1.5">
                              <Check className="w-3.5 h-3.5 text-emerald-600" />
                              Accepted Answer by {ans.authorName}
                            </span>
                            <span className="text-[10px] text-emerald-800">{ans.createdAt}</span>
                          </div>
                          <p className="text-slate-700 leading-relaxed">{ans.content}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Upvote & Reply Row */}
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => upvoteDiscussion(disc.id)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-colors ${
                          disc.isUpvoted
                            ? 'bg-orange-50 border-orange-200 text-[#FF5520] font-bold'
                            : 'border-slate-200 hover:bg-slate-50 text-slate-600'
                        }`}
                      >
                        <ThumbsUp className="w-3.5 h-3.5" />
                        <span>{disc.upvotesCount}</span>
                      </button>

                      <span className="text-slate-500 flex items-center gap-1">
                        <MessageSquare className="w-3.5 h-3.5" />
                        {disc.repliesCount} replies
                      </span>
                    </div>
                  </div>

                  {/* Reply Input Bar */}
                  <div className="flex items-center gap-2 pt-1">
                    <input
                      type="text"
                      value={replyInputs[disc.id] || ''}
                      onChange={(e) => setReplyInputs({ ...replyInputs, [disc.id]: e.target.value })}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') submitReply(disc.id);
                      }}
                      placeholder="Write an architectural reply..."
                      className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 placeholder:text-slate-400 outline-none focus:border-[#FF5520]"
                    />
                    <button
                      onClick={() => submitReply(disc.id)}
                      className="p-2 bg-[#FF5520] hover:bg-[#E04615] text-white rounded-xl shadow-xs transition-colors"
                    >
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </div>

                </div>
              ))}
            </div>
          )}

          {activeTab === 'challenges' && community.activeChallenge && (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6 text-xs">
              <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-900 bg-amber-200/80 px-2 py-0.5 rounded">
                  Community Hackathon Challenge
                </span>
                <h3 className="text-lg font-bold text-amber-950">{community.activeChallenge.title}</h3>
                <p className="text-slate-700 leading-relaxed text-xs">
                  {community.activeChallenge.description}
                </p>
                <div className="flex items-center gap-4 font-bold text-amber-900 pt-2 border-t border-amber-200">
                  <span>Prize: {community.activeChallenge.reward}</span>
                  <span>•</span>
                  <span>{community.activeChallenge.daysLeft} Days Remaining</span>
                  <span>•</span>
                  <span>{community.activeChallenge.participantsCount} Engineers Registered</span>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-bold text-slate-900 uppercase tracking-wider text-xs">
                  Submission Guidelines & Criteria
                </h4>
                <ul className="list-disc pl-4 space-y-1 text-slate-600">
                  <li>Repository must include automated tests with 85%+ coverage.</li>
                  <li>Live deployed demonstration must be accessible via HTTPS.</li>
                  <li>WorkNest AI will autonomously evaluate code complexity and hallucination bounds.</li>
                </ul>
              </div>

              <button
                onClick={() => addToast('Registered for the 48-Hour Agent Challenge!', 'success')}
                className="bg-[#FF5520] hover:bg-[#E04615] text-white font-semibold px-5 py-2.5 rounded-xl shadow-xs transition-colors"
              >
                Register & Submit Solution
              </button>
            </div>
          )}

          {activeTab === 'resources' && (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4 text-xs">
              <h3 className="font-bold text-slate-900 uppercase tracking-wider">
                Curated Guild Resources & Boilerplates
              </h3>
              <div className="space-y-2">
                <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <FileCode className="w-4 h-4 text-teal-600" />
                    <div>
                      <span className="font-bold text-slate-900 block">langgraph-agent-circuit-breaker.py</span>
                      <span className="text-[11px] text-slate-500">Loop prevention algorithm with persistent memory rollback</span>
                    </div>
                  </div>
                  <span className="font-bold text-[#FF5520]">Download</span>
                </div>
                <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <FileCode className="w-4 h-4 text-teal-600" />
                    <div>
                      <span className="font-bold text-slate-900 block">rag-eval-benchmark-suite.zip</span>
                      <span className="text-[11px] text-slate-500">Automated hallucination metric test runner</span>
                    </div>
                  </div>
                  <span className="font-bold text-[#FF5520]">Download</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'members' && (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                Featured Guild Experts
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {community.featuredExperts.map((exp, idx) => (
                  <div key={idx} className="p-3 rounded-xl border border-slate-200 flex items-center gap-3 text-xs">
                    <img src={exp.avatar} alt={exp.name} className="w-9 h-9 rounded-full object-cover" />
                    <div>
                      <span className="font-bold text-slate-900 block">{exp.name}</span>
                      <span className="text-slate-500">{exp.role}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Sidebar (1 col) */}
        <div className="space-y-6 text-xs">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
              About This Community
            </h4>
            <p className="text-slate-600 leading-relaxed">
              {community.description}
            </p>
            <div className="pt-2 border-t border-slate-100 space-y-1.5 text-slate-500">
              <div className="flex justify-between">
                <span>Total Members:</span>
                <span className="font-bold text-slate-900">{community.membersCount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Total Posts & Q&A:</span>
                <span className="font-bold text-slate-900">{community.postsCount.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Form Team CTA */}
          <div className="bg-gradient-to-br from-indigo-900 to-slate-900 text-white p-5 rounded-2xl shadow-md space-y-3">
            <span className="text-[10px] font-bold uppercase tracking-wider text-teal-300">
              Squad Opportunity
            </span>
            <h4 className="font-bold text-sm">Need Collaborators for an Enterprise Bid?</h4>
            <p className="text-slate-300 text-xs leading-relaxed">
              Clients are hiring pre-assembled squads 3x faster. Invite members of this guild to form a team.
            </p>
            <button
              onClick={() => navigateTo('teams')}
              className="w-full bg-[#FF5520] hover:bg-[#E04615] text-white font-semibold py-2 rounded-xl transition-colors shadow-xs"
            >
              Explore Teams
            </button>
          </div>
        </div>

      </div>

      {/* New Topic Modal */}
      {isCreateOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-slate-200 p-6 space-y-4 animate-in zoom-in-95 duration-150 text-xs">
            <h3 className="font-bold text-base text-slate-900">Start a Community Topic</h3>

            <form onSubmit={handlePostDiscussion} className="space-y-3">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Topic Type</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200"
                >
                  <option value="Discussion">Discussion / Architecture Debate</option>
                  <option value="Question">Technical Question (Q&A)</option>
                  <option value="Resource">Open-Source Code / Resource</option>
                </select>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Title</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Best practices for state consistency in React 19..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-200"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Content</label>
                <textarea
                  rows={4}
                  required
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  placeholder="Share details, code snippets, or architectural tradeoffs..."
                  className="w-full p-3 rounded-xl border border-slate-200"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsCreateOpen(false)}
                  className="px-4 py-2 text-slate-600 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#FF5520] hover:bg-[#E04615] text-white font-semibold px-5 py-2.5 rounded-xl shadow-xs"
                >
                  Publish Topic
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
