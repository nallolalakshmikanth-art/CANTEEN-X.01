export type UserRole = 'student' | 'faculty' | 'guest';

export interface User {
  id: string;
  name: string;
  role: UserRole;
  idCardNumber?: string;
  email?: string;
  department?: string;
  avatar: string;
  walletBalance: number;
}

export type FoodCategory =
  | 'all'
  | 'popular'
  | 'biryani_rice'
  | 'burgers_snacks'
  | 'south_indian'
  | 'beverages'
  | 'combos';

export type FoodTag = 'veg' | 'non-veg' | 'spicy' | 'chef-special' | 'bestseller' | 'quick-prep';

export interface MenuItem {
  id: string;
  name: string;
  category: FoodCategory;
  price: number;
  prepTimeMinutes: number;
  inStock: boolean;
  stockCount: number;
  isVeg: boolean;
  tags: FoodTag[];
  image: string;
  description: string;
  rating: number;
  reviewCount: number;
  calories: number;
  customOptions?: {
    title: string;
    options: string[];
  }[];
}

export interface CartItem {
  menuItem: MenuItem;
  quantity: number;
  selectedOption?: string;
  cookingNote?: string;
}

export type OrderStatus = 'received' | 'preparing' | 'ready' | 'completed';

export interface Order {
  id: string;
  tokenNumber: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  total: number;
  paymentMethod: 'upi' | 'counter' | 'id_wallet';
  paymentStatus: 'paid' | 'pending';
  status: OrderStatus;
  createdAt: string;
  estimatedPickupTime: string;
  specialInstructions?: string;
  userRole: UserRole;
  userName: string;
  userIdCard?: string;
  counterNumber: string;
  elapsedSeconds?: number;
}

export interface CanteenStats {
  isOpen: boolean;
  avgPrepTimeMinutes: number;
  activeOrdersCount: number;
  nowServingTokens: string[];
  preparingTokens: string[];
}
