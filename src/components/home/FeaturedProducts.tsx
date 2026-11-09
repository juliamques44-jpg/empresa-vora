/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { ProductCard } from '../catalog/ProductCard';

export const FeaturedProducts: React.FC = () => {
  const { products, setActiveView } = useStore();
  const featured = products.slice(0, 4);

  return (
    <section className="py-20 sm:py-28 bg-[#F5F1E8] border-b border-[#D8CCBA]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs uppercase tracking-[0.3em] text-[#72513E] font-medium block mb-2">
              Seleção Curada
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl text-[#183D32] font-light">
              Peças em Evidência
            </h2>
          </div>
          <button
            onClick={() => {
              setActiveView('catalog');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-[#183D32] hover:text-[#642B38] font-medium transition-colors cursor-pointer"
          >
            <span>Ver Todo o Acervo</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* 2 columns on mobile, 4 on desktop */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};
