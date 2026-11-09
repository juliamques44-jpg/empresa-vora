/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Heart, ShoppingBag, ArrowRight } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { ProductCard } from '../catalog/ProductCard';

export const WishlistView: React.FC = () => {
  const { wishlist, products, addToCart, setActiveView, toggleWishlist } = useStore();

  const favoriteProducts = products.filter((p) => wishlist.includes(p.id));

  return (
    <div className="bg-[#F5F1E8] min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center sm:text-left border-b border-[#D8CCBA]/60 pb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="flex items-center justify-center sm:justify-start gap-2 text-[10px] tracking-[0.25em] uppercase text-[#72513E] mb-2 font-light">
              <span>Maison ÉVORA</span>
              <span>/</span>
              <span>Favoritos</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl text-[#183D32] font-light">
              Peças Sob Sua Contemplação
            </h1>
            <p className="text-xs sm:text-sm text-[#72513E] font-light mt-1">
              Guarde criações para decidir com serenidade. O luxo consciente reside na certeza da escolha.
            </p>
          </div>

          <span className="text-xs text-[#72513E] font-light">
            <strong className="font-medium text-[#183D32] tabular-nums">{favoriteProducts.length}</strong> {favoriteProducts.length === 1 ? 'peça guardada' : 'peças guardadas'}
          </span>
        </div>

        {favoriteProducts.length === 0 ? (
          <div className="py-24 text-center bg-white/40 border border-[#D8CCBA] p-8 space-y-4 max-w-xl mx-auto">
            <Heart className="w-10 h-10 text-[#72513E] mx-auto opacity-50" strokeWidth={1} />
            <h2 className="font-serif text-2xl text-[#183D32]">Sua lista de favoritos está vazia.</h2>
            <p className="text-xs text-[#72513E] font-light leading-relaxed">
              Percorra nossas coleções atemporais e selecione as silhuetas que dialogam com seu estilo duradouro.
            </p>
            <button
              onClick={() => setActiveView('catalog')}
              className="px-8 py-3 bg-[#183D32] text-[#F5F1E8] text-xs uppercase tracking-widest font-medium hover:bg-[#642B38] transition-colors cursor-pointer"
            >
              Explorar Acervo
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {favoriteProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
