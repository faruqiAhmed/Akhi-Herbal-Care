import React, { useState } from 'react';
import { 
  Sparkles, 
  Droplet, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  ShoppingBag, 
  ArrowRight,
  ShieldCheck,
  Zap,
  Info
} from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { Product } from '../types';

interface UsageRoutineSectionProps {
  onAddToCart: (product: Product, quantity?: number) => void;
  onBuyNow: (product: Product, quantity?: number) => void;
  onViewProduct?: (product: Product) => void;
}

export const UsageRoutineSection: React.FC<UsageRoutineSectionProps> = ({
  onAddToCart,
  onBuyNow,
  onViewProduct
}) => {
  const [activeTab, setActiveTab] = useState<'oil' | 'pack' | 'routine'>('oil');

  const oilProduct = PRODUCTS.find((p) => p.id === 'akhi-apaa-special-hair-oil-200ml') || PRODUCTS[0];
  const packProduct = PRODUCTS.find((p) => p.id === 'akhi-apaa-hair-pack-200g') || PRODUCTS[1] || PRODUCTS[0];
  const comboProduct = PRODUCTS.find((p) => p.id === 'akhi-apaa-super-combo') || PRODUCTS[2] || PRODUCTS[0];

  return (
    <section id="usage-routine" className="py-16 sm:py-20 bg-[#F7FAF7] border-t border-b border-[#E3EBE2] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E5F2E7] text-[#1E5D2A] text-xs font-bold tracking-wide uppercase mb-3 border border-[#CDE5D1]">
            <Sparkles className="w-3.5 h-3.5 text-[#2E7D32]" />
            <span>ব্যবহারের নির্দেশিকা ও সাপ্তাহিক রুটিন</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif-brand font-bold text-[#143B1A] tracking-tight mb-3">
            How to Use & Hair Regrowth Routine
          </h2>
          <p className="text-sm sm:text-base text-[#46634C] leading-relaxed">
            দ্রুত চুল পড়া বন্ধ এবং দৃশ্যমান নতুন চুল (Baby Hair) গজাতে আঁখি আপার পরীক্ষিত প্রাকৃতিক ব্যবহারের নিয়মাবলী
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex p-1.5 bg-[#E8EFE8] rounded-2xl border border-[#D5E1D5] shadow-2xs">
            <button
              id="usage-tab-oil"
              type="button"
              onClick={() => setActiveTab('oil')}
              className={`flex items-center gap-2 px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'oil'
                  ? 'bg-[#184622] text-white shadow-sm'
                  : 'text-[#3E5C42] hover:text-[#184622] hover:bg-white/60'
              }`}
            >
              <Droplet className="w-4 h-4" />
              <span>হেয়ার অয়েল ব্যবহারের নিয়ম</span>
            </button>
            <button
              id="usage-tab-pack"
              type="button"
              onClick={() => setActiveTab('pack')}
              className={`flex items-center gap-2 px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'pack'
                  ? 'bg-[#184622] text-white shadow-sm'
                  : 'text-[#3E5C42] hover:text-[#184622] hover:bg-white/60'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>হেয়ার প্যাক ব্যবহারের নিয়ম</span>
            </button>
            <button
              id="usage-tab-routine"
              type="button"
              onClick={() => setActiveTab('routine')}
              className={`flex items-center gap-2 px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'routine'
                  ? 'bg-[#184622] text-white shadow-sm'
                  : 'text-[#3E5C42] hover:text-[#184622] hover:bg-white/60'
              }`}
            >
              <Calendar className="w-4 h-4" />
              <span>সাপ্তাহিক রুটিন শিডিউল</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Hair Oil Usage */}
        {activeTab === 'oil' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-in fade-in duration-300">
            
            {/* Left: 4 Step Cards */}
            <div className="lg:col-span-7 space-y-4">
              <div className="bg-white p-5 sm:p-6 rounded-2xl border border-[#E2EBE2] shadow-xs flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#E8F5EB] text-[#184E24] font-bold text-base flex items-center justify-center shrink-0 border border-[#CEE7D2]">
                  ১
                </div>
                <div>
                  <h3 className="font-bold text-base text-gray-900 mb-1 flex items-center gap-2">
                    <span>বোতল ঝাঁকিয়ে নিন ও তেল কুসুম গরম করুন</span>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-md">Step 1</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                    ব্যবহারের আগে বোতলটি ভালো করে ঝাঁকিয়ে নিন যাতে প্রাকৃতিক ঔষধি নির্যাস ভালোভাবে মিশে যায়। প্রয়োজনমতো তেল নিয়ে কুসুম গরম পানিতে বাটি রেখে হালকা গরম করলে সবচেয়ে ভালো ফল পাওয়া যায়।
                  </p>
                </div>
              </div>

              <div className="bg-white p-5 sm:p-6 rounded-2xl border border-[#E2EBE2] shadow-xs flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#E8F5EB] text-[#184E24] font-bold text-base flex items-center justify-center shrink-0 border border-[#CEE7D2]">
                  ২
                </div>
                <div>
                  <h3 className="font-bold text-base text-gray-900 mb-1 flex items-center gap-2">
                    <span>আঙুলের ডগা দিয়ে স্ক্যাল্পে ১০-১৫ মিনিট ম্যাসাজ</span>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-md">Step 2</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                    চুলের সিঁথি কেটে চুলের গোড়ায় তেল লাগান। নখ দিয়ে নয়, আঙুলের নরম অংশ দিয়ে আলতোভাবে সার্কুলার মোশনে ম্যাসাজ করুন। এতে মাথার ত্বকে রক্ত সঞ্চালন বাড়ে ও চুলের গোড়া পুষ্টি পায়।
                  </p>
                </div>
              </div>

              <div className="bg-white p-5 sm:p-6 rounded-2xl border border-[#E2EBE2] shadow-xs flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#E8F5EB] text-[#184E24] font-bold text-base flex items-center justify-center shrink-0 border border-[#CEE7D2]">
                  ৩
                </div>
                <div>
                  <h3 className="font-bold text-base text-gray-900 mb-1 flex items-center gap-2">
                    <span>সারারাত রাখুন অথবা গোসলের ২ ঘণ্টা আগে লাগান</span>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-md">Step 3</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                    সর্বোচ্চ কার্যকারিতার জন্য রাতে ঘুমানোর আগে তেল লাগিয়ে সকালে ধুয়ে ফেলা উত্তম। সময় স্বল্পতা থাকলে গোসল করার অন্তত ২ ঘণ্টা আগে ভালো করে তেল মেখে রাখুন।
                  </p>
                </div>
              </div>

              <div className="bg-white p-5 sm:p-6 rounded-2xl border border-[#E2EBE2] shadow-xs flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#E8F5EB] text-[#184E24] font-bold text-base flex items-center justify-center shrink-0 border border-[#CEE7D2]">
                  ৪
                </div>
                <div>
                  <h3 className="font-bold text-base text-gray-900 mb-1 flex items-center gap-2">
                    <span>মাইল্ড শ্যাম্পু দিয়ে ধুয়ে প্রাকৃতিকভাবে শুকান</span>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-md">Step 4</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                    যেকোনো মাইল্ড বা হারবাল শ্যাম্পু দিয়ে পরিষ্কার পানিতে মাথা ধুয়ে নিন। ভেজা চুল জোরে তোয়ালে দিয়ে না ঘষে প্রাকৃতিকভাবে ফ্যানের বাতাসে শুকাতে দিন।
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Product Highlight Card */}
            <div className="lg:col-span-5 bg-white p-6 sm:p-7 rounded-3xl border border-[#D7E4D7] shadow-lg space-y-5">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100 border border-gray-200">
                <img
                  src={oilProduct.images[0] || '/akhi_apaa_oil.jpg'}
                  alt={oilProduct.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 bg-[#184E24] text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-sm">
                  বেস্টসেলার তেল
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-[#1E5D2A] uppercase tracking-wider">২০০ মিলি অরিজিনাল প্যাক</span>
                  <span className="text-xs font-extrabold text-[#144D20]">৳{oilProduct.priceBDT}</span>
                </div>
                <h4 className="font-serif-brand font-bold text-lg text-gray-900 mb-2">{oilProduct.bengaliName}</h4>
                <p className="text-xs text-gray-600 leading-relaxed">
                  ২৮টি খাঁটি ঔষধি ভেষজ ও কোল্ড প্রেসড তেলের সংমিশ্রণে তৈরি। মাত্র ১৪ দিনে চুল পড়া উল্লেখযোগ্যভাবে কমায়।
                </p>
              </div>

              <div className="pt-3 border-t border-gray-150 flex gap-2">
                <button
                  type="button"
                  onClick={() => onAddToCart(oilProduct, 1)}
                  className="flex-1 py-2.5 px-3 rounded-xl bg-[#E8F5EB] hover:bg-[#D4EED8] text-[#164E24] font-bold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>কার্টে যোগ করুন</span>
                </button>
                <button
                  type="button"
                  onClick={() => onBuyNow(oilProduct, 1)}
                  className="flex-1 py-2.5 px-3 rounded-xl bg-[#164E24] hover:bg-[#103A1B] text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
                >
                  <span>এখনই অর্ডার</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>
        )}

        {/* Tab 2: Hair Pack Usage */}
        {activeTab === 'pack' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-in fade-in duration-300">
            
            {/* Left: 4 Step Cards for Pack */}
            <div className="lg:col-span-7 space-y-4">
              <div className="bg-white p-5 sm:p-6 rounded-2xl border border-[#E2EBE2] shadow-xs flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#E8F5EB] text-[#184E24] font-bold text-base flex items-center justify-center shrink-0 border border-[#CEE7D2]">
                  ১
                </div>
                <div>
                  <h3 className="font-bold text-base text-gray-900 mb-1 flex items-center gap-2">
                    <span>পেস্ট তৈরি করুন (টক দই বা পানির সাথে)</span>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-md">Step 1</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                    চুলের ঘনত্ব অনুযায়ী ২-৩ চামচ প্যাক পাউডার বাটিতে নিন। শুষ্ক চুলের জন্য টক দই বা কাঁচা দুধ এবং স্বাভাবিক চুলের জন্য কুসুম গরম পানি মিশিয়ে মসৃণ ঘন পেস্ট তৈরি করুন।
                  </p>
                </div>
              </div>

              <div className="bg-white p-5 sm:p-6 rounded-2xl border border-[#E2EBE2] shadow-xs flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#E8F5EB] text-[#184E24] font-bold text-base flex items-center justify-center shrink-0 border border-[#CEE7D2]">
                  ২
                </div>
                <div>
                  <h3 className="font-bold text-base text-gray-900 mb-1 flex items-center gap-2">
                    <span>স্ক্যাল্প থেকে চুলের শেষ প্রান্ত পর্যন্ত লাগান</span>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-md">Step 2</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                    চুল ভালো করে আঁচড়ে সিঁথি কেটে স্ক্যাল্পে আলতো করে প্যাকটি লেপে দিন এবং চুলের আগা পর্যন্ত সমানভাবে ছড়িয়ে দিন।
                  </p>
                </div>
              </div>

              <div className="bg-white p-5 sm:p-6 rounded-2xl border border-[#E2EBE2] shadow-xs flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#E8F5EB] text-[#184E24] font-bold text-base flex items-center justify-center shrink-0 border border-[#CEE7D2]">
                  ৩
                </div>
                <div>
                  <h3 className="font-bold text-base text-gray-900 mb-1 flex items-center gap-2">
                    <span>৩০ থেকে ৪৫ মিনিট অপেক্ষা করুন</span>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-md">Step 3</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                    প্যাকটি মেখে ৩০-৪৫ মিনিট রেখে দিন যাতে ভেষজ শিকড় ও পুষ্টি উপাদান স্ক্যাল্পের ভেতর প্রবেশ করতে পারে। পুরোপুরি শক্ত হয়ে শুকিয়ে যাওয়ার আগেই ওয়াশ করা উত্তম।
                  </p>
                </div>
              </div>

              <div className="bg-white p-5 sm:p-6 rounded-2xl border border-[#E2EBE2] shadow-xs flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#E8F5EB] text-[#184E24] font-bold text-base flex items-center justify-center shrink-0 border border-[#CEE7D2]">
                  ৪
                </div>
                <div>
                  <h3 className="font-bold text-base text-gray-900 mb-1 flex items-center gap-2">
                    <span>পরিষ্কার পানিতে ধুয়ে ফেলুন (সপ্তাহে ১-২ বার)</span>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-md">Step 4</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                    প্রথমে হালকা পানি দিয়ে প্যাকটি ভিজিয়ে নরম করে নিন, তারপর প্রচুর পানি দিয়ে ধুয়ে ফেলুন। সপ্তাহে ১ বা ২ দিন ব্যবহারেই চুলের খুশকি ও রুক্ষতা দূর হয়।
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Pack Highlight Card */}
            <div className="lg:col-span-5 bg-white p-6 sm:p-7 rounded-3xl border border-[#D7E4D7] shadow-lg space-y-5">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100 border border-gray-200">
                <img
                  src={packProduct.images[0] || '/akhi_apaa_pack.jpg'}
                  alt={packProduct.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 bg-[#184E24] text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-sm">
                  ন্যাচারাল ভেষজ প্যাক
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-[#1E5D2A] uppercase tracking-wider">২০০ গ্রাম স্পেশাল প্যাক</span>
                  <span className="text-xs font-extrabold text-[#144D20]">৳{packProduct.priceBDT}</span>
                </div>
                <h4 className="font-serif-brand font-bold text-lg text-gray-900 mb-2">{packProduct.bengaliName}</h4>
                <p className="text-xs text-gray-600 leading-relaxed">
                  আমলকী, শিকাকাই, মেথি ও রিঠার সমন্বয়ে তৈরি। মাথার ত্বকের খুশকি দূর করে চুলকে সিল্কি ও উজ্জ্বল করে।
                </p>
              </div>

              <div className="pt-3 border-t border-gray-150 flex gap-2">
                <button
                  type="button"
                  onClick={() => onAddToCart(packProduct, 1)}
                  className="flex-1 py-2.5 px-3 rounded-xl bg-[#E8F5EB] hover:bg-[#D4EED8] text-[#164E24] font-bold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>কার্টে যোগ করুন</span>
                </button>
                <button
                  type="button"
                  onClick={() => onBuyNow(packProduct, 1)}
                  className="flex-1 py-2.5 px-3 rounded-xl bg-[#164E24] hover:bg-[#103A1B] text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
                >
                  <span>এখনই অর্ডার</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>
        )}

        {/* Tab 3: Weekly Routine Schedule */}
        {activeTab === 'routine' && (
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#D7E4D7] shadow-sm animate-in fade-in duration-300 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-150">
              <div>
                <h3 className="font-serif-brand font-bold text-xl text-gray-900">
                  সাপ্তাহিক রেজাল্ট-বুস্টিং রুটিন (Weekly Regrowth Plan)
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 mt-1">
                  তেল ও প্যাক একসাথে ব্যবহারের এই রুটিনটি মেনে চললে দ্রুত দৃশ্যমান পরিবর্তন লক্ষ্য করা যায়
                </p>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-[#1E5D2A] bg-[#E8F5EB] px-3.5 py-1.5 rounded-full self-start sm:self-auto">
                <Clock className="w-4 h-4" />
                <span>১৪-৩০ দিনের কোর্স</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-3">
              {[
                { day: 'রবিবার', task: 'তেল ম্যাসাজ', sub: 'রাতে ঘুমানোর আগে ১০ মিনিট ম্যাসাজ', color: 'bg-emerald-50 border-emerald-200 text-emerald-900' },
                { day: 'সোমবার', task: 'মাইল্ড ওয়াশ', sub: 'সকালে হালকা শ্যাম্পু দিয়ে ধুয়ে ফেলুন', color: 'bg-blue-50 border-blue-200 text-blue-900' },
                { day: 'মঙ্গলবার', task: 'স্ক্যাল্প রেস্ট', sub: 'প্রাকৃতিক বাতাসে চুল শুকানো ও বিশ্রাম', color: 'bg-gray-50 border-gray-200 text-gray-700' },
                { day: 'বুধবার', task: 'তেল ম্যাসাজ', sub: 'চুলের গোড়ায় আলতো হাতে অয়েল ম্যাসাজ', color: 'bg-emerald-50 border-emerald-200 text-emerald-900' },
                { day: 'বৃহস্পতিবার', task: 'নরমাল ওয়াশ', sub: 'পরিষ্কার পানি দিয়ে ওয়াশ করুন', color: 'bg-blue-50 border-blue-200 text-blue-900' },
                { day: 'শুক্রবার', task: 'হেয়ার প্যাক ডে', sub: '৩০-৪০ মিনিট প্যাক লাগিয়ে ডিপ ওয়াশ', color: 'bg-amber-50 border-amber-200 text-amber-900' },
                { day: 'শনিবার', task: 'সিল্কি লুক', sub: 'সপ্তাহের সেরা সিল্কি ও মসৃণ চুল উপভোগ করুন', color: 'bg-purple-50 border-purple-200 text-purple-900' },
              ].map((item, index) => (
                <div key={index} className={`p-3.5 rounded-2xl border ${item.color} flex flex-col justify-between h-full`}>
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider opacity-75">{item.day}</span>
                    <h4 className="font-bold text-sm mt-0.5 mb-1">{item.task}</h4>
                  </div>
                  <p className="text-[11px] leading-relaxed opacity-90">{item.sub}</p>
                </div>
              ))}
            </div>

            {/* Quick Pro Tips */}
            <div className="p-4 rounded-2xl bg-[#F4F9F4] border border-[#D3E5D5] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <Info className="w-5 h-5 text-[#184E24] shrink-0 mt-0.5" />
                <p className="text-xs text-gray-700 leading-relaxed">
                  <strong>বিশেষ পরামর্শ:</strong> সেরা ফলাফলের জন্য আঁখি আপার <strong>হেয়ার রিগ্রোথ কম্বো প্যাক</strong> (তেল + প্যাক) একসাথে ব্যবহার করা সবচেয়ে বেশি ফলদায়ক।
                </p>
              </div>
              <button
                type="button"
                onClick={() => onBuyNow(comboProduct, 1)}
                className="px-4 py-2 bg-[#184E24] hover:bg-[#12391A] text-white text-xs font-bold rounded-xl transition-colors shrink-0 shadow-xs flex items-center gap-1.5 cursor-pointer"
              >
                <span>কম্বো প্যাক অর্ডার করুন (৳১৫৪০)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
