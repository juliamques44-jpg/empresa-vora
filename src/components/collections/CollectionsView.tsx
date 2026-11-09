/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { ProductCategory } from '../../types';
import { ProductCard } from '../catalog/ProductCard';

export const CollectionsView: React.FC = () => {
  const { products, navigateToCategory } = useStore();

  const collectionLines: {
    category: ProductCategory;
    title: string;
    concept: string;
    inspiration: string;
    heroImage: string;
    materials: string;
    isLimited?: boolean;
    quantityNote?: string;
  }[] = [
    {
      category: 'Alfaiataria',
      title: 'Alfaiataria Arquitetônica',
      concept: 'Rigor nas proporções, leveza estrutural e durabilidade para toda a vida.',
      inspiration: 'O encontro entre a pureza do brutalismo moderno e a nobreza do linho e da lã fria zelarosa.',
      heroImage: '/src/assets/images/collection_tailoring_1794248334772.jpg',
      materials: '100% Linho Francês Masters of Linen®, Lã ZQ Rastreável e Entretelas Naturais.',
      isLimited: false
    },
    {
      category: 'Vestidos',
      title: 'Vestidos & Drapés Esculturais',
      concept: 'Fluidez milimétrica que reverencia a forma do corpo sem aprisioná-lo.',
      inspiration: 'A estatuária clássica e o movimento do vento sobre águas calmas.',
      heroImage: '/src/assets/images/collection_sculptural_dress_1794248336320.jpg',
      materials: 'Liocel botânico TENCEL™ Luxe e Seda pura brasileira de manejo regenerativo.',
      isLimited: true,
      quantityNote: 'Tiragens de 20 a 30 peças por cor'
    },
    {
      category: 'Edições Limitadas',
      title: 'Edições Limitadas & Marroquinaria Botânica',
      concept: 'Peças raras, numeradas uma a uma com caligrafia de ateliê.',
      inspiration: 'A circularidade de resíduos frutíferos transformados em arte portável.',
      heroImage: '/src/assets/images/product_apple_leather_bag_1794248337009.jpg',
      materials: 'Couro vegetal de maçã AppleSkin™, Cortiça de montado e Latão maciço reciclado.',
      isLimited: true,
      quantityNote: 'Séries exclusivas numeradas de 01 a 40'
    }
  ];

  return (
    <div className="bg-[#F5F1E8] min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-14 text-center max-w-3xl mx-auto border-b border-[#D8CCBA]/60 pb-10">
          <span className="text-xs uppercase tracking-[0.35em] text-[#72513E] font-medium block mb-2">
            Alta Costura Brasileira
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#183D32] font-light">
            Coleções Permanentes & Lançamentos
          </h1>
          <p className="text-xs sm:text-sm text-[#72513E] font-light mt-3 leading-relaxed">
            Nossas coleções não são estações passageiras, mas capítulos contínuos de um manifesto estético focado na permanência.
          </p>
        </div>

        <div className="space-y-24">
          {collectionLines.map((col, idx) => {
            const lineProducts = products.filter((p) => {
              if (col.category === 'Edições Limitadas') return p.isLimitedEdition;
              return p.category === col.category;
            }).slice(0, 3);

            const isReversed = idx % 2 === 1;

            return (
              <section key={col.title} className="space-y-10 border-b border-[#D8CCBA]/40 pb-20 last:border-b-0">
                {/* Hero Feature for Collection */}
                <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-center ${isReversed ? 'lg:flex-row-reverse' : ''}`}>
                  <div className={`lg:col-span-7 ${isReversed ? 'lg:order-2' : ''}`}>
                    <div className="relative aspect-[16/10] sm:aspect-[16/9] overflow-hidden border border-[#D8CCBA]">
                      <img
                        src={col.heroImage}
                        alt={col.title}
                        className="w-full h-full object-cover"
                      />
                      {col.isLimited && (
                        <div className="absolute top-4 left-4 bg-[#183D32] text-[#F5F1E8] text-[10px] uppercase tracking-[0.2em] px-3 py-1 font-light">
                          {col.quantityNote || 'Edição Limitada'}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className={`lg:col-span-5 space-y-4 ${isReversed ? 'lg:order-1' : ''}`}>
                    <span className="text-xs uppercase tracking-[0.3em] text-[#72513E] font-light block">
                      {col.category}
                    </span>
                    <h2 className="font-serif text-3xl sm:text-4xl text-[#183D32] font-light">
                      {col.title}
                    </h2>
                    <p className="font-serif italic text-base text-[#72513E] leading-relaxed">
                      &ldquo;{col.concept}&rdquo;
                    </p>
                    <p className="text-xs text-[#183D32]/85 font-light leading-relaxed">
                      <strong>Inspiração:</strong> {col.inspiration}
                    </p>
                    <p className="text-xs text-[#72513E] font-light">
                      <strong>Matérias-Primas:</strong> {col.materials}
                    </p>

                    <div className="pt-2">
                      <button
                        onClick={() => navigateToCategory(col.category)}
                        className="inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-[#183D32] hover:text-[#642B38] font-medium border-b border-[#183D32] pb-1 transition-colors cursor-pointer"
                      >
                        <span>Explorar todas as peças desta linha</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Sample items from this collection */}
                {lineProducts.length > 0 && (
                  <div>
                    <h3 className="text-xs uppercase tracking-[0.25em] text-[#72513E] font-medium mb-4">
                      Destaques da Linhagem
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
                      {lineProducts.map((p) => (
                        <ProductCard key={p.id} product={p} />
                      ))}
                    </div>
                  </div>
                )}
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
};
