import React, { useState } from 'react';
import { ArrowLeft, ShieldCheck, Lock, CreditCard, Smartphone, Building, Banknote } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { PRODUCTS } from '../data/products';
import { ShivaLingamLogo } from '../components/ShivaLingamLogo';

export const CheckoutPage: React.FC = () => {
  const { cart, subtotal, placeOrder, navigate } = useStore();

  // Form states
  const [email, setEmail] = useState('alexandra.vance@atelier-velene.com');
  const [phone, setPhone] = useState('+1 (555) 349-8201');
  const [name, setName] = useState('Alexandra Vance');
  const [street, setStreet] = useState('742 Evergreen Terrace');
  const [apartment, setApartment] = useState('Apt 4B');
  const [city, setCity] = useState('New York');
  const [state, setState] = useState('NY');
  const [pinCode, setPinCode] = useState('10012');
  const [instructions, setInstructions] = useState('Leave with concierge if unavailable.');

  // Delivery method
  const [deliveryMethod, setDeliveryMethod] = useState<'express' | 'overnight'>('express');

  // Payment method: UPI, Credit/debit cards, Net banking, Cash on delivery
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'upi' | 'netbanking' | 'cod'>('card');

  // Simulated inputs
  const [upiId, setUpiId] = useState('alexandra@okaxis');
  const [cardNumber, setCardNumber] = useState('•••• •••• •••• 4022');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvv, setCardCvv] = useState('•••');
  const [selectedBank, setSelectedBank] = useState('HDFC Bank');

  // Errors
  const [formError, setFormError] = useState('');

  if (cart.length === 0) {
    return (
      <div className="max-w-[1440px] mx-auto px-6 py-28 text-center">
        <h2 className="text-2xl font-serif text-[#111111] mb-2">Your shopping bag is currently empty</h2>
        <p className="text-xs text-[#777777] mb-6">Add pieces from the collection before entering checkout.</p>
        <button
          onClick={() => navigate('collection')}
          className="bg-[#111111] text-white text-xs uppercase tracking-[0.16em] px-8 py-3.5"
        >
          Explore Loungewear
        </button>
      </div>
    );
  }

  const shippingCost = deliveryMethod === 'overnight' ? 1200 : 0;
  const grandTotal = subtotal + shippingCost;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !phone || !name || !street || !city || !state || !pinCode) {
      setFormError('Please complete all required delivery fields.');
      return;
    }

    let methodLabel = 'Credit/Debit Card (Demo)';
    if (paymentMethod === 'upi') methodLabel = `UPI (${upiId})`;
    if (paymentMethod === 'netbanking') methodLabel = `Net Banking (${selectedBank})`;
    if (paymentMethod === 'cod') methodLabel = 'Cash on Delivery';

    placeOrder({
      name,
      email,
      phone,
      street,
      apartment,
      city,
      state,
      pinCode,
      paymentMethod: methodLabel,
    });
  };

  return (
    <div className="w-full bg-[#FAF9F7] text-[#111111] min-h-screen pb-28">
      {/* Checkout Minimal Header */}
      <div className="border-b border-[#E5E5E5] bg-white py-5">
        <div className="w-full px-4 sm:px-6 md:px-10 lg:px-14 flex items-center justify-between">
          <button
            onClick={() => navigate('collection')}
            className="flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-[#777777] hover:text-[#111111]"
          >
            <ArrowLeft size={14} />
            <span>Return to Collection</span>
          </button>

          <div className="flex items-center gap-2">
            <ShivaLingamLogo size={22} className="text-[#111111]" />
            <span className="text-xl tracking-[0.22em] uppercase font-light">
              JABASOO
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-[#777777]">
            <Lock size={13} />
            <span className="hidden sm:inline">256-bit Encrypted Checkout</span>
          </div>
        </div>
      </div>

      {/* Demo Notification Bar */}
      <div className="bg-[#111111] text-white py-2 text-center text-xs tracking-wider">
        <span className="font-semibold uppercase tracking-widest mr-2">Client Demo Environment:</span>
        No actual payment is charged. Simulated guest checkout for stakeholder evaluation.
      </div>

      <div className="w-full px-4 sm:px-6 md:px-10 lg:px-14 pt-10">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* LEFT: Guest Checkout Steps */}
          <div className="lg:col-span-7 space-y-8">
            {/* Hassle-Free 1-Click Instant Express Checkout Banner */}
            <div className="bg-[#111111] text-white p-6 md:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
              <div>
                <span className="text-[10px] uppercase tracking-[0.3em] text-white/70 block mb-1">
                  HASSLE-FREE EXPRESS &bull; 1-CLICK
                </span>
                <h3 className="text-xl font-light tracking-tight">
                  Skip the manual form
                </h3>
                <p className="text-xs text-white/80 font-light mt-1 max-w-sm">
                  Complete your order instantly with saved atelier credentials and complimentary global express delivery.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  placeOrder({
                    name: 'Alexandra Vance',
                    email: 'alexandra.vance@jabasoo.com',
                    phone: '+1 (555) 349-8201',
                    street: '742 Evergreen Terrace, Apt 4B',
                    city: 'New York',
                    state: 'NY',
                    pinCode: '10012',
                    paymentMethod: 'Instant 1-Click Express (Visa ending 4022)',
                  });
                }}
                className="bg-white text-[#111111] px-8 py-4 text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#FAF9F5] transition-colors shrink-0 shadow-lg flex items-center gap-2"
              >
                <span>⚡ Instant 1-Click Order</span>
              </button>
            </div>

            {/* Step 1: Contact Information */}
            <div className="bg-white border border-[#E5E5E5] p-6 md:p-8 space-y-4">
              <div className="flex justify-between items-baseline border-b border-[#E5E5E5] pb-3">
                <h2 className="text-sm font-semibold tracking-[0.16em] uppercase text-[#111111]">
                  1. Contact Information
                </h2>
                <span className="text-xs text-[#777777]">Guest Checkout</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-[0.14em] text-[#777777] mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border border-[#E5E5E5] px-4 py-2.5 text-sm focus:outline-none focus:border-[#111111]"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-[0.14em] text-[#777777] mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full border border-[#E5E5E5] px-4 py-2.5 text-sm focus:outline-none focus:border-[#111111]"
                  />
                </div>
              </div>
            </div>

            {/* Step 2: Delivery Address */}
            <div className="bg-white border border-[#E5E5E5] p-6 md:p-8 space-y-4">
              <h2 className="text-sm font-semibold tracking-[0.16em] uppercase text-[#111111] border-b border-[#E5E5E5] pb-3">
                2. Delivery Destination
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs uppercase tracking-[0.14em] text-[#777777] mb-1">
                    Recipient Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full border border-[#E5E5E5] px-4 py-2.5 text-sm focus:outline-none focus:border-[#111111]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="sm:col-span-2">
                    <label className="block text-xs uppercase tracking-[0.14em] text-[#777777] mb-1">
                      Street Address *
                    </label>
                    <input
                      type="text"
                      required
                      value={street}
                      onChange={(e) => setStreet(e.target.value)}
                      className="w-full border border-[#E5E5E5] px-4 py-2.5 text-sm focus:outline-none focus:border-[#111111]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-[0.14em] text-[#777777] mb-1">
                      Apt / Suite / Landmark
                    </label>
                    <input
                      type="text"
                      value={apartment}
                      onChange={(e) => setApartment(e.target.value)}
                      className="w-full border border-[#E5E5E5] px-4 py-2.5 text-sm focus:outline-none focus:border-[#111111]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs uppercase tracking-[0.14em] text-[#777777] mb-1">
                      City *
                    </label>
                    <input
                      type="text"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full border border-[#E5E5E5] px-4 py-2.5 text-sm focus:outline-none focus:border-[#111111]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-[0.14em] text-[#777777] mb-1">
                      State / Province *
                    </label>
                    <input
                      type="text"
                      required
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      className="w-full border border-[#E5E5E5] px-4 py-2.5 text-sm focus:outline-none focus:border-[#111111]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-[0.14em] text-[#777777] mb-1">
                      PIN / Postal Code *
                    </label>
                    <input
                      type="text"
                      required
                      value={pinCode}
                      onChange={(e) => setPinCode(e.target.value)}
                      className="w-full border border-[#E5E5E5] px-4 py-2.5 text-sm focus:outline-none focus:border-[#111111]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-[0.14em] text-[#777777] mb-1">
                    Delivery Instructions (Optional)
                  </label>
                  <input
                    type="text"
                    value={instructions}
                    onChange={(e) => setInstructions(e.target.value)}
                    placeholder="Gate code, concierge instructions, etc."
                    className="w-full border border-[#E5E5E5] px-4 py-2.5 text-sm focus:outline-none focus:border-[#111111]"
                  />
                </div>
              </div>
            </div>

            {/* Step 3: Delivery Options & Payment */}
            <div className="bg-white border border-[#E5E5E5] p-6 md:p-8 space-y-6">
              <div>
                <h2 className="text-sm font-semibold tracking-[0.16em] uppercase text-[#111111] border-b border-[#E5E5E5] pb-3 mb-4">
                  3. Delivery Tier & Payment Method
                </h2>

                <div className="space-y-3 mb-6">
                  <label className={`flex items-center justify-between p-4 border cursor-pointer ${
                    deliveryMethod === 'express' ? 'border-[#111111] bg-[#FAF9F7]' : 'border-[#E5E5E5]'
                  }`}>
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="deliveryMethod"
                        checked={deliveryMethod === 'express'}
                        onChange={() => setDeliveryMethod('express')}
                        className="text-[#111111]"
                      />
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-[#111111]">
                          Complimentary Global Express
                        </p>
                        <p className="text-xs text-[#777777]">Delivered in 2-4 business days</p>
                      </div>
                    </div>
                    <span className="text-xs font-semibold text-[#111111]">Free</span>
                  </label>

                  <label className={`flex items-center justify-between p-4 border cursor-pointer ${
                    deliveryMethod === 'overnight' ? 'border-[#111111] bg-[#FAF9F7]' : 'border-[#E5E5E5]'
                  }`}>
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="deliveryMethod"
                        checked={deliveryMethod === 'overnight'}
                        onChange={() => setDeliveryMethod('overnight')}
                        className="text-[#111111]"
                      />
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-[#111111]">
                          Priority Next-Morning Courier
                        </p>
                        <p className="text-xs text-[#777777]">Guaranteed by 10:30 AM next business day</p>
                      </div>
                    </div>
                    <span className="text-xs font-semibold text-[#111111]">₹1,200</span>
                  </label>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="space-y-4">
                <p className="text-xs uppercase tracking-[0.16em] text-[#777777] font-semibold">
                  Select Payment Method
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-3 border text-xs font-medium flex flex-col items-center gap-2 transition-colors ${
                      paymentMethod === 'card'
                        ? 'border-[#111111] bg-[#111111] text-white'
                        : 'border-[#E5E5E5] bg-white text-[#111111] hover:border-[#111111]'
                    }`}
                  >
                    <CreditCard size={18} />
                    <span>Cards</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('upi')}
                    className={`p-3 border text-xs font-medium flex flex-col items-center gap-2 transition-colors ${
                      paymentMethod === 'upi'
                        ? 'border-[#111111] bg-[#111111] text-white'
                        : 'border-[#E5E5E5] bg-white text-[#111111] hover:border-[#111111]'
                    }`}
                  >
                    <Smartphone size={18} />
                    <span>UPI</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('netbanking')}
                    className={`p-3 border text-xs font-medium flex flex-col items-center gap-2 transition-colors ${
                      paymentMethod === 'netbanking'
                        ? 'border-[#111111] bg-[#111111] text-white'
                        : 'border-[#E5E5E5] bg-white text-[#111111] hover:border-[#111111]'
                    }`}
                  >
                    <Building size={18} />
                    <span>Net Banking</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cod')}
                    className={`p-3 border text-xs font-medium flex flex-col items-center gap-2 transition-colors ${
                      paymentMethod === 'cod'
                        ? 'border-[#111111] bg-[#111111] text-white'
                        : 'border-[#E5E5E5] bg-white text-[#111111] hover:border-[#111111]'
                    }`}
                  >
                    <Banknote size={18} />
                    <span>Cash on Deliv.</span>
                  </button>
                </div>

                {/* Sub-panels for payment options */}
                <div className="p-4 border border-[#E5E5E5] bg-[#FAF9F7]">
                  {paymentMethod === 'card' && (
                    <div className="space-y-3">
                      <div>
                        <label className="block text-[11px] uppercase tracking-[0.14em] text-[#777777] mb-1">
                          Card Number (Sample Demo)
                        </label>
                        <input
                          type="text"
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          className="w-full bg-white border border-[#E5E5E5] px-3 py-2 text-xs font-mono"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] uppercase tracking-[0.14em] text-[#777777] mb-1">
                            Expiry
                          </label>
                          <input
                            type="text"
                            value={cardExpiry}
                            onChange={(e) => setCardExpiry(e.target.value)}
                            className="w-full bg-white border border-[#E5E5E5] px-3 py-2 text-xs font-mono"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] uppercase tracking-[0.14em] text-[#777777] mb-1">
                            Security CVV
                          </label>
                          <input
                            type="text"
                            value={cardCvv}
                            onChange={(e) => setCardCvv(e.target.value)}
                            className="w-full bg-white border border-[#E5E5E5] px-3 py-2 text-xs font-mono"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {paymentMethod === 'upi' && (
                    <div className="space-y-2">
                      <label className="block text-[11px] uppercase tracking-[0.14em] text-[#777777]">
                        Virtual Payment Address / UPI ID
                      </label>
                      <input
                        type="text"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        placeholder="yourname@bank"
                        className="w-full bg-white border border-[#E5E5E5] px-3 py-2 text-xs font-mono"
                      />
                      <p className="text-[11px] text-[#777777]">
                        A collect request will be simulated upon clicking &apos;Place Order&apos;.
                      </p>
                    </div>
                  )}

                  {paymentMethod === 'netbanking' && (
                    <div className="space-y-2">
                      <label className="block text-[11px] uppercase tracking-[0.14em] text-[#777777]">
                        Select Banking Institution
                      </label>
                      <select
                        value={selectedBank}
                        onChange={(e) => setSelectedBank(e.target.value)}
                        className="w-full bg-white border border-[#E5E5E5] px-3 py-2 text-xs"
                      >
                        <option>HDFC Bank</option>
                        <option>ICICI Bank</option>
                        <option>State Bank of India</option>
                        <option>Axis Bank</option>
                        <option>Kotak Mahindra</option>
                      </select>
                    </div>
                  )}

                  {paymentMethod === 'cod' && (
                    <div className="text-xs text-[#555555] space-y-1">
                      <p className="font-medium text-[#111111]">Pay upon white-glove arrival.</p>
                      <p className="text-[#777777]">
                        Exact amount of ${grandTotal} payable via cash or courier terminal on delivery.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {formError && (
              <div className="p-3 bg-[#FFF5F5] border border-[#FFCCCC] text-xs text-[#990000]">
                {formError}
              </div>
            )}
          </div>

          {/* RIGHT: Step 4: Sticky Order Review */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 space-y-6">
            <div className="bg-white border border-[#E5E5E5] p-6 md:p-8 space-y-6">
              <h2 className="text-sm font-semibold tracking-[0.16em] uppercase text-[#111111] border-b border-[#E5E5E5] pb-3">
                4. Order Review ({cart.length} {cart.length === 1 ? 'Piece' : 'Pieces'})
              </h2>

              {/* Items */}
              <div className="divide-y divide-[#F0F0F0] max-h-[300px] overflow-y-auto">
                {cart.map((item) => {
                  const product = PRODUCTS.find((p) => p.id === item.productId);
                  if (!product) return null;
                  const colorObj = product.colors.find((c) => c.name === item.colorName) || product.colors[0];

                  return (
                    <div key={`${item.productId}-${item.colorName}-${item.size}`} className="py-3 flex gap-3 text-xs">
                      <img
                        src={colorObj.images[0]}
                        alt={product.name}
                        className="w-14 h-18 bg-[#F5F5F5] object-cover shrink-0 border border-[#E5E5E5]"
                        referrerPolicy="no-referrer"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-[#111111]">{product.name}</h4>
                        <p className="text-[#777777]">
                          Shade: {item.colorName} · Size: {item.size}
                        </p>
                        <p className="text-[#777777]">Qty: {item.quantity}</p>
                      </div>
                      <span className="font-medium text-[#111111] tabular-nums">
                        ₹{(product.price * item.quantity).toLocaleString('en-IN')}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Price Calculation */}
              <div className="border-t border-[#E5E5E5] pt-4 space-y-2 text-xs">
                <div className="flex justify-between text-[#777777]">
                  <span>Subtotal</span>
                  <span className="tabular-nums text-[#111111]">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-[#777777]">
                  <span>Shipping</span>
                  <span className="tabular-nums text-[#111111]">
                    {shippingCost === 0 ? 'Complimentary' : `₹${shippingCost.toLocaleString('en-IN')}`}
                  </span>
                </div>
                <div className="flex justify-between text-[#777777]">
                  <span>GST &amp; Atelier Handling</span>
                  <span className="text-[#111111]">Included</span>
                </div>
                <div className="border-t border-[#E5E5E5] pt-3 flex justify-between items-baseline text-sm font-semibold text-[#111111]">
                  <span>Total</span>
                  <span className="text-lg tabular-nums font-serif">₹{grandTotal.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full bg-[#111111] text-white py-4 text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#333333] transition-colors"
              >
                Complete Order (₹{grandTotal.toLocaleString('en-IN')})
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-[#777777] text-center pt-2">
                <ShieldCheck size={14} />
                <span>Risk-free demonstration. No card will be charged.</span>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
