import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, ProductSize, CartItem, CustomerAddress, CustomerOrder, OrderItem } from '../types';
import { PRODUCTS } from '../data/products';

interface InfoDrawerState {
  open: boolean;
  type: 'details' | 'size-fit' | 'certificates' | 'returns' | 'size-guide';
  productId?: string;
}

interface StoreContextType {
  // Routing
  currentRoute: string;
  routeParams: Record<string, string>;
  navigate: (route: string, params?: Record<string, string>) => void;

  // Cart
  cart: CartItem[];
  addToBag: (productId: string, colorName: string, size: ProductSize, quantity?: number) => void;
  updateQuantity: (productId: string, colorName: string, size: ProductSize, quantity: number) => void;
  removeFromBag: (productId: string, colorName: string, size: ProductSize) => void;
  clearBag: () => void;
  subtotal: number;
  itemCount: number;
  isBagOpen: boolean;
  setIsBagOpen: (open: boolean) => void;

  // Wishlist / Bookmark
  wishlist: string[];
  toggleBookmark: (productId: string) => void;
  isBookmarked: (productId: string) => boolean;

  // Search
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  // Info Drawer
  infoDrawer: InfoDrawerState;
  openInfoDrawer: (type: InfoDrawerState['type'], productId?: string) => void;
  closeInfoDrawer: () => void;

  // Account
  userProfile: { name: string; email: string; phone: string };
  updateUserProfile: (profile: { name: string; email: string; phone: string }) => void;
  addresses: CustomerAddress[];
  addAddress: (address: Omit<CustomerAddress, 'id'>) => void;
  updateAddress: (address: CustomerAddress) => void;
  deleteAddress: (id: string) => void;
  setDefaultAddress: (id: string) => void;
  orders: CustomerOrder[];
  lastOrder: CustomerOrder | null;
  placeOrder: (checkoutData: {
    name: string;
    email: string;
    phone: string;
    street: string;
    apartment?: string;
    city: string;
    state: string;
    pinCode: string;
    paymentMethod: string;
  }) => void;
  marketingPrefs: { email: boolean; sms: boolean };
  updateMarketingPrefs: (prefs: { email: boolean; sms: boolean }) => void;
  atelierAtmosphere: 'dawn' | 'solar' | 'twilight' | 'midnight';
  setAtelierAtmosphere: (atmos: 'dawn' | 'solar' | 'twilight' | 'midnight') => void;
}

const StoreContext = createContext<StoreContextType | null>(null);

const DEFAULT_ADDRESSES: CustomerAddress[] = [
  {
    id: 'addr-1',
    name: 'Aanya Sharma',
    phone: '+91 98450 12890',
    street: '14 The Courtyard, 12th Main Road, Indiranagar',
    city: 'Bengaluru',
    state: 'Karnataka',
    pinCode: '560038',
    isDefault: true,
  },
  {
    id: 'addr-2',
    name: 'Aanya Sharma',
    phone: '+91 98450 12890',
    street: 'Flat 402, Sea Green Apartments, Bandra West',
    city: 'Mumbai',
    state: 'Maharashtra',
    pinCode: '400050',
    isDefault: false,
  }
];

