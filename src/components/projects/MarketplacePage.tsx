import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Search, 
  Briefcase, 
  DollarSign, 
  Clock, 
  Filter, 
  Bookmark, 
  Sparkles, 
  MapPin, 
  Star, 
  Layers, 
  Check, 
  ArrowRight 
} from 'lucide-react';
import { Project } from '../../types';

export const MarketplacePage: React.FC = () => {
  const { 
    projects, 
    openApplyModal, 
    toggleSaveItem, 
    isItemSaved, 
    navigateTo 
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedBudgetType, setSelectedBudgetType] = useState<'All' | 'Fixed' | 'Hourly'>('All');
  const [selectedExperience, setSelectedExperience] = useState<'All' | 'Entry' | 'Intermediate' | 'Expert'>('All');
  const [sortBy, setSortBy] = useState<'recent' | 'budget_high' | 'proposals_low'>('recent');

  const categories = ['All', 'Web Development', 'AI/ML', 'UI/UX', 'Mobile Development', 'DevOps & Cloud'];

  // Filter logic
  const filteredProjects = projects.filter((p) => {
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch = !q || (
      p.title.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.skills.some(s => s.toLowerCase().includes(q))
    );

    const matchesCategory = selectedCategory === 'All' || p.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesBudget = selectedBudgetType === 'All' || p.budgetType === selectedBudgetType;
    const matchesExperience = selectedExperience === 'All' || p.experienceLevel === selectedExperience;

    return matchesSearch && matchesCategory && matchesBudget && matchesExperience;
  }).sort((a, b) => {
    if (sortBy === 'budget_high') return b.budgetMax - a.budgetMax;
    if (sortBy === 'proposals_low') return a.proposalsCount - b.proposalsCount;
    return 0; // default recent
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#FF5520] uppercase tracking-wider mb-1">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Project Marketplace</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Discover Verified Freelance Contracts
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-xl">
            Contracts powered by AI milestone roadmaps, guaranteed escrow deposits, and autonomous work quality inspectors.
          </p>
        </div>

        <button
          onClick={() => navigateTo('post-project')}
          className="bg-[#FF5520] hover:bg-[#E04615] text-white text-xs font-semibold px-5 py-2.5 rounded-xl shadow-md shadow-orange-500/20 transition-all shrink-0"
        >
          Post a Project
        </button>
      </div>

      {/* Search & Category Pills */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search contracts by skills (e.g. React, LangChain, Figma, Python)..."
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#FF5520] shadow-xs"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-700 focus:outline-none focus:border-[#FF5520] font-medium shadow-xs"
            >
              <option value="recent">Sort: Most Recent</option>
              <option value="budget_high">Highest Budget</option>
              <option value="proposals_low">Fewest Proposals</option>
            </select>
          </div>
        </div>

        {/* Categories */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? 'bg-[#FF5520] text-white shadow-2xs'
                  : 'bg-white hover:bg-slate-100 text-slate-600 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Main Layout: Filters sidebar + Projects list */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Left Filter Sidebar */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-6 h-fit">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <span className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <Filter className="w-3.5 h-3.5 text-slate-500" />
              Filter Contracts
            </span>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSelectedBudgetType('All');
                setSelectedExperience('All');
                setSearchQuery('');
              }}
              className="text-[11px] text-[#FF5520] hover:underline"
            >
              Reset
            </button>
          </div>

          {/* Budget Type */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-800">Budget Type</label>
            <div className="space-y-1.5 text-xs">
              {(['All', 'Fixed', 'Hourly'] as const).map(type => (
                <label key={type} className="flex items-center gap-2 cursor-pointer text-slate-600 hover:text-slate-900">
                  <input
                    type="radio"
                    name="budgetType"
                    checked={selectedBudgetType === type}
                    onChange={() => setSelectedBudgetType(type)}
                    className="text-[#FF5520] focus:ring-[#FF5520]"
                  />
                  <span>{type === 'All' ? 'All Formats' : `${type} Price`}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Experience Level */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-800">Experience Tier</label>
            <div className="space-y-1.5 text-xs">
              {(['All', 'Expert', 'Intermediate', 'Entry'] as const).map(tier => (
                <label key={tier} className="flex items-center gap-2 cursor-pointer text-slate-600 hover:text-slate-900">
                  <input
                    type="radio"
                    name="experience"
                    checked={selectedExperience === tier}
                    onChange={() => setSelectedExperience(tier)}
                    className="text-[#FF5520] focus:ring-[#FF5520]"
                  />
                  <span>{tier === 'All' ? 'Any Experience' : tier}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Trust Banner */}
          <div className="p-3 bg-teal-50 border border-teal-200 rounded-xl text-xs text-teal-950 space-y-1">
            <span className="font-bold flex items-center gap-1 text-teal-800">
              <Sparkles className="w-3.5 h-3.5 text-teal-600" />
              100% Escrow Funded
            </span>
            <p className="text-[11px] text-teal-800 leading-snug">
              Every contract on WorkNest requires milestone funds locked in escrow before project kickoff.
            </p>
          </div>
        </div>

        {/* Right Projects List */}
        <div className="lg:col-span-3 space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-500 px-1">
            <span>Showing {filteredProjects.length} available contracts</span>
          </div>

          {filteredProjects.length === 0 ? (
            <div className="bg-white p-12 rounded-2xl border border-slate-200 text-center space-y-3">
              <Briefcase className="w-8 h-8 mx-auto text-slate-300" />
              <h4 className="text-sm font-bold text-slate-700">No matching contracts found</h4>
              <p className="text-xs text-slate-500">Try adjusting your category or keyword filters.</p>
            </div>
          ) : (
            filteredProjects.map((project) => {
              const isSaved = isItemSaved('projects', project.id);

              return (
                <div
                  key={project.id}
                  className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs hover:border-slate-300 hover:shadow-md transition-all space-y-4"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-bold text-[#FF5520] bg-orange-50 px-2.5 py-0.5 rounded-full border border-orange-200">
                          {project.category}
                        </span>
                        <span className="text-[11px] text-slate-400">• Posted {project.postedAt}</span>
                        {project.isRemote && (
                          <span className="text-[11px] text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-200 font-medium">
                            Remote
                          </span>
                        )}
                      </div>

                      <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug hover:text-[#FF5520] cursor-pointer transition-colors"
                        onClick={() => openApplyModal(project)}
                      >
                        {project.title}
                      </h3>
                    </div>

                    <div className="text-right shrink-0">
                      <div className="text-base sm:text-lg font-extrabold text-slate-900">
                        {project.budgetType === 'Fixed'
                          ? `$${project.budgetMin.toLocaleString()} - $${project.budgetMax.toLocaleString()}`
                          : `$${project.budgetMin} - $${project.budgetMax}/hr`}
                      </div>
                      <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider block">
                        {project.budgetType} Budget
                      </span>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Skills tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {project.skills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] bg-slate-50 text-slate-700 px-2.5 py-0.5 rounded-md border border-slate-200 font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* AI Breakdown Indicator */}
                  {project.aiBreakdown && (
                    <div className="p-3 bg-teal-50/60 border border-teal-200/60 rounded-xl text-xs flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-3.5 h-3.5 text-teal-600" />
                        <span className="font-semibold text-teal-900">AI Milestone Roadmap:</span>
                        <span className="text-slate-600">4 Phased Milestones • {project.aiBreakdown.estimatedTimeline}</span>
                      </div>
                      <span className="text-teal-800 font-bold">
                        Complexity: {project.aiBreakdown.complexityScore}/10
                      </span>
                    </div>
                  )}

                  {/* Client & Proposals Footer */}
                  <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-3">
                      <img
                        src={project.clientAvatar}
                        alt={project.clientName}
                        className="w-7 h-7 rounded-full object-cover ring-1 ring-slate-200"
                      />
                      <div>
                        <div className="flex items-center gap-1 font-semibold text-slate-800">
                          <span>{project.clientName}</span>
                          <span className="flex items-center text-amber-500 text-[10px]">
                            <Star className="w-3 h-3 fill-current ml-1" />
                            {project.clientRating}
                          </span>
                        </div>
                        <span className="text-[10px] text-slate-400">
                          ${project.clientSpent.toLocaleString()} spent • {project.location}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                      <button
                        onClick={() => toggleSaveItem('projects', project.id)}
                        className={`p-2 rounded-xl border transition-colors ${
                          isSaved ? 'text-[#FF5520] border-orange-200 bg-orange-50' : 'text-slate-400 hover:text-slate-700 border-slate-200'
                        }`}
                        title="Save Job"
                      >
                        <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
                      </button>

                      <button
                        onClick={() => openApplyModal(project)}
                        className="bg-[#FF5520] hover:bg-[#E04615] text-white text-xs font-semibold px-4 py-2 rounded-xl transition-all shadow-xs flex items-center gap-1.5"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Apply with AI</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

      </div>
    </div>
  );
};
