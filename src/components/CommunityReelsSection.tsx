import React, { useState, useRef, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  ChevronLeft, 
  ChevronRight, 
  Heart, 
  ShoppingBag, 
  Star, 
  CheckCircle2, 
  X, 
  Sparkles,
  Eye,
  Camera,
  Video,
  Share2,
  ChevronDown,
  ExternalLink
} from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { UGC_POSTS, OFFICIAL_FACEBOOK_URL } from '../data/ugcFeeds';
import { Product, UGCPost } from '../types';

export interface CommunityReel {
  id: string;
  videoSrc: string;
  posterSrc: string;
  stickerText?: string;
  stickerBadge?: string;
  stickerPosition?: 'top' | 'middle' | 'bottom';
  creatorName: string;
  location: string;
  rating: number;
  productTitle: string;
  productId: string;
  priceBDT: number;
  views: string;
  likesCount: number;
  reviewBengali: string;
  taglineBengali: string;
}

const COMMUNITY_REELS: CommunityReel[] = [
  {
    id: 'reel-1',
    videoSrc: '/videos/community_video_1.mp4',
    posterSrc: '/videos/community_poster_1.jpg',
    stickerText: 'SECRET THAT...',
    stickerBadge: 'HAIR OIL HACK',
    stickerPosition: 'bottom',
    creatorName: 'সাদিয়া তাসনিম',
    location: 'মিরপুর, ঢাকা',
    rating: 5,
    productTitle: 'আঁখি আপা স্পেশাল হেয়ার অয়েল (২০০ মিলি)',
    productId: 'akhi-apaa-special-hair-oil-200ml',
    priceBDT: 750,
    views: '48.2K',
    likesCount: 2840,
    reviewBengali: '৩ সপ্তাহ নিয়মিত ব্যবহারে চুল পড়া প্রায় ৮০% বন্ধ হয়ে গেছে! তেলের ন্যাচারাল ভেষজ সুবাস আর থিকনেস অসাধারণ।',
    taglineBengali: 'চুল পড়া বন্ধে ম্যাজিকাল হেয়ার ড্রপ'
  },
  {
    id: 'reel-2',
    videoSrc: '/videos/community_video_2.mp4',
    posterSrc: '/videos/community_poster_2.jpg',
    stickerText: 'unbox w me',
    stickerBadge: 'UNBOXING',
    stickerPosition: 'middle',
    creatorName: 'তানিয়া রহমান',
    location: 'উত্তরা, ঢাকা',
    rating: 5,
    productTitle: 'আঁখি হেয়ার রিগ্রোথ কম্বো প্যাক',
    productId: 'akhi-apaa-super-combo',
    priceBDT: 1540,
    views: '62.8K',
    likesCount: 3910,
    reviewBengali: 'আজকে পার্সেল রিসিভ করলাম! প্যাকেজিং এতো চমৎকার আর সুরক্ষিত ছিলো। তেল আর হেয়ার প্যাক দুটোরই ফ্রেশ অর্গানিক স্মেল।',
    taglineBengali: 'ফুল কম্বো আনবক্সিং ও রিভিউ'
  },
  {
    id: 'reel-3',
    videoSrc: '/videos/community_video_3.mp4',
    posterSrc: '/videos/community_poster_3.jpg',
    stickerText: 'GLOW FORMULA',
    stickerBadge: 'CUSTOMER FAV',
    stickerPosition: 'bottom',
    creatorName: 'মাহিয়া হক',
    location: 'ধানমন্ডি, ঢাকা',
    rating: 5,
    productTitle: 'আঁখি আপা স্পেশাল হেয়ার প্যাক (২০০ গ্রাম)',
    productId: 'akhi-apaa-hair-pack-200g',
    priceBDT: 850,
    views: '35.4K',
    likesCount: 1980,
    reviewBengali: 'দুটো প্যাক ট্রাই করার পর স্ক্যাল্পের ড্যানড্রাফ আর ড্রাইনেস পুরো উধাও! চুল এখন আগের চেয়ে অনেক বেশি সিল্কি ও মজবুত।',
    taglineBengali: 'রুক্ষ চুলকে করবে রেশমি মসৃণ'
  },
  {
    id: 'reel-4',
    videoSrc: '/videos/community_video_4.mp4',
    posterSrc: '/videos/community_poster_4.jpg',
    stickerText: 'If you want the hair of your dreams',
    stickerBadge: 'RESULTS',
    stickerPosition: 'bottom',
    creatorName: 'সুমাইয়া আক্তার',
    location: 'জিইসি, চট্টগ্রাম',
    rating: 5,
    productTitle: 'আঁখি আপা স্পেশাল হেয়ার অয়েল (২০০ মিলি)',
    productId: 'akhi-apaa-special-hair-oil-200ml',
    priceBDT: 750,
    views: '71.5K',
    likesCount: 5200,
    reviewBengali: 'আমার নতুন বেবি হেয়ার গ্রোথ শুরু হয়েছে দেড় মাসের মাথায়। আমি নিজে ট্রাই করে বান্ধবীদেরও রেকমেন্ড করেছি!',
    taglineBengali: 'নতুন চুল গজানোর দৃশ্যমান প্রমাণ'
  },
  {
    id: 'reel-5',
    videoSrc: '/videos/community_video_5.mp4',
    posterSrc: '/videos/community_poster_5.jpg',
    stickerText: '100% PURE HERBS',
    stickerBadge: 'HANDMADE OIL',
    stickerPosition: 'middle',
    creatorName: 'ফারহানা ইসলাম',
    location: 'সিলেট সদর',
    rating: 5,
    productTitle: 'আঁখি হেয়ার রিগ্রোথ কম্বো প্যাক',
    productId: 'akhi-apaa-super-combo',
    priceBDT: 1540,
    views: '54.0K',
    likesCount: 3410,
    reviewBengali: 'কোনো ক্ষতিকর কেমিক্যাল নেই, পুরোপুরি প্রাকৃতিক উপাদানে তৈরি। ব্যবহার করলেই বুঝবেন বাজারের অন্য তেলের চেয়ে কতটা আলাদা।',
    taglineBengali: 'খাঁটি হাতে তৈরি হারবাল ফর্মুলেশন'
  },
  {
    id: 'reel-6',
    videoSrc: '/videos/community_video_6.mp4',
    posterSrc: '/videos/community_poster_6.jpg',
    stickerText: 'DAILY ROUTINE',
    stickerBadge: 'HAIR CARE TIPS',
    stickerPosition: 'bottom',
    creatorName: 'রুমানা রশিদ',
    location: 'রাজশাহী',
    rating: 5,
    productTitle: 'আঁখি আপা স্পেশাল হেয়ার অয়েল (২০০ মিলি)',
    productId: 'akhi-apaa-special-hair-oil-200ml',
    priceBDT: 750,
    views: '41.9K',
    likesCount: 2620,
    reviewBengali: 'সপ্তাহে ৩ দিন রাতে অয়েল ম্যাসাজ করে সকালে ওয়াশ করি। চুল পড়ার সমস্যা দূর হয়ে চুলের ভলিউম ডাবল হয়েছে!',
    taglineBengali: 'আমার গোপন হেয়ার কেয়ার রুটিন'
  }
];

