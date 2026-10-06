import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ShieldAlert, 
  HelpCircle, 
  FileText, 
  AlertTriangle, 
  CheckCircle2, 
  PhoneCall, 
  MessageSquare, 
  PlusCircle,
  Clock
} from 'lucide-react';

export const DisputesSupportPage: React.FC = () => {
  const { 
    disputes, 
    setIsFileDisputeModalOpen, 
    addToast 
  } = useApp();

  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  const supportFaqs = [
    {
      q: "How does WorkNest Escrow Protection work?",
      a: "When a client hires for a milestone, 100% of the funds are deposited into an independent cryptographic escrow vault. Funds are only transferred to the freelancer when the client signs off or the milestone terms are satisfied via AI Work Analysis verification."
    },
    {
      q: "What happens when a dispute is filed?",
      a: "The milestone payout is immediately frozen. Both parties submit evidence (commit logs, design files, workspace chat exports). Our technical arbitration panel reviews the AI Work Analysis checklist against the agreed contract terms and issues a binding resolution within 72 hours."
    },
    {
      q: "How does the AI arbitrator prevent arbitrary client chargebacks?",
      a: "Because deliverables are benchmarked against the original contract specification via AST parsing and test execution, clients cannot claim incomplete work if automated test suites pass 100% of agreed criteria."
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#FF5520] uppercase tracking-wider mb-1">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Trust, Safety & Arbitration</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Help Center & Project Dispute Resolution
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-xl">
            Neutral technical arbitration, escrow dispute protection, and 24/7 dedicated support.
          </p>
        </div>

        <button
          onClick={() => setIsFileDisputeModalOpen(true)}
          className="bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold px-5 py-2.5 rounded-xl shadow-md transition-all flex items-center gap-2 shrink-0"
        >
          <AlertTriangle className="w-4 h-4" />
          <span>File a Project Dispute</span>
        </button>
      </div>

      {/* Active Disputes List */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-4 text-xs">
        <h3 className="font-bold text-slate-900 uppercase tracking-wider text-sm flex items-center gap-2">
          <Clock className="w-4 h-4 text-amber-500" />
          Active Mediation Cases ({disputes.length})
        </h3>

        <div className="space-y-3">
          {disputes.map((caseItem) => (
            <div
              key={caseItem.id}
              className="p-4 rounded-2xl border border-slate-200 bg-slate-50/60 space-y-2"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 text-sm">
                      Case #{caseItem.id}: {caseItem.projectTitle}
                    </span>
                    <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded">
                      {caseItem.status}
                    </span>
                  </div>
                  <span className="text-slate-400 text-[11px]">
                    Filed by {caseItem.complainantName} • {caseItem.filedDate} • Resolution: {caseItem.requestedResolution}
                  </span>
                </div>
              </div>

              <p className="text-slate-700 leading-relaxed bg-white p-3 rounded-xl border border-slate-200">
                <strong>Reason: {caseItem.reason}</strong> — {caseItem.description}
              </p>

              {caseItem.resolutionNotes && (
                <div className="p-3 bg-teal-50 border border-teal-200 rounded-xl text-teal-900 text-[11px]">
                  <strong>Arbitrator Status:</strong> {caseItem.resolutionNotes}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Help Center FAQs */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-4">
        <h3 className="font-bold text-slate-900 uppercase tracking-wider text-sm">
          Escrow Protection & Dispute Policies
        </h3>

        <div className="space-y-3 text-xs">
          {supportFaqs.map((faq, idx) => (
            <div key={idx} className="border border-slate-200 rounded-xl overflow-hidden">
              <button
                onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                className="w-full text-left p-4 font-bold text-slate-900 hover:text-[#FF5520] flex items-center justify-between"
              >
                <span>{faq.q}</span>
                <span className="text-slate-400">{activeFaq === idx ? '−' : '+'}</span>
              </button>
              {activeFaq === idx && (
                <div className="px-4 pb-4 text-slate-600 border-t border-slate-100 pt-2 leading-relaxed">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
