/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Search, Heart, ShoppingBag, User, ShieldCheck, Sparkles } from 'lucide-react';
import { useStore, AppView } from '../../context/StoreContext';

export const Header: React.FC = () => {
  const { 
    activeView, 
    setActiveView, 
    cart, 
    wishlist, 
    setIsCartOpen, 
    setIsSearchOpen,
    currentUser,
    isAdmin 
  } = useStore();

  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const navLinks: { label: string; view: AppView }[] = [
    { label: 'Início', view: 'home' },
    { label: 'Coleções', view: 'collections' },
    { label: 'Loja', view: 'catalog' },
    { label: 'Sustentabilidade', view: 'sustainability' },
    { label: 'ÉVORA Care', view: 'care' },
    { label: 'Sobre', view: 'about' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#F5F1E8]/95 backdrop-blur-md border-b border-[#D8CCBA]/60 transition-colors">
      {/* Top Quiet Luxury Notice / Slogan strip */}
      <div className="bg-[#183D32] text-[#F5F1E8] text-[11px] tracking-[0.2em] uppercase py-1.5 px-4 text-center font-light">
        <span>Compre menos, escolha bem, faça durar</span>
        <span className="mx-2 text-[#D8CCBA]/60">·</span>
        <span className="text-[#D8CCBA]">Alta Moda Sustentável Feita Sob Demanda</span>
      </div>

      {/* Main Header Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-8">
        {/* Brand Wordmark (Zone 1) */}
        <button
          onClick={() => { setActiveView('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className="text-left group cursor-pointer focus:outline-none flex flex-col items-start"
          aria-label="ÉVORA Página Inicial"
        >
          <div className="flex items-center gap-1.5 mb-0.5">
            <svg className="w-4 h-4 text-[#72513E] fill-current" viewBox="0 0 24 24">
              <path d="M12 2C12 2 13 7 17 9C13 10 12 14 12 14C12 14 11 10 7 9C11 7 12 2 12 2Z" />
              <path d="M12 14V22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <span className="text-[9px] uppercase tracking-[0.35em] text-[#72513E] font-light">
              Maison
            </span>
          </div>
          <span className="font-serif text-2xl sm:text-3xl tracking-[0.32em] text-[#183D32] font-semibold uppercase block group-hover:text-[#642B38] transition-colors leading-none">
            ÉVORA
          </span>
        </button>

        {/* Desktop Nav Links (Zone 2) */}
        <nav className="hidden lg:flex items-center gap-7 text-[13px] tracking-[0.16em] uppercase font-medium text-[#183D32]/80">
          {navLinks.map((link) => {
            const isActive = activeView === link.view;
            return (
              <button
                key={link.view}
                onClick={() => {
                  setActiveView(link.view);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`py-1 cursor-pointer transition-colors relative ${
                  isActive 
                    ? 'text-[#183D32] font-semibold' 
                    : 'hover:text-[#642B38]'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#183D32]" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Action Affordances (Zone 3) */}
        <div className="flex items-center gap-3 sm:gap-4 text-[#183D32]">
          {/* Search Trigger */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="p-2 hover:text-[#642B38] transition-colors cursor-pointer"
            aria-label="Pesquisar no acervo"
            title="Pesquisar peças"
          >
            <Search className="w-5 h-5" strokeWidth={1.3} />
          </button>

          {/* Wishlist Link */}
          <button
            onClick={() => { setActiveView('wishlist'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="p-2 hover:text-[#642B38] transition-colors relative cursor-pointer"
            aria-label={`Favoritos (${wishlist.length})`}
            title="Peças favoritas"
          >
            <Heart className={`w-5 h-5 ${wishlist.length > 0 ? 'fill-[#642B38] text-[#642B38]' : ''}`} strokeWidth={1.3} />
            {wishlist.length > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#642B38] text-[#F5F1E8] text-[10px] flex items-center justify-center font-medium">
                {wishlist.length}
              </span>
            )}
          </button>

          {/* Bag Trigger */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="p-2 hover:text-[#642B38] transition-colors relative cursor-pointer"
            aria-label={`Sacola de compras (${totalCartCount})`}
            title="Abrir sacola de compras"
          >
            <ShoppingBag className="w-5 h-5" strokeWidth={1.3} />
            {totalCartCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#183D32] text-[#F5F1E8] text-[10px] flex items-center justify-center font-medium">
                {totalCartCount}
              </span>
            )}
          </button>

          {/* Account Profile */}
          <button
            onClick={() => { setActiveView('account'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className={`p-2 hover:text-[#642B38] transition-colors cursor-pointer hidden sm:flex items-center gap-1.5 ${
              activeView === 'account' ? 'text-[#642B38]' : ''
            }`}
            aria-label="Minha Conta"
            title={currentUser ? `Conta de ${currentUser.name}` : 'Acessar Conta'}
          >
            <User className="w-5 h-5" strokeWidth={1.3} />
            {currentUser && (
              <span className="text-xs uppercase tracking-wider hidden xl:inline font-medium text-[#72513E]">
                {currentUser.name.split(' ')[0]}
              </span>
            )}
          </button>

          {/* Admin Switcher / Badge */}
          <button
            onClick={() => { setActiveView('admin'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className={`text-xs px-2.5 py-1 tracking-wider uppercase border transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeView === 'admin'
                ? 'bg-[#183D32] text-[#F5F1E8] border-[#183D32]'
                : 'text-[#183D32] border-[#D8CCBA] hover:border-[#183D32] bg-[#F5F1E8]'
            }`}
            title="Painel Administrativo da Maison"
          >
            <ShieldCheck className="w-3.5 h-3.5" strokeWidth={1.5} />
            <span className="hidden md:inline font-medium">Painel Maison</span>
          </button>
        </div>
      </div>
    </header>
  );
};
