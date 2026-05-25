import type { User } from '@/types';

/**
 * Dummy users — customer-facing membership demo + admin/staff accounts.
 */

export const CURRENT_USER: User = {
  id: 'u001',
  role: 'customer',
  name: 'Nguyễn Minh Anh',
  email: 'minh.anh@gmail.com',
  phone: '+84 901 234 567',
  avatar: 'https://i.pravatar.cc/120?img=47',
  birthday: '1998-04-12',
  gender: 'female',
  membership: {
    tier: 'scholar',
    points: 1_280,
    spentYTD: 5_640_000,
    progressToNext: 56,            // 5.64M / 10M ≈ 56% to Kinetic
  },
  preferences: {
    language: 'vi',
    theme: 'dark',
    notifications: { email: true, sms: false, push: true },
  },
  addresses: [
    {
      id: 'a1',
      label: 'Nhà',
      fullName: 'Nguyễn Minh Anh',
      phone: '+84 901 234 567',
      street: '12 Lê Lợi',
      ward: 'P. Bến Nghé',
      district: 'Q.1',
      province: 'TP. Hồ Chí Minh',
      isDefault: true,
    },
    {
      id: 'a2',
      label: 'Văn phòng',
      fullName: 'Nguyễn Minh Anh',
      phone: '+84 901 234 567',
      street: '101 Tôn Dật Tiên',
      ward: 'P. Tân Phú',
      district: 'Q.7',
      province: 'TP. Hồ Chí Minh',
      isDefault: false,
    },
  ],
  wishlist: ['p004', 'p006', 'p011'],
  createdAt: '2024-08-15T00:00:00Z',
};

export const ADMIN_USER: User = {
  id: 'admin-001',
  role: 'super_admin',
  name: 'Võ Minh Tâm',
  email: 'tam.vo@ritafa.vn',
  avatar: 'https://i.pravatar.cc/120?img=8',
  membership: {
    tier: 'kinetic',
    points: 9_999,
    spentYTD: 0,
    progressToNext: 100,
  },
  preferences: {
    language: 'vi',
    theme: 'dark',
    notifications: { email: true, sms: true, push: true },
  },
  addresses: [],
  wishlist: [],
  createdAt: '2024-01-01T00:00:00Z',
};
