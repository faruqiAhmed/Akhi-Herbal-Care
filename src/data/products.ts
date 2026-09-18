import { Product } from '../types';

export const PRODUCTS: Product[] = [
  {
    id: 'akhi-apaa-organic-hair-oil-200ml',
    name: 'Akhi Apaa Organic Hair Oil',
    bengaliName: 'আঁখি আপা অর্গানিক হেয়ার অয়েল (২০০ মি.লি.)',
    slug: 'akhi-apaa-organic-hair-oil',
    category: 'hair-oil',
    concerns: ['hair-fall', 'regrowth', 'scalp-itch'],
    tag: '১০০% হোমমেড (100% Home Made)',
    priceBDT: 850,
    originalPriceBDT: 1150,
    priceUSD: 8.50,
    rating: 4.9,
    reviewCount: 384,
    isBestSeller: true,
    inStock: true,
    stockCount: 85,
    volumeSize: '২০০ মি.লি. (200 ml)',
    shortDescription: '১০০% হোমমেড অর্গানিক হেয়ার অয়েল। ২৮টি খাঁটি ঔষধি ভেষজ ও কোল্ড প্রেসড তেলের সংমিশ্রণে তৈরি। নারী ও পুরুষ উভয়েই ব্যবহার করতে পারবেন।',
    bengaliDescription: 'চুল পড়া বন্ধ, নতুন চুল গজানো এবং চুলের গোড়া শক্ত করতে আঁখি আপার বিশেষ ভেষজ তেল। ১০০% হোমমেড ও কোনো কেমিক্যাল নেই।',
    fullDescription: 'আঁখি আপা অর্গানিক হেয়ার অয়েল সম্পূর্ণ ঘরোয়া পরিবেশে খাঁটি প্রাকৃতিক উপাদান ও ২৮টি ঔষধি গাছগাছড়া দিয়ে প্রস্তুতকৃত। নিয়মিত ব্যবহারে চুল পড়া বন্ধ হয়, স্ক্যাল্পের রক্ত সঞ্চালন বৃদ্ধি পায় এবং নতুন চুল গজাতে সাহায্য করে। বোতলের গায়ে উল্লেখিত: ১০০% হোমমেড, নারী ও পুরুষ উভয়েই ব্যবহার করা যাবে, নেট পরিমাণ: ২০০ মিলি।',
    keyIngredients: [
      { name: 'Pure Amla (আমলকী)', bengaliName: 'তাজা আমলকী', benefit: 'প্রাকৃতিক ভিটামিন-সি ও অ্যান্টিঅক্সিডেন্ট যা চুল পড়া দ্রুত রোধ করে।' },
      { name: 'Kalonji (কালোজিরা তেল)', bengaliName: 'কোল্ড প্রেসড কালোজিরা', benefit: 'চুলের ফলিকলকে পুষ্টি জুগিয়ে চুল ঘন ও মজবুত করে।' },
      { name: 'Bhringraj & Brahmi', bengaliName: 'ভৃঙ্গরাজ ও ব্রাহ্মী', benefit: 'মাথার ত্বক ঠান্ডা রাখে ও ঘুম ভালো হতে সাহায্য করে।' },
      { name: 'Coconut & Castor Base', bengaliName: 'খাঁটি নারিকেল ও ক্যাস্টর অয়েল', benefit: 'চুলের ডগা ফাটা রোধ করে ও চুলের স্বাভাবিক আর্দ্রতা ধরে রাখে।' }
    ],
    usageInstructions: [
      'ব্যবহারের আগে বোতলটি ভালো করে ঝাঁকিয়ে নিন।',
      'প্রয়োজনমতো তেল হাতের তালুতে নিয়ে চুলের গোড়ায় আলতোভাবে ১০-১৫ মিনিট ম্যাসাজ করুন।',
      'সপ্তাহে অন্তত ৩-৪ দিন রাতে ঘুমানোর আগে ব্যবহার করুন অথবা গোসলের অন্তত ২ ঘণ্টা আগে লাগান।',
      'নারী ও পুরুষ উভয়েই নিশ্চিন্তে নিয়মিত ব্যবহার করতে পারবেন।'
    ],
    benefits: [
      'মাত্র ১৪ দিনে চুল পড়া উল্লেখযোগ্যভাবে কমায়',
      'নতুন চুল (Baby Hair) গজাতে উদ্দীপনা জোগায়',
      'খুশকি ও মাথার ত্বকের চুলকানি দূর করে',
      '১০০% প্রাকৃতিক ও রাসায়নিক প্রিজারভেটিভ মুক্ত'
    ],
    images: [
      '/akhi_apaa_oil.jpg',
      '/akhi_oil_flower.jpg'
    ]
  },
  {
    id: 'akhi-apaa-natural-hair-pack-100g',
    name: 'Akhi Apaa Natural Herbal Hair Pack',
    bengaliName: 'আঁখি আপা ন্যাচারাল হারবাল হেয়ার প্যাক (১০০ গ্রাম)',
    slug: 'akhi-apaa-natural-hair-pack',
    category: 'hair-pack',
    concerns: ['hair-fall', 'regrowth', 'glow-softness', 'dandruff'],
    tag: '১০০% হোমমেড (100% Home Made)',
    priceBDT: 650,
    originalPriceBDT: 850,
    priceUSD: 6.50,
    rating: 4.8,
    reviewCount: 295,
    isBestSeller: true,
    inStock: true,
    stockCount: 90,
    volumeSize: '১০০ গ্রাম (100 g Jar)',
    shortDescription: '১০০% খাঁটি আমলকী, মেথি, জবা ও বিরল ভেষজ গুঁড়োর সংমিশ্রণে তৈরি হোমমেড হেয়ার প্যাক। চুলের ডিপ কন্ডিশনিং ও স্ক্যাল্প ডিটক্সের জন্য সেরা।',
    bengaliDescription: 'চুলের উজ্জ্বলতা ফিরিয়ে আনতে, গোড়া মজবুত করতে এবং খুশকি চিরতরে দূর করতে আঁখি আপার স্পেশাল হারবাল হেয়ার প্যাক।',
    fullDescription: 'আঁখি আপা ন্যাচারাল হারবাল হেয়ার প্যাক সম্পূর্ণ প্রাকৃতিক ও খাঁটি উপাদানে তৈরি। আমলকী, মেথি, জবা ফুল, রিঠা ও শিকাকাইয়ের মতো পুষ্টিকর উপাদানে সমৃদ্ধ যা চুলে প্রাকৃতিক প্রোটিন স্পা এর মতো কোমলতা ও বাউন্স প্রদান করে। জারের গায়ে উল্লেখিত: ১০০% হোমমেড, নেট পরিমাণ: ১০০ গ্রাম।',
    keyIngredients: [
      { name: 'Sun-dried Methi (মেথি গুঁড়া)', bengaliName: 'অর্গানিক মেথি', benefit: 'প্রাকৃতিক প্রোটিন যা চুল সিল্কি, মসৃণ ও উজ্জ্বল করে।' },
      { name: 'Red Hibiscus (জবা ফুলের গুঁড়া)', bengaliName: 'লাল জবা ফুল', benefit: 'চুলের রঙ গাঢ় রাখে এবং চুল পাকা রোধ করতে সহায়তা করে।' },
      { name: 'Amla & Shikakai', bengaliName: 'আমলকী ও শিকাকাই', benefit: 'স্ক্যাল্পকে পরিষ্কার করে ও খুশকি ব্যাকটেরিয়া দূর করে।' },
      { name: 'Pure Neem Powder', bengaliName: 'খাঁটি নিম গুঁড়া', benefit: 'স্ক্যাল্পের যেকোনো চুলকানি ও ইনফেকশন দূর করে।' }
    ],
    usageInstructions: [
      'পরিমাণমতো (২-৩ চা চামচ) হেয়ার প্যাক একটি বাটিতে নিন।',
      'টকদই, চায়ের লিকার অথবা কুসুম গরম পানি দিয়ে পেস্ট বানিয়ে ১৫ মিনিট রেখে দিন।',
      'চুলের গোড়া থেকে আগা পর্যন্ত লাগিয়ে ৩০-৪০ মিনিট পর শুধু পানি দিয়ে ভালো করে ধুয়ে ফেলুন।',
      'সপ্তাহে ১-২ বার ব্যবহার করলে সেরা ফলাফল পাবেন।'
    ],
    benefits: [
      'প্রথম ব্যবহারেই চুল নরম, সিল্কি ও উজ্জ্বল করে',
      'মাথার ত্বকের খুশকি ও অতিরিক্ত তেলতেলে ভাব দূর করে',
      'চুলের গোড়াকে ভেতর থেকে শক্ত ও মজবুত করে',
      'কোনো কৃত্রিম পারফিউম বা ক্ষতিকারক রং নেই'
    ],
    images: [
      '/akhi_apaa_pack.jpg'
    ]
  },
  {
    id: 'akhi-apaa-super-combo',
    name: 'Akhi Apaa Hair Regrowth Super Combo',
    bengaliName: 'আঁখি আপা সুপার কম্বো (অয়েল ২০০ মিলি + প্যাক ১০০ গ্রাম)',
    slug: 'akhi-apaa-super-combo',
    category: 'combos',
    concerns: ['hair-fall', 'regrowth', 'dandruff'],
    tag: 'সেরা অফার (Best Value Offer)',
    priceBDT: 1390,
    originalPriceBDT: 1950,
    priceUSD: 13.90,
    rating: 5.0,
    reviewCount: 620,
    isBestSeller: true,
    inStock: true,
    stockCount: 50,
    volumeSize: 'অয়েল ২০০ মিলি + প্যাক ১০০ গ্রাম + নিম চিরুনি',
    shortDescription: 'আঁখি আপার সম্পূর্ণ হেয়ার কেয়ার প্যাকেজ: অর্গানিক হেয়ার অয়েল (২০০ মিলি) + ন্যাচারাল হারবাল হেয়ার প্যাক (১০০ গ্রাম) এবং সাথে ফ্রি প্রিমিয়াম নিম কাঠের চিরুনি।',
    bengaliDescription: 'একসাথে অয়েল ও প্যাক ব্যবহারে চুল পড়া দ্রুত বন্ধ হয় ও নতুন চুল গজানোর প্রক্রিয়া বহুগুণ দ্রুত হয়। সেভ করুন ৫৬০ টাকা!',
    fullDescription: 'আমাদের ফেসবুক পেজের সবচেয়ে বেশি বিক্রিত ও জনপ্রিয় কম্বো প্যাক। চুলের তেল ও প্যাক একসাথে ব্যবহার করলে চুলের গোড়ায় প্রয়োজনীয় তেল ও প্রোটিন উভয় পুষ্টিই সমানভাবে নিশ্চিত হয়। সাথে উপহার হিসেবে পাবেন খাঁটি নিম কাঠের চিরুনি যা চুলের স্ট্যাটিক ও ড্যামেজ প্রতিরোধ করে।',
    keyIngredients: [
      { name: 'Akhi Apaa Organic Oil (200ml)', bengaliName: '২০০ মিলি অর্গানিক হেয়ার অয়েল', benefit: '২৮টি খাঁটি ঔষধি ভেষজ সংমিশ্রণ যা চুলের গোড়ায় পুষ্টি জোগায়।' },
      { name: 'Akhi Apaa Herbal Pack (100g)', bengaliName: '১০০ গ্রাম ন্যাচারাল হেয়ার প্যাক', benefit: 'আমলকী ও মেথির প্যাক যা ডিপ কন্ডিশনিং ও খুশকি দূর করে।' },
      { name: 'Handcrafted Neem Comb (Free)', bengaliName: 'খাঁটি নিম কাঠের চিরুনি (ফ্রি)', benefit: 'মাথার ত্বকে রক্ত সঞ্চালন বাড়ায় ও চুল ছেঁড়া বন্ধ করে।' }
    ],
    usageInstructions: [
      '১ম দিন রাতে: আঁখি আপা অর্গানিক হেয়ার অয়েল চুলের গোড়ায় ভালো করে ম্যাসাজ করুন এবং নিম কাঠের চিরুনি দিয়ে আলতোভাবে আঁচড়ান।',
      '২য় দিন সকালে: আঁখি আপা হারবাল প্যাক পেস্ট করে ৩০-৪০ মিনিট রেখে সাধারণ পানি দিয়ে ধুয়ে ফেলুন।',
      'এই নিয়মে নিয়মিত ব্যবহার করলে চুল পড়ার স্থায়ী সমাধান মিলবে।'
    ],
    benefits: [
      'আলাদা কেনার চেয়ে সরাসরি ৫৬০ টাকা সাশ্রয়',
      'সম্পূর্ণ প্রাকৃতিক সমাধান—নারী ও পুরুষ উভয়ের জন্য উপযুক্ত',
      '১০০% ক্যাশ অন ডেলিভারি সুবিধা সারাদেশে',
      'সাথে পাচ্ছেন একদম ফ্রি খাঁটি নিম কাঠের চিরুনি'
    ],
    images: [
      '/akhi_combo_pack.jpg',
      '/akhi_apaa_oil.jpg',
      '/akhi_apaa_pack.jpg'
    ]
  }
];

export const CATEGORIES = [
  { id: 'all', label: 'All Products', bengali: 'সব প্রোডাক্ট' },
  { id: 'hair-oil', label: 'Organic Hair Oil', bengali: 'অর্গানিক হেয়ার অয়েল (২০০ মিলি)' },
  { id: 'hair-pack', label: 'Herbal Hair Pack', bengali: 'হারবাল হেয়ার প্যাক (১০০ গ্রাম)' },
  { id: 'combos', label: 'Regrowth Super Combo', bengali: 'সুপার কম্বো (অয়েল + প্যাক)' }
] as const;

export const CONCERNS = [
  { id: 'all', label: 'All Needs', bengali: 'সকল সমস্যা' },
  { id: 'hair-fall', label: 'Hair Fall Control', bengali: 'চুল পড়া বন্ধ' },
  { id: 'regrowth', label: 'New Hair Regrowth', bengali: 'নতুন চুল গজানো' },
  { id: 'dandruff', label: 'Dandruff & Itch Relief', bengali: 'খুশকি ও চুলকানি' },
  { id: 'glow-softness', label: 'Softness & Shine', bengali: 'সিল্কি ও কোমল চুল' }
] as const;
