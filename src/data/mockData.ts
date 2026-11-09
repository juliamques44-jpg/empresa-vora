/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Product, Coupon, EvoraCareRequest, Order, ShippingMethod } from '../types';

export const EVORA_COLORS = {
  green: '#183D32',      // Verde Escuro ÉVORA
  offwhite: '#F5F1E8',   // Off-White Natural
  wine: '#642B38',       // Vinho Imperial
  brown: '#72513E',      // Marrom Terracota
  beige: '#D8CCBA',      // Bege Complementar
} as const;

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'evo-001',
    name: 'Vestido Escultural Um Ombro Verde Évora',
    subtitle: 'Silhueta helenística em moulage manual com drapeado fluido, capa lateral e broche escultural dourado',
    category: 'Vestidos',
    price: 4890.00,
    installments: 6,
    images: [
      '/assets/products/vestido_verde_escultural.jpg',
      '/assets/products/m1_verde_detail.jpg',
      '/assets/aistudio/Ateli___vora__Eleg_ncia_Atemporal_27e02109.png'
    ],
    secondaryImage: '/assets/products/m1_verde_detail.jpg',
    colors: [
      { name: 'Verde Évora', hex: EVORA_COLORS.green },
      { name: 'Off-White Natural', hex: EVORA_COLORS.offwhite },
      { name: 'Vinho Imperial', hex: EVORA_COLORS.wine }
    ],
    sizes: ['PP', 'P', 'M', 'G', 'Sob Medida'],
    stockBySize: { 'PP': 2, 'P': 4, 'M': 3, 'G': 2, 'Sob Medida': 10 },
    isLimitedEdition: true,
    limitedEditionCount: 25,
    limitedEditionRemaining: 6,
    availability: 'Produção Sob Demanda (7 a 10 dias)',
    materialType: 'Seda Orgânica Brasileira GOTS & Liocel TENCEL™ Luxe',
    composition: '75% Liocel TENCEL™ Luxe botânico em circuito fechado, 25% Seda pura de manejo agroecológico.',
    certifications: ['GOTS Global Organic Textile', 'Cradle to Cradle Certified® Gold', 'Lenzing Closed Loop'],
    productionDetails: 'Esculpido individualmente sobre manequim de costura no ateliê ÉVORA. Fivela e acabamentos em latão banhado a ouro fosco artesanal.',
    story: {
      inspiration: 'Inspirado na estatuária da Grécia Antiga e na fluidez do vento sobre a copa das oliveiras. Uma peça que une imponência arquitetônica e caimento etéreo.',
      craftProcess: 'Mais de 38 horas de moulage manual. Cada dobra do drapeado assimétrico é fixada com pontos invisíveis à mão, garantindo que o tecido desenhe o corpo com leveza suprema.',
      careInstructions: [
        'Lavagem ecológica especializada a seco (GreenEarth).',
        'Guardar pendurado pelas alças internas de seda crua na capa protetora de linho ÉVORA.',
        'Vaporizar à distância mínima de 20 cm para reavivar o brilho sedoso da fibra vegetal.'
      ],
      traceability: 'Seda colhida em cooperativa regenerativa no Paraná; liocel de florestas sustentáveis austríacas com certificação FSC.'
    },
    featured: true
  },
  {
    id: 'evo-002',
    name: 'Terno Arquitetônico Monocromático Off-White',
    subtitle: 'Blazer acinturado de corte diagonal com lapelas imponentes e calça pantalona de pregas fluidas',
    category: 'Alfaiataria',
    price: 4250.00,
    installments: 6,
    images: [
      '/assets/products/terno_offwhite_alfaiataria.jpg',
      '/assets/products/m2_offwhite_detail.jpg',
      '/assets/aistudio/Ateli___vora__Eleg_ncia_Atemporal_27e02109.png'
    ],
    secondaryImage: '/assets/products/m2_offwhite_detail.jpg',
    colors: [
      { name: 'Off-White Natural', hex: EVORA_COLORS.offwhite },
      { name: 'Verde Évora', hex: EVORA_COLORS.green },
      { name: 'Bege Areia', hex: EVORA_COLORS.beige }
    ],
    sizes: ['PP', 'P', 'M', 'G', 'GG', 'Sob Medida'],
    stockBySize: { 'PP': 3, 'P': 5, 'M': 4, 'G': 2, 'GG': 1, 'Sob Medida': 8 },
    isLimitedEdition: false,
    availability: 'Pronta Entrega',
    materialType: 'Lã Fria Rastreável ZQ & Linho Puro Europeu',
    composition: '70% Lã Fria Rastreável com protocolo de bem-estar animal ZQ, 30% Linho Francês Masters of Linen®.',
    certifications: ['ZQ Merino Certified', 'Masters of Linen®', 'OEKO-TEX Standard 100'],
    productionDetails: 'Alfaiataria desconstruída sem ombreiras sintéticas; estruturação com entretela natural de crina de cavalo e botão esculpido em corozo vegetal.',
    story: {
      inspiration: 'O rigor da alta alfaiataria britânica reinterpretado com a descontração e a luz natural dos ateliês contemporâneos. Uma silhueta que confere autoridade com extrema serenidade.',
      craftProcess: 'Desenvolvido por mestres alfaiates em São Paulo com costuras internas embutidas e bainhas com margem generosa de 6 cm para permitir futuros ajustes de vida.',
      careInstructions: [
        'Higienização ecológica a seco estritamente sem percloroetileno.',
        'Descansar em cabide anatômico de cedro entre os usos.',
        'Arejar em ambiente ventilado e protegido da luz solar direta.'
      ],
      traceability: 'Lã virgem gaúcha rastreada por fazenda parceira; linho colhido na Normandia sem irrigação artificial.'
    },
    featured: true
  },
  {
    id: 'evo-003',
    name: 'Vestido Coluna Tomara-que-Caia Vinho Imperial',
    subtitle: 'Corpete estruturado com drapeado plissado diagonal, capa esvoaçante lateral e fenda escultural',
    category: 'Vestidos',
    price: 5400.00,
    installments: 6,
    images: [
      '/assets/products/vestido_vinho_strapless.jpg',
      '/assets/products/m3_vinho_detail.jpg',
      '/assets/aistudio/Ateli___vora__Eleg_ncia_Atemporal_27e02109.png'
    ],
    secondaryImage: '/assets/products/m3_vinho_detail.jpg',
    colors: [
      { name: 'Vinho Imperial', hex: EVORA_COLORS.wine },
      { name: 'Verde Évora', hex: EVORA_COLORS.green },
      { name: 'Off-White Natural', hex: EVORA_COLORS.offwhite }
    ],
    sizes: ['PP', 'P', 'M', 'G', 'Sob Medida'],
    stockBySize: { 'PP': 2, 'P': 3, 'M': 2, 'G': 1, 'Sob Medida': 6 },
    isLimitedEdition: true,
    limitedEditionCount: 20,
    limitedEditionRemaining: 4,
    availability: 'Produção Sob Demanda (7 a 10 dias)',
    materialType: 'Tafetá de Seda Orgânica & Liocel TENCEL™ Botânico',
    composition: '60% Seda Pura Orgânica de manejo regenerativo, 40% Liocel botânico de fiação em circuito fechado.',
    certifications: ['Fair Trade Certified', 'Cradle to Cradle Gold', 'GOTS Organic Silk'],
    productionDetails: 'Barbatana interna flexível revestida em algodão puro para suporte invisível e confortável. Tiragem numerada com placa interna de latão gravada à mão.',
    story: {
      inspiration: 'O tom rico do vinho envelhecido em carvalho e a dramaticidade das óperas clássicas. Uma criação pensada para momentos de celebração inesquecíveis.',
      craftProcess: 'Cada plissado diagonal é moldado milimetricamente à mão sobre o manequim de prova, resultando em um caimento que abraça a cintura e deságua em uma capa fluida.',
      careInstructions: [
        'Limpeza profissional a seco ecologicamente certificada.',
        'Guardar na horizontal sobre papel de seda neutro ou pendurado pelas presilhas de sustentação.',
        'Evitar contato com perfumes ou cosméticos com base alcoólica.'
      ],
      traceability: 'Tingimento botânico artesanal livre de metais pesados; resíduos de água 100% tratados e neutralizados.'
    },
    featured: true
  },
  {
    id: 'evo-004',
    name: 'Vestido Halter Drapeado Marrom Terracota',
    subtitle: 'Gola alta franzida, faixa anatômica com fivela circular em latão reciclado e saia envelope em cascata',
    category: 'Vestidos',
    price: 4600.00,
    installments: 6,
    images: [
      '/assets/products/vestido_marrom_halter.jpg',
      '/assets/products/m4_marrom_detail.jpg',
      '/assets/aistudio/Ateli___vora__Eleg_ncia_Atemporal_27e02109.png'
    ],
    secondaryImage: '/assets/products/m4_marrom_detail.jpg',
    colors: [
      { name: 'Marrom Terracota', hex: EVORA_COLORS.brown },
      { name: 'Bege Areia', hex: EVORA_COLORS.beige },
      { name: 'Vinho Imperial', hex: EVORA_COLORS.wine }
    ],
    sizes: ['PP', 'P', 'M', 'G', 'Sob Medida'],
    stockBySize: { 'PP': 3, 'P': 4, 'M': 5, 'G': 2, 'Sob Medida': 8 },
    isLimitedEdition: true,
    limitedEditionCount: 30,
    limitedEditionRemaining: 9,
    availability: 'Produção Sob Demanda (7 a 10 dias)',
    materialType: 'Cetim Fluido de Seda & Liocel TENCEL™ Luxe',
    composition: '65% Liocel TENCEL™ Luxe botânico, 35% Seda Natural pura.',
    certifications: ['TENCEL™ Certified', 'OEKO-TEX Standard 100', 'Zero Plastic Supply Chain'],
    productionDetails: 'Gola halter com abotoamento artesanal traseiro forrado no mesmo tecido; fivela de latão reciclado esculpida por orives paulista.',
    story: {
      inspiration: 'A terra fértil, os minerais de argila e a simplicidade escultural das ânforas mediterrâneas. Uma homenagem à feminilidade atemporal e confiante.',
      craftProcess: 'Corte em viés com costura francesa de precisão milimétrica. O tecido acompanha o caminhar com ondulações suaves sem tocar o chão com rispidez.',
      careInstructions: [
        'Lavagem ecológica profissional delicada.',
        'Passar a ferro morno pelo lado avesso com tecido protetor.',
        'Guardar em local fresco e arejado.'
      ],
      traceability: 'Celulose certificada de florestas austríacas sustentáveis; fiação com energia 100% renovável.'
    },
    featured: true
  },
  {
    id: 'evo-005',
    name: 'Bolsa Totem em Couro de Maçã e Cortiça',
    subtitle: 'Arquitetura portátil com alça estruturada e costura pespontada manual',
    category: 'Acessórios',
    price: 2190.00,
    installments: 6,
    images: [
      '/src/assets/images/product_apple_leather_bag_1794248337009.jpg',
      '/assets/aistudio/Ateli___vora__Eleg_ncia_Atemporal_27e02109.png'
    ],
    secondaryImage: '/src/assets/images/product_apple_leather_bag_1794248337009.jpg',
    colors: [
      { name: 'Marrom Terracota', hex: EVORA_COLORS.brown },
      { name: 'Verde Évora', hex: EVORA_COLORS.green },
      { name: 'Bege Areia', hex: EVORA_COLORS.beige }
    ],
    sizes: ['M'],
    stockBySize: { 'M': 6 },
    isLimitedEdition: true,
    limitedEditionCount: 40,
    limitedEditionRemaining: 12,
    availability: 'Pronta Entrega',
    materialType: 'AppleSkin™ Bio-Based & Cortiça Portuguesa',
    composition: '50% Resíduos de maçã da indústria de sucos do Tirol, 50% Algodão orgânico com revestimento poliuretano à base de água.',
    certifications: ['USDA Certified Biobased', 'PETA-Approved Vegan', 'FSC Portuguese Cork'],
    productionDetails: 'Estruturação sem papelão plástico; ferragens em latão maciço reciclado fundido sem banho de níquel poluente.',
    story: {
      inspiration: 'O encontro da botânica com o design minimalista industrial. Uma bolsa que substitui o couro animal com toque aveludado superior e durabilidade centenária.',
      craftProcess: 'Bordas lapidadas e seladas à mão com cera vegetal de abelha nativa sem ferrão ou ceras de carnaúba silvestre.',
      careInstructions: [
        'Limpar com pano macio de microfibra ligeiramente umedecido com água morna.',
        'Hidratar semestralmente com gota de óleo vegetal puro de semente de uva.',
        'Manter longe de fontes diretas de calor intenso.'
      ],
      traceability: 'Polpa de maçã descartada em Bolzano (Itália) transformada em biopolímero vegetal; manufaturada em ateliê marroquineiro em Franca (SP).'
    },
    featured: false
  },
  {
    id: 'evo-006',
    name: 'Trench Coat Escultural em Linho Puro',
    subtitle: 'Sobretudo com lapelas arquitetônicas, cinto ajustável e acabamento artesanal desfiado',
    category: 'Alfaiataria',
    price: 3450.00,
    installments: 6,
    images: [
      '/src/assets/images/collection_tailoring_1794248334772.jpg',
      '/assets/aistudio/Ateli___vora__Eleg_ncia_Atemporal_27e02109.png'
    ],
    secondaryImage: '/src/assets/images/collection_tailoring_1794248334772.jpg',
    colors: [
      { name: 'Bege Areia', hex: EVORA_COLORS.beige },
      { name: 'Off-White Natural', hex: EVORA_COLORS.offwhite },
      { name: 'Marrom Terracota', hex: EVORA_COLORS.brown }
    ],
    sizes: ['PP', 'P', 'M', 'G', 'GG'],
    stockBySize: { 'PP': 3, 'P': 5, 'M': 4, 'G': 2, 'GG': 1 },
    isLimitedEdition: false,
    availability: 'Pronta Entrega',
    materialType: '100% Linho Europeu Masters of Linen',
    composition: '100% Linho Francês cultivado sem irrigação artificial, fiação certificada OEKO-TEX Standard 100.',
    certifications: ['Masters of Linen®', 'European Flax Quality Label', 'OEKO-TEX Standard 100'],
    productionDetails: 'Corte anatômico de desperdício zero. Fivelas em osso vegetal de corozo talhado à mão no sul de Minas Gerais.',
    story: {
      inspiration: 'O abrigo atemporal. Uma releitura despojada do tradicional casaco de expedição, transposto para o rigor e a fluidez da mulher contemporânea.',
      craftProcess: 'O tecido passa por amaciamento mecânico com enzimas naturais, dispensando silicone ou derivados de petróleo. Bainhas estruturadas com ponto invisível.',
      careInstructions: [
        'Lavar à mão em água fria com sabão biodegradável neutro.',
        'Secar na horizontal à sombra, nunca em tambor rotativo.',
        'Passar a vapor ainda ligeiramente úmido pelo avesso para manter o brilho sedoso do linho.'
      ],
      traceability: 'Fibras colhidas na Normandia (França), fiadas e tecidas em cooperativa sustentável com energia solar.'
    },
    featured: false
  },
  {
    id: 'evo-007',
    name: 'Capa Escultural em Lã Reciclada & Seda',
    subtitle: 'Edição Numerada 01 a 25 com fecho magnético embutido e gola alta orgânica',
    category: 'Peças Esculturais',
    price: 4890.00,
    installments: 6,
    images: [
      '/assets/products/vestido_verde_escultural.jpg',
      '/assets/products/m1_verde_detail.jpg'
    ],
    secondaryImage: '/assets/products/m1_verde_detail.jpg',
    colors: [
      { name: 'Verde Évora', hex: EVORA_COLORS.green },
      { name: 'Marrom Terracota', hex: EVORA_COLORS.brown },
      { name: 'Vinho Imperial', hex: EVORA_COLORS.wine }
    ],
    sizes: ['P', 'M', 'Sob Medida'],
    stockBySize: { 'P': 1, 'M': 2, 'Sob Medida': 5 },
    isLimitedEdition: true,
    limitedEditionCount: 25,
    limitedEditionRemaining: 3,
    availability: 'Produção Sob Demanda (7 a 10 dias)',
    materialType: 'Lã Reciclada Rastreável & Couro de Cortiça',
    composition: '80% Lã pós-consumo regenerada em Prato (Itália), 20% Seda orgânica brasileira.',
    certifications: ['GRS Global Recycled Standard', 'Cardato Recycled Label'],
    productionDetails: 'Tiragem estritamente limitada a 25 peças por ano, bordadas com número de série individual na etiqueta interna de cetim cru.',
    story: {
      inspiration: 'A imponência da arquitetura modernista de Lina Bo Bardi transposta para a indumentária feminina de alta presença.',
      craftProcess: 'Trabalho de feltragem manual que confere propriedades hidrorepelentes naturais sem aplicação de produtos químicos fluoretados (PFC-free).',
      careInstructions: [
        'Escovar suavemente com escova de cerdas de crina macia.',
        'Lavagem ecológica a seco apenas quando estritamente necessário.',
        'Guardar em local ventilado e protegido da umidade.'
      ],
      traceability: 'Fibras de lã regeneradas de sobras industriais auditadas; rastreabilidade completa por lote.'
    },
    featured: false
  },
  {
    id: 'evo-008',
    name: 'Camisa Atemporal em Liocel e Seda Crua',
    subtitle: 'Fluidez elegante com punhos alongados e carcela de fechamento oculto',
    category: 'Essenciais Atemporais',
    price: 1850.00,
    installments: 6,
    images: [
      '/assets/products/m2_offwhite_detail.jpg',
      '/assets/products/terno_offwhite_alfaiataria.jpg'
    ],
    secondaryImage: '/assets/products/terno_offwhite_alfaiataria.jpg',
    colors: [
      { name: 'Off-White Natural', hex: EVORA_COLORS.offwhite },
      { name: 'Bege Areia', hex: EVORA_COLORS.beige }
    ],
    sizes: ['PP', 'P', 'M', 'G', 'GG'],
    stockBySize: { 'PP': 6, 'P': 8, 'M': 7, 'G': 4, 'GG': 2 },
    isLimitedEdition: false,
    availability: 'Pronta Entrega',
    materialType: 'Liocel Sustentável & Seda Brasileira Pura',
    composition: '65% Liocel TENCEL™, 35% Seda Natural de manejo regenerativo.',
    certifications: ['OEKO-TEX Standard 100', 'Fair Trade Certified'],
    productionDetails: 'Costuras francesas finíssimas de 0,5cm. Botões esculpidos em madeira de poda sustentável de oliveiras.',
    story: {
      inspiration: 'A camisa perfeita que atravessa gerações. O frescor ao toque e a translucidez suave celebram a nobreza dos fios naturais.',
      craftProcess: 'Tecida em tear mecânico de baixa velocidade para preservar a elasticidade natural da seda.',
      careInstructions: [
        'Lavar à mão com água morna e shampoo neutro para fibras naturais.',
        'Secar à sombra sobre uma toalha limpa.',
        'Passar a ferro morno com proteção de tecido fino.'
      ],
      traceability: 'Seda obtida na região de Maringá (PR), referência mundial em sericicultura sustentável.'
    },
    featured: false
  }
];

