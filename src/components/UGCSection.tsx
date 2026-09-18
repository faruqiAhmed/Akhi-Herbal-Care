import React, { useState } from 'react';
import { 
  Facebook, 
  Star, 
  Heart, 
  CheckCircle2, 
  Sparkles, 
  Share2, 
  ExternalLink,
  MessageCircle,
  ThumbsUp,
  Filter,
  Camera
} from 'lucide-react';
import { UGC_POSTS, OFFICIAL_FACEBOOK_URL, BRAND_STATS } from '../data/ugcFeeds';
import { UGCPost, Product } from '../types';

interface UGCSectionProps {
  onSelectProductById: (productId: string) => void;
}

export const UGCSection: React.FC<UGCSectionProps> = ({ onSelectProductById }) => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'beforeAfter' | 'facebook' | 'whatsapp'>('all');
  const [selectedPost, setSelectedPost] = useState<UGCPost | null>(null);
  const [likedPosts, setLikedPosts] = useState<Record<string, boolean>>({});

  const filteredPosts = UGC_POSTS.filter((post) => {
    if (selectedFilter === 'beforeAfter') return post.isBeforeAfter;
    if (selectedFilter === 'facebook') return post.platform === 'facebook';
    if (selectedFilter === 'whatsapp') return post.platform === 'whatsapp';
    return true;
  });

  const toggleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikedPosts((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section id="ugc-feed" className="py-16 sm:py-20 bg-[#F5F8F5] border-t border-b border-[#E3EAE1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Section Title & Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 bg-[#E2EFE4] text-[#1E4E28] px-3 py-1 rounded-full text-xs font-semibold">
              <Camera className="w-3.5 h-3.5 text-[#2E7D32]" />
              <span>Real Customer Stories & Feeds</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif-brand font-bold text-[#142C17]">
              Loved by Thousands Across Bangladesh
            </h2>
            <p className="text-sm text-[#4E6351] max-w-2xl font-serif italic">
              আঁখি হারবাল কেয়ারের সন্তুষ্ট গ্রাহকদের আসল অভিজ্ঞতা ও হেয়ার ট্রান্সফরমেশন
            </p>
          </div>

          {/* Facebook Official Page Callout Box */}
          <div className="flex items-center gap-3 bg-white p-3.5 rounded-2xl border border-[#DCE4DA] shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-[#1877F2] text-white flex items-center justify-center">
              <Facebook className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-[#19321D]">Akhi Herbal Care</span>
                <CheckCircle2 className="w-3.5 h-3.5 text-[#1877F2] fill-[#1877F2]/20" />
              </div>
              <p className="text-[11px] text-[#5B705E]">{BRAND_STATS.facebookFollowers} Facebook Community</p>
            </div>
            <a
              href={OFFICIAL_FACEBOOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 px-3 py-1.5 bg-[#1877F2] hover:bg-[#1565C0] text-white text-xs font-semibold rounded-xl transition-colors flex items-center gap-1"
            >
              <span>Follow</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <button
            onClick={() => setSelectedFilter('all')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
              selectedFilter === 'all'
                ? 'bg-[#183E21] text-white shadow-2xs'
                : 'bg-white text-[#384E3C] hover:bg-[#EAEFE8] border border-[#DEE5DC]'
            }`}
          >
            All Stories ({UGC_POSTS.length})
          </button>
          <button
            onClick={() => setSelectedFilter('beforeAfter')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1.5 ${
              selectedFilter === 'beforeAfter'
                ? 'bg-[#183E21] text-white shadow-2xs'
                : 'bg-white text-[#384E3C] hover:bg-[#EAEFE8] border border-[#DEE5DC]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-[#D97706]" />
            <span>Before & After Results</span>
          </button>
          <button
            onClick={() => setSelectedFilter('facebook')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1.5 ${
              selectedFilter === 'facebook'
                ? 'bg-[#183E21] text-white shadow-2xs'
                : 'bg-white text-[#384E3C] hover:bg-[#EAEFE8] border border-[#DEE5DC]'
            }`}
          >
            <Facebook className="w-3.5 h-3.5 text-[#1877F2]" />
            <span>Facebook Page Reviews</span>
          </button>
          <button
            onClick={() => setSelectedFilter('whatsapp')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1.5 ${
              selectedFilter === 'whatsapp'
                ? 'bg-[#183E21] text-white shadow-2xs'
                : 'bg-white text-[#384E3C] hover:bg-[#EAEFE8] border border-[#DEE5DC]'
            }`}
          >
            <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
            <span>WhatsApp Orders</span>
          </button>
        </div>

        {/* UGC Cards Masonry/Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => {
            const isLiked = likedPosts[post.id];
            const currentLikes = post.likes + (isLiked ? 1 : 0);

            return (
              <div
                key={post.id}
                onClick={() => setSelectedPost(post)}
                className="bg-white rounded-3xl border border-[#DFE6DC] overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between cursor-pointer group"
              >
                {/* Author Info */}
                <div className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={post.avatar}
                      alt={post.authorName}
                      className="w-10 h-10 rounded-full object-cover ring-2 ring-[#2E7D32]/20"
                    />
                    <div>
                      <div className="flex items-center gap-1">
                        <span className="text-xs font-bold text-[#17301B]">{post.authorName}</span>
                        {post.verifiedOrder && (
                          <span className="text-[10px] text-[#2E7D32] bg-[#EAF5EC] px-1.5 py-0.2 rounded font-semibold" title="Verified Customer Order">
                            Verified
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] text-[#637967] block">{post.authorCity} • {post.date}</span>
                    </div>
                  </div>

                  {post.platform === 'facebook' ? (
                    <Facebook className="w-4 h-4 text-[#1877F2]" />
                  ) : (
                    <MessageCircle className="w-4 h-4 text-[#25D366]" />
                  )}
                </div>

                {/* UGC Photo */}
                <div className="relative aspect-4/3 w-full bg-[#EFF4EE] overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.taggedProductName}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {post.isBeforeAfter && (
                    <span className="absolute top-3 left-3 bg-[#173A1F]/90 backdrop-blur-xs text-white text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-[#F59E0B]" />
                      Hair Regrowth Result
                    </span>
                  )}
                </div>

                {/* Content & Tagged Product */}
                <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    {/* Stars */}
                    <div className="flex items-center text-[#D97706]">
                      {[...Array(post.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>

                    <p className="text-xs text-[#394F3D] leading-relaxed line-clamp-3">
                      "{post.content}"
                    </p>

                    {post.bengaliContent && (
                      <p className="text-[11px] text-[#556E58] font-serif line-clamp-2 italic">
                        "{post.bengaliContent}"
                      </p>
                    )}
                  </div>

                  {/* Tagged Product Link & Engagement */}
                  <div className="pt-2 border-t border-[#EEF2EC] flex items-center justify-between">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectProductById(post.taggedProductId);
                      }}
                      className="text-left max-w-[70%]"
                    >
                      <span className="text-[10px] uppercase font-bold text-[#6D8170] block">Used & Tagged:</span>
                      <span className="text-xs font-bold text-[#183E21] hover:underline truncate block">
                        {post.taggedProductName}
                      </span>
                    </button>

                    <button
                      onClick={(e) => toggleLike(post.id, e)}
                      className={`flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full transition-colors ${
                        isLiked
                          ? 'bg-[#FDE8E8] text-[#E02424]'
                          : 'bg-[#F2F6F1] text-[#546A58] hover:bg-[#E4ECE2]'
                      }`}
                    >
                      <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-current' : ''}`} />
                      <span>{currentLikes}</span>
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Official UGC Share CTA */}
        <div className="bg-gradient-to-r from-[#183E21] to-[#255430] rounded-3xl p-6 sm:p-8 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1.5 text-center sm:text-left">
            <h3 className="font-serif-brand font-bold text-xl sm:text-2xl">
              Have You Used Akhi Herbal Care?
            </h3>
            <p className="text-xs sm:text-sm text-[#C9DEC9] max-w-xl">
              Tag your unboxing photos or hair regrowth progress with <strong>#AkhiHerbalCare</strong> on Facebook to be featured on our storefront!
            </p>
          </div>
          <a
            href={OFFICIAL_FACEBOOK_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-white text-[#183E21] hover:bg-[#F2F7F2] font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-2 whitespace-nowrap"
          >
            <Facebook className="w-4 h-4 text-[#1877F2]" />
            <span>Share on Our Facebook Page</span>
          </a>
        </div>

      </div>

      {/* UGC Single Post Detail Modal */}
      {selectedPost && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-150">
          <div className="relative w-full max-w-2xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-[#DCE4DA] max-h-[90vh] flex flex-col">
            <button
              onClick={() => setSelectedPost(null)}
              className="absolute top-3 right-3 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
            >
              ✕
            </button>

            <div className="overflow-y-auto">
              <div className="aspect-video w-full bg-[#183E21]">
                <img
                  src={selectedPost.image}
                  alt={selectedPost.authorName}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={selectedPost.avatar}
                      alt={selectedPost.authorName}
                      className="w-12 h-12 rounded-full object-cover ring-2 ring-[#2E7D32]"
                    />
                    <div>
                      <h4 className="font-bold text-sm text-[#162D19]">{selectedPost.authorName}</h4>
                      <p className="text-xs text-[#5D7260]">{selectedPost.authorCity} • {selectedPost.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center text-[#D97706]">
                    {[...Array(selectedPost.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                </div>

                <div className="space-y-2 bg-[#F6FAF5] p-4 rounded-2xl border border-[#E0ECE0]">
                  <p className="text-xs sm:text-sm text-[#273D2C] leading-relaxed">
                    "{selectedPost.content}"
                  </p>
                  {selectedPost.bengaliContent && (
                    <p className="text-xs text-[#416045] font-serif italic pt-1 border-t border-[#E1ECE1]">
                      "{selectedPost.bengaliContent}"
                    </p>
                  )}
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div>
                    <span className="text-[11px] text-[#647967] block">Customer purchased:</span>
                    <span className="font-serif-brand font-bold text-sm text-[#183E21]">
                      {selectedPost.taggedProductName}
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      const id = selectedPost.taggedProductId;
                      setSelectedPost(null);
                      onSelectProductById(id);
                    }}
                    className="px-4 py-2 bg-[#183E21] hover:bg-[#112F18] text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
                  >
                    View This Product
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}
    </section>
  );
};
