/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ArrowRight, Tag, Truck, ShieldCheck, Gift } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { SHIPPING_METHODS } from '../../data/mockData';

export const CartDrawer: React.FC = () => {
  const { 
    isCartOpen, 
    setIsCartOpen, 
    cart, 
    removeFromCart, 
    updateCartQuantity, 
    subtotal, 
    discount, 
    appliedCoupon, 
    applyCoupon, 
    removeCoupon, 
    selectedShipping, 
    setSelectedShipping, 
    cep, 
    calculateShipping, 
    shippingCalculated, 
    cartTotal,
    setActiveView,
    navigateToProduct,
    showToast
  } = useStore();

  const [inputCoupon, setInputCoupon] = useState('');
  const [couponError, setCouponError] = useState<string | null>(null);
  const [inputCep, setInputCep] = useState(cep || '01423-001');

  if (!isCartOpen) return null;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCoupon.trim()) return;
    const res = applyCoupon(inputCoupon);
    if (!res.success) {
      setCouponError(res.message);
    } else {
      setCouponError(null);
      setInputCoupon('');
      showToast(res.message);
    }
  };

  const handleCalculateCep = (e: React.FormEvent) => {
    e.preventDefault();
    calculateShipping(inputCep);
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setActiveView('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-[#183D32]/60 backdrop-blur-xs transition-opacity"
      />

      {/* Slide-over panel */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#F5F1E8] border-l border-[#D8CCBA] flex flex-col shadow-2xl">
          {/* Header */}
          <div className="p-6 border-b border-[#D8CCBA]/80 flex items-center justify-between">
            <div>
              <h2 className="font-serif text-2xl text-[#183D32] font-light">
                Sua Sacola ÉVORA
              </h2>
              <span className="text-[11px] uppercase tracking-[0.2em] text-[#72513E] block mt-0.5 font-light">
                {cart.length} {cart.length === 1 ? 'peça selecionada' : 'peças selecionadas'}
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1 hover:text-[#642B38] text-[#183D32] transition-colors cursor-pointer"
              aria-label="Fechar sacola"
            >
              <X className="w-6 h-6" strokeWidth={1.3} />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {cart.length === 0 ? (
              <div className="py-20 text-center space-y-4">
                <p className="font-serif text-xl text-[#183D32]">Sua sacola está vazia.</p>
                <p className="text-xs text-[#72513E] font-light max-w-xs mx-auto">
                  Explore nosso acervo permanente e selecione criações atemporais esculpidas em fibras nobres.
                </p>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    setActiveView('catalog');
                  }}
                  className="px-6 py-3 bg-[#183D32] text-[#F5F1E8] text-xs tracking-wider uppercase font-medium hover:bg-[#642B38] transition-colors cursor-pointer"
                >
                  Explorar Acervo
                </button>
              </div>
            ) : (
              <div className="space-y-4 divide-y divide-[#D8CCBA]/50">
                {cart.map((item) => (
                  <div key={item.id} className="pt-4 first:pt-0 flex gap-4">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      onClick={() => {
                        setIsCartOpen(false);
                        navigateToProduct(item.productId);
                      }}
                      className="w-20 h-24 object-cover border border-[#D8CCBA]/60 shrink-0 cursor-pointer"
                    />

                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start gap-2">
                          <h4 
                            onClick={() => {
                              setIsCartOpen(false);
                              navigateToProduct(item.productId);
                            }}
                            className="font-serif text-base text-[#183D32] hover:text-[#642B38] transition-colors cursor-pointer line-clamp-1"
                          >
                            {item.product.name}
                          </h4>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-[#72513E] hover:text-[#642B38] p-1 transition-colors cursor-pointer"
                            title="Remover peça"
                          >
                            <Trash2 className="w-4 h-4" strokeWidth={1.3} />
                          </button>
                        </div>

                        <div className="text-xs text-[#72513E] font-light mt-0.5 space-x-2">
                          <span>Tam: <strong>{item.size}</strong></span>
                          <span>·</span>
                          <span>Cor: {item.color.name}</span>
                        </div>

                        {item.isGiftWrapped && (
                          <div className="flex items-center gap-1 text-[10px] text-[#183D32] mt-1">
                            <Gift className="w-3 h-3 text-[#72513E]" />
                            <span>Embalagem de Luxo Sustentável</span>
                          </div>
                        )}
                      </div>

                      <div className="flex items-center justify-between mt-3">
                        {/* Quantity Stepper */}
                        <div className="flex items-center border border-[#D8CCBA] bg-white/60">
                          <button
                            onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                            className="px-2.5 py-1 text-[#183D32] hover:bg-white text-xs cursor-pointer"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-3 py-1 text-xs font-semibold tabular-nums text-[#183D32]">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                            className="px-2.5 py-1 text-[#183D32] hover:bg-white text-xs cursor-pointer"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <span className="text-sm font-semibold text-[#183D32] tabular-nums">
                          R$ {(item.product.price * item.quantity).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {cart.length > 0 && (
              <div className="space-y-6 pt-6 border-t border-[#D8CCBA]/80">
                {/* Freight Calculator */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-[#72513E]">
                    <span className="uppercase tracking-wider font-medium flex items-center gap-1.5">
                      <Truck className="w-3.5 h-3.5 text-[#183D32]" />
                      <span>Cálculo de Entrega</span>
                    </span>
                    {shippingCalculated && (
                      <span className="text-[#183D32] font-semibold">{selectedShipping.name}</span>
                    )}
                  </div>
                  <form onSubmit={handleCalculateCep} className="flex gap-2">
                    <input
                      type="text"
                      value={inputCep}
                      onChange={(e) => setInputCep(e.target.value)}
                      placeholder="CEP (ex: 01423-001)"
                      className="bg-white/60 border border-[#D8CCBA] px-3 py-2 text-xs text-[#183D32] flex-grow focus:outline-none focus:border-[#183D32]"
                    />
                    <button
                      type="submit"
                      className="bg-[#D8CCBA] text-[#183D32] px-4 py-2 text-xs uppercase tracking-wider font-medium hover:bg-[#183D32] hover:text-[#F5F1E8] transition-colors cursor-pointer"
                    >
                      Calcular
                    </button>
                  </form>

                  {/* Available Shipping Methods */}
                  <div className="pt-2 space-y-1.5">
                    {SHIPPING_METHODS.map((method) => (
                      <label
                        key={method.id}
                        className={`flex items-center justify-between p-2.5 border text-xs cursor-pointer transition-colors ${
                          selectedShipping.id === method.id
                            ? 'border-[#183D32] bg-white font-medium text-[#183D32]'
                            : 'border-[#D8CCBA]/60 bg-white/30 text-[#72513E] hover:border-[#183D32]'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <input
                            type="radio"
                            name="cartShipping"
                            checked={selectedShipping.id === method.id}
                            onChange={() => setSelectedShipping(method)}
                            className="accent-[#183D32]"
                          />
                          <div>
                            <span className="block">{method.name}</span>
                            <span className="text-[10px] text-[#72513E]/80 block font-light">
                              {method.estimatedDays} · {method.carrier}
                            </span>
                          </div>
                        </div>
                        <span className="tabular-nums font-semibold text-[#183D32]">
                          R$ {method.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Coupon Box */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-[#72513E]">
                    <span className="uppercase tracking-wider font-medium flex items-center gap-1.5">
                      <Tag className="w-3.5 h-3.5 text-[#183D32]" />
                      <span>Cupom de Cortesia</span>
                    </span>
                  </div>

                  {appliedCoupon ? (
                    <div className="flex items-center justify-between p-2.5 bg-white border border-[#183D32] text-xs">
                      <div>
                        <strong className="text-[#183D32] font-semibold">{appliedCoupon.code}</strong>
                        <span className="text-[11px] text-[#72513E] block font-light">
                          {appliedCoupon.description}
                        </span>
                      </div>
                      <button
                        onClick={removeCoupon}
                        className="text-[#642B38] hover:underline text-xs cursor-pointer"
                      >
                        Remover
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleApplyCoupon} className="space-y-1">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={inputCoupon}
                          onChange={(e) => setInputCoupon(e.target.value)}
                          placeholder="Ex: BEMVINDO10 ou SLOWLUXURY"
                          className="bg-white/60 border border-[#D8CCBA] px-3 py-2 text-xs uppercase text-[#183D32] flex-grow focus:outline-none focus:border-[#183D32]"
                        />
                        <button
                          type="submit"
                          className="bg-[#183D32] text-[#F5F1E8] px-4 py-2 text-xs uppercase tracking-wider font-medium hover:bg-[#642B38] transition-colors cursor-pointer"
                        >
                          Aplicar
                        </button>
                      </div>
                      {couponError && (
                        <p className="text-[11px] text-[#642B38]">{couponError}</p>
                      )}
                    </form>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Cart Footer Total & Checkout Action */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-[#D8CCBA] bg-white/80 space-y-4">
              <div className="space-y-2 text-xs text-[#183D32]">
                <div className="flex justify-between">
                  <span className="text-[#72513E]">Subtotal</span>
                  <span className="tabular-nums font-medium">
                    R$ {subtotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-[#642B38]">
                    <span>Desconto ({appliedCoupon?.code})</span>
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

                <div className="border-t border-[#D8CCBA]/60 pt-2 flex justify-between text-base font-semibold text-[#183D32]">
                  <span>Total do Pedido</span>
                  <span className="tabular-nums text-lg">
                    R$ {cartTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </span>
                </div>
              </div>

              <button
                onClick={handleProceedToCheckout}
                className="w-full bg-[#183D32] hover:bg-[#642B38] text-[#F5F1E8] py-4 text-xs tracking-[0.25em] uppercase font-semibold transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-lg"
              >
                <span>Avançar para o Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <p className="text-[10px] text-center text-[#72513E] font-light">
                Ambiente criptografado com certificação SSL. Seus dados nunca são armazenados.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