const DEFAULT_ORDERS: CustomerOrder[] = [
  {
    id: 'order-demo-1',
    orderNumber: 'JB-88204',
    date: 'October 18, 2026',
    status: 'Delivered',
    subtotal: 62500,
    shipping: 0,
    total: 62500,
    paymentMethod: 'UPI / NetBanking',
    trackingNumber: 'DELHIVERY-9948201',
    deliveryAddress: {
      name: 'Aanya Sharma',
      street: '14 The Courtyard, 12th Main Road, Indiranagar',
      city: 'Bengaluru',
      state: 'Karnataka',
      pinCode: '560038',
      phone: '+91 98450 12890',
    },
    items: [
      {
        productId: 'vel-robe-01',
        name: 'The Cocoon Cashmere Robe',
        price: 38500,
        colorName: 'Bone Ivory',
        size: 'M',
        quantity: 1,
        image: '/src/assets/images/loungewear_hero_morning_1793620652458.jpg'
      },
      {
        productId: 'vel-trouser-02',
        name: 'Wide-Leg Ribbed Silk Lounge Trouser',
        price: 24000,
        colorName: 'Bone Ivory',
        size: 'M',
        quantity: 1,
        image: '/src/assets/images/loungewear_silk_robe_living_1793620652768.jpg'
      }
    ]
  }
];

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation
  const [currentRoute, setCurrentRoute] = useState<string>('home');
  const [routeParams, setRouteParams] = useState<Record<string, string>>({});

  const navigate = (route: string, params?: Record<string, string>) => {
    setCurrentRoute(route);
    setRouteParams(params || {});
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const [atelierAtmosphere, setAtelierAtmosphere] = useState<'dawn' | 'solar' | 'twilight' | 'midnight'>('dawn');

  // Cart persistence
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('velene_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('velene_cart', JSON.stringify(cart));
    } catch (e) {
      console.warn('Could not persist cart to localStorage', e);
    }
  }, [cart]);

  // Wishlist persistence
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('velene_wishlist');
      return saved ? JSON.parse(saved) : ['vel-robe-01', 'vel-knit-03'];
    } catch {
      return ['vel-robe-01', 'vel-knit-03'];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('velene_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.warn('Could not persist wishlist to localStorage', e);
    }
  }, [wishlist]);

  // Drawers
  const [isBagOpen, setIsBagOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [infoDrawer, setInfoDrawer] = useState<InfoDrawerState>({
    open: false,
    type: 'details',
  });

  const openInfoDrawer = (type: InfoDrawerState['type'], productId?: string) => {
    setInfoDrawer({ open: true, type, productId });
  };

  const closeInfoDrawer = () => {
    setInfoDrawer((prev) => ({ ...prev, open: false }));
  };

  // User Profile
  const [userProfile, setUserProfile] = useState<{ name: string; email: string; phone: string }>(() => {
    try {
      const saved = localStorage.getItem('velene_profile');
      return saved ? JSON.parse(saved) : {
        name: 'Aanya Sharma',
        email: 'aanya.sharma@jabasoo.in',
        phone: '+91 98450 12890',
      };
    } catch {
      return {
        name: 'Aanya Sharma',
        email: 'aanya.sharma@jabasoo.in',
        phone: '+91 98450 12890',
      };
    }
  });

  const updateUserProfile = (profile: { name: string; email: string; phone: string }) => {
    setUserProfile(profile);
    try {
      localStorage.setItem('velene_profile', JSON.stringify(profile));
    } catch (e) {
      console.warn('LocalStorage save error', e);
    }
  };

  // Addresses
  const [addresses, setAddresses] = useState<CustomerAddress[]>(() => {
    try {
      const saved = localStorage.getItem('velene_addresses');
      return saved ? JSON.parse(saved) : DEFAULT_ADDRESSES;
    } catch {
      return DEFAULT_ADDRESSES;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('velene_addresses', JSON.stringify(addresses));
    } catch (e) {
      console.warn('LocalStorage save error', e);
    }
  }, [addresses]);

  const addAddress = (addr: Omit<CustomerAddress, 'id'>) => {
    const newAddr: CustomerAddress = {
      ...addr,
      id: `addr-${Date.now()}`,
    };
    if (addr.isDefault) {
      setAddresses((prev) => prev.map((a) => ({ ...a, isDefault: false })).concat(newAddr));
    } else {
      setAddresses((prev) => [...prev, newAddr]);
    }
  };

  const updateAddress = (addr: CustomerAddress) => {
    setAddresses((prev) =>
      prev.map((a) => {
        if (a.id === addr.id) return addr;
        if (addr.isDefault) return { ...a, isDefault: false };
        return a;
      })
    );
  };

  const deleteAddress = (id: string) => {
    setAddresses((prev) => prev.filter((a) => a.id !== id));
  };

  const setDefaultAddress = (id: string) => {
    setAddresses((prev) => prev.map((a) => ({ ...a, isDefault: a.id === id })));
  };

  // Orders
  const [orders, setOrders] = useState<CustomerOrder[]>(() => {
    try {
      const saved = localStorage.getItem('velene_orders');
      return saved ? JSON.parse(saved) : DEFAULT_ORDERS;
    } catch {
      return DEFAULT_ORDERS;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('velene_orders', JSON.stringify(orders));
    } catch (e) {
      console.warn('LocalStorage save error', e);
    }
  }, [orders]);

  const [lastOrder, setLastOrder] = useState<CustomerOrder | null>(null);

  // Marketing preferences
  const [marketingPrefs, setMarketingPrefs] = useState<{ email: boolean; sms: boolean }>(() => {
    try {
      const saved = localStorage.getItem('velene_mkt_prefs');
      return saved ? JSON.parse(saved) : { email: true, sms: false };
    } catch {
      return { email: true, sms: false };
    }
  });

  const updateMarketingPrefs = (prefs: { email: boolean; sms: boolean }) => {
    setMarketingPrefs(prefs);
    try {
      localStorage.setItem('velene_mkt_prefs', JSON.stringify(prefs));
    } catch (e) {
      console.warn('LocalStorage save error', e);
    }
  };

  // Cart operations
  const addToBag = (productId: string, colorName: string, size: ProductSize, quantity = 1) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.productId === productId && item.colorName === colorName && item.size === size
      );
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + quantity,
        };
        return next;
      }
      return [...prev, { productId, colorName, size, quantity }];
    });
    setIsBagOpen(true);
  };

  const updateQuantity = (productId: string, colorName: string, size: ProductSize, quantity: number) => {
    if (quantity <= 0) {
      removeFromBag(productId, colorName, size);
      return;
    }
    setCart((prev) =>
      prev.map((item) => {
        if (item.productId === productId && item.colorName === colorName && item.size === size) {
          return { ...item, quantity };
        }
        return item;
      })
    );
  };

  const removeFromBag = (productId: string, colorName: string, size: ProductSize) => {
    setCart((prev) =>
      prev.filter(
        (item) => !(item.productId === productId && item.colorName === colorName && item.size === size)
      )
    );
  };

  const clearBag = () => setCart([]);

  const subtotal = cart.reduce((sum, item) => {
    const prod = PRODUCTS.find((p) => p.id === item.productId);
    return sum + (prod ? prod.price * item.quantity : 0);
  }, 0);

  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Wishlist operations
  const toggleBookmark = (productId: string) => {
    setWishlist((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  const isBookmarked = (productId: string) => wishlist.includes(productId);

  // Place simulated order
  const placeOrder = (checkoutData: {
    name: string;
    email: string;
    phone: string;
    street: string;
    apartment?: string;
    city: string;
    state: string;
    pinCode: string;
    paymentMethod: string;
  }) => {
    const orderItems: OrderItem[] = cart.map((item) => {
      const product = PRODUCTS.find((p) => p.id === item.productId);
      const color = product?.colors.find((c) => c.name === item.colorName) || product?.colors[0];
      return {
        productId: item.productId,
        name: product?.name || 'Loungewear Piece',
        price: product?.price || 0,
        colorName: item.colorName,
        size: item.size,
        quantity: item.quantity,
        image: color?.images[0] || '/src/assets/images/hero_loungewear_campaign_1793612595821.jpg',
      };
    });

    const newOrder: CustomerOrder = {
      id: `ord-${Date.now()}`,
      orderNumber: `VL-${Math.floor(10000 + Math.random() * 90000)}`,
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      status: 'Processing',
      items: orderItems,
      subtotal,
      shipping: 0,
      total: subtotal,
      deliveryAddress: {
        name: checkoutData.name,
        street: checkoutData.apartment ? `${checkoutData.street}, ${checkoutData.apartment}` : checkoutData.street,
        city: checkoutData.city,
        state: checkoutData.state,
        pinCode: checkoutData.pinCode,
        phone: checkoutData.phone,
      },
      paymentMethod: checkoutData.paymentMethod,
      trackingNumber: `VLTRK${Math.floor(1000000000 + Math.random() * 9000000000)}`,
    };

    setOrders((prev) => [newOrder, ...prev]);
    setLastOrder(newOrder);
    clearBag();
    setIsBagOpen(false);
    navigate('order-confirmation');
  };

  return (
    <StoreContext.Provider
      value={{
        currentRoute,
        routeParams,
        navigate,
        cart,
        addToBag,
        updateQuantity,
        removeFromBag,
        clearBag,
        subtotal,
        itemCount,
        isBagOpen,
        setIsBagOpen,
        wishlist,
        toggleBookmark,
        isBookmarked,
        isSearchOpen,
        setIsSearchOpen,
        searchQuery,
        setSearchQuery,
        infoDrawer,
        openInfoDrawer,
        closeInfoDrawer,
        userProfile,
        updateUserProfile,
        addresses,
        addAddress,
        updateAddress,
        deleteAddress,
        setDefaultAddress,
        orders,
        lastOrder,
        placeOrder,
        marketingPrefs,
        updateMarketingPrefs,
        atelierAtmosphere,
        setAtelierAtmosphere,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
