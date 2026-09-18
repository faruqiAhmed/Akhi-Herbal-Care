import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  CheckCircle2, 
  Phone, 
  User, 
  MapPin, 
  Edit3, 
  Tag, 
  Lock, 
  Printer, 
  Sparkles,
  Check
} from 'lucide-react';
import { CartItem, CheckoutFormData, PlacedOrder, UserProfile } from '../types';
import { OFFICIAL_WHATSAPP_PHONE, OFFICIAL_DISPLAY_PHONE } from '../data/ugcFeeds';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  currency: 'BDT' | 'USD';
  appliedPromo?: { code: string; discountRate: number };
  onOrderCompleted: (order: PlacedOrder) => void;
  currentUser?: UserProfile | null;
  onOpenAuth?: () => void;
}

interface SavedAddressPreset {
  id: string;
  name: string;
  fullName: string;
  phoneNumber: string;
  address: string;
  zone: 'inside_dhaka' | 'outside_dhaka';
}

const SAVED_ADDRESSES: SavedAddressPreset[] = [
  {
    id: 'home',
    name: 'Home (ঢাকা)',
    fullName: 'মো. ওমর ফারুক',
    phoneNumber: '01842078717',
    address: 'বাড়ি নং ৪২, রোড নং ৭, সেক্টর ৪, উত্তরা',
    zone: 'inside_dhaka'
  },
  {
    id: 'office',
    name: 'Office (ঢাকা)',
    fullName: 'মো. ওমর ফারুক',
    phoneNumber: '01842078717',
    address: 'লেভেল ৫, হাউজ ১৮, ব্লক ডি, বনানী',
    zone: 'inside_dhaka'
  }
];

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  currency: _currency,
  appliedPromo: initialPromo,
  onOrderCompleted,
  currentUser,
  onOpenAuth
}) => {
  const [selectedAddressId, setSelectedAddressId] = useState<string>('home');
  const [fullName, setFullName] = useState<string>(currentUser?.fullName || 'মো. ওমর ফারুক');
  const [phoneNumber, setPhoneNumber] = useState<string>(currentUser?.phoneNumber || '01842078717');
  const [address, setAddress] = useState<string>(currentUser?.address || 'বাড়ি নং ৪২, রোড নং ৭, সেক্টর ৪, উত্তরা');
  const [zone, setZone] = useState<'inside_dhaka' | 'outside_dhaka'>(currentUser?.zone || 'inside_dhaka');
  const [paymentMethod, setPaymentMethod] = useState<'bkash' | 'nagad' | 'card' | 'cod'>('bkash');

  // React to currentUser changes
  React.useEffect(() => {
    if (currentUser) {
      if (currentUser.fullName) setFullName(currentUser.fullName);
      if (currentUser.phoneNumber) setPhoneNumber(currentUser.phoneNumber);
      if (currentUser.address) setAddress(currentUser.address);
      if (currentUser.zone) setZone(currentUser.zone);
    }
  }, [currentUser]);
  
  // Coupon code
  const [couponCode, setCouponCode] = useState<string>('');
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discount: number } | null>(
    initialPromo ? { code: initialPromo.code, discount: 50 } : null
  );
  const [couponError, setCouponError] = useState<string>('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<PlacedOrder | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!isOpen) return null;

  // Calculate Subtotal: if cartItems is empty, fallback to the item shown in reference
  const fallbackItem = {
    name: 'খাঁটি সরিষার তেল (১ লিটার)',
    sub: '× 1 (১ লিটার বোতল)',
    price: 320,
    image: '/akhi_hero_panoramic.jpg'
  };

  const hasItems = cartItems.length > 0;
  const subtotalBDT = hasItems
    ? cartItems.reduce((acc, item) => acc + item.product.priceBDT * item.quantity, 0)
    : fallbackItem.price;

  // Delivery Charge
  const deliveryCharge = zone === 'inside_dhaka' ? 60 : 120;

  // Discounts
  const couponDiscount = appliedCoupon ? appliedCoupon.discount : 0;
  const totalDiscount = couponDiscount;

  // Total payable
  const totalBDT = Math.max(0, subtotalBDT + deliveryCharge - totalDiscount);

  // Loyalty points earned on this order (~5% of total, rounded)
  const pointsEarned = Math.round(totalBDT * 0.05) || 19;

  // Handle saved address switch
  const handleSelectAddressPreset = (preset: SavedAddressPreset) => {
    setSelectedAddressId(preset.id);
    setFullName(preset.fullName);
    setPhoneNumber(preset.phoneNumber);
    setAddress(preset.address);
    setZone(preset.zone);
  };

  // Handle coupon apply
  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    const code = couponCode.trim().toUpperCase();
    if (!code) return;

    if (code === 'DESHI10' || code === 'HERBAL10') {
      const discount = Math.round(subtotalBDT * 0.1);
      setAppliedCoupon({ code, discount });
      setCouponCode('');
    } else if (code === 'FREESHIP') {
      setAppliedCoupon({ code, discount: deliveryCharge });
      setCouponCode('');
    } else {
      setCouponError('অবৈধ কুপন কোড। অনুগ্রহ করে DESHI10 বা FREESHIP ব্যবহার করুন।');
    }
  };

  const validate = () => {
    const err: Record<string, string> = {};
    if (!fullName.trim()) err.fullName = 'আপনার পূর্ণ নাম লিখুন';
    if (!phoneNumber.trim()) {
      err.phoneNumber = 'সচল মোবাইল নম্বর প্রদান করুন';
    } else if (phoneNumber.trim().length < 10) {
      err.phoneNumber = 'সঠিক মোবাইল নম্বর লিখুন (যেমন: 01842078717)';
    }
    if (!address.trim()) err.address = 'সম্পূর্ণ ঠিকানা লিখুন';
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      const orderId = `AHC-${Math.floor(10000 + Math.random() * 90000)}`;
      const formData: CheckoutFormData = {
        fullName,
        phoneNumber,
        alternatePhone: '',
        address,
        district: zone === 'inside_dhaka' ? 'Dhaka' : 'Outside Dhaka',
        zone,
        paymentMethod,
        orderNotes: ''
      };

      const newOrder: PlacedOrder = {
        orderId,
        createdAt: new Date().toLocaleDateString('bn-BD', {
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        }),
        items: [...cartItems],
        subtotal: subtotalBDT,
        deliveryFee: deliveryCharge,
        discount: totalDiscount,
        totalAmount: totalBDT,
        customer: formData,
        status: 'Confirmed',
        estimatedDelivery: zone === 'inside_dhaka' ? '২৪ ঘণ্টার মধ্যে' : '২-৩ কার্যদিবস'
      };

      setCompletedOrder(newOrder);
      setIsSubmitting(false);
      onOrderCompleted(newOrder);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-gray-200 overflow-hidden my-auto max-h-[96vh] flex flex-col font-bengali">
        
        {/* Modal Top Header (Exact Match to Screenshot) */}
        <div className="p-4 sm:p-5 border-b border-gray-200 flex items-center justify-between bg-white shrink-0">
          <div className="flex items-center gap-3">
            {/* DF Avatar Circle */}
            <div className="w-10 h-10 rounded-full bg-[#12361B] text-white flex items-center justify-center font-bold text-sm tracking-wide shrink-0 shadow-xs">
              DF
            </div>
            <div>
              <h2 className="font-bold text-base sm:text-lg text-gray-900 leading-snug">
                চেকআউট ও ডেলিভারি তথ্য
              </h2>
              <p className="text-xs text-gray-500">
                নিরাপদ ও দ্রুত হোম ডেলিভারি কনফার্মেশন
              </p>
            </div>
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="p-2 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
            aria-label="Close Checkout"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body: Two Columns */}
        <div className="overflow-y-auto flex-1">
          
          {completedOrder ? (
            /* Order Placed Success Confirmation */
            <div className="p-6 sm:p-8 space-y-6 text-center max-w-lg mx-auto">
              <div className="w-16 h-16 rounded-full bg-[#E8F8EE] text-[#136A2D] flex items-center justify-center mx-auto ring-8 ring-[#E8F8EE]/60">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <h3 className="font-bold text-2xl text-gray-900">
                  অর্ডার সফলভাবে সম্পন্ন হয়েছে!
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  আপনার অর্ডারটি নিশ্চিত করা হয়েছে। খুব শীঘ্রই পণ্য আপনার ঠিকানায় পৌঁছে যাবে।
                </p>
                <div className="mt-3 inline-block bg-[#F3F4F6] border border-gray-300 px-4 py-1.5 rounded-xl text-xs font-bold text-gray-800">
                  অর্ডার আইডি: <span className="font-mono text-sm text-[#12361B]">{completedOrder.orderId}</span>
                </div>
              </div>

              <div className="bg-gray-50 rounded-2xl p-4 border border-gray-200 text-left text-xs space-y-2.5">
                <div className="flex justify-between pb-1.5 border-b border-gray-200">
                  <span className="text-gray-500">প্রাপক:</span>
                  <span className="font-bold text-gray-800">{completedOrder.customer.fullName} ({completedOrder.customer.phoneNumber})</span>
                </div>
                <div className="flex justify-between pb-1.5 border-b border-gray-200">
                  <span className="text-gray-500">ডেলিভারি ঠিকানা:</span>
                  <span className="font-medium text-gray-800 text-right max-w-[65%]">{completedOrder.customer.address}</span>
                </div>
                <div className="flex justify-between pb-1.5 border-b border-gray-200">
                  <span className="text-gray-500">পেমেন্ট মাধ্যম:</span>
                  <span className="font-bold uppercase text-[#12361B]">{completedOrder.customer.paymentMethod}</span>
                </div>
                <div className="flex justify-between text-sm font-bold pt-1 text-gray-900">
                  <span>সর্বমোট প্রদেয়:</span>
                  <span className="text-red-600 text-base">৳ {completedOrder.totalAmount}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <a
                  href={`https://wa.me/${OFFICIAL_WHATSAPP_PHONE.replace('+', '')}?text=Hello%20Akhi%20Herbal%20Care,%20I%20just%20placed%20Order%20${completedOrder.orderId}.%20Total%20amount:%20BDT%20${completedOrder.totalAmount}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-1/2 py-3 px-4 bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 shadow-xs transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  <span>হোয়াটসঅ্যাপে নিশ্চিত করুন</span>
                </a>
                <button
                  onClick={() => window.print()}
                  className="w-full sm:w-1/2 py-3 px-4 bg-white hover:bg-gray-100 border border-gray-300 text-gray-800 text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <Printer className="w-4 h-4 text-gray-600" />
                  <span>রসিদ প্রিন্ট করুন</span>
                </button>
              </div>
            </div>
          ) : (
            /* Main 2-Column Checkout Layout Matching Screenshot */
            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-0 divide-y lg:divide-y-0 lg:divide-x divide-gray-200">
              
              {/* Left Column: Customer Details, Delivery Area, Payment Method, Loyalty, Coupon */}
              <div className="lg:col-span-7 p-4 sm:p-6 space-y-4">
                
                {/* 1. Saved Address Selector */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-700 font-medium">
                      সংরক্ষিত ঠিকানা থেকে বেছে নিন:
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        const newAddress = prompt('নতুন ডেলিভারি ঠিকানা লিখুন:', address);
                        if (newAddress) setAddress(newAddress);
                      }}
                      className="text-xs text-[#0D5E24] hover:text-[#093E18] font-medium flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>এডিট / পরিচালনা</span>
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    {SAVED_ADDRESSES.map((preset) => {
                      const isSelected = selectedAddressId === preset.id;
                      return (
                        <button
                          key={preset.id}
                          type="button"
                          onClick={() => handleSelectAddressPreset(preset)}
                          className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-[#153920] text-white shadow-xs'
                              : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                          }`}
                        >
                          <MapPin className="w-3.5 h-3.5" />
                          <span>{preset.name}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 2. Full Name Input */}
                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-gray-800">
                    পূর্ণ নাম *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                      <User className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="মো. ওমর ফারুক"
                      className={`w-full pl-9 pr-3 py-2.5 bg-white rounded-xl border ${
                        errors.fullName ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-200'
                      } text-xs sm:text-sm text-gray-800 focus:outline-none focus:border-gray-400`}
                    />
                  </div>
                  {errors.fullName && <p className="text-[10px] text-red-500">{errors.fullName}</p>}
                </div>

                {/* 3. Mobile Number Input */}
                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-gray-800">
                    মোবাইল নম্বর *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                      <Phone className="w-4 h-4" />
                    </div>
                    <input
                      type="tel"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="01842078717"
                      className={`w-full pl-9 pr-3 py-2.5 bg-white rounded-xl border ${
                        errors.phoneNumber ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-200'
                      } text-xs sm:text-sm text-gray-800 focus:outline-none focus:border-gray-400`}
                    />
                  </div>
                  {errors.phoneNumber && <p className="text-[10px] text-red-500">{errors.phoneNumber}</p>}
                </div>

                {/* 4. Full Address Input */}
                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-gray-800">
                    সম্পূর্ণ ঠিকানা *
                  </label>
                  <div className="relative">
                    <div className="absolute top-3 left-3 text-gray-400 pointer-events-none">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <textarea
                      rows={2}
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="বাড়ি নং ৪২, রোড নং ৭, সেক্টর ৪, উত্তরা"
                      className={`w-full pl-9 pr-3 py-2 bg-white rounded-xl border ${
                        errors.address ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-200'
                      } text-xs sm:text-sm text-gray-800 focus:outline-none focus:border-gray-400 resize-none`}
                    />
                  </div>
                  {errors.address && <p className="text-[10px] text-red-500">{errors.address}</p>}
                </div>

                {/* 5. Delivery Area / City */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-gray-800">
                    ডেলিভারি এলাকা / শহর *
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    
                    {/* Dhaka City Card */}
                    <div
                      onClick={() => setZone('inside_dhaka')}
                      className={`p-3 rounded-xl cursor-pointer transition-all flex items-center justify-between border-2 ${
                        zone === 'inside_dhaka'
                          ? 'border-[#1E7D3A] bg-[#E8F8EE]'
                          : 'border-gray-200 bg-white hover:border-gray-300'
                      }`}
                    >
                      <div>
                        <h4 className="font-bold text-xs sm:text-sm text-gray-900 leading-tight">
                          ঢাকা শহর
                        </h4>
                        <p className="text-[11px] text-gray-500 mt-0.5">
                          ২৪ ঘণ্টায় ডেলিভারি
                        </p>
                      </div>
                      <span className="bg-[#D1F2DD] text-[#136A2D] font-bold text-xs px-2.5 py-0.5 rounded-md">
                        ৳৬০
                      </span>
                    </div>

                    {/* Outside Dhaka Card */}
                    <div
                      onClick={() => setZone('outside_dhaka')}
                      className={`p-3 rounded-xl cursor-pointer transition-all flex items-center justify-between border-2 ${
                        zone === 'outside_dhaka'
                          ? 'border-[#1E7D3A] bg-[#E8F8EE]'
                          : 'border-gray-200 bg-white hover:border-gray-300'
                      }`}
                    >
                      <div>
                        <h4 className="font-bold text-xs sm:text-sm text-gray-900 leading-tight">
                          ঢাকার বাইরে
                        </h4>
                        <p className="text-[11px] text-gray-500 mt-0.5">
                          ২-৩ দিনে হোম ডেলিভারি
                        </p>
                      </div>
                      <span className="bg-[#EBF7F0] text-[#136A2D] font-bold text-xs px-2.5 py-0.5 rounded-md">
                        ৳১২০
                      </span>
                    </div>

                  </div>
                </div>

                {/* 6. Payment Method Selector (Exact 2x2 Grid with bKash Pink border & Online badge) */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-gray-800">
                    পেমেন্ট পদ্ধতি নির্বাচন করুন *
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    
                    {/* bKash (Pink Active State from Screenshot) */}
                    <div
                      onClick={() => setPaymentMethod('bkash')}
                      className={`p-3 rounded-xl cursor-pointer transition-all flex items-start gap-2.5 border-2 ${
                        paymentMethod === 'bkash'
                          ? 'border-[#E2136E] bg-white shadow-xs'
                          : 'border-gray-200 bg-white hover:border-gray-300'
                      }`}
                    >
                      {/* Radio Circle */}
                      <div className="mt-0.5 w-4 h-4 rounded-full border-2 border-[#E2136E] flex items-center justify-center shrink-0">
                        {paymentMethod === 'bkash' && (
                          <div className="w-2 h-2 rounded-full bg-[#E2136E]" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold text-xs sm:text-sm text-gray-900 leading-tight">
                            বিকাশ
                          </span>
                          <span className="bg-[#E2136E] text-white text-[10px] font-bold px-1.5 py-0.5 rounded leading-none">
                            অনলাইন
                          </span>
                        </div>
                        <p className="text-[11px] text-gray-500 mt-0.5">
                          ইনস্ট্যান্ট পে
                        </p>
                      </div>
                    </div>

                    {/* Nagad */}
                    <div
                      onClick={() => setPaymentMethod('nagad')}
                      className={`p-3 rounded-xl cursor-pointer transition-all flex items-start gap-2.5 border ${
                        paymentMethod === 'nagad'
                          ? 'border-[#F7941D] ring-2 ring-[#F7941D]/30 bg-white'
                          : 'border-gray-200 bg-white hover:border-gray-300'
                      }`}
                    >
                      <div className={`mt-0.5 w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                        paymentMethod === 'nagad' ? 'border-[#F7941D]' : 'border-gray-300'
                      }`}>
                        {paymentMethod === 'nagad' && (
                          <div className="w-2 h-2 rounded-full bg-[#F7941D]" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="font-bold text-xs sm:text-sm text-gray-900 leading-tight block">
                          নগদ
                        </span>
                        <p className="text-[11px] text-gray-500 mt-0.5">
                          ওয়ালেট পেমেন্ট
                        </p>
                      </div>
                    </div>

                    {/* Card / Internet */}
                    <div
                      onClick={() => setPaymentMethod('card')}
                      className={`p-3 rounded-xl cursor-pointer transition-all flex items-start gap-2.5 border ${
                        paymentMethod === 'card'
                          ? 'border-[#153920] ring-2 ring-[#153920]/20 bg-white'
                          : 'border-gray-200 bg-white hover:border-gray-300'
                      }`}
                    >
                      <div className={`mt-0.5 w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                        paymentMethod === 'card' ? 'border-[#153920]' : 'border-gray-300'
                      }`}>
                        {paymentMethod === 'card' && (
                          <div className="w-2 h-2 rounded-full bg-[#153920]" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="font-bold text-xs sm:text-sm text-gray-900 leading-tight block">
                          কার্ড / ইন্টারনেট
                        </span>
                        <p className="text-[11px] text-gray-500 mt-0.5">
                          ভিসা / মাস্টারকার্ড
                        </p>
                      </div>
                    </div>

                    {/* Cash on Delivery */}
                    <div
                      onClick={() => setPaymentMethod('cod')}
                      className={`p-3 rounded-xl cursor-pointer transition-all flex items-start gap-2.5 border ${
                        paymentMethod === 'cod'
                          ? 'border-[#153920] ring-2 ring-[#153920]/20 bg-white'
                          : 'border-gray-200 bg-white hover:border-gray-300'
                      }`}
                    >
                      <div className={`mt-0.5 w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                        paymentMethod === 'cod' ? 'border-[#153920]' : 'border-gray-300'
                      }`}>
                        {paymentMethod === 'cod' && (
                          <div className="w-2 h-2 rounded-full bg-[#153920]" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="font-bold text-xs sm:text-sm text-gray-900 leading-tight block">
                          ক্যাশ অন ডেলিভারি
                        </span>
                        <p className="text-[11px] text-gray-500 mt-0.5">
                          পণ্য পেয়ে টাকা
                        </p>
                      </div>
                    </div>

                  </div>
                </div>

                {/* 7. Coupon Code Input (Exact DESHI10 বা FREESHIP placeholder) */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-gray-800">
                    কুপন বা ভাউচার কোড
                  </label>
                  <div className="flex items-center gap-2">
                    <div className="relative flex-1">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                        <Tag className="w-4 h-4" />
                      </div>
                      <input
                        type="text"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        placeholder="DESHI10 বা FREESHIP"
                        className="w-full pl-9 pr-3 py-2 bg-white rounded-xl border border-gray-200 text-xs text-gray-800 focus:outline-none focus:border-gray-400"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={handleApplyCoupon}
                      className="px-4 py-2 bg-[#232724] hover:bg-[#111311] text-white font-semibold text-xs rounded-xl transition-colors cursor-pointer shrink-0"
                    >
                      প্রয়োগ করুন
                    </button>
                  </div>
                  {couponError && (
                    <p className="text-[10px] text-red-500">{couponError}</p>
                  )}
                  {appliedCoupon && (
                    <p className="text-[10px] text-[#136A2D] flex items-center gap-1 font-semibold">
                      <Check className="w-3 h-3" /> কুপন `{appliedCoupon.code}` সফলভাবে যোগ হয়েছে! (-৳{appliedCoupon.discount})
                    </p>
                  )}
                </div>

              </div>

              {/* Right Column: Order Summary, Totals, Loyalty Banner, Action Button */}
              <div className="lg:col-span-5 p-4 sm:p-6 bg-[#FAFAF9] lg:bg-white space-y-4 flex flex-col justify-between">
                
                <div className="space-y-4">
                  
                  {/* Summary Heading */}
                  <h3 className="font-bold text-base text-gray-900 pb-2 border-b border-gray-200">
                    অর্ডার সারাংশ
                  </h3>

                  {/* Cart Items / Product row */}
                  <div className="space-y-3">
                    {hasItems ? (
                      cartItems.map((item) => (
                        <div key={item.product.id} className="flex items-center justify-between gap-3">
                          <div className="flex items-center gap-2.5 min-w-0">
                            <img
                              src={item.product.images[0] || fallbackItem.image}
                              alt={item.product.name}
                              className="w-12 h-12 rounded-xl object-cover border border-gray-200 bg-white shrink-0"
                              referrerPolicy="no-referrer"
                            />
                            <div className="min-w-0">
                              <h4 className="font-semibold text-xs sm:text-sm text-gray-900 truncate">
                                {item.product.bengaliName || item.product.name}
                              </h4>
                              <p className="text-[11px] text-gray-500">
                                × {item.quantity} {item.selectedSize ? `(${item.selectedSize})` : ''}
                              </p>
                            </div>
                          </div>
                          <span className="font-bold text-xs sm:text-sm text-gray-900 shrink-0">
                            ৳ {item.product.priceBDT * item.quantity}
                          </span>
                        </div>
                      ))
                    ) : (
                      /* Fallback item matching screenshot */
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <img
                            src={fallbackItem.image}
                            alt={fallbackItem.name}
                            className="w-12 h-12 rounded-xl object-cover border border-gray-200 bg-white shrink-0"
                            referrerPolicy="no-referrer"
                          />
                          <div className="min-w-0">
                            <h4 className="font-semibold text-xs sm:text-sm text-gray-900 truncate">
                              {fallbackItem.name}
                            </h4>
                            <p className="text-[11px] text-gray-500">
                              {fallbackItem.sub}
                            </p>
                          </div>
                        </div>
                        <span className="font-bold text-xs sm:text-sm text-gray-900 shrink-0">
                          ৳ {fallbackItem.price}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Pricing Breakdown */}
                  <div className="pt-3 border-t border-gray-200 space-y-2 text-xs">
                    <div className="flex items-center justify-between text-gray-600">
                      <span>সাবটোটাল:</span>
                      <span className="font-bold text-gray-900">৳ {subtotalBDT}</span>
                    </div>
                    <div className="flex items-center justify-between text-gray-600">
                      <span>ডেলিভারি চার্জ:</span>
                      <span className="font-bold text-gray-900">৳ {deliveryCharge}</span>
                    </div>

                    {couponDiscount > 0 && (
                      <div className="flex items-center justify-between text-[#136A2D] font-medium">
                        <span>কুপন ছাড় ({appliedCoupon?.code}):</span>
                        <span>-৳ {couponDiscount}</span>
                      </div>
                    )}
                  </div>

                  {/* Total Payable Row (Exact Match with Red Bold Price ৳ 380) */}
                  <div className="pt-2 border-t border-gray-200 flex items-center justify-between">
                    <span className="font-bold text-base text-gray-900">
                      সর্বমোট প্রদেয়:
                    </span>
                    <span className="font-extrabold text-2xl text-red-600">
                      ৳ {totalBDT}
                    </span>
                  </div>

                  {/* Loyalty Reward Callout Pill */}
                  <div className="bg-[#E8F8EE] border border-[#BDE8CA] rounded-xl p-2.5 flex items-center gap-2 text-xs text-[#136A2D] font-semibold">
                    <Sparkles className="w-4 h-4 shrink-0 text-[#22C55E]" />
                    <span>এই অর্ডারে আপনি পাচ্ছেন {pointsEarned} লয়্যালটি পয়েন্ট!</span>
                  </div>

                </div>

                {/* Submit Action & Security Assurance Note */}
                <div className="space-y-2.5 pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-4 bg-[#1B3C24] hover:bg-[#142F1B] text-white font-bold text-sm rounded-xl shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-60"
                  >
                    <ShieldCheck className="w-5 h-5 text-[#F59E0B]" />
                    <span>{isSubmitting ? 'প্রসেস করা হচ্ছে...' : 'পেমেন্ট গেটওয়েতে এগিয়ে যান'}</span>
                  </button>

                  {/* 256-bit SSL encryption footer */}
                  <p className="text-[11px] text-gray-500 text-center flex items-center justify-center gap-1 pt-1">
                    <Lock className="w-3.5 h-3.5 text-gray-400" />
                    <span>২৫৬-বিট এসএসএল এনক্রিপশনের মাধ্যমে শতভাগ নিরাপদ লেনদেন</span>
                  </p>
                </div>

              </div>

            </form>
          )}

        </div>

      </div>
    </div>
  );
};
