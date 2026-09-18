/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { 
  ShoppingBag, 
  Search, 
  Sparkles, 
  Check, 
  ArrowRight, 
  Facebook, 
  Phone, 
  SlidersHorizontal,
  Flame,
  ShieldAlert,
  ChevronRight
} from 'lucide-react';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { SearchBar } from './components/SearchBar';
import { FilterBar } from './components/FilterBar';
import { ProductCard } from './components/ProductCard';
import { ProductModal } from './components/ProductModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { BrandStoryAndTrust } from './components/BrandStoryAndTrust';
import { OrderTrackingModal } from './components/OrderTrackingModal';
import { SuperComboShowcase } from './components/SuperComboShowcase';
import { CommunityReelsSection } from './components/CommunityReelsSection';
import { UsageRoutineSection } from './components/UsageRoutineSection';
import { AuthModal } from './components/AuthModal';
import { ProfilePage } from './components/ProfilePage';
import { AdminDashboard } from './components/AdminDashboard';
import { FloatingContactMenu } from './components/FloatingContactMenu';
import { Footer } from './components/Footer';

import { PRODUCTS } from './data/products';
import { OFFICIAL_FACEBOOK_URL, OFFICIAL_DISPLAY_PHONE, OFFICIAL_WHATSAPP_PHONE } from './data/ugcFeeds';
import { Product, CartItem, FilterState, PlacedOrder, UserProfile } from './types';

const INITIAL_FILTER_STATE: FilterState = {
  search: '',
  category: 'all',
  concern: 'all',
  priceRange: [0, 2000],
  inStockOnly: false,
  sortBy: 'featured'
};

// Default mock user profile matching customer screenshot
const DEFAULT_USER: UserProfile = {
  id: 'usr_omar_faruk',
  fullName: 'মো. ওমর ফারুক',
  phoneNumber: '01712345678',
  email: 'omarfaruk@example.com',
  address: 'বাড়ি #১২, রোড #৪, ধানমন্ডি, ঢাকা',
  zone: 'inside_dhaka',
  district: 'ঢাকা',
  joinedDate: '১৫ জানুয়ারি, ২০২৪'
};

const DEFAULT_ORDERS: PlacedOrder[] = [
  {
    orderId: 'ORD-98214',
    items: [
      {
        product: PRODUCTS[0],
        quantity: 2
      },
      {
        product: PRODUCTS[1] || PRODUCTS[0],
        quantity: 1
      }
    ],
    subtotal: 2090,
    deliveryFee: 60,
    discount: 0,
    totalAmount: 2150,
    customer: {
      fullName: 'মো. ওমর ফারুক',
      phoneNumber: '01712345678',
      alternatePhone: '',
      address: 'বাড়ি #১২, রোড #৪, ধানমন্ডি, ঢাকা',
      district: 'ঢাকা',
      zone: 'inside_dhaka',
      paymentMethod: 'cod'
    },
    status: 'Confirmed',
    createdAt: '১৫ সেপ্টেম্বর, ২০২৪, বিকাল ০৪:২২',
    estimatedDelivery: '২-৩ কর্মদিবস'
  },
  {
    orderId: 'ORD-76192',
    items: [
      {
        product: PRODUCTS[2] || PRODUCTS[0],
        quantity: 1
      }
    ],
    subtotal: 1790,
    deliveryFee: 60,
    discount: 0,
    totalAmount: 1850,
    customer: {
      fullName: 'মো. ওমর ফারুক',
      phoneNumber: '01712345678',
      alternatePhone: '',
      address: 'বাড়ি #১২, রোড #৪, ধানমন্ডি, ঢাকা',
      district: 'ঢাকা',
      zone: 'inside_dhaka',
      paymentMethod: 'bkash',
      transactionId: 'TRX98215892'
    },
    status: 'Confirmed',
    createdAt: '২৮ আগস্ট, ২০২৪, সকাল ১১:১৫',
    estimatedDelivery: '২-৩ কর্মদিবস'
  }
];

