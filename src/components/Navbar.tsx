import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Search, 
  Menu, 
  X, 
  User,
  Sparkles,
  Facebook
} from 'lucide-react';
import { OFFICIAL_FACEBOOK_URL } from '../data/ugcFeeds';
import { UserProfile } from '../types';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  currency?: 'BDT' | 'USD';
  onToggleCurrency?: () => void;
  onOpenSearch: () => void;
  onOpenOrderTracker: () => void;
  onNavigateSection: (sectionId: string) => void;
  currentUser?: UserProfile | null;
  onOpenAuth: () => void;
  onOpenProfile: () => void;
  onOpenAdmin?: () => void;
}

// 12-petaled floral mandala emblem adapted cleanly for white navbar
const NaturalsLogoEmblem: React.FC = () => (
  <svg 
    viewBox="0 0 100 100" 
    className="w-8 h-8 sm:w-9 sm:h-9 text-[#183E21] fill-[#183E21] transition-transform group-hover:scale-105"
    aria-hidden="true"
  >
    <g transform="translate(50,50)">
      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle) => (
        <path
          key={angle}
          d="M0,-8 C5,-17 14,-27 8,-38 C2,-32 -4,-23 -1,-10 Z"
          transform={`rotate(${angle})`}
          fill="currentColor"
        />
      ))}
      <circle cx="0" cy="0" r="3.5" fill="currentColor" />
    </g>
  </svg>
);

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  onOpenSearch,
  onNavigateSection,
  currentUser,
  onOpenAuth,
  onOpenProfile,
  onOpenAdmin
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavClick = (sectionId: string) => {
    setIsMobileMenuOpen(false);
    onNavigateSection(sectionId);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-[#E7ECE6] shadow-xs text-[#1E2E21] transition-all">
      
      {/* Subtle Top Notification Announcement Bar */}
      <div className="bg-[#122A17] text-white/90 text-[11px] py-1.5 px-4 border-b border-black/5">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-center">
          <div className="flex items-center gap-2 sm:gap-4 mx-auto sm:mx-0">
            <span className="flex items-center gap-1.5 font-medium text-emerald-300">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              100% Pure Natural & Handmade Herbal Formulations
            </span>
            <span className="hidden md:inline text-white/30">|</span>
            <span className="hidden md:inline text-white/90 font-medium">
              🚚 Nationwide Home Delivery • Cash on Delivery
            </span>
          </div>
          <div className="hidden lg:flex items-center gap-3 text-white/80 text-[11px]">
            <span>ক্যাশ অন ডেলিভারি (পণ্য পেয়ে মূল্য পরিশোধ)</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-20 sm:h-22">
          
          {/* Left: Mobile Menu Trigger + Desktop Links (HOME, SHOP, REVIEWS, HOW TO USE) */}
          <div className="flex items-center gap-3">
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 -ml-2 rounded-xl text-[#1E2E21] hover:bg-gray-100 md:hidden transition-colors cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            {/* Desktop Left Nav Links: HOME, SHOP, REVIEWS, HOW TO USE */}
            <nav className="hidden md:flex items-center gap-6 lg:gap-8 xl:gap-10 text-xs sm:text-[13px] font-semibold tracking-[0.16em] text-[#1E2E21]">
              <button 
                onClick={() => handleNavClick('hero')} 
                className="hover:text-[#183E21] transition-colors cursor-pointer py-1 uppercase whitespace-nowrap"
              >
                HOME
              </button>
              <button 
                onClick={() => handleNavClick('collection')} 
                className="hover:text-[#183E21] transition-colors cursor-pointer py-1 uppercase whitespace-nowrap"
              >
                SHOP
              </button>
              <button 
                onClick={() => handleNavClick('ugc-feed')} 
                className="hover:text-[#183E21] transition-colors cursor-pointer py-1 uppercase whitespace-nowrap"
              >
                REVIEWS
              </button>
              <button 
                onClick={() => handleNavClick('usage-routine')} 
                className="hover:text-[#183E21] transition-colors cursor-pointer py-1 uppercase whitespace-nowrap"
              >
                HOW TO USE
              </button>
            </nav>
          </div>

          {/* Center: Brand Identity Logo (Floral Emblem + Akhi Herbal Care) */}
          <div 
            className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center justify-center cursor-pointer select-none group py-1" 
            onClick={() => handleNavClick('hero')}
          >
            <NaturalsLogoEmblem />
            <div className="flex flex-col items-center justify-center leading-tight mt-1 text-center">
              <span className="font-serif-brand font-bold text-sm sm:text-base md:text-lg lg:text-xl tracking-tight text-[#142B18] whitespace-nowrap">
                Akhi Herbal Care
              </span>
              <span className="text-[8px] sm:text-[9px] font-sans font-semibold tracking-[0.22em] uppercase text-[#2B6D36]">
                100% Home Made
              </span>
            </div>
          </div>

          

            {/* 1. Search Trigger */}
            <button
              id="desktop-search-trigger-btn"
              onClick={onOpenSearch}
              className="text-[#1E2E21] hover:text-[#183E21] transition-colors cursor-pointer p-1"
              title="Search products"
              aria-label="Search items"
            >
              <Search className="w-5 h-5 stroke-[1.8]" />
            </button>

            {/* 2. User Profile / Account Trigger */}
            <button
              id="user-profile-btn"
              onClick={currentUser ? onOpenProfile : onOpenAuth}
              className="text-[#1E2E21] hover:text-[#183E21] transition-colors cursor-pointer p-1 relative"
              title={currentUser ? currentUser.fullName : 'Account / Login'}
              aria-label="User account"
            >
              <User className="w-5 h-5 stroke-[1.8]" />
              {currentUser && (
                <span className="absolute top-0.5 right-0.5 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-white" />
              )}
            </button>

            {/* 3. Shopping Bag Trigger */}
            <button
              id="cart-drawer-trigger-btn"
              onClick={onOpenCart}
              className="text-[#1E2E21] hover:text-[#183E21] transition-colors cursor-pointer p-1 relative"
              aria-label={`Shopping bag with ${cartCount} items`}
              title="Shopping Bag"
            >
              <ShoppingBag className="w-5 h-5 stroke-[1.8]" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-[#183E21] text-white text-[10px] font-bold min-w-4 h-4 px-1 rounded-full flex items-center justify-center shadow-xs">
                  {cartCount}
                </span>
              )}
            </button>

          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-[#E7ECE6] bg-white px-4 pt-3 pb-6 space-y-4 shadow-xl">
          
          {/* User Status Card in Mobile Drawer */}
          <div className="p-3 rounded-2xl bg-[#F4F8F3] border border-[#E0EAE0]">
            {currentUser ? (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-[#183E21] text-white flex items-center justify-center font-bold text-sm">
                    {currentUser.fullName ? currentUser.fullName.charAt(0) : 'U'}
                  </div>
                  <div className="leading-tight">
                    <p className="font-bold text-xs text-[#1E2E21]">{currentUser.fullName}</p>
                    <p className="text-[10px] text-[#617765]">{currentUser.phoneNumber}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onOpenProfile();
                  }}
                  className="px-3 py-1.5 bg-[#183E21] text-white rounded-lg text-xs font-bold hover:bg-[#112E18] transition-colors cursor-pointer"
                >
                  প্রোফাইল
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-between gap-2">
                <div>
                  <p className="font-bold text-xs text-[#1E2E21]">লগইন বা সাইন-আপ করুন</p>
                  <p className="text-[10px] text-[#617765]">অর্ডার ট্র্যাক ও দ্রুত চেকআউট</p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onOpenAuth();
                  }}
                  className="px-3.5 py-1.5 bg-[#183E21] text-white rounded-xl text-xs font-bold hover:bg-[#112E18] transition-colors cursor-pointer shrink-0 shadow-xs"
                >
                  লগইন
                </button>
              </div>
            )}
          </div>

          <div className="space-y-1 text-sm font-semibold tracking-wider text-[#1E2E21]">
            <button
              onClick={() => handleNavClick('hero')}
              className="w-full text-left py-2.5 px-3 rounded-xl hover:bg-gray-50 flex items-center justify-between uppercase"
            >
              <span>HOME</span>
              <span className="text-xs text-gray-400 font-normal">হোম</span>
            </button>
            <button
              onClick={() => handleNavClick('collection')}
              className="w-full text-left py-2.5 px-3 rounded-xl hover:bg-gray-50 flex items-center justify-between uppercase"
            >
              <span>SHOP</span>
              <span className="text-xs text-gray-400 font-normal">প্রোডাক্টস</span>
            </button>
            <button
              onClick={() => handleNavClick('ugc-feed')}
              className="w-full text-left py-2.5 px-3 rounded-xl hover:bg-gray-50 flex items-center justify-between uppercase"
            >
              <span>REVIEWS</span>
              <span className="text-xs text-gray-400 font-normal">গ্রাহক রিভিউ</span>
            </button>
            <button
              onClick={() => handleNavClick('usage-routine')}
              className="w-full text-left py-2.5 px-3 rounded-xl hover:bg-gray-50 flex items-center justify-between uppercase"
            >
              <span>HOW TO USE</span>
              <span className="text-xs text-[#2B6D36] font-normal">ব্যবহারের নিয়ম ও রুটিন</span>
            </button>
            {onOpenAdmin && (
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenAdmin();
                }}
                className="w-full text-left py-2.5 px-3 rounded-xl bg-purple-50 text-purple-700 font-bold flex items-center justify-between uppercase border border-purple-200/80"
              >
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-purple-600"></span>
                  <span>ADMIN DASHBOARD</span>
                </div>
                <span className="text-xs text-purple-600 font-normal">এডমিন প্যানেল</span>
              </button>
            )}
          </div>

          <div className="pt-3 border-t border-gray-100">
            <a
              href={OFFICIAL_FACEBOOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#1877F2] text-white text-xs font-semibold shadow-2xs"
            >
              <Facebook className="w-4 h-4" />
              <span>Official Facebook Page</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
