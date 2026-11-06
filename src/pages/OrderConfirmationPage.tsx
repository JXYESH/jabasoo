import React, { useState } from 'react';
import { Check, Package, ArrowRight, UserPlus, ShieldAlert } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const OrderConfirmationPage: React.FC = () => {
  const { lastOrder, navigate } = useStore();
  const [accountCreated, setAccountCreated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');

  if (!lastOrder) {
    return (
      <div className="w-full px-4 sm:px-6 md:px-10 lg:px-14 py-28 text-center">
        <h2 className="text-2xl font-serif text-[#111111] mb-3">No Active Confirmation Found</h2>
        <p className="text-xs text-[#777777] mb-6">You may browse our collection to start a new order.</p>
        <button
          onClick={() => navigate('collection')}
          className="bg-[#111111] text-white text-xs uppercase tracking-[0.16em] px-8 py-3.5"
        >
          Explore Collection
        </button>
      </div>
    );
  }

  const handleCreateAccount = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput) {
      setAccountCreated(true);
    }
  };

  return (
    <div className="w-full bg-[#FAF9F7] text-[#111111] min-h-screen pb-28">
      {/* Header */}
      <div className="border-b border-[#E5E5E5] bg-white py-12 text-center">
        <div className="max-w-2xl mx-auto px-6 space-y-4">
          <div className="w-14 h-14 rounded-full bg-[#111111] text-white flex items-center justify-center mx-auto mb-2">
            <Check size={26} strokeWidth={2} />
          </div>

          <span className="text-[11px] uppercase tracking-[0.25em] text-[#777777] font-semibold block">
            DEMONSTRATION ORDER CONFIRMED
          </span>

          <h1 className="text-3xl md:text-4xl text-[#111111] font-light">
            Thank you for your order
          </h1>

          <p className="text-sm text-[#555555] font-light max-w-md mx-auto">
            Order Reference: <strong className="font-mono text-[#111111]">{lastOrder.orderNumber}</strong>. A confirmation has been logged for this demo session.
          </p>

          <div className="inline-block p-2.5 bg-[#F0F0F0] border border-[#E0E0E0] text-[11px] text-[#555555]">
            <span className="font-semibold text-[#111111]">Client Presentation Notice:</span> This order is simulated for frontend demonstration purposes.
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 pt-10 space-y-8">
        {/* Order Details Card */}
        <div className="bg-white border border-[#E5E5E5] p-6 md:p-8 space-y-6">
          <div className="flex justify-between items-baseline border-b border-[#E5E5E5] pb-4">
            <div>
              <span className="text-[10px] uppercase tracking-[0.18em] text-[#777777] block">
                Order Items
              </span>
              <h3 className="text-lg font-light text-[#111111]">
                {lastOrder.items.length} {lastOrder.items.length === 1 ? 'Item' : 'Items'}
              </h3>
            </div>
            <span className="text-xs text-[#777777]">{lastOrder.date}</span>
          </div>

          {/* Items */}
          <div className="divide-y divide-[#F0F0F0]">
            {lastOrder.items.map((item, idx) => (
              <div key={idx} className="py-4 flex items-center gap-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-20 bg-[#F5F5F5] object-cover shrink-0 border border-[#E5E5E5]"
                  referrerPolicy="no-referrer"
                />
                <div className="flex-1">
                  <h4 className="text-sm font-medium text-[#111111]">{item.name}</h4>
                  <p className="text-xs text-[#777777] mt-0.5">
                    Shade: {item.colorName} · Size: {item.size}
                  </p>
                  <p className="text-xs text-[#777777]">Quantity: {item.quantity}</p>
                </div>
                <span className="text-sm font-normal text-[#111111] tabular-nums">
                  ${item.price * item.quantity}
                </span>
              </div>
            ))}
          </div>

          {/* Delivery & Payment Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-[#E5E5E5] pt-6 text-xs text-[#555555]">
            <div>
              <span className="text-[10px] uppercase tracking-[0.16em] text-[#777777] font-semibold block mb-1">
                Delivery Details
              </span>
              <p className="font-medium text-[#111111]">{lastOrder.deliveryAddress.name}</p>
              <p>{lastOrder.deliveryAddress.street}</p>
              <p>{lastOrder.deliveryAddress.city}, {lastOrder.deliveryAddress.state} {lastOrder.deliveryAddress.pinCode}</p>
              <p className="mt-1">{lastOrder.deliveryAddress.phone}</p>
            </div>

            <div>
              <span className="text-[10px] uppercase tracking-[0.16em] text-[#777777] font-semibold block mb-1">
                Payment & Shipping Summary
              </span>
              <p>Payment Method: <span className="text-[#111111] font-medium">{lastOrder.paymentMethod}</span></p>
              <p>Delivery: <span className="text-[#111111] font-medium">Complimentary Global Express</span></p>
              <p className="mt-2 text-sm font-semibold text-[#111111]">
                Total Charged: <span className="tabular-nums font-serif text-base">₹{lastOrder.total.toLocaleString('en-IN')}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Optional Invitation to Create Account */}
        <div className="bg-white border border-[#E5E5E5] p-6 md:p-8 space-y-4">
          <div className="flex items-center gap-3">
            <UserPlus size={20} className="text-[#111111]" />
            <div>
              <h3 className="text-base font-serif text-[#111111]">
                Create a Private Client Account (Optional)
              </h3>
              <p className="text-xs text-[#777777]">
                Save your measurements, delivery addresses, and trace orders with ease.
              </p>
            </div>
          </div>

          {accountCreated ? (
            <div className="p-3 bg-[#F0FDF4] border border-[#BBF7D0] text-xs text-[#166534] flex items-center gap-2">
              <Check size={14} />
              <span>Demo account registered. You can view this order in your Account area.</span>
            </div>
          ) : (
            <form onSubmit={handleCreateAccount} className="flex flex-col sm:flex-row gap-3 pt-2">
              <input
                type="password"
                placeholder="Choose a demo password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className="flex-1 border border-[#E5E5E5] px-4 py-2.5 text-xs focus:outline-none focus:border-[#111111]"
              />
              <button
                type="submit"
                className="bg-[#111111] text-white text-xs uppercase tracking-[0.16em] px-6 py-2.5 hover:bg-[#333333]"
              >
                Register Account
              </button>
            </form>
          )}
        </div>

        {/* Navigation Action */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
          <button
            onClick={() => navigate('collection')}
            className="w-full sm:w-auto bg-[#111111] text-white text-xs uppercase tracking-[0.18em] px-8 py-4 hover:bg-[#333333] transition-colors"
          >
            Continue Shopping
          </button>

          <button
            onClick={() => navigate('account')}
            className="text-xs uppercase tracking-[0.16em] text-[#111111] underline hover:text-[#777777]"
          >
            View in Customer Account Area →
          </button>
        </div>
      </div>
    </div>
  );
};
