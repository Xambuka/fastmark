
import { AdminUser, Plan, Category, ThemeSettings, SystemStats } from '@/types/admin';

export const adminUsers: AdminUser[] = [
  {
    id: '1',
    name: 'Administrador Principal',
    email: 'admin@foodmarket.com',
    role: 'superadmin',
    permissions: {
      dashboard: true,
      companies: { view: true, create: true, edit: true, delete: true, approve: true },
      users: { view: true, edit: true, delete: true, moderate: true },
      categories: { view: true, create: true, edit: true, delete: true },
      layout: { view: true, edit: true },
      plans: { view: true, create: true, edit: true, delete: true },
      settings: { view: true, edit: true }
    },
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
    createdAt: '2024-01-01',
    lastLogin: '2024-06-03'
  },
  {
    id: '2',
    name: 'Moderador Geral',
    email: 'moderador@foodmarket.com',
    role: 'admin',
    permissions: {
      dashboard: true,
      companies: { view: true, create: false, edit: true, delete: false, approve: true },
      users: { view: true, edit: true, delete: false, moderate: true },
      categories: { view: true, create: true, edit: true, delete: false },
      layout: { view: true, edit: false },
      plans: { view: true, create: false, edit: false, delete: false },
      settings: { view: true, edit: false }
    },
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100',
    createdAt: '2024-02-15',
    lastLogin: '2024-06-02'
  }
];

export const plans: Plan[] = [
  // Planos para Empresas
  {
    id: '1',
    name: 'Gratuito',
    description: 'Ideal para começar',
    price: 0,
    features: ['Até 10 produtos', 'Perfil básico', 'Suporte por email'],
    maxProducts: 10,
    maxImages: 20,
    featured: false,
    priority: 3,
    analytics: false,
    support: 'basic',
    color: '#6b7280',
    status: 'active',
    type: 'company'
  },
  {
    id: '2',
    name: 'Básico',
    description: 'Para pequenos negócios',
    price: 29.90,
    features: ['Até 50 produtos', 'Destaque moderado', 'Analytics básico', 'Suporte prioritário'],
    maxProducts: 50,
    maxImages: 100,
    featured: false,
    priority: 2,
    analytics: true,
    support: 'priority',
    color: '#3b82f6',
    status: 'active',
    type: 'company'
  },
  {
    id: '3',
    name: 'Premium',
    description: 'Para empresas em crescimento',
    price: 79.90,
    features: ['Produtos ilimitados', 'Destaque máximo', 'Analytics avançado', 'Suporte premium 24/7', 'Campanhas especiais'],
    maxProducts: -1,
    maxImages: -1,
    featured: true,
    priority: 1,
    analytics: true,
    support: 'premium',
    color: '#8b5cf6',
    status: 'active',
    type: 'company'
  },
  // Planos para Anunciantes
  {
    id: '4',
    name: 'Anúncio Básico',
    description: 'Para divulgação simples',
    price: 19.90,
    features: ['Até 5 anúncios/mês', '1.000 impressões', 'Posicionamento padrão', 'Relatórios básicos'],
    maxAds: 5,
    maxImpressions: 1000,
    featured: false,
    priority: 3,
    analytics: true,
    support: 'basic',
    color: '#10b981',
    status: 'active',
    type: 'advertiser'
  },
  {
    id: '5',
    name: 'Anúncio Premium',
    description: 'Para máxima visibilidade',
    price: 49.90,
    features: ['Até 15 anúncios/mês', '5.000 impressões', 'Posicionamento prioritário', 'Analytics detalhado', 'Segmentação avançada'],
    maxAds: 15,
    maxImpressions: 5000,
    featured: true,
    priority: 2,
    analytics: true,
    support: 'priority',
    color: '#f59e0b',
    status: 'active',
    type: 'advertiser'
  },
  {
    id: '6',
    name: 'Anúncio Empresarial',
    description: 'Para grandes campanhas',
    price: 99.90,
    features: ['Anúncios ilimitados', 'Impressões ilimitadas', 'Posicionamento premium', 'Suporte dedicado', 'Campanhas personalizadas'],
    maxAds: -1,
    maxImpressions: -1,
    featured: false,
    priority: 1,
    analytics: true,
    support: 'premium',
    color: '#ef4444',
    status: 'active',
    type: 'advertiser'
  }
];

export const categories: Category[] = [
  { 
    id: '1', 
    name: 'Restaurantes', 
    description: 'Estabelecimentos que servem refeições', 
    slug: 'restaurantes',
    status: 'active',
    count: 54,
    icon: '🍽️',
    featured: true
  },
  { 
    id: '2', 
    name: 'Lanchonetes', 
    description: 'Fast food e lanches rápidos', 
    slug: 'lanchonetes',
    status: 'active',
    count: 38,
    icon: '🍔',
    featured: true 
  },
  { 
    id: '3', 
    name: 'Cafeterias', 
    description: 'Café e produtos de padaria', 
    slug: 'cafeterias',
    status: 'active',
    count: 25,
    icon: '☕',
    featured: false
  },
  { 
    id: '4', 
    name: 'Pizzarias', 
    description: 'Especializado em pizzas', 
    slug: 'pizzarias',
    status: 'inactive',
    count: 17,
    icon: '🍕',
    featured: false
  },
  { 
    id: '5', 
    name: 'Docerias', 
    description: 'Sobremesas e doces', 
    slug: 'docerias',
    status: 'active',
    count: 12,
    icon: '🍰',
    featured: false
  }
];

export const themeSettings: ThemeSettings = {
  primaryColor: '#ea580c',
  secondaryColor: '#dc2626',
  accentColor: '#f59e0b',
  backgroundColor: '#ffffff',
  textColor: '#1f2937',
  logo: '/placeholder.svg',
  favicon: '/favicon.ico',
  headerStyle: 'light',
  borderRadius: 'medium'
};

export const systemStats: SystemStats = {
  totalCompanies: 247,
  activeCompanies: 198,
  totalUsers: 1542,
  totalOrders: 3891,
  monthlyRevenue: 12750.50,
  growthRate: 15.4
};
