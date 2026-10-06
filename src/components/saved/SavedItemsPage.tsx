import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Bookmark, 
  Briefcase, 
  User, 
  Layers, 
  Users, 
  Trash2, 
  ArrowRight,
  Sparkles
} from 'lucide-react';

export const SavedItemsPage: React.FC = () => {
  const { 
    savedItems, 
    toggleSaveItem, 
    projects, 
    freelancers, 
    posts, 
    communities, 
    navigateTo 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'projects' | 'talent' | 'posts' | 'communities'>('projects');

  const savedProjectsList = projects.filter(p => savedItems.projects.includes(p.id));
  const savedTalentList = freelancers.filter(f => savedItems.talent.includes(f.id));
  const savedPostsList = posts.filter(p => savedItems.posts.includes(p.id));
  const savedCommunitiesList = communities.filter(c => savedItems.communities.includes(c.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#FF5520] uppercase tracking-wider mb-1">
            <Bookmark className="w-3.5 h-3.5" />
            <span>Saved Library</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Bookmarked Contracts, Talent & Proof of Work
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Quickly reference your shortlisted opportunities and inspiration.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 overflow-x-auto text-xs font-bold">
        <button
          onClick={() => setActiveTab('projects')}
          className={`pb-3 px-3 transition-colors border-b-2 flex items-center gap-1.5 ${
            activeTab === 'projects'
              ? 'border-[#FF5520] text-[#FF5520]'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          <Briefcase className="w-3.5 h-3.5" />
          Saved Contracts ({savedProjectsList.length})
        </button>

        <button
          onClick={() => setActiveTab('talent')}
          className={`pb-3 px-3 transition-colors border-b-2 flex items-center gap-1.5 ${
            activeTab === 'talent'
              ? 'border-[#FF5520] text-[#FF5520]'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          <User className="w-3.5 h-3.5" />
          Shortlisted Talent ({savedTalentList.length})
        </button>

        <button
          onClick={() => setActiveTab('posts')}
          className={`pb-3 px-3 transition-colors border-b-2 flex items-center gap-1.5 ${
            activeTab === 'posts'
              ? 'border-[#FF5520] text-[#FF5520]'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          Saved Portfolio Posts ({savedPostsList.length})
        </button>

        <button
          onClick={() => setActiveTab('communities')}
          className={`pb-3 px-3 transition-colors border-b-2 flex items-center gap-1.5 ${
            activeTab === 'communities'
              ? 'border-[#FF5520] text-[#FF5520]'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          <Users className="w-3.5 h-3.5" />
          Bookmarked Communities ({savedCommunitiesList.length})
        </button>
      </div>

      {/* Tab Panels */}
      {activeTab === 'projects' && (
        <div className="space-y-4">
          {savedProjectsList.length === 0 ? (
            <p className="text-xs text-slate-400 py-8 text-center">No saved contracts yet.</p>
          ) : (
            savedProjectsList.map(p => (
              <div key={p.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between text-xs">
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">{p.title}</h4>
                  <p className="text-slate-500">{p.clientName} • ${p.budgetMin} - ${p.budgetMax}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleSaveItem('projects', p.id)}
                    className="p-2 text-slate-400 hover:text-rose-500 rounded-lg"
                    title="Remove"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => navigateTo('marketplace')}
                    className="bg-[#FF5520] text-white px-3 py-1.5 rounded-xl font-semibold"
                  >
                    View Project
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {activeTab === 'talent' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {savedTalentList.map(f => (
            <div key={f.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3 text-xs">
              <div className="flex items-center gap-3">
                <img src={f.avatar} alt={f.name} className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <h4 className="font-bold text-slate-900">{f.name}</h4>
                  <span className="text-[11px] text-slate-500">{f.headline.split('&')[0]}</span>
                </div>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                <button
                  onClick={() => toggleSaveItem('talent', f.id)}
                  className="text-slate-400 hover:text-rose-500 text-xs"
                >
                  Remove
                </button>
                <button
                  onClick={() => navigateTo('profile', { freelancerId: f.id })}
                  className="text-[#FF5520] font-semibold hover:underline"
                >
                  View Profile →
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'posts' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {savedPostsList.map(post => (
            <div key={post.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs text-xs">
              <img src={post.mediaUrl} alt={post.title} className="w-full h-40 object-cover" />
              <div className="p-4 space-y-2">
                <h4 className="font-bold text-slate-900 text-sm line-clamp-1">{post.title}</h4>
                <p className="text-slate-500 line-clamp-2">{post.description}</p>
                <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                  <span className="text-slate-400">By {post.authorName}</span>
                  <button
                    onClick={() => navigateTo('feed')}
                    className="text-[#FF5520] font-semibold hover:underline"
                  >
                    View in Feed →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'communities' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {savedCommunitiesList.map(c => (
            <div key={c.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2 text-xs">
              <h4 className="font-bold text-slate-900">{c.name}</h4>
              <p className="text-slate-500 line-clamp-2">{c.description}</p>
              <button
                onClick={() => navigateTo('community-detail', { communityId: c.id })}
                className="text-[#FF5520] font-semibold hover:underline pt-2 block"
              >
                Go to Community Hub →
              </button>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
