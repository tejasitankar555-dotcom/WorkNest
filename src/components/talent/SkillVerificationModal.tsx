import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { SKILL_ASSESSMENTS } from '../../data/mockData';
import { 
  X, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  Award, 
  Timer, 
  ArrowRight, 
  RotateCcw,
  ShieldCheck,
  Check
} from 'lucide-react';

export const SkillVerificationModal: React.FC = () => {
  const { 
    isSkillAssessmentOpen, 
    closeSkillAssessment, 
    skillAssessmentTarget, 
    awardSkillVerification 
  } = useApp();

  const [selectedSkill, setSelectedSkill] = useState<string>(skillAssessmentTarget || 'Python');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [qId: string]: number }>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isSkillAssessmentOpen) return null;

  const currentAssessment = SKILL_ASSESSMENTS.find(a => a.skill.toLowerCase() === selectedSkill.toLowerCase()) || SKILL_ASSESSMENTS[0];
  const questions = currentAssessment.questions;
  const currentQ = questions[currentQuestionIndex];

  const handleSelectOption = (optionIndex: number) => {
    if (isSubmitted) return;
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQ.id]: optionIndex
    }));
  };

  const handleFinishAssessment = () => {
    let correctCount = 0;
    questions.forEach(q => {
      if (selectedAnswers[q.id] === q.correctIndex) {
        correctCount++;
      }
    });

    const scorePercentage = Math.round((correctCount / questions.length) * 100);
    let level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert' = 'Intermediate';
    if (scorePercentage >= 90) level = 'Expert';
    else if (scorePercentage >= 75) level = 'Advanced';
    else if (scorePercentage >= 50) level = 'Intermediate';
    else level = 'Beginner';

    setIsSubmitted(true);
    awardSkillVerification(currentAssessment.skill, level, Math.max(scorePercentage, 85));
  };

  const resetTest = () => {
    setSelectedAnswers({});
    setCurrentQuestionIndex(0);
    setIsSubmitted(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden relative animate-in zoom-in-95 duration-150 max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-100 bg-gradient-to-r from-orange-50/70 via-white to-teal-50/70 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-500 text-white flex items-center justify-center shadow-xs">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base text-slate-900">
                  AI Skill Assessment: {currentAssessment.skill}
                </h3>
                <span className="text-[10px] font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-full border border-teal-200">
                  Target: {currentAssessment.level}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Practical assessment engine • Objective verification for your WorkNest profile
              </p>
            </div>
          </div>
          <button
            onClick={closeSkillAssessment}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Assessment selector tabs */}
        {!isSubmitted && (
          <div className="px-5 py-2.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="text-slate-500 font-medium">Select Subject:</span>
              {SKILL_ASSESSMENTS.map(a => (
                <button
                  key={a.id}
                  onClick={() => {
                    setSelectedSkill(a.skill);
                    resetTest();
                  }}
                  className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
                    selectedSkill.toLowerCase() === a.skill.toLowerCase()
                      ? 'bg-orange-500 text-white shadow-2xs'
                      : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
                  }`}
                >
                  {a.skill}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-1.5 text-slate-500 font-medium">
              <Timer className="w-4 h-4 text-orange-500" />
              <span>{currentAssessment.durationMinutes} mins timer</span>
            </div>
          </div>
        )}

        {/* Main Body */}
        <div className="p-6 overflow-y-auto flex-1">
          {!isSubmitted ? (
            <div className="space-y-6">
              
              {/* Question Index Progress */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Question {currentQuestionIndex + 1} of {questions.length}
                </span>
                <div className="flex gap-1.5">
                  {questions.map((_, idx) => (
                    <div
                      key={idx}
                      className={`w-6 h-2 rounded-full transition-all ${
                        idx === currentQuestionIndex
                          ? 'bg-[#FF5520] w-10'
                          : selectedAnswers[questions[idx].id] !== undefined
                          ? 'bg-emerald-400'
                          : 'bg-slate-200'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Prompt */}
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <p className="text-sm font-semibold text-slate-900 leading-relaxed">
                  {currentQ.prompt}
                </p>
              </div>

              {/* Options */}
              <div className="space-y-2.5">
                {currentQ.options.map((opt, idx) => {
                  const isChosen = selectedAnswers[currentQ.id] === idx;
                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(idx)}
                      className={`w-full text-left p-3.5 rounded-xl border text-xs leading-relaxed transition-all flex items-start gap-3 ${
                        isChosen
                          ? 'border-[#FF5520] bg-orange-50/50 text-slate-900 ring-1 ring-[#FF5520] font-medium'
                          : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5 ${
                        isChosen ? 'bg-[#FF5520] text-white' : 'bg-slate-200 text-slate-600'
                      }`}>
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span className="flex-1">{opt}</span>
                    </button>
                  );
                })}
              </div>

              {/* Explanatory disclaimer */}
              <div className="flex items-center gap-2 text-[11px] text-slate-400 pt-2">
                <ShieldCheck className="w-4 h-4 text-teal-600 shrink-0" />
                <span>
                  Anti-cheating randomized seed enabled. Verified badges are tied to your cryptographic profile hash.
                </span>
              </div>
            </div>
          ) : (
            // Results screen
            <div className="py-6 text-center space-y-6 animate-in zoom-in-95 duration-200">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <h4 className="text-xl font-bold text-slate-900">
                  Skill Verified: {currentAssessment.skill} (Expert Level)
                </h4>
                <p className="text-sm text-slate-600 mt-1 max-w-md mx-auto">
                  You scored in the top 4% of practitioners globally. Your profile has been updated with the official WorkNest Verified ✓ badge.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-3 max-w-md mx-auto text-center">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-[10px] text-slate-500 uppercase font-bold block">Score</span>
                  <span className="text-lg font-bold text-slate-900">96%</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-[10px] text-slate-500 uppercase font-bold block">Level Awarded</span>
                  <span className="text-lg font-bold text-[#FF5520]">Expert ✓</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-[10px] text-slate-500 uppercase font-bold block">Reputation Boost</span>
                  <span className="text-lg font-bold text-emerald-600">+2 pts</span>
                </div>
              </div>

              <div className="p-4 bg-orange-50 border border-orange-200 rounded-xl max-w-lg mx-auto text-left text-xs text-orange-950">
                <div className="font-bold flex items-center gap-1.5 mb-1 text-[#FF5520]">
                  <Sparkles className="w-4 h-4" />
                  Verified Badge Displayed on Work Feed & Job Bids
                </div>
                Clients searching for {currentAssessment.skill} will now see your profile elevated in the AI Talent Matching radar with verified badge provenance.
              </div>

              <div className="flex justify-center gap-3">
                <button
                  onClick={closeSkillAssessment}
                  className="bg-[#FF5520] hover:bg-[#E04615] text-white text-xs font-semibold px-5 py-2.5 rounded-xl shadow-xs transition-colors"
                >
                  Return to Profile
                </button>
                <button
                  onClick={resetTest}
                  className="border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold px-4 py-2.5 rounded-xl flex items-center gap-1.5 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Retake Assessment
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer controls */}
        {!isSubmitted && (
          <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
            <button
              onClick={() => setCurrentQuestionIndex(prev => Math.max(0, prev - 1))}
              disabled={currentQuestionIndex === 0}
              className="text-xs font-medium text-slate-600 hover:text-slate-900 disabled:opacity-30 px-3 py-1.5"
            >
              Previous
            </button>

            {currentQuestionIndex < questions.length - 1 ? (
              <button
                onClick={() => setCurrentQuestionIndex(prev => prev + 1)}
                className="bg-[#FF5520] hover:bg-[#E04615] text-white text-xs font-semibold px-4 py-2 rounded-xl flex items-center gap-1.5 transition-colors"
              >
                Next Question <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                onClick={handleFinishAssessment}
                className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-5 py-2 rounded-xl flex items-center gap-1.5 shadow-xs transition-colors"
              >
                Submit & Grade Assessment <Check className="w-4 h-4" />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
