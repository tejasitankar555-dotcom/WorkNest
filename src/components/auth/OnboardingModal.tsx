import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Sparkles, Check, ArrowRight, UserCheck, Briefcase, GraduationCap } from 'lucide-react';

export const OnboardingModal: React.FC = () => {
  const { 
    isOnboardingOpen, 
    setIsOnboardingOpen, 
    role, 
    currentUser, 
    updateCurrentUser, 
    openSkillAssessment, 
    addToast 
  } = useApp();

  const [step, setStep] = useState(1);

  // Freelancer Fields
  const [headline, setHeadline] = useState(currentUser.headline || 'Full-Stack Engineer & AI Architect');
  const [bio, setBio] = useState(currentUser.bio || '');
  const [hourlyRate, setHourlyRate] = useState(currentUser.hourlyRate || 85);
  const [location, setLocation] = useState(currentUser.location || 'Remote / Worldwide');
  const [availability, setAvailability] = useState<'Available' | 'Part-time' | 'Busy'>('Available');
  const [selectedSkills, setSelectedSkills] = useState<string[]>(currentUser.skills || ['React', 'TypeScript', 'Python']);
  const [portfolioLink, setPortfolioLink] = useState('https://github.com/myportfolio');

  // Client Fields
  const [companyName, setCompanyName] = useState(currentUser.companyName || 'Apex AI Labs');
  const [hiringGoal, setHiringGoal] = useState('Hire Full-Stack & AI engineers for production MVP');
  const [typicalBudget, setTypicalBudget] = useState('$5,000 - $15,000');

  if (!isOnboardingOpen) return null;

  const popularSkills = [
    'React', 'TypeScript', 'Node.js', 'Python', 'AI/ML', 
    'UI/UX', 'FastAPI', 'Docker', 'Kubernetes', 'React Native', 
    'Figma', 'LangChain', 'PostgreSQL', 'AWS'
  ];

  const toggleSkill = (skill: string) => {
    setSelectedSkills(prev => 
      prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]
    );
  };

  const handleFinish = () => {
    if (role === 'freelancer') {
      updateCurrentUser({
        headline,
        bio,
        hourlyRate: Number(hourlyRate),
        location,
        availability,
        skills: selectedSkills,
        portfolioLinks: [{ title: 'Main Portfolio', url: portfolioLink }]
      });
      setIsOnboardingOpen(false);
      addToast('Profile configured! Try taking an AI Skill Verification to get your Verified ✓ badge.', 'success');
    } else {
      updateCurrentUser({
        companyName,
        headline: `Hiring Manager @ ${companyName}`,
        location
      });
      setIsOnboardingOpen(false);
      addToast('Company profile ready! You can now post projects with AI Breakdown.', 'success');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white w-full max-w-xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden relative animate-in zoom-in-95 duration-150 max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#FF5520] uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Step {step} of 2 • {role === 'freelancer' ? 'Freelancer Onboarding' : 'Client Onboarding'}</span>
            </div>
            <h2 className="text-lg font-bold text-slate-900">
              {role === 'freelancer' ? 'Build Your WorkNest Identity' : 'Set Up Your Hiring Organization'}
            </h2>
          </div>
          <button
            onClick={() => setIsOnboardingOpen(false)}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4">
          {role === 'freelancer' ? (
            step === 1 ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Professional Headline</label>
                  <input
                    type="text"
                    value={headline}
                    onChange={(e) => setHeadline(e.target.value)}
                    placeholder="e.g. Senior Full-Stack Engineer & AI Specialist"
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#FF5520]"
                  />
                  <span className="text-[10px] text-slate-400 mt-1 block">
                    This appears prominently on your portfolio cards and AI match suggestions.
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Hourly Rate (USD)</label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-2.5 text-xs text-slate-400">$</span>
                      <input
                        type="number"
                        value={hourlyRate}
                        onChange={(e) => setHourlyRate(Number(e.target.value))}
                        className="w-full text-xs pl-7 pr-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#FF5520]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Availability</label>
                    <select
                      value={availability}
                      onChange={(e) => setAvailability(e.target.value as any)}
                      className="w-full text-xs px-3 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#FF5520]"
                    >
                      <option value="Available">Available Full-time</option>
                      <option value="Part-time">Part-time Contracts</option>
                      <option value="Busy">Currently Engaged</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Location / Timezone</label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. San Francisco, CA (UTC-7)"
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#FF5520]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">About & Bio</label>
                  <textarea
                    rows={3}
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="Summarize your engineering or design philosophy, key achievements, and the types of contracts you excel at..."
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#FF5520]"
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Select Your Core Skills ({selectedSkills.length} selected)
                  </label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {popularSkills.map(skill => {
                      const isSel = selectedSkills.includes(skill);
                      return (
                        <button
                          key={skill}
                          type="button"
                          onClick={() => toggleSkill(skill)}
                          className={`text-xs px-3 py-1.5 rounded-lg border transition-all ${
                            isSel
                              ? 'bg-orange-50 border-[#FF5520] text-[#FF5520] font-semibold ring-1 ring-[#FF5520]'
                              : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                          }`}
                        >
                          {skill} {isSel ? '✓' : '+'}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Portfolio or GitHub URL</label>
                  <input
                    type="url"
                    value={portfolioLink}
                    onChange={(e) => setPortfolioLink(e.target.value)}
                    placeholder="https://github.com/yourhandle"
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#FF5520]"
                  />
                </div>

                <div className="p-3 bg-teal-50 border border-teal-200 rounded-xl text-xs text-teal-900 flex items-start gap-2.5">
                  <GraduationCap className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold">Next: AI Practical Skill Verification</span>
                    <p className="text-[11px] text-teal-800 mt-0.5">
                      WorkNest replaces self-reported resumes with verified practical assessments. You can earn Verified ✓ badges with objective scoring.
                    </p>
                  </div>
                </div>
              </div>
            )
          ) : (
            // Client Flow
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Company / Organization Name</label>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="e.g. Apex AI Labs"
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#FF5520]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Primary Hiring Goal</label>
                <input
                  type="text"
                  value={hiringGoal}
                  onChange={(e) => setHiringGoal(e.target.value)}
                  placeholder="e.g. Build an autonomous agent platform or frontend app"
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#FF5520]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Typical Contract Budget Range</label>
                <select
                  value={typicalBudget}
                  onChange={(e) => setTypicalBudget(e.target.value)}
                  className="w-full text-xs px-3 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#FF5520]"
                >
                  <option value="$1,000 - $5,000">$1,000 - $5,000 (Small sprint or audit)</option>
                  <option value="$5,000 - $15,000">$5,000 - $15,000 (MVP feature / full milestone)</option>
                  <option value="$15,000 - $50,000">$15,000 - $50,000 (End-to-end product build)</option>
                  <option value="$50,000+">$50,000+ (Ongoing enterprise engineering squad)</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Footer actions */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
          {step > 1 ? (
            <button
              type="button"
              onClick={() => setStep(1)}
              className="text-xs text-slate-600 hover:text-slate-900 font-medium px-3 py-2"
            >
              Back
            </button>
          ) : <div></div>}

          {step === 1 && role === 'freelancer' ? (
            <button
              type="button"
              onClick={() => setStep(2)}
              className="bg-[#FF5520] hover:bg-[#E04615] text-white text-xs font-semibold px-4 py-2 rounded-xl flex items-center gap-1.5 transition-colors"
            >
              Next: Skills & Proof <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleFinish}
              className="bg-[#FF5520] hover:bg-[#E04615] text-white text-xs font-semibold px-5 py-2.5 rounded-xl flex items-center gap-1.5 shadow-sm transition-colors"
            >
              Finish & Start Using WorkNest <Check className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
