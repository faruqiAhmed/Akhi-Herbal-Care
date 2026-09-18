import React, { useState } from 'react';
import { 
  ArrowLeft, 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  Package, 
  LogOut, 
  Truck, 
  ShoppingBag, 
  Clock, 
  CheckCircle2, 
  LayoutGrid,
  RefreshCw,
  Plus
} from 'lucide-react';
import { UserProfile, PlacedOrder } from '../types';

interface ProfilePageProps {
  user: UserProfile;
  orders: PlacedOrder[];
  onBackToHome: () => void;
  onLogout: () => void;
  onOpenOrderTracker: () => void;
  onOpenAdmin?: () => void;
  onRepeatOrder?: (order: PlacedOrder) => void;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({
  user,
  orders,
  onBackToHome,
  onLogout,
  onOpenOrderTracker,
  onOpenAdmin,
  onRepeatOrder
}) => {
  const [activeTab, setActiveTab] = useState<'orders' | 'addresses'>('orders');

  // Initial letter of user name
  const userInitial = user.fullName ? user.fullName.trim().charAt(0) : 'ম';

  // Format joined date or display standard membership
  const memberSince = '১৫ জানুয়ারি, ২০২৪';

  return (
    <div className="min-h-screen bg-[#F8F9FA] py-8 sm:py-12 font-bengali">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Top Back to Shop navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#183E21] hover:text-[#0f2815] bg-white px-4 py-2 rounded-xl border border-gray-200 shadow-2xs hover:shadow-xs transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>হোমপেজ এ ফিরে যান</span>
          </button>
        </div>

        {/* 1. Header Profile Banner (Matching Screenshot Exactly) */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          
          {/* Left: Avatar + User Details */}
          <div className="flex items-center gap-5">
            {/* Dark green square avatar with rounded corners */}
            <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-2xl bg-[#173822] text-[#F1C40F] flex items-center justify-center font-bold text-2xl sm:text-3xl shadow-md shrink-0">
              {userInitial}
            </div>

            <div className="space-y-1">
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
                {user.fullName || 'মো. ওমর ফারুক'}
              </h1>
              <p className="text-xs sm:text-sm text-gray-500 font-sans flex flex-wrap items-center gap-2">
                <span>{user.phoneNumber}</span>
                {user.email && (
                  <>
                    <span className="text-gray-300">•</span>
                    <span>{user.email}</span>
                  </>
                )}
              </p>
              <p className="text-[11px] text-gray-400">
                নিবন্ধিত গ্রাহক • সদস্য: {memberSince}
              </p>
            </div>
          </div>

          {/* Right: Action Buttons (এডমিন প্যানেল & লগআউট) */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-end">
            <button
              onClick={() => (onOpenAdmin ? onOpenAdmin() : onOpenOrderTracker())}
              className="px-4 py-2.5 bg-[#EEF2FF] hover:bg-[#E0E7FF] text-[#4F46E5] font-semibold text-xs sm:text-sm rounded-xl flex items-center gap-2 transition-colors cursor-pointer shadow-2xs"
            >
              <LayoutGrid className="w-4 h-4" />
              <span>এডমিন প্যানেল</span>
            </button>

            <button
              onClick={onLogout}
              className="px-4 py-2.5 bg-[#FFF1F2] hover:bg-[#FFE4E6] text-[#E11D48] font-semibold text-xs sm:text-sm rounded-xl flex items-center gap-2 transition-colors cursor-pointer border border-[#FECDD3]"
            >
              <LogOut className="w-4 h-4" />
              <span>লগআউট</span>
            </button>
          </div>

        </div>

        {/* 2. Navigation Pills: [ পূর্বের অর্ডার হিস্টোরি (৭) | সংরক্ষিত ঠিকানা সমূহ ] */}
        <div className="flex items-center gap-3 pt-2">
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'orders'
                ? 'bg-[#183E21] text-white shadow-xs'
                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>পূর্বের অর্ডার হিস্টোরি ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('addresses')}
            className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'addresses'
                ? 'bg-[#183E21] text-white shadow-xs'
                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
            }`}
          >
            <MapPin className="w-4 h-4" />
            <span>সংরক্ষিত ঠিকানা সমূহ</span>
          </button>
        </div>

        {/* 3. Section Title */}
        {activeTab === 'orders' && (
          <div className="space-y-4 pt-4">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900">
              আপনার পূর্বের অর্ডার সমূহ
            </h2>

            {/* Orders List matching Card design from screenshot */}
            {orders.length > 0 ? (
              <div className="space-y-4">
                {orders.map((order) => {
                  return (
                    <div 
                      key={order.orderId}
                      className="bg-white rounded-2xl sm:rounded-3xl border border-gray-200/80 p-5 sm:p-6 shadow-2xs hover:shadow-xs transition-shadow space-y-4"
                    >
                      {/* Card Header: Order ID + Status and Total Amount */}
                      <div className="flex items-start justify-between gap-4 pb-3 border-b border-gray-100">
                        <div>
                          <div className="flex items-center gap-2.5">
                            <h3 className="font-bold text-base sm:text-lg text-gray-900">
                              #{order.orderId}
                            </h3>
                            <span className="px-3 py-0.5 rounded-full text-[11px] font-semibold bg-[#E8F8EE] text-[#1E7E34] border border-[#CDE9D5]">
                              {order.status === 'Confirmed' ? 'ডেলিভারি সম্পন্ন' : order.status}
                            </span>
                          </div>
                          <p className="text-xs text-gray-400 mt-1 font-sans">
                            {order.createdAt}
                          </p>
                        </div>

                        <div className="text-right">
                          <span className="text-base sm:text-lg font-bold text-gray-900 block">
                            ৳ {order.totalAmount}
                          </span>
                          <span className="text-[11px] font-sans font-semibold text-emerald-600">
                            {order.customer.paymentMethod === 'bkash' ? 'bKash (Paid)' : 'Cash On Delivery'}
                          </span>
                        </div>
                      </div>

                      {/* Purchased Items Thumbnails (Cards inside order) */}
                      <div className="flex flex-wrap items-center gap-3 py-1">
                        {order.items.map((item, idx) => (
                          <div 
                            key={idx}
                            className="flex items-center gap-3 p-2.5 pr-4 rounded-xl bg-gray-50 border border-gray-200/70"
                          >
                            <img
                              src={item.product.images[0] || '/akhi_apaa_oil.jpg'}
                              alt={item.product.name}
                              className="w-12 h-12 rounded-lg object-cover bg-white border border-gray-200"
                            />
                            <div className="leading-tight">
                              <h4 className="font-semibold text-xs text-gray-800 line-clamp-1 max-w-[140px] sm:max-w-[180px]">
                                {item.product.bengaliName || item.product.name}
                              </h4>
                              <p className="text-[11px] text-gray-500 font-sans mt-0.5">
                                {item.quantity}টি • ৳{item.product.priceBDT}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Card Footer: Courier ID & Action Buttons (লাইভ ট্র্যাক & পুনরায় অর্ডার) */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-gray-100">
                        <div className="text-xs text-gray-500">
                          <span>কুরিয়ার আইডি: </span>
                          <span className="font-semibold text-[#183E21] font-sans">
                            STDF-{order.orderId.replace(/\D/g, '').slice(0, 5) || '10086'}
                          </span>
                        </div>

                        <div className="flex items-center gap-2.5">
                          <button
                            onClick={onOpenOrderTracker}
                            className="px-4 py-2 bg-[#EAF7ED] hover:bg-[#DCF2E1] text-[#1E7E34] text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
                          >
                            <Truck className="w-3.5 h-3.5" />
                            <span>লাইভ ট্র্যাক</span>
                          </button>

                          <button
                            onClick={() => onRepeatOrder && onRepeatOrder(order)}
                            className="px-4 py-2 bg-[#173822] hover:bg-[#0f2617] text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
                          >
                            <RefreshCw className="w-3.5 h-3.5" />
                            <span>পুনরায় অর্ডার</span>
                          </button>
                        </div>
                      </div>

                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="bg-white rounded-3xl p-10 text-center border border-gray-100 shadow-xs space-y-3">
                <div className="w-16 h-16 rounded-full bg-[#EBF5ED] text-[#1E7E34] flex items-center justify-center mx-auto">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="font-bold text-base text-gray-900">
                  এখনো কোনো অর্ডার পাওয়া যায়নি
                </h3>
                <p className="text-xs text-gray-500 max-w-sm mx-auto">
                  আঁখি হারবাল কেয়ারের প্রাকৃতিক পণ্যসমূহ ঘুরে দেখতে আমাদের হোমপেজ ব্রাউজ করুন।
                </p>
                <button
                  onClick={onBackToHome}
                  className="px-6 py-2.5 bg-[#183E21] text-white text-xs font-semibold rounded-xl hover:bg-[#112F18] transition-colors cursor-pointer inline-flex items-center gap-1.5"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>কেনাকাটা শুরু করুন</span>
                </button>
              </div>
            )}
          </div>
        )}

        {/* Address Tab */}
        {activeTab === 'addresses' && (
          <div className="space-y-4 pt-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                আপনার সংরক্ষিত ঠিকানা
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-2xs space-y-3 relative">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 bg-[#E8F8EE] text-[#1E7E34] font-semibold text-xs rounded-full">
                    {user.zone === 'outside_dhaka' ? 'ঢাকার বাইরে' : 'ঢাকা শহর (হোম ডেলিভারি)'}
                  </span>
                  <span className="text-xs text-gray-400 font-medium">প্রাথমিক ঠিকানা</span>
                </div>

                <div className="space-y-1 pt-1">
                  <h4 className="font-bold text-sm text-gray-900">{user.fullName}</h4>
                  <p className="text-xs text-gray-500">{user.phoneNumber}</p>
                  <p className="text-xs text-gray-700 leading-relaxed pt-1">
                    {user.address || 'ঠিকানা যোগ করা হয়নি'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
