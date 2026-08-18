import React, { useState, useEffect, useMemo } from 'react';
import {
  User,
  MenuItem,
  CartItem,
  Order,
  FoodCategory,
  OrderStatus,
} from './types';
import { INITIAL_MENU_ITEMS, DEMO_USERS } from './data/mockMenu';
import { Navbar } from './components/Navbar';
import { QuickActions } from './components/QuickActions';
import { RecommendedSection } from './components/RecommendedSection';
import { LiveCanteenStatus } from './components/LiveCanteenStatus';
import { MenuFilterBar } from './components/MenuFilterBar';
import { FoodCard } from './components/FoodCard';
import { MobileBottomNav } from './components/MobileBottomNav';
import { CartDrawer } from './components/CartDrawer';
import { TokenTracker } from './components/TokenTracker';
import { OrderHistoryView } from './components/OrderHistoryView';
import { AuthModal } from './components/AuthModal';
import { WalletModal } from './components/WalletModal';
import { sounds } from './utils/audio';
import { Sparkles, Utensils, Zap, Flame } from 'lucide-react';

export default function App() {
  // 1. User & Auth State (Persistent)
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('canteenx_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return DEMO_USERS.student;
      }
    }
    return DEMO_USERS.student;
  });

  // 2. Menu State
  const [menuItems, setMenuItems] = useState<MenuItem[]>(() => {
    const saved = localStorage.getItem('canteenx_menu');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return INITIAL_MENU_ITEMS;
      }
    }
    return INITIAL_MENU_ITEMS;
  });

  // 3. Cart State
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('canteenx_cart');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return [];
      }
    }
    return [];
  });

  // 4. Favorites State
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem('canteenx_favorites');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return ['m1', 'm2', 'm6'];
      }
    }
    return ['m1', 'm2', 'm6'];
  });

  // 5. Orders & Active Token State
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('canteenx_orders');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return [
          {
            id: 'ord_init_01',
            tokenNumber: '#A-27',
            items: [
              { menuItem: INITIAL_MENU_ITEMS[0], quantity: 1 },
              { menuItem: INITIAL_MENU_ITEMS[7], quantity: 1 },
            ],
            subtotal: 240,
            discount: 24,
            total: 216,
            paymentMethod: 'upi',
            paymentStatus: 'paid',
            status: 'preparing',
            createdAt: '12:30 PM',
            estimatedPickupTime: '12:35 PM',
            userRole: 'student',
            userName: 'Aarav Sharma',
            userIdCard: '2024-CSE-084',
            counterNumber: 'Counter 01 - Hot Dum Biryani',
            specialInstructions: 'Medium spicy, extra salan',
          },
        ];
      }
    }
    return [
      {
        id: 'ord_init_01',
        tokenNumber: '#A-27',
        items: [
          { menuItem: INITIAL_MENU_ITEMS[0], quantity: 1 },
          { menuItem: INITIAL_MENU_ITEMS[7], quantity: 1 },
        ],
        subtotal: 240,
        discount: 24,
        total: 216,
        paymentMethod: 'upi',
        paymentStatus: 'paid',
        status: 'preparing',
        createdAt: '12:30 PM',
        estimatedPickupTime: '12:35 PM',
        userRole: 'student',
        userName: 'Aarav Sharma',
        userIdCard: '2024-CSE-084',
        counterNumber: 'Counter 01 - Hot Dum Biryani',
        specialInstructions: 'Medium spicy, extra salan',
      },
    ];
  });

  const [activeOrderId, setActiveOrderId] = useState<string | null>(() => {
    return orders[0]?.id || null;
  });

  // 6. Navigation & UI Modals
  const [currentTab, setCurrentTab] = useState<'menu' | 'tracker' | 'history'>('menu');
  const [isAuthOpen, setIsAuthOpen] = useState<boolean>(false);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isWalletOpen, setIsWalletOpen] = useState<boolean>(false);

  // 7. Filter & Search State
  const [selectedCategory, setSelectedCategory] = useState<FoodCategory>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [dietFilter, setDietFilter] = useState<'all' | 'veg' | 'non-veg'>('all');
  const [sortBy, setSortBy] = useState<'popular' | 'price-low' | 'price-high' | 'prep-time'>('popular');

  // Persistence to LocalStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem('canteenx_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('canteenx_user');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('canteenx_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('canteenx_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('canteenx_favorites', JSON.stringify(favorites));
  }, [favorites]);

  // Toggle favorite
  const handleToggleFavorite = (itemId: string) => {
    setFavorites((prev) =>
      prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]
    );
  };

  // Derived active order
  const activeOrder = useMemo(() => {
    return orders.find((o) => o.id === activeOrderId) || orders[0] || null;
  }, [orders, activeOrderId]);

  // Filtered & Sorted Menu Items
  const filteredMenuItems = useMemo(() => {
    let result = [...menuItems];

    // Category filter
    if (selectedCategory === 'popular') {
      result = result.filter((i) => i.tags.includes('bestseller') || i.rating >= 4.7);
    } else if (selectedCategory !== 'all') {
      result = result.filter((i) => i.category === selectedCategory);
    }

    // Diet filter
    if (dietFilter === 'veg') {
      result = result.filter((i) => i.isVeg);
    } else if (dietFilter === 'non-veg') {
      result = result.filter((i) => !i.isVeg);
    }

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (i) =>
          i.name.toLowerCase().includes(q) ||
          i.description.toLowerCase().includes(q) ||
          i.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    // Sorting
    if (sortBy === 'popular') {
      result.sort((a, b) => b.rating * b.reviewCount - a.rating * a.reviewCount);
    } else if (sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'prep-time') {
      result.sort((a, b) => a.prepTimeMinutes - b.prepTimeMinutes);
    }

    return result;
  }, [menuItems, selectedCategory, dietFilter, searchQuery, sortBy]);

  // Cart operations
  const handleAddToCart = (item: MenuItem, selectedOption?: string, cookingNote?: string) => {
    if (!item.inStock || item.stockCount === 0) return;

    setCart((prev) => {
      const existingIndex = prev.findIndex((ci) => ci.menuItem.id === item.id);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += 1;
        if (selectedOption) updated[existingIndex].selectedOption = selectedOption;
        if (cookingNote) updated[existingIndex].cookingNote = cookingNote;
        return updated;
      } else {
        return [
          ...prev,
          {
            menuItem: item,
            quantity: 1,
            selectedOption,
            cookingNote,
          },
        ];
      }
    });
  };

  const handleUpdateQuantity = (itemId: string, delta: number) => {
    setCart((prev) => {
      const existing = prev.find((ci) => ci.menuItem.id === itemId);
      if (!existing) return prev;

      const newQty = existing.quantity + delta;
      if (newQty <= 0) {
        return prev.filter((ci) => ci.menuItem.id !== itemId);
      } else {
        return prev.map((ci) =>
          ci.menuItem.id === itemId ? { ...ci, quantity: newQty } : ci
        );
      }
    });
  };

  const handleRemoveItem = (itemId: string) => {
    sounds.playPop();
    setCart((prev) => prev.filter((ci) => ci.menuItem.id !== itemId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // Place Order & Generate Unique Token
  const handlePlaceOrder = ({
    paymentMethod,
    specialInstructions,
  }: {
    paymentMethod: 'upi' | 'counter' | 'id_wallet';
    specialInstructions: string;
  }) => {
    if (!user || cart.length === 0) return;

    // Generate Token ID e.g. #A-27, #B-104
    const prefixLetter = ['A', 'B', 'C', 'D'][Math.floor(Math.random() * 4)];
    const tokenNumber = `#${prefixLetter}-${Math.floor(10 + Math.random() * 90)}`;

    const subtotal = cart.reduce((acc, item) => acc + item.menuItem.price * item.quantity, 0);
    const discountRate = user.role === 'student' || user.role === 'faculty' ? 0.1 : 0;
    const discount = Math.round(subtotal * discountRate);
    const total = Math.max(0, subtotal - discount);

    const hasBeverageOnly = cart.every((ci) => ci.menuItem.category === 'beverages');
    const hasSouthIndian = cart.some((ci) => ci.menuItem.category === 'south_indian');
    const counterNumber = hasBeverageOnly
      ? 'Counter 03 - Cold Brew & Shakes'
      : hasSouthIndian
      ? 'Counter 02 - South Indian Tiffins'
      : 'Counter 01 - Hot Dum Biryani & Rolls';

    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const pickupTime = new Date(now.getTime() + 8 * 60000).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });

    const newOrder: Order = {
      id: `ord_${Date.now()}`,
      tokenNumber,
      items: [...cart],
      subtotal,
      discount,
      total,
      paymentMethod,
      paymentStatus: paymentMethod === 'counter' ? 'pending' : 'paid',
      status: 'received',
      createdAt: timeString,
      estimatedPickupTime: pickupTime,
      specialInstructions: specialInstructions || undefined,
      userRole: user.role,
      userName: user.name,
      userIdCard: user.idCardNumber,
      counterNumber,
    };

    if (paymentMethod === 'id_wallet') {
      setUser((prev) => (prev ? { ...prev, walletBalance: prev.walletBalance - total } : null));
    }

    setMenuItems((prev) =>
      prev.map((mi) => {
        const orderedItem = cart.find((ci) => ci.menuItem.id === mi.id);
        if (orderedItem) {
          const newCount = Math.max(0, mi.stockCount - orderedItem.quantity);
          return {
            ...mi,
            stockCount: newCount,
            inStock: newCount > 0,
          };
        }
        return mi;
      })
    );

    setOrders((prev) => [newOrder, ...prev]);
    setActiveOrderId(newOrder.id);
    setCart([]);
    setCurrentTab('tracker');
  };

  const handleAdvanceOrderStatus = (orderId: string, nextStatus: OrderStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: nextStatus } : o))
    );
  };

  const handleAddFunds = (amount: number) => {
    if (!user) return;
    setUser((prev) => (prev ? { ...prev, walletBalance: prev.walletBalance + amount } : null));
  };

  const handleReorder = (historicOrder: Order) => {
    sounds.playPop();
    setCart((prev) => {
      const merged = [...prev];
      historicOrder.items.forEach((item) => {
        const found = merged.find((m) => m.menuItem.id === item.menuItem.id);
        if (found) {
          found.quantity += item.quantity;
        } else {
          merged.push({ ...item });
        }
      });
      return merged;
    });
    setIsCartOpen(true);
  };

  const totalCartCount = cart.reduce((acc, i) => acc + i.quantity, 0);

  return (
    <div className="min-h-screen bg-[#0B0B14] text-[#F8FAFC] flex flex-col font-sans selection:bg-[#8B5CF6] selection:text-white pb-16 md:pb-0 relative overflow-x-hidden">
      {/* 1. Futuristic Glassmorphism Navbar */}
      <Navbar
        user={user}
        onOpenAuth={() => setIsAuthOpen(true)}
        onLogout={() => {
          setUser(null);
          setIsAuthOpen(true);
        }}
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        activeOrder={activeOrder}
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        onRechargeWallet={() => setIsWalletOpen(true)}
      />

      {/* 2. Main Content View Router */}
      <main className="flex-1">
        {currentTab === 'menu' && (
          <div className="space-y-8 sm:space-y-10 pt-6">
            {/* Top Dashboard Section: Quick Actions + Live Status + Recommended */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
              {/* Row: Quick Actions & Live Canteen Status */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <QuickActions
                    onBrowseMenu={() => {
                      const el = document.getElementById('menu-items-grid');
                      el?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    onViewToken={() => setCurrentTab('tracker')}
                    onOpenCard={() => setIsWalletOpen(true)}
                  />
                </div>

                <div className="lg:col-span-1 flex flex-col justify-end">
                  <LiveCanteenStatus
                    activeOrdersCount={orders.filter((o) => o.status !== 'completed').length}
                  />
                </div>
              </div>

              {/* Recommended For You Section */}
              <RecommendedSection
                items={menuItems}
                cart={cart}
                onAddToCart={handleAddToCart}
                favorites={favorites}
                onToggleFavorite={handleToggleFavorite}
              />
            </div>

            {/* Menu Browsing & Filtering Container */}
            <div id="menu-items-grid" className="max-w-7xl mx-auto px-4 sm:px-6 py-4 space-y-6">
              <div className="flex items-center justify-between border-b border-[#221F42] pb-4">
                <div className="text-left">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#22D3EE] animate-pulse"></span>
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#22D3EE]">
                      Live Kitchen Terminal
                    </span>
                  </div>
                  <h2 className="font-display font-bold text-2xl sm:text-3xl text-white tracking-tight">
                    Explore Full Menu
                  </h2>
                </div>

                <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-400 font-mono">
                  <Flame className="w-4 h-4 text-[#8B5CF6]" />
                  <span>{filteredMenuItems.length} Dishes Ready</span>
                </div>
              </div>

              {/* Category & Filter Bar */}
              <MenuFilterBar
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                dietFilter={dietFilter}
                onDietFilterChange={setDietFilter}
                sortBy={sortBy}
                onSortByChange={setSortBy}
                totalCount={filteredMenuItems.length}
              />

              {/* Food Items Grid */}
              {filteredMenuItems.length === 0 ? (
                <div className="bg-[#131226]/80 border border-[#221F42] p-12 text-center rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
                  <div className="w-16 h-16 rounded-2xl bg-[#8B5CF6]/15 border border-[#8B5CF6]/40 mx-auto mb-3 flex items-center justify-center text-3xl">
                    🔍
                  </div>
                  <h3 className="font-display font-bold text-xl text-white">No Dishes Found</h3>
                  <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                    Try searching for another dish or clear the filters to view all canteen meals.
                  </p>
                  <button
                    onClick={() => {
                      sounds.playPop();
                      setSearchQuery('');
                      setSelectedCategory('all');
                      setDietFilter('all');
                    }}
                    className="mt-4 bg-[#8B5CF6] hover:bg-[#7C3AED] text-white px-5 py-2 rounded-full font-bold text-xs shadow-[0_0_15px_rgba(139,92,246,0.4)] cursor-pointer transition-colors"
                  >
                    Reset Filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6">
                  {filteredMenuItems.map((item) => {
                    const cartItem = cart.find((ci) => ci.menuItem.id === item.id);
                    return (
                      <FoodCard
                        key={item.id}
                        item={item}
                        cartItem={cartItem}
                        onAddToCart={(i) => handleAddToCart(i)}
                        onUpdateQuantity={handleUpdateQuantity}
                      />
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}

        {currentTab === 'tracker' && (
          <div className="px-4 sm:px-6 py-8">
            <TokenTracker
              order={activeOrder}
              allOrders={orders}
              onSelectOrder={(o) => setActiveOrderId(o.id)}
              onAdvanceOrderStatus={handleAdvanceOrderStatus}
              onBrowseMenu={() => setCurrentTab('menu')}
            />
          </div>
        )}

        {currentTab === 'history' && (
          <div className="px-4 sm:px-6 py-8">
            <OrderHistoryView
              orders={orders}
              onTrackOrder={(o) => {
                setActiveOrderId(o.id);
                setCurrentTab('tracker');
              }}
              onReorder={handleReorder}
              onBrowseMenu={() => setCurrentTab('menu')}
            />
          </div>
        )}
      </main>

      {/* 3. Futuristic Footer */}
      <footer className="bg-[#08080E] border-t border-[#1E1B38] py-8 px-4 sm:px-6 mt-12 text-left">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display font-black text-xl text-white tracking-wider">
                CANTEEN<span className="text-[#22D3EE]">X</span>
              </span>
              <span className="text-xs font-mono text-slate-500">
                // CAMPUS FOOD NETWORK
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-2 max-w-md">
              Futuristic college canteen online ordering platform with real-time live tokens, smart tray management, and contactless counter pickup.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <span className="text-xs font-mono bg-[#131226] text-emerald-400 px-3 py-1 rounded-full border border-emerald-500/30">
              🟢 SERVER CONNECTED
            </span>
            <span className="text-xs font-mono bg-[#131226] text-[#22D3EE] px-3 py-1 rounded-full border border-[#22D3EE]/30">
              ⚡ LIVE TOKEN BROADCAST
            </span>
          </div>
        </div>
      </footer>

      {/* 4. Mobile Bottom Navigation */}
      <MobileBottomNav
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        onOpenAuth={() => setIsAuthOpen(true)}
        isLoggedIn={!!user}
        activeOrderExists={!!activeOrder && activeOrder.status !== 'completed'}
      />

      {/* 5. Modals & Drawers */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onLoginSuccess={(loggedInUser) => {
          setUser(loggedInUser);
        }}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        user={user}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        onPlaceOrder={handlePlaceOrder}
        onOpenAuth={() => setIsAuthOpen(true)}
        onRechargeWallet={() => setIsWalletOpen(true)}
      />

      <WalletModal
        isOpen={isWalletOpen}
        onClose={() => setIsWalletOpen(false)}
        user={user}
        onAddFunds={handleAddFunds}
      />
    </div>
  );
}
