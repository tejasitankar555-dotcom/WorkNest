import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Sparkles, Users, UserPlus, Check, ArrowRight } from 'lucide-react';

export const CreateTeamModal: React.FC = () => {
  const { 
    isCreateTeamModalOpen, 
    setIsCreateTeamModalOpen, 
    currentUser, 
    freelancers, 
    addTeam 
  } = useApp();

  const [teamName, setTeamName] = useState('');
  const [tagline, setTagline] = useState('');
  const [description, setDescription] = useState('');
  const [hourlyRate, setHourlyRate] = useState(240);
  const [selectedMemberIds, setSelectedMemberIds] = useState<string[]>([currentUser.id, 'fl-2']);

  if (!isCreateTeamModalOpen) return null;

  const toggleMember = (id: string) => {
    if (id === currentUser.id) return; // Keep creator
    setSelectedMemberIds(prev => 
      prev.includes(id) ? prev.filter(m => m !== id) : [...prev, id]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!teamName.trim() || !tagline.trim()) return;

    const chosenMembers = freelancers
      .filter(f => selectedMemberIds.includes(f.id))
      .map(f => ({
        id: f.id,
        name: f.name,
        avatar: f.avatar,
        role: f.id === currentUser.id ? 'Team Lead & Architect' : f.headline.split('&')[0].trim(),
        rating: f.rating || 4.9,
        skills: f.skills?.slice(0, 3) || ['Engineering']
      }));

    const allSkills = Array.from(new Set(chosenMembers.flatMap(m => m.skills)));

    addTeam({
      name: teamName.trim(),
      tagline: tagline.trim(),
      description: description.trim() || tagline.trim(),
      avatar: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=400&q=80',
      bannerUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80',
      leadId: currentUser.id,
      leadName: currentUser.name,
      leadAvatar: currentUser.avatar,
      members: chosenMembers,
      skills: allSkills,
      hourlyRateCombined: Number(hourlyRate),
      completedProjects: [
        { title: 'Full-Scale Enterprise Application', category: 'Turn-Key Build', duration: '2 months' }
      ]
    });

    setIsCreateTeamModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white w-full max-w-xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden relative animate-in zoom-in-95 duration-150 max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-100 bg-slate-50/70 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center shadow-xs">
              <Users className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-base text-slate-900">
                Form a Freelancer Team
              </h3>
              <p className="text-xs text-slate-500">
                Collaborate with proven talent and bid on high-budget enterprise contracts
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsCreateTeamModalOpen(false)}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto flex-1 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Team Name</label>
            <input
              type="text"
              required
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              placeholder="e.g. Full-Stack AI Pioneers"
              className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#FF5520]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Tagline / Mission</label>
            <input
              type="text"
              required
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              placeholder="e.g. End-to-End AI Products from Research to Production Scale"
              className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#FF5520]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Combined Hourly Rate ($/hr)</label>
            <input
              type="number"
              value={hourlyRate}
              onChange={(e) => setHourlyRate(Number(e.target.value))}
              className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#FF5520]"
            />
          </div>

          {/* Collaborator selection */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-2">
              Invite Collaborators ({selectedMemberIds.length} members selected)
            </label>
            <div className="space-y-2 max-h-48 overflow-y-auto border border-slate-200 rounded-xl p-2 bg-slate-50/50">
              {freelancers.map(f => {
                const isSelected = selectedMemberIds.includes(f.id);
                return (
                  <div
                    key={f.id}
                    onClick={() => toggleMember(f.id)}
                    className={`p-2 rounded-lg cursor-pointer flex items-center justify-between text-xs transition-colors ${
                      isSelected ? 'bg-orange-50 border border-orange-200 text-slate-900' : 'bg-white hover:bg-slate-100 border border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <img src={f.avatar} alt={f.name} className="w-7 h-7 rounded-full object-cover" />
                      <div>
                        <span className="font-semibold">{f.name}</span>
                        {f.id === currentUser.id && (
                          <span className="ml-1 text-[10px] bg-slate-200 text-slate-700 px-1.5 py-0.2 rounded">You (Lead)</span>
                        )}
                        <p className="text-[10px] text-slate-500 truncate max-w-xs">{f.headline}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-slate-600">${f.hourlyRate}/hr</span>
                      <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
                        isSelected ? 'bg-[#FF5520] text-white' : 'border border-slate-300 text-transparent'
                      }`}>
                        ✓
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="p-3 bg-teal-50 border border-teal-200 rounded-xl text-xs text-teal-900 flex items-center justify-between">
            <div>
              <span className="font-bold">Calculated Team Synergy Score: 98%</span>
              <p className="text-[11px] text-teal-800">Complementary skills in UI/UX, Backend, and AI Engineering.</p>
            </div>
            <Sparkles className="w-5 h-5 text-teal-600" />
          </div>

          {/* Submit */}
          <div className="pt-2 flex items-center justify-between border-t border-slate-100">
            <button
              type="button"
              onClick={() => setIsCreateTeamModalOpen(false)}
              className="text-xs text-slate-600 hover:text-slate-900 font-medium px-3 py-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-[#FF5520] hover:bg-[#E04615] text-white text-xs font-semibold px-5 py-2.5 rounded-xl shadow-md shadow-orange-500/20 flex items-center gap-1.5 transition-colors"
            >
              <UserPlus className="w-3.5 h-3.5" />
              Create Team & Publish
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