interface CommunityReelsSectionProps {
  onAddToCart: (product: Product, quantity?: number) => void;
  onBuyNow: (product: Product, quantity?: number) => void;
  onViewProduct?: (product: Product) => void;
}

export const CommunityReelsSection: React.FC<CommunityReelsSectionProps> = ({
  onAddToCart,
  onBuyNow,
  onViewProduct
}) => {
  // Tab state: 'videos' or 'socialProof'
  const [activeTab, setActiveTab] = useState<'videos' | 'socialProof'>('socialProof');

  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Sound and active states for video reels
  const [mutedStates, setMutedStates] = useState<Record<string, boolean>>({
    'reel-1': true,
    'reel-2': true,
    'reel-3': true,
    'reel-4': true,
    'reel-5': true,
    'reel-6': true
  });
  const [pausedStates, setPausedStates] = useState<Record<string, boolean>>({});
  const [activeModalReel, setActiveModalReel] = useState<CommunityReel | null>(null);
  const [modalMuted, setModalMuted] = useState(false);
  const [likedReels, setLikedReels] = useState<Record<string, boolean>>({});
  const [selectedProof, setSelectedProof] = useState<UGCPost | null>(null);

  const videoRefs = useRef<Record<string, HTMLVideoElement | null>>({});

  const checkScroll = () => {
    if (!carouselRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);
  };

  useEffect(() => {
    checkScroll();
    const handleResize = () => checkScroll();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [activeTab]);

  const handleScroll = (direction: 'left' | 'right') => {
    if (!carouselRef.current) return;
    const scrollAmount = direction === 'left' ? -340 : 340;
    carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    setTimeout(checkScroll, 350);
  };

  const toggleMute = (reelId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setMutedStates((prev) => {
      const nextMuted = !prev[reelId];
      const vid = videoRefs.current[reelId];
      if (vid) {
        vid.muted = nextMuted;
      }
      return { ...prev, [reelId]: nextMuted };
    });
  };

  const togglePlay = (reelId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const vid = videoRefs.current[reelId];
    if (!vid) return;

    if (vid.paused) {
      vid.play().catch(() => {});
      setPausedStates((prev) => ({ ...prev, [reelId]: false }));
    } else {
      vid.pause();
      setPausedStates((prev) => ({ ...prev, [reelId]: true }));
    }
  };

  const toggleLike = (reelId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikedReels((prev) => ({ ...prev, [reelId]: !prev[reelId] }));
  };

  const getProductForReel = (productId: string): Product => {
    return (
      PRODUCTS.find((p) => p.id === productId) ||
      PRODUCTS[0]
    );
  };

  return (
    <section id="ugc-feed" className="py-14 sm:py-20 bg-white border-t border-b border-[#E8EDE6] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Section Header Matching Uploaded Reference */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#0F2615] font-serif-brand">
            Hear From Our Customers
          </h2>
          <p className="text-sm sm:text-base text-[#465A4B] font-medium leading-relaxed">
            Discover why <span className="text-[#0E7A33] font-bold">thousands trust us</span> for their natural{' '}
            <span className="text-[#0E7A33] font-bold">hair transformation</span>
          </p>
        </div>

        {/* Pill Tab Switcher: [ Video Reviews | Social Proof ] */}
        <div className="flex justify-center">
          <div className="inline-flex items-center bg-white p-1 rounded-full border border-[#DCE5DC] shadow-2xs">
            <button
              onClick={() => setActiveTab('videos')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                activeTab === 'videos'
                  ? 'bg-[#0E7A33] text-white shadow-sm'
                  : 'text-[#4A5D4F] hover:text-[#0F2615]'
              }`}
            >
              <Video className="w-4 h-4" />
              <span>Video Reviews</span>
            </button>
            <button
              onClick={() => setActiveTab('socialProof')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                activeTab === 'socialProof'
                  ? 'bg-[#0E7A33] text-white shadow-sm'
                  : 'text-[#4A5D4F] hover:text-[#0F2615]'
              }`}
            >
              <Camera className="w-4 h-4" />
              <span>Social Proof</span>
            </button>
          </div>
        </div>

        {/* Rating summary & sorting bar */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-2 text-xs sm:text-sm">
            <div className="flex items-center text-[#F59E0B]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <span className="font-bold text-[#142A19]">4.9</span>
            <span className="text-[#657B69] flex items-center gap-1 cursor-pointer hover:text-[#142A19]">
              15 Reviews <ChevronDown className="w-3.5 h-3.5" />
            </span>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border border-[#DCE4DA] bg-white text-xs font-semibold text-[#2D4532]">
              <Sparkles className="w-3.5 h-3.5 text-[#0E7A33]" />
              <span>Featured</span>
              <ChevronDown className="w-3 h-3 text-[#647968]" />
            </div>
          </div>
        </div>

        {/* Carousel Container */}
        <div className="relative group">
          
          {/* Prev Arrow */}
          {canScrollLeft && (
            <button
              id="community-reel-prev-btn"
              onClick={() => handleScroll('left')}
              className="absolute -left-3 sm:-left-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/95 hover:bg-white text-[#0E7A33] shadow-lg border border-gray-200/80 flex items-center justify-center transition-all hover:scale-105 active:scale-95 cursor-pointer"
              aria-label="Previous community cards"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}

          {/* Next Arrow */}
          {canScrollRight && (
            <button
              id="community-reel-next-btn"
              onClick={() => handleScroll('right')}
              className="absolute -right-3 sm:-right-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/95 hover:bg-white text-[#0E7A33] shadow-lg border border-gray-200/80 flex items-center justify-center transition-all hover:scale-105 active:scale-95 cursor-pointer"
              aria-label="Next community cards"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          )}

          {/* Horizontal Scrollable Video Track or Social Proof Cards */}
          <div
            ref={carouselRef}
            onScroll={checkScroll}
            className="flex gap-4 sm:gap-5 overflow-x-auto scrollbar-none scroll-smooth pb-4 px-1"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {/* 1. SOCIAL PROOF CARDS TAB (Matching screenshot 1 exactly) */}
            {activeTab === 'socialProof' && (
              <>
                {UGC_POSTS.map((post) => {
                  return (
                    <div
                      key={post.id}
                      onClick={() => setSelectedProof(post)}
                      className="shrink-0 w-64 sm:w-72 bg-white rounded-2xl border border-[#E1E8E0] overflow-hidden shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col justify-between cursor-pointer group"
                    >
                      {/* Social Proof Poster (Screenshot) */}
                      <div className="relative aspect-3/4 w-full bg-[#EFF4EE] overflow-hidden">
                        <img
                          src={post.image}
                          alt={post.authorName}
                          loading="lazy"
                          className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                        />
                      </div>

                      {/* Customer Info Footer */}
                      <div className="p-3.5 space-y-2 border-t border-[#EDF2EC]">
                        <div className="flex items-center justify-between">
                          <h4 className="font-bold text-xs sm:text-sm text-[#142C18] truncate">
                            {post.authorName}
                          </h4>
                          {post.verifiedOrder && (
                            <span className="flex items-center gap-1 text-[10px] text-[#0E7A33] font-semibold bg-[#EAF5EC] px-2 py-0.5 rounded-full shrink-0">
                              <CheckCircle2 className="w-3 h-3 text-[#0E7A33]" />
                              Verified
                            </span>
                          )}
                        </div>

                        {/* Stars */}
                        <div className="flex items-center text-[#F59E0B]">
                          {[...Array(post.rating)].map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-current" />
                          ))}
                        </div>

                        {/* Product Tag */}
                        <div className="pt-1 flex items-center justify-between text-[11px] text-[#556D58]">
                          <span className="truncate max-w-[80%] font-medium">
                            {post.taggedProductName}
                          </span>
                          <span className="text-[#0E7A33] font-bold text-[10px] uppercase">
                            Review
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </>
            )}

            {/* 2. VIDEO REELS TAB (Matching screenshot 2 exactly) */}
            {activeTab === 'videos' && (
              <>
                {COMMUNITY_REELS.map((reel) => {
                  const isMuted = mutedStates[reel.id] ?? true;
                  const isPaused = pausedStates[reel.id] ?? false;
                  const isLiked = likedReels[reel.id] ?? false;
                  const currentLikes = reel.likesCount + (isLiked ? 1 : 0);
                  const linkedProduct = getProductForReel(reel.productId);

                  return (
                    <div
                      key={reel.id}
                      className="shrink-0 w-64 sm:w-72 relative rounded-3xl overflow-hidden shadow-md bg-black group transition-all duration-300 hover:shadow-2xl select-none"
                      style={{ height: '480px' }}
                    >
                      {/* Video Player */}
                      <div 
                        className="relative w-full h-full cursor-pointer"
                        onClick={() => setActiveModalReel(reel)}
                      >
                        <video
                          ref={(el) => {
                            videoRefs.current[reel.id] = el;
                          }}
                          src={reel.videoSrc}
                          poster={reel.posterSrc}
                          autoPlay
                          loop
                          muted={isMuted}
                          playsInline
                          preload="metadata"
                          className="w-full h-full object-cover"
                        />

                        {/* Dark Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/30 pointer-events-none" />

                        {/* Big Center Play Icon (When paused or on hover) */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                          <div className="w-13 h-13 rounded-full bg-black/50 backdrop-blur-xs flex items-center justify-center text-white border border-white/20">
                            <Play className="w-6 h-6 fill-white ml-0.5" />
                          </div>
                        </div>

                        {/* Top Controls: Sound Toggle & Likes */}
                        <div className="absolute top-3 inset-x-3 flex items-center justify-between z-10">
                          <span className="text-[11px] font-bold text-white/90 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10 flex items-center gap-1.5">
                            <Eye className="w-3.5 h-3.5 text-emerald-400" />
                            {reel.views}
                          </span>

                          <button
                            onClick={(e) => toggleMute(reel.id, e)}
                            className="w-8 h-8 rounded-full bg-black/50 backdrop-blur-md text-white border border-white/15 flex items-center justify-center hover:bg-black/80 transition-colors"
                            aria-label={isMuted ? 'Unmute reel' : 'Mute reel'}
                          >
                            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                          </button>
                        </div>

                        {/* Bottom Information Card inside Video */}
                        <div className="absolute bottom-0 inset-x-0 p-4 z-10 space-y-2">
                          {/* Creator Info */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1.5">
                              <span className="font-bold text-xs sm:text-sm text-white drop-shadow-sm">
                                {reel.creatorName}
                              </span>
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400/20" />
                            </div>
                            <div className="flex items-center text-[#F59E0B]">
                              {[...Array(reel.rating)].map((_, i) => (
                                <Star key={i} className="w-3 h-3 fill-current" />
                              ))}
                            </div>
                          </div>

                          <p className="text-xs text-white/90 line-clamp-2 leading-relaxed drop-shadow-xs">
                            "{reel.reviewBengali}"
                          </p>

                          {/* Product Pill Buy Button */}
                          <div className="pt-1 flex items-center justify-between gap-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                if (onViewProduct) onViewProduct(linkedProduct);
                              }}
                              className="text-left text-white/80 hover:text-white truncate text-[11px]"
                            >
                              <span className="block font-semibold text-emerald-300">
                                ৳{reel.priceBDT}
                              </span>
                              <span className="block truncate max-w-[130px] font-medium text-white/90">
                                {reel.productTitle}
                              </span>
                            </button>

                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                onBuyNow(linkedProduct, 1);
                              }}
                              className="px-3 py-1.5 bg-[#0E7A33] hover:bg-[#0B6128] text-white text-xs font-bold rounded-xl transition-colors shadow-md flex items-center gap-1 shrink-0"
                            >
                              <ShoppingBag className="w-3.5 h-3.5" />
                              <span>অর্ডার</span>
                            </button>
                          </div>
                        </div>

                      </div>
                    </div>
                  );
                })}
              </>
            )}

          </div>
        </div>

        {/* Facebook Community Callout */}
        <div className="bg-[#F8FBF8] rounded-2xl p-4 sm:p-5 border border-[#DCE5DC] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left space-y-0.5">
            <h4 className="font-serif-brand font-bold text-sm sm:text-base text-[#123118]">
              Join 18,400+ Followers on Akhi Herbal Care Facebook Page
            </h4>
            <p className="text-xs text-[#526B56]">
              প্রতিদিনের কাস্টমার ফিডব্যাক, আনবক্সিং ভিডিও ও হেয়ার কেয়ার টিপস পেতে আমাদের অফিসিয়াল পেইজ ফলো করুন
            </p>
          </div>
          <a
            href={OFFICIAL_FACEBOOK_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 bg-[#1877F2] hover:bg-[#1565C0] text-white text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5 shadow-2xs shrink-0"
          >
            <span>Visit Facebook Page</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

      </div>

      {/* Social Proof Detail Modal */}
      {selectedProof && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="relative w-full max-w-lg bg-white rounded-3xl overflow-hidden shadow-2xl border border-[#DCE4DA] flex flex-col max-h-[90vh]">
            <button
              onClick={() => setSelectedProof(null)}
              className="absolute top-3 right-3 z-10 p-2 rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="overflow-y-auto">
              <div className="aspect-3/4 w-full bg-[#183E21]">
                <img
                  src={selectedProof.image}
                  alt={selectedProof.authorName}
                  className="w-full h-full object-contain bg-black"
                />
              </div>

              <div className="p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-sm text-[#162D19]">{selectedProof.authorName}</h4>
                    <p className="text-xs text-[#5D7260]">{selectedProof.authorCity} • Verified Customer</p>
                  </div>
                  <div className="flex items-center text-[#F59E0B]">
                    {[...Array(selectedProof.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                </div>

                <p className="text-xs text-[#2A432F] leading-relaxed bg-[#F4F8F4] p-3 rounded-xl border border-[#E0EAE0]">
                  "{selectedProof.content}"
                </p>

                <div className="flex items-center justify-between pt-2">
                  <span className="font-serif-brand font-bold text-xs text-[#0E7A33]">
                    {selectedProof.taggedProductName}
                  </span>
                  <a
                    href={selectedProof.facebookPostUrl || OFFICIAL_FACEBOOK_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-[#0E7A33] text-white text-xs font-bold rounded-xl hover:bg-[#0B6128] transition-colors"
                  >
                    View on Facebook
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Reel Fullscreen Modal */}
      {activeModalReel && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-0 sm:p-4">
          <div className="relative w-full max-w-sm sm:max-w-md h-full sm:h-[85vh] bg-black sm:rounded-3xl overflow-hidden flex flex-col justify-between">
            <button
              onClick={() => setActiveModalReel(null)}
              className="absolute top-4 right-4 z-30 p-2 rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative w-full h-full flex items-center justify-center">
              <video
                src={activeModalReel.videoSrc}
                poster={activeModalReel.posterSrc}
                autoPlay
                loop
                playsInline
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
