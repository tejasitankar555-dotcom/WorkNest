import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Bell, 
  Check, 
  CheckCheck, 
  Cpu, 
  DollarSign, 
  Users, 
  Briefcase, 
  MessageSquare,
  Sparkles
} from 'lucide-react';

export const NotificationsPage: React.FC = () => {
  const { 
    notifications, 
    markNotificationAsRead, 
    markAllNotificationsAsRead, 
    navigateTo 
  } = useApp();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      
      {/* Header */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#FF5520] uppercase tracking-wider mb-1">
            <Bell className="w-3.5 h-3.5" />
            <span>Activity Feed</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Notifications & System Alerts
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time updates on milestone audits, escrow releases, and community discussions.
          </p>
        </div>

        <button
          onClick={markAllNotificationsAsRead}
          className="text-xs text-[#FF5520] hover:text-[#E04615] font-semibold flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-orange-50 border border-orange-200 transition-colors"
        >
          <CheckCheck className="w-4 h-4" />
          <span>Mark All Read</span>
        </button>
      </div>

      {/* Notifications List */}
      <div className="bg-white rounded-3xl border border-slate-200 divide-y divide-slate-100 overflow-hidden shadow-xs">
        {notifications.map((n) => {
          const getIcon = () => {
            switch (n.type) {
              case 'ai_analysis': return <Cpu className="w-4 h-4 text-teal-600" />;
              case 'payment': return <DollarSign className="w-4 h-4 text-emerald-600" />;
              case 'community': return <Users className="w-4 h-4 text-indigo-600" />;
              case 'proposal': return <Briefcase className="w-4 h-4 text-orange-500" />;
              default: return <Bell className="w-4 h-4 text-slate-500" />;
            }
          };

          return (
            <div
              key={n.id}
              onClick={() => {
                markNotificationAsRead(n.id);
                if (n.actionUrl) {
                  if (n.actionUrl.includes('workspace')) navigateTo('workspace', { projectId: 'proj-1' });
                  if (n.actionUrl.includes('communities')) navigateTo('communities');
                  if (n.actionUrl.includes('projects')) navigateTo('marketplace');
                }
              }}
              className={`p-5 flex items-start gap-4 hover:bg-slate-50 cursor-pointer transition-colors ${
                !n.isRead ? 'bg-orange-50/40' : ''
              }`}
            >
              <div className="w-10 h-10 rounded-2xl bg-slate-100 flex items-center justify-center shrink-0">
                {getIcon()}
              </div>

              <div className="flex-1 text-xs">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-bold text-slate-900 text-sm leading-snug">{n.title}</h4>
                  <span className="text-[11px] text-slate-400">{n.timestamp}</span>
                </div>
                <p className="text-slate-600 leading-relaxed">{n.description}</p>
              </div>

              {!n.isRead && (
                <span className="w-2.5 h-2.5 rounded-full bg-[#FF5520] shrink-0 mt-2" />
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
};
