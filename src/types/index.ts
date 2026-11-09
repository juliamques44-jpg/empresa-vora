/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type ProductCategory = 
  | 'Alfaiataria'
  | 'Vestidos'
  | 'Peças Esculturais'
  | 'Essenciais Atemporais'
  | 'Edições Limitadas'
  | 'Acessórios';

export type ProductSize = 'PP' | 'P' | 'M' | 'G' | 'GG' | 'Sob Medida';

export type ProductColorName = 
  | 'Off-White Natural'
  | 'Verde Évora'
  | 'Vinho Imperial'
  | 'Marrom Terracota'
  | 'Bege Areia';

export interface ProductColor {
  name: ProductColorName;
  hex: string;
}

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  category: ProductCategory;
  price: number;
  installments: number; // e.g. 6x sem juros
  images: string[];
  secondaryImage?: string;
  colors: ProductColor[];
  sizes: ProductSize[];
  stockBySize: Record<string, number>;
  isLimitedEdition: boolean;
  limitedEditionCount?: number;
  limitedEditionRemaining?: number;
  availability: 'Pronta Entrega' | 'Produção Sob Demanda (7 a 10 dias)' | 'Últimas Peças';
  materialType: string;
  composition: string;
  certifications: string[];
  productionDetails: string;
  story: {
    inspiration: string;
    craftProcess: string;
    careInstructions: string[];
    traceability: string;
  };
  featured?: boolean;
}

export interface CartItem {
  id: string;
  productId: string;
  product: Product;
  size: ProductSize;
  color: ProductColor;
  quantity: number;
  isGiftWrapped?: boolean;
}

export interface ShippingMethod {
  id: string;
  name: string;
  carrier: string;
  price: number;
  estimatedDays: string;
  description: string;
  ecoFriendly: boolean;
}

export interface Coupon {
  code: string;
  discountType: 'percentage' | 'fixed';
  value: number; // percentage (e.g. 10 for 10%) or fixed BRL (e.g. 300)
  minSpend?: number;
  active: boolean;
  description: string;
}

export interface Address {
  id: string;
  label: string; // e.g. "Residência", "Ateliê"
  recipientName: string;
  cep: string;
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  isDefault?: boolean;
}

export type OrderStatus = 
  | 'Pendente'
  | 'Em Produção Artesanal'
  | 'Controle de Qualidade'
  | 'Enviado'
  | 'Entregue'
  | 'Cancelado';

export type PaymentMethodType = 'pix' | 'credit_card' | 'boleto';

export interface Order {
  id: string;
  createdAt: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerCpf: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shippingPrice: number;
  total: number;
  shippingAddress: Address;
  shippingMethod: ShippingMethod;
  paymentMethod: PaymentMethodType;
  paymentDetails: {
    brand?: string;
    lastDigits?: string;
    installments?: number;
    pixCode?: string;
    boletoCode?: string;
  };
  status: OrderStatus;
  trackingCode?: string;
  notes?: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  cpf?: string;
  phone?: string;
  addresses: Address[];
  role: 'customer' | 'admin';
}

export interface EvoraCareRequest {
  id: string;
  createdAt: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  serviceType: 'Ajuste de Alfaiataria' | 'Reparo Artesanal' | 'Upcycling e Transformação' | 'Conservação Preventiva';
  pieceDescription: string;
  photoUrl?: string;
  photoName?: string;
  status: 'Em Análise' | 'Orçamento Pronto' | 'Aprovado' | 'Concluído';
  estimatedCost?: number;
  adminNotes?: string;
}
