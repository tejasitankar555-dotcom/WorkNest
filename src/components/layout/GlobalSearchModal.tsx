import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Search, 
  X, 
  Briefcase, 
  User, 
  Image as ImageIcon, 
  Users, 
  Layers, 
  Sparkles, 
  ArrowRight 
} from 'lucide-react';

export const GlobalSearchModal: React.FC = () => {
  const { 
    isGlobalSearchOpen, 
    setIsGlobalSearchOpen, 
    projects, 
    freelancers, 
    posts, 
    communities, 
    teams,
    navigateTo 
  } = useApp();

  const [query, setQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'projects' | 'freelancers' | 'posts' | 'communities' | 'teams'>('all');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsGlobalSearchOpen(!isGlobalSearchOpen);
      }
      if (e.key === 'Escape' && isGlobalSearchOpen) {
        setIsGlobalSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isGlobalSearchOpen, setIsGlobalSearchOpen]);

  if (!isGlobalSearchOpen) return null;

  const q = query.toLowerCase().trim();

  const filteredProjects = projects.filter(p => 
    p.title.toLowerCase().includes(q) || 
    p.category.toLowerCase().includes(q) || 
    p.skills.some(s => s.toLowerCase().includes(q))
  );

  const filteredFreelancers = freelancers.filter(f => 
    f.name.toLowerCase().includes(q) || 
    f.headline.toLowerCase().includes(q) || 
    (f.skills || []).some(s => s.toLowerCase().includes(q))
  );

  const filteredPosts = posts.filter(p => 
    p.title.toLowerCase().includes(q) || 
    p.description.toLowerCase().includes(q) || 
    p.skills.some(s => s.toLowerCase().includes(q))
  );

  const filteredCommunities = communities.filter(c => 
    c.name.toLowerCase().includes(q) || 
    c.description.toLowerCase().includes(q) || 
    c.tags.some(t => t.toLowerCase().includes(q))
  );

  const filteredTeams = teams.filter(t => 
    t.name.toLowerCase().includes(q) || 
    t.tagline.toLowerCase().includes(q) || 
    t.skills.some(s => s.toLowerCase().includes(q))
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[80vh]">
        
        {/* Search Input Bar */}
        <div className="p-4 border-b border-slate-200 flex items-center gap-3 bg-slate-50/50">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search projects, talent, proof of work, communities, teams..."
            className="flex-1 bg-transparent border-none outline-none text-slate-900 text-sm placeholder:text-slate-400 font-medium"
            autoFocus
          />
          {query && (
            <button onClick={() => setQuery('')} className="text-slate-400 hover:text-slate-600 p-1">
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-block px-2 py-0.5 text-xs text-slate-400 bg-white border border-slate-300 rounded shadow-2xs">
            ESC
          </kbd>
        </div>

        {/* Filter Pills */}
        <div className="px-4 py-2 border-b border-slate-100 flex items-center gap-2 overflow-x-auto text-xs font-medium">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-3 py-1 rounded-full transition-colors ${
              activeTab === 'all' ? 'bg-[#FF5520] text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            All Results
          </button>
          <button
            onClick={() => setActiveTab('projects')}
            className={`px-3 py-1 rounded-full transition-colors flex items-center gap-1 ${
              activeTab === 'projects' ? 'bg-[#FF5520] text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <Briefcase className="w-3 h-3" /> Projects ({filteredProjects.length})
          </button>
          <button
            onClick={() => setActiveTab('freelancers')}
            className={`px-3 py-1 rounded-full transition-colors flex items-center gap-1 ${
              activeTab === 'freelancers' ? 'bg-[#FF5520] text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <User className="w-3 h-3" /> Talent ({filteredFreelancers.length})
          </button>
          <button
            onClick={() => setActiveTab('posts')}
            className={`px-3 py-1 rounded-full transition-colors flex items-center gap-1 ${
              activeTab === 'posts' ? 'bg-[#FF5520] text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <ImageIcon className="w-3 h-3" /> Work Feed ({filteredPosts.length})
          </button>
          <button
            onClick={() => setActiveTab('communities')}
            className={`px-3 py-1 rounded-full transition-colors flex items-center gap-1 ${
              activeTab === 'communities' ? 'bg-[#FF5520] text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <Users className="w-3 h-3" /> Communities ({filteredCommunities.length})
          </button>
          <button
            onClick={() => setActiveTab('teams')}
            className={`px-3 py-1 rounded-full transition-colors flex items-center gap-1 ${
              activeTab === 'teams' ? 'bg-[#FF5520] text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <Layers className="w-3 h-3" /> Teams ({filteredTeams.length})
          </button>
        </div>

        {/* Results Container */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          
          {/* Projects section */}
          {(activeTab === 'all' || activeTab === 'projects') && filteredProjects.length > 0 && (
            <div className="space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block px-2">
                Projects ({filteredProjects.length})
              </span>
              <div className="space-y-1">
                {filteredProjects.slice(0, 3).map(p => (
                  <div
                    key={p.id}
                    onClick={() => {
                      navigateTo('marketplace');
                      setIsGlobalSearchOpen(false);
                    }}
                    className="p-3 rounded-xl hover:bg-slate-50 cursor-pointer border border-transparent hover:border-slate-200 transition-all flex items-center justify-between"
                  >
                    <div>
                      <h4 className="text-sm font-semibold text-slate-900">{p.title}</h4>
                      <p className="text-xs text-slate-500 mt-0.5">{p.clientName} • {p.budgetType === 'Fixed' ? `$${p.budgetMin} - $${p.budgetMax}` : `$${p.budgetMin}/hr`}</p>
                      <div className="flex flex-wrap gap-1 mt-1.5">
                        {p.skills.slice(0, 3).map(s => (
                          <span key={s} className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Freelancers section */}
          {(activeTab === 'all' || activeTab === 'freelancers') && filteredFreelancers.length > 0 && (
            <div className="space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block px-2">
                Verified Freelancers ({filteredFreelancers.length})
              </span>
              <div className="space-y-1">
                {filteredFreelancers.slice(0, 3).map(f => (
                  <div
                    key={f.id}
                    onClick={() => {
                      navigateTo('profile', { freelancerId: f.id });
                      setIsGlobalSearchOpen(false);
                    }}
                    className="p-3 rounded-xl hover:bg-slate-50 cursor-pointer border border-transparent hover:border-slate-200 transition-all flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <img src={f.avatar} alt={f.name} className="w-9 h-9 rounded-full object-cover" />
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h4 className="text-sm font-semibold text-slate-900">{f.name}</h4>
                          <span className="text-[10px] font-bold text-teal-700 bg-teal-50 px-1.5 py-0.5 rounded border border-teal-200">
                            Verified ✓
                          </span>
                        </div>
                        <p className="text-xs text-slate-500">{f.headline}</p>
                      </div>
                    </div>
                    <span className="text-xs font-semibold text-slate-700">${f.hourlyRate}/hr</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Portfolio posts section */}
          {(activeTab === 'all' || activeTab === 'posts') && filteredPosts.length > 0 && (
            <div className="space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block px-2">
                Portfolio Proof of Work ({filteredPosts.length})
              </span>
              <div className="space-y-1">
                {filteredPosts.slice(0, 2).map(post => (
                  <div
                    key={post.id}
                    onClick={() => {
                      navigateTo('feed', { postId: post.id });
                      setIsGlobalSearchOpen(false);
                    }}
                    className="p-3 rounded-xl hover:bg-slate-50 cursor-pointer border border-transparent hover:border-slate-200 transition-all flex items-center gap-3"
                  >
                    <img src={post.mediaUrl} alt={post.title} className="w-14 h-14 rounded-lg object-cover shrink-0" />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-semibold text-slate-900 truncate">{post.title}</h4>
                      <p className="text-xs text-slate-500 truncate">{post.authorName} • {post.category}</p>
                      {post.aiInsights && (
                        <span className="inline-flex items-center gap-1 text-[10px] text-teal-700 font-medium mt-1">
                          <Sparkles className="w-2.5 h-2.5 text-teal-500" />
                          AI Quality Score: {post.aiInsights.workQualityScore}/10
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Communities & Teams */}
          {(activeTab === 'all' || activeTab === 'communities') && filteredCommunities.length > 0 && (
            <div className="space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block px-2">
                Communities ({filteredCommunities.length})
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {filteredCommunities.slice(0, 2).map(c => (
                  <div
                    key={c.id}
                    onClick={() => {
                      navigateTo('community-detail', { communityId: c.id });
                      setIsGlobalSearchOpen(false);
                    }}
                    className="p-3 rounded-xl border border-slate-200 hover:border-orange-300 hover:bg-orange-50/20 cursor-pointer transition-all"
                  >
                    <h5 className="text-xs font-bold text-slate-900">{c.name}</h5>
                    <p className="text-[11px] text-slate-500 mt-1 line-clamp-1">{c.description}</p>
                    <span className="text-[10px] text-[#FF5520] font-semibold mt-1 inline-block">
                      {c.membersCount.toLocaleString()} members
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {filteredProjects.length === 0 && filteredFreelancers.length === 0 && filteredPosts.length === 0 && (
            <div className="py-12 text-center text-slate-400">
              <Search className="w-8 h-8 mx-auto mb-2 text-slate-300" />
              <p className="text-sm font-medium">No results found for "{query}"</p>
              <p className="text-xs mt-1">Try searching for "React", "AI", "Figma", or "Python"</p>
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="p-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>Search indexed across all WorkNest databases</span>
          <span className="font-medium text-slate-700">ESC to exit</span>
        </div>
      </div>
    </div>
  );
};
