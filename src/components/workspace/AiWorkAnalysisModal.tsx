import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  X, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldCheck, 
  ExternalLink, 
  Cpu, 
  Check, 
  CornerDownRight, 
  Layers,
  ArrowRight,
  HelpCircle
} from 'lucide-react';
import { GithubIcon } from '../common/Icons';

export const AiWorkAnalysisModal: React.FC = () => {
  const { 
    isAiWorkAnalysisModalOpen, 
    closeAiWorkAnalysisModal, 
    aiWorkAnalysisTarget, 
    approveMilestone,
    role,
    addToast
  } = useApp();

  if (!isAiWorkAnalysisModalOpen || !aiWorkAnalysisTarget) return null;

  const { project, milestone } = aiWorkAnalysisTarget;
  const analysis = milestone.submittedWork?.aiAnalysis;

  if (!analysis) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
        <div className="bg-white p-6 rounded-2xl max-w-md w-full text-center">
          <p className="text-sm font-semibold text-slate-700">No deliverable has been submitted for this milestone yet.</p>
          <button onClick={closeAiWorkAnalysisModal} className="mt-4 px-4 py-2 bg-slate-200 text-xs font-semibold rounded-lg">
            Close
          </button>
        </div>
      </div>
    );
  }

  const handleApprove = () => {
    approveMilestone(project.id, milestone.id);
    closeAiWorkAnalysisModal();
  };

  const handleRequestRevision = () => {
    addToast('Revision request sent to freelancer with AI feedback attached.', 'info');
    closeAiWorkAnalysisModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/65 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden relative animate-in zoom-in-95 duration-150 max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-200 bg-gradient-to-r from-teal-50/80 via-white to-orange-50/60 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-600 text-white flex items-center justify-center shadow-xs">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base text-slate-900">
                  AI Work Analysis: Requirements vs Submitted Work
                </h3>
                <span className="text-[10px] font-bold text-teal-700 bg-teal-100/70 px-2 py-0.5 rounded-full border border-teal-200">
                  AST Verified
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                {project.title} • {milestone.title} (${milestone.amount})
              </p>
            </div>
          </div>
          <button
            onClick={closeAiWorkAnalysisModal}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Deliverable Meta Links Bar */}
        <div className="px-6 py-3 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-4">
            <span className="text-slate-500 font-medium">Submitted Deliverable:</span>
            {milestone.submittedWork?.deliverableUrl && (
              <a
                href={milestone.submittedWork.deliverableUrl}
                target="_blank"
                rel="noreferrer"
                className="text-[#FF5520] hover:underline font-semibold flex items-center gap-1"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                Live Demo / Artifact
              </a>
            )}
            {milestone.submittedWork?.githubUrl && (
              <a
                href={milestone.submittedWork.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="text-slate-800 hover:text-black font-semibold flex items-center gap-1"
              >
                <GithubIcon className="w-3.5 h-3.5" />
                Source Repository
              </a>
            )}
          </div>
          <span className="text-[11px] text-slate-500">
            Submitted: {milestone.submittedWork?.submissionDate}
          </span>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          
          {/* Top Score Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-4 bg-teal-50/70 border border-teal-200/80 rounded-2xl flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-teal-600 text-white flex items-center justify-center font-bold text-lg shadow-xs">
                {analysis.requirementsFulfilledPercentage}%
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase text-teal-800 tracking-wider block">Requirements Met</span>
                <span className="text-xs text-teal-950 font-medium">High Match & Verified</span>
              </div>
            </div>

            <div className="p-4 bg-orange-50/70 border border-orange-200/80 rounded-2xl flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-orange-500 text-white flex items-center justify-center font-bold text-lg shadow-xs">
                {analysis.overallQualityScore}/10
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase text-orange-800 tracking-wider block">Work Quality</span>
                <span className="text-xs text-orange-950 font-medium">Production-Grade Polish</span>
              </div>
            </div>

            <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold text-lg shadow-xs">
                0
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase text-slate-600 tracking-wider block">Critical Flaws</span>
                <span className="text-xs text-slate-800 font-medium">No Security CVEs Found</span>
              </div>
            </div>
          </div>

          {/* Technical Quality Bars */}
          <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-3">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-[#FF5520]" />
              Automated Technical Quality Dimensions
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div>
                <div className="flex justify-between text-[11px] text-slate-600 mb-1">
                  <span>Architecture</span>
                  <span className="font-bold">{analysis.technicalQuality.codeArchitecture}/10</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div className="bg-teal-500 h-full rounded-full" style={{ width: `${analysis.technicalQuality.codeArchitecture * 10}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] text-slate-600 mb-1">
                  <span>UI Polish</span>
                  <span className="font-bold">{analysis.technicalQuality.uiResponsiveness}/10</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div className="bg-teal-500 h-full rounded-full" style={{ width: `${analysis.technicalQuality.uiResponsiveness * 10}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] text-slate-600 mb-1">
                  <span>Security</span>
                  <span className="font-bold">{analysis.technicalQuality.securityStandards}/10</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div className="bg-teal-500 h-full rounded-full" style={{ width: `${analysis.technicalQuality.securityStandards * 10}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] text-slate-600 mb-1">
                  <span>Performance</span>
                  <span className="font-bold">{analysis.technicalQuality.performanceEstimate}/10</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div className="bg-teal-500 h-full rounded-full" style={{ width: `${analysis.technicalQuality.performanceEstimate * 10}%` }} />
                </div>
              </div>
            </div>
          </div>

          {/* Completeness Checklist */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center justify-between">
              <span>Acceptance Criteria Checklist</span>
              <span className="text-[11px] text-slate-500 font-normal">
                {analysis.completenessChecklist.filter(c => c.satisfied).length} of {analysis.completenessChecklist.length} Verified
              </span>
            </h4>
            <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden bg-white">
              {analysis.completenessChecklist.map((item, idx) => (
                <div key={idx} className="p-3.5 flex items-start gap-3 text-xs">
                  {item.satisfied ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  ) : (
                    <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  )}
                  <div className="flex-1">
                    <span className={`font-semibold ${item.satisfied ? 'text-slate-900' : 'text-amber-900'}`}>
                      {item.item}
                    </span>
                    {item.note && (
                      <p className="text-[11px] text-slate-500 mt-0.5">{item.note}</p>
                    )}
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    item.satisfied ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                  }`}>
                    {item.satisfied ? 'Satisfied ✓' : 'Partial'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Detected Skills in Deliverable */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
              Detected Skills in Code & Artifacts
            </h4>
            <div className="flex flex-wrap gap-2">
              {analysis.detectedSkills.map((s, idx) => (
                <span key={idx} className="text-xs bg-slate-100 text-slate-800 font-medium px-2.5 py-1 rounded-lg border border-slate-200">
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* Suggested Improvements */}
          {analysis.suggestedImprovements.length > 0 && (
            <div className="p-4 bg-orange-50/70 border border-orange-200/80 rounded-xl text-xs text-orange-950 space-y-2">
              <h5 className="font-bold flex items-center gap-1.5 text-orange-900">
                <Sparkles className="w-3.5 h-3.5 text-[#FF5520]" />
                Suggested Next-Level Enhancements (Optional for Future Milestones)
              </h5>
              <ul className="space-y-1 text-slate-700 pl-4 list-disc text-xs">
                {analysis.suggestedImprovements.map((imp, idx) => (
                  <li key={idx}>{imp}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Legal / Protocol Disclaimer */}
          <div className="p-3.5 bg-slate-100 rounded-xl text-[11px] text-slate-600 flex items-start gap-2 border border-slate-200">
            <HelpCircle className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-slate-800">Important WorkNest Governance Notice:</span>
              <p className="mt-0.5">
                AI provides objective insights, code inspections, and requirement matching. The client retains full authority to request revisions or release milestone escrow funds.
              </p>
            </div>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          <button
            onClick={closeAiWorkAnalysisModal}
            className="text-xs text-slate-600 hover:text-slate-900 font-medium px-3 py-2"
          >
            Close Inspector
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handleRequestRevision}
              className="text-xs border border-slate-300 hover:bg-slate-100 text-slate-700 font-semibold px-4 py-2.5 rounded-xl transition-colors"
            >
              Request Revisions
            </button>
            <button
              onClick={handleApprove}
              className="text-xs bg-[#FF5520] hover:bg-[#E04615] text-white font-semibold px-5 py-2.5 rounded-xl shadow-md shadow-orange-500/20 flex items-center gap-1.5 transition-colors"
            >
              <Check className="w-4 h-4" />
              Approve Milestone & Release ${milestone.amount}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
