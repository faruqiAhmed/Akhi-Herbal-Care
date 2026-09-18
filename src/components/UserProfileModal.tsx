import React from 'react';
import { 
  X, 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  Package, 
  LogOut, 
  Truck,
  ExternalLink,
  ShoppingBag
} from 'lucide-react';
import { UserProfile, PlacedOrder } from '../types';

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile;
  orders: PlacedOrder[];
  onLogout: () => void;
  onOpenOrderTracker: () => void;
}

export const UserProfileModal: React.FC<UserProfileModalProps> = ({
  isOpen,
  onClose,
  user,
  orders,
  onLogout,
  onOpenOrderTracker
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200 font-bengali">
      <div className="relative w-full max-w-lg bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-gray-200 overflow-hidden my-auto flex flex-col">
        
        {/* Header with User Info */}
        <div className="p-5 bg-gradient-to-br from-[#12361B] via-[#1B4A25] to-[#102B15] text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3.5">
            <div className="w-14 h-14 rounded-2xl bg-white/10 border-2 border-[#86EFAC]/40 flex items-center justify-center text-white font-bold text-xl shadow-md">
              {user.fullName ? user.fullName.charAt(0) : 'গ'}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-bold text-lg text-white">
                  {user.fullName}
                </h2>
                <span className="bg-[#86EFAC]/20 border border-[#86EFAC]/40 text-[#86EFAC] text-[10px] font-bold px-2 py-0.5 rounded-full">
                  সদস্য
                </span>
              </div>
              <p className="text-xs text-[#C7E3CB] mt-0.5 flex items-center gap-1">
                <Phone className="w-3 h-3" /> {user.phoneNumber}
              </p>
              {user.email && (
                <p className="text-xs text-[#C7E3CB] mt-0.5 flex items-center gap-1">
                  <Mail className="w-3 h-3" /> {user.email}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-5 space-y-5 max-h-[70vh] overflow-y-auto">
          
          {/* Saved Delivery Address Card */}
          <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-gray-800 flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-[#166534]" />
                <span>সংরক্ষিত ডেলিভারি ঠিকানা:</span>
              </span>
              <span className="text-[11px] bg-[#E8F8EE] text-[#166534] font-semibold px-2 py-0.5 rounded-md">
                {user.zone === 'outside_dhaka' ? 'ঢাকার বাইরে' : 'ঢাকা শহর'}
              </span>
            </div>
            <p className="text-xs text-gray-700 leading-relaxed pl-5">
              {user.address || 'কোনো ঠিকানা সংরক্ষিত নেই। চেকআউটের সময় যুক্ত করতে পারেন।'}
            </p>
          </div>

          {/* Orders Section */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm text-gray-900 flex items-center gap-1.5">
                <Package className="w-4 h-4 text-[#166534]" />
                <span>আমার অর্ডারসমূহ ({orders.length})</span>
              </h3>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenOrderTracker();
                }}
                className="text-xs text-[#166534] hover:text-[#0f4422] font-semibold flex items-center gap-1 cursor-pointer"
              >
                <Truck className="w-3.5 h-3.5" />
                <span>ট্র্যাক করুন</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>

            {orders.length > 0 ? (
              <div className="space-y-2.5">
                {orders.map((order) => (
                  <div 
                    key={order.orderId}
                    className="p-3 bg-white border border-gray-200 rounded-xl space-y-2 hover:border-gray-300 transition-all text-xs"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-bold text-gray-900 bg-gray-100 px-2 py-0.5 rounded">
                        {order.orderId}
                      </span>
                      <span className="px-2 py-0.5 rounded-md font-bold text-[10px] bg-green-100 text-green-800">
                        {order.status === 'Confirmed' ? 'নিশ্চিত হয়েছে' : order.status}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-gray-600 text-[11px]">
                      <span>তারিখ: {order.createdAt}</span>
                      <span className="font-bold text-gray-900 text-xs">
                        ৳ {order.totalAmount}
                      </span>
                    </div>

                    <div className="text-[11px] text-gray-500 pt-1 border-t border-gray-100 flex items-center gap-1">
                      <ShoppingBag className="w-3 h-3" />
                      <span>{order.items.length} টি পণ্য ({order.items.map(i => i.product.name).join(', ')})</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6 bg-gray-50 rounded-2xl border border-gray-100 text-gray-500 text-xs space-y-1">
                <ShoppingBag className="w-8 h-8 text-gray-300 mx-auto" />
                <p>এখনো কোনো অর্ডার করেননি।</p>
                <p className="text-[11px] text-gray-400">আপনার পছন্দের পণ্য কার্টে যোগ করে অর্ডার সম্পন্ন করুন।</p>
              </div>
            )}
          </div>

          {/* Action buttons */}
          <div className="pt-3 border-t border-gray-200 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={onLogout}
              className="py-2.5 px-4 bg-red-50 hover:bg-red-100 text-red-600 font-bold text-xs rounded-xl flex items-center gap-2 transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>লগআউট করুন</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="py-2.5 px-5 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold text-xs rounded-xl transition-colors cursor-pointer"
            >
              বন্ধ করুন
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
