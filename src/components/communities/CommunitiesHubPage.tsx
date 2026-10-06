import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Users, 
  Sparkles, 
  MessageSquare, 
  Zap, 
  ArrowRight, 
  Check, 
  Plus, 
  TrendingUp,
  Search,
  Code,
  Award
} from 'lucide-react';
import { Community } from '../../types';

export const CommunitiesHubPage: React.FC = () => {
  const { 
    communities, 
    toggleJoinCommunity, 
    navigateTo 
  } = useApp();

  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'AI/ML', 'Web Development', 'UI/UX', 'Mobile Development', 'Freelance Growth'];

  const filteredCommunities = communities.filter(c => {
    const q = search.toLowerCase().trim();
    const matchSearch = !q || c.name.toLowerCase().includes(q) || c.description.toLowerCase().includes(q);
    const matchCat = activeCategory === 'All' || c.category.toLowerCase() === activeCategory.toLowerCase();
    return matchSearch && matchCat;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#FF5520] uppercase tracking-wider mb-1">
            <Users className="w-3.5 h-3.5" />
            <span>Skill-Based Collectives</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Freelancer Communities & Engineering Guilds
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-xl">
            Join vetted practitioners, participate in cash-prize code challenges, collaborate on client bids, and share open-source resources.
          </p>
        </div>

        <button
          onClick={() => navigateTo('teams')}
          className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-xs transition-colors flex items-center gap-1.5 shrink-0"
        >
          <Sparkles className="w-3.5 h-3.5 text-teal-400" />
          <span>Form a Freelancer Team</span>
        </button>
      </div>

      {/* Search & Categories */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search communities by skill, challenge, or topic..."
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#FF5520] shadow-xs"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                activeCategory === cat
                  ? 'bg-[#FF5520] text-white shadow-2xs'
                  : 'bg-white hover:bg-slate-100 text-slate-600 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Communities */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCommunities.map((community) => (
          <div
            key={community.id}
            className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:border-slate-300 hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              {/* Banner */}
              <div className="h-32 relative overflow-hidden bg-slate-900">
                <img
                  src={community.bannerUrl}
                  alt={community.name}
                  className="w-full h-full object-cover opacity-80"
                />
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2.5 py-0.5 rounded-full text-[10px] font-bold text-slate-900 shadow-2xs">
                  {community.category}
                </div>
              </div>

              {/* Body */}
              <div className="p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <h3
                    onClick={() => navigateTo('community-detail', { communityId: community.id })}
                    className="font-bold text-base text-slate-900 hover:text-[#FF5520] cursor-pointer transition-colors"
                  >
                    {community.name}
                  </h3>
                </div>

                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {community.description}
                </p>

                {/* Active Challenge Callout */}
                {community.activeChallenge && (
                  <div className="p-3 bg-amber-50/80 border border-amber-200 rounded-xl text-xs space-y-1">
                    <span className="font-bold text-amber-950 flex items-center gap-1">
                      <Zap className="w-3.5 h-3.5 text-amber-600" />
                      {community.activeChallenge.title}
                    </span>
                    <p className="text-[11px] text-amber-800">
                      Reward: {community.activeChallenge.reward} • {community.activeChallenge.daysLeft} days left
                    </p>
                  </div>
                )}

                {/* Tags */}
                <div className="flex flex-wrap gap-1 pt-1">
                  {community.tags.map((tag, idx) => (
                    <span key={idx} className="bg-slate-100 text-slate-700 text-[10px] px-2 py-0.5 rounded">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between text-xs">
              <span className="text-slate-500 font-medium">
                {community.membersCount.toLocaleString()} members
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleJoinCommunity(community.id)}
                  className={`px-3 py-1.5 rounded-xl font-semibold transition-all ${
                    community.isJoined
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : 'bg-white border border-slate-200 text-slate-700 hover:border-slate-300'
                  }`}
                >
                  {community.isJoined ? 'Joined ✓' : 'Join Community'}
                </button>

                <button
                  onClick={() => navigateTo('community-detail', { communityId: community.id })}
                  className="bg-[#FF5520] hover:bg-[#E04615] text-white p-2 rounded-xl transition-colors"
                  title="Open Community Hub"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
