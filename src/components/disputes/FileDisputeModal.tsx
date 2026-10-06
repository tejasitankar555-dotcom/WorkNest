import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, ShieldAlert, AlertTriangle, FileText, Check } from 'lucide-react';

export const FileDisputeModal: React.FC = () => {
  const { 
    isFileDisputeModalOpen, 
    setIsFileDisputeModalOpen, 
    projects, 
    currentUser, 
    fileDispute, 
    addToast 
  } = useApp();

  const [selectedProjectId, setSelectedProjectId] = useState<string>(projects[0]?.id || 'proj-1');
  const [reason, setReason] = useState('Incomplete Deliverables');
  const [description, setDescription] = useState('');
  const [requestedResolution, setRequestedResolution] = useState<'Full Refund' | 'Partial Refund' | 'Deliverable Completion' | 'Arbitration'>('Deliverable Completion');
  const [evidenceName, setEvidenceName] = useState('specification-logs.txt');

  if (!isFileDisputeModalOpen) return null;

  const currentProject = projects.find(p => p.id === selectedProjectId) || projects[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) {
      addToast('Please provide an issue description and evidence summary', 'warning');
      return;
    }

    fileDispute({
      projectId: currentProject.id,
      projectTitle: currentProject.title,
      complainantName: currentUser.name,
      complainantRole: currentUser.role === 'freelancer' ? 'Freelancer' : 'Client',
      respondentName: currentUser.role === 'freelancer' ? currentProject.clientName : (currentProject.assignedFreelancerName || 'Assigned Contractor'),
      reason,
      description: description.trim(),
      evidenceFiles: [evidenceName],
      requestedResolution
    });

    setIsFileDisputeModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white w-full max-w-xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden relative animate-in zoom-in-95 duration-150 max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-100 bg-amber-50/60 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500 text-white flex items-center justify-center shadow-xs">
              <ShieldAlert className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-base text-slate-900">
                File a Project Dispute / Mediation Request
              </h3>
              <p className="text-xs text-slate-500">
                WorkNest Escrow Protection & Independent Technical Arbitration
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsFileDisputeModalOpen(false)}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto flex-1 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Select Disputed Project</label>
            <select
              value={selectedProjectId}
              onChange={(e) => setSelectedProjectId(e.target.value)}
              className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#FF5520]"
            >
              {projects.map(p => (
                <option key={p.id} value={p.id}>
                  {p.title} (${p.budgetType === 'Fixed' ? `${p.budgetMin} - ${p.budgetMax}` : `${p.budgetMin}/hr`})
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Primary Dispute Reason</label>
              <select
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full text-xs px-3 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#FF5520]"
              >
                <option value="Incomplete Deliverables">Incomplete Deliverables</option>
                <option value="Unmet Requirements / Code Quality">Unmet Requirements / Code Quality</option>
                <option value="Missed Contract Deadline">Missed Contract Deadline</option>
                <option value="Unreasonable Scope Expansion">Unreasonable Scope Expansion</option>
                <option value="Non-Responsiveness">Non-Responsiveness</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Requested Resolution</label>
              <select
                value={requestedResolution}
                onChange={(e) => setRequestedResolution(e.target.value as any)}
                className="w-full text-xs px-3 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#FF5520]"
              >
                <option value="Deliverable Completion">Deliverable Completion Order</option>
                <option value="Partial Refund">Partial Refund Release</option>
                <option value="Full Refund">Full Refund from Escrow</option>
                <option value="Arbitration">Human & AI Neutral Arbitration</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Detailed Description of the Issue
            </label>
            <textarea
              rows={4}
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="State what was agreed upon vs what was delivered, references to milestone brief, and attempts made to resolve in chat..."
              className="w-full text-xs p-3.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#FF5520]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Attach Evidence / Log File</label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={evidenceName}
                onChange={(e) => setEvidenceName(e.target.value)}
                className="flex-1 text-xs px-3 py-2 rounded-xl border border-slate-200"
              />
              <button
                type="button"
                className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold px-3 py-2 rounded-xl border border-slate-200"
              >
                Upload File
              </button>
            </div>
            <span className="text-[10px] text-slate-400 mt-1 block">
              WorkNest mediators inspect chat history, commit hashes, and automated AI Work Analysis logs.
            </span>
          </div>

          <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Escrow Protection Freeze</span>
              <p className="text-[11px] text-amber-800 mt-0.5">
                Filing a dispute pauses milestone payout release until our Trust & Safety mediation panel reviews the evidence.
              </p>
            </div>
          </div>

          <div className="pt-2 flex items-center justify-between border-t border-slate-100">
            <button
              type="button"
              onClick={() => setIsFileDisputeModalOpen(false)}
              className="text-xs text-slate-600 hover:text-slate-900 font-medium px-3 py-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold px-5 py-2.5 rounded-xl shadow-md transition-colors"
            >
              Submit Dispute to Mediation
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
