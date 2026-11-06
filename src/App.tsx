/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ShoppingBagDrawer } from './components/ShoppingBagDrawer';
import { SearchPanel } from './components/SearchPanel';
import { ProductInfoDrawer } from './components/ProductInfoDrawer';

import { HomePage } from './pages/HomePage';
import { CollectionPage } from './pages/CollectionPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { WishlistPage } from './pages/WishlistPage';
import { AccountPage } from './pages/AccountPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrderConfirmationPage } from './pages/OrderConfirmationPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { PoliciesPage } from './pages/PoliciesPage';

const AppContent: React.FC = () => {
  const { currentRoute, atelierAtmosphere } = useStore();

  const getAtmosphereStyles = () => {
    switch (atelierAtmosphere) {
      case 'solar':
        return 'bg-[#FFFFFF] text-[#0A0A0A]';
      case 'twilight':
        return 'bg-[#F1F3F7] text-[#0F172A]';
      case 'midnight':
        return 'bg-[#0A0A0A] text-[#F8FAFC]';
      case 'dawn':
      default:
        return 'bg-[#FFFFFF] text-[#0A0A0A]';
    }
  };

  const isCheckout = currentRoute === 'checkout';

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-700 ${getAtmosphereStyles()}`}>
      {/* Top Header (omitted on checkout for focused purchase experience) */}
      {!isCheckout && <Header />}

      {/* Main Routed Page Content */}
      <main className="flex-1">
        {currentRoute === 'home' && <HomePage />}
        {currentRoute === 'collection' && <CollectionPage />}
        {currentRoute === 'product' && <ProductDetailPage />}
        {currentRoute === 'wishlist' && <WishlistPage />}
        {currentRoute === 'account' && <AccountPage />}
        {currentRoute === 'checkout' && <CheckoutPage />}
        {currentRoute === 'order-confirmation' && <OrderConfirmationPage />}
        {currentRoute === 'about' && <AboutPage />}
        {currentRoute === 'contact' && <ContactPage />}
        {currentRoute === 'policies' && <PoliciesPage />}
      </main>

      {/* Footer (omitted on checkout) */}
      {!isCheckout && <Footer />}

      {/* Global Interactive Overlays */}
      <ShoppingBagDrawer />
      <SearchPanel />
      <ProductInfoDrawer />
    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <AppContent />
    </StoreProvider>
  );
}
