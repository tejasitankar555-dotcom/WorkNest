import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  X, 
  Sparkles, 
  Send, 
  ArrowRight, 
  DollarSign, 
  Clock, 
  Bot, 
  Check, 
  ShieldCheck,
  FileCode,
  Zap
} from 'lucide-react';

export const ApplyProposalModal: React.FC = () => {
  const { 
    isApplyModalOpen, 
    closeApplyModal, 
    applyProjectTarget, 
    currentUser, 
    submitProposal, 
    addToast 
  } = useApp();

  const [proposedPrice, setProposedPrice] = useState<number>(
    applyProjectTarget?.budgetType === 'Fixed' 
      ? applyProjectTarget.budgetMax || 5000 
      : (currentUser.hourlyRate || 85)
  );
  const [deliveryTime, setDeliveryTime] = useState('3-4 weeks');
  const [coverLetter, setCoverLetter] = useState(
    `Hi ${applyProjectTarget?.clientName || 'there'},\n\nI reviewed your requirements for "${applyProjectTarget?.title}". With my production experience building similar high-concurrency systems and verified expertise, I can deliver a clean, tested implementation with automated milestone verification.\n\nLooking forward to discussing the architecture!`
  );
  
  const [isAiEnhancing, setIsAiEnhancing] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState<{
    hook: string;
    proofBullet: string;
    riskReversal: string;
    estimatedMatchScore: number;
  } | null>(null);

  if (!isApplyModalOpen || !applyProjectTarget) return null;

  const handleAiEnhance = () => {
    setIsAiEnhancing(true);
    setTimeout(() => {
      setAiSuggestions({
        hook: `I analyzed your technical scope for ${applyProjectTarget.title}. The key architectural bottleneck will be state consistency during async deliverable ingestion. Having built this exact pipeline in my 'Autonomous Code-Reviewer Agent' (tested at 94% quality score), I can guarantee a zero-regression solution.`,
        proofBullet: `Deliverables will include 90%+ PyTest/Jest coverage, complete OpenAPI documentation, and containerized Docker execution so your team can deploy effortlessly.`,
        riskReversal: `I propose structuring Milestone 1 as a 4-day working prototype so your team can verify the AST inspection engine before releasing full escrow.`,
        estimatedMatchScore: 96
      });
      setIsAiEnhancing(false);
      addToast('AI Proposal Assistant generated targeted hooks & proof bullets!', 'success');
    }, 1200);
  };

  const handleApplyAiSuggestion = () => {
    if (!aiSuggestions) return;
    setCoverLetter(
      `Hi ${applyProjectTarget.clientName},\n\n${aiSuggestions.hook}\n\n${aiSuggestions.proofBullet}\n\n${aiSuggestions.riskReversal}\n\nBest regards,\n${currentUser.name}`
    );
    addToast('AI enhanced proposal applied to draft!', 'info');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitProposal({
      projectId: applyProjectTarget.id,
      freelancerId: currentUser.id,
      freelancerName: currentUser.name,
      freelancerAvatar: currentUser.avatar,
      freelancerHeadline: currentUser.headline,
      freelancerRating: currentUser.rating || 4.95,
      freelancerCompletedProjects: currentUser.completedProjectsCount || 38,
      coverLetter,
      proposedPrice: Number(proposedPrice),
      deliveryTime,
      skills: applyProjectTarget.skills.slice(0, 4),
      portfolioLinks: [currentUser.portfolioLinks?.[0]?.url || 'https://github.com/adityabhoyar']
    });
    closeApplyModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden relative animate-in zoom-in-95 duration-150 max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-100 bg-slate-50/70 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#FF5520] uppercase tracking-wider mb-0.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Project Application</span>
            </div>
            <h3 className="font-bold text-base text-slate-900 line-clamp-1">
              Apply to: {applyProjectTarget.title}
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Client: {applyProjectTarget.clientName} • Budget: {applyProjectTarget.budgetType === 'Fixed' ? `$${applyProjectTarget.budgetMin} - $${applyProjectTarget.budgetMax}` : `$${applyProjectTarget.budgetMin}/hr`}
            </p>
          </div>
          <button
            onClick={closeApplyModal}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto flex-1 space-y-4">
          
          {/* Rate & Timeline */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {applyProjectTarget.budgetType === 'Fixed' ? 'Your Proposed Fixed Bid ($)' : 'Your Hourly Rate ($/hr)'}
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-xs text-slate-400">$</span>
                <input
                  type="number"
                  required
                  value={proposedPrice}
                  onChange={(e) => setProposedPrice(Number(e.target.value))}
                  className="w-full text-xs pl-7 pr-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-[#FF5520]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Estimated Delivery Timeline
              </label>
              <input
                type="text"
                required
                value={deliveryTime}
                onChange={(e) => setDeliveryTime(e.target.value)}
                placeholder="e.g. 3-4 weeks"
                className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-[#FF5520]"
              />
            </div>
          </div>

          {/* AI Proposal Assistant Banner */}
          <div className="p-4 bg-gradient-to-r from-teal-50 via-teal-50/50 to-orange-50/60 border border-teal-200 rounded-2xl space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-teal-600 text-white flex items-center justify-center">
                  <Bot className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs font-bold text-slate-900">WorkNest AI Proposal Copilot</span>
              </div>
              <button
                type="button"
                onClick={handleAiEnhance}
                disabled={isAiEnhancing}
                className="text-xs font-semibold text-teal-800 hover:text-teal-950 bg-teal-100 hover:bg-teal-200/80 px-2.5 py-1 rounded-lg transition-colors flex items-center gap-1"
              >
                <Sparkles className="w-3 h-3 text-teal-600" />
                {isAiEnhancing ? 'Analyzing brief...' : 'Analyze Job & Polish Proposal'}
              </button>
            </div>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              AI compares your verified skills against the client's scope to suggest a high-impact opening, relevant proof of work, and risk-reversal milestones.
            </p>

            {aiSuggestions && (
              <div className="mt-3 p-3 bg-white rounded-xl border border-teal-200 space-y-2 animate-in fade-in duration-200">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-teal-800 flex items-center gap-1">
                    <Zap className="w-3.5 h-3.5 text-amber-500" />
                    AI Match Potential: {aiSuggestions.estimatedMatchScore}%
                  </span>
                  <button
                    type="button"
                    onClick={handleApplyAiSuggestion}
                    className="text-xs text-[#FF5520] font-bold hover:underline flex items-center gap-1"
                  >
                    <Check className="w-3.5 h-3.5" />
                    Apply Suggestion to Cover Letter
                  </button>
                </div>
                <p className="text-[11px] text-slate-700 italic border-l-2 border-teal-500 pl-2">
                  "{aiSuggestions.hook}"
                </p>
              </div>
            )}
          </div>

          {/* Cover Letter */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Cover Letter & Technical Approach
            </label>
            <textarea
              rows={6}
              required
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
              className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#FF5520] leading-relaxed font-mono text-slate-800"
            />
            <span className="text-[10px] text-slate-400 mt-1 block">
              You maintain 100% control over your proposal. AI only provides suggestions and never auto-submits.
            </span>
          </div>

          {/* Attached Verified Credentials */}
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
            <span className="font-semibold text-slate-700 block mb-1.5">
              Verified Badges Attached Automatically:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {(currentUser.verifiedSkills || []).map((vs, idx) => (
                <span key={idx} className="text-[11px] bg-white border border-teal-200 text-teal-800 font-semibold px-2 py-0.5 rounded-md flex items-center gap-1">
                  <Check className="w-3 h-3 text-teal-600" />
                  {vs.name} ({vs.level})
                </span>
              ))}
            </div>
          </div>

          {/* Footer Submit */}
          <div className="pt-2 flex items-center justify-between border-t border-slate-100">
            <button
              type="button"
              onClick={closeApplyModal}
              className="text-xs text-slate-600 hover:text-slate-900 font-medium px-3 py-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-[#FF5520] hover:bg-[#E04615] text-white text-xs font-semibold px-5 py-2.5 rounded-xl shadow-md shadow-orange-500/20 flex items-center gap-2 transition-all"
            >
              <span>Submit Proposal</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
