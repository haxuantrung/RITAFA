/**
 * User & Membership domain types.
 * Mirrors REQS §2 (Role-Based Access) + §4.1.5 (Elementa Rewards: Base → Scholar → Kinetic).
 */

export type UserRole =
  | 'customer'
  | 'super_admin'
  | 'staff_warehouse'
  | 'staff_marketing'
  | 'staff_accounting'
  | 'staff_support'
  | 'affiliate';

export type MembershipTier = 'base' | 'scholar' | 'kinetic';

export interface MembershipTierInfo {
  tier: MembershipTier;
  label: string;
  threshold: number;              // VND spent total
  perks: string[];
  elementCode: 'Ba' | 'Sc' | 'Ki';
  color: string;
}

export interface UserAddress {
  id: string;
  label: string;                  // e.g. "Nhà", "Văn phòng"
  fullName: string;
  phone: string;
  street: string;
  ward: string;
  district: string;
  province: string;
  isDefault: boolean;
}

export interface User {
  id: string;
  role: UserRole;
  name: string;
  email: string;
  phone?: string;
  avatar: string;
  birthday?: string;
  gender?: 'male' | 'female' | 'other';

  // Membership
  membership: {
    tier: MembershipTier;
    points: number;
    spentYTD: number;             // VND
    progressToNext: number;       // 0–100
  };

  // Preferences
  preferences: {
    language: 'vi' | 'en';
    theme: 'light' | 'dark' | 'system';
    notifications: {
      email: boolean;
      sms: boolean;
      push: boolean;
    };
  };

  addresses: UserAddress[];
  wishlist: string[];             // product ids
  createdAt: string;
}
