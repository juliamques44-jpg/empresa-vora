/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Leaf, ShieldCheck, CheckCircle2, Factory, Recycle, HeartHandshake } from 'lucide-react';
import { SUSTAINABLE_MATERIALS_INFO } from '../../data/mockData';

export const SustainabilityView: React.FC = () => {
  return (
    <div className="bg-[#F5F1E8] min-h-screen py-10 sm:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="text-center space-y-4 border-b border-[#D8CCBA]/60 pb-12">
          <span className="text-xs uppercase tracking-[0.35em] text-[#72513E] font-medium block">
            Rigor Científico & Transparência
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#183D32] font-light">
            Universo Sustentabilidade ÉVORA
          </h1>
          <p className="font-serif italic text-lg sm:text-xl text-[#72513E] max-w-2xl mx-auto leading-relaxed">
            &ldquo;Não publicamos alegações genéricas. Cada fibra, cada fornecedor e cada processo é passível de auditoria pública.&rdquo;
          </p>
        </div>

        {/* Pillars Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 bg-white/70 border border-[#D8CCBA] space-y-3">
            <Factory className="w-6 h-6 text-[#183D32]" strokeWidth={1.3} />
            <h3 className="font-serif text-xl text-[#183D32]">Produção Sob Demanda</h3>
            <p className="text-xs text-[#72513E] leading-relaxed font-light">
              Cortamos os tecidos de acordo com a aquisição confirmada ou em séries numeradas ultralimitadas (máximo de 30 a 40 unidades), eliminando os excedentes tóxicos do fast fashion.
            </p>
          </div>

          <div className="p-6 bg-white/70 border border-[#D8CCBA] space-y-3">
            <Recycle className="w-6 h-6 text-[#183D32]" strokeWidth={1.3} />
            <h3 className="font-serif text-xl text-[#183D32]">Zero Desperdício de Tecido</h3>
            <p className="text-xs text-[#72513E] leading-relaxed font-light">
              Nossos moldes de alfaiataria geométrica aproveitam até 96% da largura do tear. Os retalhos nobres remanescentes são redirecionados ao nosso laboratório de upcycling do <strong>ÉVORA Care</strong>.
            </p>
          </div>

          <div className="p-6 bg-white/70 border border-[#D8CCBA] space-y-3">
            <HeartHandshake className="w-6 h-6 text-[#183D32]" strokeWidth={1.3} />
            <h3 className="font-serif text-xl text-[#183D32]">Valorização do Ofício Manual</h3>
            <p className="text-xs text-[#72513E] leading-relaxed font-light">
              Ateliê próprio no Brasil. Mestres alfaiates, modelistas e costureiras recebem remuneração justa, ambiente com luz natural e ritmo humanizado com até 40 horas dedicadas a cada peça.
            </p>
          </div>
        </section>

        {/* Materials Catalog Section */}
        <section className="space-y-8">
          <div className="border-b border-[#D8CCBA]/60 pb-4">
            <span className="text-xs uppercase tracking-[0.25em] text-[#72513E] font-medium block">
              Dossiê de Matérias-Primas
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl text-[#183D32] font-light mt-1">
              Fibras Nobres Auditadas
            </h2>
          </div>

          <div className="space-y-6">
            {SUSTAINABLE_MATERIALS_INFO.map((mat) => (
              <div 
                key={mat.name}
                className="bg-white/80 border border-[#D8CCBA] p-6 sm:p-8 space-y-4 hover:border-[#183D32] transition-colors"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#D8CCBA]/50 pb-3">
                  <div>
                    <h3 className="font-serif text-xl sm:text-2xl text-[#183D32] font-normal">
                      {mat.name}
                    </h3>
                    <span className="text-xs text-[#72513E] italic font-light">
                      {mat.tagline}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] font-medium text-[#183D32] bg-[#F5F1E8] px-3 py-1 border border-[#D8CCBA] self-start sm:self-auto">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#72513E]" />
                    <span>Auditado</span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-[#183D32]/85 font-light leading-relaxed">
                  {mat.description}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs bg-[#F5F1E8] p-4 border border-[#D8CCBA]/60">
                  <div>
                    <span className="text-[#72513E] text-[10px] uppercase tracking-wider block font-medium">Certificação Internacional:</span>
                    <strong className="text-[#183D32] font-semibold">{mat.certification}</strong>
                  </div>
                  <div>
                    <span className="text-[#72513E] text-[10px] uppercase tracking-wider block font-medium">Fornecedor / Origem Auditada:</span>
                    <strong className="text-[#183D32] font-semibold">{mat.supplier}</strong>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Commitment Statement */}
        <section className="p-8 bg-[#183D32] text-[#F5F1E8] space-y-4 text-center">
          <h3 className="font-serif text-2xl sm:text-3xl font-light">
            Transparência para Pesquisadores e Clientes
          </h3>
          <p className="text-xs sm:text-sm text-[#D8CCBA] font-light max-w-2xl mx-auto leading-relaxed">
            Disponibilizamos laudos toxicológicos completos e certidões de conformidade ambiental mediante solicitação ao nosso comitê de governança socioambiental.
          </p>
          <span className="text-[11px] tracking-wider uppercase text-[#D8CCBA]/80 block font-light">
            sustentabilidade@evora.com.br · Ateliê ÉVORA São Paulo
          </span>
        </section>
      </div>
    </div>
  );
};
