import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  ShoppingBag, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles, 
  Truck,
  Tag
} from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  currency: 'BDT' | 'USD';
  onProceedToCheckout: (appliedPromo?: { code: string; discountRate: number }) => void;
}

const FREE_SHIPPING_THRESHOLD_BDT = 1500;

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  currency,
  onProceedToCheckout
}) => {
  const [promoCodeInput, setPromoCodeInput] = useState('');
  const [promoError, setPromoError] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<{ code: string; discountRate: number } | null>(null);

  if (!isOpen) return null;

  const subtotalBDT = cartItems.reduce(
    (acc, item) => acc + item.product.priceBDT * item.quantity,
    0
  );

  const subtotalUSD = cartItems.reduce(
    (acc, item) => acc + item.product.priceUSD * item.quantity,
    0
  );

  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD_BDT - subtotalBDT);
  const freeShippingProgress = Math.min(100, (subtotalBDT / FREE_SHIPPING_THRESHOLD_BDT) * 100);

  const discountBDT = appliedPromo ? Math.round(subtotalBDT * appliedPromo.discountRate) : 0;
  const discountUSD = appliedPromo ? subtotalUSD * appliedPromo.discountRate : 0;

  const totalBDT = Math.max(0, subtotalBDT - discountBDT);
  const totalUSD = Math.max(0, subtotalUSD - discountUSD);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError('');
    const code = promoCodeInput.trim().toUpperCase();
    if (!code) return;

    if (code === 'HERBAL10' || code === 'AKHI10') {
      setAppliedPromo({ code, discountRate: 0.10 });
      setPromoCodeInput('');
    } else if (code === 'HERBAL15') {
      setAppliedPromo({ code, discountRate: 0.15 });
      setPromoCodeInput('');
    } else {
      setPromoError('Invalid coupon code. Try "HERBAL10" for 10% off!');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-2xs transition-opacity animate-in fade-in"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FBFBFA] shadow-2xl border-l border-[#DDE4DC] flex flex-col justify-between animate-in slide-in-from-right duration-300">
          
          {/* Drawer Header */}
          <div className="p-4 sm:p-5 border-b border-[#E3E9E1] bg-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-[#183E21]" />
                <h3 className="font-serif-brand font-bold text-lg text-[#162D19]">
                  Shopping Cart ({cartItems.reduce((sum, item) => sum + item.quantity, 0)})
                </h3>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-full text-[#637967] hover:bg-[#EEF3ED] transition-colors cursor-pointer"
                aria-label="Close cart"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Free Shipping Progress Indicator */}
            <div className="mt-3 pt-3 border-t border-[#EEF2EC] space-y-1.5">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="flex items-center gap-1 text-[#224427]">
                  <Truck className="w-3.5 h-3.5 text-[#2E7D32]" />
                  {remainingForFreeShipping === 0 ? (
                    <span className="text-[#2E7D32] font-bold">🎉 You unlocked FREE Delivery!</span>
                  ) : (
                    <span>Add ৳{remainingForFreeShipping} more for FREE shipping</span>
                  )}
                </span>
                <span className="text-[11px] text-[#697E6E]">{Math.round(freeShippingProgress)}%</span>
              </div>
              <div className="w-full bg-[#E5ECE4] h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-[#2E7D32] h-full transition-all duration-500 rounded-full"
                  style={{ width: `${freeShippingProgress}%` }}
                />
              </div>
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3">
            {cartItems.length === 0 ? (
              <div className="py-16 text-center space-y-3">
                <div className="w-16 h-16 rounded-full bg-[#EEF4EE] text-[#4E6753] flex items-center justify-center mx-auto">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h4 className="font-serif-brand font-bold text-lg text-[#18311B]">
                  Your cart is empty
                </h4>
                <p className="text-xs text-[#5D7060] max-w-xs mx-auto">
                  Explore our authentic homemade herbal oils and hair packs crafted with 28 natural herbs.
                </p>
                <button
                  onClick={onClose}
                  className="mt-2 px-6 py-2.5 bg-[#183E21] hover:bg-[#112F18] text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item.product.id}
                  className="flex gap-3 p-3 bg-white rounded-2xl border border-[#E3EAE1] shadow-2xs"
                >
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-16 h-16 sm:w-18 sm:h-18 object-cover rounded-xl bg-[#EFF3EE]"
                  />
                  <div className="flex-1 flex flex-col justify-between min-w-0">
                    <div>
                      <div className="flex items-start justify-between gap-1">
                        <h4 className="text-xs font-bold text-[#18301B] line-clamp-1">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(item.product.id)}
                          className="text-[#96A799] hover:text-[#C0392B] p-0.5 transition-colors"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="text-[11px] text-[#556958] font-serif truncate">
                        {item.product.bengaliName}
                      </p>
                      <p className="text-[10px] text-[#7A8E7E] mt-0.5">
                        Size: {item.product.volumeSize}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-1 border-t border-[#F2F5F0]">
                      <div className="flex items-center border border-[#DCE4DA] rounded-lg bg-[#FAFCFA] overflow-hidden text-xs">
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                          className="px-2 py-0.5 text-[#354D39] hover:bg-[#EEF3ED] font-bold"
                        >
                          -
                        </button>
                        <span className="px-2.5 py-0.5 font-bold text-[#183E21]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                          className="px-2 py-0.5 text-[#354D39] hover:bg-[#EEF3ED] font-bold"
                        >
                          +
                        </button>
                      </div>

                      <span className="text-xs font-bold text-[#183E21]">
                        {currency === 'BDT' 
                          ? `৳${item.product.priceBDT * item.quantity}` 
                          : `$${(item.product.priceUSD * item.quantity).toFixed(2)}`}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer & Checkout Action */}
          {cartItems.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-[#E3E9E1] bg-white space-y-3">
              
              {/* Promo code form */}
              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-3.5 h-3.5 text-[#708474] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={promoCodeInput}
                    onChange={(e) => setPromoCodeInput(e.target.value)}
                    placeholder="Coupon code (e.g. HERBAL10)"
                    className="w-full pl-8 pr-3 py-2 text-xs uppercase bg-[#F8FAF7] border border-[#DCE3DA] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#2D5A38]"
                  />
                </div>
                <button
                  type="submit"
                  className="px-3.5 py-2 bg-[#EEF4EE] hover:bg-[#DEEBDE] text-[#1E4D27] text-xs font-bold rounded-xl transition-colors cursor-pointer"
                >
                  Apply
                </button>
              </form>

              {promoError && (
                <p className="text-[11px] text-[#C0392B]">{promoError}</p>
              )}

              {appliedPromo && (
                <div className="flex items-center justify-between text-xs bg-[#EAF5EC] px-3 py-1.5 rounded-lg text-[#195627]">
                  <span>Coupon "{appliedPromo.code}" applied (-{appliedPromo.discountRate * 100}%)</span>
                  <button onClick={() => setAppliedPromo(null)} className="text-[#C0392B] font-bold">
                    Remove
                  </button>
                </div>
              )}

              {/* Summary Calculations */}
              <div className="space-y-1.5 text-xs text-[#526655] pt-1">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span className="font-semibold text-[#18311B]">
                    {currency === 'BDT' ? `৳${subtotalBDT}` : `$${subtotalUSD.toFixed(2)}`}
                  </span>
                </div>

                {appliedPromo && (
                  <div className="flex justify-between text-[#2E7D32] font-semibold">
                    <span>Discount:</span>
                    <span>-{currency === 'BDT' ? `৳${discountBDT}` : `$${discountUSD.toFixed(2)}`}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Estimated Delivery:</span>
                  <span>
                    {remainingForFreeShipping === 0 
                      ? <strong className="text-[#2E7D32]">FREE (Over ৳1500)</strong> 
                      : 'Calculated at checkout'}
                  </span>
                </div>

                <div className="flex justify-between text-sm font-bold text-[#152B18] pt-2 border-t border-[#EEF2EC]">
                  <span>Total Amount:</span>
                  <span className="text-base text-[#183E21]">
                    {currency === 'BDT' ? `৳${totalBDT}` : `$${totalUSD.toFixed(2)}`}
                  </span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                id="drawer-proceed-checkout-btn"
                onClick={() => {
                  onClose();
                  onProceedToCheckout(appliedPromo || undefined);
                }}
                className="w-full py-3.5 px-4 bg-[#183E21] hover:bg-[#112E18] text-white font-semibold text-xs rounded-xl flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all active:scale-98 cursor-pointer"
              >
                <span>Proceed to Secure Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-[#697E6D]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#2E7D32]" />
                <span>Cash on delivery & secure SSL verified</span>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
