/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Check, 
  ChevronRight, 
  ShieldCheck, 
  QrCode, 
  CreditCard, 
  Barcode, 
  Copy, 
  ArrowLeft, 
  Lock, 
  Clock, 
  Truck, 
  Sparkles,
  Printer,
  ShoppingBag
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { PaymentMethodType, Address, Order } from '../../types';
import { SHIPPING_METHODS } from '../../data/mockData';

type CheckoutStep = 'identification' | 'address' | 'shipping' | 'payment' | 'confirmation';

export const CheckoutView: React.FC = () => {
  const { 
    cart, 
    subtotal, 
    discount, 
    appliedCoupon, 
    selectedShipping, 
    setSelectedShipping, 
    cartTotal, 
    currentUser, 
    createOrder, 
    setActiveView, 
    showToast 
  } = useStore();

  const [currentStep, setCurrentStep] = useState<CheckoutStep>('identification');
  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);

  // Form states
  const [customerName, setCustomerName] = useState(currentUser?.name || 'Juliana Cavalcanti');
  const [customerEmail, setCustomerEmail] = useState(currentUser?.email || 'juliana.cavalcanti@evora.com.br');
  const [customerCpf, setCustomerCpf] = useState(currentUser?.cpf || '210.459.780-33');
  const [customerPhone, setCustomerPhone] = useState(currentUser?.phone || '(11) 98765-4321');

  // Address form
  const defaultAddr = currentUser?.addresses[0];
  const [cep, setCep] = useState(defaultAddr?.cep || '01423-001');
  const [street, setStreet] = useState(defaultAddr?.street || 'Rua Oscar Freire');
  const [number, setNumber] = useState(defaultAddr?.number || '1240');
  const [complement, setComplement] = useState(defaultAddr?.complement || 'Apto 141');
  const [neighborhood, setNeighborhood] = useState(defaultAddr?.neighborhood || 'Jardins');
  const [city, setCity] = useState(defaultAddr?.city || 'São Paulo');
  const [state, setState] = useState(defaultAddr?.state || 'SP');

  // Payment states
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodType>('pix');
  const [cardNumber, setCardNumber] = useState('4532 •••• •••• 8821');
  const [cardHolder, setCardHolder] = useState('JULIANA CAVALCANTI');
  const [cardExpiry, setCardExpiry] = useState('11/29');
  const [cardCvv, setCardCvv] = useState('420');
  const [installments, setInstallments] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);

  // Mock Pix details
  const pixDiscount = paymentMethod === 'pix' ? cartTotal * 0.05 : 0;
  const finalPayableTotal = Math.max(0, cartTotal - pixDiscount);
  const pixCopyCode = '00020126580014br.gov.bcb.pix0136evora-pay-9418a72b-89415204000053039865405' + finalPayableTotal.toFixed(2) + '5802BR5915MAISON EVORA6009SAO PAULO62070503***630489AB';
  const boletoDigitavel = '34191.79001 01043.510047 91020.150008 4 94520000' + Math.round(finalPayableTotal).toString().padStart(4, '0');

  // Step transitions
  const handleIdentifySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerEmail || !customerName || !customerCpf) {
      showToast('Por favor, preencha todos os dados de identificação.');
      return;
    }
    setCurrentStep('address');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cep || !street || !number || !city || !state) {
      showToast('Por favor, preencha o endereço completo.');
      return;
    }
    setCurrentStep('shipping');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentStep('payment');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleConfirmOrder = () => {
    setIsProcessing(true);

    const shippingAddress: Address = {
      id: `addr-${Date.now()}`,
      label: 'Entrega Maison',
      recipientName: customerName,
      cep,
      street,
      number,
      complement,
      neighborhood,
      city,
      state
    };

    setTimeout(() => {
      const order = createOrder({
        customerName,
        customerEmail,
        customerPhone,
        customerCpf,
        shippingAddress,
        shippingMethod: selectedShipping,
        paymentMethod,
        paymentDetails: {
          installments: paymentMethod === 'credit_card' ? installments : 1,
          lastDigits: paymentMethod === 'credit_card' ? cardNumber.slice(-4) : undefined,
          pixCode: paymentMethod === 'pix' ? pixCopyCode : undefined,
          boletoCode: paymentMethod === 'boleto' ? boletoDigitavel : undefined
        }
      });

      setConfirmedOrder(order);
      setIsProcessing(false);
      setCurrentStep('confirmation');
      showToast('Pedido registrado com sucesso na Maison ÉVORA.');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1200);
  };

  const copyToClipboard = (text: string, label: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      showToast(`${label} copiado para a área de transferência.`);
    }
  };

  if (cart.length === 0 && currentStep !== 'confirmation') {
    return (
      <div className="py-24 text-center bg-[#F5F1E8] min-h-[70vh]">
        <h2 className="font-serif text-3xl text-[#183D32] mb-3">Sua sacola está vazia</h2>
        <p className="text-xs text-[#72513E] max-w-sm mx-auto mb-6">
          Não há itens prontos para finalização de pedido neste momento.
        </p>
        <button
          onClick={() => setActiveView('catalog')}
          className="px-8 py-3 bg-[#183D32] text-[#F5F1E8] text-xs tracking-widest uppercase"
        >
          Explorar Acervo
        </button>
      </div>
    );
  }

  return (
    <div className="bg-[#F5F1E8] min-h-screen py-10 sm:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Step Progress Header */}
        {currentStep !== 'confirmation' && (
          <div className="mb-12">
            <div className="flex items-center justify-between max-w-3xl mx-auto text-xs tracking-[0.2em] uppercase font-light text-[#72513E]">
              {[
                { id: 'identification', label: '1. Identificação' },
                { id: 'address', label: '2. Endereço' },
                { id: 'shipping', label: '3. Envio' },
                { id: 'payment', label: '4. Pagamento' },
              ].map((step, idx) => {
                const isCurrent = currentStep === step.id;
                const isPassed = 
                  (step.id === 'identification' && currentStep !== 'identification') ||
                  (step.id === 'address' && ['shipping', 'payment'].includes(currentStep)) ||
                  (step.id === 'shipping' && currentStep === 'payment');

                return (
                  <div key={step.id} className="flex items-center gap-2">
                    <span className={`${isCurrent ? 'text-[#183D32] font-semibold underline underline-offset-4' : isPassed ? 'text-[#183D32]' : 'text-[#D8CCBA]'}`}>
                      {step.label}
                    </span>
                    {idx < 3 && <ChevronRight className="w-3.5 h-3.5 text-[#D8CCBA] hidden sm:inline" />}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Confirmation Screen */}
        {currentStep === 'confirmation' && confirmedOrder && (
          <div className="max-w-3xl mx-auto bg-white/80 border border-[#D8CCBA] p-8 sm:p-12 shadow-sm text-center space-y-8">
            <div className="w-16 h-16 rounded-full bg-[#183D32] text-[#F5F1E8] flex items-center justify-center mx-auto shadow-md">
              <Check className="w-8 h-8" strokeWidth={1.5} />
            </div>

            <div className="space-y-2">
              <span className="text-xs uppercase tracking-[0.3em] text-[#72513E] font-medium block">
                Maison ÉVORA · Alta Moda Sob Demanda
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl text-[#183D32]">
                Pedido Confirmado com Distinção
              </h1>
              <p className="text-xs sm:text-sm text-[#72513E] font-light max-w-md mx-auto">
                Agradecemos sua escolha consciente. Seu pedido foi encaminhado ao ateliê para a preparação das fibras e início da costura.
              </p>
            </div>

            {/* Order Reference Box */}
            <div className="p-6 bg-[#F5F1E8] border border-[#D8CCBA] text-left grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-[#183D32]">
              <div>
                <span className="text-[#72513E] uppercase text-[10px] tracking-wider block font-light">Código do Pedido</span>
                <strong className="text-base font-serif font-bold text-[#183D32]">{confirmedOrder.id}</strong>
              </div>
              <div>
                <span className="text-[#72513E] uppercase text-[10px] tracking-wider block font-light">Rastreamento da Remessa</span>
                <span className="font-mono font-medium text-[#183D32]">{confirmedOrder.trackingCode}</span>
              </div>
              <div>
                <span className="text-[#72513E] uppercase text-[10px] tracking-wider block font-light">Cliente</span>
                <span>{confirmedOrder.customerName} ({confirmedOrder.customerEmail})</span>
              </div>
              <div>
                <span className="text-[#72513E] uppercase text-[10px] tracking-wider block font-light">Endereço de Entrega</span>
                <span>{confirmedOrder.shippingAddress.street}, {confirmedOrder.shippingAddress.number} - {confirmedOrder.shippingAddress.city}/{confirmedOrder.shippingAddress.state}</span>
              </div>
            </div>

            {/* If Pix was selected, display interactive Pix payment info */}
            {confirmedOrder.paymentMethod === 'pix' && (
              <div className="p-6 bg-white border border-[#183D32]/40 text-left space-y-4">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#183D32]">
                  <QrCode className="w-4 h-4 text-[#72513E]" />
                  <span>Pagamento Instantâneo via PIX (5% de desconto concedido)</span>
                </div>
                <div className="flex flex-col sm:flex-row items-center gap-6">
                  {/* Generated SVG QR Code */}
                  <div className="w-36 h-36 bg-white p-2 border border-[#D8CCBA] flex items-center justify-center shrink-0">
                    <svg viewBox="0 0 100 100" className="w-full h-full fill-[#183D32]">
                      <rect x="10" y="10" width="20" height="20" />
                      <rect x="70" y="10" width="20" height="20" />
                      <rect x="10" y="70" width="20" height="20" />
                      <rect x="15" y="15" width="10" height="10" fill="#F5F1E8" />
                      <rect x="75" y="15" width="10" height="10" fill="#F5F1E8" />
                      <rect x="15" y="75" width="10" height="10" fill="#F5F1E8" />
                      <rect x="35" y="15" width="8" height="8" />
                      <rect x="48" y="15" width="14" height="6" />
                      <rect x="35" y="35" width="30" height="30" />
                      <rect x="40" y="40" width="20" height="20" fill="#F5F1E8" />
                      <rect x="45" y="45" width="10" height="10" />
                      <rect x="70" y="40" width="15" height="8" />
                      <rect x="15" y="50" width="10" height="12" />
                      <rect x="70" y="70" width="18" height="18" />
                      <rect x="40" y="75" width="20" height="10" />
                    </svg>
                  </div>
                  <div className="space-y-2 flex-grow text-xs text-[#72513E]">
                    <p className="font-light">
                      Abra o aplicativo de seu banco, selecione a opção <strong>Pagar via Pix / Ler QR Code</strong> e aponte a câmera, ou utilize a chave copia e cola abaixo:
                    </p>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        readOnly
                        value={confirmedOrder.paymentDetails.pixCode}
                        className="bg-[#F5F1E8] border border-[#D8CCBA] px-3 py-2 text-[11px] font-mono text-[#183D32] truncate flex-grow"
                      />
                      <button
                        onClick={() => copyToClipboard(confirmedOrder.paymentDetails.pixCode || '', 'Código PIX')}
                        className="px-3 py-2 bg-[#183D32] text-[#F5F1E8] text-xs flex items-center gap-1.5 uppercase tracking-wider cursor-pointer hover:bg-[#642B38]"
                      >
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copiar</span>
                      </button>
                    </div>
                    <p className="text-[10px] text-[#72513E]/80">
                      * O ateliê inicia a preparação imediatamente após a compensação instantânea do Pix.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <button
                onClick={() => window.print()}
                className="w-full sm:w-auto px-6 py-3 border border-[#D8CCBA] text-[#183D32] hover:bg-white text-xs uppercase tracking-wider font-medium flex items-center justify-center gap-2 cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>Imprimir Recibo da Maison</span>
              </button>
              <button
                onClick={() => {
                  setActiveView('account');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full sm:w-auto px-8 py-3 bg-[#183D32] hover:bg-[#642B38] text-[#F5F1E8] text-xs uppercase tracking-wider font-semibold transition-colors cursor-pointer"
              >
                Acompanhar na Minha Conta
              </button>
            </div>
          </div>
        )}

        {/* 4-Step Checkout Form */}
        {currentStep !== 'confirmation' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Left Column: Form Steps (Cols 1-7) */}
            <div className="lg:col-span-7 bg-white/70 border border-[#D8CCBA] p-6 sm:p-8 shadow-sm">
              {/* Step 1: Identification */}
              {currentStep === 'identification' && (
                <form onSubmit={handleIdentifySubmit} className="space-y-6">
                  <div>
                    <h2 className="font-serif text-2xl text-[#183D32] font-light">
                      1. Identificação do(a) Cliente
                    </h2>
                    <p className="text-xs text-[#72513E] font-light mt-1">
                      Informações protegidas pela LGPD e utilizadas para a emissão de certificado e nota fiscal.
                    </p>
                  </div>

                  <div className="space-y-4 text-xs">
                    <div>
                      <label className="block text-[#72513E] uppercase tracking-wider text-[11px] mb-1 font-medium">
                        Nome Completo
                      </label>
                      <input
                        type="text"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        required
                        className="w-full bg-[#F5F1E8]/50 border border-[#D8CCBA] px-4 py-3 text-sm text-[#183D32] focus:outline-none focus:border-[#183D32]"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[#72513E] uppercase tracking-wider text-[11px] mb-1 font-medium">
                          E-mail Pessoal / Corporativo
                        </label>
                        <input
                          type="email"
                          value={customerEmail}
                          onChange={(e) => setCustomerEmail(e.target.value)}
                          required
                          className="w-full bg-[#F5F1E8]/50 border border-[#D8CCBA] px-4 py-3 text-sm text-[#183D32] focus:outline-none focus:border-[#183D32]"
                        />
                      </div>
                      <div>
                        <label className="block text-[#72513E] uppercase tracking-wider text-[11px] mb-1 font-medium">
                          Telefone / WhatsApp Concierge
                        </label>
                        <input
                          type="tel"
                          value={customerPhone}
                          onChange={(e) => setCustomerPhone(e.target.value)}
                          required
                          className="w-full bg-[#F5F1E8]/50 border border-[#D8CCBA] px-4 py-3 text-sm text-[#183D32] focus:outline-none focus:border-[#183D32]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[#72513E] uppercase tracking-wider text-[11px] mb-1 font-medium">
                        CPF (Exigência fiscal brasileira)
                      </label>
                      <input
                        type="text"
                        value={customerCpf}
                        onChange={(e) => setCustomerCpf(e.target.value)}
                        placeholder="000.000.000-00"
                        required
                        className="w-full bg-[#F5F1E8]/50 border border-[#D8CCBA] px-4 py-3 text-sm text-[#183D32] focus:outline-none focus:border-[#183D32]"
                      />
                    </div>
                  </div>

                  <div className="pt-4 flex justify-between items-center">
                    <button
                      type="button"
                      onClick={() => setActiveView('catalog')}
                      className="text-xs text-[#72513E] hover:text-[#183D32] cursor-pointer"
                    >
                      Continuar Comprando
                    </button>
                    <button
                      type="submit"
                      className="px-8 py-3.5 bg-[#183D32] hover:bg-[#642B38] text-[#F5F1E8] text-xs uppercase tracking-[0.2em] font-medium transition-colors cursor-pointer"
                    >
                      Avançar para Endereço
                    </button>
                  </div>
                </form>
              )}

              {/* Step 2: Address */}
              {currentStep === 'address' && (
                <form onSubmit={handleAddressSubmit} className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="font-serif text-2xl text-[#183D32] font-light">
                        2. Endereço de Entrega
                      </h2>
                      <p className="text-xs text-[#72513E] font-light mt-1">
                        Onde sua criação ÉVORA será entregue com todo o protocolo de preservação.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setCurrentStep('identification')}
                      className="text-xs text-[#72513E] underline cursor-pointer"
                    >
                      Voltar
                    </button>
                  </div>

                  <div className="space-y-4 text-xs">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-[#72513E] uppercase tracking-wider text-[11px] mb-1 font-medium">
                          CEP
                        </label>
                        <input
                          type="text"
                          value={cep}
                          onChange={(e) => setCep(e.target.value)}
                          placeholder="00000-000"
                          required
                          className="w-full bg-[#F5F1E8]/50 border border-[#D8CCBA] px-4 py-3 text-sm text-[#183D32] focus:outline-none focus:border-[#183D32]"
                        />
                      </div>
                      <div className="sm:col-span-2 flex items-end">
                        <span className="text-[11px] text-[#72513E] pb-3 italic">
                          * Preenchimento automático para capitais e regiões metropolitanas
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                      <div className="sm:col-span-3">
                        <label className="block text-[#72513E] uppercase tracking-wider text-[11px] mb-1 font-medium">
                          Rua / Avenida / Alameda
                        </label>
                        <input
                          type="text"
                          value={street}
                          onChange={(e) => setStreet(e.target.value)}
                          required
                          className="w-full bg-[#F5F1E8]/50 border border-[#D8CCBA] px-4 py-3 text-sm text-[#183D32] focus:outline-none focus:border-[#183D32]"
                        />
                      </div>
                      <div>
                        <label className="block text-[#72513E] uppercase tracking-wider text-[11px] mb-1 font-medium">
                          Número
                        </label>
                        <input
                          type="text"
                          value={number}
                          onChange={(e) => setNumber(e.target.value)}
                          required
                          className="w-full bg-[#F5F1E8]/50 border border-[#D8CCBA] px-4 py-3 text-sm text-[#183D32] focus:outline-none focus:border-[#183D32]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-[#72513E] uppercase tracking-wider text-[11px] mb-1 font-medium">
                          Complemento
                        </label>
                        <input
                          type="text"
                          value={complement}
                          onChange={(e) => setComplement(e.target.value)}
                          placeholder="Apto, Bloco..."
                          className="w-full bg-[#F5F1E8]/50 border border-[#D8CCBA] px-4 py-3 text-sm text-[#183D32] focus:outline-none focus:border-[#183D32]"
                        />
                      </div>
                      <div>
                        <label className="block text-[#72513E] uppercase tracking-wider text-[11px] mb-1 font-medium">
                          Bairro
                        </label>
                        <input
                          type="text"
                          value={neighborhood}
                          onChange={(e) => setNeighborhood(e.target.value)}
                          required
                          className="w-full bg-[#F5F1E8]/50 border border-[#D8CCBA] px-4 py-3 text-sm text-[#183D32] focus:outline-none focus:border-[#183D32]"
                        />
                      </div>
                      <div>
                        <label className="block text-[#72513E] uppercase tracking-wider text-[11px] mb-1 font-medium">
                          Cidade / UF
                        </label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            required
                            className="w-2/3 bg-[#F5F1E8]/50 border border-[#D8CCBA] px-3 py-3 text-sm text-[#183D32] focus:outline-none focus:border-[#183D32]"
                          />
                          <input
                            type="text"
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                            maxLength={2}
                            required
                            className="w-1/3 bg-[#F5F1E8]/50 border border-[#D8CCBA] px-2 py-3 text-sm text-center uppercase text-[#183D32] focus:outline-none focus:border-[#183D32]"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 flex justify-between items-center">
                    <button
                      type="button"
                      onClick={() => setCurrentStep('identification')}
                      className="text-xs text-[#72513E] hover:text-[#183D32] cursor-pointer"
                    >
                      Voltar para Identificação
                    </button>
                    <button
                      type="submit"
                      className="px-8 py-3.5 bg-[#183D32] hover:bg-[#642B38] text-[#F5F1E8] text-xs uppercase tracking-[0.2em] font-medium transition-colors cursor-pointer"
                    >
                      Avançar para Envio
                    </button>
                  </div>
                </form>
              )}

              {/* Step 3: Shipping */}
              {currentStep === 'shipping' && (
                <form onSubmit={handleShippingSubmit} className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="font-serif text-2xl text-[#183D32] font-light">
                        3. Modalidade de Envio
                      </h2>
                      <p className="text-xs text-[#72513E] font-light mt-1">
                        Selecione o serviço de logística dedicado da Maison ÉVORA.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setCurrentStep('address')}
                      className="text-xs text-[#72513E] underline cursor-pointer"
                    >
                      Voltar
                    </button>
                  </div>

                  <div className="space-y-3">
                    {SHIPPING_METHODS.map((method) => {
                      const isSelected = selectedShipping.id === method.id;
                      return (
                        <div
                          key={method.id}
                          onClick={() => setSelectedShipping(method)}
                          className={`p-4 border transition-all cursor-pointer ${
                            isSelected
                              ? 'border-[#183D32] bg-[#F5F1E8] ring-1 ring-[#183D32]'
                              : 'border-[#D8CCBA] hover:border-[#183D32] bg-white/40'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <div className="flex items-center gap-3">
                              <input
                                type="radio"
                                name="checkoutShipping"
                                checked={isSelected}
                                onChange={() => setSelectedShipping(method)}
                                className="accent-[#183D32]"
                              />
                              <span className="font-serif text-base text-[#183D32] font-medium">
                                {method.name}
                              </span>
                            </div>
                            <span className="font-semibold text-sm text-[#183D32] tabular-nums">
                              R$ {method.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                            </span>
                          </div>
                          <p className="text-xs text-[#72513E] font-light pl-6">
                            {method.description}
                          </p>
                          <span className="text-[10px] text-[#183D32] font-medium pl-6 block mt-1">
                            Prazo estimado: {method.estimatedDays}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  <div className="pt-4 flex justify-between items-center">
                    <button
                      type="button"
                      onClick={() => setCurrentStep('address')}
                      className="text-xs text-[#72513E] hover:text-[#183D32] cursor-pointer"
                    >
                      Voltar para Endereço
                    </button>
                    <button
                      type="submit"
                      className="px-8 py-3.5 bg-[#183D32] hover:bg-[#642B38] text-[#F5F1E8] text-xs uppercase tracking-[0.2em] font-medium transition-colors cursor-pointer"
                    >
                      Avançar para Pagamento
                    </button>
                  </div>
                </form>
              )}

              {/* Step 4: Payment */}
              {currentStep === 'payment' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="font-serif text-2xl text-[#183D32] font-light">
                        4. Gateway de Pagamento Seguro
                      </h2>
                      <p className="text-xs text-[#72513E] font-light mt-1">
                        Criptografia bancária de ponta a ponta. Nenhum dado de cartão é salvo.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setCurrentStep('shipping')}
                      className="text-xs text-[#72513E] underline cursor-pointer"
                    >
                      Voltar
                    </button>
                  </div>

                  {/* Payment Method Selector */}
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { id: 'pix', label: 'PIX (5% OFF)', icon: <QrCode className="w-4 h-4" /> },
                      { id: 'credit_card', label: 'Cartão de Crédito', icon: <CreditCard className="w-4 h-4" /> },
                      { id: 'boleto', label: 'Boleto Bancário', icon: <Barcode className="w-4 h-4" /> },
                    ].map((m) => {
                      const isSelected = paymentMethod === m.id;
                      return (
                        <button
                          key={m.id}
                          type="button"
                          onClick={() => setPaymentMethod(m.id as PaymentMethodType)}
                          className={`p-3 text-xs border text-center transition-all cursor-pointer flex flex-col items-center gap-1.5 ${
                            isSelected
                              ? 'bg-[#183D32] text-[#F5F1E8] border-[#183D32] font-semibold'
                              : 'border-[#D8CCBA] bg-white/40 text-[#183D32] hover:border-[#183D32]'
                          }`}
                        >
                          {m.icon}
                          <span className="tracking-wider uppercase text-[10px]">{m.label}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* PIX Form */}
                  {paymentMethod === 'pix' && (
                    <div className="p-5 bg-[#F5F1E8] border border-[#D8CCBA] space-y-3 text-xs text-[#72513E]">
                      <div className="flex items-center gap-2 text-[#183D32] font-semibold">
                        <Check className="w-4 h-4" />
                        <span>Desconto Especial de 5% Aplicado</span>
                      </div>
                      <p className="font-light leading-relaxed">
                        Ao confirmar seu pedido, um QR Code dinâmico do Banco Central do Brasil e a chave PIX copia-e-cola serão gerados imediatamente.
                      </p>
                      <div className="p-3 bg-white border border-[#D8CCBA] text-[#183D32]">
                        <span className="text-[11px] uppercase tracking-wider block text-[#72513E]">Total a pagar no PIX:</span>
                        <strong className="text-xl font-serif">
                          R$ {finalPayableTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </strong>
                      </div>
                    </div>
                  )}

                  {/* Credit Card Form */}
                  {paymentMethod === 'credit_card' && (
                    <div className="space-y-4 text-xs">
                      <div>
                        <label className="block text-[#72513E] uppercase tracking-wider text-[11px] mb-1 font-medium">
                          Número do Cartão
                        </label>
                        <input
                          type="text"
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          placeholder="0000 0000 0000 0000"
                          className="w-full bg-[#F5F1E8]/50 border border-[#D8CCBA] px-4 py-3 text-sm text-[#183D32] focus:outline-none focus:border-[#183D32]"
                        />
                      </div>

                      <div>
                        <label className="block text-[#72513E] uppercase tracking-wider text-[11px] mb-1 font-medium">
                          Nome Impresso no Cartão
                        </label>
                        <input
                          type="text"
                          value={cardHolder}
                          onChange={(e) => setCardHolder(e.target.value)}
                          placeholder="COMO NO CARTÃO"
                          className="w-full bg-[#F5F1E8]/50 border border-[#D8CCBA] px-4 py-3 text-sm text-[#183D32] uppercase focus:outline-none focus:border-[#183D32]"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[#72513E] uppercase tracking-wider text-[11px] mb-1 font-medium">
                            Validade (MM/AA)
                          </label>
                          <input
                            type="text"
                            value={cardExpiry}
                            onChange={(e) => setCardExpiry(e.target.value)}
                            placeholder="12/28"
                            className="w-full bg-[#F5F1E8]/50 border border-[#D8CCBA] px-4 py-3 text-sm text-[#183D32] focus:outline-none focus:border-[#183D32]"
                          />
                        </div>
                        <div>
                          <label className="block text-[#72513E] uppercase tracking-wider text-[11px] mb-1 font-medium">
                            CVV / Código de Segurança
                          </label>
                          <input
                            type="password"
                            maxLength={4}
                            value={cardCvv}
                            onChange={(e) => setCardCvv(e.target.value)}
                            placeholder="•••"
                            className="w-full bg-[#F5F1E8]/50 border border-[#D8CCBA] px-4 py-3 text-sm text-[#183D32] focus:outline-none focus:border-[#183D32]"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[#72513E] uppercase tracking-wider text-[11px] mb-1 font-medium">
                          Condição de Parcelamento
                        </label>
                        <select
                          value={installments}
                          onChange={(e) => setInstallments(Number(e.target.value))}
                          className="w-full bg-white border border-[#D8CCBA] px-4 py-3 text-sm text-[#183D32] focus:outline-none focus:border-[#183D32] cursor-pointer"
                        >
                          {[1, 2, 3, 4, 5, 6].map((num) => (
                            <option key={num} value={num}>
                              {num}x de R$ {(cartTotal / num).toLocaleString('pt-BR', { minimumFractionDigits: 2 })} sem juros
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  )}

                  {/* Boleto Form */}
                  {paymentMethod === 'boleto' && (
                    <div className="p-5 bg-[#F5F1E8] border border-[#D8CCBA] space-y-3 text-xs text-[#72513E]">
                      <div className="flex items-center gap-2 text-[#183D32] font-semibold">
                        <Barcode className="w-4 h-4" />
                        <span>Boleto Bancário com Compensação em até 3 dias úteis</span>
                      </div>
                      <p className="font-light leading-relaxed">
                        Ao finalizar a compra, a linha digitável e o código de barras serão exibidos para pagamento no Internet Banking ou lotéricas.
                      </p>
                    </div>
                  )}

                  <div className="pt-4 border-t border-[#D8CCBA]/60">
                    <button
                      type="button"
                      disabled={isProcessing}
                      onClick={handleConfirmOrder}
                      className="w-full bg-[#183D32] hover:bg-[#642B38] text-[#F5F1E8] py-4 text-xs tracking-[0.25em] uppercase font-semibold transition-colors cursor-pointer flex items-center justify-center gap-3 shadow-lg disabled:opacity-50"
                    >
                      <Lock className="w-4 h-4" />
                      <span>{isProcessing ? 'Processando junto à Maison...' : 'Concluir Aquisição com Segurança'}</span>
                    </button>
                    <p className="text-[10px] text-center text-[#72513E] mt-3 font-light">
                      Ao clicar em concluir, você concorda com os termos de produção sob demanda e políticas da Maison ÉVORA.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Right Column: Order Summary (Cols 8-12) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white/80 border border-[#D8CCBA] p-6 shadow-sm space-y-4">
                <h3 className="font-serif text-xl text-[#183D32] font-light border-b border-[#D8CCBA]/60 pb-3">
                  Resumo do Pedido ({cart.length})
                </h3>

                <div className="space-y-3 max-h-64 overflow-y-auto divide-y divide-[#D8CCBA]/40">
                  {cart.map((item) => (
                    <div key={item.id} className="pt-3 first:pt-0 flex gap-3 text-xs">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-14 h-18 object-cover border border-[#D8CCBA]/60 shrink-0"
                      />
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <h4 className="font-serif text-sm text-[#183D32] line-clamp-1">{item.product.name}</h4>
                          <span className="text-[11px] text-[#72513E] block">
                            Tam: {item.size} · {item.color.name}
                          </span>
                        </div>
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-[#72513E] font-light">Qtd: {item.quantity}</span>
                          <span className="font-semibold text-[#183D32] tabular-nums">
                            R$ {(item.product.price * item.quantity).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Subtotals & Discounts */}
                <div className="border-t border-[#D8CCBA]/80 pt-4 space-y-2 text-xs text-[#183D32]">
                  <div className="flex justify-between">
                    <span className="text-[#72513E]">Subtotal dos Itens</span>
                    <span className="tabular-nums font-medium">
                      R$ {subtotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </span>
                  </div>

                  {discount > 0 && (
                    <div className="flex justify-between text-[#642B38]">
                      <span>Cortesia ({appliedCoupon?.code})</span>
                      <span className="tabular-nums font-semibold">
                        - R$ {discount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span className="text-[#72513E]">Envio ({selectedShipping.name})</span>
                    <span className="tabular-nums font-medium">
                      R$ {selectedShipping.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </span>
                  </div>

                  {paymentMethod === 'pix' && currentStep === 'payment' && (
                    <div className="flex justify-between text-[#183D32] font-medium">
                      <span>Desconto PIX à vista (5%)</span>
                      <span className="tabular-nums">
                        - R$ {pixDiscount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                  )}

                  <div className="border-t border-[#D8CCBA]/80 pt-3 flex justify-between text-base font-semibold text-[#183D32]">
                    <span>Total da Aquisição</span>
                    <span className="tabular-nums text-lg">
                      R$ {(currentStep === 'payment' && paymentMethod === 'pix' ? finalPayableTotal : cartTotal).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                </div>

                <div className="pt-2 text-[11px] text-[#72513E] font-light flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#183D32]" />
                  <span>Embalagem neutra e certificada com entrega monitorada.</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
