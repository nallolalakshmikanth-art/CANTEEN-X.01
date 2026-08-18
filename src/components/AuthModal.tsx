import React, { useState } from 'react';
import { User, UserRole } from '../types';
import { DEMO_USERS } from '../data/mockMenu';
import {
  User as UserIcon,
  Users,
  UserCheck,
  X,
  Sparkles,
  HelpCircle,
  ShieldCheck,
  Coffee,
  Flame,
} from 'lucide-react';
import { sounds } from '../utils/audio';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: User) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
}) => {
  const [selectedRole, setSelectedRole] = useState<UserRole>('student');
  const [idCardNumber, setIdCardNumber] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [showSupportModal, setShowSupportModal] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (selectedRole === 'student' || selectedRole === 'faculty') {
      if (!idCardNumber.trim()) {
        setErrorMessage(
          `Please enter your valid ${selectedRole === 'student' ? 'Student' : 'Faculty'} ID Card Number.`
        );
        return;
      }

      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        sounds.playPop();

        const newUser: User = {
          id: `usr_${Date.now()}`,
          name:
            selectedRole === 'student'
              ? 'Aarav Sharma'
              : 'Prof. Dr. Vikram Sen',
          role: selectedRole,
          idCardNumber: idCardNumber.trim().toUpperCase(),
          department:
            selectedRole === 'student'
              ? 'Computer Science & Engineering'
              : 'Department of Information Technology',
          avatar:
            selectedRole === 'student'
              ? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
              : 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
          walletBalance: selectedRole === 'student' ? 350.0 : 800.0,
        };

        onLoginSuccess(newUser);
        onClose();
      }, 400);
    } else {
      handleGoogleSignIn();
    }
  };

  const handleGoogleSignIn = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      sounds.playPop();

      const guestUser: User = {
        id: `usr_guest_${Date.now()}`,
        name: DEMO_USERS.guest.name,
        role: 'guest',
        email: DEMO_USERS.guest.email,
        avatar: DEMO_USERS.guest.avatar,
        walletBalance: 150.0,
      };

      onLoginSuccess(guestUser);
      onClose();
    }, 450);
  };

  const handleQuickDemo = (role: UserRole) => {
    setSelectedRole(role);
    sounds.playPop();
    if (role === 'student') {
      setIdCardNumber(DEMO_USERS.student.idCardNumber || '2024-CSE-084');
    } else if (role === 'faculty') {
      setIdCardNumber(DEMO_USERS.faculty.idCardNumber || 'FAC-IT-1092');
    } else if (role === 'guest') {
      handleGoogleSignIn();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-xl animate-fadeIn overflow-y-auto">
      {/* Background Ambient Cafeteria Lights & Floating Food / Neon Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden flex items-center justify-center">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#8B5CF6]/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-[#22D3EE]/20 rounded-full blur-3xl"></div>
      </div>

      {/* Main Container: Split View on Large Screens matching the image */}
      <div className="relative w-full max-w-5xl my-auto flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12 z-10">
        
        {/* Left Side: 3D Isometric Food Tray Visual Showcase (as seen in image) */}
        <div className="hidden lg:flex flex-col items-center justify-center relative w-1/2 select-none pointer-events-none">
          {/* Floating Emoji Badges */}
          <div className="absolute -top-6 -left-4 text-3xl animate-bounce duration-1000">
            🍔
          </div>
          <div className="absolute top-12 -right-6 text-3xl animate-pulse">
            🍜
          </div>
          <div className="absolute -bottom-4 -left-6 text-3xl animate-bounce">
            🫐
          </div>
          <div className="absolute bottom-16 right-0 text-3xl animate-pulse">
            😋
          </div>

          {/* Futuristic Isometric Cafeteria Tray Graphic */}
          <div className="relative w-[380px] h-[340px] bg-gradient-to-br from-[#1E1A40]/90 to-[#100E26]/90 border-2 border-[#8B5CF6]/50 rounded-[36px] p-4 shadow-[0_20px_60px_rgba(139,92,246,0.35)] backdrop-blur-2xl transform -rotate-6 hover:rotate-0 transition-transform duration-700">
            {/* Tray Grid (4 Compartments) */}
            <div className="grid grid-cols-2 gap-3.5 h-full">
              {/* Compartment 1: Steaming Coffee */}
              <div className="bg-[#FF6B4A]/20 border-2 border-[#FF6B4A]/60 rounded-2xl p-3 flex flex-col items-center justify-center relative overflow-hidden shadow-[inset_0_0_20px_rgba(255,107,74,0.3)]">
                <div className="w-16 h-20 bg-gradient-to-b from-[#FFF2DE] via-[#E2C799] to-[#8C6239] rounded-t-xl rounded-b-2xl border border-white/40 shadow-lg flex flex-col items-center justify-center relative">
                  <div className="w-12 h-3 bg-[#4A3018] rounded-full mt-1 border border-white/20"></div>
                  <div className="text-[9px] font-mono font-black text-[#4A3018] mt-4 uppercase">CAFE</div>
                  {/* Steam Animation */}
                  <div className="absolute -top-6 flex gap-1">
                    <span className="w-1.5 h-6 bg-white/40 rounded-full blur-[1px] animate-pulse"></span>
                    <span className="w-1.5 h-8 bg-white/30 rounded-full blur-[1px] animate-pulse delay-100"></span>
                  </div>
                </div>
                <span className="text-[10px] font-mono font-bold text-[#FF8F73] mt-2">Filter Coffee</span>
              </div>

              {/* Compartment 2: Holographic Burger with Cyber Wireframe */}
              <div className="bg-[#22D3EE]/20 border-2 border-[#22D3EE]/60 rounded-2xl p-3 flex flex-col items-center justify-center relative overflow-hidden shadow-[inset_0_0_20px_rgba(34,211,238,0.3)]">
                {/* Holographic Wireframe HUD */}
                <div className="absolute inset-1 border border-[#22D3EE]/40 rounded-xl pointer-events-none flex flex-col justify-between p-1">
                  <div className="flex justify-between text-[8px] font-mono text-[#22D3EE]">
                    <span>[ID: B-01]</span>
                    <span>100% FRESH</span>
                  </div>
                  <div className="text-[8px] font-mono text-[#22D3EE] text-right">
                    <span>9.124158</span>
                  </div>
                </div>
                <div className="text-5xl filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.6)]">
                  🍔
                </div>
                <span className="text-[10px] font-mono font-bold text-[#67E8F9] mt-2">Crispy Burger</span>
              </div>

              {/* Compartment 3: Fresh Fruits (Banana & Kiwi) */}
              <div className="bg-[#8B5CF6]/20 border-2 border-[#8B5CF6]/60 rounded-2xl p-3 flex flex-col items-center justify-center relative overflow-hidden shadow-[inset_0_0_20px_rgba(139,92,246,0.3)]">
                <div className="flex items-center justify-center gap-1 text-3xl filter drop-shadow-[0_4px_10px_rgba(0,0,0,0.5)]">
                  <span>🍌</span>
                  <span>🥝</span>
                  <span>🍇</span>
                </div>
                <span className="text-[10px] font-mono font-bold text-[#C4B5FD] mt-2">Fruit Fiesta</span>
              </div>

              {/* Compartment 4: Berry Bowl */}
              <div className="bg-[#F59E0B]/20 border-2 border-[#F59E0B]/60 rounded-2xl p-3 flex flex-col items-center justify-center relative overflow-hidden shadow-[inset_0_0_20px_rgba(245,158,11,0.3)]">
                <div className="flex items-center justify-center gap-1 text-3xl filter drop-shadow-[0_4px_10px_rgba(0,0,0,0.5)]">
                  <span>🍓</span>
                  <span>🍒</span>
                </div>
                <span className="text-[10px] font-mono font-bold text-[#FCD34D] mt-2">Fresh Berries</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: The Futuristic Login Card (Identical to image.png) */}
        <div className="relative w-full max-w-md bg-[#0F0D24]/95 border-2 border-[#8B5CF6] rounded-[32px] shadow-[0_0_50px_rgba(139,92,246,0.4)] backdrop-blur-2xl p-6 sm:p-8 text-left overflow-hidden">
          
          {/* Subtle Ambient Glow */}
          <div className="absolute top-0 right-0 w-48 h-32 bg-[#8B5CF6]/20 rounded-full blur-3xl pointer-events-none"></div>

          {/* Close Modal Button */}
          <button
            id="close-auth-modal-btn"
            onClick={() => {
              sounds.playPop();
              onClose();
            }}
            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#1C183B] border border-[#2D285E] text-slate-400 hover:text-white flex items-center justify-center cursor-pointer transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Header Brand & Welcome */}
          <div className="text-center mb-6 relative z-10">
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="text-[#8B5CF6] text-2xl font-black font-mono">∑</span>
              <h1 className="font-display font-black text-2xl tracking-tight text-white">
                Canteen<span className="text-[#22D3EE]">X</span>
              </h1>
            </div>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-white tracking-tight">
              Welcome back!
            </h2>
          </div>

          {/* 3 Role Selection Pills/Cards (STUDENT | FACULTY | GUEST) */}
          <div className="grid grid-cols-3 gap-2 p-1.5 bg-[#080714] border border-[#262152] rounded-2xl mb-6 relative z-10">
            {/* Student Role */}
            <button
              type="button"
              id="role-student-btn"
              onClick={() => {
                sounds.playPop();
                setSelectedRole('student');
                setErrorMessage('');
              }}
              className={`py-3 px-2 rounded-xl text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1.5 ${
                selectedRole === 'student'
                  ? 'bg-[#1C1742] border-2 border-[#8B5CF6] text-white shadow-[0_0_20px_rgba(139,92,246,0.5)]'
                  : 'bg-transparent border border-transparent text-slate-400 hover:text-white'
              }`}
            >
              <UserIcon className={`w-5 h-5 ${selectedRole === 'student' ? 'text-[#8B5CF6]' : 'text-slate-400'}`} />
              <span className="font-display font-bold text-xs uppercase tracking-wider">
                Student
              </span>
            </button>

            {/* Faculty Role */}
            <button
              type="button"
              id="role-faculty-btn"
              onClick={() => {
                sounds.playPop();
                setSelectedRole('faculty');
                setErrorMessage('');
              }}
              className={`py-3 px-2 rounded-xl text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1.5 ${
                selectedRole === 'faculty'
                  ? 'bg-[#1C1742] border-2 border-[#8B5CF6] text-white shadow-[0_0_20px_rgba(139,92,246,0.5)]'
                  : 'bg-transparent border border-transparent text-slate-400 hover:text-white'
              }`}
            >
              <Users className={`w-5 h-5 ${selectedRole === 'faculty' ? 'text-[#8B5CF6]' : 'text-slate-400'}`} />
              <span className="font-display font-bold text-xs uppercase tracking-wider">
                Faculty
              </span>
            </button>

            {/* Guest Role */}
            <button
              type="button"
              id="role-guest-btn"
              onClick={() => {
                sounds.playPop();
                setSelectedRole('guest');
                setErrorMessage('');
              }}
              className={`py-3 px-2 rounded-xl text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1.5 ${
                selectedRole === 'guest'
                  ? 'bg-[#1C1742] border-2 border-[#8B5CF6] text-white shadow-[0_0_20px_rgba(139,92,246,0.5)]'
                  : 'bg-transparent border border-transparent text-slate-400 hover:text-white'
              }`}
            >
              <UserCheck className={`w-5 h-5 ${selectedRole === 'guest' ? 'text-[#22D3EE]' : 'text-slate-400'}`} />
              <span className="font-display font-bold text-xs uppercase tracking-wider">
                Guest
              </span>
            </button>
          </div>

          {/* Form Content */}
          <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
            {selectedRole === 'student' || selectedRole === 'faculty' ? (
              <>
                {/* ID Card Number Input */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="idCardNumberInput"
                    className="block text-xs font-mono font-bold text-slate-300 uppercase tracking-wider"
                  >
                    ID CARD NUMBER
                  </label>
                  <input
                    id="idCardNumberInput"
                    type="text"
                    value={idCardNumber}
                    onChange={(e) => {
                      setIdCardNumber(e.target.value);
                      setErrorMessage('');
                    }}
                    placeholder="ID CARD NUMBER"
                    className="w-full bg-[#120F2D] border border-[#373070] focus:border-[#8B5CF6] focus:shadow-[0_0_20px_rgba(139,92,246,0.4)] p-3.5 rounded-2xl font-mono text-sm text-white placeholder:text-slate-500 uppercase outline-none transition-all"
                    autoFocus
                  />
                  {errorMessage && (
                    <p className="text-xs text-rose-400 bg-rose-500/10 border border-rose-500/30 p-2 rounded-xl mt-2">
                      {errorMessage}
                    </p>
                  )}
                </div>

                {/* Guest Divider / Google Sign-In Alternate */}
                <div className="space-y-1.5 pt-1">
                  <label className="block text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
                    GUEST
                  </label>
                  <button
                    type="button"
                    id="guest-google-btn"
                    onClick={handleGoogleSignIn}
                    disabled={isSubmitting}
                    className="w-full bg-[#120F2D] hover:bg-[#18143C] border border-[#373070] hover:border-white/30 text-white p-3 rounded-2xl font-semibold text-xs sm:text-sm flex items-center justify-center gap-3 transition-all cursor-pointer"
                  >
                    <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.24v3.15C3.26 21.36 7.33 24 12 24z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.24C.45 8.15 0 9.92 0 12s.45 3.85 1.24 5.42l4.04-3.15z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.24 6.58l4.04 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                      />
                    </svg>
                    <span>Login with Google</span>
                  </button>
                </div>
              </>
            ) : (
              /* Guest Selected: Prominent Google Sign-in Card */
              <div className="space-y-4 py-2">
                <div className="bg-[#120F2D] border border-[#373070] p-3.5 rounded-2xl text-xs text-slate-300 flex items-start gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-[#22D3EE] shrink-0 mt-0.5" />
                  <span>
                    Visitors can order using UPI or cash with instant guest authorization.
                  </span>
                </div>

                <button
                  type="button"
                  id="primary-guest-google-btn"
                  onClick={handleGoogleSignIn}
                  disabled={isSubmitting}
                  className="w-full bg-white hover:bg-slate-100 text-slate-900 p-3.5 rounded-2xl font-bold text-sm shadow-[0_0_25px_rgba(255,255,255,0.25)] flex items-center justify-center gap-3 transition-all cursor-pointer"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.24v3.15C3.26 21.36 7.33 24 12 24z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.24C.45 8.15 0 9.92 0 12s.45 3.85 1.24 5.42l4.04-3.15z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.24 6.58l4.04 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                    />
                  </svg>
                  <span>{isSubmitting ? 'Signing in...' : 'Sign in with Google'}</span>
                </button>
              </div>
            )}

            {/* Glowing Wave Gradient Login Button (as seen in image) */}
            <button
              type="submit"
              id="submit-auth-btn"
              disabled={isSubmitting}
              className="relative w-full overflow-hidden bg-gradient-to-r from-[#8B5CF6] via-[#6366F1] to-[#22D3EE] hover:opacity-95 text-white font-display font-bold text-sm sm:text-base py-3.5 rounded-full shadow-[0_0_30px_rgba(139,92,246,0.6)] hover:shadow-[0_0_40px_rgba(34,211,238,0.7)] transition-all flex items-center justify-center gap-2 cursor-pointer mt-4"
            >
              {/* Subtle Animated Wave SVG inside button */}
              <div className="absolute inset-0 opacity-40 pointer-events-none flex items-center justify-center">
                <svg className="w-full h-8" viewBox="0 0 300 30" preserveAspectRatio="none">
                  <path
                    d="M0 15 Q 75 0 150 15 T 300 15"
                    fill="none"
                    stroke="white"
                    strokeWidth="3"
                    className="animate-pulse"
                  />
                </svg>
              </div>
              <span className="relative z-10">
                {isSubmitting
                  ? 'Authenticating...'
                  : selectedRole === 'guest'
                  ? 'Continue as Guest'
                  : 'Login'}
              </span>
            </button>
          </form>

          {/* Footer Links: Forgot ID Card? / Need Help? Contact Canteen Support */}
          <div className="mt-5 text-center space-y-1.5 relative z-10">
            <button
              type="button"
              onClick={() => {
                sounds.playPop();
                if (selectedRole === 'student') {
                  setIdCardNumber('2024-CSE-084');
                } else if (selectedRole === 'faculty') {
                  setIdCardNumber('FAC-IT-1092');
                }
              }}
              className="text-xs text-slate-400 hover:text-[#22D3EE] transition-colors cursor-pointer block mx-auto"
            >
              Forgot ID Card? Auto-fill ID
            </button>

            <button
              type="button"
              onClick={() => {
                sounds.playPop();
                setShowSupportModal(true);
              }}
              className="text-xs text-slate-400 hover:text-white transition-colors cursor-pointer block mx-auto"
            >
              Need help? Contact Canteen Support
            </button>
          </div>

          {/* Quick Demo Autofill Bar */}
          <div className="mt-5 pt-3.5 border-t border-[#262152] relative z-10">
            <p className="text-[11px] font-mono text-slate-400 mb-2 flex items-center justify-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#8B5CF6]" />
              Quick Demo Auto-fill:
            </p>
            <div className="flex flex-wrap items-center justify-center gap-1.5">
              <button
                type="button"
                id="demo-student-pill"
                onClick={() => handleQuickDemo('student')}
                className="text-[11px] font-mono bg-[#120F2D] border border-[#373070] hover:border-[#8B5CF6] text-slate-300 px-2.5 py-1 rounded-full cursor-pointer transition-colors"
              >
                🎓 Student
              </button>
              <button
                type="button"
                id="demo-faculty-pill"
                onClick={() => handleQuickDemo('faculty')}
                className="text-[11px] font-mono bg-[#120F2D] border border-[#373070] hover:border-[#8B5CF6] text-slate-300 px-2.5 py-1 rounded-full cursor-pointer transition-colors"
              >
                👨‍🏫 Faculty
              </button>
              <button
                type="button"
                id="demo-guest-pill"
                onClick={() => handleQuickDemo('guest')}
                className="text-[11px] font-mono bg-[#120F2D] border border-[#373070] hover:border-[#22D3EE] text-slate-300 px-2.5 py-1 rounded-full cursor-pointer transition-colors"
              >
                👤 Guest
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Support Dialog */}
      {showSupportModal && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-[#120F2D] border border-[#8B5CF6]/50 rounded-2xl p-6 max-w-sm w-full text-left">
            <h4 className="font-display font-bold text-lg text-white mb-2 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-[#22D3EE]" />
              Canteen Support
            </h4>
            <p className="text-xs text-slate-300 mb-4">
              For ID verification issues or account support, visit Counter 01 Help Desk or contact support@canteenx.edu.
            </p>
            <button
              onClick={() => setShowSupportModal(false)}
              className="w-full bg-[#8B5CF6] hover:bg-[#7C3AED] text-white py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer"
            >
              Close Help
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
