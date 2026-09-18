import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Sparkles, 
  Flame, 
  CheckCircle2, 
  Gift, 
  Truck, 
  ShieldCheck, 
  Phone, 
  ChevronRight,
  Eye,
  Star,
  Zap
} from 'lucide-react';
import { Product } from '../types';
import { OFFICIAL_WHATSAPP_PHONE, OFFICIAL_DISPLAY_PHONE } from '../data/ugcFeeds';

interface SuperComboShowcaseProps {
  product: Product;
  currency: 'BDT' | 'USD';
  onAddToCart: (product: Product, quantity: number) => void;
  onBuyNow: (product: Product, quantity: number) => void;
  onViewDetails: (product: Product) => void;
}

export const SuperComboShowcase: React.FC<SuperComboShowcaseProps> = ({
  product,
  currency,
  onAddToCart,
  onBuyNow,
  onViewDetails
}) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const images = [
    '/akhi_combo_pack.jpg',
    '/akhi_apaa_oil.jpg',
    '/akhi_apaa_pack.jpg',
    '/akhi_oil_flower.jpg'
  ];

  const currentPrice = currency === 'BDT' 
    ? `৳${(product.priceBDT * quantity).toLocaleString('en-US')}` 
    : `$${((product.priceUSD || 13.90) * quantity).toFixed(2)}`;

  const originalPrice = currency === 'BDT'
    ? `৳${((product.originalPriceBDT || 1950) * quantity).toLocaleString('en-US')}`
    : `$${(((product.originalPriceBDT || 1950) / 115) * quantity).toFixed(2)}`;

  const savings = currency === 'BDT'
    ? `৳${((product.originalPriceBDT || 1950) - product.priceBDT) * quantity}`
    : `$${((((product.originalPriceBDT || 1950) - product.priceBDT) / 115) * quantity).toFixed(2)}`;

  return (
    <section id="combos" className="py-12 sm:py-16 bg-gradient-to-b from-[#EDF5EE] via-[#F4F9F4] to-[#F9FCF9] border-y border-[#D6E5D7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12 space-y-2">
          <div className="inline-flex items-center gap-1.5 bg-[#E2F0E4] border border-[#B9DCBC] text-[#1E5D2A] px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            <Flame className="w-3.5 h-3.5 text-[#E65100] fill-current" />
            <span>Facebook Bestseller Package</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif-brand font-bold text-[#142B17]">
            Akhi Hair Regrowth Super Combo
          </h2>
          <p className="text-xs sm:text-sm text-[#4E6752]">
            আঁখি আপা স্পেশাল কম্বো: অর্গানিক অয়েল (২০০ মি.লি.) + ন্যাচারাল হেয়ার প্যাক (১০০ গ্রাম) + ফ্রি নিম কাঠের চিরুনি
          </p>
        </div>

        {/* Main Product Showcase Card */}
        <div className="bg-white rounded-3xl border border-[#DCE8DC] shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            
            {/* Left Column: Interactive Product Visual Gallery */}
            <div className="lg:col-span-6 p-6 sm:p-8 bg-[#FAFDF9] flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-[#E8EFE8]">
              <div className="space-y-4">
                
                {/* Main Large Image Container */}
                <div className="relative aspect-square sm:aspect-4/3 lg:aspect-square w-full rounded-2xl overflow-hidden bg-white border border-[#E1EBE2] shadow-inner group">
                  <img
                    src={images[selectedImageIndex]}
                    alt="Akhi Hair Regrowth Super Combo"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 cursor-pointer"
                    onClick={() => onViewDetails(product)}
                  />

                  {/* Badges on Image */}
                  <div className="absolute top-3.5 left-3.5 flex flex-col gap-2">
                    <span className="bg-[#183E21]/90 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-sm flex items-center gap-1.5 border border-[#2E7D32]">
                      <Sparkles className="w-3 h-3 text-[#F59E0B]" />
                      <span>১০০% খাঁটি হোমমেড</span>
                    </span>
                    <span className="bg-[#B91C1C] text-white text-[11px] font-extrabold px-3 py-1 rounded-full shadow-sm">
                      সেভ করুন {savings} (28% OFF)
                    </span>
                  </div>

                  {/* Free Gift Badge */}
                  <div className="absolute bottom-3.5 left-3.5 right-3.5 bg-[#122A16]/90 backdrop-blur-md text-white p-2.5 rounded-xl border border-[#2A5E33] flex items-center justify-between shadow-lg">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-[#F59E0B] text-[#122A16] flex items-center justify-center font-bold">
                        <Gift className="w-4 h-4" />
                      </div>
                      <div className="leading-tight">
                        <span className="text-xs font-bold text-[#FDE68A] block">স্পেশাল উপহার (Free Gift)</span>
                        <span className="text-[10px] text-[#A6CCA9]">খাঁটি নিম কাঠের চিরুনি সাথে একদম ফ্রি!</span>
                      </div>
                    </div>
                    <span className="text-[10px] bg-[#2E7D32] text-white px-2 py-0.5 rounded-md font-bold uppercase tracking-wider">
                      ৳৪৫০ ফ্রি
                    </span>
                  </div>
                </div>

                {/* Thumbnail Previews */}
                <div className="grid grid-cols-4 gap-2.5">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImageIndex(idx)}
                      className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                        selectedImageIndex === idx
                          ? 'border-[#2E7D32] ring-2 ring-[#2E7D32]/20 scale-102 shadow-xs'
                          : 'border-[#E0E9E0] hover:border-[#86B98D] opacity-80 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={img}
                        alt={`Combo view ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Quick Customer Rating Note */}
              <div className="mt-6 pt-4 border-t border-[#E8EFE8] flex items-center justify-between text-xs text-[#526D57]">
                <div className="flex items-center gap-1.5">
                  <div className="flex text-[#F59E0B]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="font-bold text-[#183E21]">5.0 / 5.0</span>
                  <span className="text-[11px]">(৬২০+ ভেরিফায়েড রিভিউ)</span>
                </div>
                <button
                  onClick={() => onViewDetails(product)}
                  className="inline-flex items-center gap-1 text-[#2E7D32] hover:text-[#183E21] font-semibold cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>বিস্তারিত রিভিউ</span>
                </button>
              </div>
            </div>

            {/* Right Column: Detailed Product Offering & Instant Order */}
            <div className="lg:col-span-6 p-6 sm:p-8 flex flex-col justify-between space-y-6">
              <div className="space-y-5">
                
                {/* Product Title & Stock Status */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#2E7D32] bg-[#EAF5EB] px-3 py-1 rounded-full">
                      ✓ ইন স্টক (সারাদেশে দ্রুত ডেলিভারি)
                    </span>
                    <span className="text-[11px] font-semibold text-[#8C2E1A] flex items-center gap-1">
                      <Zap className="w-3 h-3 text-[#E65100]" />
                      <span>সীমিত স্টক অফার</span>
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-serif-brand font-bold text-[#142B17] leading-snug">
                    আঁখি আপা হেয়ার রিগ্রোথ সুপার কম্বো
                  </h3>
                  <p className="text-xs sm:text-sm text-[#4E6351] leading-relaxed">
                    চুল পড়া সম্পূর্ণ বন্ধ এবং নতুন চুল গজানোর কার্যকরী প্রাকৃতিক সমাধান। ঘরে বসে আয়ুর্বেদিক যত্নে পান ঘন, লম্বা ও রেশমি চুল।
                  </p>
                </div>

                {/* What You Get (Itemized Bundle Details) */}
                <div className="space-y-2.5 bg-[#F6FAF5] p-4 sm:p-5 rounded-2xl border border-[#DCEADB]">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#1F5428] flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-[#2E7D32]" />
                    <span>কম্বো প্যাকেজের ভেতরে যা যা পাচ্ছেন:</span>
                  </h4>
                  
                  <div className="space-y-2 pt-1 text-xs">
                    <div className="flex items-center justify-between pb-1.5 border-b border-[#E3EFE2]">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-[#183E21] text-white flex items-center justify-center text-[10px] font-bold">১</span>
                        <span className="font-semibold text-[#18321B]">আঁখি আপা অর্গানিক হেয়ার অয়েল (২০০ মিলি)</span>
                      </div>
                      <span className="font-bold text-[#3B543E]">৳৮৫০</span>
                    </div>

                    <div className="flex items-center justify-between pb-1.5 border-b border-[#E3EFE2]">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-[#183E21] text-white flex items-center justify-center text-[10px] font-bold">২</span>
                        <span className="font-semibold text-[#18321B]">আঁখি আপা ন্যাচারাল হারবাল হেয়ার প্যাক (১০০ গ্রাম)</span>
                      </div>
                      <span className="font-bold text-[#3B543E]">৳৬৫০</span>
                    </div>

                    <div className="flex items-center justify-between text-[#1B6127]">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-[#F59E0B] text-[#122A16] flex items-center justify-center text-[10px] font-bold">৩</span>
                        <span className="font-bold">খাঁটি নিম কাঠের চিরুনি (উপহার)</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] text-[#7A997D] line-through">৳৪৫০</span>
                        <span className="font-bold text-[#2E7D32] bg-[#DCFCE7] px-1.5 py-0.5 rounded text-[10px]">ফ্রি!</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Price Display */}
                <div className="flex items-baseline gap-3 pt-1">
                  <span className="text-3xl sm:text-4xl font-bold font-serif-brand text-[#142B17]">
                    {currentPrice}
                  </span>
                  <span className="text-base text-[#7B9580] line-through">
                    {originalPrice}
                  </span>
                  <span className="text-xs font-bold text-[#B91C1C] bg-[#FEE2E2] px-2.5 py-0.5 rounded-full">
                    সেভ {savings}
                  </span>
                </div>

                {/* Quantity Selector */}
                <div className="flex items-center gap-3 pt-1">
                  <span className="text-xs font-semibold text-[#3D5240]">পরিমাণ (Quantity):</span>
                  <div className="flex items-center border border-[#CFDFD0] rounded-xl overflow-hidden bg-[#FAFDF9]">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-1.5 text-sm font-bold text-[#183E21] hover:bg-[#E8F3E9] transition-colors cursor-pointer"
                      disabled={quantity <= 1}
                    >
                      -
                    </button>
                    <span className="px-4 py-1.5 text-xs font-bold text-[#183E21]">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-3 py-1.5 text-sm font-bold text-[#183E21] hover:bg-[#E8F3E9] transition-colors cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-4 border-t border-[#E8EFE8]">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    onClick={() => onBuyNow(product, quantity)}
                    className="w-full py-3.5 px-6 bg-[#183E21] hover:bg-[#123119] text-white font-bold text-sm rounded-xl shadow-md transition-all active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>অর্ডার করুন (Order Now)</span>
                  </button>

                  <button
                    onClick={() => onAddToCart(product, quantity)}
                    className="w-full py-3.5 px-6 bg-[#EBF4EC] hover:bg-[#DFEDE1] text-[#183E21] border border-[#BFDBCA] font-bold text-sm rounded-xl transition-all active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>কার্টে যোগ করুন</span>
                  </button>
                </div>

                {/* Direct WhatsApp Instant Order Button */}
                <a
                  href={`https://wa.me/${OFFICIAL_WHATSAPP_PHONE.replace('+', '')}?text=Hello%20Akhi%20Herbal%20Care,%20I%20want%20to%20order%20the%20Akhi%20Hair%20Regrowth%20Super%20Combo%20(Oil%20+%20Pack%20+%20Neem%20Comb)%20for%20${currentPrice}.%20Please%20confirm%20my%20order.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 bg-[#25D366]/15 hover:bg-[#25D366]/25 border border-[#25D366]/40 text-[#1E7E34] rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors"
                >
                  <Phone className="w-4 h-4 text-[#25D366]" />
                  <span>WhatsApp এ সরাসরি অর্ডার করুন ({OFFICIAL_DISPLAY_PHONE})</span>
                </a>

                {/* Trust Points */}
                <div className="grid grid-cols-3 gap-2 pt-2 text-[11px] text-[#556E58] text-center">
                  <div className="flex items-center justify-center gap-1">
                    <Truck className="w-3.5 h-3.5 text-[#2E7D32]" />
                    <span>সারাদেশে ক্যাশ অন ডেলিভারি</span>
                  </div>
                  <div className="flex items-center justify-center gap-1 border-x border-[#E2ECE2]">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#2E7D32]" />
                    <span>পার্সেল দেখে নেওয়ার সুবিধা</span>
                  </div>
                  <div className="flex items-center justify-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-[#2E7D32]" />
                    <span>১০০% খাঁটি ভেষজ উপাদান</span>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
