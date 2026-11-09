/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const SearchModal: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen, products, navigateToProduct, navigateToCategory } = useStore();
  const [searchTerm, setSearchTerm] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setSearchTerm('');
    }
  }, [isSearchOpen]);

  if (!isSearchOpen) return null;

  const filteredProducts = searchTerm.trim() === '' 
    ? [] 
    : products.filter((p) => {
        const query = searchTerm.toLowerCase();
        return (
          p.name.toLowerCase().includes(query) ||
          p.subtitle.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query) ||
          p.materialType.toLowerCase().includes(query) ||
          p.composition.toLowerCase().includes(query)
        );
      });

  const popularSearches = ['Alfaiataria em Linho', 'Vestido Escultural', 'Couro de Maçã', 'Lã Rastreável ZQ', 'Liocel Sustentável'];

  return (
    <div className="fixed inset-0 z-50 bg-[#183D32]/60 backdrop-blur-sm flex items-start justify-center pt-16 sm:pt-24 px-4 transition-all">
      <div 
        className="bg-[#F5F1E8] w-full max-w-3xl border border-[#D8CCBA] shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="p-6 border-b border-[#D8CCBA]/80 flex items-center gap-4">
          <Search className="w-6 h-6 text-[#183D32]" strokeWidth={1.5} />
          <input
            ref={inputRef}
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Pesquise por nome, tecido nobre, modelagem ou categoria..."
            className="w-full bg-transparent text-[#183D32] placeholder-[#72513E]/60 text-lg sm:text-xl font-serif focus:outline-none"
          />
          <button
            onClick={() => setIsSearchOpen(false)}
            className="p-1 hover:text-[#642B38] text-[#183D32] transition-colors cursor-pointer"
            aria-label="Fechar busca"
          >
            <X className="w-6 h-6" strokeWidth={1.5} />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {searchTerm.trim() === '' ? (
            <div>
              <p className="text-xs tracking-[0.2em] uppercase text-[#72513E] font-medium mb-3">
                Pesquisas em Destaque no Acervo
              </p>
              <div className="flex flex-wrap gap-2">
                {popularSearches.map((term) => (
                  <button
                    key={term}
                    onClick={() => setSearchTerm(term)}
                    className="text-xs px-3.5 py-1.5 border border-[#D8CCBA] bg-white/40 hover:bg-[#183D32] hover:text-[#F5F1E8] hover:border-[#183D32] text-[#183D32] transition-all cursor-pointer font-light"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="space-y-4">
              <p className="text-xs text-[#72513E] tracking-wider uppercase font-medium">
                {filteredProducts.length} {filteredProducts.length === 1 ? 'peça encontrada' : 'peças encontradas'}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {filteredProducts.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => {
                      navigateToProduct(p.id);
                      setIsSearchOpen(false);
                    }}
                    className="flex gap-4 p-3 border border-[#D8CCBA]/60 bg-white/40 hover:bg-white hover:border-[#183D32] cursor-pointer transition-all group"
                  >
                    <img
                      src={p.images[0]}
                      alt={p.name}
                      className="w-20 h-24 object-cover shrink-0 bg-[#D8CCBA]/30"
                    />
                    <div className="flex flex-col justify-between overflow-hidden">
                      <div>
                        <span className="text-[10px] tracking-[0.2em] uppercase text-[#72513E] block">
                          {p.category}
                        </span>
                        <h4 className="font-serif text-base text-[#183D32] group-hover:text-[#642B38] transition-colors truncate">
                          {p.name}
                        </h4>
                        <p className="text-xs text-[#72513E]/80 truncate font-light mt-0.5">
                          {p.materialType}
                        </p>
                      </div>
                      <div className="text-xs font-medium text-[#183D32] tabular-nums">
                        R$ {p.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="py-12 text-center text-[#72513E]">
              <p className="font-serif text-xl mb-1">Nenhuma peça encontrada com este termo.</p>
              <p className="text-xs font-light">Experimente buscar por linho, lã, alfaiataria, bolsa ou vestido.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
