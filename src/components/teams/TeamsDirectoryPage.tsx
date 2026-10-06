import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Users, 
  Sparkles, 
  Star, 
  ArrowRight, 
  PlusCircle, 
  ShieldCheck, 
  Briefcase,
  Check
} from 'lucide-react';
import { FreelancerTeam } from '../../types';

export const TeamsDirectoryPage: React.FC = () => {
  const { 
    teams, 
    navigateTo, 
    setIsCreateTeamModalOpen,
    role,
    addToast 
  } = useApp();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#FF5520] uppercase tracking-wider mb-1">
            <Users className="w-3.5 h-3.5" />
            <span>Cross-Functional Squads</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            High-Performing Freelancer Teams
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-xl">
            Hire pre-assembled squads of vetted engineers, UI designers, and AI specialists. Guaranteed milestone execution with cohesive synergy.
          </p>
        </div>

        <button
          onClick={() => setIsCreateTeamModalOpen(true)}
          className="bg-[#FF5520] hover:bg-[#E04615] text-white text-xs font-semibold px-5 py-2.5 rounded-xl shadow-md shadow-orange-500/20 transition-all flex items-center gap-2 shrink-0"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Form a New Team</span>
        </button>
      </div>

      {/* Teams Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {teams.map((team) => (
          <div
            key={team.id}
            className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md hover:border-slate-300 transition-all flex flex-col justify-between"
          >
            <div>
              {/* Banner */}
              <div className="h-36 relative bg-slate-900">
                <img
                  src={team.bannerUrl}
                  alt={team.name}
                  className="w-full h-full object-cover opacity-70"
                />
                <div className="absolute top-4 right-4 bg-teal-600/90 text-white backdrop-blur-md px-2.5 py-0.5 rounded-full text-xs font-bold flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  Synergy Score: {team.synergyScore}%
                </div>
              </div>

              {/* Body */}
              <div className="p-6 space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2 className="text-xl font-bold text-slate-900">{team.name}</h2>
                    <p className="text-xs font-semibold text-slate-600 mt-0.5">{team.tagline}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-extrabold text-slate-900">${team.hourlyRateCombined}</span>
                    <span className="text-[10px] text-slate-400 block font-medium">Combined / hr</span>
                  </div>
                </div>

                <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                  {team.description}
                </p>

                {/* Team Members */}
                <div className="space-y-2 pt-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                    Squad Members ({team.members.length} Specialists)
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    {team.members.map((member) => (
                      <div key={member.id} className="p-2 rounded-xl border border-slate-200 bg-slate-50/50 flex items-center gap-2 text-xs">
                        <img src={member.avatar} alt={member.name} className="w-8 h-8 rounded-full object-cover shrink-0" />
                        <div className="min-w-0">
                          <span className="font-bold text-slate-900 block truncate">{member.name}</span>
                          <span className="text-[10px] text-slate-500 truncate block">{member.role}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Combined skills */}
                <div className="flex flex-wrap gap-1 pt-1">
                  {team.skills.map((skill, idx) => (
                    <span key={idx} className="bg-slate-100 text-slate-700 text-[10px] font-semibold px-2 py-0.5 rounded border border-slate-200">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="p-6 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between text-xs">
              <div className="flex items-center gap-1 font-bold text-amber-500">
                <Star className="w-3.5 h-3.5 fill-current" />
                <span>{team.rating} ({team.completedProjectsCount} Squad Projects)</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    addToast(`Team hire inquiry initiated for "${team.name}"!`, 'info');
                    navigateTo('post-project');
                  }}
                  className="bg-[#FF5520] hover:bg-[#E04615] text-white font-semibold px-4 py-2 rounded-xl transition-all shadow-xs flex items-center gap-1"
                >
                  <Briefcase className="w-3.5 h-3.5" />
                  <span>Hire Entire Squad</span>
                </button>
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
