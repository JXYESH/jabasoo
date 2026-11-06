export type ProductSize = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | '3XL' | '4XL' | '5XL' | '6XL';

export interface ProductColor {
  name: string;
  hex: string;
  images: string[];
}

export interface SensoryProfile {
  warmth: string;
  skinFeel: string;
  weightGsm: string;
  fitDrape: string;
}

export interface Product {
  id: string;
  name: string;
  category: 'loungewear' | 'accessories';
  subcategory: 'robes' | 'trousers' | 'knitwear' | 'sets' | 'sleepwear' | 'accessories';
  price: number;
  description: string;
  composition: string;
  fitInfo: string;
  details: string[];
  certificates: string[];
  care: string[];
  colors: ProductColor[];
  availableSizes: ProductSize[];
  isNew?: boolean;
  popularity: number;
  inStock: boolean;
  sensoryProfile?: SensoryProfile;
  pairingProductId?: string;
  ritual?: 'morning' | 'evening' | 'leisure' | 'rest';
}

export interface CartItem {
  productId: string;
  colorName: string;
  size: ProductSize;
  quantity: number;
}

export interface CustomerAddress {
  id: string;
  name: string;
  phone: string;
  street: string;
  apartment?: string;
  city: string;
  state: string;
  pinCode: string;
  isDefault: boolean;
}

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  colorName: string;
  size: ProductSize;
  quantity: number;
  image: string;
}

export interface CustomerOrder {
  id: string;
  orderNumber: string;
  date: string;
  status: 'Processing' | 'Shipped' | 'Delivered';
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  total: number;
  deliveryAddress: {
    name: string;
    street: string;
    city: string;
    state: string;
    pinCode: string;
    phone: string;
  };
  paymentMethod: string;
  trackingNumber?: string;
}
