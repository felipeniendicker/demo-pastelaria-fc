const today = new Date();

export const seedProducts = [
  {
    id: 'prod-1',
    name: 'Pastel de Carne',
    category: 'Pasteis',
    price: 14.9,
    cost: 6.2,
    stock: 38,
    minStock: 12,
    active: true,
    description: 'Recheio bem temperado com massa crocante feita na hora.',
    image: 'https://images.unsplash.com/photo-1625944525533-473f1b202cf7?auto=format&fit=crop&w=900&q=80',
    recipe: [
      { supplyId: 'sup-1', quantity: 0.12 },
      { supplyId: 'sup-2', quantity: 0.1 },
      { supplyId: 'sup-3', quantity: 1 }
    ]
  },
  {
    id: 'prod-2',
    name: 'Pastel de Queijo',
    category: 'Pasteis',
    price: 13.9,
    cost: 5.1,
    stock: 34,
    minStock: 10,
    active: true,
    description: 'Queijo derretido e massa dourada, campeão de saída no balcão.',
    image: 'https://images.unsplash.com/photo-1612392062798-fb4f3f6c03a0?auto=format&fit=crop&w=900&q=80',
    recipe: [
      { supplyId: 'sup-4', quantity: 0.09 },
      { supplyId: 'sup-3', quantity: 1 }
    ]
  },
  {
    id: 'prod-3',
    name: 'X-Burger FC',
    category: 'Lanches',
    price: 21.9,
    cost: 9.4,
    stock: 22,
    minStock: 8,
    active: true,
    description: 'Pão macio, hambúrguer artesanal, queijo e molho da casa.',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=80',
    recipe: [
      { supplyId: 'sup-5', quantity: 1 },
      { supplyId: 'sup-6', quantity: 1 },
      { supplyId: 'sup-4', quantity: 0.04 },
      { supplyId: 'sup-7', quantity: 0.03 }
    ]
  },
  {
    id: 'prod-4',
    name: 'Batata Crocante',
    category: 'Lanches',
    price: 16.5,
    cost: 5.8,
    stock: 18,
    minStock: 8,
    active: true,
    description: 'Porção generosa com tempero especial e molho verde.',
    image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=900&q=80',
    recipe: [
      { supplyId: 'sup-8', quantity: 0.25 },
      { supplyId: 'sup-9', quantity: 0.02 }
    ]
  },
  {
    id: 'prod-5',
    name: 'Refrigerante Lata',
    category: 'Bebidas',
    price: 7,
    cost: 3.5,
    stock: 45,
    minStock: 15,
    active: true,
    description: 'Lata gelada para acompanhar o pedido.',
    image: 'https://images.unsplash.com/photo-1581636625402-29b2a704ef13?auto=format&fit=crop&w=900&q=80',
    recipe: []
  },
  {
    id: 'prod-6',
    name: 'Combo Casal FC',
    category: 'Combos',
    price: 42.9,
    cost: 18.8,
    stock: 12,
    minStock: 5,
    active: true,
    description: '2 pastéis, 1 batata crocante e 2 refrigerantes.',
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=900&q=80',
    recipe: [
      { supplyId: 'sup-1', quantity: 0.12 },
      { supplyId: 'sup-2', quantity: 0.1 },
      { supplyId: 'sup-3', quantity: 1 },
      { supplyId: 'sup-4', quantity: 0.09 },
      { supplyId: 'sup-8', quantity: 0.25 }
    ]
  }
];

export const seedSupplies = [
  { id: 'sup-1', name: 'Carne moída', unit: 'kg', quantity: 7.5, minStock: 3, unitCost: 29.9 },
  { id: 'sup-2', name: 'Cebola temperada', unit: 'kg', quantity: 3.8, minStock: 1.5, unitCost: 8.4 },
  { id: 'sup-3', name: 'Massa de pastel', unit: 'unidade', quantity: 120, minStock: 50, unitCost: 0.95 },
  { id: 'sup-4', name: 'Queijo muçarela', unit: 'kg', quantity: 4.2, minStock: 2, unitCost: 38 },
  { id: 'sup-5', name: 'Pão brioche', unit: 'unidade', quantity: 28, minStock: 12, unitCost: 1.4 },
  { id: 'sup-6', name: 'Hambúrguer artesanal', unit: 'unidade', quantity: 24, minStock: 10, unitCost: 4.8 },
  { id: 'sup-7', name: 'Molho da casa', unit: 'kg', quantity: 1.4, minStock: 1, unitCost: 16.5 },
  { id: 'sup-8', name: 'Batata pré-frita', unit: 'kg', quantity: 2.4, minStock: 3, unitCost: 12.9 },
  { id: 'sup-9', name: 'Tempero especial', unit: 'kg', quantity: 0.45, minStock: 0.2, unitCost: 21 }
];

export const seedOrders = [
  {
    id: 'ped-1001',
    customerName: 'Mariana Souza',
    phone: '(11) 98888-1200',
    type: 'Entrega',
    address: 'Rua das Acácias, 145',
    notes: 'Sem cebola no pastel de carne.',
    status: 'Novo',
    createdAt: today.toISOString(),
    items: [
      { productId: 'prod-1', name: 'Pastel de Carne', quantity: 2, unitPrice: 14.9 },
      { productId: 'prod-5', name: 'Refrigerante Lata', quantity: 2, unitPrice: 7 }
    ],
    total: 43.8
  },
  {
    id: 'ped-1002',
    customerName: 'Carlos Lima',
    phone: '(11) 97777-5511',
    type: 'Retirada',
    address: '',
    notes: '',
    status: 'Em preparo',
    createdAt: new Date(today.getTime() - 1000 * 60 * 90).toISOString(),
    items: [{ productId: 'prod-3', name: 'X-Burger FC', quantity: 1, unitPrice: 21.9 }],
    total: 21.9
  },
  {
    id: 'ped-1003',
    customerName: 'Patrícia Alves',
    phone: '(11) 96666-3131',
    type: 'Entrega',
    address: 'Av. Central, 500',
    notes: 'Trocar refri por água, se possível.',
    status: 'Pronto',
    createdAt: new Date(today.getTime() - 1000 * 60 * 180).toISOString(),
    items: [{ productId: 'prod-6', name: 'Combo Casal FC', quantity: 1, unitPrice: 42.9 }],
    total: 42.9
  }
];

export const seedFinanceEntries = [
  {
    id: 'fin-1',
    type: 'entrada',
    description: 'Vendas balcão manhã',
    amount: 186.4,
    date: today.toISOString()
  },
  {
    id: 'fin-2',
    type: 'saida',
    description: 'Reposição de bebidas',
    amount: 74.5,
    date: today.toISOString()
  },
  {
    id: 'fin-3',
    type: 'saida',
    description: 'Compra de carne e queijo',
    amount: 142.3,
    date: new Date(today.getTime() - 1000 * 60 * 60 * 24 * 2).toISOString()
  }
];

export const seedCustomerInfo = {
  whatsapp: '5511999999999',
  deliveryFee: 4.5
};

export const seedData = {
  products: seedProducts,
  supplies: seedSupplies,
  orders: seedOrders,
  financeEntries: seedFinanceEntries,
  customerInfo: seedCustomerInfo
};
