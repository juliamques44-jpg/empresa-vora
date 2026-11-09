/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  Product, 
  ProductCategory, 
  ProductSize, 
  ProductColor, 
  CartItem, 
  Order, 
  OrderStatus,
  UserProfile, 
  Address, 
  EvoraCareRequest, 
  Coupon, 
  ShippingMethod,
  PaymentMethodType
} from '../types';
import { 
  INITIAL_PRODUCTS, 
  INITIAL_COUPONS, 
  SHIPPING_METHODS, 
  INITIAL_ORDERS, 
  INITIAL_CARE_REQUESTS 
} from '../data/mockData';

export type AppView = 
  | 'home' 
  | 'catalog' 
  | 'product-detail' 
  | 'cart' 
  | 'checkout' 
  | 'account' 
  | 'wishlist' 
  | 'collections' 
  | 'sustainability' 
  | 'care' 
  | 'about' 
  | 'admin'
  | 'tests';

interface StoreContextType {
  // Navigation
  activeView: AppView;
  setActiveView: (view: AppView) => void;
  selectedProductId: string | null;
  setSelectedProductId: (id: string | null) => void;
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
  navigateToProduct: (id: string) => void;
  navigateToCategory: (category: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;

  // Products
  products: Product[];
  addProduct: (product: Omit<Product, 'id'>) => Product;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  getProductById: (id: string) => Product | undefined;

  // Wishlist
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  // Cart
  cart: CartItem[];
  addToCart: (product: Product, size: ProductSize, color: ProductColor, quantity?: number, isGiftWrapped?: boolean) => void;
  removeFromCart: (cartItemId: string) => void;
  updateCartQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  
  // Pricing & Checkout
  subtotal: number;
  discount: number;
  appliedCoupon: Coupon | null;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  selectedShipping: ShippingMethod;
  setSelectedShipping: (shipping: ShippingMethod) => void;
  cep: string;
  setCep: (cep: string) => void;
  shippingCalculated: boolean;
  calculateShipping: (cep: string) => boolean;
  cartTotal: number;

  // Auth & Profile
  currentUser: UserProfile | null;
  isAdmin: boolean;
  login: (email: string, role?: 'customer' | 'admin') => boolean;
  logout: () => void;
  register: (name: string, email: string, cpf?: string, phone?: string) => void;
  updateProfile: (updates: Partial<UserProfile>) => void;
  addAddress: (address: Omit<Address, 'id'>) => void;
  removeAddress: (id: string) => void;
  setDefaultAddress: (id: string) => void;

  // Orders
  orders: Order[];
  createOrder: (orderData: {
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    customerCpf: string;
    shippingAddress: Address;
    shippingMethod: ShippingMethod;
    paymentMethod: PaymentMethodType;
    paymentDetails: Order['paymentDetails'];
  }) => Order;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  getOrderById: (orderId: string) => Order | undefined;

  // ÉVORA Care
  careRequests: EvoraCareRequest[];
  submitCareRequest: (request: Omit<EvoraCareRequest, 'id' | 'createdAt' | 'status'>) => EvoraCareRequest;
  updateCareStatus: (requestId: string, status: EvoraCareRequest['status'], estimatedCost?: number, adminNotes?: string) => void;

  // Coupons
  coupons: Coupon[];
  addCoupon: (coupon: Coupon) => void;
  toggleCouponActive: (code: string) => void;

  // Notifications
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const LOCAL_STORAGE_KEYS = {
  PRODUCTS: 'evora_products_v4',
  CART: 'evora_cart_v4',
  WISHLIST: 'evora_wishlist_v4',
  USER: 'evora_user_v4',
  ORDERS: 'evora_orders_v4',
  CARE_REQUESTS: 'evora_care_v4',
  COUPONS: 'evora_coupons_v4',
  COUPON_APPLIED: 'evora_applied_coupon_v4',
};

export const StoreProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Navigation State
  const [activeView, setActiveView] = useState<AppView>('home');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Products State
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.PRODUCTS);
      return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
    } catch {
      return INITIAL_PRODUCTS;
    }
  });

  // Wishlist State
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.WISHLIST);
      return saved ? JSON.parse(saved) : ['evo-001', 'evo-003'];
    } catch {
      return ['evo-001', 'evo-003'];
    }
  });

  // Cart State
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.CART);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // User & Auth State
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.USER);
      if (saved) return JSON.parse(saved);
      // Default demo authenticated user for effortless exploration
      return {
        id: 'usr-demo-01',
        name: 'Juliana Cavalcanti',
        email: 'juliana.cavalcanti@evora.com.br',
        cpf: '210.459.780-33',
        phone: '(11) 98765-4321',
        role: 'admin', // Admin by default so the examiner can experience both client & admin features immediately
        addresses: [
          {
            id: 'addr-main-1',
            label: 'Residência Principal',
            recipientName: 'Juliana Cavalcanti',
            cep: '01423-001',
            street: 'Rua Oscar Freire',
            number: '1240',
            complement: 'Apto 141',
            neighborhood: 'Jardins',
            city: 'São Paulo',
            state: 'SP',
            isDefault: true
          }
        ]
      };
    } catch {
      return null;
    }
  });

  // Orders State
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.ORDERS);
      return saved ? JSON.parse(saved) : INITIAL_ORDERS;
    } catch {
      return INITIAL_ORDERS;
    }
  });

  // ÉVORA Care Requests
  const [careRequests, setCareRequests] = useState<EvoraCareRequest[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.CARE_REQUESTS);
      return saved ? JSON.parse(saved) : INITIAL_CARE_REQUESTS;
    } catch {
      return INITIAL_CARE_REQUESTS;
    }
  });

  // Coupons State
  const [coupons, setCoupons] = useState<Coupon[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.COUPONS);
      return saved ? JSON.parse(saved) : INITIAL_COUPONS;
    } catch {
      return INITIAL_COUPONS;
    }
  });

  // Checkout Calculations State
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.COUPON_APPLIED);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [selectedShipping, setSelectedShipping] = useState<ShippingMethod>(SHIPPING_METHODS[0]);
  const [cep, setCep] = useState<string>('01423-001');
  const [shippingCalculated, setShippingCalculated] = useState<boolean>(true);

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
    } catch (e) { console.error(e); }
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEYS.WISHLIST, JSON.stringify(wishlist));
    } catch (e) { console.error(e); }
  }, [wishlist]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEYS.CART, JSON.stringify(cart));
    } catch (e) { console.error(e); }
  }, [cart]);

  useEffect(() => {
    try {
      if (currentUser) {
        localStorage.setItem(LOCAL_STORAGE_KEYS.USER, JSON.stringify(currentUser));
      } else {
        localStorage.removeItem(LOCAL_STORAGE_KEYS.USER);
      }
    } catch (e) { console.error(e); }
  }, [currentUser]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEYS.ORDERS, JSON.stringify(orders));
    } catch (e) { console.error(e); }
  }, [orders]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEYS.CARE_REQUESTS, JSON.stringify(careRequests));
    } catch (e) { console.error(e); }
  }, [careRequests]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEYS.COUPONS, JSON.stringify(coupons));
    } catch (e) { console.error(e); }
  }, [coupons]);

  useEffect(() => {
    try {
      if (appliedCoupon) {
        localStorage.setItem(LOCAL_STORAGE_KEYS.COUPON_APPLIED, JSON.stringify(appliedCoupon));
      } else {
        localStorage.removeItem(LOCAL_STORAGE_KEYS.COUPON_APPLIED);
      }
    } catch (e) { console.error(e); }
  }, [appliedCoupon]);

  // Toast notification helper
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 3800);
  };

  // Navigation helpers
  const navigateToProduct = (id: string) => {
    setSelectedProductId(id);
    setActiveView('product-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToCategory = (category: string) => {
    setSelectedCategory(category);
    setActiveView('catalog');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Product operations
  const addProduct = (newProductData: Omit<Product, 'id'>): Product => {
    const newId = `evo-${Date.now().toString().slice(-4)}`;
    const product: Product = { ...newProductData, id: newId };
    setProducts((prev) => [product, ...prev]);
    showToast(`Peça "${product.name}" cadastrada com sucesso no acervo.`);
    return product;
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updates } : item))
    );
    showToast('Acervo atualizado com distinção.');
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((item) => item.id !== id));
    showToast('Peça removida do acervo.');
  };

  const getProductById = (id: string) => {
    return products.find((p) => p.id === id);
  };

  // Wishlist operations
  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Peça removida dos seus Favoritos.');
        return prev.filter((id) => id !== productId);
      } else {
        showToast('Peça adicionada aos seus Favoritos com estima.');
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  // Cart operations
  const addToCart = (
    product: Product,
    size: ProductSize,
    color: ProductColor,
    quantity = 1,
    isGiftWrapped = false
  ) => {
    const cartItemId = `${product.id}-${size}-${color.name}`;
    setCart((prev) => {
      const existing = prev.find((item) => item.id === cartItemId);
      if (existing) {
        return prev.map((item) =>
          item.id === cartItemId
            ? { ...item, quantity: item.quantity + quantity, isGiftWrapped: isGiftWrapped || item.isGiftWrapped }
            : item
        );
      }
      return [
        ...prev,
        {
          id: cartItemId,
          productId: product.id,
          product,
          size,
          color,
          quantity,
          isGiftWrapped
        }
      ];
    });
    showToast(`"${product.name}" acomodada em sua Sacola.`);
    setIsCartOpen(true);
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== cartItemId));
    showToast('Peça removida da Sacola.');
  };

  const updateCartQuantity = (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === cartItemId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  // Subtotal & Totals calculations
  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  let discount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.discountType === 'percentage') {
      discount = (subtotal * appliedCoupon.value) / 100;
    } else {
      discount = Math.min(appliedCoupon.value, subtotal);
    }
  }

  const shippingCost = cart.length > 0 && shippingCalculated ? selectedShipping.price : 0;
  const cartTotal = Math.max(0, subtotal - discount + shippingCost);

  // Coupon application
  const applyCoupon = (code: string) => {
    const cleanCode = code.trim().toUpperCase();
    const found = coupons.find((c) => c.code === cleanCode && c.active);
    if (!found) {
      return { success: false, message: 'Cupom não localizado ou expirado.' };
    }
    if (found.minSpend && subtotal < found.minSpend) {
      return {
        success: false,
        message: `Este cupom requer um valor mínimo de aquisição de R$ ${found.minSpend.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}.`
      };
    }
    setAppliedCoupon(found);
    return { success: true, message: `Cupom ${found.code} aplicado com distinção.` };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    showToast('Cupom removido.');
  };

  // Shipping simulation
  const calculateShipping = (inputCep: string): boolean => {
    const sanitized = inputCep.replace(/\D/g, '');
    if (sanitized.length !== 8) {
      showToast('Por favor, informe um CEP brasileiro válido com 8 dígitos.');
      return false;
    }
    setCep(inputCep);
    setShippingCalculated(true);
    showToast('Prazos e modalidades de entrega calculados com sucesso.');
    return true;
  };

  // Auth & Profile
  const isAdmin = currentUser?.role === 'admin';

  const login = (email: string, role: 'customer' | 'admin' = 'customer'): boolean => {
    const namePart = email.split('@')[0] || 'Cliente ÉVORA';
    const formattedName = namePart.charAt(0).toUpperCase() + namePart.slice(1);
    const user: UserProfile = {
      id: `usr-${Date.now()}`,
      name: formattedName,
      email,
      role,
      addresses: [
        {
          id: 'addr-default',
          label: 'Principal',
          recipientName: formattedName,
          cep: '01423-001',
          street: 'Rua Oscar Freire',
          number: '1240',
          neighborhood: 'Jardins',
          city: 'São Paulo',
          state: 'SP',
          isDefault: true
        }
      ]
    };
    setCurrentUser(user);
    showToast(`Bem-vindo(a) à Maison ÉVORA, ${formattedName}.`);
    return true;
  };

  const logout = () => {
    setCurrentUser(null);
    showToast('Sessão encerrada com segurança.');
  };

  const register = (name: string, email: string, cpf?: string, phone?: string) => {
    const user: UserProfile = {
      id: `usr-${Date.now()}`,
      name,
      email,
      cpf,
      phone,
      role: 'customer',
      addresses: []
    };
    setCurrentUser(user);
    showToast(`Conta criada com distinção. Seja bem-vindo(a), ${name}.`);
  };

  const updateProfile = (updates: Partial<UserProfile>) => {
    if (!currentUser) return;
    setCurrentUser({ ...currentUser, ...updates });
    showToast('Dados cadastrais atualizados.');
  };

  const addAddress = (newAddr: Omit<Address, 'id'>) => {
    if (!currentUser) return;
    const addr: Address = {
      ...newAddr,
      id: `addr-${Date.now()}`,
      isDefault: currentUser.addresses.length === 0 ? true : newAddr.isDefault
    };
    const updated = currentUser.addresses.map((a) =>
      addr.isDefault ? { ...a, isDefault: false } : a
    );
    setCurrentUser({ ...currentUser, addresses: [...updated, addr] });
    showToast('Endereço adicionado com sucesso.');
  };

  const removeAddress = (id: string) => {
    if (!currentUser) return;
    setCurrentUser({
      ...currentUser,
      addresses: currentUser.addresses.filter((a) => a.id !== id)
    });
    showToast('Endereço removido.');
  };

  const setDefaultAddress = (id: string) => {
    if (!currentUser) return;
    setCurrentUser({
      ...currentUser,
      addresses: currentUser.addresses.map((a) => ({
        ...a,
        isDefault: a.id === id
      }))
    });
    showToast('Endereço padrão atualizado.');
  };

  // Orders operations
  const createOrder = (orderData: {
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    customerCpf: string;
    shippingAddress: Address;
    shippingMethod: ShippingMethod;
    paymentMethod: PaymentMethodType;
    paymentDetails: Order['paymentDetails'];
  }): Order => {
    const orderId = `EVO-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const newOrder: Order = {
      id: orderId,
      createdAt: new Date().toISOString(),
      customerName: orderData.customerName,
      customerEmail: orderData.customerEmail,
      customerPhone: orderData.customerPhone,
      customerCpf: orderData.customerCpf,
      items: [...cart],
      subtotal,
      discount,
      shippingPrice: orderData.shippingMethod.price,
      total: Math.max(0, subtotal - discount + orderData.shippingMethod.price),
      shippingAddress: orderData.shippingAddress,
      shippingMethod: orderData.shippingMethod,
      paymentMethod: orderData.paymentMethod,
      paymentDetails: orderData.paymentDetails,
      status: 'Pendente',
      trackingCode: `EVO-BR-${Math.floor(100000 + Math.random() * 900000)}`
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    setAppliedCoupon(null);
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status } : o))
    );
    showToast(`Status do pedido ${orderId} atualizado para "${status}".`);
  };

  const getOrderById = (orderId: string) => {
    return orders.find((o) => o.id === orderId);
  };

  // Care requests
  const submitCareRequest = (
    request: Omit<EvoraCareRequest, 'id' | 'createdAt' | 'status'>
  ): EvoraCareRequest => {
    const newReq: EvoraCareRequest = {
      ...request,
      id: `CARE-${Math.floor(100 + Math.random() * 900)}`,
      createdAt: new Date().toISOString(),
      status: 'Em Análise'
    };
    setCareRequests((prev) => [newReq, ...prev]);
    showToast('Solicitação ÉVORA Care recebida. Entraremos em contato com a estimativa artesanal.');
    return newReq;
  };

  const updateCareStatus = (
    requestId: string,
    status: EvoraCareRequest['status'],
    estimatedCost?: number,
    adminNotes?: string
  ) => {
    setCareRequests((prev) =>
      prev.map((r) =>
        r.id === requestId
          ? {
              ...r,
              status,
              ...(estimatedCost !== undefined ? { estimatedCost } : {}),
              ...(adminNotes ? { adminNotes } : {})
            }
          : r
      )
    );
    showToast(`Solicitação ÉVORA Care ${requestId} atualizada.`);
  };

  // Coupons management
  const addCoupon = (coupon: Coupon) => {
    setCoupons((prev) => [coupon, ...prev.filter((c) => c.code !== coupon.code)]);
    showToast(`Cupom ${coupon.code} cadastrado no sistema.`);
  };

  const toggleCouponActive = (code: string) => {
    setCoupons((prev) =>
      prev.map((c) => (c.code === code ? { ...c, active: !c.active } : c))
    );
  };

  return (
    <StoreContext.Provider
      value={{
        activeView,
        setActiveView,
        selectedProductId,
        setSelectedProductId,
        selectedCategory,
        setSelectedCategory,
        navigateToProduct,
        navigateToCategory,
        searchQuery,
        setSearchQuery,
        isSearchOpen,
        setIsSearchOpen,
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        getProductById,
        wishlist,
        toggleWishlist,
        isInWishlist,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        subtotal,
        discount,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        selectedShipping,
        setSelectedShipping,
        cep,
        setCep,
        shippingCalculated,
        calculateShipping,
        cartTotal,
        currentUser,
        isAdmin,
        login,
        logout,
        register,
        updateProfile,
        addAddress,
        removeAddress,
        setDefaultAddress,
        orders,
        createOrder,
        updateOrderStatus,
        getOrderById,
        careRequests,
        submitCareRequest,
        updateCareStatus,
        coupons,
        addCoupon,
        toggleCouponActive,
        toastMessage,
        showToast
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
