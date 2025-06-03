
export interface Company {
  id: string;
  name: string;
  description: string;
  logo: string;
  coverImage: string;
  phone: string;
  whatsapp?: string;
  instagram?: string;
  facebook?: string;
  serviceType: 'restaurant' | 'snackbar' | 'market' | 'pharmacy' | 'other';
  status: 'active' | 'inactive';
  plan: 'free' | 'basic' | 'premium';
  rating: number;
  deliveryTime: string;
  deliveryFee: number;
  address: {
    street: string;
    city: string;
    neighborhood: string;
    zipCode: string;
  };
  openingHours: {
    [key: string]: { open: string; close: string; closed?: boolean };
  };
}

export interface Product {
  id: string;
  companyId: string;
  name: string;
  description: string;
  price: number;
  image: string;
  categoryId: string;
  available: boolean;
  featured?: boolean;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  description: string;
  image?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  company: Company;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  type: 'customer' | 'company' | 'admin';
}
