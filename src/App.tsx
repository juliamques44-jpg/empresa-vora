/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Header } from './components/layout/Header';
import { MobileNav } from './components/layout/MobileNav';
import { Footer } from './components/layout/Footer';
import { HeroBanner } from './components/home/HeroBanner';
import { ManifestoSection } from './components/home/ManifestoSection';
import { CollectionCards } from './components/home/CollectionCards';
import { FeaturedProducts } from './components/home/FeaturedProducts';
import { SustainabilityHighlight } from './components/home/SustainabilityHighlight';
import { CatalogView } from './components/catalog/CatalogView';
import { ProductDetailView } from './components/product/ProductDetailView';
import { CheckoutView } from './components/checkout/CheckoutView';
import { AccountView } from './components/account/AccountView';
import { WishlistView } from './components/wishlist/WishlistView';
import { CollectionsView } from './components/collections/CollectionsView';
import { SustainabilityView } from './components/sustainability/SustainabilityView';
import { EvoraCareView } from './components/care/EvoraCareView';
import { AboutView } from './components/about/AboutView';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { SearchModal } from './components/search/SearchModal';
import { CartDrawer } from './components/cart/CartDrawer';
import { CriticalFlowsTestModal } from './components/tests/CriticalFlowsTestModal';

const AppContent: React.FC = () => {
  const { activeView, toastMessage } = useStore();
  const [isTestModalOpen, setIsTestModalOpen] = useState(false);

  const renderCurrentView = () => {
    switch (activeView) {
      case 'home':
        return (
          <>
            <HeroBanner />
            <ManifestoSection />
            <CollectionCards />
            <FeaturedProducts />
            <SustainabilityHighlight />
          </>
        );
      case 'catalog':
        return <CatalogView />;
      case 'product-detail':
        return <ProductDetailView />;
      case 'checkout':
        return <CheckoutView />;
      case 'account':
        return <AccountView />;
      case 'wishlist':
        return <WishlistView />;
      case 'collections':
        return <CollectionsView />;
      case 'sustainability':
        return <SustainabilityView />;
      case 'care':
        return <EvoraCareView />;
      case 'about':
        return <AboutView />;
      case 'admin':
        return <AdminDashboard />;
      default:
        return (
          <>
            <HeroBanner />
            <ManifestoSection />
            <CollectionCards />
            <FeaturedProducts />
            <SustainabilityHighlight />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F1E8] text-[#183D32]">
      {/* Toast Notification Container */}
      {toastMessage && (
        <div 
          role="status"
          aria-live="polite"
          className="fixed bottom-20 lg:bottom-8 right-4 sm:right-8 z-50 bg-[#183D32] text-[#F5F1E8] px-5 py-3.5 border border-[#D8CCBA]/40 shadow-2xl text-xs tracking-wider uppercase flex items-center gap-3 animate-fade-in max-w-sm font-light"
        >
          <span className="w-2 h-2 rounded-full bg-[#D8CCBA] shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Navigation */}
      <Header />

      {/* Main Content Area */}
      <main className="flex-1">
        {renderCurrentView()}
      </main>

      {/* Footer */}
      <Footer onOpenTestModal={() => setIsTestModalOpen(true)} />

      {/* Mobile Bottom Navigation Bar */}
      <MobileNav />

      {/* Global Modals & Drawers */}
      <SearchModal />
      <CartDrawer />
      <CriticalFlowsTestModal 
        isOpen={isTestModalOpen} 
        onClose={() => setIsTestModalOpen(false)} 
      />
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
