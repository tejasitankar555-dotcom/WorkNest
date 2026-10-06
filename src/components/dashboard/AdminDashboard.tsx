import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ShieldCheck, 
  Users, 
  Briefcase, 
  DollarSign, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  TrendingUp,
  Cpu,
  Award,
  Layers,
  ChevronRight
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { 
    projects, 
    freelancers, 
    disputes, 
    addToast, 
    navigateTo 
  } = useApp();

  const [activeAdminTab, setActiveAdminTab] = useState<'overview' | 'users' | 'moderation' | 'disputes'>('overview');

  const handleVerifyUser = (name: string) => {
    addToast(`User ${name} credentials marked as officially verified!`, 'success');
  };

  const handleResolveDispute = (disputeId: string) => {
    addToast(`Dispute #${disputeId} marked as mediated and resolved. Escrow adjusted.`, 'success');
  };

  return (
    <div className="space-y-8">
      
      {/* Top Banner */}
      <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-teal-400 uppercase tracking-wider mb-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Platform Governance & Trust Ops</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            WorkNest Central Administration Console
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl">
            Live telemetry for escrow balances, AST deliverable scanner flags, dispute resolutions, and user moderation.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs text-emerald-400 font-semibold bg-emerald-950/80 px-3 py-1.5 rounded-xl border border-emerald-800 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            Arbitration Engine Online
          </span>
        </div>
      </div>

      {/* 5 High-Level Platform Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-1">
          <span className="text-[11px] text-slate-500 font-medium">Total Users</span>
          <span className="text-xl font-extrabold text-slate-900 block">14,820</span>
          <span className="text-[10px] text-slate-400">8,410 Freelancers • 6,410 Clients</span>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-1">
          <span className="text-[11px] text-slate-500 font-medium">Platform Volume</span>
          <span className="text-xl font-extrabold text-emerald-600 block">$1,428,500</span>
          <span className="text-[10px] text-emerald-600 font-semibold">+18.4% this quarter</span>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-1">
          <span className="text-[11px] text-slate-500 font-medium">Net Platform Fees (5%)</span>
          <span className="text-xl font-extrabold text-slate-900 block">$71,425</span>
          <span className="text-[10px] text-slate-400">Escrow rake & verification</span>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-1">
          <span className="text-[11px] text-slate-500 font-medium">Active Contracts</span>
          <span className="text-xl font-extrabold text-[#FF5520] block">312</span>
          <span className="text-[10px] text-slate-400">4,120 completed</span>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-1">
          <span className="text-[11px] text-slate-500 font-medium">Open Disputes</span>
          <span className="text-xl font-extrabold text-amber-500 block">{disputes.length}</span>
          <span className="text-[10px] text-amber-600 font-semibold">Under investigation</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 text-xs font-bold">
        <button
          onClick={() => setActiveAdminTab('overview')}
          className={`pb-3 px-3 transition-colors border-b-2 ${
            activeAdminTab === 'overview'
              ? 'border-[#FF5520] text-[#FF5520]'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          Moderation Overview
        </button>

        <button
          onClick={() => setActiveAdminTab('users')}
          className={`pb-3 px-3 transition-colors border-b-2 ${
            activeAdminTab === 'users'
              ? 'border-[#FF5520] text-[#FF5520]'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          User Verification Queue ({freelancers.length})
        </button>

        <button
          onClick={() => setActiveAdminTab('disputes')}
          className={`pb-3 px-3 transition-colors border-b-2 ${
            activeAdminTab === 'disputes'
              ? 'border-[#FF5520] text-[#FF5520]'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          Disputes & Arbitration ({disputes.length})
        </button>
      </div>

      {/* Tab Panels */}
      {activeAdminTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-xs">
          
          {/* Recent AI Verification Audits */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <h3 className="font-bold text-slate-900 uppercase tracking-wider text-xs flex items-center justify-between">
              <span>Automated AST Code Audits</span>
              <span className="text-[11px] text-teal-700">All Passed</span>
            </h3>
            <div className="space-y-2">
              <div className="p-3 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between">
                <div>
                  <span className="font-bold text-slate-900 block">Milestone 2 Deliverable #WN-proj-1</span>
                  <span className="text-[11px] text-slate-500">Aditya Bhoyar • Apex AI Labs</span>
                </div>
                <span className="text-teal-700 font-bold bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                  94% Score (Passed)
                </span>
              </div>

              <div className="p-3 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between">
                <div>
                  <span className="font-bold text-slate-900 block">PulseFit Biometric App Sprint 1</span>
                  <span className="text-[11px] text-slate-500">Mateo Morales • Horizon HealthTech</span>
                </div>
                <span className="text-teal-700 font-bold bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                  96% Score (Passed)
                </span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <h3 className="font-bold text-slate-900 uppercase tracking-wider text-xs">
              Platform Controls & Health
            </h3>
            <div className="space-y-3 text-slate-600">
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span>Stripe Escrow Webhook Listener</span>
                <span className="text-emerald-600 font-bold">Operational (2ms latency)</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span>LLM Assessment Guardrails</span>
                <span className="text-emerald-600 font-bold">Zero prompt injections</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span>Daily Escrow Settlements</span>
                <span className="font-bold text-slate-900">$34,800 Disbursed Today</span>
              </div>
            </div>
          </div>

        </div>
      )}

      {activeAdminTab === 'users' && (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs text-xs">
          <div className="p-4 border-b border-slate-200 bg-slate-50/70 font-bold text-slate-900 flex items-center justify-between">
            <span>Freelancer Moderation & Verification Roster</span>
            <span className="text-slate-500 font-normal">Showing {freelancers.length} active practitioners</span>
          </div>

          <div className="divide-y divide-slate-100">
            {freelancers.map((f) => (
              <div key={f.id} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-3">
                  <img src={f.avatar} alt={f.name} className="w-9 h-9 rounded-full object-cover" />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900">{f.name}</span>
                      <span className="text-[10px] text-slate-400">{f.email}</span>
                    </div>
                    <p className="text-slate-500 text-[11px]">{f.headline}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="font-bold text-[#FF5520]">Reputation: {f.reputationScore}/100</span>
                  <button
                    onClick={() => handleVerifyUser(f.name)}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Approve Badge
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeAdminTab === 'disputes' && (
        <div className="space-y-4 text-xs">
          {disputes.map((d) => (
            <div key={d.id} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 text-sm">Dispute Case #{d.id}</span>
                    <span className="text-[10px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                      Status: {d.status}
                    </span>
                  </div>
                  <p className="text-slate-500 text-[11px] mt-0.5">
                    Project: {d.projectTitle} • Filed: {d.filedDate}
                  </p>
                </div>

                <button
                  onClick={() => handleResolveDispute(d.id)}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-4 py-2 rounded-xl transition-colors shadow-xs"
                >
                  Mark Resolved
                </button>
              </div>

              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-slate-700 space-y-1">
                <span className="font-bold text-slate-900">Reason: {d.reason}</span>
                <p className="leading-relaxed">{d.description}</p>
                {d.resolutionNotes && (
                  <p className="text-amber-800 font-medium pt-1">
                    Mediator Notes: {d.resolutionNotes}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
