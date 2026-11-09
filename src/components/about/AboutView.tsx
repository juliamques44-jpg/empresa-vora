/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const AboutView: React.FC = () => {
  const { setActiveView } = useStore();

  return (
    <div className="bg-[#F5F1E8] min-h-screen py-10 sm:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Editorial Header */}
        <div className="text-center space-y-6 border-b border-[#D8CCBA]/60 pb-16">
          <span className="text-xs uppercase tracking-[0.35em] text-[#72513E] font-medium block">
            A Maison ÉVORA
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl text-[#183D32] font-light leading-tight">
            Mais do que vestir. Uma forma de permanecer.
          </h1>
          <div className="w-16 h-[1.5px] bg-[#72513E] mx-auto opacity-40" />
          <p className="font-serif italic text-xl sm:text-2xl text-[#72513E] max-w-2xl mx-auto leading-relaxed">
            &ldquo;O tempo é o mais precioso dos tecidos. Desenhamos para as estações da vida, não para as semanas da moda.&rdquo;
          </p>
        </div>

        {/* Story Section 1: Origem e Propósito */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-6 space-y-4 text-xs sm:text-sm text-[#183D32]/90 leading-relaxed font-light">
            <h2 className="font-serif text-2xl sm:text-3xl text-[#183D32] font-normal">
              A Fundação e a Recusa ao Efêmero
            </h2>
            <p>
              A ÉVORA nasceu do cansaço diante da aceleração predatória da moda industrial. Em um mundo inundado por bilhões de peças plásticas que perdem o valor em três lavagens, escolhemos o caminho oposto: a alta costura serena, a modelagem paciente e o respeito profundo à botânica.
            </p>
            <p>
              Nossa maison funciona como um laboratório de alfaiataria onde cada corte é desenhado para durar décadas. Entendemos o vestuário como uma armadura gentil, que confere postura e distinção sem jamais restringir o corpo.
            </p>
          </div>

          <div className="md:col-span-6">
            <div className="border border-[#D8CCBA] p-2 bg-white/40">
              <img
                src="/src/assets/images/hero_editorial_evora_1794248334684.jpg"
                alt="Silhueta ÉVORA Alfaiataria"
                className="w-full h-80 object-cover"
              />
            </div>
          </div>
        </section>

        {/* Story Section 2: O Ateliê Artesanal */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-6 md:order-2 space-y-4 text-xs sm:text-sm text-[#183D32]/90 leading-relaxed font-light">
            <h2 className="font-serif text-2xl sm:text-3xl text-[#183D32] font-normal">
              O Ateliê e as Mãos que Criam
            </h2>
            <p>
              Localizado em São Paulo, nosso ateliê reúne mestres artesãos que preservam técnicas raras de alfaiataria tradicional: forros embutidos à mão, costuras inglesas sem rebites plásticos, casulos de linha pura e passadoria a vapor sobre mesas de madeira nobre.
            </p>
            <p>
              Cada profissional assina simbolicamente as peças que finaliza. Acreditamos que a dignidade do trabalho humano é a energia viva que torna uma peça verdadeiramente nobre.
            </p>
          </div>

          <div className="md:col-span-6 md:order-1">
            <div className="border border-[#D8CCBA] p-2 bg-white/40">
              <img
                src="/src/assets/images/sustainability_atelier_1794248337461.jpg"
                alt="Ateliê ÉVORA Artesanal"
                className="w-full h-80 object-cover"
              />
            </div>
          </div>
        </section>

        {/* Story Section 3: Compromisso com a Terra */}
        <section className="p-8 sm:p-12 bg-[#183D32] text-[#F5F1E8] space-y-6 text-center">
          <span className="text-xs uppercase tracking-[0.3em] text-[#D8CCBA] font-light block">
            Nosso Voto de Permanência
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-light">
            O Luxo Está naquilo que Permanece.
          </h2>
          <p className="text-xs sm:text-sm text-[#D8CCBA] max-w-2xl mx-auto font-light leading-relaxed">
            Nunca utilizaremos poliéster virgem, poliamida sintética ou derivados de petróleo em contato direto com sua pele. Preferimos a rusticidade macia do linho da Normandia, a leveza do liocel de eucalipto de manejo fechado e a regeneração biológica da cortiça e das cascas de maçã.
          </p>

          <div className="pt-4 flex justify-center gap-4">
            <button
              onClick={() => {
                setActiveView('catalog');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-8 py-3.5 bg-[#D8CCBA] hover:bg-[#F5F1E8] text-[#183D32] text-xs uppercase tracking-widest font-semibold transition-colors cursor-pointer"
            >
              Explorar Criações
            </button>
            <button
              onClick={() => {
                setActiveView('care');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-8 py-3.5 border border-[#D8CCBA] hover:bg-white/10 text-[#F5F1E8] text-xs uppercase tracking-widest font-medium transition-colors cursor-pointer"
            >
              Conhecer ÉVORA Care
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};
