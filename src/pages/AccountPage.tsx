import React, { useState } from 'react';
import {
  Package,
  MapPin,
  User,
  Check,
  Plus,
  Trash2,
  Edit2
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { CustomerAddress } from '../types';

export const AccountPage: React.FC = () => {
  const {
    userProfile,
    updateUserProfile,
    addresses,
    addAddress,
    updateAddress,
    deleteAddress,
    setDefaultAddress,
    orders,
    navigate,
    marketingPrefs,
    updateMarketingPrefs,
  } = useStore();

  const [activeTab, setActiveTab] = useState<'orders' | 'addresses' | 'profile' | 'preferences'>('orders');

  // Profile edit form state
  const [profileForm, setProfileForm] = useState(userProfile);
  const [profileSavedMsg, setProfileSavedMsg] = useState(false);

  // Address modal / form state
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState<string | null>(null);
  const [addressForm, setAddressForm] = useState({
    name: '',
    phone: '',
    street: '',
    apartment: '',
    city: '',
    state: '',
    pinCode: '',
    isDefault: false,
  });

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile(profileForm);
    setProfileSavedMsg(true);
    setTimeout(() => setProfileSavedMsg(false), 3000);
  };

  const openAddAddress = () => {
    setEditingAddressId(null);
    setAddressForm({
      name: userProfile.name,
      phone: userProfile.phone,
      street: '',
      apartment: '',
      city: '',
      state: '',
      pinCode: '',
      isDefault: addresses.length === 0,
    });
    setShowAddressModal(true);
  };

  const openEditAddress = (addr: CustomerAddress) => {
    setEditingAddressId(addr.id);
    setAddressForm({
      name: addr.name,
      phone: addr.phone,
      street: addr.street,
      apartment: addr.apartment || '',
      city: addr.city,
      state: addr.state,
      pinCode: addr.pinCode,
      isDefault: addr.isDefault,
    });
    setShowAddressModal(true);
  };

  const handleSaveAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingAddressId) {
      updateAddress({
        id: editingAddressId,
        ...addressForm,
      });
    } else {
      addAddress(addressForm);
    }
    setShowAddressModal(false);
  };

  return (
    <div className="w-full bg-white text-[#111111] pb-28">
      {/* Header */}
      <div className="w-full px-4 sm:px-6 md:px-10 lg:px-14 pt-12 pb-8 border-b border-[#E5E5E5]">
        <nav className="text-xs uppercase tracking-[0.16em] text-[#777777] mb-3 flex items-center gap-2">
          <button onClick={() => navigate('home')} className="hover:text-[#111111] transition-colors">Home</button>
          <span>/</span>
          <span className="text-[#111111]">Account</span>
        </nav>
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
          <h1 className="text-2xl sm:text-3xl font-light tracking-tight text-[#111111]">
            Account
          </h1>
          <p className="text-xs text-[#777777]">
            {userProfile.email}
          </p>
        </div>

        {/* Minimal Navigation Tabs */}
        <div className="flex items-center gap-8 mt-8 text-xs uppercase tracking-[0.16em] overflow-x-auto pb-2">
          <button
            onClick={() => setActiveTab('orders')}
            className={`pb-2 transition-colors relative whitespace-nowrap ${
              activeTab === 'orders'
                ? 'text-[#111111] font-medium border-b border-[#111111]'
                : 'text-[#777777] hover:text-[#111111]'
            }`}
          >
            Orders ({orders.length})
          </button>
          <button
            onClick={() => setActiveTab('addresses')}
            className={`pb-2 transition-colors relative whitespace-nowrap ${
              activeTab === 'addresses'
                ? 'text-[#111111] font-medium border-b border-[#111111]'
                : 'text-[#777777] hover:text-[#111111]'
            }`}
          >
            Addresses ({addresses.length})
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            className={`pb-2 transition-colors relative whitespace-nowrap ${
              activeTab === 'profile'
                ? 'text-[#111111] font-medium border-b border-[#111111]'
                : 'text-[#777777] hover:text-[#111111]'
            }`}
          >
            Details
          </button>
          <button
            onClick={() => setActiveTab('preferences')}
            className={`pb-2 transition-colors relative whitespace-nowrap ${
              activeTab === 'preferences'
                ? 'text-[#111111] font-medium border-b border-[#111111]'
                : 'text-[#777777] hover:text-[#111111]'
            }`}
          >
            Preferences
          </button>
        </div>
      </div>

      <div className="w-full px-4 sm:px-6 md:px-10 lg:px-14 pt-10">
        {/* Tab 1: Orders (Hassle-free, readable, airy) */}
        {activeTab === 'orders' && (
          <div className="space-y-6 max-w-3xl">
            {orders.length === 0 ? (
              <div className="py-20 text-center space-y-3">
                <p className="text-sm text-[#71717A]">You have no recent orders.</p>
                <button
                  onClick={() => navigate('collection')}
                  className="text-xs uppercase tracking-[0.16em] underline underline-offset-4 text-[#0A0A0A] hover:text-[#71717A] transition-colors"
                >
                  Explore Collection
                </button>
              </div>
            ) : (
              orders.map((order) => (
                <div key={order.id} className="border border-[#E5E7EB] bg-white p-6 sm:p-8 space-y-6">
                  {/* Clean Order Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E5E7EB]">
                    <div className="space-y-1">
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-medium text-[#0A0A0A] tracking-tight">Order #{order.orderNumber}</span>
                        <span className="text-xs text-[#71717A]">&bull; {order.date}</span>
                      </div>
                      <p className="text-xs text-[#71717A]">
                        Delivery to {order.deliveryAddress?.city || 'Bengaluru'}, {order.deliveryAddress?.state || 'Karnataka'}
                      </p>
                    </div>

                    <div className="flex sm:flex-col sm:items-end justify-between items-center gap-1">
                      <span className="text-base font-medium text-[#0A0A0A] tabular-nums">
                        ₹{order.total.toLocaleString('en-IN')}
                      </span>
                      <span className="text-[11px] uppercase tracking-wider text-[#0A0A0A] font-medium bg-[#F1F3F5] px-2.5 py-0.5">
                        {order.status}
                      </span>
                    </div>
                  </div>

                  {/* Clean Item Cards */}
                  <div className="space-y-4">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between text-xs gap-4">
                        <div className="flex items-center gap-4">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-14 h-18 object-cover bg-[#F1F3F5] shrink-0"
                          />
                          <div className="space-y-1">
                            <p className="text-sm font-medium text-[#0A0A0A]">{item.name}</p>
                            <p className="text-xs text-[#71717A]">
                              Size {item.size} &bull; {item.colorName} &bull; Qty {item.quantity}
                            </p>
                          </div>
                        </div>
                        <span className="text-xs font-medium text-[#0A0A0A] tabular-nums shrink-0">
                          ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Simple Hassle-Free Footer with Actions */}
                  <div className="pt-4 border-t border-[#E5E7EB] flex items-center justify-between text-xs text-[#71717A]">
                    <span>Tracking: {order.trackingNumber || 'DELHIVERY-9948201'}</span>
                    <button
                      onClick={() => alert(`Tracking package ${order.trackingNumber || 'DELHIVERY-9948201'}: In Transit via Express Courier`)}
                      className="text-xs uppercase tracking-[0.16em] font-medium text-[#0A0A0A] hover:underline underline-offset-4"
                    >
                      Track Package &rarr;
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Tab 2: Addresses */}
        {activeTab === 'addresses' && (
          <div className="max-w-4xl space-y-8">
            <div className="flex items-center justify-between">
              <p className="text-xs text-[#777777]">Manage your delivery destinations.</p>
              <button
                onClick={openAddAddress}
                className="text-xs uppercase tracking-[0.16em] text-[#111111] underline underline-offset-4 hover:text-[#777777] transition-colors"
              >
                + Add Address
              </button>
            </div>

            {addresses.length === 0 ? (
              <p className="text-xs text-[#777777] py-8">No saved addresses.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {addresses.map((addr) => (
                  <div key={addr.id} className="border-b border-[#E5E5E5] pb-6 space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-[#111111]">{addr.name}</span>
                      {addr.isDefault && (
                        <span className="text-[10px] uppercase tracking-wider text-[#777777]">Default</span>
                      )}
                    </div>
                    <p className="text-[#555555]">
                      {addr.street} {addr.apartment && `, ${addr.apartment}`}
                    </p>
                    <p className="text-[#555555]">
                      {addr.city}, {addr.state} {addr.pinCode}
                    </p>
                    <p className="text-[#777777]">{addr.phone}</p>

                    <div className="flex items-center gap-4 pt-3 text-[11px] text-[#777777]">
                      <button
                        onClick={() => openEditAddress(addr)}
                        className="hover:text-[#111111] underline underline-offset-2 transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteAddress(addr.id)}
                        className="hover:text-[#111111] underline underline-offset-2 transition-colors"
                      >
                        Remove
                      </button>
                      {!addr.isDefault && (
                        <button
                          onClick={() => setDefaultAddress(addr.id)}
                          className="hover:text-[#111111] underline underline-offset-2 transition-colors"
                        >
                          Set Default
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Profile / Details */}
        {activeTab === 'profile' && (
          <div className="max-w-lg space-y-6">
            <p className="text-xs text-[#777777]">Your personal information.</p>

            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-[0.14em] text-[#777777] mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={profileForm.name}
                  onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                  className="w-full border-b border-[#E5E5E5] py-2 text-sm text-[#111111] focus:outline-none focus:border-[#111111] transition-colors"
                  required
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-[0.14em] text-[#777777] mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={profileForm.email}
                  onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                  className="w-full border-b border-[#E5E5E5] py-2 text-sm text-[#111111] focus:outline-none focus:border-[#111111] transition-colors"
                  required
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-[0.14em] text-[#777777] mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={profileForm.phone}
                  onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                  className="w-full border-b border-[#E5E5E5] py-2 text-sm text-[#111111] focus:outline-none focus:border-[#111111] transition-colors"
                />
              </div>

              <div className="pt-4 flex items-center gap-4">
                <button
                  type="submit"
                  className="bg-[#111111] text-white text-xs uppercase tracking-[0.18em] font-medium px-8 py-3.5 hover:bg-[#333333] transition-colors"
                >
                  Save Changes
                </button>
                {profileSavedMsg && (
                  <span className="text-xs text-[#111111] flex items-center gap-1.5">
                    <Check size={14} /> Saved
                  </span>
                )}
              </div>
            </form>
          </div>
        )}

        {/* Tab 4: Preferences */}
        {activeTab === 'preferences' && (
          <div className="max-w-lg space-y-6">
            <p className="text-xs text-[#777777]">Communication preferences.</p>

            <div className="divide-y divide-[#E5E5E5] text-xs">
              <div className="py-4 flex items-center justify-between">
                <div>
                  <p className="font-medium text-[#111111]">Email Notifications</p>
                  <p className="text-[#777777] mt-0.5">Order updates, release announcements, and receipts.</p>
                </div>
                <input
                  type="checkbox"
                  checked={marketingPrefs.email}
                  onChange={(e) => updateMarketingPrefs({ email: e.target.checked, sms: marketingPrefs.sms })}
                  className="w-4 h-4 accent-[#111111] cursor-pointer"
                />
              </div>

              <div className="py-4 flex items-center justify-between">
                <div>
                  <p className="font-medium text-[#111111]">SMS Alerts</p>
                  <p className="text-[#777777] mt-0.5">Shipment dispatch and delivery notifications.</p>
                </div>
                <input
                  type="checkbox"
                  checked={marketingPrefs.sms}
                  onChange={(e) => updateMarketingPrefs({ email: marketingPrefs.email, sms: e.target.checked })}
                  className="w-4 h-4 accent-[#111111] cursor-pointer"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Address Edit / Add Modal */}
      {showAddressModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="bg-white max-w-md w-full p-8 shadow-xl space-y-6">
            <div className="flex items-center justify-between border-b border-[#E5E5E5] pb-3">
              <h3 className="text-base font-light text-[#111111]">
                {editingAddressId ? 'Edit Address' : 'New Address'}
              </h3>
              <button
                onClick={() => setShowAddressModal(false)}
                className="text-xs text-[#777777] hover:text-[#111111] uppercase tracking-wider"
              >
                Close
              </button>
            </div>

            <form onSubmit={handleSaveAddress} className="space-y-4 text-xs">
              <div>
                <label className="block uppercase tracking-[0.12em] text-[#777777] mb-1">Recipient Name</label>
                <input
                  type="text"
                  required
                  value={addressForm.name}
                  onChange={(e) => setAddressForm({ ...addressForm, name: e.target.value })}
                  className="w-full border-b border-[#E5E5E5] py-2 text-sm focus:outline-none focus:border-[#111111]"
                />
              </div>

              <div>
                <label className="block uppercase tracking-[0.12em] text-[#777777] mb-1">Phone</label>
                <input
                  type="tel"
                  required
                  value={addressForm.phone}
                  onChange={(e) => setAddressForm({ ...addressForm, phone: e.target.value })}
                  className="w-full border-b border-[#E5E5E5] py-2 text-sm focus:outline-none focus:border-[#111111]"
                />
              </div>

              <div>
                <label className="block uppercase tracking-[0.12em] text-[#777777] mb-1">Street Address</label>
                <input
                  type="text"
                  required
                  value={addressForm.street}
                  onChange={(e) => setAddressForm({ ...addressForm, street: e.target.value })}
                  className="w-full border-b border-[#E5E5E5] py-2 text-sm focus:outline-none focus:border-[#111111]"
                />
              </div>

              <div>
                <label className="block uppercase tracking-[0.12em] text-[#777777] mb-1">Apartment / Suite (Optional)</label>
                <input
                  type="text"
                  value={addressForm.apartment}
                  onChange={(e) => setAddressForm({ ...addressForm, apartment: e.target.value })}
                  className="w-full border-b border-[#E5E5E5] py-2 text-sm focus:outline-none focus:border-[#111111]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block uppercase tracking-[0.12em] text-[#777777] mb-1">City</label>
                  <input
                    type="text"
                    required
                    value={addressForm.city}
                    onChange={(e) => setAddressForm({ ...addressForm, city: e.target.value })}
                    className="w-full border-b border-[#E5E5E5] py-2 text-sm focus:outline-none focus:border-[#111111]"
                  />
                </div>
                <div>
                  <label className="block uppercase tracking-[0.12em] text-[#777777] mb-1">Postal Code</label>
                  <input
                    type="text"
                    required
                    value={addressForm.pinCode}
                    onChange={(e) => setAddressForm({ ...addressForm, pinCode: e.target.value })}
                    className="w-full border-b border-[#E5E5E5] py-2 text-sm focus:outline-none focus:border-[#111111]"
                  />
                </div>
              </div>

              <div>
                <label className="block uppercase tracking-[0.12em] text-[#777777] mb-1">State / Province</label>
                <input
                  type="text"
                  required
                  value={addressForm.state}
                  onChange={(e) => setAddressForm({ ...addressForm, state: e.target.value })}
                  className="w-full border-b border-[#E5E5E5] py-2 text-sm focus:outline-none focus:border-[#111111]"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="addrDefault"
                  checked={addressForm.isDefault}
                  onChange={(e) => setAddressForm({ ...addressForm, isDefault: e.target.checked })}
                  className="w-4 h-4 accent-[#111111]"
                />
                <label htmlFor="addrDefault" className="text-xs text-[#555555] cursor-pointer">
                  Set as default address
                </label>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddressModal(false)}
                  className="px-4 py-2 text-xs uppercase tracking-wider text-[#777777] hover:text-[#111111]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#111111] text-white text-xs uppercase tracking-[0.16em] px-6 py-2.5 hover:bg-[#333333]"
                >
                  Save Address
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
