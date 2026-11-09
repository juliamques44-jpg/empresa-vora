/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  BarChart3, 
  Package, 
  ShoppingBag, 
  Users, 
  Tag, 
  Scissors, 
  Plus, 
  Edit3, 
  Trash2, 
  Check, 
  X, 
  Search, 
  DollarSign, 
  TrendingUp, 
  ShieldAlert,
  ArrowUpRight,
  Filter
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { Product, ProductCategory, OrderStatus, EvoraCareRequest, Coupon } from '../../types';
import { EVORA_COLORS } from '../../data/mockData';

type AdminTab = 'overview' | 'products' | 'orders' | 'care' | 'coupons';

export const AdminDashboard: React.FC = () => {
  const { 
    currentUser, 
    isAdmin, 
    login, 
    products, 
    addProduct, 
    updateProduct, 
    deleteProduct, 
    orders, 
    updateOrderStatus, 
    careRequests, 
    updateCareStatus, 
    coupons, 
    addCoupon, 
    toggleCouponActive, 
    showToast 
  } = useStore();

  const [activeTab, setActiveTab] = useState<AdminTab>('overview');

  // Product modal state (Create / Edit)
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [prodName, setProdName] = useState('');
  const [prodSubtitle, setProdSubtitle] = useState('');
  const [prodCategory, setProdCategory] = useState<ProductCategory>('Alfaiataria');
  const [prodPrice, setProdPrice] = useState(2500);
  const [prodMaterial, setProdMaterial] = useState('Linho Puro');
  const [prodComposition, setProdComposition] = useState('100% Linho Europeu');
  const [prodIsLimited, setProdIsLimited] = useState(false);
  const [prodLimitedCount, setProdLimitedCount] = useState(30);
  const [prodImage, setProdImage] = useState('/src/assets/images/collection_tailoring_1794248334772.jpg');

  // Coupon modal state
  const [isCouponModalOpen, setIsCouponModalOpen] = useState(false);
  const [newCouponCode, setNewCouponCode] = useState('');
  const [newCouponType, setNewCouponType] = useState<'percentage' | 'fixed'>('percentage');
  const [newCouponValue, setNewCouponValue] = useState(10);
  const [newCouponDesc, setNewCouponDesc] = useState('');

  // If not admin, render authorization gate
  if (!isAdmin) {
    return (
      <div className="bg-[#F5F1E8] min-h-[80vh] py-16 flex items-center justify-center px-4">
        <div className="bg-white/80 border border-[#D8CCBA] max-w-md w-full p-8 shadow-sm text-center space-y-6">
          <div className="w-12 h-12 rounded-full bg-[#183D32] text-[#F5F1E8] flex items-center justify-center mx-auto">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div>
            <h2 className="font-serif text-2xl text-[#183D32]">Acesso Administrativo Restrito</h2>
            <p className="text-xs text-[#72513E] font-light mt-1">
              Esta área é reservada para a direção da Maison ÉVORA e gestores de ateliê.
            </p>
          </div>
          <button
            onClick={() => login('admin@evora.com.br', 'admin')}
            className="w-full bg-[#183D32] hover:bg-[#642B38] text-[#F5F1E8] py-3 text-xs uppercase tracking-widest font-semibold transition-colors cursor-pointer"
          >
            Autenticar como Gestor da Maison (1-Clique)
          </button>
        </div>
      </div>
    );
  }

  // Calculated KPIs
  const totalRevenue = orders.reduce((acc, o) => acc + o.total, 0);
  const totalOrders = orders.length;
  const averageTicket = totalOrders > 0 ? totalRevenue / totalOrders : 0;
  const pendingCareCount = careRequests.filter((r) => r.status === 'Em Análise').length;

  const handleOpenAddProduct = () => {
    setEditingProductId(null);
    setProdName('');
    setProdSubtitle('');
    setProdCategory('Alfaiataria');
    setProdPrice(2890);
    setProdMaterial('Linho Puro Certificado');
    setProdComposition('100% Linho Europeu com certificação sustentável');
    setProdIsLimited(false);
    setProdLimitedCount(25);
    setProdImage('/src/assets/images/collection_tailoring_1794248334772.jpg');
    setIsProductModalOpen(true);
  };

  const handleOpenEditProduct = (p: Product) => {
    setEditingProductId(p.id);
    setProdName(p.name);
    setProdSubtitle(p.subtitle);
    setProdCategory(p.category);
    setProdPrice(p.price);
    setProdMaterial(p.materialType);
    setProdComposition(p.composition);
    setProdIsLimited(p.isLimitedEdition);
    setProdLimitedCount(p.limitedEditionCount || 30);
    setProdImage(p.images[0]);
    setIsProductModalOpen(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProductId) {
      updateProduct(editingProductId, {
        name: prodName,
        subtitle: prodSubtitle,
        category: prodCategory,
        price: Number(prodPrice),
        materialType: prodMaterial,
        composition: prodComposition,
        isLimitedEdition: prodIsLimited,
        limitedEditionCount: prodLimitedCount,
        images: [prodImage, prodImage]
      });
    } else {
      addProduct({
        name: prodName,
        subtitle: prodSubtitle,
        category: prodCategory,
        price: Number(prodPrice),
        installments: 6,
        images: [prodImage, prodImage],
        colors: [
          { name: 'Verde Évora', hex: EVORA_COLORS.green },
          { name: 'Off-White Natural', hex: EVORA_COLORS.offwhite },
          { name: 'Bege Areia', hex: EVORA_COLORS.beige }
        ],
        sizes: ['PP', 'P', 'M', 'G', 'Sob Medida'],
        stockBySize: { 'PP': 2, 'P': 4, 'M': 4, 'G': 2, 'Sob Medida': 10 },
        isLimitedEdition: prodIsLimited,
        limitedEditionCount: prodLimitedCount,
        limitedEditionRemaining: prodLimitedCount,
        availability: 'Pronta Entrega',
        materialType: prodMaterial,
        composition: prodComposition,
        certifications: ['GOTS Organic', 'Maison Certificada'],
        productionDetails: 'Confeccionado artesanalmente no ateliê paulista da Maison ÉVORA.',
        story: {
          inspiration: 'Nova criação arquitetônica inspirada nas formas fluidas da natureza.',
          craftProcess: 'Mais de 30 horas de montagem artesanal com pontos manuais.',
          careInstructions: ['Lavagem ecológica a seco.', 'Armazenar em cabide de madeira.'],
          traceability: 'Fibras rastreáveis auditadas por lote.'
        }
      });
    }
    setIsProductModalOpen(false);
  };

  const handleCreateCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCouponCode) return;
    addCoupon({
      code: newCouponCode.trim().toUpperCase(),
      discountType: newCouponType,
      value: Number(newCouponValue),
      minSpend: 1500,
      active: true,
      description: newCouponDesc || `${newCouponValue}${newCouponType === 'percentage' ? '%' : ' BRL'} de cortesia`
    });
    setNewCouponCode('');
    setNewCouponDesc('');
    setIsCouponModalOpen(false);
  };

  return (
    <div className="bg-[#F5F1E8] min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Admin Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-6 border-b border-[#D8CCBA]/60 gap-4">
          <div>
            <div className="flex items-center gap-2 text-[10px] tracking-[0.25em] uppercase text-[#72513E] mb-1 font-light">
              <span>Maison ÉVORA</span>
              <span>/</span>
              <span>Diretoria & Ateliê</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl text-[#183D32] font-light">
              Painel de Gestão da Maison
            </h1>
            <p className="text-xs text-[#72513E] font-light mt-1">
              Controle de pedidos, catálogo de alta costura, solicitações de cuidados e métricas financeiras.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase tracking-wider text-[#183D32] bg-white border border-[#D8CCBA] px-3 py-1 font-medium">
              Gestor: {currentUser?.name} (Admin)
            </span>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 overflow-x-auto pb-2 border-b border-[#D8CCBA]/50">
          {[
            { id: 'overview', label: 'Visão Geral & KPIs', icon: <BarChart3 className="w-4 h-4" /> },
            { id: 'products', label: `Acervo de Peças (${products.length})`, icon: <Package className="w-4 h-4" /> },
            { id: 'orders', label: `Pedidos da Maison (${orders.length})`, icon: <ShoppingBag className="w-4 h-4" /> },
            { id: 'care', label: `ÉVORA Care (${careRequests.length})`, icon: <Scissors className="w-4 h-4" /> },
            { id: 'coupons', label: `Cupons de Cortesia (${coupons.length})`, icon: <Tag className="w-4 h-4" /> },
          ].map((tab) => {
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as AdminTab)}
                className={`px-4 py-2 text-xs uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer border whitespace-nowrap ${
                  isSelected
                    ? 'bg-[#183D32] text-[#F5F1E8] border-[#183D32] font-medium'
                    : 'bg-white/40 text-[#183D32] border-[#D8CCBA] hover:border-[#183D32]'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab: Overview & KPIs */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-6 bg-white border border-[#D8CCBA] space-y-1">
                <span className="text-[10px] uppercase tracking-widest text-[#72513E] block font-medium">Faturamento Total</span>
                <span className="font-serif text-3xl font-light text-[#183D32] tabular-nums">
                  R$ {totalRevenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </span>
                <span className="text-[10px] text-[#183D32] block font-light">Volume real acumulado</span>
              </div>

              <div className="p-6 bg-white border border-[#D8CCBA] space-y-1">
                <span className="text-[10px] uppercase tracking-widest text-[#72513E] block font-medium">Pedidos Realizados</span>
                <span className="font-serif text-3xl font-light text-[#183D32] tabular-nums">
                  {totalOrders}
                </span>
                <span className="text-[10px] text-[#72513E] block font-light">Todas as linhagens</span>
              </div>

              <div className="p-6 bg-white border border-[#D8CCBA] space-y-1">
                <span className="text-[10px] uppercase tracking-widest text-[#72513E] block font-medium">Ticket Médio</span>
                <span className="font-serif text-3xl font-light text-[#183D32] tabular-nums">
                  R$ {averageTicket.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </span>
                <span className="text-[10px] text-[#183D32] block font-light">Padrão alta costura</span>
              </div>

              <div className="p-6 bg-white border border-[#D8CCBA] space-y-1">
                <span className="text-[10px] uppercase tracking-widest text-[#72513E] block font-medium">ÉVORA Care Pendente</span>
                <span className="font-serif text-3xl font-light text-[#642B38] tabular-nums">
                  {pendingCareCount}
                </span>
                <span className="text-[10px] text-[#72513E] block font-light">Aguardando orçamento</span>
              </div>
            </div>

            {/* Sales Performance by Category */}
            <div className="bg-white/80 border border-[#D8CCBA] p-6 space-y-4">
              <h3 className="font-serif text-xl text-[#183D32]">Desempenho por Categoria de Alta Moda</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead>
                    <tr className="border-b border-[#183D32] text-[#183D32] uppercase tracking-wider text-[10px]">
                      <th className="py-2.5">Categoria</th>
                      <th className="py-2.5">Peças Ativas</th>
                      <th className="py-2.5">Preço Médio</th>
                      <th className="py-2.5">Status de Produção</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#D8CCBA]/50 text-[#183D32]">
                    {['Alfaiataria', 'Vestidos', 'Peças Esculturais', 'Acessórios', 'Essenciais Atemporais'].map((cat) => {
                      const catProducts = products.filter((p) => p.category === cat);
                      const avgPrice = catProducts.length > 0 
                        ? catProducts.reduce((acc, p) => acc + p.price, 0) / catProducts.length 
                        : 0;

                      return (
                        <tr key={cat} className="hover:bg-white/60">
                          <td className="py-3 font-semibold">{cat}</td>
                          <td className="py-3 tabular-nums">{catProducts.length} peças</td>
                          <td className="py-3 tabular-nums">R$ {avgPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                          <td className="py-3">
                            <span className="text-[10px] text-[#183D32] bg-[#F5F1E8] px-2 py-0.5 border border-[#D8CCBA]">
                              Ateliê Ativo
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Tab: Products Management */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-serif text-2xl text-[#183D32]">Gestão do Acervo</h3>
                <p className="text-xs text-[#72513E] font-light">Cadastro, ajuste de preços, disponibilidade e imagens.</p>
              </div>
              <button
                onClick={handleOpenAddProduct}
                className="px-4 py-2.5 bg-[#183D32] text-[#F5F1E8] text-xs uppercase tracking-wider flex items-center gap-1.5 cursor-pointer hover:bg-[#642B38]"
              >
                <Plus className="w-4 h-4" />
                <span>Nova Criação</span>
              </button>
            </div>

            <div className="bg-white border border-[#D8CCBA] overflow-x-auto shadow-sm">
              <table className="w-full text-xs text-left">
                <thead>
                  <tr className="border-b border-[#183D32] text-[#183D32] uppercase tracking-wider text-[10px] bg-[#F5F1E8]/50">
                    <th className="p-3">Imagem</th>
                    <th className="p-3">Nome / Subtítulo</th>
                    <th className="p-3">Categoria</th>
                    <th className="p-3">Preço</th>
                    <th className="p-3">Edição</th>
                    <th className="p-3">Disponibilidade</th>
                    <th className="p-3 text-right">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#D8CCBA]/50 text-[#183D32]">
                  {products.map((p) => (
                    <tr key={p.id} className="hover:bg-[#F5F1E8]/40">
                      <td className="p-3">
                        <img src={p.images[0]} alt={p.name} className="w-12 h-16 object-cover border border-[#D8CCBA]" />
                      </td>
                      <td className="p-3">
                        <strong className="font-serif text-sm block">{p.name}</strong>
                        <span className="text-[11px] text-[#72513E] font-light line-clamp-1">{p.materialType}</span>
                      </td>
                      <td className="p-3">{p.category}</td>
                      <td className="p-3 font-semibold tabular-nums">
                        R$ {p.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </td>
                      <td className="p-3">
                        {p.isLimitedEdition ? (
                          <span className="text-[10px] px-2 py-0.5 bg-[#183D32] text-[#F5F1E8]">
                            Limitada ({p.limitedEditionRemaining}/{p.limitedEditionCount})
                          </span>
                        ) : (
                          <span className="text-[#72513E] text-[11px]">Contínua</span>
                        )}
                      </td>
                      <td className="p-3 text-[11px] text-[#72513E]">{p.availability}</td>
                      <td className="p-3 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleOpenEditProduct(p)}
                            className="p-1.5 hover:text-[#183D32] text-[#72513E] cursor-pointer"
                            title="Editar criação"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => deleteProduct(p.id)}
                            className="p-1.5 hover:text-[#642B38] text-[#72513E] cursor-pointer"
                            title="Excluir criação"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab: Orders Management */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            <div>
              <h3 className="font-serif text-2xl text-[#183D32]">Pedidos e Ateliê</h3>
              <p className="text-xs text-[#72513E] font-light">Atualize o status dos pedidos para refletir no rastreamento do cliente.</p>
            </div>

            <div className="space-y-4">
              {orders.map((ord) => (
                <div key={ord.id} className="p-6 bg-white border border-[#D8CCBA] space-y-4 text-xs text-[#183D32]">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#D8CCBA]/50 gap-2">
                    <div>
                      <strong className="font-serif text-base text-[#183D32]">{ord.id}</strong>
                      <span className="text-[#72513E] ml-2 font-light">
                        {ord.customerName} · {ord.customerEmail} · Tel: {ord.customerPhone}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] uppercase text-[#72513E]">Status Atual:</span>
                      <select
                        value={ord.status}
                        onChange={(e) => updateOrderStatus(ord.id, e.target.value as OrderStatus)}
                        className="bg-[#F5F1E8] border border-[#D8CCBA] px-3 py-1 font-medium text-[#183D32] cursor-pointer text-xs"
                      >
                        <option value="Pendente">Pendente</option>
                        <option value="Em Produção Artesanal">Em Produção Artesanal</option>
                        <option value="Controle de Qualidade">Controle de Qualidade</option>
                        <option value="Enviado">Enviado</option>
                        <option value="Entregue">Entregue</option>
                        <option value="Cancelado">Cancelado</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <span className="text-[10px] uppercase text-[#72513E] block mb-1">Itens do Pedido:</span>
                      <ul className="space-y-1 font-light">
                        {ord.items.map((it) => (
                          <li key={it.id}>
                            {it.quantity}x {it.product.name} (Tam: {it.size}, Cor: {it.color.name})
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-1">
                      <div>
                        <strong>Total: </strong>
                        <span className="tabular-nums font-semibold">R$ {ord.total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                      </div>
                      <div>
                        <strong>Pagamento: </strong>
                        <span className="uppercase">{ord.paymentMethod}</span>
                      </div>
                      <div>
                        <strong>Rastreio: </strong>
                        <span className="font-mono text-[#72513E]">{ord.trackingCode}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab: ÉVORA Care Requests */}
        {activeTab === 'care' && (
          <div className="space-y-6">
            <div>
              <h3 className="font-serif text-2xl text-[#183D32]">Solicitações ÉVORA Care</h3>
              <p className="text-xs text-[#72513E] font-light">Avaliação de peças de clientes para ajustes, reformas artesanais e upcycling.</p>
            </div>

            <div className="space-y-4">
              {careRequests.map((req) => (
                <div key={req.id} className="p-6 bg-white border border-[#D8CCBA] space-y-4 text-xs text-[#183D32]">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#D8CCBA]/50 gap-2">
                    <div>
                      <strong className="font-serif text-base text-[#183D32]">{req.id} - {req.serviceType}</strong>
                      <span className="text-[#72513E] ml-2 font-light">
                        {req.customerName} ({req.customerEmail})
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <select
                        value={req.status}
                        onChange={(e) => updateCareStatus(req.id, e.target.value as any)}
                        className="bg-[#F5F1E8] border border-[#D8CCBA] px-3 py-1 font-medium text-[#183D32] cursor-pointer text-xs"
                      >
                        <option value="Em Análise">Em Análise</option>
                        <option value="Orçamento Pronto">Orçamento Pronto</option>
                        <option value="Aprovado">Aprovado</option>
                        <option value="Concluído">Concluído</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                    <div className="md:col-span-8 space-y-2">
                      <p className="font-light leading-relaxed">
                        <strong>Descrição da Peça:</strong> {req.pieceDescription}
                      </p>
                      {req.estimatedCost && (
                        <div className="text-xs text-[#183D32] font-semibold">
                          Estimativa Lançada: R$ {req.estimatedCost.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </div>
                      )}
                      {req.adminNotes && (
                        <p className="text-[11px] text-[#72513E] italic">
                          Nota do Ateliê: {req.adminNotes}
                        </p>
                      )}
                    </div>

                    {req.photoUrl && (
                      <div className="md:col-span-4">
                        <span className="text-[10px] text-[#72513E] uppercase block mb-1">Foto Enviada:</span>
                        <img src={req.photoUrl} alt="Foto da peça" className="w-24 h-28 object-cover border border-[#D8CCBA]" />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab: Coupons Management */}
        {activeTab === 'coupons' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-serif text-2xl text-[#183D32]">Cupons de Cortesia</h3>
                <p className="text-xs text-[#72513E] font-light">Cadastre novos cupons ou ative/desative benefícios vigentes.</p>
              </div>
              <button
                onClick={() => setIsCouponModalOpen(true)}
                className="px-4 py-2.5 bg-[#183D32] text-[#F5F1E8] text-xs uppercase tracking-wider flex items-center gap-1.5 cursor-pointer hover:bg-[#642B38]"
              >
                <Plus className="w-4 h-4" />
                <span>Novo Cupom</span>
              </button>
            </div>

            <div className="bg-white border border-[#D8CCBA] overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead>
                  <tr className="border-b border-[#183D32] text-[#183D32] uppercase tracking-wider text-[10px] bg-[#F5F1E8]/50">
                    <th className="p-3">Código</th>
                    <th className="p-3">Benefício</th>
                    <th className="p-3">Descrição</th>
                    <th className="p-3">Gasto Mínimo</th>
                    <th className="p-3">Status</th>
                    <th className="p-3 text-right">Ação</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#D8CCBA]/50 text-[#183D32]">
                  {coupons.map((c) => (
                    <tr key={c.code} className="hover:bg-[#F5F1E8]/40">
                      <td className="p-3 font-mono font-bold text-[#183D32]">{c.code}</td>
                      <td className="p-3 font-semibold">
                        {c.discountType === 'percentage' ? `${c.value}% OFF` : `R$ ${c.value},00 OFF`}
                      </td>
                      <td className="p-3 font-light text-[#72513E]">{c.description}</td>
                      <td className="p-3 tabular-nums">
                        {c.minSpend ? `R$ ${c.minSpend.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` : 'Sem mínimo'}
                      </td>
                      <td className="p-3">
                        <span className={`text-[10px] px-2 py-0.5 ${c.active ? 'bg-[#183D32] text-[#F5F1E8]' : 'bg-[#D8CCBA] text-[#72513E]'}`}>
                          {c.active ? 'Ativo' : 'Inativo'}
                        </span>
                      </td>
                      <td className="p-3 text-right">
                        <button
                          onClick={() => toggleCouponActive(c.code)}
                          className="text-xs text-[#183D32] underline hover:text-[#642B38] cursor-pointer"
                        >
                          {c.active ? 'Desativar' : 'Ativar'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Product Modal (Create / Edit) */}
      {isProductModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#183D32]/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#F5F1E8] border border-[#D8CCBA] max-w-xl w-full p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center pb-4 border-b border-[#D8CCBA] mb-4">
              <h3 className="font-serif text-2xl text-[#183D32]">
                {editingProductId ? 'Editar Criação' : 'Cadastrar Nova Peça no Acervo'}
              </h3>
              <button onClick={() => setIsProductModalOpen(false)} className="p-1 text-[#183D32]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4 text-xs text-[#183D32]">
              <div>
                <label className="block text-[#72513E] uppercase text-[10px] mb-1 font-medium">Nome da Peça</label>
                <input
                  type="text"
                  value={prodName}
                  onChange={(e) => setProdName(e.target.value)}
                  required
                  className="w-full bg-white border border-[#D8CCBA] px-3 py-2 text-sm"
                />
              </div>

              <div>
                <label className="block text-[#72513E] uppercase text-[10px] mb-1 font-medium">Subtítulo / Modelagem</label>
                <input
                  type="text"
                  value={prodSubtitle}
                  onChange={(e) => setProdSubtitle(e.target.value)}
                  required
                  className="w-full bg-white border border-[#D8CCBA] px-3 py-2"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#72513E] uppercase text-[10px] mb-1 font-medium">Categoria</label>
                  <select
                    value={prodCategory}
                    onChange={(e) => setProdCategory(e.target.value as any)}
                    className="w-full bg-white border border-[#D8CCBA] px-3 py-2"
                  >
                    <option value="Alfaiataria">Alfaiataria</option>
                    <option value="Vestidos">Vestidos</option>
                    <option value="Peças Esculturais">Peças Esculturais</option>
                    <option value="Essenciais Atemporais">Essenciais Atemporais</option>
                    <option value="Acessórios">Acessórios</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[#72513E] uppercase text-[10px] mb-1 font-medium">Preço (R$)</label>
                  <input
                    type="number"
                    value={prodPrice}
                    onChange={(e) => setProdPrice(Number(e.target.value))}
                    required
                    className="w-full bg-white border border-[#D8CCBA] px-3 py-2"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#72513E] uppercase text-[10px] mb-1 font-medium">Tipo de Material</label>
                  <input
                    type="text"
                    value={prodMaterial}
                    onChange={(e) => setProdMaterial(e.target.value)}
                    required
                    className="w-full bg-white border border-[#D8CCBA] px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-[#72513E] uppercase text-[10px] mb-1 font-medium">Composição Textil</label>
                  <input
                    type="text"
                    value={prodComposition}
                    onChange={(e) => setProdComposition(e.target.value)}
                    required
                    className="w-full bg-white border border-[#D8CCBA] px-3 py-2"
                  />
                </div>
              </div>

              <div className="pt-2 flex items-center gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={prodIsLimited}
                    onChange={(e) => setProdIsLimited(e.target.checked)}
                    className="accent-[#183D32]"
                  />
                  <span>É Edição Limitada Numerada?</span>
                </label>
                {prodIsLimited && (
                  <input
                    type="number"
                    value={prodLimitedCount}
                    onChange={(e) => setProdLimitedCount(Number(e.target.value))}
                    placeholder="Qtd Máxima"
                    className="w-24 bg-white border border-[#D8CCBA] px-2 py-1"
                  />
                )}
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-[#D8CCBA]">
                <button
                  type="button"
                  onClick={() => setIsProductModalOpen(false)}
                  className="px-4 py-2 border border-[#D8CCBA] text-xs uppercase"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#183D32] text-[#F5F1E8] text-xs uppercase tracking-wider font-medium"
                >
                  Salvar Criação
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Coupon Modal */}
      {isCouponModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#183D32]/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#F5F1E8] border border-[#D8CCBA] max-w-md w-full p-6 shadow-2xl">
            <div className="flex justify-between items-center pb-3 border-b border-[#D8CCBA] mb-4">
              <h3 className="font-serif text-xl text-[#183D32]">Novo Cupom de Cortesia</h3>
              <button onClick={() => setIsCouponModalOpen(false)} className="p-1 text-[#183D32]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateCoupon} className="space-y-4 text-xs text-[#183D32]">
              <div>
                <label className="block text-[#72513E] uppercase text-[10px] mb-1 font-medium">Código do Cupom</label>
                <input
                  type="text"
                  value={newCouponCode}
                  onChange={(e) => setNewCouponCode(e.target.value)}
                  placeholder="EX: MAISON20"
                  required
                  className="w-full bg-white border border-[#D8CCBA] px-3 py-2 uppercase font-mono"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#72513E] uppercase text-[10px] mb-1 font-medium">Tipo</label>
                  <select
                    value={newCouponType}
                    onChange={(e) => setNewCouponType(e.target.value as any)}
                    className="w-full bg-white border border-[#D8CCBA] px-3 py-2"
                  >
                    <option value="percentage">Porcentagem (%)</option>
                    <option value="fixed">Valor Fixo (R$)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[#72513E] uppercase text-[10px] mb-1 font-medium">Valor do Desconto</label>
                  <input
                    type="number"
                    value={newCouponValue}
                    onChange={(e) => setNewCouponValue(Number(e.target.value))}
                    required
                    className="w-full bg-white border border-[#D8CCBA] px-3 py-2"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#72513E] uppercase text-[10px] mb-1 font-medium">Descrição</label>
                <input
                  type="text"
                  value={newCouponDesc}
                  onChange={(e) => setNewCouponDesc(e.target.value)}
                  placeholder="Ex: 20% de cortesia para membros VIP"
                  className="w-full bg-white border border-[#D8CCBA] px-3 py-2"
                />
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-[#D8CCBA]">
                <button
                  type="button"
                  onClick={() => setIsCouponModalOpen(false)}
                  className="px-4 py-2 border border-[#D8CCBA] text-xs uppercase"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#183D32] text-[#F5F1E8] text-xs uppercase tracking-wider font-medium"
                >
                  Criar Cupom
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
