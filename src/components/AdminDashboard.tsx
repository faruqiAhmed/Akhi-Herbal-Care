import React, { useState } from 'react';
import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  LayoutGrid,
  Users,
  Boxes,
  Ticket,
  MessageSquare,
  BarChart2,
  Settings,
  Search,
  Bell,
  ChevronDown,
  Calendar,
  ArrowUpRight,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Truck,
  ArrowRight,
  ChevronRight,
  ExternalLink,
  Plus,
  Filter,
  Check,
  X,
  Store,
  RefreshCw,
  TrendingUp,
  AlertOctagon
} from 'lucide-react';

interface AdminDashboardProps {
  onBackToStore: () => void;
}

interface OrderRow {
  num: number;
  orderId: string;
  customerName: string;
  customerAvatar: string;
  itemsCount: number;
  amount: number;
  paymentMethod: string;
  status: 'Delivered' | 'Processing' | 'Confirmed' | 'Shipped' | 'Pending';
  date: string;
}

const INITIAL_ORDERS: OrderRow[] = [
  {
    num: 1,
    orderId: '#DF-10086',
    customerName: 'Rafiul Islam',
    customerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
    itemsCount: 2,
    amount: 1250,
    paymentMethod: 'bKash',
    status: 'Delivered',
    date: 'Sep 18, 2025 04:32 PM'
  },
  {
    num: 2,
    orderId: '#DF-10085',
    customerName: 'Tashfia Rahman',
    customerAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80',
    itemsCount: 3,
    amount: 2680,
    paymentMethod: 'Nagad',
    status: 'Processing',
    date: 'Sep 18, 2025 02:15 PM'
  },
  {
    num: 3,
    orderId: '#DF-10084',
    customerName: 'Md. Hasan',
    customerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
    itemsCount: 1,
    amount: 980,
    paymentMethod: 'Cash on Delivery',
    status: 'Confirmed',
    date: 'Sep 18, 2025 12:45 PM'
  },
  {
    num: 4,
    orderId: '#DF-10083',
    customerName: 'Sadia Akter',
    customerAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
    itemsCount: 4,
    amount: 3450,
    paymentMethod: 'bKash',
    status: 'Shipped',
    date: 'Sep 17, 2025 08:22 PM'
  },
  {
    num: 5,
    orderId: '#DF-10082',
    customerName: 'Imran Hossain',
    customerAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
    itemsCount: 2,
    amount: 1720,
    paymentMethod: 'Nagad',
    status: 'Delivered',
    date: 'Sep 17, 2025 05:10 PM'
  }
];

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onBackToStore }) => {
  const [activeNav, setActiveNav] = useState<'dashboard' | 'orders' | 'products' | 'categories' | 'customers' | 'inventory' | 'coupons' | 'reviews' | 'analytics' | 'settings'>('dashboard');
  const [chartMetric, setChartMetric] = useState<'sales' | 'orders' | 'customers'>('sales');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<OrderRow | null>(null);
  const [ordersList, setOrdersList] = useState<OrderRow[]>(INITIAL_ORDERS);
  const [dateRange, setDateRange] = useState('Sep 12, 2025 - Sep 18, 2025');
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  // Sales chart coordinates matching the screenshot
  // Days: Sep 12, 13, 14, 15, 16, 17, 18
  // Max value: 60,000 BDT
  const chartPoints = [
    { day: 'Sep 12', value: 16200, label: '৳ 16,200', orders: 18, customers: 14 },
    { day: 'Sep 13', value: 24500, label: '৳ 24,500', orders: 22, customers: 19 },
    { day: 'Sep 14', value: 31200, label: '৳ 31,200', orders: 28, customers: 24 },
    { day: 'Sep 15', value: 33800, label: '৳ 33,800', orders: 30, customers: 26 },
    { day: 'Sep 16', value: 42000, label: '৳ 42,000', orders: 36, customers: 31 },
    { day: 'Sep 17', value: 40500, label: '৳ 40,500', orders: 33, customers: 29 },
    { day: 'Sep 18', value: 53500, label: '৳ 53,500', orders: 42, customers: 37 },
  ];

  // SVG dimensions for smooth chart render
  const chartWidth = 560;
  const chartHeight = 220;
  const paddingX = 40;
  const paddingY = 30;
  const usableWidth = chartWidth - paddingX * 2;
  const usableHeight = chartHeight - paddingY * 2;
  const maxValue = 60000;

  const points = chartPoints.map((pt, idx) => {
    const x = paddingX + (idx / (chartPoints.length - 1)) * usableWidth;
    const y = chartHeight - paddingY - (pt.value / maxValue) * usableHeight;
    return { ...pt, x, y };
  });

  const pathD = points.reduce((acc, pt, idx, arr) => {
    if (idx === 0) return `M ${pt.x} ${pt.y}`;
    const prev = arr[idx - 1];
    const cp1x = prev.x + (pt.x - prev.x) / 2;
    const cp1y = prev.y;
    const cp2x = prev.x + (pt.x - prev.x) / 2;
    const cp2y = pt.y;
    return `${acc} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${pt.x} ${pt.y}`;
  }, '');

  const areaPathD = `${pathD} L ${points[points.length - 1].x} ${chartHeight - paddingY} L ${points[0].x} ${chartHeight - paddingY} Z`;

  // Status badge styling helper
  const getStatusBadge = (status: OrderRow['status']) => {
    switch (status) {
      case 'Delivered':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-600 border border-emerald-200">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            Delivered
          </span>
        );
      case 'Processing':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-600 border border-blue-200">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
            Processing
          </span>
        );
      case 'Confirmed':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-purple-50 text-purple-600 border border-purple-200">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
            Confirmed
          </span>
        );
      case 'Shipped':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-600 border border-amber-200">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
            Shipped
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700 border border-gray-200">
            <span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span>
            Pending
          </span>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] font-sans flex flex-col md:flex-row antialiased">
      {/* 1. Left Sidebar */}
      <aside className="w-full md:w-64 bg-white border-r border-slate-200/80 flex flex-col justify-between shrink-0">
        <div className="p-5">
          {/* Logo & Brand matching screenshot */}
          <div className="flex items-center gap-3 mb-7">
            <div className="w-10 h-10 rounded-xl bg-[#6342E8] flex items-center justify-center text-white shadow-sm shadow-purple-300">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C12 2 15 6 15 9.5C15 11.43 13.66 13 12 13C10.34 13 9 11.43 9 9.5C9 6 12 2 12 2Z" opacity="0.9" />
                <path d="M18 7C18 7 19 12 17 14.5C15.5 16 13 15.5 12 14C11 12.5 12 10 13.5 9C15.5 7.5 18 7 18 7Z" />
                <path d="M6 7C6 7 5 12 7 14.5C8.5 16 11 15.5 12 14C13 12.5 12 10 10.5 9C8.5 7.5 6 7 6 7Z" opacity="0.85" />
                <circle cx="12" cy="18.5" r="2.2" />
              </svg>
            </div>
            <div>
              <h1 className="text-lg font-extrabold tracking-tight text-[#0F172A] leading-tight">Deshi Food</h1>
              <p className="text-[10px] font-semibold text-[#6342E8] tracking-wider uppercase">Pure · Healthy · Traditional</p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            <button
              onClick={() => setActiveNav('dashboard')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                activeNav === 'dashboard'
                  ? 'bg-[#6342E8] text-white shadow-md shadow-purple-500/20'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Dashboard</span>
            </button>

            <button
              onClick={() => setActiveNav('orders')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                activeNav === 'orders'
                  ? 'bg-[#6342E8] text-white shadow-md shadow-purple-500/20'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-4 h-4" />
                <span>Orders</span>
              </div>
              <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                activeNav === 'orders' ? 'bg-white/20 text-white' : 'bg-purple-100 text-purple-700'
              }`}>
                12
              </span>
            </button>

            <button
              onClick={() => setActiveNav('products')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                activeNav === 'products'
                  ? 'bg-[#6342E8] text-white shadow-md shadow-purple-500/20'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <Package className="w-4 h-4" />
              <span>Products</span>
            </button>

            <button
              onClick={() => setActiveNav('categories')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                activeNav === 'categories'
                  ? 'bg-[#6342E8] text-white shadow-md shadow-purple-500/20'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
              <span>Categories</span>
            </button>

            <button
              onClick={() => setActiveNav('customers')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                activeNav === 'customers'
                  ? 'bg-[#6342E8] text-white shadow-md shadow-purple-500/20'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Customers</span>
            </button>

            <button
              onClick={() => setActiveNav('inventory')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                activeNav === 'inventory'
                  ? 'bg-[#6342E8] text-white shadow-md shadow-purple-500/20'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <Boxes className="w-4 h-4" />
              <span>Inventory</span>
            </button>

            <button
              onClick={() => setActiveNav('coupons')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                activeNav === 'coupons'
                  ? 'bg-[#6342E8] text-white shadow-md shadow-purple-500/20'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <Ticket className="w-4 h-4" />
              <span>Coupons</span>
            </button>

            <button
              onClick={() => setActiveNav('reviews')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                activeNav === 'reviews'
                  ? 'bg-[#6342E8] text-white shadow-md shadow-purple-500/20'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              <span>Reviews</span>
            </button>

            <button
              onClick={() => setActiveNav('analytics')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                activeNav === 'analytics'
                  ? 'bg-[#6342E8] text-white shadow-md shadow-purple-500/20'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <BarChart2 className="w-4 h-4" />
              <span>Analytics</span>
            </button>

            <button
              onClick={() => setActiveNav('settings')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                activeNav === 'settings'
                  ? 'bg-[#6342E8] text-white shadow-md shadow-purple-500/20'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <Settings className="w-4 h-4" />
              <span>Settings</span>
            </button>
          </nav>
        </div>

        {/* Bottom Banner Card in Sidebar */}
        <div className="p-4 pt-0">
          <div className="rounded-2xl p-4 bg-gradient-to-b from-[#FBF9FF] to-[#F5F0FF] border border-purple-100 relative overflow-hidden text-center space-y-2">
            <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto text-sm">
              🍃
            </div>
            <p className="text-xs text-slate-700 leading-relaxed font-medium">
              Bringing the <br />
              <strong className="text-purple-950 font-bold">true taste of Bangladesh</strong> <br />
              to your doorstep
            </p>

            {/* Bangladeshi Monuments Line Illustration SVG */}
            <div className="pt-2 opacity-60">
              <svg viewBox="0 0 200 45" fill="none" stroke="#8B5CF6" strokeWidth="1.2" className="w-full h-9">
                {/* Shaheed Minar representation */}
                <path d="M 90 40 L 90 12 L 94 10 L 98 12 L 98 40" />
                <path d="M 80 40 L 80 20 L 84 18 L 88 20 L 88 40" />
                <path d="M 100 40 L 100 20 L 104 18 L 108 20 L 108 40" />
                <circle cx="94" cy="22" r="6" stroke="#EF4444" strokeWidth="1.2" />
                {/* Jatiya Sangsad Bhaban representation */}
                <path d="M 30 40 L 30 25 L 45 15 L 60 25 L 60 40" />
                <path d="M 36 28 L 36 40 M 42 24 L 42 40 M 48 24 L 48 40 M 54 28 L 54 40" />
                <polygon points="45,18 40,24 50,24" />
                {/* Lalbagh Fort minarets */}
                <path d="M 140 40 L 140 22 L 144 18 L 148 22 L 148 40" />
                <path d="M 160 40 L 160 16 L 164 12 L 168 16 L 168 40" />
                <path d="M 10 40 L 190 40" stroke="#CBD5E1" strokeWidth="1" />
              </svg>
            </div>
          </div>
        </div>
      </aside>

      {/* 2. Main Workspace */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top Header Bar */}
        <header className="h-16 bg-white border-b border-slate-200/80 px-4 sm:px-8 flex items-center justify-between gap-4 sticky top-0 z-30">
          {/* Global Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search orders, products, customers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-14 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 text-slate-900 placeholder:text-slate-400 transition-all"
            />
            <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] font-semibold text-slate-400 bg-white border border-slate-200 px-1.5 py-0.5 rounded-md shadow-2xs">
              ⌘ K
            </span>
          </div>

          {/* Right Header Controls */}
          <div className="flex items-center gap-3">
            {/* Quick Switch to Live Store */}
            <button
              onClick={onBackToStore}
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors cursor-pointer"
              title="Return to customer shop"
            >
              <Store className="w-3.5 h-3.5 text-slate-500" />
              <span>ওয়েবসাইটে ফিরে যান</span>
            </button>

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                className="w-9 h-9 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-100 relative cursor-pointer transition-colors"
              >
                <Bell className="w-4 h-4" />
                <span className="w-4 h-4 rounded-full bg-rose-500 text-white text-[9px] font-bold flex items-center justify-center absolute -top-1 -right-1 shadow-xs">
                  3
                </span>
              </button>

              {isNotificationsOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-slate-200 p-3 z-50 text-xs space-y-2 animate-in fade-in duration-100">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <span className="font-bold text-slate-800">Notifications</span>
                    <span className="text-[10px] text-purple-600 font-semibold cursor-pointer">Mark all read</span>
                  </div>
                  <div className="space-y-1.5 text-slate-600">
                    <div className="p-2 rounded-lg bg-purple-50/60 border border-purple-100">
                      <p className="font-semibold text-purple-900">New Order #DF-10086</p>
                      <p className="text-[11px] text-slate-500">৳ 1,250 via bKash by Rafiul Islam</p>
                    </div>
                    <div className="p-2 rounded-lg bg-amber-50/60 border border-amber-100">
                      <p className="font-semibold text-amber-900">Low Stock Alert</p>
                      <p className="text-[11px] text-slate-500">Dates (Ajwa) has only 5 units left</p>
                    </div>
                    <div className="p-2 rounded-lg bg-emerald-50/60 border border-emerald-100">
                      <p className="font-semibold text-emerald-900">Payment Verified</p>
                      <p className="text-[11px] text-slate-500">Nagad TRX#98215892 approved</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Admin Profile Chip */}
            <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
              <div className="w-9 h-9 rounded-full bg-[#6342E8] text-white font-bold text-xs flex items-center justify-center shadow-xs">
                OF
              </div>
              <div className="hidden md:block text-left">
                <p className="text-xs font-bold text-slate-800 leading-tight">Omar Faruq</p>
                <p className="text-[10px] text-slate-400 font-medium leading-tight">Admin</p>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden md:block" />
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="p-4 sm:p-8 space-y-6">
          {/* Welcome Banner + Date Filter Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0F172A]">
                Welcome back, Omar!
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Here's what's happening with your store today.
              </p>
            </div>

            {/* Date Range Selector Pill */}
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-white border border-slate-200 shadow-2xs hover:bg-slate-50 text-slate-700 text-xs sm:text-sm font-semibold transition-colors cursor-pointer">
                <Calendar className="w-4 h-4 text-slate-500" />
                <span>{dateRange}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>
            </div>
          </div>

          {/* 3. 4 Key Stat Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Card 1: Total Sales */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-2xs space-y-3 relative overflow-hidden">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-[#6342E8] text-white flex items-center justify-center shadow-sm shadow-purple-200">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                {/* Mini purple sparkline */}
                <svg className="w-16 h-7 overflow-visible" viewBox="0 0 60 25" fill="none">
                  <path d="M 0 20 Q 15 15 25 18 T 45 8 T 60 4" stroke="#6342E8" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-500">Total Sales</p>
                <p className="text-2xl font-bold text-[#0F172A] tracking-tight mt-0.5">৳ 2,48,750</p>
              </div>
              <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-600">
                <span>↑ 12.5%</span>
                <span className="text-slate-400 font-normal">vs. last 7 days</span>
              </div>
            </div>

            {/* Card 2: Total Orders */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-2xs space-y-3 relative overflow-hidden">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-[#10B981] text-white flex items-center justify-center shadow-sm shadow-emerald-200">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                {/* Mini green sparkline */}
                <svg className="w-16 h-7 overflow-visible" viewBox="0 0 60 25" fill="none">
                  <path d="M 0 18 Q 15 22 28 14 T 48 8 T 60 5" stroke="#10B981" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-500">Total Orders</p>
                <p className="text-2xl font-bold text-[#0F172A] tracking-tight mt-0.5">186</p>
              </div>
              <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-600">
                <span>↑ 18.2%</span>
                <span className="text-slate-400 font-normal">vs. last 7 days</span>
              </div>
            </div>

            {/* Card 3: Total Customers */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-2xs space-y-3 relative overflow-hidden">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-[#3B82F6] text-white flex items-center justify-center shadow-sm shadow-blue-200">
                  <Users className="w-5 h-5" />
                </div>
                {/* Mini blue sparkline */}
                <svg className="w-16 h-7 overflow-visible" viewBox="0 0 60 25" fill="none">
                  <path d="M 0 22 Q 18 16 30 18 T 46 10 T 60 6" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-500">Total Customers</p>
                <p className="text-2xl font-bold text-[#0F172A] tracking-tight mt-0.5">142</p>
              </div>
              <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-600">
                <span>↑ 14.6%</span>
                <span className="text-slate-400 font-normal">vs. last 7 days</span>
              </div>
            </div>

            {/* Card 4: Total Products */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-2xs space-y-3 relative overflow-hidden">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-[#F59E0B] text-white flex items-center justify-center shadow-sm shadow-amber-200">
                  <Package className="w-5 h-5" />
                </div>
                {/* Mini amber sparkline */}
                <svg className="w-16 h-7 overflow-visible" viewBox="0 0 60 25" fill="none">
                  <path d="M 0 19 Q 15 22 26 15 T 44 14 T 60 6" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-500">Total Products</p>
                <p className="text-2xl font-bold text-[#0F172A] tracking-tight mt-0.5">48</p>
              </div>
              <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-600">
                <span>↑ 6.7%</span>
                <span className="text-slate-400 font-normal">vs. last 7 days</span>
              </div>
            </div>
          </div>

          {/* 4. Main Charts & Middle Insights Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left 8 Cols: Sales Overview + Top Selling Products */}
            <div className="lg:col-span-8 space-y-6">
              {/* Sales Overview Area & Column Chart */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-2xs space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h3 className="text-base font-bold text-[#0F172A]">Sales Overview</h3>
                    <p className="text-xs text-slate-400">Total sales in the last 7 days</p>
                  </div>
                  {/* Pills Switcher */}
                  <div className="flex items-center bg-slate-100 p-1 rounded-xl">
                    <button
                      onClick={() => setChartMetric('sales')}
                      className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                        chartMetric === 'sales'
                          ? 'bg-[#6342E8] text-white shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      Sales
                    </button>
                    <button
                      onClick={() => setChartMetric('orders')}
                      className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                        chartMetric === 'orders'
                          ? 'bg-[#6342E8] text-white shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      Orders
                    </button>
                    <button
                      onClick={() => setChartMetric('customers')}
                      className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                        chartMetric === 'customers'
                          ? 'bg-[#6342E8] text-white shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      Customers
                    </button>
                  </div>
                </div>

                {/* SVG Chart Container */}
                <div className="relative w-full overflow-x-auto pt-2">
                  <div className="min-w-[500px]">
                    <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full h-56">
                      <defs>
                        <linearGradient id="purpleAreaGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#6342E8" stopOpacity="0.18" />
                          <stop offset="100%" stopColor="#6342E8" stopOpacity="0.0" />
                        </linearGradient>
                      </defs>

                      {/* Horizontal Grid Lines */}
                      {[60000, 45000, 30000, 15000, 0].map((val) => {
                        const y = chartHeight - paddingY - (val / maxValue) * usableHeight;
                        return (
                          <g key={val}>
                            <text
                              x={paddingX - 10}
                              y={y + 3}
                              textAnchor="end"
                              className="text-[10px] fill-slate-400 font-sans"
                            >
                              ৳ {val.toLocaleString()}
                            </text>
                            <line
                              x1={paddingX}
                              y1={y}
                              x2={chartWidth - paddingX}
                              y2={y}
                              stroke="#F1F5F9"
                              strokeWidth="1"
                            />
                          </g>
                        );
                      })}

                      {/* Rounded Translucent Purple Columns behind each day (matching screenshot!) */}
                      {points.map((pt, i) => (
                        <rect
                          key={`col-${i}`}
                          x={pt.x - 14}
                          y={pt.y}
                          width={28}
                          height={chartHeight - paddingY - pt.y}
                          rx={6}
                          fill="#F3E8FF"
                          opacity="0.65"
                        />
                      ))}

                      {/* Filled Spline Area */}
                      <path d={areaPathD} fill="url(#purpleAreaGrad)" />

                      {/* Line Spline Stroke */}
                      <path
                        d={pathD}
                        fill="none"
                        stroke="#6342E8"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      />

                      {/* Node Dots & Tooltip Markers */}
                      {points.map((pt, idx) => (
                        <g key={`point-${idx}`} className="group cursor-pointer">
                          <circle
                            cx={pt.x}
                            cy={pt.y}
                            r={4.5}
                            fill="#6342E8"
                            stroke="#FFFFFF"
                            strokeWidth="2"
                            className="transition-transform group-hover:scale-125"
                          />
                          {/* X-axis date labels */}
                          <text
                            x={pt.x}
                            y={chartHeight - 8}
                            textAnchor="middle"
                            className="text-[10px] fill-slate-500 font-medium font-sans"
                          >
                            {pt.day}
                          </text>
                        </g>
                      ))}
                    </svg>
                  </div>
                </div>
              </div>

              {/* Top Selling Products List matching screenshot */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-2xs space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-[#0F172A]">Top Selling Products</h3>
                  <button
                    onClick={() => setActiveNav('products')}
                    className="text-xs font-semibold text-purple-600 hover:text-purple-700 flex items-center gap-1 cursor-pointer"
                  >
                    <span>View All</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="divide-y divide-slate-100">
                  {/* Product 1 */}
                  <div className="py-3 flex items-center justify-between gap-4 hover:bg-slate-50/60 rounded-xl px-2 transition-colors">
                    <div className="flex items-center gap-3 min-w-0">
                      <img
                        src="https://images.unsplash.com/photo-1596704017254-9b121068fb31?w=100&auto=format&fit=crop&q=80"
                        alt="Premium Dates (Ajwa)"
                        className="w-11 h-11 rounded-xl object-cover border border-slate-100 bg-slate-100 shrink-0"
                      />
                      <div className="truncate">
                        <p className="text-xs sm:text-sm font-bold text-slate-800 truncate">Premium Dates (Ajwa)</p>
                        <p className="text-[11px] text-slate-400 font-sans">1,245 sold</p>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-xs sm:text-sm font-bold text-slate-900">৳ 48,750</p>
                      <p className="text-[11px] font-semibold text-purple-600">24%</p>
                    </div>
                  </div>

                  {/* Product 2 */}
                  <div className="py-3 flex items-center justify-between gap-4 hover:bg-slate-50/60 rounded-xl px-2 transition-colors">
                    <div className="flex items-center gap-3 min-w-0">
                      <img
                        src="https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=100&auto=format&fit=crop&q=80"
                        alt="Pure Honey (500g)"
                        className="w-11 h-11 rounded-xl object-cover border border-slate-100 bg-slate-100 shrink-0"
                      />
                      <div className="truncate">
                        <p className="text-xs sm:text-sm font-bold text-slate-800 truncate">Pure Honey (500g)</p>
                        <p className="text-[11px] text-slate-400 font-sans">892 sold</p>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-xs sm:text-sm font-bold text-slate-900">৳ 35,600</p>
                      <p className="text-[11px] font-semibold text-purple-600">18%</p>
                    </div>
                  </div>

                  {/* Product 3 */}
                  <div className="py-3 flex items-center justify-between gap-4 hover:bg-slate-50/60 rounded-xl px-2 transition-colors">
                    <div className="flex items-center gap-3 min-w-0">
                      <img
                        src="https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?w=100&auto=format&fit=crop&q=80"
                        alt="Deshi Ghee (1kg)"
                        className="w-11 h-11 rounded-xl object-cover border border-slate-100 bg-slate-100 shrink-0"
                      />
                      <div className="truncate">
                        <p className="text-xs sm:text-sm font-bold text-slate-800 truncate">Deshi Ghee (1kg)</p>
                        <p className="text-[11px] text-slate-400 font-sans">756 sold</p>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-xs sm:text-sm font-bold text-slate-900">৳ 30,240</p>
                      <p className="text-[11px] font-semibold text-purple-600">15%</p>
                    </div>
                  </div>

                  {/* Product 4 */}
                  <div className="py-3 flex items-center justify-between gap-4 hover:bg-slate-50/60 rounded-xl px-2 transition-colors">
                    <div className="flex items-center gap-3 min-w-0">
                      <img
                        src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=100&auto=format&fit=crop&q=80"
                        alt="Spices Combo Pack"
                        className="w-11 h-11 rounded-xl object-cover border border-slate-100 bg-slate-100 shrink-0"
                      />
                      <div className="truncate">
                        <p className="text-xs sm:text-sm font-bold text-slate-800 truncate">Spices Combo Pack</p>
                        <p className="text-[11px] text-slate-400 font-sans">624 sold</p>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-xs sm:text-sm font-bold text-slate-900">৳ 24,960</p>
                      <p className="text-[11px] font-semibold text-purple-600">12%</p>
                    </div>
                  </div>

                  {/* Product 5 */}
                  <div className="py-3 flex items-center justify-between gap-4 hover:bg-slate-50/60 rounded-xl px-2 transition-colors">
                    <div className="flex items-center gap-3 min-w-0">
                      <img
                        src="https://images.unsplash.com/photo-1614735241165-6756e1df61ab?w=100&auto=format&fit=crop&q=80"
                        alt="Muri & Chanachur"
                        className="w-11 h-11 rounded-xl object-cover border border-slate-100 bg-slate-100 shrink-0"
                      />
                      <div className="truncate">
                        <p className="text-xs sm:text-sm font-bold text-slate-800 truncate">Muri & Chanachur</p>
                        <p className="text-[11px] text-slate-400 font-sans">512 sold</p>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-xs sm:text-sm font-bold text-slate-900">৳ 18,200</p>
                      <p className="text-[11px] font-semibold text-purple-600">10%</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right 4 Cols: Order Status Donut + Inventory Alerts + Promotional Card */}
            <div className="lg:col-span-4 space-y-6">
              {/* Order Status Donut Chart */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-2xs space-y-4">
                <div>
                  <h3 className="text-base font-bold text-[#0F172A]">Order Status</h3>
                  <p className="text-xs text-slate-400">Last 7 days</p>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-6 justify-center">
                  {/* SVG Donut */}
                  <div className="relative w-36 h-36 shrink-0 flex items-center justify-center">
                    <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                      {/* Circumference = 2 * PI * 38 ≈ 238.76 */}
                      {/* Confirmed 42% -> 100.28 */}
                      <circle
                        cx="50"
                        cy="50"
                        r="38"
                        fill="transparent"
                        stroke="#3B82F6"
                        strokeWidth="12"
                        strokeDasharray="100.28 238.76"
                        strokeDashoffset="0"
                      />
                      {/* Processing 25% -> 59.69 */}
                      <circle
                        cx="50"
                        cy="50"
                        r="38"
                        fill="transparent"
                        stroke="#8B5CF6"
                        strokeWidth="12"
                        strokeDasharray="59.69 238.76"
                        strokeDashoffset="-100.28"
                      />
                      {/* Shipped 14% -> 33.42 */}
                      <circle
                        cx="50"
                        cy="50"
                        r="38"
                        fill="transparent"
                        stroke="#06B6D4"
                        strokeWidth="12"
                        strokeDasharray="33.42 238.76"
                        strokeDashoffset="-159.97"
                      />
                      {/* Pending 13% -> 31.03 */}
                      <circle
                        cx="50"
                        cy="50"
                        r="38"
                        fill="transparent"
                        stroke="#F59E0B"
                        strokeWidth="12"
                        strokeDasharray="31.03 238.76"
                        strokeDashoffset="-193.39"
                      />
                      {/* Delivered 6% -> 14.32 */}
                      <circle
                        cx="50"
                        cy="50"
                        r="38"
                        fill="transparent"
                        stroke="#10B981"
                        strokeWidth="12"
                        strokeDasharray="14.32 238.76"
                        strokeDashoffset="-224.42"
                      />
                    </svg>

                    {/* Donut Center */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
                      <span className="text-xl font-extrabold text-slate-900 leading-tight">186</span>
                      <span className="text-[10px] text-slate-400 font-medium">Total Orders</span>
                    </div>
                  </div>

                  {/* Legend List */}
                  <div className="w-full space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-2 text-slate-600">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]"></span>
                        Pending
                      </span>
                      <span className="font-semibold text-slate-900">24 <span className="text-slate-400 font-normal">13%</span></span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-2 text-slate-600">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#3B82F6]"></span>
                        Confirmed
                      </span>
                      <span className="font-semibold text-slate-900">78 <span className="text-slate-400 font-normal">42%</span></span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-2 text-slate-600">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#8B5CF6]"></span>
                        Processing
                      </span>
                      <span className="font-semibold text-slate-900">46 <span className="text-slate-400 font-normal">25%</span></span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-2 text-slate-600">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#06B6D4]"></span>
                        Shipped
                      </span>
                      <span className="font-semibold text-slate-900">26 <span className="text-slate-400 font-normal">14%</span></span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-2 text-slate-600">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]"></span>
                        Delivered
                      </span>
                      <span className="font-semibold text-slate-900">12 <span className="text-slate-400 font-normal">6%</span></span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Inventory Alerts matching screenshot */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-2xs space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-slate-500" />
                    <h3 className="text-base font-bold text-[#0F172A]">Inventory Alerts</h3>
                  </div>
                  <button
                    onClick={() => setActiveNav('inventory')}
                    className="text-xs font-semibold text-purple-600 hover:text-purple-700 flex items-center gap-1 cursor-pointer"
                  >
                    <span>View All</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="space-y-2.5">
                  {/* Alert 1 */}
                  <div className="p-3 rounded-xl bg-rose-50/70 border border-rose-100 flex items-center gap-3">
                    <div className="w-7 h-7 rounded-lg bg-rose-500 text-white flex items-center justify-center shrink-0">
                      <AlertOctagon className="w-4 h-4" />
                    </div>
                    <div className="truncate">
                      <p className="text-xs font-bold text-slate-900 truncate">Dates (Ajwa)</p>
                      <p className="text-[11px] text-rose-600 font-semibold">Only 5 left in stock</p>
                    </div>
                  </div>

                  {/* Alert 2 */}
                  <div className="p-3 rounded-xl bg-rose-50/70 border border-rose-100 flex items-center gap-3">
                    <div className="w-7 h-7 rounded-lg bg-rose-500 text-white flex items-center justify-center shrink-0">
                      <AlertOctagon className="w-4 h-4" />
                    </div>
                    <div className="truncate">
                      <p className="text-xs font-bold text-slate-900 truncate">Pure Honey (500g)</p>
                      <p className="text-[11px] text-rose-600 font-semibold">Only 8 left in stock</p>
                    </div>
                  </div>

                  {/* Alert 3 */}
                  <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-100 flex items-center gap-3">
                    <div className="w-7 h-7 rounded-lg bg-amber-500 text-white flex items-center justify-center shrink-0">
                      <AlertTriangle className="w-4 h-4" />
                    </div>
                    <div className="truncate">
                      <p className="text-xs font-bold text-slate-900 truncate">Mustard Oil (1L)</p>
                      <p className="text-[11px] text-amber-600 font-semibold">Only 12 left in stock</p>
                    </div>
                  </div>

                  {/* Alert 4 */}
                  <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-100 flex items-center gap-3">
                    <div className="w-7 h-7 rounded-lg bg-amber-500 text-white flex items-center justify-center shrink-0">
                      <AlertTriangle className="w-4 h-4" />
                    </div>
                    <div className="truncate">
                      <p className="text-xs font-bold text-slate-900 truncate">Red Chilli Powder</p>
                      <p className="text-[11px] text-amber-600 font-semibold">Low stock (20 left)</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Promotional Brand Card matching screenshot */}
              <div className="rounded-2xl p-5 bg-gradient-to-br from-[#F6F0FF] via-[#FAF5FF] to-[#EDE4FF] border border-purple-200/80 shadow-2xs space-y-3 relative overflow-hidden">
                <div className="relative z-10 space-y-1">
                  <h4 className="text-base font-bold text-purple-950">Authentic Deshi Food</h4>
                  <p className="text-xs text-purple-700">Fresh. Natural. Healthy.</p>
                  <div className="pt-2">
                    <button
                      onClick={() => setActiveNav('products')}
                      className="px-4 py-2 bg-[#6342E8] hover:bg-[#5233d6] text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm shadow-purple-500/20"
                    >
                      <span>Manage Products</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Decorative product image collage on the right corner */}
                <div className="absolute right-2 bottom-1 w-32 h-24 pointer-events-none opacity-90">
                  <img
                    src="https://images.unsplash.com/photo-1596704017254-9b121068fb31?w=200&auto=format&fit=crop&q=80"
                    alt="Deshi Food items"
                    className="w-full h-full object-contain filter drop-shadow-md"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* 5. Recent Orders Table matching screenshot */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-[#0F172A]">Recent Orders</h3>
              </div>
              <button
                onClick={() => setActiveNav('orders')}
                className="text-xs font-semibold text-purple-600 hover:text-purple-700 flex items-center gap-1 cursor-pointer"
              >
                <span>View All Orders</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/60 text-[11px] font-bold text-slate-400 border-b border-slate-100">
                    <th className="py-3 px-4 w-10">#</th>
                    <th className="py-3 px-4">Order ID</th>
                    <th className="py-3 px-4">Customer</th>
                    <th className="py-3 px-4">Items</th>
                    <th className="py-3 px-4">Amount</th>
                    <th className="py-3 px-4">Payment</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Date</th>
                    <th className="py-3 px-4 w-10"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs">
                  {ordersList.map((ord) => (
                    <tr
                      key={ord.orderId}
                      className="hover:bg-slate-50/70 transition-colors cursor-pointer"
                      onClick={() => setSelectedOrder(ord)}
                    >
                      <td className="py-3.5 px-4 text-slate-400 font-mono">{ord.num}</td>
                      <td className="py-3.5 px-4 font-bold text-slate-800 font-mono">{ord.orderId}</td>
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2.5">
                          <img
                            src={ord.customerAvatar}
                            alt={ord.customerName}
                            className="w-7 h-7 rounded-full object-cover border border-slate-200"
                          />
                          <span className="font-semibold text-slate-800">{ord.customerName}</span>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-slate-500 font-sans">{ord.itemsCount} items</td>
                      <td className="py-3.5 px-4 font-bold text-slate-900 font-sans">৳ {ord.amount.toLocaleString()}</td>
                      <td className="py-3.5 px-4 text-slate-600 font-medium">{ord.paymentMethod}</td>
                      <td className="py-3.5 px-4">{getStatusBadge(ord.status)}</td>
                      <td className="py-3.5 px-4 text-slate-400 text-[11px] font-sans whitespace-nowrap">{ord.date}</td>
                      <td className="py-3.5 px-4 text-right">
                        <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-slate-500" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>

      {/* Order Detail Slide-Over / Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-slate-200 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-900 text-base">{selectedOrder.orderId} Details</span>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl">
                <img
                  src={selectedOrder.customerAvatar}
                  alt={selectedOrder.customerName}
                  className="w-10 h-10 rounded-full object-cover border border-slate-200"
                />
                <div>
                  <p className="font-bold text-sm text-slate-800">{selectedOrder.customerName}</p>
                  <p className="text-slate-400">{selectedOrder.date}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-slate-50 rounded-xl">
                  <p className="text-slate-400 text-[10px]">Payment Method</p>
                  <p className="font-bold text-slate-800 mt-0.5">{selectedOrder.paymentMethod}</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl">
                  <p className="text-slate-400 text-[10px]">Total Amount</p>
                  <p className="font-bold text-purple-700 mt-0.5 text-sm">৳ {selectedOrder.amount}</p>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-slate-600 font-semibold text-xs">Change Order Status</label>
                <div className="grid grid-cols-2 gap-2">
                  {(['Confirmed', 'Processing', 'Shipped', 'Delivered'] as const).map((st) => (
                    <button
                      key={st}
                      onClick={() => {
                        setOrdersList((prev) =>
                          prev.map((o) => (o.orderId === selectedOrder.orderId ? { ...o, status: st } : o))
                        );
                        setSelectedOrder((prev) => (prev ? { ...prev, status: st } : null));
                      }}
                      className={`py-2 px-3 rounded-xl font-semibold text-xs border text-center transition-all cursor-pointer ${
                        selectedOrder.status === st
                          ? 'bg-purple-600 text-white border-purple-600 shadow-xs'
                          : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-2 flex gap-3">
              <button
                onClick={() => setSelectedOrder(null)}
                className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
