import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  Cpu, 
  Users, 
  Layers, 
  Award, 
  Briefcase, 
  Search, 
  Star, 
  TrendingUp,
  ExternalLink,
  ChevronRight,
  Code,
  Check,
  Zap,
  HelpCircle
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { 
    navigateTo, 
    setRole, 
    openSkillAssessment, 
    projects, 
    freelancers, 
    posts, 
    communities, 
    teams,
    openApplyModal,
    setIsAiAssistantOpen 
  } = useApp();

  const [activeJourneyTab, setActiveJourneyTab] = useState<'freelancer' | 'client'>('freelancer');
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: "How is WorkNest different from traditional freelancing marketplaces like Upwork or Fiverr?",
      a: "Traditional platforms rely on unverified text resumes, bid spamming, and arbitrary reviews. WorkNest operates on 'Proof of Real Work': talent is discovered through an interactive Social Portfolio Feed, skills are verified through hands-on AI code assessments, and client deliverables are autonomously inspected by AI against the agreed project brief before escrow release."
    },
    {
      q: "What is AI Skill Verification and does it claim official certification?",
      a: "WorkNest AI Skill Assessments test practical, real-world engineering and design scenarios (generators, async loops, design token scales, concurrency bounds). We objectively measure skill levels (Beginner, Intermediate, Advanced, Expert) and display a verified badge. We do not claim official third-party certification."
    },
    {
      q: "How does the AI Work Analysis inspect submitted deliverables?",
      a: "When a freelancer submits milestone work (code repository, live artifact URL, or design files), the AI Work Analysis engine cross-references the deliverable against the exact client acceptance criteria. It scores requirement fulfillment (e.g. 94%), checks code architecture and responsiveness, detects missing points, and provides recommendations. The client maintains complete authority over final approval."
    },
    {
      q: "Can clients hire entire freelancer teams?",
      a: "Yes! WorkNest supports collaborative Team Formation. Verified specialists in UI/UX, Full-Stack development, AI/ML, and Cloud architecture can form squads with proven synergy scores, allowing clients to hire complete cross-functional units for complex contracts."
    }
  ];

  return (
    <div className="space-y-24 pb-16">
      
      {/* Hero Section */}
      <section className="relative pt-12 pb-20 overflow-hidden">
        {/* Ambient subtle glow background */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-orange-100/40 via-teal-50/20 to-transparent pointer-events-none rounded-b-[40px] -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            
            {/* Pill Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-50 border border-orange-200/80 text-[#FF5520] text-xs font-semibold shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#FF5520] animate-ping" />
              <span>Next-Generation Freelance Ecosystem</span>
              <span className="text-slate-300">•</span>
              <span className="text-slate-700 font-medium">AI + Proof of Work</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.12]">
              Don’t Just Find Freelancers.{' '}
              <span className="bg-gradient-to-r from-[#FF5520] via-[#FF7A45] to-amber-500 bg-clip-text text-transparent">
                Discover Proven Talent.
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
              A community-driven freelancing platform powered by AI, real work, and collaboration. Replace resume claims with verified deliverables, autonomous milestone analysis, and skill hubs.
            </p>

            {/* Dual CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                onClick={() => {
                  setRole('client');
                  navigateTo('talent');
                }}
                className="w-full sm:w-auto bg-[#FF5520] hover:bg-[#E04615] text-white px-7 py-3.5 rounded-xl font-semibold text-sm shadow-lg shadow-orange-500/25 transition-all flex items-center justify-center gap-2 hover:-translate-y-0.5"
              >
                <span>Find Proven Talent</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  setRole('freelancer');
                  navigateTo('marketplace');
                }}
                className="w-full sm:w-auto bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 px-7 py-3.5 rounded-xl font-semibold text-sm shadow-xs transition-all flex items-center justify-center gap-2 hover:-translate-y-0.5"
              >
                <Briefcase className="w-4 h-4 text-[#FF5520]" />
                <span>Find Verified Work</span>
              </button>
            </div>

            {/* Stats row */}
            <div className="pt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto text-left">
              <div className="p-3.5 rounded-xl bg-white border border-slate-200/80 shadow-2xs">
                <span className="text-xl font-bold text-slate-900 block">94.8%</span>
                <span className="text-xs text-slate-500">First-Milestone Acceptance</span>
              </div>
              <div className="p-3.5 rounded-xl bg-white border border-slate-200/80 shadow-2xs">
                <span className="text-xl font-bold text-teal-700 block">4,200+</span>
                <span className="text-xs text-slate-500">Verified Skill Badges</span>
              </div>
              <div className="p-3.5 rounded-xl bg-white border border-slate-200/80 shadow-2xs">
                <span className="text-xl font-bold text-[#FF5520] block">0 hrs</span>
                <span className="text-xs text-slate-500">Unvetted Resume Review</span>
              </div>
              <div className="p-3.5 rounded-xl bg-white border border-slate-200/80 shadow-2xs">
                <span className="text-xl font-bold text-slate-900 block">$1.4M+</span>
                <span className="text-xs text-slate-500">Escrow Protected</span>
              </div>
            </div>

          </div>

          {/* Interactive Live Platform Preview Cards */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Card 1: AI Match Radar */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-md hover:shadow-lg transition-all space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-teal-50 text-teal-700 border border-teal-200 flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3 text-teal-600" />
                  Semantic Talent Match
                </span>
                <span className="text-xs font-bold text-emerald-600">96% Match</span>
              </div>

              <div className="flex items-center gap-3">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80"
                  alt="Aditya"
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-orange-200"
                />
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Aditya Bhoyar</h4>
                  <p className="text-xs text-slate-500">Full-Stack & AI Agent Architect</p>
                  <div className="flex items-center gap-1 mt-0.5 text-xs text-amber-500 font-semibold">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span>4.96 (38 reviews)</span>
                  </div>
                </div>
              </div>

              <div className="space-y-1.5 text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100">
                <div className="flex justify-between">
                  <span>Python AST Parser:</span>
                  <span className="font-bold text-slate-900">Verified Expert ✓</span>
                </div>
                <div className="flex justify-between">
                  <span>FastAPI & Microservices:</span>
                  <span className="font-bold text-slate-900">Verified 98%</span>
                </div>
                <div className="flex justify-between">
                  <span>WorkNest Reputation:</span>
                  <span className="font-bold text-[#FF5520]">96 / 100</span>
                </div>
              </div>

              <button
                onClick={() => navigateTo('profile', { freelancerId: 'fl-1' })}
                className="w-full text-center text-xs font-semibold text-[#FF5520] hover:text-[#E04615] pt-1 flex items-center justify-center gap-1"
              >
                <span>View Full Proof Profile</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Card 2: AI Work Inspector */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-md hover:shadow-lg transition-all space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-orange-50 text-[#FF5520] border border-orange-200 flex items-center gap-1.5">
                  <Cpu className="w-3 h-3 text-[#FF5520]" />
                  AI Work Analysis
                </span>
                <span className="text-xs font-bold text-teal-700">Milestone 2 Verified</span>
              </div>

              <div>
                <h4 className="text-sm font-bold text-slate-900">WorkNest AI Deliverable Inspector</h4>
                <p className="text-xs text-slate-500">Autonomous requirement comparison against client brief</p>
              </div>

              <div className="space-y-2 bg-slate-50 p-3.5 rounded-xl border border-slate-100 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Requirement Fulfillment:</span>
                  <span className="font-bold text-teal-700">94% Passed</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                  <div className="bg-teal-500 h-full rounded-full w-[94%]" />
                </div>
                <div className="flex items-center justify-between pt-1">
                  <span className="text-slate-600">Code Quality Score:</span>
                  <span className="font-bold text-slate-900">9.2 / 10</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">OWASP Vulnerabilities:</span>
                  <span className="font-bold text-emerald-600">0 Detected</span>
                </div>
              </div>

              <button
                onClick={() => navigateTo('workspace', { projectId: 'proj-1' })}
                className="w-full text-center text-xs font-semibold text-[#FF5520] hover:text-[#E04615] pt-1 flex items-center justify-center gap-1"
              >
                <span>Inspect Active Workspace</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Card 3: Collaborative Team Squads */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-md hover:shadow-lg transition-all space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-200 flex items-center gap-1.5">
                  <Users className="w-3 h-3 text-indigo-600" />
                  Team Formation
                </span>
                <span className="text-xs font-bold text-indigo-700">Synergy: 98%</span>
              </div>

              <div>
                <h4 className="text-sm font-bold text-slate-900">Full-Stack AI Pioneers</h4>
                <p className="text-xs text-slate-500">4 Verified Specialists • Turn-Key Product Squad</p>
              </div>

              <div className="flex items-center -space-x-2 py-1">
                {freelancers.slice(0, 4).map((f, i) => (
                  <img
                    key={i}
                    src={f.avatar}
                    alt={f.name}
                    className="w-9 h-9 rounded-full object-cover border-2 border-white ring-1 ring-slate-200"
                  />
                ))}
                <div className="w-9 h-9 rounded-full bg-slate-100 border-2 border-white flex items-center justify-center text-[10px] font-bold text-slate-600">
                  +1
                </div>
              </div>

              <div className="text-xs text-slate-600 space-y-1 bg-slate-50 p-3 rounded-xl border border-slate-100">
                <p>• Lead Engineer + Staff UI Designer + AI Scientist</p>
                <p>• 28 Completed Team Contracts ($290/hr combined)</p>
              </div>

              <button
                onClick={() => navigateTo('teams')}
                className="w-full text-center text-xs font-semibold text-[#FF5520] hover:text-[#E04615] pt-1 flex items-center justify-center gap-1"
              >
                <span>Browse Freelancer Teams</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* How It Works (Interactive Dual Journey) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
            How WorkNest Redefines the Journey
          </h2>
          <p className="text-sm text-slate-600">
            Transparent, milestone-governed workflows for independent contractors and high-growth hiring teams.
          </p>

          <div className="inline-flex bg-slate-100 p-1 rounded-xl mt-4 border border-slate-200">
            <button
              onClick={() => setActiveJourneyTab('freelancer')}
              className={`px-5 py-2 rounded-lg text-xs font-bold transition-all ${
                activeJourneyTab === 'freelancer'
                  ? 'bg-white text-[#FF5520] shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Freelancer Journey
            </button>
            <button
              onClick={() => setActiveJourneyTab('client')}
              className={`px-5 py-2 rounded-lg text-xs font-bold transition-all ${
                activeJourneyTab === 'client'
                  ? 'bg-white text-[#FF5520] shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Client Journey
            </button>
          </div>
        </div>

        {activeJourneyTab === 'freelancer' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
              <div className="w-9 h-9 rounded-xl bg-orange-100 text-[#FF5520] font-bold flex items-center justify-center text-sm">
                1
              </div>
              <h4 className="text-base font-bold text-slate-900">Verify Real Skills</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Take practical, AI-generated assessments to earn Verified ✓ badges from Beginner to Expert. Stand out without resume exaggeration.
              </p>
              <button
                onClick={() => openSkillAssessment('Python')}
                className="text-xs text-[#FF5520] font-semibold hover:underline flex items-center gap-1"
              >
                <span>Take sample test</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
              <div className="w-9 h-9 rounded-xl bg-orange-100 text-[#FF5520] font-bold flex items-center justify-center text-sm">
                2
              </div>
              <h4 className="text-base font-bold text-slate-900">Showcase in Social Feed</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Publish case studies, architectures, and apps. The AI engine automatically detects complexity, rates code quality, and indexes your work.
              </p>
              <button
                onClick={() => navigateTo('feed')}
                className="text-xs text-[#FF5520] font-semibold hover:underline flex items-center gap-1"
              >
                <span>Explore Work Feed</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
              <div className="w-9 h-9 rounded-xl bg-orange-100 text-[#FF5520] font-bold flex items-center justify-center text-sm">
                3
              </div>
              <h4 className="text-base font-bold text-slate-900">Apply with AI Copilot</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Use the AI Proposal Assistant to highlight matching portfolio evidence, craft crisp hooks, and suggest milestone structures.
              </p>
              <button
                onClick={() => navigateTo('marketplace')}
                className="text-xs text-[#FF5520] font-semibold hover:underline flex items-center gap-1"
              >
                <span>Browse contracts</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
              <div className="w-9 h-9 rounded-xl bg-orange-100 text-[#FF5520] font-bold flex items-center justify-center text-sm">
                4
              </div>
              <h4 className="text-base font-bold text-slate-900">Deliver, Inspect & Earn</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Submit milestone deliverables for automated AI Work Analysis. Satisfy client acceptance criteria, unlock escrow payouts, and boost reputation.
              </p>
              <button
                onClick={() => navigateTo('workspace', { projectId: 'proj-1' })}
                className="text-xs text-[#FF5520] font-semibold hover:underline flex items-center gap-1"
              >
                <span>View Workspace</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
              <div className="w-9 h-9 rounded-xl bg-teal-100 text-teal-700 font-bold flex items-center justify-center text-sm">
                1
              </div>
              <h4 className="text-base font-bold text-slate-900">Post with AI Breakdown</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Input your high-level project vision. AI automatically extracts required skills, estimates complexity, calculates timelines, and outlines milestones.
              </p>
              <button
                onClick={() => navigateTo('post-project')}
                className="text-xs text-teal-700 font-semibold hover:underline flex items-center gap-1"
              >
                <span>Launch project wizard</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
              <div className="w-9 h-9 rounded-xl bg-teal-100 text-teal-700 font-bold flex items-center justify-center text-sm">
                2
              </div>
              <h4 className="text-base font-bold text-slate-900">Semantic Talent Matching</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Review ranked talent with match scores up to 99%. Filter by verified assessments, real code portfolio posts, and client reputation.
              </p>
              <button
                onClick={() => navigateTo('talent')}
                className="text-xs text-teal-700 font-semibold hover:underline flex items-center gap-1"
              >
                <span>Discover talent</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
              <div className="w-9 h-9 rounded-xl bg-teal-100 text-teal-700 font-bold flex items-center justify-center text-sm">
                3
              </div>
              <h4 className="text-base font-bold text-slate-900">Hire Solo or Full Teams</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Hire vetted solo engineers or pre-formed cross-functional teams with unified milestone agreements and escrow deposits.
              </p>
              <button
                onClick={() => navigateTo('teams')}
                className="text-xs text-teal-700 font-semibold hover:underline flex items-center gap-1"
              >
                <span>View ready teams</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
              <div className="w-9 h-9 rounded-xl bg-teal-100 text-teal-700 font-bold flex items-center justify-center text-sm">
                4
              </div>
              <h4 className="text-base font-bold text-slate-900">AI Work Verification</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                When contractors submit code or designs, AI compares against your project brief. You get an objective 10-point audit before approving payment.
              </p>
              <button
                onClick={() => navigateTo('workspace', { projectId: 'proj-1' })}
                className="text-xs text-teal-700 font-semibold hover:underline flex items-center gap-1"
              >
                <span>Test inspector demo</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        )}
      </section>

      {/* Signature AI Features Showcase */}
      <section className="bg-slate-900 text-white py-16 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-400 bg-teal-950/60 px-3 py-1 rounded-full border border-teal-800">
              WorkNest Intelligence Engine
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight">
              AI Features Built for Real Engineering & Design
            </h2>
            <p className="text-sm text-slate-400">
              Not superficial chatbots — deep technical inspection, AST code parsing, and semantic matching.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-3">
              <Award className="w-8 h-8 text-amber-400" />
              <h4 className="text-base font-bold text-white">AI Skill Verification</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Objective coding assessments across Python, React, UI/UX, and AI/ML. Grants cryptographic Verified ✓ profile badges.
              </p>
              <span className="text-[11px] text-teal-400 font-semibold block">4 Skill Tiers • Anti-Cheat Engine</span>
            </div>

            <div className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-3">
              <Cpu className="w-8 h-8 text-teal-400" />
              <h4 className="text-base font-bold text-white">AI Work Analysis</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Compares submitted work against initial requirements. Generates completeness checklists, security audits, and quality scores.
              </p>
              <span className="text-[11px] text-teal-400 font-semibold block">AST Parsing • Automated QA Report</span>
            </div>

            <div className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-3">
              <Sparkles className="w-8 h-8 text-[#FF5520]" />
              <h4 className="text-base font-bold text-white">AI Project Breakdown</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Turns a raw project idea into a complete milestone roadmap, complexity score, team size recommendation, and budget range.
              </p>
              <span className="text-[11px] text-[#FF5520] font-semibold block">Phased Milestones • Instant Estimation</span>
            </div>

            <div className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-3">
              <TrendingUp className="w-8 h-8 text-indigo-400" />
              <h4 className="text-base font-bold text-white">Work-Based Reputation</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Reputation score (0-100) calculated from verified milestones, code reviews, community contributions, and escrow completion rate.
              </p>
              <span className="text-[11px] text-indigo-400 font-semibold block">100% Tamper-Proof • Merit-First</span>
            </div>
          </div>
        </div>
      </section>

      {/* Live Social Portfolio Feed Preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#FF5520] uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Real Work, Not Resumes</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
              Trending Work from the Portfolio Feed
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Discover engineers and designers through their codebases, live systems, and verified case studies.
            </p>
          </div>

          <button
            onClick={() => navigateTo('feed')}
            className="text-xs font-bold text-[#FF5520] hover:text-[#E04615] flex items-center gap-1.5 px-4 py-2 rounded-xl bg-orange-50 border border-orange-200 transition-colors"
          >
            <span>Explore Full Work Feed</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {posts.slice(0, 2).map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col"
            >
              <img
                src={post.mediaUrl}
                alt={post.title}
                className="w-full h-56 object-cover"
              />
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-[#FF5520] bg-orange-50 px-2.5 py-0.5 rounded-full border border-orange-200">
                      {post.category}
                    </span>
                    <span className="text-slate-400">{post.createdAt}</span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 line-clamp-1">{post.title}</h3>
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">{post.description}</p>
                </div>

                {/* AI Insights strip */}
                {post.aiInsights && (
                  <div className="p-3 bg-teal-50/70 border border-teal-200/80 rounded-xl text-xs space-y-1.5">
                    <div className="flex items-center justify-between font-bold text-slate-900">
                      <span className="flex items-center gap-1 text-teal-800">
                        <Sparkles className="w-3 h-3 text-teal-600" />
                        AI Quality: {post.aiInsights.workQualityScore}/10
                      </span>
                      <span className="text-slate-600">Complexity: {post.aiInsights.complexityLabel}</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {post.aiInsights.detectedSkills.slice(0, 3).map((s, idx) => (
                        <span key={idx} className="bg-white text-[10px] text-teal-900 px-1.5 py-0.5 rounded border border-teal-200">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                  <div className="flex items-center gap-2.5">
                    <img src={post.authorAvatar} alt={post.authorName} className="w-7 h-7 rounded-full object-cover" />
                    <div>
                      <span className="text-xs font-bold text-slate-900 block">{post.authorName}</span>
                      <span className="text-[10px] text-slate-500">{post.authorHeadline.split('&')[0]}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => navigateTo('feed', { postId: post.id })}
                    className="text-xs font-semibold text-[#FF5520] hover:underline"
                  >
                    View Project Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Communities & Skill Hubs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#FF5520] uppercase tracking-wider mb-1">
              <Users className="w-3.5 h-3.5" />
              <span>Skill-Based Hubs</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
              Communities Where Top Builders Gather
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Ask deep architectural questions, find vetted collaborators, and win community cash hackathons.
            </p>
          </div>

          <button
            onClick={() => navigateTo('communities')}
            className="text-xs font-bold text-[#FF5520] hover:text-[#E04615] flex items-center gap-1.5 px-4 py-2 rounded-xl bg-orange-50 border border-orange-200 transition-colors"
          >
            <span>Browse All Communities</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {communities.slice(0, 3).map((comm) => (
            <div
              key={comm.id}
              onClick={() => navigateTo('community-detail', { communityId: comm.id })}
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs hover:shadow-md hover:border-orange-300 transition-all cursor-pointer flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#FF5520] bg-orange-50 px-2.5 py-0.5 rounded-full border border-orange-200">
                    {comm.category}
                  </span>
                  <span className="text-xs font-semibold text-slate-500">
                    {comm.membersCount.toLocaleString()} Members
                  </span>
                </div>
                <h4 className="text-base font-bold text-slate-900 leading-snug">{comm.name}</h4>
                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">{comm.description}</p>
              </div>

              {comm.activeChallenge && (
                <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-xl text-xs space-y-1">
                  <span className="font-bold text-amber-900 block flex items-center gap-1">
                    <Zap className="w-3 h-3 text-amber-600" />
                    Active Challenge: {comm.activeChallenge.title}
                  </span>
                  <span className="text-[11px] text-amber-800">
                    Prize: {comm.activeChallenge.reward} ({comm.activeChallenge.daysLeft} days left)
                  </span>
                </div>
              )}

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-700">Enter Discussion Hub</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Open Projects */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#FF5520] uppercase tracking-wider mb-1">
              <Briefcase className="w-3.5 h-3.5" />
              <span>High-Impact Opportunities</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
              Active Contracts with AI Milestones
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Clear technical scopes, guaranteed escrow funding, and responsive verified clients.
            </p>
          </div>

          <button
            onClick={() => navigateTo('marketplace')}
            className="text-xs font-bold text-[#FF5520] hover:text-[#E04615] flex items-center gap-1.5 px-4 py-2 rounded-xl bg-orange-50 border border-orange-200 transition-colors"
          >
            <span>View All {projects.length} Projects</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.slice(0, 2).map((proj) => (
            <div
              key={proj.id}
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-900 bg-slate-100 px-2.5 py-0.5 rounded-full">
                    {proj.category}
                  </span>
                  <span className="font-bold text-[#FF5520]">
                    {proj.budgetType === 'Fixed' ? `$${proj.budgetMin.toLocaleString()} - $${proj.budgetMax.toLocaleString()}` : `$${proj.budgetMin}/hr`}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900">{proj.title}</h3>
                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">{proj.description}</p>

                <div className="flex flex-wrap gap-1.5">
                  {proj.skills.slice(0, 4).map((s, idx) => (
                    <span key={idx} className="text-[10px] bg-slate-50 text-slate-700 px-2 py-0.5 rounded border border-slate-200 font-medium">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <div className="text-xs text-slate-500">
                  <span>{proj.clientName}</span> • <span>{proj.proposalsCount} proposals</span>
                </div>

                <button
                  onClick={() => openApplyModal(proj)}
                  className="bg-[#FF5520] hover:bg-[#E04615] text-white text-xs font-semibold px-4 py-2 rounded-xl transition-colors shadow-xs flex items-center gap-1"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  Apply with AI
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-slate-600">
            Everything you need to know about WorkNest's AI verification, escrow, and reputation model.
          </p>
        </div>

        <div className="space-y-3 pt-4">
          {faqs.map((faq, idx) => {
            const isOpen = activeFaq === idx;
            return (
              <div
                key={idx}
                className="border border-slate-200 rounded-2xl bg-white overflow-hidden transition-all"
              >
                <button
                  onClick={() => setActiveFaq(isOpen ? null : idx)}
                  className="w-full text-left p-4 sm:p-5 flex items-center justify-between text-sm font-bold text-slate-900 hover:text-[#FF5520]"
                >
                  <span>{faq.q}</span>
                  <ChevronRight className={`w-5 h-5 text-slate-400 transition-transform ${isOpen ? 'rotate-90 text-[#FF5520]' : ''}`} />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-8 sm:p-12 text-white text-center space-y-6 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-2xl mx-auto space-y-4 relative z-10">
            <span className="text-xs font-bold uppercase tracking-wider text-orange-400 bg-orange-950/60 px-3 py-1 rounded-full border border-orange-800">
              The Future of Freelancing
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Ready to Discover Talent Through Real Work?
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Join thousands of engineers, designers, AI practitioners, and fast-scaling startups building verifiable contracts on WorkNest.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                onClick={() => {
                  setRole('client');
                  navigateTo('post-project');
                }}
                className="w-full sm:w-auto bg-[#FF5520] hover:bg-[#E04615] text-white px-7 py-3 rounded-xl font-semibold text-xs shadow-lg shadow-orange-500/25 transition-all"
              >
                Post a Project with AI Breakdown
              </button>
              <button
                onClick={() => {
                  setRole('freelancer');
                  openSkillAssessment('Python');
                }}
                className="w-full sm:w-auto bg-slate-800 hover:bg-slate-700 text-white border border-slate-600 px-7 py-3 rounded-xl font-semibold text-xs transition-all flex items-center justify-center gap-1.5"
              >
                <Award className="w-4 h-4 text-amber-400" />
                <span>Verify Your Skills</span>
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
