/**
 * Order & Fulfillment domain types.
 * Mirrors REQS §3.3 workflow: New → Verified → QC Passed → Packed → Shipping → Delivered.
 */

export type OrderStatus =
  | 'new'
  | 'verified'
  | 'qc_passed'
  | 'qc_failed'
  | 'packed'
  | 'shipping'
  | 'delivered'
  | 'cancelled'
  | 'returned'
  | 'refunded';

export type PaymentMethod =
  | 'cod'
  | 'bank_transfer'
  | 'momo'
  | 'zalopay'
  | 'visa'
  | 'apple_pay'
  | 'google_pay'
  | 'fundiin'
  | 'kredivo';

export type ShippingCarrier = 'GHTK' | 'GHN' | 'Ahamove' | 'VNPost';

export interface OrderLineItem {
  productId: string;
  sku: string;
  name: string;
  color: string;
  size: string;
  quantity: number;
  unitPrice: number;
  thumbnail: string;
}

export interface ShippingAddress {
  fullName: string;
  phone: string;
  email: string;
  street: string;
  ward: string;
  district: string;
  province: string;
  notes?: string;
}

export interface OrderTimelineEvent {
  status: OrderStatus;
  timestamp: string;
  actor: string;                  // staff name or system
  note?: string;
}

export interface Order {
  id: string;
  code: string;                   // e.g. "RTF-20260525-A1B2"
  customer: {
    id: string;
    name: string;
    email: string;
    phone: string;
    avatar?: string;
  };
  items: OrderLineItem[];
  subtotal: number;
  discount: number;
  shippingFee: number;
  total: number;
  status: OrderStatus;
  payment: {
    method: PaymentMethod;
    paid: boolean;
    paidAt?: string;
  };
  shipping: {
    address: ShippingAddress;
    carrier?: ShippingCarrier;
    trackingNumber?: string;
    estimatedDelivery?: string;
  };
  timeline: OrderTimelineEvent[];
  channel: 'web' | 'mobile' | 'shopee' | 'lazada' | 'tiktok' | 'pos';
  createdAt: string;
  updatedAt: string;
}