export default function App() {
  // Current logged in user
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem('ahc_current_user');
      return saved ? JSON.parse(saved) : DEFAULT_USER;
    } catch {
      return DEFAULT_USER;
    }
  });

  // Cart state with local storage persistence
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('ahc_cart_items');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Saved placed orders
  const [savedOrders, setSavedOrders] = useState<PlacedOrder[]>(() => {
    try {
      const saved = localStorage.getItem('ahc_placed_orders');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
      return DEFAULT_ORDERS;
    } catch {
      return DEFAULT_ORDERS;
    }
  });

  const [currency, setCurrency] = useState<'BDT' | 'USD'>('BDT');
  const [filterState, setFilterState] = useState<FilterState>(INITIAL_FILTER_STATE);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  // Modals & drawers
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isOrderTrackerOpen, setIsOrderTrackerOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [currentView, setCurrentView] = useState<'shop' | 'profile' | 'admin'>('shop');
  const [appliedPromo, setAppliedPromo] = useState<{ code: string; discountRate: number } | undefined>(undefined);

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Persist currentUser to localStorage
  useEffect(() => {
    try {
      if (currentUser) {
        localStorage.setItem('ahc_current_user', JSON.stringify(currentUser));
      } else {
        localStorage.removeItem('ahc_current_user');
      }
    } catch (e) {
      console.error(e);
    }
  }, [currentUser]);

  const handleLoginSuccess = (user: UserProfile) => {
    setCurrentUser(user);
    setCurrentView('profile');
    showToast(`স্বাগতম, ${user.fullName}! সফলভাবে লগইন সম্পন্ন হয়েছে।`);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentView('shop');
    showToast('সফলভাবে লগআউট সম্পন্ন হয়েছে।');
  };

  useEffect(() => {
    try {
      localStorage.setItem('ahc_cart_items', JSON.stringify(cartItems));
    } catch (e) {
      console.error(e);
    }
  }, [cartItems]);

  useEffect(() => {
    try {
      localStorage.setItem('ahc_placed_orders', JSON.stringify(savedOrders));
    } catch (e) {
      console.error(e);
    }
  }, [savedOrders]);

  // Keyboard shortcut for search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' && !isSearchOpen && (e.target as HTMLElement).tagName !== 'INPUT') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  // Cart operations
  const handleAddToCart = (product: Product, quantity = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    showToast(`✓ Added ${product.name} to your cart`);
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(productId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleBuyNow = (product: Product, quantity = 1) => {
    handleAddToCart(product, quantity);
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleOrderCompleted = (order: PlacedOrder) => {
    setSavedOrders((prev) => [order, ...prev]);
    setCartItems([]);
    showToast(`🎉 Order ${order.orderId} confirmed successfully!`);
  };

  const scrollToSection = (id: string) => {
    if (currentView !== 'shop') {
      setCurrentView('shop');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 50);
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Filter and search logic
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Search
      if (filterState.search.trim()) {
        const query = filterState.search.toLowerCase().trim();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesBengali = product.bengaliName.toLowerCase().includes(query);
        const matchesDesc = product.shortDescription.toLowerCase().includes(query) || product.fullDescription.toLowerCase().includes(query);
        const matchesIngredients = product.keyIngredients.some(
          (ing) => ing.name.toLowerCase().includes(query) || (ing.bengaliName && ing.bengaliName.toLowerCase().includes(query))
        );
        if (!matchesName && !matchesBengali && !matchesDesc && !matchesIngredients) {
          return false;
        }
      }

      // Category
      if (filterState.category !== 'all') {
        if (product.category !== filterState.category) {
          return false;
        }
      }

      // Concern
      if (filterState.concern !== 'all') {
        if (!product.concerns.includes(filterState.concern)) {
          return false;
        }
      }

      // In-stock
      if (filterState.inStockOnly && !product.inStock) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (filterState.sortBy === 'price-asc') return a.priceBDT - b.priceBDT;
      if (filterState.sortBy === 'price-desc') return b.priceBDT - a.priceBDT;
      if (filterState.sortBy === 'rating') return b.rating - a.rating;
      if (filterState.sortBy === 'newest') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      // Default: featured (bestsellers first)
      return (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0);
    });
  }, [filterState]);

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // Featured bestseller product for Hero quick view
  const signatureHairOil = PRODUCTS[0];
  const superComboProduct = PRODUCTS.find((p) => p.id === 'akhi-apaa-super-combo') || PRODUCTS[2] || PRODUCTS[0];

  if (currentView === 'admin') {
    return (
      <AdminDashboard
        onBackToStore={() => {
          setCurrentView('shop');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#FBFBFA] selection:bg-[#2D5A38]/20 selection:text-[#183B20]">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#16361C] text-white text-xs font-semibold px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2 border border-[#315E38] animate-in slide-in-from-bottom duration-200">
          <Check className="w-4 h-4 text-[#58D68D]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Navigation Header */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        currency={currency}
        onToggleCurrency={() => setCurrency((c) => (c === 'BDT' ? 'USD' : 'BDT'))}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenOrderTracker={() => setIsOrderTrackerOpen(true)}
        onNavigateSection={scrollToSection}
        currentUser={currentUser}
        onOpenAuth={() => setIsAuthOpen(true)}
        onOpenProfile={() => {
          if (currentUser) {
            setCurrentView((v) => (v === 'profile' ? 'shop' : 'profile'));
            window.scrollTo({ top: 0, behavior: 'smooth' });
          } else {
            setIsAuthOpen(true);
          }
        }}
        onOpenAdmin={() => {
          setCurrentView('admin');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      <main className="flex-1">
        {currentView === 'profile' && currentUser ? (
          <ProfilePage
            user={currentUser}
            orders={savedOrders}
            onBackToHome={() => {
              setCurrentView('shop');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onLogout={handleLogout}
            onOpenOrderTracker={() => setIsOrderTrackerOpen(true)}
            onOpenAdmin={() => {
              setCurrentView('admin');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onRepeatOrder={(order) => {
              order.items.forEach((item) => {
                handleAddToCart(item.product, item.quantity);
              });
              setCurrentView('shop');
              setIsCartOpen(true);
            }}
          />
        ) : (
          <>
            {/* Hero Section */}
        <HeroBanner
          onExploreClick={() => scrollToSection('collection')}
          onFeaturedClick={() => setSelectedProduct(signatureHairOil)}
          onQuickAddCombo={() => {
            const combo = PRODUCTS.find((p) => p.id === 'akhi-apaa-super-combo') || signatureHairOil;
            handleAddToCart(combo, 1);
            setIsCheckoutOpen(true);
          }}
        />

        {/* Redesigned Akhi Hair Regrowth Super Combo Section */}
        {superComboProduct && (
          <SuperComboShowcase
            product={superComboProduct}
            currency={currency}
            onAddToCart={(prod, qty) => {
              handleAddToCart(prod, qty);
              setIsCartOpen(true);
            }}
            onBuyNow={(prod, qty) => {
              handleBuyNow(prod, qty);
            }}
            onViewDetails={(prod) => {
              setSelectedProduct(prod);
            }}
          />
        )}

        {/* E-Commerce Storefront Collection */}
        <section id="collection" className="py-14 sm:py-18 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-[#E7EDE5]">
            <div className="space-y-1.5">
              <span className="text-xs font-bold uppercase tracking-widest text-[#2E6B39]">
                Current Handcrafted Collection
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif-brand font-bold text-[#142B17]">
                Natural Remedies & Formulations
              </h2>
              <p className="text-xs sm:text-sm text-[#556D59]">
                Showing {filteredProducts.length} handcrafted herbal items available for nationwide delivery
              </p>
            </div>

            {/* Delivery & Authentic Herbal Guarantee Badge */}
            <div className="text-xs text-[#20522B] font-semibold flex items-center gap-2 bg-[#E9F4EB] px-3.5 py-1.5 rounded-full border border-[#CDE5D2]">
              <Check className="w-3.5 h-3.5 text-[#1E7E34]" />
              <span>১০০% ঘরোয়া তৈরি • সারা দেশে ক্যাশ অন ডেলিভারি (৳)</span>
            </div>
          </div>

          {/* Filter & Sorting Controls */}
          <FilterBar
            filterState={filterState}
            onFilterChange={(updates) => setFilterState((prev) => ({ ...prev, ...updates }))}
            onResetFilters={() => setFilterState(INITIAL_FILTER_STATE)}
            totalProducts={PRODUCTS.length}
            filteredCount={filteredProducts.length}
          />

          {/* Product Grid */}
          {filteredProducts.length === 0 ? (
            <div className="py-16 text-center bg-white rounded-3xl border border-[#DCE4DA] p-8 space-y-3">
              <div className="w-14 h-14 rounded-full bg-[#EFF5EF] text-[#3D5B42] flex items-center justify-center mx-auto">
                <Search className="w-7 h-7" />
              </div>
              <h3 className="font-serif-brand font-bold text-lg text-[#162D19]">
                No herbal products match your filter
              </h3>
              <p className="text-xs text-[#596E5C] max-w-sm mx-auto">
                Try resetting your filters or changing your search terms to explore our full homemade selection.
              </p>
              <button
                onClick={() => setFilterState(INITIAL_FILTER_STATE)}
                className="px-5 py-2.5 bg-[#183E21] text-white text-xs font-semibold rounded-xl hover:bg-[#112E18] transition-colors cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  currency={currency}
                  onQuickView={(p) => setSelectedProduct(p)}
                  onAddToCart={(p) => handleAddToCart(p, 1)}
                  onBuyNow={(p) => handleBuyNow(p, 1)}
                />
              ))}
            </div>
          )}

        </section>

        {/* Customer Reviews & Video Reels Section */}
        <CommunityReelsSection
          onAddToCart={(prod, qty) => {
            handleAddToCart(prod, qty);
            setIsCartOpen(true);
          }}
          onBuyNow={(prod, qty) => {
            handleBuyNow(prod, qty);
          }}
          onViewProduct={(prod) => {
            setSelectedProduct(prod);
          }}
        />

        {/* How to Use & Hair Regrowth Routine Guide Section */}
        <UsageRoutineSection
          onAddToCart={(prod, qty) => {
            handleAddToCart(prod, qty);
            setIsCartOpen(true);
          }}
          onBuyNow={(prod, qty) => {
            handleBuyNow(prod, qty);
          }}
          onViewProduct={(prod) => {
            setSelectedProduct(prod);
          }}
        />

        {/* Brand Heritage & 4 Pillars Section */}
        <BrandStoryAndTrust />
          </>
        )}
      </main>

      {/* Footer */}
      <Footer
        onNavigateSection={scrollToSection}
        onOpenOrderTracker={() => setIsOrderTrackerOpen(true)}
      />

      {/* Global Product Detail Modal */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        currency={currency}
        onAddToCart={(p, qty) => handleAddToCart(p, qty)}
        onBuyNow={(p, qty) => handleBuyNow(p, qty)}
      />

      {/* Global Shopping Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        currency={currency}
        onProceedToCheckout={(promo) => {
          setAppliedPromo(promo);
          setIsCheckoutOpen(true);
        }}
      />

      {/* Global Secure Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        currency={currency}
        appliedPromo={appliedPromo}
        onOrderCompleted={handleOrderCompleted}
        currentUser={currentUser}
        onOpenAuth={() => {
          setIsCheckoutOpen(false);
          setIsAuthOpen(true);
        }}
      />

      {/* Standalone Search Modal (Shortcut Trigger) */}
      {isSearchOpen && (
        <SearchBar
          isOpenModal={isSearchOpen}
          onCloseModal={() => setIsSearchOpen(false)}
          searchQuery={filterState.search}
          onSearchChange={(search) => setFilterState((prev) => ({ ...prev, search }))}
          filteredProducts={filteredProducts}
          onSelectProduct={(product) => setSelectedProduct(product)}
        />
      )}

      {/* Order Tracking Modal */}
      <OrderTrackingModal
        isOpen={isOrderTrackerOpen}
        onClose={() => setIsOrderTrackerOpen(false)}
        savedOrders={savedOrders}
      />

      {/* Authentication Modal (Login / Sign-up) */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* Floating Speed-Dial Contact / WhatsApp / Call Menu */}
      <FloatingContactMenu />
    </div>
  );
}
