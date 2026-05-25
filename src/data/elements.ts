import type { ElementMeta, MembershipTierInfo } from '@/types';

/**
 * The 4 RITAFA Elements — periodic-table style brand pillars.
 * REQS §1.3 + §5.3.
 */
export const ELEMENTS: ElementMeta[] = [
  {
    code: 'Ba',
    name: 'Base',
    tagline: 'Everyday Core',
    hex: '#9CA3AF',
    description:
      'Lớp nền cơ bản cho ngày dài — basics tinh giản, đa dụng. Sợi cotton & modal pha kỹ thuật.',
  },
  {
    code: 'Sc',
    name: 'Scholar',
    tagline: 'Academic · Office',
    hex: '#60A5FA',
    description:
      'Form chuẩn cho không gian học thuật & công sở. Cấu trúc twill, chống nhăn, giữ form.',
  },
  {
    code: 'Ki',
    name: 'Kinetic',
    tagline: 'Performance · Motion',
    hex: '#F87171',
    description:
      'Hiệu suất vận động — co giãn 4 chiều, thoát ẩm, kháng khuẩn. Cho hoạt động cường độ cao.',
  },
  {
    code: 'Hm',
    name: 'Home',
    tagline: 'Recovery · At Home',
    hex: '#4ADE80',
    description:
      'Phục hồi tại gia. Chất liệu jersey mềm, giữ ấm, ưu tiên cảm giác da. Cho giấc ngủ ngon.',
  },
];

/**
 * Membership tiers — Elementa Rewards.
 * REQS §3.2 + §4.1.5.
 */
export const MEMBERSHIP_TIERS: MembershipTierInfo[] = [
  {
    tier: 'base',
    label: 'Base',
    threshold: 0,
    elementCode: 'Ba',
    color: '#9CA3AF',
    perks: ['Tích điểm 1đ/100K', 'Sinh nhật −10%', 'Truy cập Lab Report'],
  },
  {
    tier: 'scholar',
    label: 'Scholar',
    threshold: 2_000_000,
    elementCode: 'Sc',
    color: '#60A5FA',
    perks: ['Tích điểm 1.5đ/100K', 'Freeship không giới hạn', 'Early access Year Collection'],
  },
  {
    tier: 'kinetic',
    label: 'Kinetic',
    threshold: 10_000_000,
    elementCode: 'Ki',
    color: '#F87171',
    perks: ['Tích điểm 2đ/100K', 'Stylist riêng', 'Mời sự kiện kín', 'Đổi trả ưu tiên 30 ngày'],
  },
];

export function getElement(code: ElementMeta['code']): ElementMeta {
  return ELEMENTS.find((e) => e.code === code) ?? ELEMENTS[0];
}
