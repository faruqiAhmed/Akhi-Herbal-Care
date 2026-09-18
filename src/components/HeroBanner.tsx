import React from 'react';
import { 
  Sparkles, 
  ShieldCheck, 
  Award,
  Leaf
} from 'lucide-react';

interface HeroBannerProps {
  onExploreClick?: () => void;
  onFeaturedClick?: () => void;
  onQuickAddCombo?: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = () => {
  return (
    <section id="hero" className="relative overflow-hidden bg-gradient-to-b from-[#102914] via-[#143219] to-[#0D2211] text-white pt-8 sm:pt-12 pb-12 sm:pb-16 border-b border-[#1E4524]">
      {/* Botanical ambient lighting */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] rounded-full bg-[#2E7D32]/20 filter blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-[400px] h-[400px] rounded-full bg-[#F59E0B]/10 filter blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-10">
        
        {/* Main 2-Column Split Hero Layout: Text on Left, Image on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* LEFT SIDE: Typography, Brand Emblem & 4 Benefits Grid */}
          <div className="lg:col-span-7 space-y-5 text-left">
            
            {/* 100% Homemade & Chemical-Free Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#173F1E] border border-[#2E6B39] text-[#9EE4A6] text-xs font-semibold shadow-xs">
              <Leaf className="w-3.5 h-3.5 text-[#4ADE80]" />
              <span>১০০% ঘরোয়া প্রাকৃতিক উপাদান • সম্পূর্ণ কেমিক্যাল মুক্ত</span>
            </div>

            {/* Bengali Brand Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-serif-brand font-black text-white tracking-tight leading-[1.18]">
              আঁখি হারবাল <span className="text-[#86EFAC]">হেয়ার প্রোডাক্টস</span>
            </h1>
            
            {/* Subtitle with decorative botanical elements */}
            <div className="flex items-center gap-2 text-sm sm:text-base md:text-lg text-[#C7E3CB] font-serif">
              <span className="text-[#84C78B] text-lg">🌿</span>
              <p className="font-semibold tracking-wide">
                চুলের যে কোনো সমস্যার সমাধানে আমাদের ১০০% প্রাকৃতিক প্রোডাক্ট
              </p>
              <span className="text-[#84C78B] text-lg">🌿</span>
            </div>

            {/* Amber Highlight Tagline */}
            <div className="inline-block bg-gradient-to-r from-[#D97706]/20 via-[#F59E0B]/25 to-[#D97706]/20 border border-[#F59E0B]/40 px-4 py-1.5 rounded-full shadow-inner">
              <p className="text-xs sm:text-sm font-serif font-bold text-[#FDE68A] flex items-center gap-2">
                <span>✦</span>
                <span>আঁখি হারবাল উপাদানে প্রাকৃতিক যত্ন</span>
                <span>✦</span>
              </p>
            </div>

            {/* 4 Official Benefits Grid (2x2 on Left Side) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              
              {/* Benefit 1: চুল পড়া কমায় */}
              <div className="bg-[#183E21]/90 hover:bg-[#1E4D2A] border border-[#2E6B39] rounded-2xl p-3 sm:p-3.5 flex items-center gap-3 transition-all duration-300 shadow-sm">
                <div className="w-10 h-10 rounded-full bg-white text-[#183E21] flex items-center justify-center shrink-0 shadow-xs">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2v14" />
                    <path d="m19 12-7 7-7-7" />
                    <circle cx="12" cy="19" r="1" fill="currentColor" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-xs sm:text-sm text-white leading-tight">
                    চুল পড়া কমায়
                  </h3>
                  <p className="text-[11px] text-[#A6CFA9] mt-0.5">১৪ দিনে দৃশ্যমান পরিবর্তন</p>
                </div>
              </div>

              {/* Benefit 2: নতুন চুল গজায় */}
              <div className="bg-[#183E21]/90 hover:bg-[#1E4D2A] border border-[#2E6B39] rounded-2xl p-3 sm:p-3.5 flex items-center gap-3 transition-all duration-300 shadow-sm">
                <div className="w-10 h-10 rounded-full bg-white text-[#183E21] flex items-center justify-center shrink-0 shadow-xs">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22v-9" />
                    <path d="M9 13a4 4 0 0 1 6 0" />
                    <path d="M7 9a6 6 0 0 1 10 0" />
                    <circle cx="12" cy="4" r="1.5" fill="currentColor" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-xs sm:text-sm text-white leading-tight">
                    নতুন চুল গজায়
                  </h3>
                  <p className="text-[11px] text-[#A6CFA9] mt-0.5">বেবি হেয়ার উদ্দীপক</p>
                </div>
              </div>

              {/* Benefit 3: ১০০% সমস্যা মুক্তি */}
              <div className="bg-[#183E21]/90 hover:bg-[#1E4D2A] border border-[#2E6B39] rounded-2xl p-3 sm:p-3.5 flex items-center gap-3 transition-all duration-300 shadow-sm">
                <div className="w-10 h-10 rounded-full bg-white text-[#183E21] flex items-center justify-center shrink-0 shadow-xs">
                  <ShieldCheck className="w-5 h-5 text-[#2E7D32]" />
                </div>
                <div>
                  <h3 className="font-bold text-xs sm:text-sm text-white leading-tight">
                    ১০০% সমস্যা মুক্তি
                  </h3>
                  <p className="text-[11px] text-[#A6CFA9] mt-0.5">কোনো পার্শ্বপ্রতিক্রিয়া নেই</p>
                </div>
              </div>

              {/* Benefit 4: খুশকি ও চুলকানি দূর */}
              <div className="bg-[#183E21]/90 hover:bg-[#1E4D2A] border border-[#2E6B39] rounded-2xl p-3 sm:p-3.5 flex items-center gap-3 transition-all duration-300 shadow-sm">
                <div className="w-10 h-10 rounded-full bg-white text-[#183E21] flex items-center justify-center shrink-0 shadow-xs">
                  <Sparkles className="w-5 h-5 text-[#D97706]" />
                </div>
                <div>
                  <h3 className="font-bold text-xs sm:text-sm text-white leading-tight">
                    খুশকি ও চুলকানি দূর
                  </h3>
                  <p className="text-[11px] text-[#A6CFA9] mt-0.5">প্রথম ২-৩ ব্যবহারে পরিষ্কার</p>
                </div>
              </div>

            </div>

          </div>

          {/* RIGHT SIDE: Pure Product Image Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden border-2 border-[#2E6B39]/70 shadow-2xl bg-[#0A1A0D] group">
              
              {/* Product Visual Container */}
              <div className="relative w-full aspect-square sm:aspect-[4/3] lg:aspect-square overflow-hidden">
                <img
                  src="/akhi_combo_pack.jpg"
                  alt="Akhi Apaa Organic Hair Oil and Natural Herbal Hair Pack on rustic mossy tree stump in sunlit lush forest"
                  className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700"
                  loading="eager"
                  referrerPolicy="no-referrer"
                />

                {/* 100% Organic Natural Product Badge */}
                <div className="absolute top-3.5 left-3.5 bg-[#102B13]/90 backdrop-blur-md border border-[#2E6B39] text-[#A5D6A7] px-3.5 py-1.5 rounded-full text-xs font-bold flex items-center gap-2 shadow-xl">
                  <Award className="w-3.5 h-3.5 text-[#58D68D]" />
                  <span>100% Organic Natural Product</span>
                </div>

                {/* Botanical Watermark Tag on Bottom */}
                <div className="absolute bottom-3.5 right-3.5 bg-[#0D2211]/85 backdrop-blur-md border border-white/10 text-white/95 px-3.5 py-1 rounded-full text-xs font-medium shadow-md">
                  🌿 আঁখি আপা সিগনেচার কালেকশন
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Reassurance Footer Row */}
        <div className="pt-6 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center text-xs text-[#BED7C1]">
          <div className="flex flex-col items-center gap-0.5">
            <span className="font-bold text-white text-xs sm:text-sm">১০০% ক্যাশ অন ডেলিভারি</span>
            <span className="text-[10px] sm:text-[11px] text-[#86AB8B]">পণ্য হাতে পেয়ে মূল্য পরিশোধ</span>
          </div>
          <div className="flex flex-col items-center gap-0.5">
            <span className="font-bold text-white text-xs sm:text-sm">প্রাকৃতিক উপাদান</span>
            <span className="text-[10px] sm:text-[11px] text-[#86AB8B]">২৮টি ঔষধি ভেষজের নির্যাস</span>
          </div>
          <div className="flex flex-col items-center gap-0.5">
            <span className="font-bold text-white text-xs sm:text-sm">দ্রুত ডেলিভারি</span>
            <span className="text-[10px] sm:text-[11px] text-[#86AB8B]">সারাদেশে ২-৩ দিনে হোম ডেলিভারি</span>
          </div>
          <div className="flex flex-col items-center gap-0.5">
            <span className="font-bold text-white text-xs sm:text-sm">অরিজিনাল গ্যারান্টি</span>
            <span className="text-[10px] sm:text-[11px] text-[#86AB8B]">খাঁটি ও ঘরোয়া প্রস্তুতকৃত</span>
          </div>
        </div>

      </div>
    </section>
  );
};

