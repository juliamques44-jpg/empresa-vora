/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Heart, Sparkles, ArrowRight } from 'lucide-react';
import { Product } from '../../types';
import { useStore } from '../../context/StoreContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { navigateToProduct, toggleWishlist, isInWishlist } = useStore();
  const [isHovered, setIsHovered] = useState(false);
  const isFavorite = isInWishlist(product.id);

  const displayImage = isHovered && product.secondaryImage 
    ? product.secondaryImage 
    : product.images[0];

  return (
    <div 
      className="group relative flex flex-col bg-[#F5F1E8] border border-[#D8CCBA]/50 transition-all duration-300 hover:border-[#183D32]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image Container */}
      <div 
        onClick={() => navigateToProduct(product.id)}
        className="relative aspect-[3/4] w-full overflow-hidden bg-[#D8CCBA]/20 cursor-pointer"
      >
        <img
          src={displayImage}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Favorite Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className="absolute top-2.5 right-2.5 z-10 w-8 h-8 rounded-full bg-[#F5F1E8]/85 backdrop-blur-xs flex items-center justify-center text-[#183D32] hover:text-[#642B38] transition-colors cursor-pointer"
          aria-label={isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
          title={isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
        >
          <Heart 
            className={`w-4 h-4 ${isFavorite ? 'fill-[#642B38] text-[#642B38]' : ''}`} 
            strokeWidth={1.4} 
          />
        </button>

        {/* Edition Badges - Zero Pill Clean Aesthetic */}
        {product.isLimitedEdition && (
          <div className="absolute top-2.5 left-2.5 z-10 bg-[#183D32]/90 text-[#F5F1E8] text-[9px] uppercase tracking-[0.2em] px-2 py-0.5 font-light">
            Edição {product.limitedEditionRemaining} de {product.limitedEditionCount}
          </div>
        )}

        {/* Quick View Strip on Desktop Hover */}
        <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-[#183D32]/90 via-[#183D32]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-between text-[#F5F1E8]">
          <span className="text-[10px] tracking-[0.2em] uppercase font-light">
            {product.availability.includes('Sob Demanda') ? 'Feito Sob Medida' : 'Pronta Entrega'}
          </span>
          <span className="text-[10px] tracking-[0.15em] uppercase font-medium flex items-center gap-1">
            <span>Ver Peça</span>
            <ArrowRight className="w-3 h-3" />
          </span>
        </div>
      </div>

      {/* Metadata & Pricing Details */}
      <div 
        onClick={() => navigateToProduct(product.id)}
        className="p-3 sm:p-4 flex flex-col justify-between flex-grow cursor-pointer"
      >
        <div>
          <div className="flex items-center justify-between text-[10px] tracking-[0.2em] uppercase text-[#72513E] mb-1 font-light">
            <span>{product.category}</span>
            <div className="flex items-center gap-1">
              {product.colors.map((c) => (
                <span
                  key={c.name}
                  className="w-2.5 h-2.5 rounded-full border border-[#D8CCBA]"
                  style={{ backgroundColor: c.hex }}
                  title={c.name}
                />
              ))}
            </div>
          </div>

          <h3 className="font-serif text-sm sm:text-base text-[#183D32] group-hover:text-[#642B38] transition-colors leading-snug line-clamp-2">
            {product.name}
          </h3>

          <p className="text-[11px] text-[#72513E]/80 line-clamp-1 mt-1 font-light">
            {product.materialType}
          </p>
        </div>

        <div className="pt-3 mt-2 border-t border-[#D8CCBA]/40 flex flex-col">
          <span className="text-xs sm:text-sm font-semibold text-[#183D32] tabular-nums">
            R$ {product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </span>
          <span className="text-[10px] text-[#72513E] font-light">
            em até {product.installments}x de R$ {(product.price / product.installments).toLocaleString('pt-BR', { minimumFractionDigits: 2 })} sem juros
          </span>
        </div>
      </div>
    </div>
  );
};
