import { useCart, type CartItem } from '../../context/CartContext';
import { useEffect, useMemo, useState, type DragEvent } from 'react';
import acaciaImage from '../../assets/Honey/Acacia.png';
import cloverImage from '../../assets/Honey/Clover.png';
import eucalyptusImage from '../../assets/Honey/Eucalyptus.png';
import lavenderImage from '../../assets/Honey/lavender.png';
import manukaImage from '../../assets/Honey/Manuka.png';
import sidrImage from '../../assets/Honey/Sidr.png';

export const CartSidebar = () => {
  const { items, addToCart, removeFromCart, updateQuantity, total, clearCart } = useCart();
  const [open, setOpen] = useState(false);
  const [discountOpen, setDiscountOpen] = useState(false);
  const [checkout, setCheckout] = useState(false);
  const [method, setMethod] = useState<string>('');
  const [processing, setProcessing] = useState(false);
  const [dragId, setDragId] = useState<string | null>(null);
  const [dragSource, setDragSource] = useState<'cart' | 'inventory' | null>(null);
  const [dragItem, setDragItem] = useState<{ id: string; name: string; price: number; image: string } | null>(null);
  const [viewItems, setViewItems] = useState<CartItem[]>(items);
  const [couponInput, setCouponInput] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [couponError, setCouponError] = useState('');

  const coupons = useMemo(
    () => [
      { code: 'HONEY10', percent: 10 },
      { code: 'HONEY13', percent: 13 },
      { code: 'HONEY16', percent: 16 },
    ],
    []
  );

  const activeCoupon = useMemo(
    () => (appliedCoupon ? coupons.find((c) => c.code === appliedCoupon) ?? null : null),
    [appliedCoupon, coupons]
  );

  const discountValue = useMemo(
    () => (activeCoupon ? (total * activeCoupon.percent) / 100 : 0),
    [activeCoupon, total]
  );

  const grandTotal = useMemo(
    () => Math.max(0, total - discountValue),
    [discountValue, total]
  );

  const inventoryPool = useMemo(
    () => [
      { id: 'acacia-honey', name: 'Acacia Honey', price: 16, image: acaciaImage },
      { id: 'manuka-honey', name: 'Manuka Honey', price: 18, image: manukaImage },
      { id: 'clover-honey', name: 'Clover Honey', price: 15, image: cloverImage },
      { id: 'sidr-honey', name: 'Sidr Honey', price: 19, image: sidrImage },
      { id: 'eucalyptus-honey', name: 'Eucalyptus Honey', price: 16.5, image: eucalyptusImage },
      { id: 'lavender-honey', name: 'Lavender Honey', price: 17.5, image: lavenderImage },
    ],
    []
  );

  const pickRandomItems = (list: typeof inventoryPool, count: number) => {
    const pool = [...list];
    const picked: typeof inventoryPool = [];
    while (pool.length && picked.length < count) {
      const index = Math.floor(Math.random() * pool.length);
      picked.push(pool.splice(index, 1)[0]);
    }
    return picked;
  };

  const [inventoryItems, setInventoryItems] = useState(() => pickRandomItems(inventoryPool, 4));

  useEffect(() => {
    if (!open) return;
    setInventoryItems(pickRandomItems(inventoryPool, 4));
  }, [open, inventoryPool]);

  useEffect(() => {
    setViewItems((prev) => {
      const nextMap = new Map(items.map((item) => [item.id, item]));
      const ordered: CartItem[] = [];
      prev.forEach((p) => {
        const next = nextMap.get(p.id);
        if (next) ordered.push(next);
        nextMap.delete(p.id);
      });
      nextMap.forEach((value) => ordered.push(value));
      return ordered;
    });
  }, [items]);

  useEffect(() => {
    if (!open && !discountOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open, discountOpen]);

  const moveItem = (fromId: string, toId: string) => {
    if (fromId === toId) return;
    setViewItems((prev) => {
      const fromIndex = prev.findIndex((item) => item.id === fromId);
      const toIndex = prev.findIndex((item) => item.id === toId);
      if (fromIndex < 0 || toIndex < 0) return prev;
      const next = [...prev];
      const [moved] = next.splice(fromIndex, 1);
      next.splice(toIndex, 0, moved);
      return next;
    });
  };

  const applyCoupon = (value: string) => {
    const code = value.trim().toUpperCase();
    if (!code) return;
    const match = coupons.find((c) => c.code === code);
    if (!match) {
      setCouponError('Invalid coupon code');
      return;
    }
    setAppliedCoupon(match.code);
    setCouponInput(match.code);
    setCouponError('');
  };

  const resolveInventoryItem = (id: string) => inventoryPool.find((item) => item.id === id) ?? null;

  const handleInventoryDrop = (e: DragEvent<HTMLElement>) => {
    e.preventDefault();
    const dataId = e.dataTransfer.getData('text/plain');
    const dropped = dragItem ?? (dataId ? resolveInventoryItem(dataId) : null);
    if (dropped) addToCart(dropped);
    setDragId(null);
    setDragSource(null);
    setDragItem(null);
  };

  return (
    <>
      <div className="fixed top-6 right-6 z-40">
        <div className="flex items-center gap-3 rounded-full border border-white/15 bg-black/30 px-2 py-2 backdrop-blur-xl shadow-[0_12px_30px_rgba(10,6,2,0.35)]">
          <button
            onClick={() => setDiscountOpen(true)}
            className="rounded-full border border-honey-400/60 bg-white/10 px-4 py-2 text-xs font-semibold text-honey-200 shadow-glow backdrop-blur hover:bg-white/20"
          >
            Discount
          </button>
          <button
            onClick={() => setOpen(true)}
            className="rounded-full bg-honey-500 text-black font-semibold px-5 py-2 shadow-glow hover:bg-honey-400 transition-colors"
          >
            Cart ({items.length})
          </button>
        </div>
      </div>
      {discountOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <button
            type="button"
            aria-label="Close discount"
            onClick={() => setDiscountOpen(false)}
            className="absolute inset-0 bg-black/60"
          />
          <div className="relative w-full max-w-xl rounded-3xl border border-white/20 bg-white/10 backdrop-blur-2xl shadow-2xl">
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
              <div>
                <p className="text-[11px] uppercase tracking-[0.3em] text-honey-200/70">Discounts</p>
                <h3 className="text-lg font-semibold text-honey-100">Coupon Codes</h3>
              </div>
              <button onClick={() => setDiscountOpen(false)} className="text-honey-200 hover:text-white">✕</button>
            </div>
            <div className="p-6 grid gap-4 sm:grid-cols-3">
              {coupons.map((coupon) => (
                <div
                  key={coupon.code}
                  className="rounded-2xl border border-white/20 bg-white/10 p-4 text-center"
                >
                  <p className="text-xs uppercase tracking-[0.25em] text-honey-200/60">Code</p>
                  <p className="mt-2 text-lg font-semibold text-honey-100">{coupon.code}</p>
                  <p className="mt-1 text-sm text-honey-200/80">{coupon.percent}% off</p>
                  <button
                    onClick={() => {
                      applyCoupon(coupon.code);
                      setDiscountOpen(false);
                    }}
                    className="mt-4 w-full rounded-full bg-honey-500 text-black text-xs font-semibold py-2 hover:bg-honey-400"
                  >
                    Apply
                  </button>
                </div>
              ))}
            </div>
            <div className="px-6 pb-6">
              <div className="flex items-center gap-3">
                <input
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value)}
                  placeholder="Enter coupon code"
                  className="flex-1 rounded-xl bg-black/30 border border-white/20 px-4 py-2 text-sm text-honey-100 placeholder:text-honey-100/40 focus:outline-none focus:ring-2 focus:ring-honey-500"
                />
                <button
                  onClick={() => applyCoupon(couponInput)}
                  className="rounded-full bg-honey-500 text-black text-xs font-semibold px-4 py-2 hover:bg-honey-400"
                >
                  Apply
                </button>
              </div>
              {couponError && <p className="mt-2 text-xs text-rose-200">{couponError}</p>}
              {activeCoupon && (
                <p className="mt-2 text-xs text-honey-100/70">Applied: {activeCoupon.code} ({activeCoupon.percent}% off)</p>
              )}
            </div>
          </div>
        </div>
      )}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            role="button"
            tabIndex={0}
            aria-label="Close cart"
            onClick={() => setOpen(false)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              if (dragId && dragSource === 'cart') {
                removeFromCart(dragId);
                setDragId(null);
              }
              setDragSource(null);
              setDragItem(null);
            }}
            className="absolute inset-0 bg-black/70 z-0"
          />
          <div className="absolute right-6 top-24 z-10 hidden lg:block w-56">
            <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-xl shadow-2xl">
              <div className="flex items-center justify-between mb-3">
                <p className="text-[11px] uppercase tracking-[0.3em] text-honey-200/70">Inventory</p>
                <span className="text-[11px] text-honey-100/60">Drag to cart</span>
              </div>
              <div className="grid gap-3">
                {inventoryItems.map((item) => (
                  <div
                    key={item.id}
                    draggable
                    onDragStart={(e) => {
                      e.dataTransfer.setData('text/plain', item.id);
                      e.dataTransfer.effectAllowed = 'copy';
                      setDragId(item.id);
                      setDragSource('inventory');
                      setDragItem(item);
                    }}
                    onDragEnd={() => {
                      setDragId(null);
                      setDragSource(null);
                      setDragItem(null);
                    }}
                    className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-3 py-2"
                  >
                    <img src={item.image} alt={item.name} className="h-10 w-10 rounded-lg object-cover" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-honey-100 truncate">{item.name}</p>
                      <p className="text-[11px] text-honey-200/70">${item.price.toFixed(2)}</p>
                    </div>
                    <span className="text-[10px] uppercase tracking-[0.3em] text-honey-200/60">Drag</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Cart"
            className="relative z-20 w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-3xl border border-honey-700/40 bg-neutral-950/95 shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-honey-700/40 px-6 py-4">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-honey-400/70">Inventory</p>
                <h3 className="text-lg font-semibold text-honey-200">Your Cart</h3>
              </div>
              <div className="flex items-center gap-3">
                {items.length > 0 && (
                  <button onClick={clearCart} className="text-xs text-honey-400 hover:text-honey-300">Clear</button>
                )}
                <button onClick={() => setOpen(false)} className="text-honey-300 hover:text-honey-100">✕</button>
              </div>
            </div>
            <div className="grid lg:grid-cols-[1.3fr_0.7fr]">
              <div
                className="p-6 border-b border-honey-700/20 lg:border-b-0 lg:border-r border-honey-700/20"
                onDragOver={(e) => {
                  if (dragSource === 'inventory') e.preventDefault();
                }}
                onDrop={(e) => {
                  if (dragSource === 'inventory') handleInventoryDrop(e);
                }}
              >
                <div className="flex items-center justify-between mb-4">
                  <p className="text-sm text-honey-100/70">Drag and drop to arrange items.</p>
                  <span className="text-xs text-honey-100/60">Items: {items.length}</span>
                </div>
                {viewItems.length === 0 && <p className="text-sm text-honey-100/60">Your cart is empty.</p>}
                <div
                  className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                  onDragOver={(e) => {
                    if (dragSource === 'inventory') e.preventDefault();
                  }}
                  onDrop={(e) => {
                    if (dragSource === 'inventory') handleInventoryDrop(e);
                  }}
                >
                  {viewItems.map((item) => (
                    <div
                      key={item.id}
                      draggable
                      onDragStart={(e) => {
                        e.dataTransfer.setData('text/plain', item.id);
                        e.dataTransfer.effectAllowed = 'move';
                        setDragId(item.id);
                        setDragSource('cart');
                        setDragItem(null);
                      }}
                      onDragEnd={() => {
                        setDragId(null);
                        setDragSource(null);
                        setDragItem(null);
                      }}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={(e) => {
                        if (dragSource === 'cart' && dragId) {
                          moveItem(dragId, item.id);
                        }
                        if (dragSource === 'inventory') {
                          handleInventoryDrop(e);
                        } else {
                          setDragId(null);
                          setDragSource(null);
                          setDragItem(null);
                        }
                      }}
                      className={`group rounded-2xl border p-4 bg-neutral-900/60 ${dragId === item.id ? 'border-honey-400' : 'border-honey-700/30'}`}
                      aria-grabbed={dragId === item.id ? 'true' : 'false'}
                    >
                      <div className="flex gap-3">
                        <img src={item.image} alt={item.name} className="h-16 w-16 rounded-xl object-cover" />
                        <div className="flex-1 min-w-0">
                          <p className="text-honey-100 font-medium text-sm truncate">{item.name}</p>
                          <p className="text-honey-400 text-xs">${item.price.toFixed(2)}</p>
                          <div className="mt-2 flex items-center gap-2">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="h-7 w-7 rounded bg-neutral-800 text-honey-300 hover:bg-neutral-700"
                            >
                              -
                            </button>
                            <span className="text-xs text-honey-200 w-6 text-center">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="h-7 w-7 rounded bg-neutral-800 text-honey-300 hover:bg-neutral-700"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="mt-3 flex items-center justify-between">
                        <span className="text-[10px] uppercase tracking-[0.3em] text-honey-400/60">Drag</span>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-xs text-honey-300 hover:text-honey-100"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="p-6 space-y-6">
                {items.length > 0 && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-sm text-honey-100/80">
                      <span>Subtotal</span>
                      <span className="font-semibold text-honey-300">${total.toFixed(2)}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm text-honey-100/80">
                      <span>Discount</span>
                      <span className="font-semibold text-honey-300">-${discountValue.toFixed(2)}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm text-honey-100/80">
                      <span>Total</span>
                      <span className="font-semibold text-honey-200">${grandTotal.toFixed(2)}</span>
                    </div>
                    {!checkout && !processing && (
                      <button
                        onClick={() => setCheckout(true)}
                        className="w-full py-3 rounded-full bg-honey-500 text-black font-semibold hover:bg-honey-400"
                      >
                        Proceed to Checkout
                      </button>
                    )}
                    {checkout && !processing && (
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <p className="text-xs text-honey-100/60">Coupon code:</p>
                          <div className="flex items-center gap-2">
                            <input
                              value={couponInput}
                              onChange={(e) => setCouponInput(e.target.value)}
                              placeholder="Enter code"
                              className="flex-1 rounded-lg bg-neutral-800/70 border border-honey-700/40 px-3 py-2 text-xs text-honey-100 placeholder:text-honey-100/40 focus:outline-none focus:ring-2 focus:ring-honey-500"
                            />
                            <button
                              onClick={() => applyCoupon(couponInput)}
                              className="rounded-full bg-honey-500 text-black text-xs font-semibold px-3 py-2 hover:bg-honey-400"
                            >
                              Apply
                            </button>
                          </div>
                          {couponError && <p className="text-[11px] text-rose-200">{couponError}</p>}
                          {activeCoupon && (
                            <p className="text-[11px] text-honey-100/70">Applied: {activeCoupon.code} ({activeCoupon.percent}% off)</p>
                          )}
                        </div>
                        <p className="text-xs text-honey-100/60">Select a payment method:</p>
                        <div className="grid grid-cols-2 gap-3">
                          {['Stripe', 'Razorpay', 'PayPal', 'COD'].map(m => (
                            <button
                              key={m}
                              onClick={() => setMethod(m)}
                              className={`py-2 text-xs rounded-lg border border-honey-700/40 ${method===m ? 'bg-honey-500 text-black' : 'bg-neutral-800 text-honey-200 hover:bg-neutral-700'}`}
                            >
                              {m}
                            </button>
                          ))}
                        </div>
                        <button
                          disabled={!method}
                          onClick={() => {
                            setProcessing(true);
                            setTimeout(() => {
                              setCheckout(false);
                              setProcessing(false);
                              setOpen(false);
                              clearCart();
                              const couponLabel = activeCoupon ? ` with ${activeCoupon.code}` : '';
                              alert(`Order placed via ${method}${couponLabel}! (mock)`);
                            }, 1800);
                          }}
                          className="w-full py-3 rounded-full bg-honey-600 disabled:opacity-40 disabled:cursor-not-allowed text-black font-semibold hover:bg-honey-500"
                        >
                          {method ? `Confirm (${method})` : 'Choose Method'}
                        </button>
                      </div>
                    )}
                    {processing && (
                      <div className="space-y-3 text-center">
                        <div className="flex items-center justify-center gap-2 text-honey-300 text-sm">
                          <span className="inline-block w-3 h-3 rounded-full bg-honey-500 animate-ping" />
                          <span>Placing order...</span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-neutral-800 overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-honey-500 via-honey-400 to-honey-600 animate-[progress_1.4s_linear_infinite]" />
                        </div>
                        <style>{`@keyframes progress{0%{transform:translateX(-100%)}100%{transform:translateX(100%)}}`}</style>
                      </div>
                    )}
                  </div>
                )}
                {items.length === 0 && (
                  <div className="rounded-2xl border border-honey-700/30 bg-neutral-900/50 p-6 text-center text-sm text-honey-100/60">
                    Add items to see checkout options.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
