import { Link } from 'react-router-dom';
import { Facebook, Instagram, Music2, Youtube } from 'lucide-react';
import { Button, Input } from '@components/ui';
import { AtomicLogo } from './AtomicLogo';

const COLUMNS = [
  {
    title: 'Shop',
    links: [
      { label: 'All Products', to: '/shop' },
      { label: '[Ba] Base', to: '/shop?element=Ba' },
      { label: '[Sc] Scholar', to: '/shop?element=Sc' },
      { label: '[Ki] Kinetic', to: '/shop?element=Ki' },
      { label: '[Hm] Home', to: '/shop?element=Hm' },
    ],
  },
  {
    title: 'Lab',
    links: [
      { label: 'Material Science', to: '/lab/materials' },
      { label: 'Engineering Notes', to: '/journal' },
      { label: 'Manufacturing Dashboard', to: '/transparency' },
      { label: 'Year Collection', to: '/collection/year-one' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'Size Guide', to: '/help/size-guide' },
      { label: 'Shipping & Returns', to: '/help/shipping' },
      { label: 'Care Instructions', to: '/help/care' },
      { label: 'Contact Us', to: '/help/contact' },
      { label: 'FAQs', to: '/help/faqs' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About RITAFA', to: '/about' },
      { label: 'Sustainability', to: '/sustainability' },
      { label: 'Press', to: '/press' },
      { label: 'Affiliates', to: '/affiliates' },
      { label: 'Careers', to: '/careers' },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-black/[0.06] bg-ink-50 dark:border-white/[0.06] dark:bg-ink-950">
      {/* Newsletter band */}
      <section className="border-b border-black/[0.06] dark:border-white/[0.06]">
        <div className="mx-auto grid max-w-screen-2xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-10 lg:py-24">
          <div className="space-y-4">
            <p className="lab-label">{`// Lab Report — Issue No. 12`}</p>
            <h3 className="font-display text-3xl font-semibold leading-tight tracking-tight md:text-4xl">
              Join the Lab Report.
              <br />
              <span className="text-gradient-amber">Receive engineering notes monthly.</span>
            </h3>
            <p className="max-w-md text-muted">
              Tin tức từ phòng lab, behind-the-scenes của Year Collection, early access cho thành viên — 1 email/tháng, không spam.
            </p>
          </div>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col items-stretch gap-3 self-end sm:flex-row"
          >
            <Input
              type="email"
              required
              placeholder="ban@email.com"
              containerClassName="flex-1"
              aria-label="Email"
            />
            <Button type="submit" size="lg" className="sm:w-auto">
              Đăng ký
            </Button>
          </form>
        </div>
      </section>

      {/* Link columns */}
      <div className="mx-auto grid max-w-screen-2xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-6 lg:px-10">
        <div className="space-y-6 lg:col-span-2">
          <AtomicLogo />
          <p className="max-w-xs text-sm leading-relaxed text-muted">
            Thương hiệu thời trang kỹ thuật của tập đoàn Rita Võ.
            Tiên phong mô hình M2C tại Việt Nam.
          </p>
          <div className="flex gap-3">
            {[Instagram, Facebook, Music2, Youtube].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-black/10 text-ink-700 transition-colors hover:border-amber-500 hover:text-amber-500 dark:border-white/15 dark:text-ink-200"
                aria-label="Social link"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        {COLUMNS.map((col) => (
          <div key={col.title}>
            <h4 className="mb-4 font-mono text-[11px] uppercase tracking-[0.25em] text-amber-500">
              {col.title}
            </h4>
            <ul className="space-y-2.5 text-sm">
              {col.links.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-ink-700 transition-colors hover:text-amber-500 dark:text-ink-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Legal strip */}
      <div className="border-t border-black/[0.06] dark:border-white/[0.06]">
        <div className="mx-auto flex max-w-screen-2xl flex-col items-start gap-3 px-4 py-6 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-10">
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted">
            © 2026 Rita Võ Group · Engineered in Vietnam
          </p>
          <div className="flex flex-wrap gap-x-5 gap-y-1 text-xs text-muted">
            <Link to="/legal/privacy">Privacy</Link>
            <Link to="/legal/terms">Terms</Link>
            <Link to="/legal/cookies">Cookies</Link>
            <Link to="/legal/accessibility">Accessibility</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
