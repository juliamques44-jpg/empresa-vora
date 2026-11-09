/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useStore } from '../../context/StoreContext';

export const ManifestoSection: React.FC = () => {
  const { setActiveView } = useStore();

  return (
    <section className="py-20 sm:py-28 bg-[#F5F1E8] border-b border-[#D8CCBA]/60">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        <span className="text-xs uppercase tracking-[0.35em] text-[#72513E] font-medium block">
          Manifesto ÉVORA
        </span>

        <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#183D32] leading-[1.15] font-light max-w-3xl mx-auto text-wrap-balance">
          &ldquo;O verdadeiro luxo é aquilo que permanece.&rdquo;
        </h2>

        <div className="w-16 h-[1.5px] bg-[#72513E] mx-auto opacity-40 my-6" />

        <p className="font-serif italic text-lg sm:text-2xl text-[#72513E] max-w-2xl mx-auto leading-relaxed">
          Rejeitamos o ciclo desenfreado de coleções descartáveis. Na Maison ÉVORA, criamos peças de alta costura projetadas para envelhecer com nobreza e atravessar gerações.
        </p>

        <p className="text-sm sm:text-base text-[#183D32]/85 max-w-2xl mx-auto leading-relaxed font-light">
          Cada costura, cada fibra de linho europeu ou lã zelarosa foi escolhida com reverência ao tempo. Não produzimos estoques em massa: honramos o princípio da produção sob demanda e de pequenas tiragens numeradas, onde a exclusividade nasce do respeito à Terra e às mãos artesãs que moldam o tecido.
        </p>

        <div className="pt-4">
          <button
            onClick={() => {
              setActiveView('sustainability');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 text-xs tracking-[0.25em] uppercase text-[#183D32] hover:text-[#642B38] border-b border-[#183D32] pb-1 font-medium transition-colors cursor-pointer"
          >
            Descubra Nossa Matriz de Sustentabilidade
          </button>
        </div>
      </div>
    </section>
  );
};
