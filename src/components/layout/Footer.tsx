import React from 'react';
import { useApp } from '../../context/AppContext';
import { Sparkles, Shield, Cpu, Users, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigateTo } = useApp();

  return (
    <footer className="bg-white border-t border-slate-200 text-slate-600 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#FF5520] to-[#FF8042] flex items-center justify-center text-white font-extrabold text-lg shadow-sm">
                W
              </div>
              <span className="text-xl font-bold tracking-tight text-slate-900">WorkNest</span>
              <span className="px-2 py-0.5 text-[10px] font-semibold bg-teal-50 text-teal-700 border border-teal-200 rounded-full">
                AI + Community
              </span>
            </div>
            
            <p className="text-sm text-slate-600 max-w-sm leading-relaxed">
              The Future of Freelancing: Powered by AI, Community & Real Work. Connecting high-caliber talent with clients through verified deliverables, autonomous milestone analysis, and skill hubs.
            </p>

            <div className="p-3.5 bg-orange-50/70 border border-orange-200/60 rounded-xl text-xs text-orange-950 font-medium">
              <span className="text-[#FF5520] font-bold block mb-1">Our Core Philosophy</span>
              “Let talent be discovered through real work, collaborative reputation, and verifiable outcomes.”
            </div>

            <div className="flex items-center gap-3 pt-2">
              <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-medium bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                AI Verification Nodes Active (99.98%)
              </div>
            </div>
          </div>

          {/* Column 1: For Freelancers */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">For Freelancers</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button onClick={() => navigateTo('marketplace')} className="hover:text-[#FF5520] transition-colors">
                  Discover Projects
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('feed')} className="hover:text-[#FF5520] transition-colors">
                  Social Work Feed
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('communities')} className="hover:text-[#FF5520] transition-colors">
                  Skill Communities
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('teams')} className="hover:text-[#FF5520] transition-colors">
                  Team Formation
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('profile', { freelancerId: 'fl-1' })} className="hover:text-[#FF5520] transition-colors">
                  AI Skill Verification
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('workspace', { projectId: 'proj-1' })} className="hover:text-[#FF5520] transition-colors">
                  Milestone Escrow
                </button>
              </li>
            </ul>
          </div>

          {/* Column 2: For Clients */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">For Clients</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button onClick={() => navigateTo('post-project')} className="hover:text-[#FF5520] transition-colors">
                  Post with AI Breakdown
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('talent')} className="hover:text-[#FF5520] transition-colors">
                  Find Verified Talent
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('teams')} className="hover:text-[#FF5520] transition-colors">
                  Hire Cross-Functional Teams
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('workspace', { projectId: 'proj-1' })} className="hover:text-[#FF5520] transition-colors">
                  AI Work Analysis Inspector
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('disputes')} className="hover:text-[#FF5520] transition-colors">
                  Dispute & Escrow Security
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Platform & AI */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Platform & AI</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <span className="flex items-center gap-1.5 text-slate-700">
                  <Cpu className="w-3.5 h-3.5 text-teal-600" />
                  AST Deliverable Scanner
                </span>
              </li>
              <li>
                <span className="flex items-center gap-1.5 text-slate-700">
                  <Sparkles className="w-3.5 h-3.5 text-orange-500" />
                  Semantic Talent Match 2.0
                </span>
              </li>
              <li>
                <button onClick={() => navigateTo('disputes')} className="hover:text-[#FF5520] transition-colors">
                  Trust & Safety Center
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('settings')} className="hover:text-[#FF5520] transition-colors">
                  2FA & Privacy Settings
                </button>
              </li>
              <li>
                <span className="text-xs text-slate-400">
                  Full Functional Prototype v2.4
                </span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="border-t border-slate-200 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2026 WorkNest Inc. All rights reserved. Built with AI, Community & Verified Work.</p>
          <div className="flex items-center gap-6">
            <button onClick={() => navigateTo('disputes')} className="hover:text-slate-800 transition-colors">Privacy Policy</button>
            <button onClick={() => navigateTo('disputes')} className="hover:text-slate-800 transition-colors">Terms of Service</button>
            <button onClick={() => navigateTo('disputes')} className="hover:text-slate-800 transition-colors">Escrow Protection Agreement</button>
          </div>
        </div>
      </div>
    </footer>
  );
};
