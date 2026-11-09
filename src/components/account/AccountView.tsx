/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  User, 
  Package, 
  MapPin, 
  Heart, 
  LogOut, 
  ShieldCheck, 
  Clock, 
  CheckCircle2, 
  Truck, 
  Plus, 
  Trash2, 
  Edit3,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { Address, OrderStatus } from '../../types';
import { ProductCard } from '../catalog/ProductCard';

type AccountTab = 'orders' | 'profile' | 'addresses' | 'wishlist';

export const AccountView: React.FC = () => {
  const { 
    currentUser, 
    login, 
    logout, 
    register, 
    updateProfile, 
    addAddress, 
    removeAddress, 
    setDefaultAddress, 
    orders, 
    products, 
    wishlist, 
    setActiveView,
    showToast 
  } = useStore();

  const [activeTab, setActiveTab] = useState<AccountTab>('orders');

  // Auth toggle state
  const [authMode, setAuthMode] = useState<'login' | 'register' | 'forgot'>('login');
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authName, setAuthName] = useState('');
  const [authPhone, setAuthPhone] = useState('');
  const [authCpf, setAuthCpf] = useState('');

  // Profile edit state
  const [editName, setEditName] = useState(currentUser?.name || '');
  const [editPhone, setEditPhone] = useState(currentUser?.phone || '');
  const [editCpf, setEditCpf] = useState(currentUser?.cpf || '');

  // New address state
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [newAddrLabel, setNewAddrLabel] = useState('Residência');
  const [newAddrRecipient, setNewAddrRecipient] = useState(currentUser?.name || '');
  const [newAddrCep, setNewAddrCep] = useState('');
  const [newAddrStreet, setNewAddrStreet] = useState('');
  const [newAddrNumber, setNewAddrNumber] = useState('');
  const [newAddrComplement, setNewAddrComplement] = useState('');
  const [newAddrNeighborhood, setNewAddrNeighborhood] = useState('');
  const [newAddrCity, setNewAddrCity] = useState('');
  const [newAddrState, setNewAddrState] = useState('SP');

  const wishlistProducts = products.filter((p) => wishlist.includes(p.id));

  // Auth actions
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(authEmail);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    register(authName, authEmail, authCpf, authPhone);
  };

  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Instruções confidenciais de redefinição foram enviadas para seu e-mail.');
    setAuthMode('login');
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name: editName,
      phone: editPhone,
      cpf: editCpf
    });
  };

  const handleSaveNewAddress = (e: React.FormEvent) => {
    e.preventDefault();
    addAddress({
      label: newAddrLabel,
      recipientName: newAddrRecipient,
      cep: newAddrCep,
      street: newAddrStreet,
      number: newAddrNumber,
      complement: newAddrComplement,
      neighborhood: newAddrNeighborhood,
      city: newAddrCity,
      state: newAddrState,
      isDefault: false
    });
    setIsAddingAddress(false);
    setNewAddrCep('');
    setNewAddrStreet('');
    setNewAddrNumber('');
  };

  const getStatusStepIndex = (status: OrderStatus) => {
    switch (status) {
      case 'Pendente': return 0;
      case 'Em Produção Artesanal': return 1;
      case 'Controle de Qualidade': return 2;
      case 'Enviado': return 3;
      case 'Entregue': return 4;
      default: return 0;
    }
  };

  // If user is not logged in, render quiet luxury Login / Register screen
  if (!currentUser) {
    return (
      <div className="bg-[#F5F1E8] min-h-[80vh] py-16 flex items-center justify-center px-4">
        <div className="bg-white/80 border border-[#D8CCBA] max-w-md w-full p-8 shadow-sm">
          <div className="text-center mb-8">
            <span className="font-serif text-3xl tracking-[0.25em] text-[#183D32] font-semibold block">
              ÉVORA
            </span>
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#72513E] block mt-1 font-light">
              Espaço Privado do Cliente
            </span>
          </div>

          {authMode === 'login' && (
            <form onSubmit={handleLoginSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-[#72513E] uppercase tracking-wider text-[11px] mb-1 font-medium">
                  E-mail Cadastrado
                </label>
                <input
                  type="email"
                  value={authEmail}
                  onChange={(e) => setAuthEmail(e.target.value)}
                  placeholder="exemplo@dominio.com"
                  required
                  className="w-full bg-[#F5F1E8]/60 border border-[#D8CCBA] px-4 py-3 text-sm text-[#183D32] focus:outline-none focus:border-[#183D32]"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-[#72513E] uppercase tracking-wider text-[11px] font-medium">
                    Senha
                  </label>
                  <button
                    type="button"
                    onClick={() => setAuthMode('forgot')}
                    className="text-[11px] text-[#72513E] hover:text-[#183D32] underline cursor-pointer"
                  >
                    Esqueceu?
                  </button>
                </div>
                <input
                  type="password"
                  value={authPassword}
                  onChange={(e) => setAuthPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full bg-[#F5F1E8]/60 border border-[#D8CCBA] px-4 py-3 text-sm text-[#183D32] focus:outline-none focus:border-[#183D32]"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#183D32] hover:bg-[#642B38] text-[#F5F1E8] py-3.5 text-xs uppercase tracking-[0.2em] font-medium transition-colors cursor-pointer mt-2"
              >
                Acessar Conta
              </button>

              <div className="text-center pt-4 border-t border-[#D8CCBA]/60">
                <span className="text-[#72513E] font-light">Novo na Maison ÉVORA? </span>
                <button
                  type="button"
                  onClick={() => setAuthMode('register')}
                  className="text-[#183D32] font-semibold underline underline-offset-4 cursor-pointer"
                >
                  Criar Cadastro
                </button>
              </div>

              {/* Demo 1-click login hint */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => login('juliana.cavalcanti@evora.com.br', 'admin')}
                  className="w-full text-[11px] text-[#72513E] hover:text-[#183D32] bg-[#F5F1E8] p-2 border border-[#D8CCBA] cursor-pointer"
                >
                  Entrar com perfil demonstrativo (Juliana Cavalcanti)
                </button>
              </div>
            </form>
          )}

          {authMode === 'register' && (
            <form onSubmit={handleRegisterSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-[#72513E] uppercase tracking-wider text-[11px] mb-1 font-medium">
                  Nome Completo
                </label>
                <input
                  type="text"
                  value={authName}
                  onChange={(e) => setAuthName(e.target.value)}
                  required
                  className="w-full bg-[#F5F1E8]/60 border border-[#D8CCBA] px-4 py-3 text-sm text-[#183D32] focus:outline-none focus:border-[#183D32]"
                />
              </div>

              <div>
                <label className="block text-[#72513E] uppercase tracking-wider text-[11px] mb-1 font-medium">
                  E-mail
                </label>
                <input
                  type="email"
                  value={authEmail}
                  onChange={(e) => setAuthEmail(e.target.value)}
                  required
                  className="w-full bg-[#F5F1E8]/60 border border-[#D8CCBA] px-4 py-3 text-sm text-[#183D32] focus:outline-none focus:border-[#183D32]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#72513E] uppercase tracking-wider text-[11px] mb-1 font-medium">
                    CPF
                  </label>
                  <input
                    type="text"
                    value={authCpf}
                    onChange={(e) => setAuthCpf(e.target.value)}
                    placeholder="000.000.000-00"
                    className="w-full bg-[#F5F1E8]/60 border border-[#D8CCBA] px-3 py-3 text-sm text-[#183D32] focus:outline-none focus:border-[#183D32]"
                  />
                </div>
                <div>
                  <label className="block text-[#72513E] uppercase tracking-wider text-[11px] mb-1 font-medium">
                    Telefone
                  </label>
                  <input
                    type="tel"
                    value={authPhone}
                    onChange={(e) => setAuthPhone(e.target.value)}
                    placeholder="(11) 90000-0000"
                    className="w-full bg-[#F5F1E8]/60 border border-[#D8CCBA] px-3 py-3 text-sm text-[#183D32] focus:outline-none focus:border-[#183D32]"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-[#183D32] hover:bg-[#642B38] text-[#F5F1E8] py-3.5 text-xs uppercase tracking-[0.2em] font-medium transition-colors cursor-pointer mt-2"
              >
                Concluir Registro
              </button>

              <div className="text-center pt-4 border-t border-[#D8CCBA]/60">
                <button
                  type="button"
                  onClick={() => setAuthMode('login')}
                  className="text-[#72513E] hover:text-[#183D32] underline cursor-pointer"
                >
                  Já possui conta? Fazer Login
                </button>
              </div>
            </form>
          )}

          {authMode === 'forgot' && (
            <form onSubmit={handleForgotSubmit} className="space-y-4 text-xs">
              <p className="text-xs text-[#72513E] font-light leading-relaxed">
                Informe o e-mail cadastrado para receber o link seguro de recuperação de acesso.
              </p>
              <div>
                <label className="block text-[#72513E] uppercase tracking-wider text-[11px] mb-1 font-medium">
                  E-mail
                </label>
                <input
                  type="email"
                  value={authEmail}
                  onChange={(e) => setAuthEmail(e.target.value)}
                  required
                  className="w-full bg-[#F5F1E8]/60 border border-[#D8CCBA] px-4 py-3 text-sm text-[#183D32] focus:outline-none focus:border-[#183D32]"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#183D32] hover:bg-[#642B38] text-[#F5F1E8] py-3.5 text-xs uppercase tracking-[0.2em] font-medium transition-colors cursor-pointer"
              >
                Enviar Instruções
              </button>

              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => setAuthMode('login')}
                  className="text-[#72513E] hover:text-[#183D32] underline cursor-pointer"
                >
                  Voltar ao Login
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F5F1E8] min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Account Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-8 border-b border-[#D8CCBA]/60 mb-10 gap-4">
          <div>
            <div className="flex items-center gap-2 text-[10px] tracking-[0.25em] uppercase text-[#72513E] mb-1 font-light">
              <span>Maison ÉVORA</span>
              <span>/</span>
              <span>Espaço Privado</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl text-[#183D32] font-light">
              Olá, {currentUser.name}
            </h1>
            <p className="text-xs text-[#72513E] font-light mt-1">
              Acompanhamento de criações, endereços de entrega e pedidos em ateliê.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {currentUser.role === 'admin' && (
              <button
                onClick={() => { setActiveView('admin'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="px-4 py-2 border border-[#183D32] bg-[#183D32] text-[#F5F1E8] text-xs uppercase tracking-wider font-medium cursor-pointer"
              >
                Painel Restrito Maison
              </button>
            )}
            <button
              onClick={logout}
              className="px-4 py-2 border border-[#D8CCBA] hover:bg-white text-xs uppercase tracking-wider text-[#72513E] hover:text-[#642B38] transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sair</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-8 border-b border-[#D8CCBA]/50">
          {[
            { id: 'orders', label: `Meus Pedidos (${orders.length})`, icon: <Package className="w-4 h-4" /> },
            { id: 'wishlist', label: `Favoritos (${wishlist.length})`, icon: <Heart className="w-4 h-4" /> },
            { id: 'addresses', label: 'Endereços de Entrega', icon: <MapPin className="w-4 h-4" /> },
            { id: 'profile', label: 'Dados Pessoais & LGPD', icon: <User className="w-4 h-4" /> },
          ].map((tab) => {
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as AccountTab)}
                className={`px-4 py-2.5 text-xs uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer border whitespace-nowrap ${
                  isSelected
                    ? 'bg-[#183D32] text-[#F5F1E8] border-[#183D32] font-semibold'
                    : 'bg-white/40 text-[#183D32] border-[#D8CCBA] hover:border-[#183D32]'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab: Orders with Tracking Timeline */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            {orders.length === 0 ? (
              <div className="py-20 text-center bg-white/40 border border-[#D8CCBA] p-8">
                <p className="font-serif text-2xl text-[#183D32]">Você ainda não possui pedidos registrados.</p>
                <p className="text-xs text-[#72513E] mt-1 font-light max-w-sm mx-auto">
                  Explore nosso acervo atemporal e desfrute da alfaiataria sustentável.
                </p>
                <button
                  onClick={() => setActiveView('catalog')}
                  className="mt-4 px-6 py-3 bg-[#183D32] text-[#F5F1E8] text-xs uppercase tracking-wider font-medium"
                >
                  Explorar Acervo
                </button>
              </div>
            ) : (
              orders.map((ord) => {
                const stepIdx = getStatusStepIndex(ord.status);
                const steps: OrderStatus[] = [
                  'Pendente',
                  'Em Produção Artesanal',
                  'Controle de Qualidade',
                  'Enviado',
                  'Entregue'
                ];

                return (
                  <div key={ord.id} className="bg-white/80 border border-[#D8CCBA] p-6 sm:p-8 space-y-6 shadow-sm">
                    {/* Order Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#D8CCBA]/60 gap-4">
                      <div>
                        <div className="flex items-center gap-3">
                          <span className="font-serif text-xl font-bold text-[#183D32]">{ord.id}</span>
                          <span className="text-[10px] tracking-wider uppercase px-2 py-0.5 bg-[#183D32] text-[#F5F1E8]">
                            {ord.status}
                          </span>
                        </div>
                        <span className="text-xs text-[#72513E] font-light mt-1 block">
                          Realizado em {new Date(ord.createdAt).toLocaleDateString('pt-BR')} · Rastreamento: <strong>{ord.trackingCode}</strong>
                        </span>
                      </div>

                      <div className="text-right">
                        <span className="text-xs text-[#72513E] font-light block">Total do Pedido</span>
                        <span className="font-serif text-xl font-bold text-[#183D32] tabular-nums">
                          R$ {ord.total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </span>
                      </div>
                    </div>

                    {/* Tracking Timeline Progress */}
                    <div className="py-2">
                      <span className="text-[10px] uppercase tracking-[0.2em] text-[#72513E] block mb-3 font-medium">
                        Progresso no Ateliê ÉVORA
                      </span>
                      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-xs">
                        {steps.map((s, idx) => {
                          const isDone = idx <= stepIdx;
                          const isCurrent = idx === stepIdx;

                          return (
                            <div key={s} className="flex flex-col items-center">
                              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs mb-1.5 transition-colors ${
                                isDone 
                                  ? 'bg-[#183D32] text-[#F5F1E8]' 
                                  : 'bg-[#D8CCBA]/40 text-[#72513E]'
                              }`}>
                                {isDone ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                              </div>
                              <span className={`text-[11px] leading-tight ${isCurrent ? 'font-semibold text-[#183D32]' : isDone ? 'text-[#183D32]' : 'text-[#72513E]/60 font-light'}`}>
                                {s}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Items List */}
                    <div className="space-y-3 pt-4 border-t border-[#D8CCBA]/40">
                      {ord.items.map((it) => (
                        <div key={it.id} className="flex items-center gap-4 text-xs">
                          <img
                            src={it.product.images[0]}
                            alt={it.product.name}
                            className="w-14 h-16 object-cover border border-[#D8CCBA]"
                          />
                          <div className="flex-1">
                            <h5 className="font-serif text-sm text-[#183D32]">{it.product.name}</h5>
                            <span className="text-[11px] text-[#72513E]">
                              Tamanho: {it.size} · Cor: {it.color.name} · Qtd: {it.quantity}
                            </span>
                          </div>
                          <span className="font-semibold text-[#183D32] tabular-nums">
                            R$ {(it.product.price * it.quantity).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Shipping & Payment summary */}
                    <div className="bg-[#F5F1E8] p-4 text-xs text-[#72513E] flex flex-col sm:flex-row justify-between gap-2 border border-[#D8CCBA]/60">
                      <div>
                        <strong>Entrega em: </strong>
                        {ord.shippingAddress.street}, {ord.shippingAddress.number} ({ord.shippingAddress.city}/{ord.shippingAddress.state})
                      </div>
                      <div>
                        <strong>Pagamento: </strong>
                        {ord.paymentMethod.toUpperCase()}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}

        {/* Tab: Wishlist */}
        {activeTab === 'wishlist' && (
          <div>
            {wishlistProducts.length === 0 ? (
              <div className="py-20 text-center bg-white/40 border border-[#D8CCBA] p-8">
                <p className="font-serif text-2xl text-[#183D32]">Nenhuma peça favoritada no momento.</p>
                <p className="text-xs text-[#72513E] mt-1 font-light">
                  Explore o catálogo e clique no coração para guardar criações que deseja contemplar com calma.
                </p>
                <button
                  onClick={() => setActiveView('catalog')}
                  className="mt-4 px-6 py-2.5 bg-[#183D32] text-[#F5F1E8] text-xs uppercase tracking-wider"
                >
                  Ver Acervo
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
                {wishlistProducts.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab: Addresses */}
        {activeTab === 'addresses' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="font-serif text-xl text-[#183D32]">Endereços Registrados</h3>
              <button
                onClick={() => setIsAddingAddress(!isAddingAddress)}
                className="px-4 py-2 bg-[#183D32] text-[#F5F1E8] text-xs uppercase tracking-wider flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>{isAddingAddress ? 'Cancelar' : 'Adicionar Endereço'}</span>
              </button>
            </div>

            {isAddingAddress && (
              <form onSubmit={handleSaveNewAddress} className="p-6 bg-white border border-[#183D32] space-y-4 text-xs">
                <h4 className="font-serif text-base text-[#183D32] font-semibold">Novo Endereço de Entrega</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#72513E] uppercase text-[10px] mb-1">Rótulo (ex: Residência, Casa de Praia)</label>
                    <input
                      type="text"
                      value={newAddrLabel}
                      onChange={(e) => setNewAddrLabel(e.target.value)}
                      required
                      className="w-full border border-[#D8CCBA] px-3 py-2 bg-[#F5F1E8]/50"
                    />
                  </div>
                  <div>
                    <label className="block text-[#72513E] uppercase text-[10px] mb-1">Destinatário(a)</label>
                    <input
                      type="text"
                      value={newAddrRecipient}
                      onChange={(e) => setNewAddrRecipient(e.target.value)}
                      required
                      className="w-full border border-[#D8CCBA] px-3 py-2 bg-[#F5F1E8]/50"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[#72513E] uppercase text-[10px] mb-1">CEP</label>
                    <input
                      type="text"
                      value={newAddrCep}
                      onChange={(e) => setNewAddrCep(e.target.value)}
                      placeholder="00000-000"
                      required
                      className="w-full border border-[#D8CCBA] px-3 py-2 bg-[#F5F1E8]/50"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-[#72513E] uppercase text-[10px] mb-1">Logradouro</label>
                    <input
                      type="text"
                      value={newAddrStreet}
                      onChange={(e) => setNewAddrStreet(e.target.value)}
                      required
                      className="w-full border border-[#D8CCBA] px-3 py-2 bg-[#F5F1E8]/50"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[#72513E] uppercase text-[10px] mb-1">Número</label>
                    <input
                      type="text"
                      value={newAddrNumber}
                      onChange={(e) => setNewAddrNumber(e.target.value)}
                      required
                      className="w-full border border-[#D8CCBA] px-3 py-2 bg-[#F5F1E8]/50"
                    />
                  </div>
                  <div>
                    <label className="block text-[#72513E] uppercase text-[10px] mb-1">Cidade</label>
                    <input
                      type="text"
                      value={newAddrCity}
                      onChange={(e) => setNewAddrCity(e.target.value)}
                      required
                      className="w-full border border-[#D8CCBA] px-3 py-2 bg-[#F5F1E8]/50"
                    />
                  </div>
                  <div>
                    <label className="block text-[#72513E] uppercase text-[10px] mb-1">Estado</label>
                    <input
                      type="text"
                      value={newAddrState}
                      onChange={(e) => setNewAddrState(e.target.value)}
                      maxLength={2}
                      required
                      className="w-full border border-[#D8CCBA] px-3 py-2 uppercase bg-[#F5F1E8]/50"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#183D32] text-[#F5F1E8] text-xs uppercase tracking-wider font-medium cursor-pointer"
                >
                  Salvar Endereço
                </button>
              </form>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {currentUser.addresses.map((addr) => (
                <div key={addr.id} className="p-5 bg-white/80 border border-[#D8CCBA] flex justify-between items-start text-xs text-[#183D32]">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <strong className="font-serif text-sm">{addr.label}</strong>
                      {addr.isDefault && (
                        <span className="text-[9px] uppercase px-1.5 py-0.5 bg-[#183D32] text-[#F5F1E8]">Padrão</span>
                      )}
                    </div>
                    <p className="text-[#72513E] font-light">{addr.recipientName}</p>
                    <p>{addr.street}, {addr.number} {addr.complement ? `- ${addr.complement}` : ''}</p>
                    <p>{addr.neighborhood} · {addr.city}/{addr.state}</p>
                    <p className="font-mono text-[#72513E]">CEP: {addr.cep}</p>
                  </div>

                  <div className="flex flex-col gap-2 items-end">
                    {!addr.isDefault && (
                      <button
                        onClick={() => setDefaultAddress(addr.id)}
                        className="text-[10px] text-[#183D32] underline hover:text-[#642B38] cursor-pointer"
                      >
                        Tornar padrão
                      </button>
                    )}
                    <button
                      onClick={() => removeAddress(addr.id)}
                      className="text-[#72513E] hover:text-[#642B38] cursor-pointer p-1"
                      title="Excluir endereço"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab: Profile & LGPD */}
        {activeTab === 'profile' && (
          <div className="max-w-xl bg-white/80 border border-[#D8CCBA] p-6 sm:p-8 space-y-6">
            <h3 className="font-serif text-2xl text-[#183D32] font-light">Dados Pessoais & Privacidade</h3>
            <p className="text-xs text-[#72513E] font-light leading-relaxed">
              Mantenha seus dados de contato e faturamento atualizados para o concierge de alfaiataria.
            </p>

            <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
              <div>
                <label className="block text-[#72513E] uppercase text-[10px] tracking-wider mb-1 font-medium">Nome</label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full bg-[#F5F1E8]/50 border border-[#D8CCBA] px-3 py-2.5 text-[#183D32]"
                />
              </div>

              <div>
                <label className="block text-[#72513E] uppercase text-[10px] tracking-wider mb-1 font-medium">E-mail Cadastrado</label>
                <input
                  type="email"
                  disabled
                  value={currentUser.email}
                  className="w-full bg-gray-100/60 border border-[#D8CCBA] px-3 py-2.5 text-[#72513E] cursor-not-allowed"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#72513E] uppercase text-[10px] tracking-wider mb-1 font-medium">CPF</label>
                  <input
                    type="text"
                    value={editCpf}
                    onChange={(e) => setEditCpf(e.target.value)}
                    className="w-full bg-[#F5F1E8]/50 border border-[#D8CCBA] px-3 py-2.5 text-[#183D32]"
                  />
                </div>
                <div>
                  <label className="block text-[#72513E] uppercase text-[10px] tracking-wider mb-1 font-medium">Telefone / Concierge</label>
                  <input
                    type="tel"
                    value={editPhone}
                    onChange={(e) => setEditPhone(e.target.value)}
                    className="w-full bg-[#F5F1E8]/50 border border-[#D8CCBA] px-3 py-2.5 text-[#183D32]"
                  />
                </div>
              </div>

              <div className="p-4 bg-[#F5F1E8] border border-[#D8CCBA] text-[11px] text-[#72513E] space-y-1">
                <span className="font-semibold text-[#183D32] block">Direitos LGPD Assegurados:</span>
                <p>Você pode solicitar a qualquer momento a exportação integral de seu histórico de pedidos ou a exclusão de seus dados pessoais através do canal oficial de privacidade.</p>
              </div>

              <button
                type="submit"
                className="px-8 py-3 bg-[#183D32] hover:bg-[#642B38] text-[#F5F1E8] text-xs uppercase tracking-wider font-medium cursor-pointer"
              >
                Salvar Alterações
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
