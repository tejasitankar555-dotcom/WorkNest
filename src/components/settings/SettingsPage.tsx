import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Settings as SettingsIcon, 
  ShieldCheck, 
  Bell, 
  Lock, 
  Eye, 
  Save, 
  CheckCircle2, 
  Key 
} from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const { 
    currentUser, 
    updateCurrentUser, 
    addToast 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'profile' | 'notifications' | 'privacy' | 'security'>('profile');

  // Profile fields
  const [name, setName] = useState(currentUser.name);
  const [headline, setHeadline] = useState(currentUser.headline);
  const [location, setLocation] = useState(currentUser.location || '');
  const [hourlyRate, setHourlyRate] = useState(currentUser.hourlyRate || 85);

  // Security & 2FA
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
  const [publicAiInsights, setPublicAiInsights] = useState(true);
  const [notifyOnMatches, setNotifyOnMatches] = useState(true);
  const [notifyOnMilestones, setNotifyOnMilestones] = useState(true);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateCurrentUser({
      name,
      headline,
      location,
      hourlyRate: Number(hourlyRate)
    });
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#FF5520] uppercase tracking-wider mb-1">
            <SettingsIcon className="w-3.5 h-3.5" />
            <span>Preferences & Controls</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Account, Security & Privacy Settings
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Manage your credentials, 2-factor authentication, and portfolio privacy.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 overflow-x-auto text-xs font-bold">
        <button
          onClick={() => setActiveTab('profile')}
          className={`pb-3 px-4 transition-colors border-b-2 ${
            activeTab === 'profile'
              ? 'border-[#FF5520] text-[#FF5520]'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          Profile Details
        </button>

        <button
          onClick={() => setActiveTab('security')}
          className={`pb-3 px-4 transition-colors border-b-2 flex items-center gap-1.5 ${
            activeTab === 'security'
              ? 'border-[#FF5520] text-[#FF5520]'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          <ShieldCheck className="w-3.5 h-3.5" />
          Security & 2FA
        </button>

        <button
          onClick={() => setActiveTab('privacy')}
          className={`pb-3 px-4 transition-colors border-b-2 flex items-center gap-1.5 ${
            activeTab === 'privacy'
              ? 'border-[#FF5520] text-[#FF5520]'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          <Eye className="w-3.5 h-3.5" />
          AI & Work Privacy
        </button>

        <button
          onClick={() => setActiveTab('notifications')}
          className={`pb-3 px-4 transition-colors border-b-2 flex items-center gap-1.5 ${
            activeTab === 'notifications'
              ? 'border-[#FF5520] text-[#FF5520]'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          <Bell className="w-3.5 h-3.5" />
          Notifications
        </button>
      </div>

      {/* Panels */}
      {activeTab === 'profile' && (
        <form onSubmit={handleSaveProfile} className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-4 text-xs">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2">
            Public Freelancer / Client Information
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#FF5520]"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Hourly Rate (USD)</label>
              <input
                type="number"
                value={hourlyRate}
                onChange={(e) => setHourlyRate(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#FF5520]"
              />
            </div>
          </div>

          <div>
            <label className="font-semibold text-slate-700 block mb-1">Headline</label>
            <input
              type="text"
              value={headline}
              onChange={(e) => setHeadline(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#FF5520]"
            />
          </div>

          <div>
            <label className="font-semibold text-slate-700 block mb-1">Location / Timezone</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#FF5520]"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="bg-[#FF5520] hover:bg-[#E04615] text-white font-semibold px-5 py-2.5 rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Profile Changes</span>
            </button>
          </div>
        </form>
      )}

      {activeTab === 'security' && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6 text-xs">
          <div>
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Two-Factor Authentication (2FA) & Security
            </h3>
            <p className="text-slate-500 mt-0.5">
              Secure your escrow payout releases and sensitive contract messages.
            </p>
          </div>

          <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-teal-600 text-white flex items-center justify-center font-bold">
                <Key className="w-5 h-5" />
              </div>
              <div>
                <span className="font-bold text-slate-900 text-sm">Authenticator App (TOTP)</span>
                <p className="text-slate-500">Google Authenticator, 1Password, or YubiKey</p>
              </div>
            </div>

            <button
              onClick={() => {
                setTwoFactorEnabled(!twoFactorEnabled);
                addToast(twoFactorEnabled ? '2FA disabled' : '2FA activated successfully!', 'info');
              }}
              className={`px-4 py-2 rounded-xl font-bold transition-all ${
                twoFactorEnabled
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-300'
                  : 'bg-slate-200 text-slate-700'
              }`}
            >
              {twoFactorEnabled ? 'Enabled ✓' : 'Enable 2FA'}
            </button>
          </div>

          <div className="space-y-3 pt-2 border-t border-slate-100">
            <h4 className="font-bold text-slate-900">Change Account Password</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="password"
                placeholder="Current password"
                className="px-3.5 py-2.5 rounded-xl border border-slate-200"
              />
              <input
                type="password"
                placeholder="New strong password"
                className="px-3.5 py-2.5 rounded-xl border border-slate-200"
              />
            </div>
            <button
              onClick={() => addToast('Password updated securely', 'success')}
              className="bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-xl font-semibold"
            >
              Update Password
            </button>
          </div>
        </div>
      )}

      {activeTab === 'privacy' && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-4 text-xs">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
            AI Work Analysis Visibility & Privacy
          </h3>

          <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50 flex items-center justify-between">
            <div>
              <span className="font-bold text-slate-900">Show AI Insights on Public Portfolio Posts</span>
              <p className="text-slate-500">Display complexity scores and automated quality ratings on your proof feed.</p>
            </div>
            <input
              type="checkbox"
              checked={publicAiInsights}
              onChange={(e) => {
                setPublicAiInsights(e.target.checked);
                addToast('Privacy preference updated', 'info');
              }}
              className="rounded text-[#FF5520] focus:ring-[#FF5520] w-4 h-4"
            />
          </div>
        </div>
      )}

      {activeTab === 'notifications' && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-4 text-xs">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
            Notification Preferences
          </h3>

          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
              <div>
                <span className="font-bold text-slate-900">New High-Score AI Job Matches</span>
                <p className="text-slate-500">Alerts when a client posts a job matching your verified skills &gt; 90%.</p>
              </div>
              <input
                type="checkbox"
                checked={notifyOnMatches}
                onChange={(e) => setNotifyOnMatches(e.target.checked)}
                className="rounded text-[#FF5520] focus:ring-[#FF5520] w-4 h-4"
              />
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
              <div>
                <span className="font-bold text-slate-900">Milestone Approvals & Escrow Payments</span>
                <p className="text-slate-500">Instant notification when client releases funds or requests revisions.</p>
              </div>
              <input
                type="checkbox"
                checked={notifyOnMilestones}
                onChange={(e) => setNotifyOnMilestones(e.target.checked)}
                className="rounded text-[#FF5520] focus:ring-[#FF5520] w-4 h-4"
              />
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
