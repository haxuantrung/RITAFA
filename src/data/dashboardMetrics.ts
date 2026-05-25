/**
 * Mock real-time metrics for the Admin Dashboard.
 * Fed into Recharts and KPI cards.
 */

export const REVENUE_TODAY = 47_280_000;
export const REVENUE_DELTA_PCT = 12.4;        // vs yesterday
export const ORDERS_TODAY = 64;
export const ORDERS_DELTA_PCT = 8.1;
export const VISITORS_ONLINE = 312;
export const CONVERSION_RATE = 3.42;          // percent
export const AOV_TODAY = 738_750;             // average order value
export const REFUND_RATE = 1.2;

/** Last 14 days revenue trend (VND) */
export const REVENUE_TREND = [
  { date: '12/05', revenue: 28_400_000, orders: 38 },
  { date: '13/05', revenue: 31_800_000, orders: 42 },
  { date: '14/05', revenue: 27_900_000, orders: 36 },
  { date: '15/05', revenue: 39_200_000, orders: 51 },
  { date: '16/05', revenue: 42_500_000, orders: 56 },
  { date: '17/05', revenue: 48_900_000, orders: 64 },
  { date: '18/05', revenue: 36_700_000, orders: 47 },
  { date: '19/05', revenue: 33_400_000, orders: 41 },
  { date: '20/05', revenue: 38_100_000, orders: 49 },
  { date: '21/05', revenue: 41_200_000, orders: 54 },
  { date: '22/05', revenue: 44_800_000, orders: 60 },
  { date: '23/05', revenue: 39_500_000, orders: 52 },
  { date: '24/05', revenue: 42_100_000, orders: 56 },
  { date: '25/05', revenue: 47_280_000, orders: 64 },
];

export const CHANNEL_BREAKDOWN = [
  { channel: 'Website', revenue: 18_500_000, percent: 39.1 },
  { channel: 'Mobile App', revenue: 12_300_000, percent: 26.0 },
  { channel: 'Shopee', revenue: 7_800_000, percent: 16.5 },
  { channel: 'TikTok Shop', revenue: 5_900_000, percent: 12.5 },
  { channel: 'Lazada', revenue: 2_780_000, percent: 5.9 },
];

export const TOP_PRODUCTS = [
  { id: 'p001', name: 'Base Essential Tee', sold: 124, revenue: 85_560_000 },
  { id: 'p003', name: 'Kinetic Flex Jogger', sold: 87, revenue: 138_330_000 },
  { id: 'p012', name: 'Home Sleep Tee', sold: 96, revenue: 56_640_000 },
  { id: 'p007', name: 'Kinetic Cool Tee', sold: 71, revenue: 63_190_000 },
  { id: 'p004', name: 'Home Cloud Hoodie', sold: 48, revenue: 85_920_000 },
];

export const TODO_LIST = [
  { id: 't1', label: 'Đơn chưa xác nhận', count: 8, severity: 'warning' as const, href: '/admin/orders?status=new' },
  { id: 't2', label: 'SP dưới định mức tồn kho', count: 14, severity: 'danger' as const, href: '/admin/inventory' },
  { id: 't3', label: 'Tin nhắn CSKH chưa trả lời', count: 5, severity: 'info' as const, href: '/admin/support' },
  { id: 't4', label: 'QC Rejects cần xem lại', count: 2, severity: 'danger' as const, href: '/admin/orders?status=qc_failed' },
];

export const INVENTORY_BY_WAREHOUSE = [
  { warehouse: 'Kho Tổng HCM', stock: 12_840, value: 4_280_000_000 },
  { warehouse: 'Kho Hà Nội', stock: 6_120, value: 1_950_000_000 },
  { warehouse: 'Kho Đà Nẵng', stock: 3_480, value: 1_120_000_000 },
];
