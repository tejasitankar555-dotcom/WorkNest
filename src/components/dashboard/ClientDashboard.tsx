import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Briefcase, 
  Sparkles, 
  Cpu, 
  CheckCircle2, 
  Clock, 
  DollarSign, 
  Users, 
  ArrowRight, 
  UserCheck, 
  Check, 
  Layers 
} from 'lucide-react';

export const ClientDashboard: React.FC = () => {
  const { 
    currentUser, 
    projects, 
    freelancers, 
    openAiWorkAnalysisModal, 
    approveMilestone, 
    navigateTo 
  } = useApp();

  const clientProjects = projects.filter(p => p.clientId === currentUser.id || p.clientId === 'cl-1');
  const activeProject = clientProjects[0] || projects[0];
  const pendingMilestone = activeProject?.milestones?.find(m => m.status === 'Submitted');

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="w-16 h-16 rounded-2xl object-cover ring-2 ring-orange-200"
          />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-slate-900">
                {currentUser.name} ({currentUser.companyName || 'Apex AI Labs'})
              </h1>
              <span className="text-[10px] font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-full border border-teal-200">
                Verified Client
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Hiring Lead • {currentUser.location || 'Austin, TX'}
            </p>
          </div>
        </div>

        <button
          onClick={() => navigateTo('post-project')}
          className="bg-[#FF5520] hover:bg-[#E04615] text-white text-xs font-semibold px-5 py-2.5 rounded-xl shadow-md shadow-orange-500/20 transition-all shrink-0"
        >
          + Post New Project with AI
        </button>
      </div>

      {/* 4 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-1">
          <span className="text-xs text-slate-500 font-medium">Active Contracts</span>
          <div className="flex items-baseline gap-1 text-2xl font-extrabold text-slate-900">
            {clientProjects.length}
          </div>
          <span className="text-[11px] text-teal-700 font-semibold">1 awaiting your review</span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-1">
          <span className="text-xs text-slate-500 font-medium">Secured in Escrow</span>
          <div className="flex items-baseline gap-1 text-2xl font-extrabold text-[#FF5520]">
            $5,500<span className="text-xs text-slate-400 font-normal">.00</span>
          </div>
          <span className="text-[11px] text-slate-400">Guaranteed completion</span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-1">
          <span className="text-xs text-slate-500 font-medium">Total Lifetime Spend</span>
          <div className="flex items-baseline gap-1 text-2xl font-extrabold text-slate-900">
            ${(currentUser.spentTotal || 184500).toLocaleString()}
          </div>
          <span className="text-[11px] text-emerald-600 font-semibold">24 contracts delivered</span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-1">
          <span className="text-xs text-slate-500 font-medium">Average Quality Score</span>
          <div className="flex items-baseline gap-1 text-2xl font-extrabold text-teal-700">
            9.4 / 10
          </div>
          <span className="text-[11px] text-slate-400">Via AI Work Inspector</span>
        </div>
      </div>

      {/* Critical Milestone Action Banner */}
      {pendingMilestone && (
        <div className="p-6 bg-gradient-to-r from-teal-50 via-white to-orange-50 border border-teal-200 rounded-3xl shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-teal-600 text-white flex items-center justify-center font-bold shadow-xs">
              <Cpu className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-teal-800 bg-teal-100 px-2 py-0.5 rounded">
                Deliverable Ready for Review
              </span>
              <h3 className="text-base font-bold text-slate-900 mt-1">
                {activeProject.title} • {pendingMilestone.title}
              </h3>
              <p className="text-xs text-slate-600 mt-0.5">
                Contractor submitted source repository and test suite. AI Work Analysis calculated a 94% fulfillment score.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => openAiWorkAnalysisModal(activeProject, pendingMilestone)}
              className="bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Inspect AI QA Report</span>
            </button>
            <button
              onClick={() => approveMilestone(activeProject.id, pendingMilestone.id)}
              className="bg-[#FF5520] hover:bg-[#E04615] text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Approve & Release ${pendingMilestone.amount}</span>
            </button>
          </div>
        </div>
      )}

      {/* Main Sections: Posted Projects & AI Recommended Talent */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Posted Projects (2 cols) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                My Posted Contracts & Project Workspaces
              </h3>
              <button
                onClick={() => navigateTo('post-project')}
                className="text-xs font-semibold text-[#FF5520] hover:underline"
              >
                + New Project
              </button>
            </div>

            <div className="space-y-3">
              {clientProjects.map((p) => (
                <div
                  key={p.id}
                  className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-colors space-y-3 text-xs"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">{p.title}</h4>
                      <p className="text-slate-500">
                        {p.category} • Budget: ${p.budgetMin} - ${p.budgetMax} • {p.proposalsCount} proposals
                      </p>
                    </div>
                    <span className="text-[10px] font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                      {p.status}
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-200/60">
                    <span className="text-slate-600">
                      Assigned: <strong className="text-slate-900">{p.assignedFreelancerName || 'Aditya Bhoyar'}</strong>
                    </span>

                    <button
                      onClick={() => navigateTo('workspace', { projectId: p.id })}
                      className="text-[#FF5520] font-bold hover:underline flex items-center gap-1"
                    >
                      <span>Open Workspace</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* AI Talent Radar (1 col) */}
        <div className="space-y-6">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4 text-xs">
            <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#FF5520]" />
              AI Talent Matches for Open Jobs
            </h4>

            <div className="space-y-3">
              {freelancers.slice(0, 3).map((f) => (
                <div
                  key={f.id}
                  onClick={() => navigateTo('profile', { freelancerId: f.id })}
                  className="p-3 rounded-xl border border-slate-200 hover:border-orange-300 cursor-pointer transition-colors space-y-2"
                >
                  <div className="flex items-center gap-2.5">
                    <img src={f.avatar} alt={f.name} className="w-8 h-8 rounded-full object-cover" />
                    <div>
                      <span className="font-bold text-slate-900 block">{f.name}</span>
                      <span className="text-[10px] text-slate-500 block truncate">{f.headline.split('&')[0]}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[11px] pt-1 border-t border-slate-100">
                    <span className="font-semibold text-teal-800">96% AI Match</span>
                    <span className="font-bold text-slate-900">${f.hourlyRate}/hr</span>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => navigateTo('talent')}
              className="w-full text-center text-xs font-semibold text-[#FF5520] hover:underline pt-1"
            >
              Browse All Verified Talent →
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
