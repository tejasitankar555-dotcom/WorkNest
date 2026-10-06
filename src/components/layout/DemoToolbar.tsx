import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Sparkles, 
  UserCheck, 
  Briefcase, 
  ShieldCheck, 
  Cpu, 
  GraduationCap, 
  Users, 
  FolderGit2 
} from 'lucide-react';

export const DemoToolbar: React.FC = () => {
  const { 
    role, 
    setRole, 
    navigateTo, 
    openSkillAssessment, 
    setIsAiAssistantOpen,
    setIsCreateTeamModalOpen 
  } = useApp();

  return (
    <div className="bg-slate-900 text-white text-xs border-b border-slate-800 px-4 py-2 select-none relative z-40">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* Role Switcher */}
        <div className="flex items-center gap-2">
          <span className="text-slate-400 font-semibold tracking-wider uppercase text-[10px] flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Prototype Role:
          </span>
          <div className="flex bg-slate-800/90 rounded-lg p-0.5 border border-slate-700">
            <button
              onClick={() => setRole('freelancer')}
              className={`px-3 py-1 rounded-md font-medium transition-all flex items-center gap-1.5 ${
                role === 'freelancer'
                  ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-sm'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <UserCheck className="w-3.5 h-3.5" />
              Freelancer (Aditya)
            </button>
            <button
              onClick={() => setRole('client')}
              className={`px-3 py-1 rounded-md font-medium transition-all flex items-center gap-1.5 ${
                role === 'client'
                  ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-sm'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Briefcase className="w-3.5 h-3.5" />
              Client (Apex AI)
            </button>
            <button
              onClick={() => setRole('admin')}
              className={`px-3 py-1 rounded-md font-medium transition-all flex items-center gap-1.5 ${
                role === 'admin'
                  ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-sm'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              Admin
            </button>
          </div>
        </div>

        {/* Quick feature shortcuts */}
        <div className="flex items-center gap-2 overflow-x-auto py-0.5">
          <span className="text-slate-400 text-[11px] hidden lg:inline">Quick Test:</span>
          
          <button
            onClick={() => navigateTo('post-project')}
            className="bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-orange-500/50 text-slate-200 px-2.5 py-1 rounded-md flex items-center gap-1.5 transition-colors"
          >
            <Sparkles className="w-3 h-3 text-orange-400" />
            AI Project Breakdown
          </button>

          <button
            onClick={() => navigateTo('workspace', { projectId: 'proj-1' })}
            className="bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-teal-500/50 text-slate-200 px-2.5 py-1 rounded-md flex items-center gap-1.5 transition-colors"
          >
            <Cpu className="w-3 h-3 text-teal-400" />
            AI Work Inspector
          </button>

          <button
            onClick={() => openSkillAssessment('Python')}
            className="bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-amber-500/50 text-slate-200 px-2.5 py-1 rounded-md flex items-center gap-1.5 transition-colors"
          >
            <GraduationCap className="w-3 h-3 text-amber-400" />
            Skill Assessment
          </button>

          <button
            onClick={() => setIsCreateTeamModalOpen(true)}
            className="bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-indigo-500/50 text-slate-200 px-2.5 py-1 rounded-md flex items-center gap-1.5 transition-colors"
          >
            <Users className="w-3 h-3 text-indigo-400" />
            Team Formation
          </button>

          <button
            onClick={() => setIsAiAssistantOpen(true)}
            className="bg-gradient-to-r from-teal-500/20 to-cyan-500/20 hover:from-teal-500/30 hover:to-cyan-500/30 border border-teal-500/40 text-teal-300 px-2.5 py-1 rounded-md flex items-center gap-1.5 transition-colors font-medium"
          >
            <Sparkles className="w-3 h-3 text-teal-300" />
            AI Assistant
          </button>
        </div>
      </div>
    </div>
  );
};