export const INITIAL_COUPONS: Coupon[] = [
  {
    code: 'BEMVINDO10',
    discountType: 'percentage',
    value: 10,
    minSpend: 1500,
    active: true,
    description: '10% de desconto de boas-vindas na primeira aquisição ÉVORA'
  },
  {
    code: 'SLOWLUXURY',
    discountType: 'fixed',
    value: 300,
    minSpend: 2500,
    active: true,
    description: 'R$ 300,00 de cortesia em celebração ao consumo consciente'
  },
  {
    code: 'CONCIERGE15',
    discountType: 'percentage',
    value: 15,
    minSpend: 4000,
    active: true,
    description: '15% de cortesia exclusiva para membros do Concierge ÉVORA'
  }
];

export const SHIPPING_METHODS: ShippingMethod[] = [
  {
    id: 'ship-eco',
    name: 'Envio Sustentável Carbono Neutro',
    carrier: 'Loggi Carbon Free / Correios Sedex Verde',
    price: 45.00,
    estimatedDays: '3 a 5 dias úteis',
    description: 'Compensação de 100% das emissões de CO₂ com plantio de árvores na Mata Atlântica.',
    ecoFriendly: true
  },
  {
    id: 'ship-express',
    name: 'Maison Express Especial',
    carrier: 'Courier ÉVORA Exclusivo',
    price: 95.00,
    estimatedDays: '1 a 2 dias úteis',
    description: 'Entrega prioritária em embalagem protetora com horário previamente agendado.',
    ecoFriendly: true
  },
  {
    id: 'ship-concierge',
    name: 'Atendimento Concierge em Domicílio',
    carrier: 'Consultoria de Estilo ÉVORA',
    price: 180.00,
    estimatedDays: 'Data agendada',
    description: 'Ajuste de bainha e conferência de caimento no conforto de sua residência (Grande SP e Rio).',
    ecoFriendly: false
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'EVO-2026-8941',
    createdAt: '2026-11-04T14:30:00Z',
    customerName: 'Helena Matarazzo',
    customerEmail: 'helena.matarazzo@luxury.com.br',
    customerPhone: '(11) 98452-3310',
    customerCpf: '142.883.910-44',
    items: [
      {
        id: 'cart-init-1',
        productId: 'evo-001',
        product: INITIAL_PRODUCTS[0],
        size: 'M',
        color: { name: 'Verde Évora', hex: EVORA_COLORS.green },
        quantity: 1,
        isGiftWrapped: true
      }
    ],
    subtotal: 4890.00,
    discount: 489.00,
    shippingPrice: 45.00,
    total: 4446.00,
    shippingAddress: {
      id: 'addr-1',
      label: 'Residência',
      recipientName: 'Helena Matarazzo',
      cep: '01423-001',
      street: 'Rua Oscar Freire',
      number: '1240',
      complement: 'Apto 141',
      neighborhood: 'Jardins',
      city: 'São Paulo',
      state: 'SP',
      isDefault: true
    },
    shippingMethod: SHIPPING_METHODS[0],
    paymentMethod: 'pix',
    paymentDetails: {
      pixCode: '00020126580014br.gov.bcb.pix0136evora-pay-9418a72b-894152040000530398654054446.005802BR5915MAISON EVORA6009SAO PAULO62070503***630489AB'
    },
    status: 'Em Produção Artesanal',
    trackingCode: 'EVO-BR-789421',
    notes: 'Cliente solicitou conferência prévia de barra.'
  },
  {
    id: 'EVO-2026-8902',
    createdAt: '2026-10-28T09:15:00Z',
    customerName: 'Rodrigo Guimarães',
    customerEmail: 'rodrigo.guimaraes@arquitetura.com',
    customerPhone: '(21) 99120-7764',
    customerCpf: '085.341.229-87',
    items: [
      {
        id: 'cart-init-2',
        productId: 'evo-002',
        product: INITIAL_PRODUCTS[1],
        size: 'M',
        color: { name: 'Off-White Natural', hex: EVORA_COLORS.offwhite },
        quantity: 1,
        isGiftWrapped: false
      }
    ],
    subtotal: 4250.00,
    discount: 0,
    shippingPrice: 95.00,
    total: 4345.00,
    shippingAddress: {
      id: 'addr-2',
      label: 'Escritório',
      recipientName: 'Rodrigo Guimarães',
      cep: '22420-002',
      street: 'Avenida Vieira Souto',
      number: '480',
      complement: 'Cobertura',
      neighborhood: 'Ipanema',
      city: 'Rio de Janeiro',
      state: 'RJ',
      isDefault: true
    },
    shippingMethod: SHIPPING_METHODS[1],
    paymentMethod: 'credit_card',
    paymentDetails: {
      brand: 'Mastercard Black',
      lastDigits: '7721',
      installments: 3
    },
    status: 'Entregue',
    trackingCode: 'EVO-EXP-331049'
  }
];

