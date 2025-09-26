import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../../context/CartContext';
import { useState } from 'react';

export const CartSidebar = () => {
  const { items, removeFromCart, updateQuantity, total, clearCart } = useCart();
  const [open, setOpen] = useState(false);
  const [checkout, setCheckout] = useState(false);
  const [method, setMethod] = useState<string>('');
  const [processing, setProcessing] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed top-6 right-6 z-40 rounded-full bg-honey-500 text-black font-semibold px-5 py-2 shadow-glow hover:bg-honey-400 transition-colors"
      >
        Cart ({items.length})
      </button>
      <AnimatePresence>
        {open && (
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 120, damping: 18 }}
            className="fixed top-0 right-0 h-full w-full sm:w-[420px] bg-neutral-950/95 backdrop-blur-xl border-l border-honey-700/40 z-50 flex flex-col"
          >
            <div className="p-5 flex items-center justify-between border-b border-honey-700/40">
              <h3 className="text-lg font-semibold text-honey-200">Your Cart</h3>
              <div className="flex gap-2">
                {items.length > 0 && (
                  <button onClick={clearCart} className="text-xs text-honey-400 hover:text-honey-300">Clear</button>
                )}
                <button onClick={() => setOpen(false)} className="text-honey-300 hover:text-honey-100">✕</button>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-5 space-y-5">
              {items.length === 0 && <p className="text-sm text-honey-100/60">Your cart is empty.</p>}
              {items.map(item => (
                <div key={item.id} className="flex gap-3 items-center bg-neutral-900/50 p-3 rounded-xl">
                  <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg" />
                  <div className="flex-1">
                    <p className="text-honey-100 font-medium text-sm">{item.name}</p>
                    <p className="text-honey-400 text-xs">${item.price.toFixed(2)}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-6 h-6 rounded bg-neutral-800 text-honey-300 hover:bg-neutral-700"
                      >
                        -
                      </button>
                      <span className="text-xs text-honey-200 w-6 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-6 h-6 rounded bg-neutral-800 text-honey-300 hover:bg-neutral-700"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-xs text-honey-300 hover:text-honey-100"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
            {items.length > 0 && (
              <div className="p-5 border-t border-honey-700/40 space-y-4">
                <div className="flex items-center justify-between text-sm text-honey-100/80">
                  <span>Subtotal</span>
                  <span className="font-semibold text-honey-300">${total.toFixed(2)}</span>
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
                          // Simulate redirect to payment route (placeholder)
                          setCheckout(false);
                          setProcessing(false);
                          setOpen(false);
                          clearCart();
                          alert(`Order placed via ${method}! (mock)`);
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
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
};
