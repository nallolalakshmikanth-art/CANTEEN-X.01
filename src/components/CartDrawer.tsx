import React, { useState } from 'react';
import { CartItem, User, Order } from '../types';
import { X, Plus, Minus, Trash2, ArrowRight, QrCode, Wallet, Banknote, ShieldCheck, Tag, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sounds } from '../utils/audio';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  user: User | null;
  onUpdateQuantity: (itemId: string, delta: number) => void;
  onRemoveItem: (itemId: string) => void;
  onClearCart: () => void;
  onPlaceOrder: (orderData: {
    paymentMethod: 'upi' | 'counter' | 'id_wallet';
    specialInstructions: string;
  }) => void;
  onOpenAuth: () => void;
  onRechargeWallet: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  user,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onPlaceOrder,
  onOpenAuth,
  onRechargeWallet,
}) => {
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'counter' | 'id_wallet'>('upi');
  const [specialInstructions, setSpecialInstructions] = useState<string>('');
  const [isCheckingOut, setIsCheckingOut] = useState<boolean>(false);
  const [selectedUpiApp, setSelectedUpiApp] = useState<string>('gpay');

  if (!isOpen) return null;

  // Calculate pricing
  const subtotal = cartItems.reduce((acc, item) => acc + item.menuItem.price * item.quantity, 0);
  
  // 10% Campus Subsidy discount for Students and Faculty
  const discountRate = user?.role === 'student' || user?.role === 'faculty' ? 0.1 : 0;
  const discount = Math.round(subtotal * discountRate);
  const total = Math.max(0, subtotal - discount);

  const canUseWallet = user && user.walletBalance >= total;

  const handleCheckout = () => {
    if (!user) {
      sounds.playPop();
      onOpenAuth();
      return;
    }

    if (cartItems.length === 0) return;

    if (paymentMethod === 'id_wallet' && !canUseWallet) {
      sounds.playPop();
      onRechargeWallet();
      return;
    }

    setIsCheckingOut(true);

    setTimeout(() => {
      setIsCheckingOut(false);
      sounds.playOrderPlaced();
      
      // Blast confetti
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#8B5CF6', '#22D3EE', '#F43F5E', '#F8FAFC'],
      });

      onPlaceOrder({
        paymentMethod,
        specialInstructions: specialInstructions.trim(),
      });
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Dark Backdrop */}
      <div
        onClick={() => {
          sounds.playPop();
          onClose();
        }}
        className="absolute inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
      />

      {/* Slide Drawer */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#0B0B14]/95 border-l border-[#221F42] shadow-[-16px_0_40px_rgba(0,0,0,0.8)] backdrop-blur-2xl flex flex-col justify-between text-left">
          {/* Header */}
          <div className="p-5 sm:p-6 bg-[#131226]/90 border-b border-[#221F42] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#8B5CF6]/20 border border-[#8B5CF6]/50 flex items-center justify-center font-display font-black text-xs text-[#22D3EE] shadow-[0_0_12px_rgba(139,92,246,0.4)]">
                CX
              </div>
              <div>
                <h2 className="font-display font-bold text-xl text-white leading-none">
                  Your Food Tray
                </h2>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  {cartItems.reduce((acc, i) => acc + i.quantity, 0)} Items Selected
                </p>
              </div>
            </div>

            <button
              id="close-cart-btn"
              onClick={() => {
                sounds.playPop();
                onClose();
              }}
              className="w-8 h-8 rounded-full bg-[#131226] border border-[#2A274E] text-slate-400 hover:text-white flex items-center justify-center cursor-pointer transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cartItems.length === 0 ? (
              <div className="py-16 text-center space-y-3">
                <div className="w-16 h-16 rounded-2xl bg-[#131226] border border-[#221F42] mx-auto flex items-center justify-center text-3xl shadow-[0_0_25px_rgba(139,92,246,0.15)]">
                  🍽️
                </div>
                <h3 className="font-display font-bold text-lg text-white">Your Tray is Empty</h3>
                <p className="text-xs text-slate-400 max-w-xs mx-auto">
                  Add Chicken Biryani, Burgers, Fries or Masala Dosa to generate your live token!
                </p>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between pb-1">
                  <span className="text-xs font-mono uppercase text-slate-400">
                    Selected Dishes
                  </span>
                  <button
                    onClick={() => {
                      sounds.playPop();
                      onClearCart();
                    }}
                    className="text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1 cursor-pointer"
                  >
                    <Trash2 className="w-3 h-3" /> Clear Tray
                  </button>
                </div>

                {cartItems.map((item) => (
                  <div
                    key={item.menuItem.id}
                    className="bg-[#131226]/80 border border-[#221F42] p-3 rounded-2xl flex items-center justify-between gap-3 shadow-[0_4px_16px_rgba(0,0,0,0.3)]"
                  >
                    <img
                      src={item.menuItem.image}
                      alt={item.menuItem.name}
                      className="w-13 h-13 rounded-xl object-cover border border-white/10 shrink-0"
                    />

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1">
                        <span
                          className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                            item.menuItem.isVeg ? 'bg-emerald-400' : 'bg-rose-400'
                          }`}
                        />
                        <h4 className="font-display font-bold text-xs sm:text-sm text-white truncate">
                          {item.menuItem.name}
                        </h4>
                      </div>

                      {item.selectedOption && (
                        <p className="text-[10px] text-[#22D3EE] font-mono inline-block">
                          {item.selectedOption}
                        </p>
                      )}

                      {item.cookingNote && (
                        <p className="text-[10px] italic text-slate-400 truncate">
                          &quot;{item.cookingNote}&quot;
                        </p>
                      )}

                      <p className="font-mono font-bold text-xs text-white mt-1">
                        ₹{item.menuItem.price * item.quantity}
                      </p>
                    </div>

                    {/* Stepper */}
                    <div className="flex items-center bg-[#8B5CF6]/20 border border-[#8B5CF6]/50 rounded-full px-1.5 py-0.5">
                      <button
                        onClick={() => {
                          sounds.playPop();
                          onUpdateQuantity(item.menuItem.id, -1);
                        }}
                        className="w-5 h-5 flex items-center justify-center rounded-full text-slate-300 hover:text-white cursor-pointer"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="font-mono font-bold text-xs text-white px-2">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => {
                          sounds.playPop();
                          onUpdateQuantity(item.menuItem.id, 1);
                        }}
                        className="w-5 h-5 flex items-center justify-center rounded-full text-slate-300 hover:text-white cursor-pointer"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}

                {/* Special Instructions Input */}
                <div className="pt-2">
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Special Kitchen Notes:
                  </label>
                  <textarea
                    rows={2}
                    value={specialInstructions}
                    onChange={(e) => setSpecialInstructions(e.target.value)}
                    placeholder="e.g., Extra spicy, pack sambar separately..."
                    className="w-full bg-[#131226] border border-[#221F42] focus:border-[#8B5CF6] p-2.5 rounded-xl text-xs text-white placeholder-slate-400 outline-none"
                  />
                </div>

                {/* Payment Method Selector */}
                <div className="pt-3 border-t border-[#221F42]">
                  <label className="block text-xs font-semibold text-slate-300 mb-2 flex items-center justify-between">
                    <span>Select Payment Option:</span>
                    <span className="text-[10px] font-mono text-[#22D3EE]">Instant Token</span>
                  </label>

                  <div className="grid grid-cols-3 gap-2">
                    {/* UPI */}
                    <button
                      type="button"
                      onClick={() => {
                        sounds.playPop();
                        setPaymentMethod('upi');
                      }}
                      className={`p-2.5 rounded-xl border text-center cursor-pointer transition-all ${
                        paymentMethod === 'upi'
                          ? 'bg-[#8B5CF6]/20 border-[#8B5CF6] text-white shadow-[0_0_15px_rgba(139,92,246,0.4)]'
                          : 'bg-[#131226] border-[#221F42] text-slate-400 hover:text-white'
                      }`}
                    >
                      <QrCode className="w-4 h-4 mx-auto mb-1 text-[#22D3EE]" />
                      <span className="text-xs font-semibold block">UPI / QR</span>
                    </button>

                    {/* ID Card Wallet */}
                    <button
                      type="button"
                      onClick={() => {
                        sounds.playPop();
                        setPaymentMethod('id_wallet');
                      }}
                      className={`p-2.5 rounded-xl border text-center cursor-pointer transition-all ${
                        paymentMethod === 'id_wallet'
                          ? 'bg-[#8B5CF6]/20 border-[#8B5CF6] text-white shadow-[0_0_15px_rgba(139,92,246,0.4)]'
                          : 'bg-[#131226] border-[#221F42] text-slate-400 hover:text-white'
                      }`}
                    >
                      <Wallet className="w-4 h-4 mx-auto mb-1 text-[#8B5CF6]" />
                      <span className="text-xs font-semibold block">ID Card</span>
                    </button>

                    {/* Counter */}
                    <button
                      type="button"
                      onClick={() => {
                        sounds.playPop();
                        setPaymentMethod('counter');
                      }}
                      className={`p-2.5 rounded-xl border text-center cursor-pointer transition-all ${
                        paymentMethod === 'counter'
                          ? 'bg-[#8B5CF6]/20 border-[#8B5CF6] text-white shadow-[0_0_15px_rgba(139,92,246,0.4)]'
                          : 'bg-[#131226] border-[#221F42] text-slate-400 hover:text-white'
                      }`}
                    >
                      <Banknote className="w-4 h-4 mx-auto mb-1 text-emerald-400" />
                      <span className="text-xs font-semibold block">Counter</span>
                    </button>
                  </div>

                  {/* Payment Method Details */}
                  {paymentMethod === 'upi' && (
                    <div className="mt-3 bg-[#131226] border border-[#221F42] p-3 rounded-xl">
                      <div className="flex items-center justify-between text-xs font-semibold mb-2 text-slate-300">
                        <span>Dynamic UPI Gateway</span>
                        <span className="text-[#22D3EE] font-mono text-[10px]">Auto-Verify</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {['gpay', 'phonepe', 'paytm'].map((app) => (
                          <button
                            key={app}
                            type="button"
                            onClick={() => {
                              sounds.playPop();
                              setSelectedUpiApp(app);
                            }}
                            className={`flex-1 py-1 rounded-lg text-[10px] font-bold uppercase border cursor-pointer ${
                              selectedUpiApp === app
                                ? 'bg-[#8B5CF6] text-white border-[#8B5CF6]'
                                : 'bg-[#0B0B14] text-slate-400 border-[#221F42]'
                            }`}
                          >
                            {app}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {paymentMethod === 'id_wallet' && (
                    <div className="mt-3 bg-[#131226] border border-[#221F42] p-3 rounded-xl">
                      <div className="flex items-center justify-between text-xs font-semibold text-slate-300">
                        <span>ID Card Balance:</span>
                        <span className="font-mono font-bold text-white text-sm">
                          ₹{user?.walletBalance.toFixed(2) || '0.00'}
                        </span>
                      </div>
                      {!canUseWallet && user && (
                        <div className="mt-2 text-xs text-rose-400 flex items-center justify-between">
                          <span>Insufficient balance</span>
                          <button
                            onClick={onRechargeWallet}
                            className="bg-[#8B5CF6] text-white px-2 py-0.5 rounded text-[10px] font-bold cursor-pointer"
                          >
                            Top-Up Card
                          </button>
                        </div>
                      )}
                    </div>
                  )}

                  {paymentMethod === 'counter' && (
                    <div className="mt-3 bg-[#131226] border border-[#221F42] p-3 rounded-xl text-xs text-slate-300 flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Pay in cash or POS card when your token is called.</span>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>

          {/* Bill Breakdown & Checkout Footer */}
          {cartItems.length > 0 && (
            <div className="p-5 bg-[#131226]/95 border-t border-[#221F42] space-y-3.5">
              <div className="space-y-1.5 text-xs text-slate-300">
                <div className="flex items-center justify-between">
                  <span>Subtotal:</span>
                  <span className="font-mono font-bold text-white">₹{subtotal}</span>
                </div>

                {discount > 0 && (
                  <div className="flex items-center justify-between text-emerald-400">
                    <span className="flex items-center gap-1">
                      <Tag className="w-3.5 h-3.5" />
                      Campus Subsidy ({user?.role?.toUpperCase()} 10%):
                    </span>
                    <span className="font-mono font-bold">-₹{discount}</span>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <span>Convenience Fee:</span>
                  <span className="font-mono text-emerald-400 font-bold">FREE</span>
                </div>

                <div className="pt-2 border-t border-[#221F42] flex items-center justify-between text-base font-bold text-white">
                  <span>Total Payable:</span>
                  <span className="font-mono text-xl text-[#22D3EE] drop-shadow-[0_0_8px_rgba(34,211,238,0.6)]">
                    ₹{total}
                  </span>
                </div>
              </div>

              {/* Checkout CTA */}
              <button
                id="place-order-btn"
                disabled={isCheckingOut}
                onClick={handleCheckout}
                className="w-full bg-gradient-to-r from-[#8B5CF6] to-[#7C3AED] hover:from-[#9B6CF7] hover:to-[#8B5CF6] text-white p-3.5 rounded-full font-bold text-sm shadow-[0_0_25px_rgba(139,92,246,0.5)] hover:shadow-[0_0_35px_rgba(139,92,246,0.8)] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <Sparkles className="w-4 h-4" />
                <span>
                  {isCheckingOut
                    ? 'Generating Token...'
                    : !user
                    ? 'Sign In & Place Order'
                    : `Confirm & Get Token (₹${total})`}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
