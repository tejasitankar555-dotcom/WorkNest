import React from 'react';
import { useApp } from '../../context/AppContext';
import { FreelancerDashboard } from './FreelancerDashboard';
import { ClientDashboard } from './ClientDashboard';
import { AdminDashboard } from './AdminDashboard';
import { UserCheck, Briefcase, ShieldCheck } from 'lucide-react';

export const DashboardHub: React.FC = () => {
  const { role, setRole } = useApp();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Role view toggle selector inside dashboard for effortless inspection */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
          Switch Dashboard Perspective:
        </span>
        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl text-xs font-bold">
          <button
            onClick={() => setRole('freelancer')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
              role === 'freelancer' ? 'bg-white text-[#FF5520] shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <UserCheck className="w-3.5 h-3.5" />
            Freelancer View
          </button>

          <button
            onClick={() => setRole('client')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
              role === 'client' ? 'bg-white text-[#FF5520] shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Briefcase className="w-3.5 h-3.5" />
            Client View
          </button>

          <button
            onClick={() => setRole('admin')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
              role === 'admin' ? 'bg-white text-[#FF5520] shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            Admin View
          </button>
        </div>
      </div>

      {role === 'freelancer' && <FreelancerDashboard />}
      {role === 'client' && <ClientDashboard />}
      {role === 'admin' && <AdminDashboard />}
    </div>
  );
};