export const INITIAL_CARE_REQUESTS: EvoraCareRequest[] = [
  {
    id: 'CARE-101',
    createdAt: '2026-11-06T11:20:00Z',
    customerName: 'Camila Peixoto de Castro',
    customerEmail: 'camila.castro@estilo.com.br',
    customerPhone: '(11) 97134-2211',
    serviceType: 'Ajuste de Alfaiataria',
    pieceDescription: 'Terno monocromático off-white adquirido em 2025 necessitando leve ajuste nas laterais do tronco após perda de peso.',
    status: 'Orçamento Pronto',
    estimatedCost: 220.00,
    adminNotes: 'Ajuste simples de costura inglesa pelas laterais mantendo a integridade da entretela original.'
  },
  {
    id: 'CARE-102',
    createdAt: '2026-11-08T16:45:00Z',
    customerName: 'Beatriz Fonseca',
    customerEmail: 'bia.fonseca@galeria.art.br',
    customerPhone: '(31) 98842-1900',
    serviceType: 'Upcycling e Transformação',
    pieceDescription: 'Vestido halter terracota ÉVORA que gostaria de transformar em conjunto contemporâneo de top estruturado e saia drapeada.',
    status: 'Em Análise',
    estimatedCost: 380.00,
    adminNotes: 'Avaliar aproveitamento do corte em viés original para maximizar o acabamento da saia sem remendos aparentes.'
  }
];

