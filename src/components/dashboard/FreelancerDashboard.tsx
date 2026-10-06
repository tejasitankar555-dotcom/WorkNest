import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  TrendingUp, 
  Award, 
  Briefcase, 
  Clock, 
  CheckCircle2, 
  DollarSign, 
  Sparkles, 
  ArrowRight, 
  Star,
  Users,
  Layers,
  ChevronRight
} from 'lucide-react';
import { MOCK_TRANSACTIONS } from '../../data/mockData';

export const FreelancerDashboard: React.FC = () => {
  const { 
    currentUser, 
    projects, 
    openSkillAssessment, 
    navigateTo 
  } = useApp();

  const activeProjects = projects.filter(p => p.status === 'Active');

  return (
    <div className="space-y-8">
      
      {/* Welcome & Top Stats */}
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
                Welcome back, {currentUser.name.split(' ')[0]}!
              </h1>
              <span className="text-[10px] font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-full border border-teal-200">
                Verified Pro ✓
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Full-Stack & AI Agent Architect • {currentUser.location}
            </p>
          </div>
        </div>

        {/* Reputation Meter */}
        <div className="p-4 bg-orange-50 border border-orange-200 rounded-2xl flex items-center gap-4">
          <div>
            <span className="text-[10px] uppercase font-bold text-[#FF5520] tracking-wider block">
              Reputation Index
            </span>
            <span className="text-2xl font-extrabold text-slate-900">
              {currentUser.reputationScore || 96} / 100
            </span>
            <span className="text-[10px] text-emerald-600 font-semibold block">+2 points this week</span>
          </div>
          <div className="w-12 h-12 rounded-full border-4 border-[#FF5520] border-t-amber-400 flex items-center justify-center font-bold text-xs text-slate-900">
            96%
          </div>
        </div>
      </div>

      {/* 4 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-1">
          <span className="text-xs text-slate-500 font-medium">Available Balance</span>
          <div className="flex items-baseline gap-1 text-2xl font-extrabold text-slate-900">
            $4,250<span className="text-xs text-slate-400 font-normal">.00</span>
          </div>
          <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" /> Ready for withdrawal
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-1">
          <span className="text-xs text-slate-500 font-medium">Escrow Protected</span>
          <div className="flex items-baseline gap-1 text-2xl font-extrabold text-[#FF5520]">
            $5,500<span className="text-xs text-slate-400 font-normal">.00</span>
          </div>
          <span className="text-[11px] text-slate-400">Locked in 2 active contracts</span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-1">
          <span className="text-xs text-slate-500 font-medium">Profile Completion</span>
          <div className="flex items-baseline gap-1 text-2xl font-extrabold text-teal-700">
            95%
          </div>
          <span className="text-[11px] text-teal-700 font-semibold">4 Verified AI Badges</span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-1">
          <span className="text-xs text-slate-500 font-medium">Active Applications</span>
          <div className="flex items-baseline gap-1 text-2xl font-extrabold text-slate-900">
            3
          </div>
          <span className="text-[11px] text-amber-600 font-semibold">2 Shortlisted with AI Match</span>
        </div>
      </div>

      {/* Main Grid: Active Contracts & Skill Verifications */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Active Contracts (2 cols) */}
        <div className="lg:col-span-2 space-y-6">
          
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                Active Contracts & Milestones
              </h3>
              <button
                onClick={() => navigateTo('workspace', { projectId: 'proj-1' })}
                className="text-xs font-semibold text-[#FF5520] hover:underline flex items-center gap-1"
              >
                <span>Enter Workspace</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {activeProjects.map((p) => (
              <div key={p.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">{p.title}</h4>
                    <p className="text-xs text-slate-500">Client: {p.clientName} • Fixed Contract</p>
                  </div>
                  <span className="text-xs font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                    Active
                  </span>
                </div>

                {/* Milestone 2 status pill */}
                <div className="p-3 bg-white rounded-xl border border-slate-200 text-xs flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-orange-500" />
                    <div>
                      <span className="font-bold text-slate-900">Current Phase: Milestone 2 ($1,800)</span>
                      <p className="text-[11px] text-slate-500">Submitted • AI Work Analysis verified (94%)</p>
                    </div>
                  </div>

                  <button
                    onClick={() => navigateTo('workspace', { projectId: p.id })}
                    className="bg-[#FF5520] hover:bg-[#E04615] text-white px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors"
                  >
                    View Deliverable
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Recent Escrow Transactions */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4 text-xs">
            <h3 className="font-bold text-slate-900 uppercase tracking-wider text-xs">
              Recent Escrow Transactions & Invoices
            </h3>
            <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden">
              {MOCK_TRANSACTIONS.map((tx) => (
                <div key={tx.id} className="p-3.5 flex items-center justify-between">
                  <div className="space-y-0.5">
                    <span className="font-bold text-slate-900 block">{tx.projectTitle}</span>
                    <span className="text-slate-400 text-[11px]">{tx.date} • {tx.type} • {tx.invoiceId}</span>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-emerald-600 block">+${tx.netAmount.toLocaleString()}</span>
                    <span className="text-[10px] text-slate-400">Fee: ${tx.platformFee} (5%)</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Sidebar: Skills & AI Radar (1 col) */}
        <div className="space-y-6">
          
          {/* Skill Verification CTA */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4 text-xs">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
                Verified Skill Badges
              </h4>
              <button
                onClick={() => openSkillAssessment('Python')}
                className="text-[11px] text-[#FF5520] font-semibold hover:underline"
              >
                + Test New Skill
              </button>
            </div>

            <div className="space-y-2">
              {(currentUser.verifiedSkills || []).map((skill, idx) => (
                <div key={idx} className="p-2.5 bg-teal-50/60 border border-teal-200 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
                    <span className="font-bold text-slate-900">{skill.name}</span>
                  </div>
                  <span className="text-[10px] font-bold text-teal-800 bg-white px-2 py-0.5 rounded border border-teal-200">
                    {skill.level} ({skill.score}%)
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* AI Recommended Jobs */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3 text-xs">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#FF5520]" />
                AI Recommended Jobs
              </h4>
            </div>

            <div className="space-y-3">
              {projects.slice(1, 3).map((job) => (
                <div
                  key={job.id}
                  onClick={() => navigateTo('marketplace')}
                  className="p-3 rounded-xl border border-slate-200 hover:border-orange-300 cursor-pointer transition-colors space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-teal-700 bg-teal-50 px-1.5 py-0.2 rounded border border-teal-200">
                      94% Match
                    </span>
                    <span className="font-bold text-slate-900">
                      ${job.budgetMin} - ${job.budgetMax}
                    </span>
                  </div>
                  <h5 className="font-bold text-slate-900 line-clamp-1">{job.title}</h5>
                  <span className="text-[10px] text-slate-400 block">{job.clientName}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
