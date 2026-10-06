import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Heart, 
  MessageSquare, 
  Bookmark, 
  Share2, 
  Sparkles, 
  ExternalLink, 
  PlusCircle, 
  Cpu, 
  Check, 
  Eye, 
  Send,
  UserCheck,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { GithubIcon } from '../common/Icons';
import { PortfolioPost } from '../../types';

export const PortfolioFeedPage: React.FC = () => {
  const { 
    posts, 
    toggleLikePost, 
    toggleSavePost, 
    addPostComment, 
    setIsCreatePostModalOpen, 
    navigateTo, 
    addToast,
    role 
  } = useApp();

  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [expandedComments, setExpandedComments] = useState<{ [postId: string]: boolean }>({});
  const [commentInputs, setCommentInputs] = useState<{ [postId: string]: string }>({});
  const [expandedAiInsights, setExpandedAiInsights] = useState<{ [postId: string]: boolean }>({
    'post-1': true,
    'post-2': true
  });

  const categories = ['All', 'AI/ML', 'Web Development', 'UI/UX', 'Mobile Development'];

  const filteredPosts = activeCategory === 'All' 
    ? posts 
    : posts.filter(p => p.category.toLowerCase() === activeCategory.toLowerCase());

  const handleShare = (post: PortfolioPost) => {
    navigator.clipboard?.writeText(window.location.href);
    addToast(`Link to "${post.title}" copied to clipboard!`, 'info');
  };

  const toggleComments = (postId: string) => {
    setExpandedComments(prev => ({ ...prev, [postId]: !prev[postId] }));
  };

  const toggleAi = (postId: string) => {
    setExpandedAiInsights(prev => ({ ...prev, [postId]: !prev[postId] }));
  };

  const submitComment = (postId: string) => {
    const text = commentInputs[postId];
    if (!text || !text.trim()) return;
    addPostComment(postId, text);
    setCommentInputs(prev => ({ ...prev, [postId]: '' }));
    setExpandedComments(prev => ({ ...prev, [postId]: true }));
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      
      {/* Feed Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#FF5520] uppercase tracking-wider mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Social Portfolio Feed</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Proof of Work: Real Projects & Engineering
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Discover verified talent by inspecting their production code, Figma tokens, and AI-inspected deliverables.
          </p>
        </div>

        <button
          onClick={() => setIsCreatePostModalOpen(true)}
          className="bg-[#FF5520] hover:bg-[#E04615] text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-md shadow-orange-500/20 flex items-center gap-2 transition-all shrink-0"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Add to Portfolio</span>
        </button>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
              activeCategory === cat
                ? 'bg-[#FF5520] text-white shadow-xs'
                : 'bg-white hover:bg-slate-100 text-slate-600 border border-slate-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Posts List */}
      <div className="space-y-8">
        {filteredPosts.map((post) => {
          const isCommentsOpen = !!expandedComments[post.id];
          const isAiOpen = !!expandedAiInsights[post.id];

          return (
            <article
              key={post.id}
              className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden transition-all hover:border-slate-300"
            >
              {/* Post Header */}
              <div className="p-5 flex items-center justify-between border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <img
                    src={post.authorAvatar}
                    alt={post.authorName}
                    className="w-10 h-10 rounded-full object-cover ring-2 ring-orange-100 cursor-pointer"
                    onClick={() => navigateTo('profile', { freelancerId: post.authorId })}
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <h3
                        onClick={() => navigateTo('profile', { freelancerId: post.authorId })}
                        className="text-sm font-bold text-slate-900 hover:text-[#FF5520] cursor-pointer transition-colors"
                      >
                        {post.authorName}
                      </h3>
                      <span className="text-[10px] font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-full border border-teal-200">
                        Verified ✓
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 line-clamp-1">{post.authorHeadline}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-slate-400">{post.createdAt}</span>
                  <button
                    onClick={() => navigateTo('profile', { freelancerId: post.authorId })}
                    className="hidden sm:inline-flex items-center gap-1 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 px-3 py-1 rounded-lg transition-colors"
                  >
                    <UserCheck className="w-3.5 h-3.5 text-slate-600" />
                    Hire
                  </button>
                </div>
              </div>

              {/* Post Title & Description */}
              <div className="px-6 pt-4 pb-2 space-y-2">
                <div className="flex items-center justify-between">
                  <h2 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                    {post.title}
                  </h2>
                  <span className="text-[11px] font-bold text-[#FF5520] bg-orange-50 px-2.5 py-0.5 rounded-full border border-orange-200">
                    {post.category}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                  {post.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {post.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="text-[11px] font-medium bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-md border border-slate-200"
                    >
                      #{skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Media Showcase */}
              <div className="mt-3 relative bg-slate-900">
                <img
                  src={post.mediaUrl}
                  alt={post.title}
                  className="w-full max-h-[460px] object-cover"
                />
                
                {/* Overlay live links */}
                <div className="absolute bottom-3 right-3 flex items-center gap-2">
                  {post.liveUrl && (
                    <a
                      href={post.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="bg-slate-900/80 hover:bg-slate-900 text-white text-xs font-semibold px-3 py-1.5 rounded-lg backdrop-blur-md border border-white/20 flex items-center gap-1.5 transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      Live Demo
                    </a>
                  )}
                  {post.githubUrl && (
                    <a
                      href={post.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="bg-slate-900/80 hover:bg-slate-900 text-white text-xs font-semibold px-3 py-1.5 rounded-lg backdrop-blur-md border border-white/20 flex items-center gap-1.5 transition-colors"
                    >
                      <GithubIcon className="w-3.5 h-3.5" />
                      Repository
                    </a>
                  )}
                </div>
              </div>

              {/* AI Work Analysis Section */}
              {post.aiInsights && (post.aiInsights.isPublic || post.authorId === 'fl-1') && (
                <div className="mx-5 my-4 rounded-2xl border border-teal-200/80 bg-gradient-to-r from-teal-50/60 to-orange-50/40 p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Cpu className="w-4 h-4 text-teal-600" />
                      <span className="text-xs font-bold text-slate-900">
                        WorkNest AI Proof-of-Work Verification
                      </span>
                      <span className="text-[10px] text-teal-700 bg-teal-100 font-bold px-1.5 py-0.2 rounded">
                        Audited
                      </span>
                    </div>

                    <button
                      onClick={() => toggleAi(post.id)}
                      className="text-xs font-semibold text-slate-500 hover:text-slate-800 flex items-center gap-1"
                    >
                      <span>{isAiOpen ? 'Collapse Insights' : 'Expand Insights'}</span>
                      {isAiOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </button>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                    <div className="bg-white p-2.5 rounded-xl border border-teal-100">
                      <span className="text-[10px] text-slate-400 uppercase font-bold block">Complexity</span>
                      <span className="font-bold text-[#FF5520]">{post.aiInsights.complexityScore}/10 ({post.aiInsights.complexityLabel})</span>
                    </div>
                    <div className="bg-white p-2.5 rounded-xl border border-teal-100">
                      <span className="text-[10px] text-slate-400 uppercase font-bold block">Work Quality</span>
                      <span className="font-bold text-teal-700">{post.aiInsights.workQualityScore}/10</span>
                    </div>
                    <div className="bg-white p-2.5 rounded-xl border border-teal-100">
                      <span className="text-[10px] text-slate-400 uppercase font-bold block">Usability</span>
                      <span className="font-bold text-slate-900">{post.aiInsights.usabilityScore}/10</span>
                    </div>
                    <div className="bg-white p-2.5 rounded-xl border border-teal-100">
                      <span className="text-[10px] text-slate-400 uppercase font-bold block">Architecture</span>
                      <span className="font-bold text-slate-900">{post.aiInsights.codeArchitectureScore}/10</span>
                    </div>
                  </div>

                  {isAiOpen && (
                    <div className="space-y-3 pt-2 border-t border-teal-200/50 text-xs">
                      <div>
                        <span className="font-semibold text-slate-800 block mb-1">Detected Skills Verified in Code:</span>
                        <div className="flex flex-wrap gap-1">
                          {post.aiInsights.detectedSkills.map((s, idx) => (
                            <span key={idx} className="bg-white text-slate-700 text-[10px] font-semibold px-2 py-0.5 rounded border border-slate-200">
                              ✓ {s}
                            </span>
                          ))}
                        </div>
                      </div>

                      {post.aiInsights.highlights.length > 0 && (
                        <div>
                          <span className="font-semibold text-teal-900 block mb-1">Engineering Highlights:</span>
                          <ul className="list-disc pl-4 space-y-0.5 text-slate-700 text-[11px]">
                            {post.aiInsights.highlights.map((h, idx) => (
                              <li key={idx}>{h}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {post.aiInsights.suggestedImprovements.length > 0 && (
                        <div className="p-2.5 bg-white/80 rounded-xl border border-orange-200 text-[11px] text-slate-700">
                          <span className="font-bold text-[#FF5520] block mb-0.5">AI Suggested Improvements:</span>
                          {post.aiInsights.suggestedImprovements.join(' • ')}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* Action Buttons: Like, Comment, Save, Share */}
              <div className="px-6 py-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-600">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => toggleLikePost(post.id)}
                    className={`flex items-center gap-1.5 transition-colors ${
                      post.isLiked ? 'text-rose-500 font-bold' : 'hover:text-slate-900'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${post.isLiked ? 'fill-current' : ''}`} />
                    <span>{post.likesCount}</span>
                  </button>

                  <button
                    onClick={() => toggleComments(post.id)}
                    className="flex items-center gap-1.5 hover:text-slate-900 transition-colors"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>{post.commentsCount}</span>
                  </button>

                  <button
                    onClick={() => toggleSavePost(post.id)}
                    className={`flex items-center gap-1.5 transition-colors ${
                      post.isSaved ? 'text-[#FF5520] font-bold' : 'hover:text-slate-900'
                    }`}
                  >
                    <Bookmark className={`w-4 h-4 ${post.isSaved ? 'fill-current' : ''}`} />
                    <span>{post.savesCount}</span>
                  </button>

                  <button
                    onClick={() => handleShare(post)}
                    className="hover:text-slate-900 transition-colors"
                    title="Share link"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>

                <button
                  onClick={() => navigateTo('profile', { freelancerId: post.authorId })}
                  className="bg-[#FF5520] hover:bg-[#E04615] text-white px-3.5 py-1.5 rounded-xl font-semibold transition-colors flex items-center gap-1"
                >
                  <span>Hire Freelancer</span>
                </button>
              </div>

              {/* Expandable Comments Drawer */}
              {isCommentsOpen && (
                <div className="p-5 border-t border-slate-100 bg-slate-50/70 space-y-4">
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                    Comments & Technical Discussion ({post.comments?.length || 0})
                  </h4>

                  {/* Comments list */}
                  <div className="space-y-3">
                    {(post.comments || []).map((c) => (
                      <div key={c.id} className="flex items-start gap-2.5 text-xs">
                        <img src={c.authorAvatar} alt={c.authorName} className="w-7 h-7 rounded-full object-cover shrink-0" />
                        <div className="flex-1 bg-white p-3 rounded-xl border border-slate-200">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-bold text-slate-900">{c.authorName}</span>
                            <span className="text-[10px] text-slate-400">{c.createdAt}</span>
                          </div>
                          <p className="text-slate-700 leading-relaxed">{c.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Add comment input */}
                  <div className="flex items-center gap-2 pt-2">
                    <input
                      type="text"
                      value={commentInputs[post.id] || ''}
                      onChange={(e) => setCommentInputs({ ...commentInputs, [post.id]: e.target.value })}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') submitComment(post.id);
                      }}
                      placeholder="Add technical feedback or question..."
                      className="flex-1 bg-white border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 placeholder:text-slate-400 outline-none focus:border-[#FF5520]"
                    />
                    <button
                      onClick={() => submitComment(post.id)}
                      className="p-2 bg-[#FF5520] hover:bg-[#E04615] text-white rounded-xl shadow-xs transition-colors"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </article>
          );
        })}
      </div>
    </div>
  );
};
