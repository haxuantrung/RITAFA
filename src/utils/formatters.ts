/**
 * Locale-aware formatters used across the app.
 */

export function formatVND(amount: number): string {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatCompactVND(amount: number): string {
  if (amount >= 1_000_000) {
    return `${(amount / 1_000_000).toFixed(1).replace('.0', '')}M₫`;
  }
  if (amount >= 1_000) {
    return `${(amount / 1_000).toFixed(0)}K₫`;
  }
  return `${amount}₫`;
}

export function formatDate(iso: string, locale: 'vi' | 'en' = 'vi'): string {
  return new Intl.DateTimeFormat(locale === 'vi' ? 'vi-VN' : 'en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(iso));
}

export function formatRelativeTime(iso: string, locale: 'vi' | 'en' = 'vi'): string {
  const diff = Date.now() - new Date(iso).getTime();
  const minutes = Math.floor(diff / 60_000);
  const hours = Math.floor(diff / 3_600_000);
  const days = Math.floor(diff / 86_400_000);

  const dict =
    locale === 'vi'
      ? { now: 'vừa xong', min: 'phút trước', hour: 'giờ trước', day: 'ngày trước' }
      : { now: 'just now', min: 'min ago', hour: 'h ago', day: 'd ago' };

  if (minutes < 1) return dict.now;
  if (minutes < 60) return `${minutes} ${dict.min}`;
  if (hours < 24) return `${hours} ${dict.hour}`;
  return `${days} ${dict.day}`;
}

export function formatCountdown(targetIso: string): {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
  expired: boolean;
} {
  const diff = new Date(targetIso).getTime() - Date.now();
  if (diff <= 0) {
    return { days: '00', hours: '00', minutes: '00', seconds: '00', expired: true };
  }
  const pad = (n: number) => String(n).padStart(2, '0');
  return {
    days: pad(Math.floor(diff / 86_400_000)),
    hours: pad(Math.floor((diff % 86_400_000) / 3_600_000)),
    minutes: pad(Math.floor((diff % 3_600_000) / 60_000)),
    seconds: pad(Math.floor((diff % 60_000) / 1_000)),
    expired: false,
  };
}
