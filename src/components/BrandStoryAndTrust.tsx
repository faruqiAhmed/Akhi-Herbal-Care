import React from 'react';
import { 
  Sparkles, 
  ShieldCheck, 
  Truck, 
  Phone, 
  Leaf, 
  Heart, 
  Clock, 
  Droplet,
  Award
} from 'lucide-react';
import { OFFICIAL_WHATSAPP_PHONE, OFFICIAL_DISPLAY_PHONE } from '../data/ugcFeeds';

export const BrandStoryAndTrust: React.FC = () => {
  return (
    <section id="why-us" className="py-16 sm:py-20 bg-white border-b border-[#E3EAE1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Story Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          <div className="lg:col-span-6 space-y-5">
            <div className="inline-flex items-center gap-2 bg-[#EAF3EB] text-[#1E4D27] px-3.5 py-1.5 rounded-full text-xs font-semibold">
              <Leaf className="w-3.5 h-3.5 text-[#2E7D32]" />
              <span>The Handcrafted Heritage</span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif-brand font-bold text-[#142B17] leading-tight">
              Rooted in Nature. Handcrafted with Sacred Ayurvedic Care.
            </h2>

            <p className="text-sm sm:text-base text-[#465C4A] leading-relaxed">
              At <strong>Akhi Herbal Care</strong> (আঁখি হারবাল কেয়ার), we reject fast-factory cosmetics filled with cheap mineral oils, parabens, and synthetic perfumes that mask hair damage without treating it.
            </p>

            <p className="text-xs sm:text-sm text-[#556D58] leading-relaxed">
              Every single batch of our hair oil and herbal pack is blended by hand using 28 medicinal herbs—including Bhringraj, Brahmi, Amla, Methi, Shikakai, and cold-pressed Nigella Sativa (Kalonji). Slow-infused over days under natural temperature control, our formulations deliver pure plant actives directly to weakened follicles.
            </p>

            {/* Quality Checklist */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="p-3 bg-[#F7FAF6] rounded-2xl border border-[#E3ECE1] space-y-1">
                <div className="flex items-center gap-1.5 text-[#183E21] font-bold text-xs">
                  <Award className="w-4 h-4 text-[#2E7D32]" />
                  <span>28 Forest Herbs</span>
                </div>
                <p className="text-[11px] text-[#5C725F]">Ethically harvested botanicals</p>
              </div>

              <div className="p-3 bg-[#F7FAF6] rounded-2xl border border-[#E3ECE1] space-y-1">
                <div className="flex items-center gap-1.5 text-[#183E21] font-bold text-xs">
                  <Droplet className="w-4 h-4 text-[#2E7D32]" />
                  <span>100% Chemical Free</span>
                </div>
                <p className="text-[11px] text-[#5C725F]">Zero silicones, mineral oil, or dyes</p>
              </div>

              <div className="p-3 bg-[#F7FAF6] rounded-2xl border border-[#E3ECE1] space-y-1">
                <div className="flex items-center gap-1.5 text-[#183E21] font-bold text-xs">
                  <Clock className="w-4 h-4 text-[#2E7D32]" />
                  <span>Fresh Batches</span>
                </div>
                <p className="text-[11px] text-[#5C725F]">Milled and formulated weekly</p>
              </div>

              <div className="p-3 bg-[#F7FAF6] rounded-2xl border border-[#E3ECE1] space-y-1">
                <div className="flex items-center gap-1.5 text-[#183E21] font-bold text-xs">
                  <Heart className="w-4 h-4 text-[#2E7D32]" />
                  <span>Cruelty-Free</span>
                </div>
                <p className="text-[11px] text-[#5C725F]">Safe for women, men & teens</p>
              </div>
            </div>
          </div>

          {/* Visual Showcase */}
          <div className="lg:col-span-6 relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="rounded-3xl overflow-hidden aspect-4/5 bg-[#E8EFE8] shadow-sm">
                  <img
                    src="/akhi_oil_flower.jpg"
                    alt="Akhi Apaa Organic Hair Oil with Botanical Flowers"
                    loading="lazy"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-4 bg-[#F2F7F2] rounded-3xl border border-[#DCE8DB] text-center">
                  <span className="font-serif-brand font-bold text-2xl text-[#183E21] block">14 Days</span>
                  <span className="text-xs text-[#526955]">Average time to notice reduced hair fall</span>
                </div>
              </div>

              <div className="space-y-4 pt-8">
                <div className="p-4 bg-[#183E21] text-white rounded-3xl text-center space-y-1 shadow-md">
                  <span className="font-serif-brand font-bold text-2xl text-[#E8F5E9] block">12,500+</span>
                  <span className="text-xs text-[#BED8C1]">Bottles handcrafted & shipped</span>
                </div>
                <div className="rounded-3xl overflow-hidden aspect-4/5 bg-[#E8EFE8] shadow-sm">
                  <img
                    src="/akhi_apaa_pack.jpg"
                    alt="Akhi Apaa Natural Herbal Hair Pack Jar"
                    loading="lazy"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* 4 Core Shopping Guarantees */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-6 border-t border-[#EEF3ED]">
          <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-[#FAFBF9] border border-[#E7ECE4]">
            <div className="w-10 h-10 rounded-xl bg-[#E8F4EA] text-[#245C31] flex items-center justify-center shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-[#162D19]">Cash on Delivery</h4>
              <p className="text-[11px] text-[#556D58] mt-0.5">Pay only after checking package at delivery across all Bangladesh</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-[#FAFBF9] border border-[#E7ECE4]">
            <div className="w-10 h-10 rounded-xl bg-[#E8F4EA] text-[#245C31] flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-[#162D19]">Free Shipping ৳1500+</h4>
              <p className="text-[11px] text-[#556D58] mt-0.5">Automated free home delivery on combos and qualifying orders</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-[#FAFBF9] border border-[#E7ECE4]">
            <div className="w-10 h-10 rounded-xl bg-[#E8F4EA] text-[#245C31] flex items-center justify-center shrink-0">
              <Phone className="w-5 h-5 text-[#25D366]" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-[#162D19]">Direct WhatsApp Hotline</h4>
              <p className="text-[11px] text-[#556D58] mt-0.5">Hair care consultation anytime via <strong>{OFFICIAL_DISPLAY_PHONE}</strong></p>
            </div>
          </div>

          <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-[#FAFBF9] border border-[#E7ECE4]">
            <div className="w-10 h-10 rounded-xl bg-[#E8F4EA] text-[#245C31] flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-[#162D19]">100% Authentic Guarantee</h4>
              <p className="text-[11px] text-[#556D58] mt-0.5">Verified official Facebook brand with zero synthetic substitutes</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
