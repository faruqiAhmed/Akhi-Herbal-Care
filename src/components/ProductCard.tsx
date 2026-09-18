import React, { useState } from 'react';
import { 
  Star, 
  ShoppingBag, 
  Eye, 
  Sparkles, 
  Check, 
  MessageCircle, 
  ArrowRight,
  Zap
} from 'lucide-react';
import { Product } from '../types';
import { OFFICIAL_WHATSAPP_PHONE } from '../data/ugcFeeds';

interface ProductCardProps {
  product: Product;
  currency: 'BDT' | 'USD';
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onBuyNow?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  currency,
  onQuickView,
  onAddToCart,
  onBuyNow
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [addedRecently, setAddedRecently] = useState(false);

  const displayPrice = currency === 'BDT' 
    ? `৳${product.priceBDT.toLocaleString()}` 
    : `$${product.priceUSD.toFixed(2)}`;

  const displayOriginalPrice = currency === 'BDT'
    ? `৳${product.originalPriceBDT.toLocaleString()}`
    : `$${(product.priceUSD * 1.35).toFixed(2)}`;

  const savingsBDT = product.originalPriceBDT - product.priceBDT;
  const discountPercent = Math.round((savingsBDT / product.originalPriceBDT) * 100);

  const whatsappMessage = encodeURIComponent(
    `Hello Akhi Herbal Care! I want to order "${product.name}" (Price: ৳${product.priceBDT}). Please confirm availability and delivery.`
  );

