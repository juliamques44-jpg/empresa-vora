/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { ProductCategory } from '../../types';

interface CollectionItem {
  id: string;
  category: ProductCategory;
  title: string;
  subtitle: string;
  tagline: string;
  image: string;
  colSpan?: string;
}

export const CollectionCards: React.FC = () => {
  const { navigateToCategory } = useStore();

  const collections: CollectionItem[] = [
    {
      id: 'col-1',
      category: 'Alfaiataria',
      title: 'Alfaiataria Arquitetônica',
      subtitle: 'Ternos esculpidos, pantalonas fluidas e precisão anatômica',
      tagline: 'Corte Impecável',
      image: '/assets/products/terno_offwhite_alfaiataria.jpg',
      colSpan: 'md:col-span-7'
    },
    {
      id: 'col-2',
      category: 'Vestidos',
      title: 'Vestidos & Drapés de Gala',
      subtitle: 'Drapeados helenísticos em seda pura e liocel botânico',
      tagline: 'Moulage Manual',
      image: '/assets/products/vestido_verde_escultural.jpg',
      colSpan: 'md:col-span-5'
    },
    {
      id: 'col-3',
      category: 'Edições Limitadas',
      title: 'Edições Limitadas & Tomara-que-Caia',
      subtitle: 'Tafetá nobre em vinho imperial e tiragens numeradas 01/20',
      tagline: 'Série Exclusiva',
      image: '/assets/products/vestido_vinho_strapless.jpg',
      colSpan: 'md:col-span-4'
    },
    {
      id: 'col-4',
      category: 'Peças Esculturais',
      title: 'Peças Esculturais & Gola Halter',
      subtitle: 'Formas orgânicas em terracota com fivelas de latão de orives',
      tagline: 'Design de Autor',
      image: '/assets/products/vestido_marrom_halter.jpg',
      colSpan: 'md:col-span-4'
    },
    {
      id: 'col-5',
      category: 'Essenciais Atemporais',
      title: 'Ateliê ÉVORA Permanente',
      subtitle: 'O encontro do linho, da lã e da botânica em um mesmo acervo',
      tagline: 'Maison ÉVORA',
      image: '/assets/aistudio/Ateli___vora__Eleg_ncia_Atemporal_27e02109.png',
      colSpan: 'md:col-span-4'
    }
  ];

  return (
    <section className="py-20 sm:py-28 bg-[#F5F1E8] border-b border-[#D8CCBA]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs uppercase tracking-[0.3em] text-[#72513E] font-medium block mb-2">
              Arquitetura de Coleções
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl text-[#183D32] font-light">
              O Acervo Permanente da Maison
            </h2>
          </div>
          <p className="text-xs text-[#72513E] max-w-sm font-light leading-relaxed">
            Navegue por nossas linhagens estruturais, concebidas para compor um guarda-roupa coeso, duradouro e autêntico.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {collections.map((col) => (
            <div
              key={col.id}
              onClick={() => navigateToCategory(col.category)}
              className={`${col.colSpan || 'md:col-span-6'} group relative h-[420px] sm:h-[480px] overflow-hidden cursor-pointer border border-[#D8CCBA]/60`}
            >
              <img
                src={col.image}
                alt={col.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-top sm:object-center transition-transform duration-700 ease-out group-hover:scale-105"
              />
              {/* Scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#183D32]/95 via-[#183D32]/35 to-transparent transition-opacity group-hover:opacity-90" />

              {/* Card Text & CTA */}
              <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-between text-[#F5F1E8]">
                <div className="flex justify-between items-start">
                  <span className="text-[10px] tracking-[0.25em] uppercase text-[#D8CCBA] font-light border border-[#D8CCBA]/40 px-2 py-1 bg-[#183D32]/40 backdrop-blur-xs">
                    {col.tagline}
                  </span>
                  <div className="w-9 h-9 rounded-full border border-[#D8CCBA]/50 flex items-center justify-center text-[#D8CCBA] group-hover:bg-[#F5F1E8] group-hover:text-[#183D32] transition-colors">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>

                <div className="space-y-1">
                  <h3 className="font-serif text-2xl sm:text-3xl text-[#F5F1E8] font-light">
                    {col.title}
                  </h3>
                  <p className="text-xs text-[#D8CCBA] font-light leading-relaxed max-w-sm opacity-90">
                    {col.subtitle}
                  </p>
                  <div className="pt-2">
                    <span className="text-[11px] tracking-[0.2em] uppercase text-[#D8CCBA] group-hover:text-[#F5F1E8] group-hover:underline underline-offset-4 font-medium transition-colors">
                      Ver Coleção
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
