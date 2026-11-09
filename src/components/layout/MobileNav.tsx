/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Home, Compass, Sparkles, Heart, ShoppingBag, User } from 'lucide-react';
import { useStore, AppView } from '../../context/StoreContext';

export const MobileNav: React.FC = () => {
  const { activeView, setActiveView, cart, wishlist, setIsCartOpen } = useStore();
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const navItems: { label: string; view: AppView | 'cart_drawer'; icon: React.ReactNode; badge?: number }[] = [
    { label: 'Início', view: 'home', icon: <Home className="w-5 h-5" strokeWidth={1.25} /> },
    { label: 'Coleções', view: 'collections', icon: <Compass className="w-5 h-5" strokeWidth={1.25} /> },
    { label: 'Loja', view: 'catalog', icon: <Sparkles className="w-5 h-5" strokeWidth={1.25} /> },
    { label: 'Favoritos', view: 'wishlist', icon: <Heart className="w-5 h-5" strokeWidth={1.25} />, badge: wishlist.length },
    { label: 'Sacola', view: 'cart_drawer', icon: <ShoppingBag className="w-5 h-5" strokeWidth={1.25} />, badge: cartCount },
    { label: 'Conta', view: 'account', icon: <User className="w-5 h-5" strokeWidth={1.25} /> },
  ];

  return (
    <nav 
      aria-label="Navegação Principal Mobile" 
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#F5F1E8]/98 backdrop-blur-md border-t border-[#D8CCBA]/80 px-2 py-2 safe-area-bottom"
    >
      <div className="flex items-center justify-around max-w-md mx-auto">
        {navItems.map((item) => {
          const isCurrent = item.view === activeView;
          return (
            <button
              key={item.label}
              onClick={() => {
                if (item.view === 'cart_drawer') {
                  setIsCartOpen(true);
                } else {
                  setActiveView(item.view);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
              className={`flex flex-col items-center justify-center py-1 px-2 relative transition-colors cursor-pointer ${
                isCurrent ? 'text-[#183D32] font-semibold' : 'text-[#72513E] hover:text-[#183D32]'
              }`}
            >
              <div className="relative">
                {item.icon}
                {Boolean(item.badge && item.badge > 0) && (
                  <span className="absolute -top-1.5 -right-2 min-w-4 h-4 px-1 rounded-full bg-[#642B38] text-[#F5F1E8] text-[9px] flex items-center justify-center font-bold">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className="text-[10px] tracking-wider uppercase mt-1 font-medium">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
