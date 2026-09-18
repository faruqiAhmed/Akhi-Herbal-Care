import React from 'react';
import { Facebook, Phone, Heart, Sparkles, ShieldCheck, Mail, MapPin } from 'lucide-react';
import { OFFICIAL_FACEBOOK_URL, OFFICIAL_DISPLAY_PHONE, OFFICIAL_WHATSAPP_PHONE } from '../data/ugcFeeds';

interface FooterProps {
  onNavigateSection: (sectionId: string) => void;
  onOpenOrderTracker: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateSection, onOpenOrderTracker }) => {
  return (
    <footer className="bg-[#142B17] text-[#D3E2D5] pt-14 pb-8 border-t border-[#203D24]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Brand Col */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-[#27532F] text-white flex items-center justify-center font-serif font-bold text-base ring-1 ring-[#5E8C67]">
                <span>আ</span>
              </div>
              <div>
                <span className="font-serif-brand font-bold text-lg text-white tracking-tight">
                  Akhi Herbal Care
                </span>
                <p className="text-[10px] text-[#86A88B] uppercase tracking-wider">আঁখি হারবাল কেয়ার</p>
              </div>
            </div>
            
            <p className="text-xs text-[#B2CDB5] leading-relaxed">
              Handmade small-batch organic hair oils and herbal packs powered by 28 sacred Ayurvedic botanicals. 100% free of synthetic preservatives and toxic chemicals.
            </p>

            <div className="flex items-center gap-3 pt-1">
              <a
                href={OFFICIAL_FACEBOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-[#1F4525] hover:bg-[#1877F2] text-white flex items-center justify-center transition-colors shadow-xs"
                title="Follow Akhi Herbal Care on Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={`https://wa.me/${OFFICIAL_WHATSAPP_PHONE.replace('+', '')}?text=Hello%20Akhi%20Herbal%20Care`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-[#1F4525] hover:bg-[#25D366] text-white flex items-center justify-center transition-colors shadow-xs"
                title="Chat with Akhi Herbal Care on WhatsApp"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Collection Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Herbal Collections
            </h4>
            <ul className="space-y-2 text-xs text-[#A8C7AC]">
              <li>
                <button onClick={() => onNavigateSection('collection')} className="hover:text-white transition-colors cursor-pointer">
                  28-Herb Miracle Hair Oil
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection('combos')} className="hover:text-white transition-colors cursor-pointer flex items-center gap-1">
                  <span>Regrowth Super Combos</span>
                  <span className="bg-[#2C6236] text-[#C9ECCF] text-[9px] px-1.5 py-0.2 rounded">Save 30%</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection('collection')} className="hover:text-white transition-colors cursor-pointer">
                  Anti-Dandruff & Scalp Masks
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection('collection')} className="hover:text-white transition-colors cursor-pointer">
                  Rosemary Leave-In Tonic Mist
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection('collection')} className="hover:text-white transition-colors cursor-pointer">
                  Traditional Bridal Ubtan Pack
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Care & Policies */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Customer Support
            </h4>
            <ul className="space-y-2 text-xs text-[#A8C7AC]">
              <li>
                <button onClick={onOpenOrderTracker} className="hover:text-white transition-colors cursor-pointer">
                  Track Parcel & Delivery Status
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection('ugc-feed')} className="hover:text-white transition-colors cursor-pointer">
                  Customer Stories & Facebook Reviews
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection('why-us')} className="hover:text-white transition-colors cursor-pointer">
                  Our 28-Herb Preparation Secret
                </button>
              </li>
              <li>
                <span className="text-[#84A588]">Cash on Delivery: All 64 Districts</span>
              </li>
            </ul>
          </div>

          {/* Direct WhatsApp & Contact Box */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Direct Inquiries
            </h4>
            <div className="p-3.5 bg-[#1B381F] rounded-2xl border border-[#2D5533] space-y-2 text-xs">
              <div className="flex items-center gap-2 text-white font-medium">
                <Phone className="w-3.5 h-3.5 text-[#58D68D]" />
                <span>Hotline / WhatsApp:</span>
              </div>
              <a
                href={`https://wa.me/${OFFICIAL_WHATSAPP_PHONE.replace('+', '')}?text=Hello%20Akhi%20Herbal%20Care`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-sm font-bold text-[#A7F3D0] hover:underline block"
              >
                {OFFICIAL_DISPLAY_PHONE}
              </a>
              <p className="text-[11px] text-[#93B898] leading-tight">
                Open 7 days a week: 9:00 AM – 10:00 PM for custom hair care routines and orders.
              </p>
            </div>
            
            <a
              href={OFFICIAL_FACEBOOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-[#60A5FA] hover:underline pt-1"
            >
              <Facebook className="w-3.5 h-3.5" />
              <span>Facebook.com/profile.php?id=61589214670847</span>
            </a>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#203D24] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#84A588]">
          <p>© {new Date().getFullYear()} Akhi Herbal Care (আঁখি হারবাল কেয়ার). All rights reserved.</p>
          <div className="flex items-center gap-1 text-[11px]">
            <span>Crafted with</span>
            <Heart className="w-3 h-3 text-[#E02424] fill-current" />
            <span>using 100% chemical-free organic botanicals</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
