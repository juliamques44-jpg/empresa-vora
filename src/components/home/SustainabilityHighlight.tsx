/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ArrowRight, Leaf, Shield, HeartHandshake, Sparkles } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const SustainabilityHighlight: React.FC = () => {
  const { setActiveView } = useStore();

  return (
    <section className="py-20 sm:py-28 bg-[#183D32] text-[#F5F1E8] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section 1: Elegância com propósito */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pb-20 border-b border-[#D8CCBA]/20">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs uppercase tracking-[0.3em] text-[#D8CCBA] font-light block">
              Ética & Alta Moda
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#F5F1E8] font-light leading-tight">
              Elegância com propósito.
            </h2>
            <p className="font-serif italic text-lg sm:text-xl text-[#D8CCBA] font-light leading-relaxed">
              &ldquo;Não existe beleza genuína se o processo de feitura deixar cicatrizes irreparáveis na Terra ou na dignidade humana.&rdquo;
            </p>
            <p className="text-xs sm:text-sm text-[#F5F1E8]/85 font-light leading-relaxed">
              Cada matéria-prima da Maison ÉVORA possui origem auditada e certificada: linho europeu sem irrigação artificial, lã rastreável ZQ com bem-estar animal assegurado, algodão orgânico GOTS colhido por agricultura familiar e biopolímeros inovadores extraídos de resíduos de maçã e cortiça renovável.
            </p>

            <div className="grid grid-cols-2 gap-6 pt-4 text-xs font-light">
              <div className="border-t border-[#D8CCBA]/30 pt-3">
                <span className="font-serif text-2xl text-[#D8CCBA] block mb-1">0%</span>
                <span className="text-[#F5F1E8]/80">Fibras sintéticas virgens ou plásticos descartáveis</span>
              </div>
              <div className="border-t border-[#D8CCBA]/30 pt-3">
                <span className="font-serif text-2xl text-[#D8CCBA] block mb-1">100%</span>
                <span className="text-[#F5F1E8]/80">Produção artesanal com remuneração justa e ateliê próprio</span>
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={() => {
                  setActiveView('sustainability');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-[#D8CCBA] hover:text-[#F5F1E8] transition-colors border-b border-[#D8CCBA] pb-1 cursor-pointer"
              >
                <span>Conhecer nossos materiais e certificações</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative border border-[#D8CCBA]/40 p-2 sm:p-3">
              <img
                src="/src/assets/images/sustainability_atelier_1794248337461.jpg"
                alt="Ateliê de Alta Costura ÉVORA - Corte artesanal e alfaiataria consciente"
                referrerPolicy="no-referrer"
                className="w-full h-[400px] sm:h-[480px] object-cover"
              />
              <div className="absolute bottom-6 left-6 right-6 bg-[#183D32]/90 backdrop-blur-xs p-4 border border-[#D8CCBA]/30 text-xs">
                <span className="text-[#D8CCBA] uppercase tracking-[0.2em] text-[10px] block mb-1">
                  Ateliê Maison ÉVORA · São Paulo
                </span>
                <p className="text-[#F5F1E8]/90 font-light">
                  Mestres alfaiates dedicando até 40 horas por peça, respeitando os ciclos da modelagem sob demanda.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Feito em pequenas quantidades. Pensado para durar. */}
        <div className="pt-20 text-center max-w-4xl mx-auto space-y-6">
          <span className="text-xs uppercase tracking-[0.3em] text-[#D8CCBA] font-light block">
            Filosofia de Vida
          </span>
          <h3 className="font-serif text-3xl sm:text-5xl text-[#F5F1E8] font-light">
            Feito em pequenas quantidades. Pensado para durar.
          </h3>
          <p className="text-sm sm:text-base text-[#D8CCBA]/90 font-light max-w-2xl mx-auto leading-relaxed">
            Ao contrário do varejo massivo, não temos estoques ocultos nem desovas de fim de estação. Quando uma edição se esgota, encerra-se o ciclo. Se uma peça precisa de ajuste ou reparo com o passar dos anos, nosso programa <strong>ÉVORA Care</strong> cuida de mantê-la impecável por décadas.
          </p>

          <div className="pt-4 flex flex-wrap justify-center gap-4">
            <button
              onClick={() => {
                setActiveView('care');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="bg-[#D8CCBA] text-[#183D32] hover:bg-[#F5F1E8] px-8 py-3.5 text-xs tracking-[0.2em] uppercase font-medium transition-colors cursor-pointer"
            >
              Conhecer o Programa ÉVORA Care
            </button>
            <button
              onClick={() => {
                setActiveView('catalog');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="border border-[#D8CCBA]/60 hover:border-[#F5F1E8] hover:bg-white/10 text-[#F5F1E8] px-8 py-3.5 text-xs tracking-[0.2em] uppercase font-medium transition-colors cursor-pointer"
            >
              Ver Peças Disponíveis
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
