/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Scissors, 
  RotateCcw, 
  Sparkles, 
  Upload, 
  Check, 
  ShieldCheck, 
  HelpCircle,
  Clock,
  Heart
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { EvoraCareRequest } from '../../types';

export const EvoraCareView: React.FC = () => {
  const { currentUser, submitCareRequest, showToast } = useStore();

  const [customerName, setCustomerName] = useState(currentUser?.name || '');
  const [customerEmail, setCustomerEmail] = useState(currentUser?.email || '');
  const [customerPhone, setCustomerPhone] = useState(currentUser?.phone || '');
  const [serviceType, setServiceType] = useState<EvoraCareRequest['serviceType']>('Ajuste de Alfaiataria');
  const [pieceDescription, setPieceDescription] = useState('');
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [photoName, setPhotoName] = useState<string>('');
  const [submitted, setSubmitted] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhotoName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerEmail || !pieceDescription) {
      showToast('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    submitCareRequest({
      customerName,
      customerEmail,
      customerPhone,
      serviceType,
      pieceDescription,
      photoUrl: photoPreview || undefined,
      photoName: photoName || undefined
    });

    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-[#F5F1E8] min-h-screen py-10 sm:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Editorial Header */}
        <div className="text-center space-y-4 border-b border-[#D8CCBA]/60 pb-12">
          <span className="text-xs uppercase tracking-[0.35em] text-[#72513E] font-medium block">
            Programa de Longevidade Têxtil
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#183D32] font-light">
            ÉVORA Care
          </h1>
          <p className="font-serif italic text-xl sm:text-2xl text-[#642B38] max-w-2xl mx-auto leading-relaxed">
            &ldquo;Uma peça de qualidade merece muitas histórias. Cuidar também é uma forma de consumir com consciência.&rdquo;
          </p>
          <p className="text-xs sm:text-sm text-[#72513E] font-light max-w-2xl mx-auto leading-relaxed">
            Nossas criações foram projetadas com margens generosas de costura e fibras de alta resistência para acompanhar as mudanças naturais do seu corpo e do seu estilo através dos anos.
          </p>
        </div>

        {/* 4 Core Services Pillars */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 bg-white/70 border border-[#D8CCBA] space-y-3">
            <Scissors className="w-6 h-6 text-[#183D32]" strokeWidth={1.3} />
            <h3 className="font-serif text-lg text-[#183D32]">Ajustes de Alfaiataria</h3>
            <p className="text-xs text-[#72513E] font-light leading-relaxed">
              Alinhamento de bainhas, ajustes em cintura ou mangas com respeito rigoroso às entretelas e costuras inglesas originais.
            </p>
          </div>

          <div className="p-6 bg-white/70 border border-[#D8CCBA] space-y-3">
            <RotateCcw className="w-6 h-6 text-[#183D32]" strokeWidth={1.3} />
            <h3 className="font-serif text-lg text-[#183D32]">Reparos Artesanais</h3>
            <p className="text-xs text-[#72513E] font-light leading-relaxed">
              Cerzido invisível, substituição de botões botânicos em corozo ou recolocação de fechos magnéticos.
            </p>
          </div>

          <div className="p-6 bg-white/70 border border-[#D8CCBA] space-y-3">
            <Sparkles className="w-6 h-6 text-[#183D32]" strokeWidth={1.3} />
            <h3 className="font-serif text-lg text-[#183D32]">Upcycling & Metamorfose</h3>
            <p className="text-xs text-[#72513E] font-light leading-relaxed">
              Transforme um casaco antigo em um colete estruturado ou um vestido longo em conjunto atemporal para uma nova fase da vida.
            </p>
          </div>

          <div className="p-6 bg-white/70 border border-[#D8CCBA] space-y-3">
            <Heart className="w-6 h-6 text-[#183D32]" strokeWidth={1.3} />
            <h3 className="font-serif text-lg text-[#183D32]">Conservação Preventiva</h3>
            <p className="text-xs text-[#72513E] font-light leading-relaxed">
              Higienização ecológica, escovação manual de fibras de lã ZQ e hidratação de bio-couro vegetal de maçã.
            </p>
          </div>
        </section>

        {/* Interactive Request Form */}
        <section className="bg-white/80 border border-[#D8CCBA] p-8 sm:p-12 shadow-sm max-w-3xl mx-auto">
          {submitted ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#183D32] text-[#F5F1E8] flex items-center justify-center mx-auto">
                <Check className="w-8 h-8" />
              </div>
              <h2 className="font-serif text-3xl text-[#183D32]">Solicitação Registrada no Ateliê</h2>
              <p className="text-xs sm:text-sm text-[#72513E] max-w-md mx-auto font-light leading-relaxed">
                Nossos alfaiates examinarão a descrição e as fotos enviadas. Enviaremos uma estimativa detalhada e as instruções de envio para o e-mail <strong>{customerEmail}</strong> em até 24 horas úteis.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-4 px-8 py-3 bg-[#183D32] text-[#F5F1E8] text-xs uppercase tracking-wider font-medium hover:bg-[#642B38] transition-colors cursor-pointer"
              >
                Enviar Nova Solicitação
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 text-xs text-[#183D32]">
              <div>
                <span className="text-xs uppercase tracking-[0.25em] text-[#72513E] font-medium block mb-1">
                  Atendimento Personalizado
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-light">
                  Solicitar Orçamento de Cuidado ou Ajuste
                </h2>
                <p className="text-xs text-[#72513E] font-light mt-1">
                  Atendemos tanto peças do acervo ÉVORA quanto peças nobres de alfaiataria de outras maisons que você deseja preservar.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#72513E] uppercase text-[11px] mb-1 font-medium">Seu Nome</label>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    required
                    className="w-full bg-[#F5F1E8]/50 border border-[#D8CCBA] px-4 py-3 text-sm focus:outline-none focus:border-[#183D32]"
                  />
                </div>
                <div>
                  <label className="block text-[#72513E] uppercase text-[11px] mb-1 font-medium">E-mail para Retorno</label>
                  <input
                    type="email"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    required
                    className="w-full bg-[#F5F1E8]/50 border border-[#D8CCBA] px-4 py-3 text-sm focus:outline-none focus:border-[#183D32]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#72513E] uppercase text-[11px] mb-1 font-medium">Telefone / WhatsApp</label>
                  <input
                    type="tel"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="(11) 90000-0000"
                    required
                    className="w-full bg-[#F5F1E8]/50 border border-[#D8CCBA] px-4 py-3 text-sm focus:outline-none focus:border-[#183D32]"
                  />
                </div>
                <div>
                  <label className="block text-[#72513E] uppercase text-[11px] mb-1 font-medium">Tipo de Serviço Desejado</label>
                  <select
                    value={serviceType}
                    onChange={(e) => setServiceType(e.target.value as any)}
                    className="w-full bg-white border border-[#D8CCBA] px-3 py-3 text-sm focus:outline-none focus:border-[#183D32] cursor-pointer"
                  >
                    <option value="Ajuste de Alfaiataria">Ajuste de Alfaiataria (Bainha, Ombros, Cós)</option>
                    <option value="Reparo Artesanal">Reparo Artesanal (Cerzido, Botões, Forro)</option>
                    <option value="Upcycling e Transformação">Upcycling e Transformação Completa</option>
                    <option value="Conservação Preventiva">Conservação Preventiva e Hidratação</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[#72513E] uppercase text-[11px] mb-1 font-medium">
                  Descrição da Peça e Detalhes da Solicitação
                </label>
                <textarea
                  rows={4}
                  value={pieceDescription}
                  onChange={(e) => setPieceDescription(e.target.value)}
                  placeholder="Descreva o modelo, tecido, tamanho e a modificação ou reparo necessário..."
                  required
                  className="w-full bg-[#F5F1E8]/50 border border-[#D8CCBA] p-4 text-sm focus:outline-none focus:border-[#183D32]"
                />
              </div>

              {/* Photo Upload with Live Preview */}
              <div>
                <label className="block text-[#72513E] uppercase text-[11px] mb-2 font-medium">
                  Fotografia da Peça (Opcional, acelera o orçamento)
                </label>
                <div className="border border-dashed border-[#D8CCBA] p-6 text-center bg-[#F5F1E8]/40 hover:bg-[#F5F1E8] transition-colors cursor-pointer relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                  />
                  {photoPreview ? (
                    <div className="flex flex-col items-center gap-2">
                      <img src={photoPreview} alt="Preview da peça" className="w-24 h-28 object-cover border border-[#D8CCBA]" />
                      <span className="text-xs text-[#183D32] font-medium">{photoName}</span>
                      <span className="text-[10px] text-[#72513E] underline">Clique para substituir foto</span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-1.5 text-[#72513E]">
                      <Upload className="w-6 h-6 text-[#183D32]" />
                      <span className="text-xs font-medium text-[#183D32]">Clique para anexar fotografia</span>
                      <span className="text-[10px] font-light">PNG, JPG até 10MB</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-[#183D32] hover:bg-[#642B38] text-[#F5F1E8] py-4 text-xs tracking-[0.25em] uppercase font-semibold transition-colors cursor-pointer shadow-md"
                >
                  Solicitar Avaliação da Alfaiataria
                </button>
              </div>
            </form>
          )}
        </section>
      </div>
    </div>
  );
};