  const handleCartClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product);
    setAddedRecently(true);
    setTimeout(() => setAddedRecently(false), 1600);
  };

  const handleBuyNowClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onBuyNow) {
      onBuyNow(product);
    } else {
      onAddToCart(product);
    }
  };

  return (
    <div 
      id={`product-card-${product.id}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative bg-white rounded-2xl border border-[#E5ECE3] hover:border-[#22502B]/40 hover:shadow-xl hover:shadow-black/5 transition-all duration-300 flex flex-col justify-between overflow-hidden"
    >
      {/* Top Media / Visual Stage */}
      <div 
        className="relative w-full aspect-square bg-[#F5F8F4] overflow-hidden cursor-pointer"
        onClick={() => onQuickView(product)}
      >
        {/* Main Product Image */}
        <img
          src={product.images[0]}
          alt={product.name}
          loading="lazy"
          className={`w-full h-full object-cover object-center transition-all duration-700 ease-out ${
            isHovered && product.images[1] ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
          }`}
        />

        {/* Secondary Hover Image (if available) */}
        {product.images[1] && (
          <img
            src={product.images[1]}
            alt={`${product.name} lifestyle`}
            loading="lazy"
            className={`absolute inset-0 w-full h-full object-cover object-center transition-all duration-700 ease-out ${
              isHovered ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
            }`}
          />
        )}

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.isBestSeller && (
            <span className="inline-flex items-center gap-1 bg-[#133519] text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow-xs backdrop-blur-xs">
              <Sparkles className="w-2.5 h-2.5 text-amber-300" />
              <span>Bestseller</span>
            </span>
          )}
          {discountPercent > 0 && (
            <span className="inline-flex items-center bg-rose-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-xs">
              {discountPercent}% OFF
            </span>
          )}
        </div>

        {/* Floating Quick View Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onQuickView(product);
          }}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-[#19321E] flex items-center justify-center shadow-md backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-all duration-200 cursor-pointer hover:scale-110 z-10"
          title="Quick View Details"
          aria-label="Quick view product"
        >
          <Eye className="w-4 h-4" />
        </button>

        {/* Quick View Strip Indicator on Hover */}
        <div className="absolute inset-x-0 bottom-0 py-1.5 bg-black/40 backdrop-blur-xs text-white text-[11px] font-medium text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden sm:block">
          বিস্তারিত দেখতে ক্লিক করুন (Quick View)
        </div>
      </div>

      {/* Product Content & Details */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3.5">
        
        <div className="space-y-2">
          {/* Category & Volume Row */}
          <div className="flex items-center justify-between text-[11px] font-semibold text-[#57725B] tracking-wider uppercase">
            <span>{product.category === 'hair-oil' ? 'Herbal Hair Oil' : product.category === 'hair-pack' ? 'Natural Hair Pack' : 'Herbal Treatment'}</span>
            <span className="bg-[#EFF5EE] text-[#294B2E] px-2 py-0.5 rounded-md font-medium">
              {product.volumeSize}
            </span>
          </div>

          {/* Titles */}
          <div className="space-y-0.5">
            <h3 
              onClick={() => onQuickView(product)}
              className="font-serif-brand font-bold text-base sm:text-[17px] text-[#142B17] group-hover:text-[#23582E] transition-colors line-clamp-1 cursor-pointer"
              title={product.name}
            >
              {product.name}
            </h3>
            <p className="text-xs text-[#526B55] font-serif line-clamp-1">
              {product.bengaliName}
            </p>
          </div>

          {/* Star Rating & Review Count */}
          <div className="flex items-center gap-1.5 text-xs">
            <div className="flex items-center text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={`w-3.5 h-3.5 ${i < Math.floor(product.rating) ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}`} 
                />
              ))}
            </div>
            <span className="font-bold text-[#1E3321] text-xs">{product.rating}</span>
            <span className="text-[11px] text-[#6E8572]">({product.reviewCount} রিভিউ)</span>
          </div>
        </div>

        {/* Pricing, Stock & Actions Area */}
        <div className="pt-3 border-t border-[#EDF3EB] space-y-3">
          
          {/* Price & Stock Display */}
          <div className="flex items-baseline justify-between gap-2">
            <div className="flex items-baseline gap-2">
              <span className="text-lg sm:text-xl font-extrabold text-[#153E1B]">
                {displayPrice}
              </span>
              {product.originalPriceBDT > product.priceBDT && (
                <span className="text-xs text-[#8E9F90] line-through font-normal">
                  {displayOriginalPrice}
                </span>
              )}
            </div>

            {product.inStock ? (
              <span className="text-[10px] font-semibold text-[#256F2D] flex items-center gap-1 bg-[#EAF5EC] px-2 py-0.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                স্টকে আছে
              </span>
            ) : (
              <span className="text-[10px] font-semibold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full">
                স্টক আউট
              </span>
            )}
          </div>

          {/* Two-Button Clean Action Grid: Add to Cart + Instant Buy */}
          <div className="grid grid-cols-2 gap-2">
            
            {/* 1. Add to Cart Button */}
            <button
              id={`add-to-cart-${product.id}`}
              type="button"
              onClick={handleCartClick}
              disabled={!product.inStock}
              className={`flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl font-bold text-xs transition-all cursor-pointer border ${
                addedRecently
                  ? 'bg-emerald-50 border-emerald-500 text-emerald-700'
                  : 'bg-white hover:bg-[#F2F7F1] border-[#C7D9C5] text-[#1E4B25]'
              }`}
              title="Add product to shopping cart"
            >
              {addedRecently ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>যুক্ত হয়েছে</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>কার্টে রাখুন</span>
                </>
              )}
            </button>

            {/* 2. Instant Buy / Fast Checkout Button */}
            <button
              id={`buy-now-${product.id}`}
              type="button"
              onClick={handleBuyNowClick}
              disabled={!product.inStock}
              className="flex items-center justify-center gap-1 py-2 px-2.5 rounded-xl font-bold text-xs bg-[#153E1B] hover:bg-[#0E2C12] text-white shadow-xs hover:shadow-md transition-all cursor-pointer active:scale-98"
              title="Direct Fast Checkout"
            >
              <Zap className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
              <span>এখনই কিনুন</span>
            </button>

          </div>

          {/* Direct WhatsApp Consultation / Order Link */}
          <div className="pt-0.5 flex items-center justify-between text-[11px] text-[#556F58]">
            <a
              href={`https://wa.me/${OFFICIAL_WHATSAPP_PHONE.replace('+', '')}?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#18752B] hover:underline flex items-center gap-1 transition-colors"
            >
              <MessageCircle className="w-3 h-3 text-[#25D366]" />
              <span>হোয়াটসঅ্যাপে অর্ডার / পরামর্শ</span>
            </a>
            <span className="text-[#889B8B] text-[10px]">ক্যাশ অন ডেলিভারি</span>
          </div>

        </div>

      </div>
    </div>
  );
};
