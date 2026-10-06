import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Search, 
  UserCheck, 
  Star, 
  MapPin, 
  Check, 
  Sparkles, 
  Award, 
  ArrowRight, 
  Filter, 
  MessageSquare,
  ExternalLink
} from 'lucide-react';
import { User } from '../../types';

export const TalentDirectoryPage: React.FC = () => {
  const { 
    freelancers, 
    navigateTo, 
    toggleSaveItem, 
    isItemSaved,
    openSkillAssessment 
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSkill, setSelectedSkill] = useState<string>('All');
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [availabilityFilter, setAvailabilityFilter] = useState<'All' | 'Available' | 'Part-time'>('All');

  const popularSkills = ['All', 'Python', 'React', 'UI/UX', 'AI/ML', 'Mobile Development', 'DevOps'];

  const filteredTalent = freelancers.filter((f) => {
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch = !q || (
      f.name.toLowerCase().includes(q) ||
      f.headline.toLowerCase().includes(q) ||
      (f.skills || []).some(s => s.toLowerCase().includes(q))
    );

    const matchesSkill = selectedSkill === 'All' || (f.skills || []).some(s => s.toLowerCase() === selectedSkill.toLowerCase());
    const matchesVerified = !verifiedOnly || (f.verifiedSkills && f.verifiedSkills.length > 0);
    const matchesAvailability = availabilityFilter === 'All' || f.availability === availabilityFilter;

    return matchesSearch && matchesSkill && matchesVerified && matchesAvailability;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#FF5520] uppercase tracking-wider mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Talent & Proof Discovery</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Discover Verified Talent Through Real Work
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-xl">
            Skip self-reported resumes. Inspect verified code assessments, interactive deliverables, and reputation scores.
          </p>
        </div>

        <button
          onClick={() => openSkillAssessment('Python')}
          className="bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-xs transition-colors flex items-center gap-1.5 shrink-0"
        >
          <Award className="w-4 h-4 text-amber-300" />
          <span>Verify Your Skills</span>
        </button>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search talent by role, verified skill, or technology..."
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#FF5520] shadow-xs"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
          {popularSkills.map((skill) => (
            <button
              key={skill}
              onClick={() => setSelectedSkill(skill)}
              className={`px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedSkill === skill
                  ? 'bg-[#FF5520] text-white'
                  : 'bg-white hover:bg-slate-100 text-slate-600 border border-slate-200'
              }`}
            >
              {skill}
            </button>
          ))}
        </div>
      </div>

      {/* Toggles bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600 bg-white p-3 rounded-2xl border border-slate-200">
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2 cursor-pointer font-medium">
            <input
              type="checkbox"
              checked={verifiedOnly}
              onChange={(e) => setVerifiedOnly(e.target.checked)}
              className="rounded text-[#FF5520] focus:ring-[#FF5520]"
            />
            <span className="flex items-center gap-1">
              <Award className="w-3.5 h-3.5 text-teal-600" />
              Verified Skills Only
            </span>
          </label>

          <label className="flex items-center gap-1.5 cursor-pointer font-medium">
            <span>Availability:</span>
            <select
              value={availabilityFilter}
              onChange={(e) => setAvailabilityFilter(e.target.value as any)}
              className="bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-xs"
            >
              <option value="All">All Availabilities</option>
              <option value="Available">Available Now</option>
              <option value="Part-time">Part-time Only</option>
            </select>
          </label>
        </div>

        <span className="text-slate-400">
          Showing {filteredTalent.length} verified creators
        </span>
      </div>

      {/* Talent Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTalent.map((freelancer) => {
          const isSaved = isItemSaved('talent', freelancer.id);

          return (
            <div
              key={freelancer.id}
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs hover:shadow-md hover:border-slate-300 transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                
                {/* Header */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={freelancer.avatar}
                      alt={freelancer.name}
                      className="w-12 h-12 rounded-full object-cover ring-2 ring-orange-100 cursor-pointer"
                      onClick={() => navigateTo('profile', { freelancerId: freelancer.id })}
                    />
                    <div>
                      <h3
                        onClick={() => navigateTo('profile', { freelancerId: freelancer.id })}
                        className="text-base font-bold text-slate-900 hover:text-[#FF5520] cursor-pointer transition-colors"
                      >
                        {freelancer.name}
                      </h3>
                      <div className="flex items-center gap-1 text-xs text-amber-500 font-semibold">
                        <Star className="w-3.5 h-3.5 fill-current" />
                        <span>{freelancer.rating}</span>
                        <span className="text-slate-400">({freelancer.reviewsCount} reviews)</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-base font-extrabold text-slate-900">
                      ${freelancer.hourlyRate}
                    </span>
                    <span className="text-[10px] text-slate-400 block font-medium">/ hour</span>
                  </div>
                </div>

                <p className="text-xs font-semibold text-slate-700 leading-snug">
                  {freelancer.headline}
                </p>

                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                  {freelancer.bio}
                </p>

                {/* Verified Skills Badges */}
                {freelancer.verifiedSkills && freelancer.verifiedSkills.length > 0 && (
                  <div className="space-y-1 pt-1">
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                      Verified AI Credentials
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {freelancer.verifiedSkills.map((vs, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] font-bold text-teal-800 bg-teal-50 px-2 py-0.5 rounded-md border border-teal-200 flex items-center gap-1"
                        >
                          <Check className="w-3 h-3 text-teal-600" />
                          {vs.name} • {vs.level}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Reputation Score & Location */}
                <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-100">
                  <span className="text-slate-500 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    {freelancer.location?.split(',')[0]}
                  </span>
                  
                  {freelancer.reputationScore && (
                    <span className="font-bold text-[#FF5520] bg-orange-50 px-2 py-0.5 rounded border border-orange-200">
                      Reputation: {freelancer.reputationScore}/100
                    </span>
                  )}
                </div>

              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-slate-100 grid grid-cols-2 gap-2">
                <button
                  onClick={() => navigateTo('profile', { freelancerId: freelancer.id })}
                  className="w-full text-center text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 py-2 rounded-xl transition-colors"
                >
                  View Profile & Work
                </button>

                <button
                  onClick={() => navigateTo('messages')}
                  className="w-full text-center text-xs font-semibold text-white bg-[#FF5520] hover:bg-[#E04615] py-2 rounded-xl transition-colors shadow-xs"
                >
                  Contact / Hire
                </button>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
