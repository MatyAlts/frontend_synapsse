export interface Product {
  id: string
  title: string;
  description: string;
  price: string; 
  img: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  isOpen: boolean;
}

export interface FormData{
  email: string,
  phone: string,
  firstName: string,
  lastName: string,
  address: string,
  city: string,
  province: string,
  zipCode: string
}
export interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  province: string;
  zipCode: string;
}

export interface OrderItem {
  name: string;
  quantity: number;
  price: number;
  image: string;
}

export interface Order {
  id: string;
  date: string;
  status: 'delivered' | 'pending' | 'processing' | 'shipped';
  total: number;
  items: OrderItem[];
  trackingNumber?: string;
}

export interface Category {
  id: number;
  name: string;
  description: string;
  icon: React.ReactNode;
  productCount: number;
  image: string;
  color: string;
  benefits: string[];
}