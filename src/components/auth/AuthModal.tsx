import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Sparkles, Check, ArrowRight, UserCheck, Briefcase } from 'lucide-react';
import { UserRole } from '../../types';

export const AuthModal: React.FC = () => {
  const { 
    isAuthModalOpen, 
    closeAuthModal, 
    authModalMode, 
    setRole, 
    setIsOnboardingOpen, 
    addToast 
  } = useApp();

  const [mode, setMode] = useState<'login' | 'signup' | 'forgot'>(authModalMode);
  const [selectedRole, setSelectedRole] = useState<UserRole>('freelancer');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [agreedTerms, setAgreedTerms] = useState(true);

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'signup') {
      if (!agreedTerms) {
        addToast('Please accept the Terms & Conditions', 'warning');
        return;
      }
      setRole(selectedRole);
      closeAuthModal();
      setIsOnboardingOpen(true);
      addToast(`Account created as ${selectedRole.toUpperCase()}! Please complete your onboarding profile.`, 'success');
    } else if (mode === 'login') {
      setRole(selectedRole);
      closeAuthModal();
      addToast(`Welcome back! Signed in as ${selectedRole.toUpperCase()}.`, 'success');
    } else {
      // Forgot password
      addToast(`Password reset link sent to ${email || 'your email'}. Check your inbox!`, 'info');
      setMode('login');
    }
  };

  const handleGoogleAuth = () => {
    setRole(selectedRole);
    closeAuthModal();
    addToast(`Signed in with Google as ${selectedRole.toUpperCase()}!`, 'success');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-slate-200 overflow-hidden relative animate-in zoom-in-95 duration-150">
        
        {/* Close Button */}
        <button
          onClick={closeAuthModal}
          className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="p-6 pb-4 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-[#FF5520] text-white flex items-center justify-center font-bold text-base shadow-xs">
              W
            </div>
            <span className="font-bold text-lg text-slate-900">WorkNest</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900">
            {mode === 'signup' ? 'Create your WorkNest account' : mode === 'forgot' ? 'Reset your password' : 'Sign in to WorkNest'}
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            {mode === 'signup' 
              ? 'Join the future of freelancing powered by AI, real work & community.'
              : 'Access verified talent, proof-of-work feeds, and project workspaces.'}
          </p>
        </div>

        {/* Role Picker for Sign up & Sign In */}
        {mode !== 'forgot' && (
          <div className="px-6 pt-4">
            <label className="block text-xs font-semibold text-slate-700 mb-2">
              Select Your Role:
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setSelectedRole('freelancer')}
                className={`p-3 rounded-xl border text-left transition-all flex items-center gap-2.5 ${
                  selectedRole === 'freelancer'
                    ? 'border-[#FF5520] bg-orange-50/40 text-orange-950 font-medium ring-1 ring-[#FF5520]'
                    : 'border-slate-200 hover:border-slate-300 text-slate-600'
                }`}
              >
                <UserCheck className={`w-4 h-4 ${selectedRole === 'freelancer' ? 'text-[#FF5520]' : 'text-slate-400'}`} />
                <div>
                  <div className="text-xs font-bold">Freelancer</div>
                  <div className="text-[10px] text-slate-500">Find work & verify skills</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setSelectedRole('client')}
                className={`p-3 rounded-xl border text-left transition-all flex items-center gap-2.5 ${
                  selectedRole === 'client'
                    ? 'border-[#FF5520] bg-orange-50/40 text-orange-950 font-medium ring-1 ring-[#FF5520]'
                    : 'border-slate-200 hover:border-slate-300 text-slate-600'
                }`}
              >
                <Briefcase className={`w-4 h-4 ${selectedRole === 'client' ? 'text-[#FF5520]' : 'text-slate-400'}`} />
                <div>
                  <div className="text-xs font-bold">Client / Company</div>
                  <div className="text-[10px] text-slate-500">Post jobs & hire talent</div>
                </div>
              </button>
            </div>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-3.5">
          {mode === 'signup' && (
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="e.g. Alex Morgan"
                className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#FF5520] focus:ring-1 focus:ring-[#FF5520]"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="alex@domain.com"
              className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#FF5520] focus:ring-1 focus:ring-[#FF5520]"
            />
          </div>

          {mode !== 'forgot' && (
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-semibold text-slate-700">Password</label>
                {mode === 'login' && (
                  <button
                    type="button"
                    onClick={() => setMode('forgot')}
                    className="text-[11px] text-[#FF5520] hover:underline"
                  >
                    Forgot password?
                  </button>
                )}
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#FF5520] focus:ring-1 focus:ring-[#FF5520]"
              />
            </div>
          )}

          {mode === 'signup' && (
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Confirm Password</label>
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#FF5520] focus:ring-1 focus:ring-[#FF5520]"
              />
            </div>
          )}

          {mode === 'login' && (
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="remember"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="rounded border-slate-300 text-[#FF5520] focus:ring-[#FF5520]"
              />
              <label htmlFor="remember" className="text-xs text-slate-600 select-none">
                Remember my session on this device
              </label>
            </div>
          )}

          {mode === 'signup' && (
            <div className="flex items-start gap-2 pt-1">
              <input
                type="checkbox"
                id="terms"
                checked={agreedTerms}
                onChange={(e) => setAgreedTerms(e.target.checked)}
                className="mt-0.5 rounded border-slate-300 text-[#FF5520] focus:ring-[#FF5520]"
              />
              <label htmlFor="terms" className="text-[11px] text-slate-600 leading-tight">
                I agree to the <span className="text-[#FF5520] font-medium">Terms of Service</span>, <span className="text-[#FF5520] font-medium">Privacy Policy</span>, and Escrow Protection Rules.
              </label>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-[#FF5520] hover:bg-[#E04615] text-white font-semibold py-2.5 rounded-xl text-xs shadow-md shadow-orange-500/20 transition-all flex items-center justify-center gap-2"
          >
            <span>{mode === 'signup' ? 'Create Account & Continue' : mode === 'forgot' ? 'Send Reset Link' : 'Sign In'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          {mode !== 'forgot' && (
            <>
              <div className="relative my-4 text-center">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200"></div>
                </div>
                <span className="relative bg-white px-2 text-[11px] text-slate-400">or continue with</span>
              </div>

              <button
                type="button"
                onClick={handleGoogleAuth}
                className="w-full border border-slate-200 hover:bg-slate-50 text-slate-700 font-medium py-2 rounded-xl text-xs transition-colors flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                </svg>
                Google Instant Auth
              </button>
            </>
          )}

          <div className="text-center text-xs text-slate-500 pt-2">
            {mode === 'signup' ? (
              <span>Already have an account? <button type="button" onClick={() => setMode('login')} className="text-[#FF5520] font-semibold hover:underline">Sign In</button></span>
            ) : (
              <span>Don't have an account? <button type="button" onClick={() => setMode('signup')} className="text-[#FF5520] font-semibold hover:underline">Sign Up</button></span>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
