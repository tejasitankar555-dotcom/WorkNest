import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Sparkles, 
  Cpu, 
  ArrowRight, 
  Check, 
  UserCheck, 
  DollarSign, 
  Calendar, 
  Layers, 
  PlusCircle, 
  Trash2, 
  Star,
  Users
} from 'lucide-react';

export const PostProjectPage: React.FC = () => {
  const { 
    currentUser, 
    addProject, 
    freelancers, 
    navigateTo, 
    addToast 
  } = useApp();

  const [title, setTitle] = useState('Autonomous Multi-Agent Intelligence Engine & Dashboard');
  const [description, setDescription] = useState(
    'We are looking for a verified Senior Full-Stack Engineer or specialized team to build our autonomous data agent platform. The platform connects to 10+ public APIs, crawls and summarizes technical documentation using LangChain, and provides a sleek real-time React dashboard with streaming webhooks.'
  );
  const [category, setCategory] = useState('AI/ML');
  const [budgetType, setBudgetType] = useState<'Fixed' | 'Hourly'>('Fixed');
  const [budgetMin, setBudgetMin] = useState<number>(4500);
  const [budgetMax, setBudgetMax] = useState<number>(7500);
  const [experienceLevel, setExperienceLevel] = useState<'Entry' | 'Intermediate' | 'Expert'>('Expert');
  const [duration, setDuration] = useState('4-6 weeks');
  const [skillsInput, setSkillsInput] = useState('Python, React, TypeScript, LangChain, FastAPI, Docker');

  // AI Analysis state
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiBreakdown, setAiBreakdown] = useState<{
    complexityScore: number;
    complexityLabel: string;
    estimatedTimeline: string;
    recommendedTier: string;
    recommendedTeamSize: string;
    suggestedBudget: string;
    milestoneRoadmap: { title: string; duration: string; estimatedAmount: number; skills: string[] }[];
  } | null>(null);

  const handleAnalyzeWithAi = () => {
    if (!title.trim() || !description.trim()) {
      addToast('Please enter a project title and description to run AI analysis', 'warning');
      return;
    }

    setIsAnalyzing(true);
    setTimeout(() => {
      setAiBreakdown({
        complexityScore: 8.8,
        complexityLabel: 'High Complexity (Architecture & Multi-Agent Concurrency)',
        estimatedTimeline: '4 - 6 weeks',
        recommendedTier: 'Senior / Lead Full-Stack Specialist',
        recommendedTeamSize: '1 Lead Full-Stack Architect or 2-person Squad',
        suggestedBudget: '$5,000 - $7,800',
        milestoneRoadmap: [
          { title: 'Milestone 1: Architecture, Data Schemas & API Scaffold', duration: '1 week', estimatedAmount: 1800, skills: ['FastAPI', 'PostgreSQL', 'Docker'] },
          { title: 'Milestone 2: Multi-Agent Crawling & Vector Store Pipeline', duration: '1.5 weeks', estimatedAmount: 2200, skills: ['Python', 'LangChain', 'Qdrant'] },
          { title: 'Milestone 3: Real-Time React Dashboard & Stream Visualization', duration: '1.5 weeks', estimatedAmount: 2000, skills: ['React', 'TypeScript', 'Tailwind'] },
          { title: 'Milestone 4: End-to-End QA, Benchmarking & Deployment', duration: '1 week', estimatedAmount: 1500, skills: ['PyTest', 'Jest', 'CI/CD'] },
        ]
      });
      setIsAnalyzing(false);
      addToast('AI Project Breakdown completed! Roadmap & milestones generated.', 'success');
    }, 1400);
  };

  const handlePublishProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    const skills = skillsInput.split(',').map(s => s.trim()).filter(Boolean);

    const createdProject = addProject({
      clientId: currentUser.id,
      clientName: currentUser.name || 'Apex AI Labs',
      clientAvatar: currentUser.avatar,
      clientRating: currentUser.rating || 4.98,
      clientSpent: currentUser.spentTotal || 184500,
      clientLocation: currentUser.location || 'Austin, TX',
      title: title.trim(),
      description: description.trim(),
      category,
      skills,
      budgetType,
      budgetMin: Number(budgetMin),
      budgetMax: Number(budgetMax),
      experienceLevel,
      duration,
      location: 'Remote',
      isRemote: true,
      deadline: 'Nov 30, 2026',
      aiBreakdown: aiBreakdown || undefined,
      milestones: aiBreakdown?.milestoneRoadmap.map((m, idx) => ({
        id: `ms-${Date.now()}-${idx}`,
        title: m.title,
        description: `Deliverable for ${m.title} across ${m.duration}`,
        amount: m.estimatedAmount,
        dueDate: 'Within ' + m.duration,
        status: idx === 0 ? 'In Progress' : 'Pending'
      })) || [
        {
          id: `ms-${Date.now()}-1`,
          title: 'Milestone 1: Project Kickoff & Architecture Deliverable',
          description: 'Initial repository setup and verified architecture design document.',
          amount: Math.round(budgetMin / 2),
          dueDate: '2 weeks',
          status: 'In Progress'
        }
      ]
    });

    navigateTo('marketplace');
  };

  // Top matching candidates for this scope
  const recommendedCandidates = freelancers.slice(0, 3).map((f, idx) => ({
    ...f,
    matchScore: 96 - idx * 4
  }));

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-2">
        <div className="flex items-center gap-2 text-xs font-bold text-[#FF5520] uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Client Project Creator</span>
        </div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
          Post a Project with AI Breakdown & Talent Matching
        </h1>
        <p className="text-xs text-slate-500">
          WorkNest AI converts raw project ideas into structured milestones, estimates fair market pricing, and surfaces top 1% verified talent.
        </p>
      </div>

      <form onSubmit={handlePublishProject} className="space-y-6">
        
        {/* Core Project Details */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
            1. Project Overview & Scope
          </h3>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Project Title</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#FF5520]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full text-xs px-3 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#FF5520]"
              >
                <option value="AI/ML">AI / Machine Learning</option>
                <option value="Web Development">Web Development</option>
                <option value="UI/UX">UI/UX & Design Systems</option>
                <option value="Mobile Development">Mobile Development</option>
                <option value="DevOps & Cloud">DevOps & Cloud</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Experience Level</label>
              <select
                value={experienceLevel}
                onChange={(e) => setExperienceLevel(e.target.value as any)}
                className="w-full text-xs px-3 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#FF5520]"
              >
                <option value="Expert">Expert (Staff / Senior Level)</option>
                <option value="Intermediate">Intermediate (Mid-level)</option>
                <option value="Entry">Entry (Junior Developer)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Detailed Technical Brief</label>
            <textarea
              rows={4}
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full text-xs p-3.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#FF5520] leading-relaxed"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Required Skills (comma-separated)</label>
            <input
              type="text"
              value={skillsInput}
              onChange={(e) => setSkillsInput(e.target.value)}
              className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#FF5520]"
            />
          </div>

          {/* Budget & Timeline */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Budget Type</label>
              <select
                value={budgetType}
                onChange={(e) => setBudgetType(e.target.value as any)}
                className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200"
              >
                <option value="Fixed">Fixed Price Contract</option>
                <option value="Hourly">Hourly Rate</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Budget Min ($)</label>
              <input
                type="number"
                value={budgetMin}
                onChange={(e) => setBudgetMin(Number(e.target.value))}
                className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Budget Max ($)</label>
              <input
                type="number"
                value={budgetMax}
                onChange={(e) => setBudgetMax(Number(e.target.value))}
                className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200"
              />
            </div>
          </div>
        </div>

        {/* AI Project Analysis Trigger Banner */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-teal-50 via-white to-orange-50 border border-teal-200 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-teal-600 text-white flex items-center justify-center shadow-xs">
                <Cpu className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  Analyze My Project with AI
                </h3>
                <p className="text-xs text-slate-600">
                  Generate milestone breakdown, estimate complexity, and calculate recommended budget.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleAnalyzeWithAi}
              disabled={isAnalyzing}
              className="bg-teal-600 hover:bg-teal-700 disabled:opacity-50 text-white text-xs font-semibold px-5 py-2.5 rounded-xl shadow-xs transition-colors flex items-center gap-1.5 shrink-0"
            >
              <Sparkles className="w-3.5 h-3.5" />
              {isAnalyzing ? 'Analyzing requirements...' : 'Run AI Project Analysis'}
            </button>
          </div>

          {/* AI Generated Breakdown Results */}
          {aiBreakdown && (
            <div className="bg-white p-5 rounded-xl border border-teal-200 space-y-5 animate-in fade-in duration-200 text-xs">
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-[10px] text-slate-500 font-bold uppercase block">Complexity</span>
                  <span className="font-bold text-[#FF5520]">{aiBreakdown.complexityScore}/10</span>
                  <span className="text-[10px] text-slate-500 block truncate">High Scale</span>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-[10px] text-slate-500 font-bold uppercase block">Timeline</span>
                  <span className="font-bold text-slate-900">{aiBreakdown.estimatedTimeline}</span>
                  <span className="text-[10px] text-slate-500 block">4 Phased Sprints</span>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-[10px] text-slate-500 font-bold uppercase block">Suggested Budget</span>
                  <span className="font-bold text-emerald-700">{aiBreakdown.suggestedBudget}</span>
                  <span className="text-[10px] text-slate-500 block">Escrow Protected</span>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-[10px] text-slate-500 font-bold uppercase block">Recommended Squad</span>
                  <span className="font-bold text-slate-900">Lead Solo / Team</span>
                  <span className="text-[10px] text-slate-500 block">1-2 Engineers</span>
                </div>
              </div>

              {/* Milestone Roadmap */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
                    AI Milestone Roadmap & Escrow Allocations (Client Editable)
                  </span>
                  <span className="text-[11px] text-teal-700 font-semibold">
                    Total: $7,500
                  </span>
                </div>

                <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden">
                  {aiBreakdown.milestoneRoadmap.map((m, idx) => (
                    <div key={idx} className="p-3.5 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                      <div>
                        <span className="font-bold text-slate-900">{m.title}</span>
                        <div className="flex items-center gap-2 mt-0.5 text-slate-500 text-[11px]">
                          <span>Duration: {m.duration}</span>
                          <span>•</span>
                          <span>Skills: {m.skills.join(', ')}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 bg-white px-2.5 py-1 rounded-lg border border-slate-200">
                          ${m.estimatedAmount}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Instant AI Recommended Talent */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#FF5520]" />
                    AI Recommended Talent for this Project Scope
                  </span>
                  <span className="text-[11px] text-slate-400">Ranked by Semantic Match</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {recommendedCandidates.map((c) => (
                    <div
                      key={c.id}
                      className="p-3.5 rounded-xl border border-slate-200 bg-white hover:border-orange-300 transition-all space-y-2.5"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-teal-800 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                          {c.matchScore}% Match
                        </span>
                        <span className="text-xs font-bold text-slate-800">${c.hourlyRate}/hr</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <img src={c.avatar} alt={c.name} className="w-8 h-8 rounded-full object-cover" />
                        <div>
                          <h5 className="font-bold text-slate-900 text-xs">{c.name}</h5>
                          <span className="text-[10px] text-slate-500 block truncate">{c.headline.split('&')[0]}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-1 border-t border-slate-100 text-[11px]">
                        <button
                          type="button"
                          onClick={() => navigateTo('profile', { freelancerId: c.id })}
                          className="text-[#FF5520] font-semibold hover:underline"
                        >
                          View Profile
                        </button>
                        <span className="text-emerald-700 font-semibold">{c.availability}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}
        </div>

        {/* Footer actions */}
        <div className="flex items-center justify-between pt-2">
          <button
            type="button"
            onClick={() => navigateTo('marketplace')}
            className="text-xs text-slate-600 hover:text-slate-900 font-medium px-4 py-2"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="bg-[#FF5520] hover:bg-[#E04615] text-white font-semibold text-xs px-6 py-3 rounded-xl shadow-md shadow-orange-500/20 flex items-center gap-2 transition-all"
          >
            <Check className="w-4 h-4" />
            <span>Publish Project with AI Milestones</span>
          </button>
        </div>

      </form>
    </div>
  );
};
