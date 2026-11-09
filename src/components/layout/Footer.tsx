/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ArrowUpRight, Check, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';
import { useStore, AppView } from '../../context/StoreContext';

interface FooterProps {
  onOpenTestModal?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenTestModal }) => {
  const { setActiveView, navigateToCategory, showToast } = useStore();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) {
      showToast('Por favor, informe um endereço de e-mail válido.');
      return;
    }
    setNewsletterSubscribed(true);
    showToast('Inscrição confirmada na correspondência privada ÉVORA.');
  };

  return (
    <footer className="bg-[#183D32] text-[#F5F1E8] pt-16 pb-24 lg:pb-16 border-t border-[#D8CCBA]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Newsletter & Brand Statement */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-[#D8CCBA]/20">
          <div className="lg:col-span-5 space-y-4">
            <span className="font-serif text-3xl sm:text-4xl tracking-[0.25em] font-semibold block text-[#F5F1E8]">
              ÉVORA
            </span>
            <p className="font-serif italic text-lg sm:text-xl text-[#D8CCBA] max-w-md leading-relaxed">
              &ldquo;Compre menos, escolha bem, faça durar.&rdquo;
            </p>
            <p className="text-xs text-[#D8CCBA]/80 tracking-wide leading-relaxed font-light max-w-md">
              Maison brasileira de alta moda sustentável. Alfaiataria atemporal, matérias-primas botânicas e rastreabilidade integral. Produzido com calma, pensado para gerações.
            </p>
          </div>

          <div className="lg:col-span-7 lg:pl-8 flex flex-col justify-center">
            <h3 className="font-serif text-xl sm:text-2xl text-[#F5F1E8] mb-2 font-light">
              Correspondência Privada da Maison
            </h3>
            <p className="text-xs text-[#D8CCBA]/80 mb-6 font-light max-w-lg leading-relaxed">
              Receba convites para lançamentos de tiragens limitadas, ensaios editoriais e artigos sobre preservação têxtil. Sem excessos ou promoções invasivas.
            </p>

            {newsletterSubscribed ? (
              <div className="flex items-center gap-2 text-xs text-[#D8CCBA] border border-[#D8CCBA]/40 p-4 max-w-md bg-[#183D32]/80">
                <Check className="w-4 h-4 text-[#D8CCBA]" strokeWidth={2} />
                <span>Seu endereço foi registrado com distinção em nosso livro privado.</span>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md">
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Seu endereço de e-mail institucional"
                  className="bg-transparent border border-[#D8CCBA]/40 px-4 py-3 text-xs text-[#F5F1E8] placeholder-[#D8CCBA]/50 focus:outline-none focus:border-[#F5F1E8] transition-colors flex-grow"
                  required
                />
                <button
                  type="submit"
                  className="bg-[#D8CCBA] text-[#183D32] hover:bg-[#F5F1E8] transition-colors px-6 py-3 text-xs tracking-[0.2em] uppercase font-medium cursor-pointer whitespace-nowrap"
                >
                  Subscrever
                </button>
              </form>
            )}
            <p className="text-[10px] text-[#D8CCBA]/60 mt-3 font-light">
              Em total conformidade com a LGPD (Lei Geral de Proteção de Dados). Seus dados nunca são compartilhados.
            </p>
          </div>
        </div>

        {/* Navigation Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 text-xs font-light tracking-wide border-b border-[#D8CCBA]/20">
          {/* Col 1: Institucional */}
          <div>
            <h4 className="font-serif text-base tracking-[0.1em] text-[#D8CCBA] mb-4 font-normal">
              Institucional
            </h4>
            <ul className="space-y-2.5 text-[#F5F1E8]/80">
              <li>
                <button onClick={() => { setActiveView('about'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-[#D8CCBA] transition-colors text-left cursor-pointer">
                  Sobre a Maison ÉVORA
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveView('sustainability'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-[#D8CCBA] transition-colors text-left cursor-pointer">
                  Universo Sustentabilidade
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveView('care'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-[#D8CCBA] transition-colors text-left cursor-pointer">
                  ÉVORA Care & Reparos
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveView('about'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-[#D8CCBA] transition-colors text-left cursor-pointer">
                  Manifesto Slow Fashion
                </button>
              </li>
            </ul>
          </div>

          {/* Col 2: Coleções */}
          <div>
            <h4 className="font-serif text-base tracking-[0.1em] text-[#D8CCBA] mb-4 font-normal">
              Coleções & Acervo
            </h4>
            <ul className="space-y-2.5 text-[#F5F1E8]/80">
              <li>
                <button onClick={() => navigateToCategory('Alfaiataria')} className="hover:text-[#D8CCBA] transition-colors text-left cursor-pointer">
                  Alfaiataria Arquitetônica
                </button>
              </li>
              <li>
                <button onClick={() => navigateToCategory('Vestidos')} className="hover:text-[#D8CCBA] transition-colors text-left cursor-pointer">
                  Vestidos & Drapés
                </button>
              </li>
              <li>
                <button onClick={() => navigateToCategory('Peças Esculturais')} className="hover:text-[#D8CCBA] transition-colors text-left cursor-pointer">
                  Peças Esculturais
                </button>
              </li>
              <li>
                <button onClick={() => navigateToCategory('Edições Limitadas')} className="hover:text-[#D8CCBA] transition-colors text-left cursor-pointer">
                  Edições Limitadas
                </button>
              </li>
              <li>
                <button onClick={() => navigateToCategory('Essenciais Atemporais')} className="hover:text-[#D8CCBA] transition-colors text-left cursor-pointer">
                  Essenciais Atemporais
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Atendimento & Concierge */}
          <div>
            <h4 className="font-serif text-base tracking-[0.1em] text-[#D8CCBA] mb-4 font-normal">
              Atendimento & Suporte
            </h4>
            <ul className="space-y-2.5 text-[#F5F1E8]/80">
              <li>
                <button onClick={() => { setActiveView('account'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-[#D8CCBA] transition-colors text-left cursor-pointer">
                  Minha Conta & Pedidos
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveView('care'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-[#D8CCBA] transition-colors text-left cursor-pointer">
                  Solicitação de Ajuste de Medidas
                </button>
              </li>
              <li>
                <span className="block text-[#D8CCBA]/80">
                  Concierge: concierge@evora.com.br
                </span>
              </li>
              <li>
                <span className="block text-[#D8CCBA]/80">
                  São Paulo: (11) 3088-4490
                </span>
              </li>
            </ul>
          </div>

          {/* Col 4: Governança & Transparência */}
          <div>
            <h4 className="font-serif text-base tracking-[0.1em] text-[#D8CCBA] mb-4 font-normal">
              Políticas & Ética
            </h4>
            <ul className="space-y-2.5 text-[#F5F1E8]/80">
              <li>
                <span className="text-[#D8CCBA]/80">Política de Privacidade (LGPD)</span>
              </li>
              <li>
                <span className="text-[#D8CCBA]/80">Política de Trocas e Logística Reversa</span>
              </li>
              <li>
                <span className="text-[#D8CCBA]/80">Certificações e Laudos Auditados</span>
              </li>
              <li className="pt-2">
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[#D8CCBA] hover:text-[#F5F1E8] transition-colors"
                >
                  <span>@evora.maison</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar with Distinctive Slogan */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#D8CCBA]/70 font-light">
          <div>
            <p className="font-serif text-sm tracking-[0.15em] text-[#F5F1E8]">
              ÉVORA — O luxo está naquilo que permanece.
            </p>
            <p className="mt-1">
              CNPJ 48.910.231/0001-90 · Ateliê de Alta Costura ÉVORA Ltda. São Paulo, Brasil.
            </p>
          </div>

          {/* System testing & Admin direct utilities */}
          <div className="flex items-center gap-4">
            {onOpenTestModal && (
              <button
                onClick={onOpenTestModal}
                className="inline-flex items-center gap-1.5 text-xs text-[#D8CCBA] hover:text-[#F5F1E8] border border-[#D8CCBA]/30 px-3 py-1.5 transition-colors cursor-pointer"
                title="Executar verificação dos fluxos críticos"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Testar Fluxos Críticos</span>
              </button>
            )}

            <button
              onClick={() => { setActiveView('admin'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="inline-flex items-center gap-1 text-xs text-[#D8CCBA] hover:text-[#F5F1E8] underline underline-offset-4 cursor-pointer"
            >
              <span>Área Restrita Maison</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
