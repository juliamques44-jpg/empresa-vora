/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { X, Ruler, Sparkles } from 'lucide-react';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SizeGuideModal: React.FC<SizeGuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const measurements = [
    { size: 'PP (34/36)', busto: '82 - 86 cm', cintura: '64 - 68 cm', quadril: '90 - 94 cm', comprimento: '108 cm' },
    { size: 'P (38)', busto: '86 - 90 cm', cintura: '68 - 72 cm', quadril: '94 - 98 cm', comprimento: '110 cm' },
    { size: 'M (40/42)', busto: '90 - 96 cm', cintura: '72 - 78 cm', quadril: '98 - 104 cm', comprimento: '112 cm' },
    { size: 'G (44)', busto: '96 - 102 cm', cintura: '78 - 84 cm', quadril: '104 - 110 cm', comprimento: '114 cm' },
    { size: 'GG (46)', busto: '102 - 108 cm', cintura: '84 - 90 cm', quadril: '110 - 116 cm', comprimento: '115 cm' },
    { size: 'Sob Medida', busto: 'Personalizado', cintura: 'Personalizado', quadril: 'Personalizado', comprimento: 'Ajustado' },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-[#183D32]/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div 
        className="bg-[#F5F1E8] border border-[#D8CCBA] max-w-2xl w-full p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-4 border-b border-[#D8CCBA]/80 mb-6">
          <div className="flex items-center gap-2 text-[#183D32]">
            <Ruler className="w-5 h-5 text-[#72513E]" strokeWidth={1.5} />
            <h3 className="font-serif text-2xl font-light">Guia de Medidas & Moulage ÉVORA</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:text-[#642B38] text-[#183D32] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs text-[#72513E] leading-relaxed mb-6 font-light">
          A alfaiataria ÉVORA é estruturada segundo a tradição da alta costura, com cortes que acompanham o movimento do corpo sem aprisioná-lo. Meça rente ao corpo utilizando uma fita métrica flexível.
        </p>

        {/* Measurement Table */}
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="border-b border-[#183D32] text-[#183D32] font-serif uppercase tracking-wider text-[11px]">
                <th className="py-2.5 px-3">Tamanho</th>
                <th className="py-2.5 px-3">Busto</th>
                <th className="py-2.5 px-3">Cintura</th>
                <th className="py-2.5 px-3">Quadril</th>
                <th className="py-2.5 px-3">Comprimento</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#D8CCBA]/60 text-[#183D32]">
              {measurements.map((row) => (
                <tr key={row.size} className="hover:bg-white/40 transition-colors">
                  <td className="py-2.5 px-3 font-semibold">{row.size}</td>
                  <td className="py-2.5 px-3 tabular-nums">{row.busto}</td>
                  <td className="py-2.5 px-3 tabular-nums">{row.cintura}</td>
                  <td className="py-2.5 px-3 tabular-nums">{row.quadril}</td>
                  <td className="py-2.5 px-3 tabular-nums">{row.comprimento}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Sob Medida Callout */}
        <div className="p-4 bg-white/60 border border-[#D8CCBA] space-y-2 mb-6">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#183D32] tracking-wider uppercase">
            <Sparkles className="w-4 h-4 text-[#72513E]" />
            <span>Serviço de Alta Costura Sob Medida</span>
          </div>
          <p className="text-xs text-[#72513E] font-light leading-relaxed">
            Caso prefira confeccionar a peça exatamente sob suas proporções, selecione a opção <strong>Sob Medida</strong> ao adicionar à sacola. Nosso concierge de alfaiataria entrará em contato para agendar uma conferência virtual ou presencial de suas medidas antes do corte do tecido.
          </p>
        </div>

        <div className="text-right">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-[#183D32] text-[#F5F1E8] text-xs uppercase tracking-wider font-medium hover:bg-[#642B38] transition-colors cursor-pointer"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
};
