
export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'superadmin' | 'admin' | 'moderator';
  permissions: AdminPermissions;
  avatar?: string;
  createdAt: string;
  lastLogin?: string;
}

export interface AdminPermissions {
  dashboard: boolean;
  companies: {
    view: boolean;
    create: boolean;
    edit: boolean;
    delete: boolean;
    approve: boolean;
  };
  users: {
    view: boolean;
    edit: boolean;
    delete: boolean;
    moderate: boolean;
  };
  categories: {
    view: boolean;
    create: boolean;
    edit: boolean;
    delete: boolean;
  };
  layout: {
    view: boolean;
    edit: boolean;
  };
  plans: {
    view: boolean;
    create: boolean;
    edit: boolean;
    delete: boolean;
  };
  settings: {
    view: boolean;
    edit: boolean;
  };
}

export interface Plan {
  id: string;
  name: string;
  description: string;
  price: number;
  features: string[];
  maxProducts: number;
  maxImages: number;
  featured: boolean;
  priority: number;
  analytics: boolean;
  support: 'basic' | 'priority' | 'premium';
  color: string;
  status: 'active' | 'inactive';
}

export interface Category {
  id: string;
  name: string;
  description: string;
  slug: string;
  icon: string;
  status: 'active' | 'inactive';
  count: number;
  featured: boolean;
}

export interface ThemeSettings {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  backgroundColor: string;
  textColor: string;
  logo: string;
  favicon: string;
  headerStyle: 'light' | 'dark';
  borderRadius: 'none' | 'small' | 'medium' | 'large';
}

export interface SystemStats {
  totalCompanies: number;
  activeCompanies: number;
  totalUsers: number;
  totalOrders: number;
  monthlyRevenue: number;
  growthRate: number;
}
