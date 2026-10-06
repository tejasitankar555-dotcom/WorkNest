import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Sparkles, 
  X, 
  Send, 
  Bot, 
  User, 
  Briefcase, 
  Zap, 
  CheckCircle, 
  ArrowRight,
  ShieldAlert,
  Layers,
  GraduationCap
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
  actionButton?: {
    label: string;
    action: () => void;
  };
}

export const AiAssistantDrawer: React.FC = () => {
  const { 
    isAiAssistantOpen, 
    setIsAiAssistantOpen, 
    aiAssistantMode, 
    setAiAssistantMode, 
    navigateTo, 
    openSkillAssessment, 
    setIsCreateTeamModalOpen 
  } = useApp();

  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init-1',
      sender: 'ai',
      text: aiAssistantMode === 'freelancer'
        ? "Hello Aditya! I am your WorkNest AI Career & Proposal Copilot. I analyze real-time market demand, refine your proposals, uncover skill gaps, and match you with verified high-value contracts."
        : "Welcome Marcus! I am your WorkNest AI Hiring & Project Strategist. I can generate complete project briefs, estimate complexity and budgets, break down milestones, and match top 1% verified engineers or teams.",
      timestamp: 'Just now'
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  if (!isAiAssistantOpen) return null;

  const handleSend = (textToSend?: string) => {
    const messageText = textToSend || input;
    if (!messageText.trim()) return;

    const userMsg: ChatMessage = {
      id: 'u-' + Date.now(),
      sender: 'user',
      text: messageText,
      timestamp: 'Just now'
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      let aiResponseText = '';
      let actionBtn: ChatMessage['actionButton'] = undefined;

      const lower = messageText.toLowerCase();

      if (aiAssistantMode === 'freelancer') {
        if (lower.includes('proposal') || lower.includes('pitch')) {
          aiResponseText = "Here is a high-converting formula tailored for your profile:\n\n1. Hook: Mention the client's core constraint in sentence one.\n2. Proof: Cite your 'Autonomous Code-Reviewer Agent' (94% code quality score).\n3. Risk Reversal: Offer a 3-day milestone prototype before full escrow commitment.\n\nWould you like me to open the AI Proposal Assistant on an active project?";
          actionBtn = {
            label: "Browse Open Projects",
            action: () => {
              navigateTo('marketplace');
              setIsAiAssistantOpen(false);
            }
          };
        } else if (lower.includes('skill') || lower.includes('gap') || lower.includes('verify')) {
          aiResponseText = "Based on current marketplace demand, jobs requiring 'Python' and 'AI/ML' pay a 42% premium. You currently have verified badges in Python (Expert) and React (Expert). Taking the 'UI/UX Engineering' or 'DevOps' assessment will boost your WorkNest Reputation Score to 98/100!";
          actionBtn = {
            label: "Take Python Assessment",
            action: () => {
              openSkillAssessment('Python');
              setIsAiAssistantOpen(false);
            }
          };
        } else if (lower.includes('team') || lower.includes('collaborat')) {
          aiResponseText = "Clients on WorkNest are hiring cross-functional teams 3x faster for complex SaaS projects. Your synergy score with Elena Rostova (Staff Designer) and Dr. Sarah Lin (AI Scientist) is 98%. You can form a team to bid on enterprise contracts together!";
          actionBtn = {
            label: "Create Freelancer Team",
            action: () => {
              setIsCreateTeamModalOpen(true);
              setIsAiAssistantOpen(false);
            }
          };
        } else {
          aiResponseText = `I have analyzed your request. I recommend highlighting your verified credentials and sharing real proof of work in the Portfolio Feed to maximize client inbound interest.`;
        }
      } else {
        // Client Mode
        if (lower.includes('brief') || lower.includes('description') || lower.includes('post')) {
          aiResponseText = "I can draft a comprehensive technical scope with automatically estimated milestones, timeline, and recommended budget. Let's launch the AI Project Breakdown wizard!";
          actionBtn = {
            label: "Launch AI Project Wizard",
            action: () => {
              navigateTo('post-project');
              setIsAiAssistantOpen(false);
            }
          };
        } else if (lower.includes('talent') || lower.includes('hire') || lower.includes('engineer')) {
          aiResponseText = "Top match detected: Aditya Bhoyar (94% AI Match). He has verified Expert Python & React credentials and a 4.96 rating across 42 completed projects. Alternatively, 'Full-Stack AI Pioneers' can deliver the full turn-key solution.";
          actionBtn = {
            label: "View Top Talent Profile",
            action: () => {
              navigateTo('profile', { freelancerId: 'fl-1' });
              setIsAiAssistantOpen(false);
            }
          };
        } else if (lower.includes('analysis') || lower.includes('work') || lower.includes('milestone')) {
          aiResponseText = "In your active workspace for 'WorkNest AI Workspace', Milestone 2 has been submitted. The AI Work Analysis verified 94% requirement fulfillment with 0 critical security issues. Would you like to inspect the deliverable?";
          actionBtn = {
            label: "Open Project Workspace",
            action: () => {
              navigateTo('workspace', { projectId: 'proj-1' });
              setIsAiAssistantOpen(false);
            }
          };
        } else {
          aiResponseText = "I can help you scope requirements, benchmark freelancer rates ($75 - $130/hr for Senior Full-Stack/AI), or verify submitted deliverables with AST code comparison.";
        }
      }

      setIsTyping(false);
      setMessages(prev => [
        ...prev,
        {
          id: 'ai-' + Date.now(),
          sender: 'ai',
          text: aiResponseText,
          timestamp: 'Just now',
          actionButton: actionBtn
        }
      ]);
    }, 1000);
  };

  const quickPrompts = aiAssistantMode === 'freelancer' ? [
    "How can I improve my project proposals?",
    "Identify my skill gaps & recommend verifications",
    "Find collaborators to form a high-earning team",
    "What is the recommended hourly rate for my skillset?"
  ] : [
    "Write a technical brief for an AI web application",
    "Find top 1% verified React & Python engineers",
    "Analyze submitted work for Milestone 2",
    "Should I hire a solo freelancer or a team?"
  ];

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col border-l border-slate-200 animate-in slide-in-from-right duration-200">
        
        {/* Header */}
        <div className="p-4 border-b border-slate-200 bg-gradient-to-r from-teal-50 to-orange-50/50 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-teal-600 text-white flex items-center justify-center shadow-xs">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-900 flex items-center gap-1.5">
                WorkNest AI Assistant
                <span className="text-[10px] font-semibold text-teal-700 bg-teal-100/70 px-1.5 py-0.2 rounded">
                  Copilot
                </span>
              </h3>
              <p className="text-[11px] text-slate-500">Autonomous Talent & Work Intelligence</p>
            </div>
          </div>
          <button
            onClick={() => setIsAiAssistantOpen(false)}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mode Switcher */}
        <div className="px-4 py-2.5 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
          <span className="text-xs text-slate-500 font-medium">Assistant Mode:</span>
          <div className="flex bg-slate-200/80 rounded-lg p-0.5 text-xs font-semibold">
            <button
              onClick={() => {
                setAiAssistantMode('freelancer');
                setMessages(prev => [
                  ...prev,
                  {
                    id: 'mode-' + Date.now(),
                    sender: 'ai',
                    text: "Switched to Freelancer Copilot mode. How can I help boost your earnings and reputation today?",
                    timestamp: 'Just now'
                  }
                ]);
              }}
              className={`px-3 py-1 rounded-md transition-all ${
                aiAssistantMode === 'freelancer' ? 'bg-white text-orange-600 shadow-2xs' : 'text-slate-600'
              }`}
            >
              Freelancer
            </button>
            <button
              onClick={() => {
                setAiAssistantMode('client');
                setMessages(prev => [
                  ...prev,
                  {
                    id: 'mode-' + Date.now(),
                    sender: 'ai',
                    text: "Switched to Client Hiring Strategist mode. How can I assist with your project scope or talent matching?",
                    timestamp: 'Just now'
                  }
                ]);
              }}
              className={`px-3 py-1 rounded-md transition-all ${
                aiAssistantMode === 'client' ? 'bg-white text-orange-600 shadow-2xs' : 'text-slate-600'
              }`}
            >
              Client
            </button>
          </div>
        </div>

        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex items-start gap-2.5 ${m.sender === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                m.sender === 'ai' ? 'bg-teal-600 text-white' : 'bg-orange-500 text-white'
              }`}>
                {m.sender === 'ai' ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
              </div>
              
              <div className={`max-w-[85%] rounded-2xl p-3.5 text-xs leading-relaxed ${
                m.sender === 'ai'
                  ? 'bg-slate-100 text-slate-800 border border-slate-200/70 shadow-2xs'
                  : 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-xs'
              }`}>
                <div className="whitespace-pre-line">{m.text}</div>
                
                {m.actionButton && (
                  <button
                    onClick={m.actionButton.action}
                    className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#FF5520] hover:bg-[#E04615] text-white shadow-xs transition-colors"
                  >
                    <span>{m.actionButton.label}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
                
                <span className={`block text-[10px] mt-1.5 ${
                  m.sender === 'ai' ? 'text-slate-400' : 'text-orange-200'
                }`}>
                  {m.timestamp}
                </span>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <Bot className="w-4 h-4 text-teal-600 animate-pulse" />
              <span>WorkNest AI is generating insights...</span>
            </div>
          )}
        </div>

        {/* Quick Prompts */}
        <div className="p-3 bg-slate-50 border-t border-slate-100">
          <p className="text-[10px] uppercase font-bold tracking-wider text-slate-400 mb-2">
            Suggested Prompts
          </p>
          <div className="flex flex-wrap gap-1.5">
            {quickPrompts.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(prompt)}
                className="text-[11px] bg-white hover:bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg border border-slate-200/80 transition-colors text-left"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>

        {/* Input Bar */}
        <div className="p-3 border-t border-slate-200 bg-white">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={aiAssistantMode === 'freelancer' ? 'Ask anything (e.g. improve proposal, find jobs)...' : 'Ask anything (e.g. write brief, find talent)...'}
              className="flex-1 bg-slate-100 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 placeholder:text-slate-400 outline-none focus:border-teal-500 focus:bg-white transition-all"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="p-2 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 disabled:opacity-40 text-white rounded-xl shadow-xs transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
          <p className="text-[10px] text-center text-slate-400 mt-2">
            AI recommendations are advisory. Clients & Freelancers make final agreements.
          </p>
        </div>
      </div>
    </div>
  );
};
