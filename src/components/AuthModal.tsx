import React, { useState } from 'react';
import { 
  X, 
  User, 
  Phone, 
  Mail, 
  Lock, 
  MapPin, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  Sparkles,
  KeyRound,
  Eye,
  EyeOff
} from 'lucide-react';
import { UserProfile } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: UserProfile) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess
}) => {
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');
  const [loginMethod, setLoginMethod] = useState<'phone' | 'email'>('phone');
  
  // Login form state
  const [loginPhone, setLoginPhone] = useState('01842078717');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  // OTP state
  const [isOtpStep, setIsOtpStep] = useState(false);
  const [otpCode, setOtpCode] = useState(['', '', '', '']);
  const [countdown, setCountdown] = useState(60);

  // Signup form state
  const [signupName, setSignupName] = useState('');
  const [signupPhone, setSignupPhone] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupAddress, setSignupAddress] = useState('');
  const [signupZone, setSignupZone] = useState<'inside_dhaka' | 'outside_dhaka'>('inside_dhaka');

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  // Handle Quick Demo Login
  const handleQuickDemoLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      const demoUser: UserProfile = {
        id: 'usr-demo-01',
        fullName: 'মো. ওমর ফারুক',
        phoneNumber: '01842078717',
        email: 'faruqdeveloper@gmail.com',
        address: 'বাড়ি নং ৪২, রোড নং ৭, সেক্টর ৪, উত্তরা',
        district: 'Dhaka',
        zone: 'inside_dhaka',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
        joinedDate: 'মার্চ ২০২৬'
      };
      setIsLoading(false);
      onLoginSuccess(demoUser);
      onClose();
    }, 500);
  };

  // Handle Send OTP or direct login
  const handlePhoneLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    const cleanPhone = loginPhone.trim();
    if (!cleanPhone || cleanPhone.length < 10) {
      setErrorMessage('সঠিক ১১ ডিজিটের মোবাইল নম্বর দিন (যেমন: 01842078717)');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsOtpStep(true);
      setCountdown(60);
    }, 600);
  };

  // Handle OTP verification
  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    const entered = otpCode.join('');
    if (entered.length < 4) {
      setErrorMessage('৪ ডিজিটের ওটিপি কোড সম্পূর্ণ লিখুন');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      const loggedUser: UserProfile = {
        id: `usr-${Date.now()}`,
        fullName: loginPhone === '01842078717' ? 'মো. ওমর ফারুক' : 'সম্মানিত গ্রাহক',
        phoneNumber: loginPhone,
        address: 'বাড়ি নং ৪২, রোড নং ৭, উত্তরা, ঢাকা',
        district: 'Dhaka',
        zone: 'inside_dhaka',
        joinedDate: 'মার্চ ২০২৬'
      };
      setIsLoading(false);
      setIsOtpStep(false);
      onLoginSuccess(loggedUser);
      onClose();
    }, 600);
  };

  // Handle Email Login
  const handleEmailLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    if (!loginEmail.trim() || !loginEmail.includes('@')) {
      setErrorMessage('সঠিক ইমেইল এড্রেস লিখুন');
      return;
    }
    if (!loginPassword || loginPassword.length < 6) {
      setErrorMessage('কমপক্ষে ৬ ডিজিটের পাসওয়ার্ড দিন');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      const loggedUser: UserProfile = {
        id: `usr-${Date.now()}`,
        fullName: loginEmail.split('@')[0],
        phoneNumber: '01842078717',
        email: loginEmail,
        address: 'ঢাকা, বাংলাদেশ',
        district: 'Dhaka',
        zone: 'inside_dhaka',
        joinedDate: 'মার্চ ২০২৬'
      };
      setIsLoading(false);
      onLoginSuccess(loggedUser);
      onClose();
    }, 600);
  };

  // Handle Signup
  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    if (!signupName.trim()) {
      setErrorMessage('আপনার পূর্ণ নাম লিখুন');
      return;
    }
    if (!signupPhone.trim() || signupPhone.trim().length < 10) {
      setErrorMessage('সঠিক মোবাইল নম্বর লিখুন');
      return;
    }
    if (!signupPassword || signupPassword.length < 6) {
      setErrorMessage('কমপক্ষে ৬ ডিজিটের পাসওয়ার্ড দিন');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      const newUser: UserProfile = {
        id: `usr-${Date.now()}`,
        fullName: signupName.trim(),
        phoneNumber: signupPhone.trim(),
        email: signupEmail.trim() || undefined,
        address: signupAddress.trim() || undefined,
        district: signupZone === 'inside_dhaka' ? 'Dhaka' : 'Outside Dhaka',
        zone: signupZone,
        joinedDate: 'মার্চ ২০২৬'
      };
      setIsLoading(false);
      onLoginSuccess(newUser);
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200 font-bengali">
      <div className="relative w-full max-w-md bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-gray-200 overflow-hidden my-auto flex flex-col">
        
        {/* Modal Top Header */}
        <div className="p-4 sm:p-5 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-[#133519] to-[#1D4A25] text-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/10 backdrop-blur-xs border border-white/20 flex items-center justify-center font-bold text-base shadow-inner">
              <User className="w-5 h-5 text-[#86EFAC]" />
            </div>
            <div>
              <h2 className="font-bold text-base sm:text-lg leading-tight">
                {activeTab === 'login' ? 'লগইন করুন' : 'নতুন একাউন্ট খুলুন'}
              </h2>
              <p className="text-xs text-[#C7E3CB]">
                আঁখি হারবাল কেয়ার পরিবারের সাথে যুক্ত হোন
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-gray-200 bg-gray-50/70 p-1.5 gap-1.5 text-xs font-semibold text-gray-600">
          <button
            type="button"
            onClick={() => {
              setActiveTab('login');
              setIsOtpStep(false);
              setErrorMessage('');
            }}
            className={`flex-1 py-2 rounded-xl transition-all cursor-pointer text-center ${
              activeTab === 'login'
                ? 'bg-white text-[#133519] font-bold shadow-xs border border-gray-200/80'
                : 'hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            লগইন (Login)
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveTab('signup');
              setIsOtpStep(false);
              setErrorMessage('');
            }}
            className={`flex-1 py-2 rounded-xl transition-all cursor-pointer text-center ${
              activeTab === 'signup'
                ? 'bg-white text-[#133519] font-bold shadow-xs border border-gray-200/80'
                : 'hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            নতুন একাউন্ট (Sign Up)
          </button>
        </div>

        {/* Error message banner */}
        {errorMessage && (
          <div className="mx-5 mt-4 p-2.5 bg-red-50 border border-red-200 rounded-xl text-xs text-red-600 font-medium">
            {errorMessage}
          </div>
        )}

        {/* Body Content */}
        <div className="p-5 sm:p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          
          {activeTab === 'login' ? (
            /* LOGIN TAB */
            isOtpStep ? (
              /* OTP Verification Step */
              <form onSubmit={handleVerifyOtp} className="space-y-4 text-center">
                <div className="w-12 h-12 rounded-full bg-[#E8F8EE] text-[#166534] flex items-center justify-center mx-auto">
                  <KeyRound className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-gray-900">
                    ওটিপি কোড যাচাই করুন
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">
                    <strong className="text-gray-800">{loginPhone}</strong> নম্বরে পাঠানো ৪ ডিজিটের কোডটি লিখুন
                  </p>
                  <p className="text-[11px] text-amber-700 bg-amber-50 rounded-lg py-1 px-2 mt-2 border border-amber-200 inline-block font-mono">
                    টেস্ট কোড: <strong>1 2 3 4</strong>
                  </p>
                </div>

                {/* 4 Digit Code Inputs */}
                <div className="flex justify-center gap-2.5 pt-1">
                  {[0, 1, 2, 3].map((idx) => (
                    <input
                      key={idx}
                      id={`otp-input-${idx}`}
                      type="text"
                      maxLength={1}
                      value={otpCode[idx] || ''}
                      onChange={(e) => {
                        const val = e.target.value;
                        const newOtp = [...otpCode];
                        newOtp[idx] = val;
                        setOtpCode(newOtp);
                        if (val && idx < 3) {
                          const nextInput = document.getElementById(`otp-input-${idx + 1}`);
                          nextInput?.focus();
                        }
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Backspace' && !otpCode[idx] && idx > 0) {
                          const prevInput = document.getElementById(`otp-input-${idx - 1}`);
                          prevInput?.focus();
                        }
                      }}
                      className="w-12 h-12 text-center text-xl font-bold font-mono bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-[#1E7E34] focus:bg-white focus:outline-none transition-colors"
                    />
                  ))}
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 bg-[#183E21] hover:bg-[#12311A] text-white font-bold text-xs sm:text-sm rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 shadow-sm disabled:opacity-60"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#86EFAC]" />
                  <span>{isLoading ? 'যাচাই করা হচ্ছে...' : 'ওটিপি যাচাই ও লগইন'}</span>
                </button>

                <div className="flex items-center justify-between text-xs text-gray-500 pt-1">
                  <button
                    type="button"
                    onClick={() => setIsOtpStep(false)}
                    className="hover:text-gray-800 underline cursor-pointer"
                  >
                    নম্বর পরিবর্তন করুন
                  </button>
                  <span>
                    {countdown > 0 ? (
                      `পুনরায় কোড পাঠান (${countdown}s)`
                    ) : (
                      <button
                        type="button"
                        onClick={() => setCountdown(60)}
                        className="text-[#183E21] font-bold hover:underline cursor-pointer"
                      >
                        কোড আবার পাঠান
                      </button>
                    )}
                  </span>
                </div>
              </form>
            ) : (
              /* Phone / Email Login Selection Form */
              <div className="space-y-4">
                
                {/* Method Toggle */}
                <div className="flex justify-center gap-4 text-xs">
                  <button
                    type="button"
                    onClick={() => setLoginMethod('phone')}
                    className={`pb-1 border-b-2 font-medium cursor-pointer transition-colors ${
                      loginMethod === 'phone'
                        ? 'border-[#183E21] text-[#183E21] font-bold'
                        : 'border-transparent text-gray-400 hover:text-gray-700'
                    }`}
                  >
                    মোবাইল নম্বর
                  </button>
                  <button
                    type="button"
                    onClick={() => setLoginMethod('email')}
                    className={`pb-1 border-b-2 font-medium cursor-pointer transition-colors ${
                      loginMethod === 'email'
                        ? 'border-[#183E21] text-[#183E21] font-bold'
                        : 'border-transparent text-gray-400 hover:text-gray-700'
                    }`}
                  >
                    ইমেইল ও পাসওয়ার্ড
                  </button>
                </div>

                {loginMethod === 'phone' ? (
                  <form onSubmit={handlePhoneLoginSubmit} className="space-y-3.5">
                    <div className="space-y-1">
                      <label className="block text-xs font-semibold text-gray-800">
                        মোবাইল নম্বর লিখুন
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                          <Phone className="w-4 h-4" />
                        </div>
                        <input
                          type="tel"
                          value={loginPhone}
                          onChange={(e) => setLoginPhone(e.target.value)}
                          placeholder="01842078717"
                          className="w-full pl-9 pr-3 py-2.5 bg-white rounded-xl border border-gray-200 text-xs sm:text-sm text-gray-800 focus:outline-none focus:border-gray-400"
                        />
                      </div>
                      <p className="text-[11px] text-gray-500">
                        লগইন করতে আপনার ফোনে ৪ ডিজিটের ওটিপি পাঠানো হবে
                      </p>
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full py-3 bg-[#183E21] hover:bg-[#12311A] text-white font-bold text-xs sm:text-sm rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 shadow-sm disabled:opacity-60"
                    >
                      <span>{isLoading ? 'প্রসেস হচ্ছে...' : 'ওটিপি কোড পাঠান'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </form>
                ) : (
                  <form onSubmit={handleEmailLoginSubmit} className="space-y-3">
                    <div className="space-y-1">
                      <label className="block text-xs font-semibold text-gray-800">
                        ইমেইল এড্রেস
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                          <Mail className="w-4 h-4" />
                        </div>
                        <input
                          type="email"
                          value={loginEmail}
                          onChange={(e) => setLoginEmail(e.target.value)}
                          placeholder="yourname@gmail.com"
                          className="w-full pl-9 pr-3 py-2.5 bg-white rounded-xl border border-gray-200 text-xs sm:text-sm text-gray-800 focus:outline-none focus:border-gray-400"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="block text-xs font-semibold text-gray-800">
                        পাসওয়ার্ড
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                          <Lock className="w-4 h-4" />
                        </div>
                        <input
                          type={showPassword ? 'text' : 'password'}
                          value={loginPassword}
                          onChange={(e) => setLoginPassword(e.target.value)}
                          placeholder="••••••••"
                          className="w-full pl-9 pr-10 py-2.5 bg-white rounded-xl border border-gray-200 text-xs sm:text-sm text-gray-800 focus:outline-none focus:border-gray-400"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full py-3 bg-[#183E21] hover:bg-[#12311A] text-white font-bold text-xs sm:text-sm rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 shadow-sm disabled:opacity-60"
                    >
                      <Lock className="w-4 h-4" />
                      <span>{isLoading ? 'লগইন হচ্ছে...' : 'লগইন করুন'}</span>
                    </button>
                  </form>
                )}

                {/* Divider */}
                <div className="relative flex items-center justify-center my-3">
                  <div className="border-t border-gray-200 w-full" />
                  <span className="bg-white px-2.5 text-[11px] text-gray-400 absolute">অথবা</span>
                </div>

                {/* Quick 1-Click Demo Login */}
                <button
                  type="button"
                  onClick={handleQuickDemoLogin}
                  disabled={isLoading}
                  className="w-full py-2.5 px-3 bg-[#E8F8EE] hover:bg-[#D6F4E0] border border-[#A7E2B0] text-[#136A2D] rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-[#16A34A]" />
                  <span>ডেমো একাউন্টে ১-ক্লিকে প্রবেশ (মো. ওমর ফারুক)</span>
                </button>
              </div>
            )
          ) : (
            /* SIGNUP TAB */
            <form onSubmit={handleSignupSubmit} className="space-y-3">
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-gray-800">
                  পূর্ণ নাম *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    value={signupName}
                    onChange={(e) => setSignupName(e.target.value)}
                    placeholder="আপনার নাম লিখুন"
                    className="w-full pl-9 pr-3 py-2 bg-white rounded-xl border border-gray-200 text-xs sm:text-sm text-gray-800 focus:outline-none focus:border-gray-400"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-semibold text-gray-800">
                  মোবাইল নম্বর *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    <Phone className="w-4 h-4" />
                  </div>
                  <input
                    type="tel"
                    value={signupPhone}
                    onChange={(e) => setSignupPhone(e.target.value)}
                    placeholder="01XXXXXXXXX"
                    className="w-full pl-9 pr-3 py-2 bg-white rounded-xl border border-gray-200 text-xs sm:text-sm text-gray-800 focus:outline-none focus:border-gray-400"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-semibold text-gray-800">
                  ইমেইল এড্রেস (ঐচ্ছিক)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="email"
                    value={signupEmail}
                    onChange={(e) => setSignupEmail(e.target.value)}
                    placeholder="yourname@gmail.com"
                    className="w-full pl-9 pr-3 py-2 bg-white rounded-xl border border-gray-200 text-xs sm:text-sm text-gray-800 focus:outline-none focus:border-gray-400"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-semibold text-gray-800">
                  পাসওয়ার্ড তৈরি করুন *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={signupPassword}
                    onChange={(e) => setSignupPassword(e.target.value)}
                    placeholder="কমপক্ষে ৬ ডিজিট"
                    className="w-full pl-9 pr-10 py-2 bg-white rounded-xl border border-gray-200 text-xs sm:text-sm text-gray-800 focus:outline-none focus:border-gray-400"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-semibold text-gray-800">
                  ডেলিভারি এলাকা
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setSignupZone('inside_dhaka')}
                    className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all ${
                      signupZone === 'inside_dhaka'
                        ? 'bg-[#E8F8EE] border-[#1E7D3A] text-[#136A2D]'
                        : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    ঢাকা শহর (২৪ ঘণ্টা)
                  </button>
                  <button
                    type="button"
                    onClick={() => setSignupZone('outside_dhaka')}
                    className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all ${
                      signupZone === 'outside_dhaka'
                        ? 'bg-[#E8F8EE] border-[#1E7D3A] text-[#136A2D]'
                        : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    ঢাকার বাইরে (২-৩ দিন)
                  </button>
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-semibold text-gray-800">
                  পূর্ণ ঠিকানা (ঐচ্ছিক - চেকআউটে সরাসরি যুক্ত হবে)
                </label>
                <div className="relative">
                  <div className="absolute top-2.5 left-3 text-gray-400 pointer-events-none">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <textarea
                    rows={2}
                    value={signupAddress}
                    onChange={(e) => setSignupAddress(e.target.value)}
                    placeholder="বাড়ি নং, রোড নং, এলাকা..."
                    className="w-full pl-9 pr-3 py-2 bg-white rounded-xl border border-gray-200 text-xs sm:text-sm text-gray-800 focus:outline-none focus:border-gray-400 resize-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-[#183E21] hover:bg-[#12311A] text-white font-bold text-xs sm:text-sm rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 shadow-sm disabled:opacity-60"
              >
                <CheckCircle2 className="w-4 h-4 text-[#86EFAC]" />
                <span>{isLoading ? 'একাউন্ট তৈরি হচ্ছে...' : 'একাউন্ট তৈরি করুন'}</span>
              </button>
            </form>
          )}

          {/* Security badge */}
          <div className="pt-2 text-[11px] text-gray-400 text-center flex items-center justify-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-[#16A34A]" />
            <span>আপনার তথ্য শতভাগ নিরাপদ ও এনক্রিপ্টেড</span>
          </div>

        </div>

      </div>
    </div>
  );
};
