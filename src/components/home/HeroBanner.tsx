/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const HeroBanner: React.FC = () => {
  const { setActiveView, navigateToProduct } = useStore();

  const signaturePieces = [
    { id: 'evo-001', label: 'Verde Évora', type: 'Vestido Escultural' },
    { id: 'evo-002', label: 'Off-White', type: 'Terno Alfaiataria' },
    { id: 'evo-003', label: 'Vinho Imperial', type: 'Vestido Tomara-que-Caia' },
    { id: 'evo-004', label: 'Marrom Terracota', type: 'Vestido Halter' },
  ];

  return (
    <section className="relative w-full min-h-[85vh] lg:min-h-[92vh] flex items-end justify-start bg-[#183D32] overflow-hidden">
      {/* Editorial Background Image with Ateliê ÉVORA photoshoot */}
      <div className="absolute inset-0 z-0">
        <img
          src="/assets/aistudio/Ateli___vora__Eleg_ncia_Atemporal_27e02109.png"
          alt="Ateliê Maison ÉVORA - Coleção de Alta Costura e Alfaiataria Atemporal"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-top sm:object-center transition-transform duration-1000 ease-out"
        />
        {/* Measured Scrim for WCAG AA readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#183D32]/95 via-[#183D32]/50 to-transparent" />
        <div className="absolute inset-0 bg-black/15 backdrop-brightness-[0.98]" />
      </div>

      {/* Hero Content Box */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 w-full">
        <div className="max-w-2xl text-[#F5F1E8] space-y-6">
          <div className="flex items-center gap-3 text-xs tracking-[0.3em] uppercase text-[#D8CCBA] font-light">
            <span className="inline-block w-2 h-2 rounded-full bg-[#D8CCBA]" />
            <span>Ateliê ÉVORA · Alta Costura Sob Demanda</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl leading-[1.08] tracking-tight font-light text-wrap-balance">
            O luxo de escolher com consciência.
          </h1>

          <p className="font-serif italic text-lg sm:text-2xl text-[#D8CCBA] font-light leading-relaxed max-w-xl">
            Compre menos, escolha bem, faça durar. Silhuetas helenísticas, drapés esculturais e alfaiataria eterna em tecidos botânicos nobres.
          </p>

          {/* Quick Direct Piece Links */}
          <div className="pt-2">
            <span className="text-[11px] uppercase tracking-[0.2em] text-[#D8CCBA]/80 block mb-2 font-light">
              Explorar Criações em Destaque no Ateliê:
            </span>
            <div className="flex flex-wrap gap-2">
              {signaturePieces.map((p) => (
                <button
                  key={p.id}
                  onClick={() => navigateToProduct(p.id)}
                  className="text-[11px] px-3 py-1.5 border border-[#D8CCBA]/50 bg-[#183D32]/60 hover:bg-[#F5F1E8] hover:text-[#183D32] text-[#F5F1E8] transition-all cursor-pointer backdrop-blur-xs font-light"
                >
                  <span className="font-medium">{p.type}</span> · {p.label}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <button
              onClick={() => {
                setActiveView('catalog');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="bg-[#F5F1E8] text-[#183D32] hover:bg-[#D8CCBA] px-8 py-4 text-xs tracking-[0.25em] uppercase font-semibold transition-all cursor-pointer inline-flex items-center justify-center gap-3 group shadow-lg"
            >
              <span>EXPLORAR COLEÇÃO</span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => {
                setActiveView('about');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="border border-[#F5F1E8]/70 hover:border-[#F5F1E8] hover:bg-[#F5F1E8]/10 text-[#F5F1E8] px-8 py-4 text-xs tracking-[0.25em] uppercase font-medium transition-all cursor-pointer text-center"
            >
              CONHECER O ATELIÊ
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
