import React, { useState } from 'react';
import { 
  X, 
  Star, 
  Check, 
  ShieldCheck, 
  Sparkles, 
  ShoppingBag, 
  Phone, 
  Heart, 
  Share2, 
  Truck,
  Leaf
} from 'lucide-react';
import { Product } from '../types';
import { OFFICIAL_WHATSAPP_PHONE, OFFICIAL_DISPLAY_PHONE, OFFICIAL_FACEBOOK_URL } from '../data/ugcFeeds';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  currency: 'BDT' | 'USD';
  onAddToCart: (product: Product, quantity: number) => void;
  onBuyNow: (product: Product, quantity: number) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  currency,
  onAddToCart,
  onBuyNow
}) => {
  if (!product) return null;

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'ingredients' | 'howToUse' | 'benefits'>('ingredients');

  const displayPrice = currency === 'BDT' 
    ? `৳${product.priceBDT}` 
    : `$${product.priceUSD.toFixed(2)}`;

  const displayOriginalPrice = currency === 'BDT'
    ? `৳${product.originalPriceBDT}`
    : `$${(product.priceUSD * 1.35).toFixed(2)}`;

  const whatsappInquiry = encodeURIComponent(
    `Hello Akhi Herbal Care! I am looking at "${product.name}" (${product.volumeSize}, Price: ৳${product.priceBDT}) on your website and would like to order.`
  );

  return (
    <div className="fixed inset-0 z-50 bg-black/65 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-[#FBFBFA] rounded-3xl shadow-2xl border border-[#DCE4DA] overflow-hidden my-auto max-h-[92vh] flex flex-col">
        
        {/* Modal Close Header Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/90 hover:bg-white text-[#455D4A] shadow-md transition-colors cursor-pointer"
          aria-label="Close product details"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Scrollable Content Body */}
        <div className="overflow-y-auto p-4 sm:p-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8">
            
            {/* Left: Gallery & Images */}
            <div className="md:col-span-6 space-y-3">
              {/* Active Image */}
              <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-[#EFF4EE] border border-[#DEE6DB]">
                <img
                  src={product.images[activeImageIndex] || product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                {product.isBestSeller && (
                  <span className="absolute top-3 left-3 bg-[#183E21] text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-[#F59E0B]" /> Bestseller
                  </span>
                )}
              </div>

              {/* Thumbnail selector */}
              {product.images.length > 1 && (
                <div className="flex gap-2">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                        activeImageIndex === idx
                          ? 'border-[#183E21] ring-2 ring-[#183E21]/20'
                          : 'border-transparent opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              {/* Guarantees Box */}
              <div className="bg-[#F2F7F2] p-4 rounded-2xl border border-[#D9E5DA] space-y-2 text-xs text-[#39503D]">
                <div className="flex items-center gap-2">
                  <Leaf className="w-4 h-4 text-[#2E7D32]" />
                  <span className="font-semibold text-[#18361D]">Traditional 28-Herbs Slow Brew Formulation</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#2E7D32]" />
                  <span>Zero synthetic perfumes, silicones or chemical preservatives</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-[#2E7D32]" />
                  <span>Cash on Delivery across all 64 Districts of Bangladesh</span>
                </div>
              </div>
            </div>

            {/* Right: Product Details & Purchase Form */}
            <div className="md:col-span-6 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                
                {/* Category & Rating */}
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase font-bold tracking-wider text-[#2E6B39] bg-[#E8F4EA] px-2.5 py-0.5 rounded-full">
                    {product.tag}
                  </span>
                  <div className="flex items-center text-[#D97706] text-xs">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="ml-1 font-bold text-[#1C3220]">{product.rating}</span>
                    <span className="ml-1 text-[#697E6D]">({product.reviewCount} customer reviews)</span>
                  </div>
                </div>

                {/* Titles */}
                <div>
                  <h2 className="font-serif-brand font-bold text-xl sm:text-2xl text-[#152B18]">
                    {product.name}
                  </h2>
                  <p className="text-sm text-[#3E5C42] font-serif mt-0.5">
                    {product.bengaliName}
                  </p>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-3 pt-1">
                  <span className="text-2xl sm:text-3xl font-bold text-[#183E21]">
                    {displayPrice}
                  </span>
                  <span className="text-sm text-[#849988] line-through">
                    {displayOriginalPrice}
                  </span>
                  <span className="text-xs text-[#2E7D32] font-semibold bg-[#E7F5E9] px-2 py-0.5 rounded-md">
                    Save ৳{product.originalPriceBDT - product.priceBDT}
                  </span>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-[#4E6252] leading-relaxed">
                  {product.fullDescription}
                </p>

                {/* Size / Volume */}
                <div className="text-xs font-semibold text-[#2D4531]">
                  Size / Volume: <span className="bg-[#EFF4EE] px-2.5 py-1 rounded-md ml-1 text-[#183E21]">{product.volumeSize}</span>
                </div>

                {/* Interactive Tabs: Ingredients | How to Use | Benefits */}
                <div className="pt-2">
                  <div className="flex border-b border-[#E3EAE0] text-xs font-semibold">
                    <button
                      onClick={() => setActiveTab('ingredients')}
                      className={`pb-2 px-3 transition-colors ${
                        activeTab === 'ingredients'
                          ? 'border-b-2 border-[#183E21] text-[#183E21]'
                          : 'text-[#697E6D] hover:text-[#213724]'
                      }`}
                    >
                      Key Ingredients
                    </button>
                    <button
                      onClick={() => setActiveTab('howToUse')}
                      className={`pb-2 px-3 transition-colors ${
                        activeTab === 'howToUse'
                          ? 'border-b-2 border-[#183E21] text-[#183E21]'
                          : 'text-[#697E6D] hover:text-[#213724]'
                      }`}
                    >
                      How to Use (ব্যবহার বিধি)
                    </button>
                    <button
                      onClick={() => setActiveTab('benefits')}
                      className={`pb-2 px-3 transition-colors ${
                        activeTab === 'benefits'
                          ? 'border-b-2 border-[#183E21] text-[#183E21]'
                          : 'text-[#697E6D] hover:text-[#213724]'
                      }`}
                    >
                      Benefits
                    </button>
                  </div>

                  <div className="py-3 text-xs text-[#445848]">
                    {activeTab === 'ingredients' && (
                      <div className="grid grid-cols-1 gap-2">
                        {product.keyIngredients.map((item, i) => (
                          <div key={i} className="p-2 rounded-xl bg-[#F6F9F5] border border-[#E4ECE2]">
                            <div className="flex items-center justify-between font-semibold text-[#183A1F]">
                              <span>{item.name}</span>
                              {item.bengaliName && <span className="font-serif text-[11px] text-[#3F6344]">{item.bengaliName}</span>}
                            </div>
                            <p className="text-[11px] text-[#556D59] mt-0.5">{item.benefit}</p>
                          </div>
                        ))}
                      </div>
                    )}

                    {activeTab === 'howToUse' && (
                      <ol className="space-y-1.5 list-decimal list-inside text-xs leading-relaxed text-[#4A604E]">
                        {product.usageInstructions.map((step, idx) => (
                          <li key={idx} className="pl-1">{step}</li>
                        ))}
                      </ol>
                    )}

                    {activeTab === 'benefits' && (
                      <ul className="space-y-1.5 text-xs text-[#4A604E]">
                        {product.benefits.map((b, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <Check className="w-3.5 h-3.5 text-[#2E7D32] shrink-0 mt-0.5" />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>

              </div>

              {/* Purchase Controls */}
              <div className="space-y-3 pt-3 border-t border-[#E3EAE0]">
                {/* Quantity Controls */}
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#2D4531]">Quantity:</span>
                  <div className="flex items-center border border-[#DCE4DA] rounded-xl bg-white overflow-hidden">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-1.5 text-[#354D39] hover:bg-[#EEF3ED] font-bold"
                    >
                      -
                    </button>
                    <span className="px-4 py-1.5 text-xs font-bold text-[#183E21]">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(Math.min(product.stockCount, quantity + 1))}
                      className="px-3 py-1.5 text-[#354D39] hover:bg-[#EEF3ED] font-bold"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Primary CTA Buttons */}
                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    onClick={() => {
                      onAddToCart(product, quantity);
                      onClose();
                    }}
                    className="w-full py-3 px-4 rounded-xl border border-[#183E21] text-[#183E21] hover:bg-[#EFF5EE] font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Cart</span>
                  </button>

                  <button
                    onClick={() => {
                      onBuyNow(product, quantity);
                      onClose();
                    }}
                    className="w-full py-3 px-4 rounded-xl bg-[#183E21] hover:bg-[#112E18] text-white font-semibold text-xs flex items-center justify-center gap-1.5 shadow-md transition-all active:scale-98 cursor-pointer"
                  >
                    <span>Instant Checkout</span>
                  </button>
                </div>

                {/* WhatsApp One-Click Order Button */}
                <a
                  href={`https://wa.me/${OFFICIAL_WHATSAPP_PHONE.replace('+', '')}?text=${whatsappInquiry}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 rounded-xl bg-[#EAF8EE] hover:bg-[#D5F2DD] text-[#187532] border border-[#BCE8C7] text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
                >
                  <Phone className="w-4 h-4 text-[#25D366]" />
                  <span>Order via WhatsApp Direct ({OFFICIAL_DISPLAY_PHONE})</span>
                </a>
              </div>

            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
