export type ProductCategory = 'all' | 'hair-oil' | 'hair-pack' | 'combos' | 'scalp-care' | 'skincare';

export type HairConcern = 'all' | 'hair-fall' | 'dandruff' | 'regrowth' | 'scalp-itch' | 'glow-softness';

export interface Ingredient {
  name: string;
  bengaliName?: string;
  benefit: string;
}

export interface Product {
  id: string;
  name: string;
  bengaliName: string;
  slug: string;
  category: ProductCategory;
  concerns: HairConcern[];
  tag: string;
  priceBDT: number;
  originalPriceBDT: number;
  priceUSD: number;
  rating: number;
  reviewCount: number;
  isBestSeller?: boolean;
  isNew?: boolean;
  inStock: boolean;
  stockCount: number;
  volumeSize: string;
  shortDescription: string;
  bengaliDescription: string;
  fullDescription: string;
  keyIngredients: Ingredient[];
  usageInstructions: string[];
  benefits: string[];
  images: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize?: string;
}

export interface FilterState {
  search: string;
  category: ProductCategory;
  concern: HairConcern;
  priceRange: [number, number];
  inStockOnly: boolean;
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'rating' | 'newest';
}

export interface UGCPost {
  id: string;
  authorName: string;
  authorCity: string;
  platform: 'facebook' | 'whatsapp' | 'instagram';
  avatar: string;
  rating: number;
  date: string;
  content: string;
  bengaliContent?: string;
  taggedProductId: string;
  taggedProductName: string;
  image: string;
  likes: number;
  verifiedOrder: boolean;
  isBeforeAfter?: boolean;
  facebookPostUrl?: string;
}

export interface CheckoutFormData {
  fullName: string;
  phoneNumber: string;
  alternatePhone: string;
  address: string;
  district: string;
  zone: 'inside_dhaka' | 'outside_dhaka';
  paymentMethod: 'cod' | 'bkash' | 'nagad' | 'card';
  transactionId?: string;
  orderNotes?: string;
}

export interface UserProfile {
  id: string;
  fullName: string;
  phoneNumber: string;
  email?: string;
  address?: string;
  district?: string;
  zone: 'inside_dhaka' | 'outside_dhaka';
  avatar?: string;
  joinedDate: string;
}

export interface PlacedOrder {
  orderId: string;
  createdAt: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  discount: number;
  totalAmount: number;
  customer: CheckoutFormData;
  status: 'Confirmed' | 'Processing' | 'Shipped' | 'Delivered';
  estimatedDelivery: string;
}
