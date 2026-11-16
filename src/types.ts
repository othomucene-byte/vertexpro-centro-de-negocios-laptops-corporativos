export type ActiveTab = 'catalog' | 'business';

export interface Laptop {
  id: string;
  name: string;
  brand: string;
  category: 'Executivo' | 'Workstation' | 'Ultrabook' | 'Engenharia';
  price: number;
  b2bPrice: number;
  processor: string;
  ram: string;
  storage: string;
  display: string;
  battery: string;
  weight: string;
  badge?: string;
  inStock: number;
  rating: number;
  description: string;
  accentColor: string;
}

export interface CustomConfig {
  ram: string;
  storage: string;
  warranty: string;
  extraPrice: number;
}

export interface CartItem {
  laptop: Laptop;
  quantity: number;
  configKey: string;
  customConfig?: CustomConfig;
  unitPrice: number;
}

export interface BusinessQuote {
  id: string;
  company: string;
  contact: string;
  itemsCount: number;
  totalValue: number;
  status: 'Em Análise' | 'Aprovada' | 'Faturada';
  date: string;
}
