export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
  available: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface OrderCustomer {
  name: string;
  phone: string;
  address: string;
}

export interface Order extends OrderCustomer {
  reference: string;
  items: CartItem[];
  subtotal: number;
  placedAt: string;
}