import React, { useEffect } from 'react';
import { X, Minus, Plus, Trash2, ArrowRight, Sparkles } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { PRODUCTS } from '../data/products';

export const ShoppingBagDrawer: React.FC = () => {
  const {
    isBagOpen,
    setIsBagOpen,
    cart,
    updateQuantity,
    removeFromBag,
    subtotal,
    navigate,
    placeOrder,
  } = useStore();

  const [mounted, setMounted] = React.useState(false);
  const [active, setActive] = React.useState(false);

  useEffect(() => {
    if (isBagOpen) {
      setMounted(true);
      const raf = requestAnimationFrame(() => setActive(true));
      document.body.style.overflow = 'hidden';
      return () => cancelAnimationFrame(raf);
    } else {
      setActive(false);
      const timer = setTimeout(() => {
        setMounted(false);
        document.body.style.overflow = '';
      }, 350);
      return () => clearTimeout(timer);
    }
  }, [isBagOpen]);

  const handleClose = () => {
    setActive(false);
    setTimeout(() => {
      setIsBagOpen(false);
    }, 350);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isBagOpen) {
        handleClose();
      }
    };
    if (isBagOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isBagOpen]);

  if (!mounted && !isBagOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={handleClose}
        className={`absolute inset-0 bg-black/40 backdrop-blur-[2px] transition-opacity duration-350 ease-out ${
          active ? 'opacity-100' : 'opacity-0'
        }`}
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex">
        {/* Drawer container: full width on mobile, 460px on desktop */}
        <div
          className={`w-screen max-w-md md:max-w-[460px] bg-white flex flex-col shadow-2xl z-10 transform transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            active ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {/* Header */}
          <div className="px-6 py-5 border-b border-[#E5E5E5] flex items-center justify-between">
            <div className="flex items-baseline gap-2">
              <h2 className="text-sm font-semibold tracking-[0.16em] uppercase text-[#111111]">
                SHOPPING BAG
              </h2>
              <span className="text-xs text-[#777777] tabular-nums">
                ({cart.reduce((s, i) => s + i.quantity, 0)} {cart.length === 1 ? 'item' : 'items'})
              </span>
            </div>
            <button
              onClick={handleClose}
              className="p-1.5 text-[#111111] hover:text-[#777777] transition-colors"
              aria-label="Close bag drawer"
            >
              <X size={19} strokeWidth={1.5} />
            </button>
          </div>

          {/* Bag Items Content */}
          <div className="flex-1 overflow-y-auto px-6 py-6 divide-y divide-[#F0F0F0]">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-16">
                <div className="w-12 h-12 rounded-full border border-[#E5E5E5] flex items-center justify-center mb-4 text-[#777777]">
                  <X size={18} />
                </div>
                <h3 className="text-lg font-serif text-[#111111] mb-2">
                  Your shopping bag is empty
                </h3>
                <p className="text-xs text-[#777777] max-w-xs mb-8">
                  Explore our curated seasonal loungewear pieces crafted from Mongolian cashmere and pure silk.
                </p>
                <button
                  onClick={() => {
                    setIsBagOpen(false);
                    navigate('collection');
                  }}
                  className="bg-[#111111] text-white text-xs uppercase tracking-[0.18em] font-medium px-8 py-3.5 hover:bg-[#333333] transition-colors"
                >
                  Explore Collection
                </button>
              </div>
            ) : (
              cart.map((item) => {
                const product = PRODUCTS.find((p) => p.id === item.productId);
                if (!product) return null;
                const colorObj = product.colors.find((c) => c.name === item.colorName) || product.colors[0];
                const itemImg = colorObj.images[0];

                return (
                  <div key={`${item.productId}-${item.colorName}-${item.size}`} className="py-5 flex gap-4">
                    {/* Thumbnail */}
                    <div
                      onClick={() => {
                        setIsBagOpen(false);
                        navigate('product', { id: product.id });
                      }}
                      className="w-20 h-28 bg-[#F5F5F5] shrink-0 cursor-pointer overflow-hidden border border-[#E5E5E5]"
                    >
                      <img
                        src={itemImg}
                        alt={product.name}
                        className="w-full h-full object-cover object-center"
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start gap-2">
                          <h4
                            onClick={() => {
                              setIsBagOpen(false);
                              navigate('product', { id: product.id });
                            }}
                            className="text-sm font-medium text-[#111111] cursor-pointer hover:underline line-clamp-1"
                          >
                            {product.name}
                          </h4>
                          <span className="text-sm font-normal text-[#111111] tabular-nums whitespace-nowrap">
                            ₹{(product.price * item.quantity).toLocaleString('en-IN')}
                          </span>
                        </div>

                        <div className="text-xs text-[#777777] mt-1 space-y-0.5">
                          <p>
                            Shade: <span className="text-[#111111] font-medium">{item.colorName}</span>
                          </p>
                          <p>
                            Size: <span className="text-[#111111] font-medium">{item.size}</span>
                          </p>
                        </div>
                      </div>

                      {/* Quantity Stepper & Remove */}
                      <div className="flex items-center justify-between pt-3">
                        <div className="flex items-center border border-[#E5E5E5]">
                          <button
                            onClick={() => updateQuantity(item.productId, item.colorName, item.size, item.quantity - 1)}
                            className="w-7 h-7 flex items-center justify-center text-[#777777] hover:text-[#111111] transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="w-8 text-center text-xs tabular-nums font-medium text-[#111111]">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.productId, item.colorName, item.size, item.quantity + 1)}
                            className="w-7 h-7 flex items-center justify-center text-[#777777] hover:text-[#111111] transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus size={12} />
                          </button>
                        </div>

                        <button
                          onClick={() => removeFromBag(item.productId, item.colorName, item.size)}
                          className="text-xs text-[#777777] hover:text-[#111111] underline underline-offset-2 flex items-center gap-1 transition-colors"
                        >
                          <Trash2 size={12} />
                          <span>Remove</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer & Checkout Action */}
          {cart.length > 0 && (
            <div className="border-t border-[#E5E5E5] p-6 space-y-4 bg-white">
              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-[#777777]">Subtotal</span>
                  <span className="font-medium text-[#111111] tabular-nums text-base">
                    ₹{subtotal.toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="flex justify-between items-center text-xs text-[#777777]">
                  <span>Shipping</span>
                  <span className="text-[#111111] font-medium">Complimentary Express Delivery</span>
                </div>
              </div>

              <p className="text-[11px] text-[#777777]">
                Inclusive of all taxes &amp; atelier packaging.
              </p>

              <div className="space-y-2 pt-2">
                <button
                  onClick={() => {
                    setIsBagOpen(false);
                    placeOrder({
                      name: 'Aanya Sharma',
                      email: 'aanya.sharma@jabasoo.in',
                      phone: '+91 98450 12890',
                      street: '14 The Courtyard, 12th Main Road, Indiranagar',
                      city: 'Bengaluru',
                      state: 'Karnataka',
                      pinCode: '560038',
                      paymentMethod: 'Instant UPI / NetBanking',
                    });
                  }}
                  className="w-full bg-[#0A0A0A] text-white text-xs uppercase tracking-[0.2em] font-medium py-4 flex items-center justify-center gap-2 hover:bg-[#27272A] transition-colors shadow-sm"
                >
                  <span>Instant 1-Click Checkout</span>
                </button>

                <button
                  onClick={() => {
                    setIsBagOpen(false);
                    navigate('checkout');
                  }}
                  className="w-full bg-transparent border border-[#0A0A0A] text-[#0A0A0A] text-xs uppercase tracking-[0.18em] font-medium py-3.5 flex items-center justify-center gap-2 hover:bg-[#0A0A0A] hover:text-white transition-colors"
                >
                  <span>Standard Checkout</span>
                  <ArrowRight size={14} />
                </button>

                <button
                  onClick={() => setIsBagOpen(false)}
                  className="w-full bg-transparent text-[#777777] text-xs uppercase tracking-[0.18em] font-medium py-2.5 hover:text-[#111111] transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
