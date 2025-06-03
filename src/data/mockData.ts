
import { Company, Product, Category } from '@/types';

export const categories: Category[] = [
  {
    id: '1',
    name: 'Restaurantes',
    icon: '🍽️',
    description: 'Refeições completas e pratos principais'
  },
  {
    id: '2',
    name: 'Lanches',
    icon: '🍔',
    description: 'Hambúrgueres, sanduíches e petiscos'
  },
  {
    id: '3',
    name: 'Pizzaria',
    icon: '🍕',
    description: 'Pizzas tradicionais e especiais'
  },
  {
    id: '4',
    name: 'Mercado',
    icon: '🛒',
    description: 'Produtos de mercado e conveniência'
  },
  {
    id: '5',
    name: 'Farmácia',
    icon: '💊',
    description: 'Medicamentos e produtos de saúde'
  },
  {
    id: '6',
    name: 'Bebidas',
    icon: '🥤',
    description: 'Sucos, refrigerantes e bebidas'
  }
];

export const companies: Company[] = [
  {
    id: '1',
    name: 'Burger Master',
    description: 'Os melhores hambúrgueres artesanais da cidade com ingredientes selecionados',
    logo: '/placeholder.svg',
    coverImage: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=800',
    phone: '(11) 99999-9999',
    whatsapp: '5511999999999',
    instagram: '@burgermaster',
    serviceType: 'restaurant',
    status: 'active',
    plan: 'premium',
    rating: 4.8,
    deliveryTime: '30-45 min',
    deliveryFee: 5.90,
    address: {
      street: 'Rua das Flores, 123',
      city: 'São Paulo',
      neighborhood: 'Vila Madalena',
      zipCode: '05432-000'
    },
    openingHours: {
      monday: { open: '11:00', close: '23:00' },
      tuesday: { open: '11:00', close: '23:00' },
      wednesday: { open: '11:00', close: '23:00' },
      thursday: { open: '11:00', close: '23:00' },
      friday: { open: '11:00', close: '24:00' },
      saturday: { open: '11:00', close: '24:00' },
      sunday: { open: '11:00', close: '22:00' }
    }
  },
  {
    id: '2',
    name: 'Pizza Della Casa',
    description: 'Pizzas tradicionais italianas feitas no forno a lenha',
    logo: '/placeholder.svg',
    coverImage: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800',
    phone: '(11) 88888-8888',
    whatsapp: '5511888888888',
    serviceType: 'restaurant',
    status: 'active',
    plan: 'basic',
    rating: 4.6,
    deliveryTime: '40-55 min',
    deliveryFee: 7.50,
    address: {
      street: 'Avenida Paulista, 456',
      city: 'São Paulo',
      neighborhood: 'Bela Vista',
      zipCode: '01310-000'
    },
    openingHours: {
      monday: { closed: true, open: '', close: '' },
      tuesday: { open: '18:00', close: '23:00' },
      wednesday: { open: '18:00', close: '23:00' },
      thursday: { open: '18:00', close: '23:00' },
      friday: { open: '18:00', close: '24:00' },
      saturday: { open: '18:00', close: '24:00' },
      sunday: { open: '18:00', close: '22:00' }
    }
  },
  {
    id: '3',
    name: 'Mercado Bom Preço',
    description: 'Produtos frescos e de qualidade com os melhores preços da região',
    logo: '/placeholder.svg',
    coverImage: 'https://images.unsplash.com/photo-1534723328310-e82dad3ee43f?w=800',
    phone: '(11) 77777-7777',
    serviceType: 'market',
    status: 'active',
    plan: 'free',
    rating: 4.2,
    deliveryTime: '20-35 min',
    deliveryFee: 3.90,
    address: {
      street: 'Rua do Comércio, 789',
      city: 'São Paulo',
      neighborhood: 'Centro',
      zipCode: '01001-000'
    },
    openingHours: {
      monday: { open: '07:00', close: '22:00' },
      tuesday: { open: '07:00', close: '22:00' },
      wednesday: { open: '07:00', close: '22:00' },
      thursday: { open: '07:00', close: '22:00' },
      friday: { open: '07:00', close: '22:00' },
      saturday: { open: '07:00', close: '22:00' },
      sunday: { open: '08:00', close: '18:00' }
    }
  }
];

export const products: Product[] = [
  {
    id: '1',
    companyId: '1',
    name: 'Burger Clássico',
    description: 'Hambúrguer de carne bovina, alface, tomate, cebola e molho especial',
    price: 24.90,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400',
    categoryId: '2',
    available: true,
    featured: true
  },
  {
    id: '2',
    companyId: '1',
    name: 'Burger Bacon',
    description: 'Hambúrguer com bacon crocante, queijo cheddar e molho barbecue',
    price: 28.90,
    image: 'https://images.unsplash.com/photo-1553979459-d2229ba7433a?w=400',
    categoryId: '2',
    available: true
  },
  {
    id: '3',
    companyId: '2',
    name: 'Pizza Margherita',
    description: 'Molho de tomate, mozzarella, manjericão fresco e azeite',
    price: 32.90,
    image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=400',
    categoryId: '3',
    available: true,
    featured: true
  },
  {
    id: '4',
    companyId: '2',
    name: 'Pizza Calabresa',
    description: 'Molho de tomate, mozzarella, calabresa e cebola',
    price: 35.90,
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400',
    categoryId: '3',
    available: true
  },
  {
    id: '5',
    companyId: '3',
    name: 'Coca-Cola 350ml',
    description: 'Refrigerante gelado',
    price: 4.50,
    image: 'https://images.unsplash.com/photo-1561758033-d89a9ad46330?w=400',
    categoryId: '6',
    available: true
  }
];
