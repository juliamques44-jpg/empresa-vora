/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Heart, 
  ShoppingBag, 
  Ruler, 
  ShieldCheck, 
  Clock, 
  Leaf, 
  RotateCcw, 
  Check, 
  ArrowLeft, 
  ChevronRight,
  Share2
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { ProductSize, ProductColor } from '../../types';
import { SizeGuideModal } from './SizeGuideModal';
import { ProductCard } from '../catalog/ProductCard';

export const ProductDetailView: React.FC = () => {
  const { 
    selectedProductId, 
    getProductById, 
    products, 
    addToCart, 
    toggleWishlist, 
    isInWishlist, 
    setActiveView,
    showToast
  } = useStore();

  const product = selectedProductId ? getProductById(selectedProductId) : products[0];

  // Component state
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<ProductSize>(product?.sizes[0] || 'M');
  const [selectedColor, setSelectedColor] = useState<ProductColor>(product?.colors[0] || { name: 'Verde Évora', hex: '#183D32' });
  const [isGiftWrapSelected, setIsGiftWrapSelected] = useState(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);

  if (!product) {
    return (
      <div className="py-24 text-center">
        <p className="font-serif text-2xl text-[#183D32]">Peça não encontrada.</p>
        <button
          onClick={() => setActiveView('catalog')}
          className="mt-4 px-6 py-2 bg-[#183D32] text-[#F5F1E8] text-xs uppercase tracking-wider"
        >
          Voltar ao Acervo
        </button>
      </div>
    );
  }

  const isFavorite = isInWishlist(product.id);
  const relatedProducts = products.filter((p) => p.id !== product.id).slice(0, 3);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Link da criação ÉVORA copiado para a área de transferência.');
    }
  };

  const handleAddToCart = () => {
    addToCart(product, selectedSize, selectedColor, 1, isGiftWrapSelected);
  };

  return (
    <div className="bg-[#F5F1E8] min-h-screen py-8 sm:py-12">
      {/* Breadcrumb Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <nav className="flex items-center gap-2 text-xs text-[#72513E] tracking-wider font-light">
          <button 
            onClick={() => setActiveView('home')} 
            className="hover:text-[#183D32] transition-colors cursor-pointer"
          >
            Início
          </button>
          <ChevronRight className="w-3 h-3 text-[#D8CCBA]" />
          <button 
            onClick={() => setActiveView('catalog')} 
            className="hover:text-[#183D32] transition-colors cursor-pointer"
          >
            Acervo
          </button>
          <ChevronRight className="w-3 h-3 text-[#D8CCBA]" />
          <span className="text-[#183D32] font-medium truncate max-w-[200px] sm:max-w-none">
            {product.name}
          </span>
        </nav>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Product Layout: Gallery Left + Contiguous Purchase Module Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 pb-20 border-b border-[#D8CCBA]/60">
          {/* Gallery Module (Cols 1-7) */}
          <div className="lg:col-span-7 flex flex-col-reverse sm:flex-row gap-4">
            {/* Thumbnail selector */}
            <div className="flex sm:flex-col gap-3 overflow-x-auto sm:overflow-visible shrink-0 pb-2 sm:pb-0">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`w-16 h-20 sm:w-20 sm:h-24 overflow-hidden border transition-all cursor-pointer ${
                    selectedImageIndex === idx
                      ? 'border-[#183D32] ring-1 ring-[#183D32]'
                      : 'border-[#D8CCBA]/60 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img
                    src={img}
                    alt={`${product.name} visual ${idx + 1}`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-top"
                  />
                </button>
              ))}
            </div>

            {/* Main Primary Image */}
            <div className="relative aspect-[3/4] w-full bg-[#D8CCBA]/20 border border-[#D8CCBA]/60 overflow-hidden flex-grow group">
              <img
                src={product.images[selectedImageIndex] || product.images[0]}
                alt={product.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
              />

              {/* Limited Edition Watermark Badge */}
              {product.isLimitedEdition && (
                <div className="absolute top-4 left-4 bg-[#183D32] text-[#F5F1E8] text-[10px] uppercase tracking-[0.2em] px-3 py-1 font-light shadow-md">
                  Edição Limitada Numerada · {product.limitedEditionRemaining} de {product.limitedEditionCount}
                </div>
              )}

              {/* Wishlist button */}
              <button
                onClick={() => toggleWishlist(product.id)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-[#F5F1E8]/90 backdrop-blur-xs flex items-center justify-center text-[#183D32] hover:text-[#642B38] transition-colors shadow-sm cursor-pointer"
                aria-label="Salvar nos Favoritos"
                title="Salvar nos Favoritos"
              >
                <Heart 
                  className={`w-5 h-5 ${isFavorite ? 'fill-[#642B38] text-[#642B38]' : ''}`} 
                  strokeWidth={1.3} 
                />
              </button>
            </div>
          </div>

          {/* Contiguous Purchase Module (Cols 8-12) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center justify-between text-xs tracking-[0.25em] uppercase text-[#72513E] mb-2 font-light">
                <span>{product.category}</span>
                <span className="text-[#183D32] font-medium">{product.availability}</span>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#183D32] font-light leading-tight mb-2">
                {product.name}
              </h1>

              <p className="text-xs sm:text-sm text-[#72513E] leading-relaxed font-light mb-6">
                {product.subtitle}
              </p>

              {/* Price & Installments */}
              <div className="p-4 bg-white/50 border border-[#D8CCBA] mb-6">
                <div className="flex items-baseline gap-3">
                  <span className="text-2xl sm:text-3xl font-semibold text-[#183D32] tabular-nums">
                    R$ {product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </span>
                  <span className="text-xs text-[#72513E] font-light">
                    à vista no PIX (com 5% off) ou
                  </span>
                </div>
                <p className="text-xs text-[#72513E] mt-1 font-light">
                  em até <strong className="font-medium text-[#183D32]">{product.installments}x sem juros</strong> de R$ {(product.price / product.installments).toLocaleString('pt-BR', { minimumFractionDigits: 2 })} no cartão de crédito
                </p>
              </div>

              {/* Color Selection */}
              <div className="mb-6">
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="text-[#72513E] tracking-wider uppercase font-medium">Cor da Peça:</span>
                  <span className="text-[#183D32] font-semibold">{selectedColor.name}</span>
                </div>
                <div className="flex items-center gap-3">
                  {product.colors.map((color) => {
                    const isSelected = selectedColor.name === color.name;
                    return (
                      <button
                        key={color.name}
                        onClick={() => setSelectedColor(color)}
                        className={`flex items-center gap-2 px-3 py-1.5 border text-xs transition-all cursor-pointer ${
                          isSelected
                            ? 'border-[#183D32] bg-white text-[#183D32] font-medium ring-1 ring-[#183D32]'
                            : 'border-[#D8CCBA] bg-white/40 text-[#72513E] hover:border-[#183D32]'
                        }`}
                      >
                        <span
                          className="w-3.5 h-3.5 rounded-full border border-[#D8CCBA] shrink-0"
                          style={{ backgroundColor: color.hex }}
                        />
                        <span>{color.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Size Selection + Size Guide Modal Trigger */}
              <div className="mb-6">
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="text-[#72513E] tracking-wider uppercase font-medium">Tamanho:</span>
                  <button
                    onClick={() => setIsSizeGuideOpen(true)}
                    className="flex items-center gap-1 text-[#183D32] hover:text-[#642B38] underline underline-offset-4 cursor-pointer font-medium"
                  >
                    <Ruler className="w-3.5 h-3.5" />
                    <span>Tabela de Medidas & Moulage</span>
                  </button>
                </div>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {product.sizes.map((sz) => {
                    const isSelected = selectedSize === sz;
                    return (
                      <button
                        key={sz}
                        onClick={() => setSelectedSize(sz)}
                        className={`py-2.5 text-xs font-medium border text-center transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#183D32] text-[#F5F1E8] border-[#183D32] shadow-sm'
                            : 'bg-white/40 text-[#183D32] border-[#D8CCBA] hover:border-[#183D32]'
                        }`}
                      >
                        {sz}
                      </button>
                    );
                  })}
                </div>
                {selectedSize === 'Sob Medida' && (
                  <p className="text-[11px] text-[#72513E] mt-2 italic font-light">
                    * Nosso concierge agendará a aferição de suas medidas após a confirmação do pedido.
                  </p>
                )}
              </div>

              {/* Gift Packaging Option */}
              <div className="p-3 bg-white/40 border border-[#D8CCBA] mb-6">
                <label className="flex items-start gap-2.5 cursor-pointer text-xs text-[#183D32]">
                  <input
                    type="checkbox"
                    checked={isGiftWrapSelected}
                    onChange={(e) => setIsGiftWrapSelected(e.target.checked)}
                    className="mt-0.5 accent-[#183D32] cursor-pointer"
                  />
                  <div>
                    <span className="font-semibold block">Embalagem de Luxo Sustentável ÉVORA (Cortesia)</span>
                    <span className="text-[#72513E] font-light text-[11px] block">
                      Caixa rígida em fibra reciclada FSC, laço de linho cru e papel de seda perfumado com botânica nativa.
                    </span>
                  </div>
                </label>
              </div>

              {/* Action CTAs */}
              <div className="space-y-3">
                <button
                  onClick={handleAddToCart}
                  className="w-full bg-[#183D32] hover:bg-[#642B38] text-[#F5F1E8] py-4 px-6 text-xs tracking-[0.25em] uppercase font-semibold transition-colors cursor-pointer flex items-center justify-center gap-3 shadow-lg"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Acomodar na Sacola</span>
                </button>

                <div className="flex items-center justify-between text-xs text-[#72513E] pt-2">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-[#183D32]" />
                    <span>{product.productionDetails.slice(0, 32)}...</span>
                  </div>
                  <button
                    onClick={handleShare}
                    className="flex items-center gap-1 hover:text-[#183D32] cursor-pointer"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span>Compartilhar</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Certifications strip */}
            <div className="border-t border-[#D8CCBA]/60 pt-4 flex flex-wrap gap-2 text-[10px] tracking-wider uppercase text-[#183D32]">
              {product.certifications.map((cert) => (
                <span key={cert} className="border border-[#D8CCBA] px-2.5 py-1 bg-white/30 font-medium">
                  {cert}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Section: A HISTÓRIA DESTA PEÇA */}
        <section className="py-16 sm:py-24 border-b border-[#D8CCBA]/60">
          <div className="max-w-4xl mx-auto space-y-12">
            <div className="text-center space-y-3">
              <span className="text-xs uppercase tracking-[0.3em] text-[#72513E] font-medium block">
                Acervo de Alta Costura
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl text-[#183D32] font-light">
                A História Desta Peça
              </h2>
              <div className="w-12 h-[1px] bg-[#72513E] mx-auto opacity-40 mt-4" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs sm:text-sm text-[#183D32]/90 leading-relaxed font-light">
              <div className="space-y-4">
                <h3 className="font-serif text-xl sm:text-2xl text-[#183D32] font-normal">
                  Inspiração & Moulage
                </h3>
                <p>{product.story.inspiration}</p>
                <p>{product.story.craftProcess}</p>
              </div>

              <div className="space-y-4">
                <h3 className="font-serif text-xl sm:text-2xl text-[#183D32] font-normal">
                  Matéria-Prima & Rastreabilidade
                </h3>
                <p>
                  <strong>Composição:</strong> {product.composition}
                </p>
                <p>
                  <strong>Origem Auditada:</strong> {product.story.traceability}
                </p>
              </div>
            </div>

            {/* Care instructions */}
            <div className="p-6 bg-white/40 border border-[#D8CCBA] space-y-4">
              <h4 className="font-serif text-lg text-[#183D32] flex items-center gap-2">
                <RotateCcw className="w-4 h-4 text-[#72513E]" />
                <span>Conservação e Longevidade ÉVORA</span>
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-[#72513E] font-light">
                {product.story.careInstructions.map((instruction, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="font-serif font-semibold text-[#183D32]">{idx + 1}.</span>
                    <span>{instruction}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Section: Complete o Visual ÉVORA */}
        <section className="py-16 sm:py-24">
          <div className="text-center mb-12">
            <span className="text-xs uppercase tracking-[0.3em] text-[#72513E] font-medium block mb-2">
              Harmonia de Silhuetas
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#183D32] font-light">
              Complete o Visual
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {relatedProducts.map((rel) => (
              <ProductCard key={rel.id} product={rel} />
            ))}
          </div>
        </section>
      </div>

      {/* Size Guide Modal */}
      <SizeGuideModal isOpen={isSizeGuideOpen} onClose={() => setIsSizeGuideOpen(false)} />
    </div>
  );
};