export const SUSTAINABLE_MATERIALS_INFO = [
  {
    name: 'Algodão Orgânico Certificado (GOTS)',
    tagline: 'Pureza da terra sem agrotóxicos ou fertilizantes sintéticos',
    description: 'Cultivado exclusivamente com sementes não transgênicas e rotação de culturas que preserva os nutrientes do solo. Consome até 91% menos água potável e não contamina os lençóis freáticos.',
    certification: 'Global Organic Textile Standard (GOTS License #BR-88210)',
    supplier: 'Cooperativa de Agroecologia Familiar do Nordeste Brasileiro'
  },
  {
    name: 'Linho Europeu (Masters of Linen®)',
    tagline: 'A mais nobre e resiliente das fibras vegetais',
    description: 'Cresce naturalmente apenas com água da chuva na bacia costeira da França e Bélgica. Cada parte da planta é aproveitada, tornando a colheita zero-desperdício por essência.',
    certification: 'Masters of Linen® & European Flax 100% Rastreável',
    supplier: 'Tecelagem Certificada de Linho Puro na Normandia'
  },
  {
    name: 'Liocel Botânico TENCEL™ Luxe',
    tagline: 'Fluidez de seda vegetal produzida em circuito fechado',
    description: 'Extraído da celulose de eucalipto e faia de florestas manejadas de forma responsável. O processo de fiação recupera mais de 99,5% do solvente e da água utilizados, sem emissão de resíduos químicos no ambiente.',
    certification: 'Cradle to Cradle Certified® Gold & Lenzing Eco-Identity',
    supplier: 'Lenzing AG, Áustria'
  },
  {
    name: 'Lã Fria Rastreável ZQ & Reciclada',
    tagline: 'Termorregulação biológica e respeito integral ao bem-estar animal',
    description: 'Proveniente de pastores comprometidos com o protocolo ZQ que proíbe o mulesing e assegura liberdade aos animais, combinada com fios de lã pura reciclada pré e pós-consumo regenerados mecanicamente.',
    certification: 'ZQ Natural Fiber & Global Recycled Standard (GRS)',
    supplier: 'Cooperativas Pastorais do Sul do Brasil e Prato, Itália'
  },
  {
    name: 'Couro Vegetal de Maçã (AppleSkin™)',
    tagline: 'Inovação circular que transforma resíduo frutífero em nobreza tátil',
    description: 'Elaborado a partir do bagaço e cascas de maçãs descartados pela indústria de sucos, desidratados e pulverizados para criar uma alternativa botânica durável e sofisticada ao couro animal.',
    certification: 'USDA Certified Biobased Product & PETA-Approved Vegan',
    supplier: 'Mabel SRL, Bolzano, Itália'
  },
  {
    name: 'Couro de Cortiça Portuguesa',
    tagline: 'A casca que regenera a própria árvore sem derrubar uma única folha',
    description: 'Extraída manualmente a cada nove anos do sobreiro nos montados portugueses. A casca se regenera naturalmente, atuando como um poderoso sumidouro biológico de dióxido de carbono.',
    certification: 'FSC® Forest Stewardship Council & Eco-Friendly Heritage',
    supplier: 'Montados do Alentejo, Portugal'
  },
  {
    name: 'Biomateriais de Micélio e Cânhamo Orgânico',
    tagline: 'A arquitetura fúngica aplicada à alta costura do amanhã',
    description: 'Cultivados em substrato vegetal nutritivo com mínima pegada de carbono, gerando matrizes densas e macias com propriedades térmicas e textura comparáveis aos materiais mais raros do mundo.',
    certification: 'Bio-Preferred USDA & European Hemp Association',
    supplier: 'Laboratórios de Biofabricação Têxtil Parceiros'
  }
];
