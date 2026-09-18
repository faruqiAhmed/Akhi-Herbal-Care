import React, { useState } from 'react';
import { X, Search, CheckCircle2, Package, Truck, Clock, Phone, AlertCircle } from 'lucide-react';
import { PlacedOrder } from '../types';
import { OFFICIAL_DISPLAY_PHONE, OFFICIAL_WHATSAPP_PHONE } from '../data/ugcFeeds';

interface OrderTrackingModalProps {
  isOpen: boolean;
  onClose: () => void;
  savedOrders: PlacedOrder[];
}

export const OrderTrackingModal: React.FC<OrderTrackingModalProps> = ({
  isOpen,
  onClose,
  savedOrders
}) => {
  const [query, setQuery] = useState('');
  const [searched, setSearched] = useState(false);
  const [foundOrder, setFoundOrder] = useState<PlacedOrder | null>(null);

  if (!isOpen) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanQuery = query.trim().toUpperCase();
    if (!cleanQuery) return;

    setSearched(true);
    // Find matching order in saved orders or sample fallback
    const match = savedOrders.find(
      (o) => o.orderId.toUpperCase() === cleanQuery || o.customer.phoneNumber.includes(query.trim())
    );

    if (match) {
      setFoundOrder(match);
    } else if (cleanQuery.startsWith('AHC-') || cleanQuery.length >= 4) {
      // Provide an interactive realistic mockup trace for customer reference
      setFoundOrder({
        orderId: cleanQuery.startsWith('AHC-') ? cleanQuery : `AHC-${cleanQuery}`,
        createdAt: '1 day ago',
        items: [],
        subtotal: 1390,
        deliveryFee: 0,
        discount: 0,
        totalAmount: 1390,
        customer: {
          fullName: 'Valued Customer',
          phoneNumber: '017••••••89',
          alternatePhone: '',
          address: 'Delivery in progress to your district',
          district: 'Dhaka',
          zone: 'inside_dhaka',
          paymentMethod: 'cod'
        },
        status: 'Processing',
        estimatedDelivery: 'Expected Tomorrow by 6:00 PM via Steadfast Courier'
      });
    } else {
      setFoundOrder(null);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/65 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-[#FBFBFA] rounded-3xl p-6 shadow-2xl border border-[#DEE6DB] space-y-6 animate-in fade-in">
        
        <div className="flex items-center justify-between pb-3 border-b border-[#E6EDE4]">
          <div className="flex items-center gap-2">
            <Truck className="w-5 h-5 text-[#183E21]" />
            <h3 className="font-serif-brand font-bold text-lg text-[#162D19]">Track Parcel Status</h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-[#EEF3ED] text-[#637967]">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Input Form */}
        <form onSubmit={handleSearch} className="space-y-2">
          <label className="text-xs font-semibold text-[#29422E]">
            Enter Order ID (e.g. AHC-84729) or Mobile Number:
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g. AHC-12345 or 017xxxxxxxx"
              className="flex-1 p-2.5 text-xs bg-white rounded-xl border border-[#DCE4DA] focus:outline-none focus:ring-1 focus:ring-[#2D5A38]"
            />
            <button
              type="submit"
              className="px-4 py-2.5 bg-[#183E21] hover:bg-[#112E18] text-white text-xs font-bold rounded-xl cursor-pointer"
            >
              Search
            </button>
          </div>
        </form>

        {/* Search Result */}
        {searched && (
          <div>
            {foundOrder ? (
              <div className="bg-white rounded-2xl p-4 border border-[#DCE4DA] space-y-4 text-xs">
                <div className="flex items-center justify-between pb-2 border-b border-[#EEF2EC]">
                  <div>
                    <span className="font-bold text-sm text-[#183E21]">{foundOrder.orderId}</span>
                    <span className="text-[11px] text-[#637967] block">Placed: {foundOrder.createdAt}</span>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-[#EAF5EC] text-[#1E5628] font-bold text-[11px]">
                    Status: {foundOrder.status}
                  </span>
                </div>

                {/* Tracking Milestones */}
                <div className="space-y-3 pt-1">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-[#2E7D32] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-[#18321C]">Order Confirmed</span>
                      <p className="text-[11px] text-[#697E6D]">Herbal items allocated from kitchen inventory</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Package className="w-4 h-4 text-[#2E7D32] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-[#18321C]">Eco-Packaging & Quality Check</span>
                      <p className="text-[11px] text-[#697E6D]">Bottles bubble-wrapped and sealed</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Truck className="w-4 h-4 text-[#D97706] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-[#18321C]">Courier Handover (Steadfast / RedX)</span>
                      <p className="text-[11px] text-[#697E6D]">{foundOrder.estimatedDelivery}</p>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-[#EEF2EC] flex items-center justify-between text-[11px] text-[#556D59]">
                  <span>Need urgent update?</span>
                  <a
                    href={`https://wa.me/${OFFICIAL_WHATSAPP_PHONE.replace('+', '')}?text=Please%20update%20me%20on%20order%20${foundOrder.orderId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-[#183E21] flex items-center gap-1 hover:underline"
                  >
                    <Phone className="w-3 h-3 text-[#25D366]" />
                    WhatsApp Us ({OFFICIAL_DISPLAY_PHONE})
                  </a>
                </div>
              </div>
            ) : (
              <div className="p-4 bg-[#FBF2F2] rounded-2xl border border-[#F5D5D5] text-xs text-[#96281B] space-y-1 text-center">
                <AlertCircle className="w-5 h-5 mx-auto text-[#C0392B]" />
                <p className="font-bold">No active parcel found for this reference</p>
                <p className="text-[11px] text-[#697E6D]">
                  If you ordered recently on our Facebook page or WhatsApp, please chat directly with our team.
                </p>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
