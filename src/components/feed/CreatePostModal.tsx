import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  X, 
  Sparkles, 
  Upload, 
  Image as ImageIcon, 
  Check, 
  Cpu, 
  Eye, 
  EyeOff, 
  ExternalLink,
  Code
} from 'lucide-react';

export const CreatePostModal: React.FC = () => {
  const { 
    isCreatePostModalOpen, 
    setIsCreatePostModalOpen, 
    currentUser, 
    addPost, 
    addToast 
  } = useApp();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Web Development');
  const [mediaUrl, setMediaUrl] = useState('https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80');
  const [skillsInput, setSkillsInput] = useState('React, TypeScript, Tailwind CSS, State Machines');
  const [liveUrl, setLiveUrl] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  
  // AI Analysis state
  const [isAiAnalyzing, setIsAiAnalyzing] = useState(false);
  const [aiInsights, setAiInsights] = useState<{
    detectedSkills: string[];
    complexityScore: number;
    complexityLabel: 'Low' | 'Moderate' | 'High' | 'Enterprise';
    workQualityScore: number;
    usabilityScore: number;
    codeArchitectureScore: number;
    highlights: string[];
    suggestedImprovements: string[];
    isPublic: boolean;
  } | null>(null);

  const [makeAiPublic, setMakeAiPublic] = useState(true);

  if (!isCreatePostModalOpen) return null;

  const handleRunAiAnalysis = () => {
    if (!description.trim() || !title.trim()) {
      addToast('Please enter a project title and description first', 'warning');
      return;
    }
    setIsAiAnalyzing(true);
    setTimeout(() => {
      setAiInsights({
        detectedSkills: ['Component Architecture', 'TypeScript Type Guards', 'Responsive CSS', 'Clean REST/GraphQL Contract'],
        complexityScore: 8.7,
        complexityLabel: 'High',
        workQualityScore: 9.3,
        usabilityScore: 9.1,
        codeArchitectureScore: 9.5,
        highlights: [
          'High modularity with decoupled business logic',
          'Strict typing with zero implicit any instances',
          'Polished micro-animations matching modern SaaS benchmarks'
        ],
        suggestedImprovements: [
          'Consider caching API responses with a 5-minute stale-while-revalidate TTL',
          'Add screen reader aria-labels on interactive icon triggers'
        ],
        isPublic: makeAiPublic
      });
      setIsAiAnalyzing(false);
      addToast('AI analyzed project complexity & code quality!', 'success');
    }, 1200);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    const skills = skillsInput.split(',').map(s => s.trim()).filter(Boolean);

    addPost({
      authorId: currentUser.id,
      authorName: currentUser.name,
      authorAvatar: currentUser.avatar,
      authorHeadline: currentUser.headline,
      title: title.trim(),
      description: description.trim(),
      category,
      mediaUrl,
      mediaType: 'image',
      skills,
      technologies: skills,
      liveUrl: liveUrl.trim() || undefined,
      githubUrl: githubUrl.trim() || undefined,
      aiInsights: aiInsights ? { ...aiInsights, isPublic: makeAiPublic } : undefined
    });

    setIsCreatePostModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden relative animate-in zoom-in-95 duration-150 max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-100 bg-slate-50/70 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#FF5520] uppercase tracking-wider mb-0.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Showcase Real Work</span>
            </div>
            <h3 className="font-bold text-base text-slate-900">
              Share Project to Social Portfolio Feed
            </h3>
          </div>
          <button
            onClick={() => setIsCreatePostModalOpen(false)}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto flex-1 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Project Title</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Real-Time Collaborative Canvas with WebSockets & Rust"
              className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#FF5520]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
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
                <option value="Cybersecurity">Cybersecurity</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Skills & Tech (comma-separated)</label>
              <input
                type="text"
                value={skillsInput}
                onChange={(e) => setSkillsInput(e.target.value)}
                placeholder="React, TypeScript, Docker..."
                className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#FF5520]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Detailed Technical Description / Case Study</label>
            <textarea
              rows={4}
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the architectural challenge, how you solved it, key algorithmic tradeoffs, and the measurable impact..."
              className="w-full text-xs p-3.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#FF5520]"
            />
          </div>

          {/* Media & Links */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Project Media Screenshot URL</label>
              <input
                type="url"
                value={mediaUrl}
                onChange={(e) => setMediaUrl(e.target.value)}
                className="w-full text-xs px-3.5 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-[#FF5520]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Live URL or GitHub Repo</label>
              <input
                type="url"
                value={liveUrl}
                onChange={(e) => setLiveUrl(e.target.value)}
                placeholder="https://myproject.dev"
                className="w-full text-xs px-3.5 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-[#FF5520]"
              />
            </div>
          </div>

          {/* AI Project Analysis Section */}
          <div className="p-4 bg-teal-50/70 border border-teal-200/80 rounded-2xl space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-teal-600" />
                <span className="text-xs font-bold text-slate-900">WorkNest AI Code & Artifact Analysis</span>
              </div>
              <button
                type="button"
                onClick={handleRunAiAnalysis}
                disabled={isAiAnalyzing}
                className="text-xs font-semibold text-teal-800 hover:text-teal-950 bg-teal-100 hover:bg-teal-200 px-3 py-1 rounded-lg transition-colors flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5 text-teal-600" />
                {isAiAnalyzing ? 'Evaluating Project...' : 'Run AI Analysis on Work'}
              </button>
            </div>

            <p className="text-[11px] text-slate-600 leading-relaxed">
              When you upload work, AI evaluates complexity, detects hidden skills, and gives constructive quality insights.
            </p>

            {aiInsights && (
              <div className="bg-white p-3.5 rounded-xl border border-teal-200 space-y-2.5 animate-in fade-in duration-150 text-xs">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-2">
                  <span className="font-bold text-slate-900">
                    Complexity: <span className="text-[#FF5520]">{aiInsights.complexityScore}/10 ({aiInsights.complexityLabel})</span>
                  </span>
                  <span className="font-bold text-slate-900">
                    Quality Rating: <span className="text-teal-700">{aiInsights.workQualityScore}/10</span>
                  </span>
                </div>

                <div>
                  <span className="font-semibold text-slate-700 block mb-1 text-[11px]">Detected Verified Skills:</span>
                  <div className="flex flex-wrap gap-1">
                    {aiInsights.detectedSkills.map((s, idx) => (
                      <span key={idx} className="bg-slate-100 text-slate-800 text-[10px] px-2 py-0.5 rounded">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Privacy Toggle */}
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {makeAiPublic ? <Eye className="w-4 h-4 text-emerald-600" /> : <EyeOff className="w-4 h-4 text-slate-400" />}
                    <span className="text-xs text-slate-700 font-medium">Make AI Insights Publicly Visible on Post</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={makeAiPublic}
                    onChange={(e) => setMakeAiPublic(e.target.checked)}
                    className="rounded border-slate-300 text-[#FF5520] focus:ring-[#FF5520]"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Submit buttons */}
          <div className="pt-2 flex items-center justify-between border-t border-slate-100">
            <button
              type="button"
              onClick={() => setIsCreatePostModalOpen(false)}
              className="text-xs text-slate-600 hover:text-slate-900 font-medium px-3 py-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-[#FF5520] hover:bg-[#E04615] text-white text-xs font-semibold px-5 py-2.5 rounded-xl shadow-md shadow-orange-500/20 flex items-center gap-1.5 transition-colors"
            >
              <Upload className="w-3.5 h-3.5" />
              Publish to Portfolio Feed
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
