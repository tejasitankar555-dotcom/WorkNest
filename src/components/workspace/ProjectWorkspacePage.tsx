import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Layers, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Cpu, 
  DollarSign, 
  FileText, 
  MessageSquare, 
  Send, 
  Upload, 
  ExternalLink, 
  ShieldCheck, 
  Sparkles, 
  Plus, 
  UserCheck, 
  Check,
  CheckSquare
} from 'lucide-react';
import { GithubIcon } from '../common/Icons';
import { ProjectMilestone } from '../../types';

export const ProjectWorkspacePage: React.FC = () => {
  const { 
    projects, 
    selectedProjectId, 
    currentUser, 
    role, 
    updateMilestoneStatus, 
    submitMilestoneWork, 
    approveMilestone, 
    openAiWorkAnalysisModal,
    addToast 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'milestones' | 'tasks' | 'files' | 'chat' | 'timeline'>('milestones');
  
  // Submission modal state
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [submittingMilestoneId, setSubmittingMilestoneId] = useState<string | null>(null);
  const [submissionNotes, setSubmissionNotes] = useState('');
  const [submissionDemoUrl, setSubmissionDemoUrl] = useState('https://worknest-inspector-alpha.vercel.app');
  const [submissionGithubUrl, setSubmissionGithubUrl] = useState('https://github.com/adityabhoyar/worknest-inspector-alpha');

  // Chat in workspace state
  const [chatInput, setChatInput] = useState('');
  const [workspaceMessages, setWorkspaceMessages] = useState([
    { id: 'wm-1', sender: 'Marcus Sterling (Client)', time: 'Yesterday 3:15 PM', text: 'Hi Aditya, looking forward to Milestone 2 deliverable!' },
    { id: 'wm-2', sender: 'Aditya Bhoyar (Freelancer)', time: 'Yesterday 5:40 PM', text: 'Completed the core modules! Ran the automated AST parser check and all tests pass.' },
    { id: 'wm-3', sender: 'WorkNest AI Agent', time: 'Today 10:15 AM', text: '⚡ AI Work Analysis Report ready for Milestone 2: 94% Requirements Fulfilled. 0 Critical Vulnerabilities detected.' }
  ]);

  const currentProject = projects.find(p => p.id === selectedProjectId) || projects[0];
  const milestones = currentProject.milestones || [];
  const tasks = currentProject.workspaceTasks || [];

  const handleOpenSubmit = (milestoneId: string) => {
    setSubmittingMilestoneId(milestoneId);
    setIsSubmitModalOpen(true);
  };

  const handleConfirmSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!submittingMilestoneId) return;
    submitMilestoneWork(
      currentProject.id, 
      submittingMilestoneId, 
      submissionNotes || 'Final production deliverable with complete unit test suite.', 
      submissionDemoUrl, 
      submissionGithubUrl
    );
    setIsSubmitModalOpen(false);
    setSubmittingMilestoneId(null);
  };

  const sendWorkspaceChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    setWorkspaceMessages(prev => [
      ...prev,
      {
        id: 'wm-' + Date.now(),
        sender: `${currentUser.name} (${currentUser.role === 'freelancer' ? 'Freelancer' : 'Client'})`,
        time: 'Just now',
        text: chatInput.trim()
      }
    ]);
    setChatInput('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Workspace Header */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-200 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
                Active Contract Workspace
              </span>
              <span className="text-xs text-slate-400">• Contract ID: #WN-{currentProject.id}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {currentProject.title}
            </h1>
            <p className="text-xs text-slate-500">
              Client: <span className="font-semibold text-slate-700">{currentProject.clientName}</span> • Assigned Freelancer: <span className="font-semibold text-slate-700">{currentProject.assignedFreelancerName || 'Aditya Bhoyar'}</span>
            </p>
          </div>

          {/* Escrow badge */}
          <div className="p-4 bg-orange-50 border border-orange-200 rounded-2xl text-right">
            <span className="text-[10px] uppercase font-bold text-[#FF5520] tracking-wider block">
              Escrow Protection Balance
            </span>
            <span className="text-2xl font-extrabold text-slate-900">
              ${(milestones.reduce((acc, m) => acc + (m.status === 'Paid' ? 0 : m.amount), 0)).toLocaleString()}
            </span>
            <span className="text-[10px] text-slate-500 block">Funds locked & release-guaranteed</span>
          </div>
        </div>

        {/* Workspace Navigation Tabs */}
        <div className="flex items-center gap-2 border-t border-slate-100 pt-4 overflow-x-auto text-xs font-bold">
          <button
            onClick={() => setActiveTab('milestones')}
            className={`px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
              activeTab === 'milestones'
                ? 'bg-[#FF5520] text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            Milestones & Deliverables ({milestones.length})
          </button>

          <button
            onClick={() => setActiveTab('tasks')}
            className={`px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
              activeTab === 'tasks'
                ? 'bg-[#FF5520] text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <CheckSquare className="w-3.5 h-3.5" />
            Sprint Tasks ({tasks.length})
          </button>

          <button
            onClick={() => setActiveTab('chat')}
            className={`px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
              activeTab === 'chat'
                ? 'bg-[#FF5520] text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            Contract Chat
          </button>

          <button
            onClick={() => setActiveTab('files')}
            className={`px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
              activeTab === 'files'
                ? 'bg-[#FF5520] text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            Files & Repository
          </button>

          <button
            onClick={() => setActiveTab('timeline')}
            className={`px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
              activeTab === 'timeline'
                ? 'bg-[#FF5520] text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            Activity Audit Log
          </button>
        </div>
      </div>

      {/* Main Workspace Body */}
      {activeTab === 'milestones' && (
        <div className="space-y-6">
          
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-slate-900 uppercase tracking-wider">
              Project Milestones Roadmap (Pending → In Progress → Submitted → Approved → Paid)
            </span>
            <span className="text-slate-500">
              All milestones undergo automated AI Work Analysis upon submission
            </span>
          </div>

          <div className="space-y-4">
            {milestones.map((milestone, idx) => {
              const statusColors = {
                Paid: 'bg-emerald-50 text-emerald-800 border-emerald-200',
                Approved: 'bg-teal-50 text-teal-800 border-teal-200',
                Submitted: 'bg-orange-50 text-[#FF5520] border-orange-200 font-bold animate-pulse',
                'In Progress': 'bg-blue-50 text-blue-700 border-blue-200',
                Pending: 'bg-slate-100 text-slate-600 border-slate-200'
              };

              return (
                <div
                  key={milestone.id}
                  className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs hover:border-slate-300 transition-all space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] px-2.5 py-0.5 rounded-full border ${statusColors[milestone.status]}`}>
                          Status: {milestone.status}
                        </span>
                        <span className="text-xs text-slate-400">• Due: {milestone.dueDate}</span>
                      </div>
                      <h3 className="text-base font-bold text-slate-900">{milestone.title}</h3>
                      <p className="text-xs text-slate-600">{milestone.description}</p>
                    </div>

                    <div className="text-right sm:shrink-0">
                      <span className="text-lg font-extrabold text-slate-900">${milestone.amount}</span>
                      <span className="text-[10px] text-slate-400 block font-medium">Escrow Allocated</span>
                    </div>
                  </div>

                  {/* Submitted Work & AI Insights Inspector Banner */}
                  {milestone.submittedWork && (
                    <div className="p-4 bg-teal-50/70 border border-teal-200/80 rounded-xl space-y-3">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <Cpu className="w-4 h-4 text-teal-600 shrink-0" />
                          <span className="text-xs font-bold text-slate-900">
                            Deliverable Submitted & Audited by AI Work Analysis
                          </span>
                        </div>

                        <button
                          onClick={() => openAiWorkAnalysisModal(currentProject, milestone)}
                          className="bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold px-3 py-1.5 rounded-lg shadow-2xs transition-colors flex items-center gap-1.5"
                        >
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>Inspect AI Analysis Report</span>
                        </button>
                      </div>

                      <div className="text-xs text-slate-700 leading-relaxed bg-white/80 p-3 rounded-lg border border-teal-100">
                        <p className="font-medium text-slate-900 mb-1">Contractor Notes:</p>
                        <p className="text-slate-600 italic">{milestone.submittedWork.notes}</p>
                        <div className="flex items-center gap-4 mt-2 font-semibold text-[11px]">
                          {milestone.submittedWork.deliverableUrl && (
                            <a href={milestone.submittedWork.deliverableUrl} target="_blank" rel="noreferrer" className="text-[#FF5520] hover:underline flex items-center gap-1">
                              <ExternalLink className="w-3 h-3" /> Live Artifact
                            </a>
                          )}
                          {milestone.submittedWork.githubUrl && (
                            <a href={milestone.submittedWork.githubUrl} target="_blank" rel="noreferrer" className="text-slate-800 hover:underline flex items-center gap-1">
                              <GithubIcon className="w-3 h-3" /> Source Code
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Milestone Action Buttons */}
                  <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
                    <span className="text-slate-400">
                      Phase {idx + 1} of {milestones.length}
                    </span>

                    <div className="flex items-center gap-2">
                      {/* Submit Work button for Freelancer */}
                      {(milestone.status === 'In Progress' || milestone.status === 'Pending') && (
                        <button
                          onClick={() => handleOpenSubmit(milestone.id)}
                          className="bg-[#FF5520] hover:bg-[#E04615] text-white font-semibold px-4 py-2 rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
                        >
                          <Upload className="w-3.5 h-3.5" />
                          <span>Submit Milestone Deliverable</span>
                        </button>
                      )}

                      {/* Approval button for Client */}
                      {milestone.status === 'Submitted' && (
                        <>
                          <button
                            onClick={() => openAiWorkAnalysisModal(currentProject, milestone)}
                            className="border border-slate-300 hover:bg-slate-100 text-slate-700 font-semibold px-3 py-2 rounded-xl transition-colors"
                          >
                            Review AI Analysis
                          </button>
                          <button
                            onClick={() => approveMilestone(currentProject.id, milestone.id)}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-4 py-2 rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
                          >
                            <Check className="w-4 h-4" />
                            <span>Approve & Release ${milestone.amount}</span>
                          </button>
                        </>
                      )}

                      {milestone.status === 'Paid' && (
                        <span className="text-emerald-700 font-bold flex items-center gap-1 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          Paid & Completed
                        </span>
                      )}
                    </div>
                  </div>

                </div>
              );
            })}
          </div>

        </div>
      )}

      {activeTab === 'tasks' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Sprint Tasks & Progress Kanban
            </h3>
            <span className="text-xs text-slate-500">Live synchronized board</span>
          </div>

          <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden">
            {tasks.map(task => (
              <div key={task.id} className="p-4 flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <span className={`w-2.5 h-2.5 rounded-full ${
                    task.status === 'Done' ? 'bg-emerald-500' : task.status === 'In Progress' ? 'bg-[#FF5520]' : 'bg-slate-300'
                  }`} />
                  <div>
                    <h4 className="font-bold text-slate-900">{task.title}</h4>
                    <span className="text-slate-500">Assignee: {task.assignedTo} • Due {task.dueDate}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                    {task.priority} Priority
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-200 text-slate-800">
                    {task.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'chat' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden flex flex-col h-[500px]">
          <div className="p-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
            <span className="text-xs font-bold text-slate-900">Project Channel: {currentProject.title}</span>
            <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span> End-to-End Encrypted
            </span>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {workspaceMessages.map(msg => (
              <div key={msg.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200/70 text-xs space-y-1">
                <div className="flex items-center justify-between font-bold text-slate-900">
                  <span>{msg.sender}</span>
                  <span className="text-[10px] text-slate-400 font-normal">{msg.time}</span>
                </div>
                <p className="text-slate-700 leading-relaxed">{msg.text}</p>
              </div>
            ))}
          </div>

          <form onSubmit={sendWorkspaceChat} className="p-3 border-t border-slate-200 bg-white flex items-center gap-2">
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder="Send project update, file link, or question..."
              className="flex-1 text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#FF5520]"
            />
            <button
              type="submit"
              className="p-2.5 bg-[#FF5520] hover:bg-[#E04615] text-white rounded-xl shadow-xs transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}

      {activeTab === 'files' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4 text-xs">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-900 uppercase tracking-wider">
              Deliverables Repository & Artifacts
            </h3>
            <button className="text-xs text-[#FF5520] font-semibold hover:underline flex items-center gap-1">
              <Upload className="w-3.5 h-3.5" /> Upload File
            </button>
          </div>
          <div className="space-y-2">
            <div className="p-3 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <FileText className="w-4 h-4 text-teal-600" />
                <span className="font-semibold text-slate-900">architecture-spec-v2.pdf</span>
              </div>
              <span className="text-slate-400">1.8 MB • Uploaded Oct 08</span>
            </div>
            <div className="p-3 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <FileText className="w-4 h-4 text-teal-600" />
                <span className="font-semibold text-slate-900">benchmark-results.json</span>
              </div>
              <span className="text-slate-400">340 KB • Uploaded Oct 16</span>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'timeline' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4 text-xs">
          <h3 className="font-bold text-slate-900 uppercase tracking-wider">
            Contract Audit Timeline
          </h3>
          <div className="space-y-3 pl-3 border-l-2 border-slate-200">
            <div className="space-y-0.5">
              <span className="font-bold text-slate-900">Contract Funded & Escrow Secured ($7,000)</span>
              <p className="text-slate-500">Oct 03, 2026 • Stripe Transaction #TX-9812</p>
            </div>
            <div className="space-y-0.5">
              <span className="font-bold text-slate-900">Milestone 1 Deliverable Approved & Released ($1,500)</span>
              <p className="text-slate-500">Oct 08, 2026 • 100% Verification Score</p>
            </div>
            <div className="space-y-0.5">
              <span className="font-bold text-[#FF5520]">Milestone 2 Submitted & AI Work Analysis Completed (94%)</span>
              <p className="text-slate-500">Oct 16, 2026 • Awaiting Client Sign-off</p>
            </div>
          </div>
        </div>
      )}

      {/* Submit Deliverable Modal */}
      {isSubmitModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-slate-200 p-6 space-y-4 animate-in zoom-in-95 duration-150 text-xs">
            <h3 className="font-bold text-base text-slate-900">Submit Milestone Work for AI Analysis</h3>
            <p className="text-slate-600">
              Provide your deliverable URLs and work notes. The WorkNest AI engine will automatically scan code quality, test coverage, and compare deliverables against requirements.
            </p>

            <form onSubmit={handleConfirmSubmit} className="space-y-3">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Live Demo / Deployed Artifact URL</label>
                <input
                  type="url"
                  required
                  value={submissionDemoUrl}
                  onChange={(e) => setSubmissionDemoUrl(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Source Repository / Pull Request</label>
                <input
                  type="url"
                  required
                  value={submissionGithubUrl}
                  onChange={(e) => setSubmissionGithubUrl(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Deliverable Notes & Test Instructions</label>
                <textarea
                  rows={3}
                  value={submissionNotes}
                  onChange={(e) => setSubmissionNotes(e.target.value)}
                  placeholder="Explain what was accomplished, how to run tests, and any special architecture decisions..."
                  className="w-full p-3 rounded-xl border border-slate-200"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsSubmitModalOpen(false)}
                  className="px-4 py-2 text-slate-600 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#FF5520] hover:bg-[#E04615] text-white font-semibold px-5 py-2.5 rounded-xl shadow-xs"
                >
                  Run AI Verification & Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
