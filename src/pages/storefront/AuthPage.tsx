import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Apple, ArrowRight, Eye, EyeOff, Lock, Mail } from 'lucide-react';
import { Button, Input } from '@components/ui';
import { AtomicLogo } from '@components/layout/AtomicLogo';

type Mode = 'login' | 'register';

/**
 * Auth — Login + Register on one page with tab toggle.
 * Split-screen layout: editorial visual + form.
 * Mobile collapses to single column with form on top.
 */
export function AuthPage({ mode: initialMode = 'login' }: { mode?: Mode }) {
  const [mode, setMode] = useState<Mode>(initialMode);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="-mt-16 grid min-h-screen lg:grid-cols-2">
      {/* Editorial pane */}
      <div className="relative hidden overflow-hidden bg-ink-950 lg:block">
        <img
          src="https://images.unsplash.com/photo-1554568218-0f1715e72254?w=1600&q=85"
          alt="RITAFA editorial"
          className="absolute inset-0 h-full w-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-ink-950 via-ink-950/50 to-transparent" />
        <div className="absolute inset-0 bg-tech-grid opacity-20" />
        <div className="relative flex h-full flex-col justify-between p-12 text-white">
          <AtomicLogo />
          <div className="space-y-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-amber-300">
              // Lab Report · Issue 12
            </p>
            <h2 className="font-display text-5xl font-semibold leading-tight tracking-tight">
              Join the lab.
              <br />
              <span className="text-amber-400">Earn early access.</span>
            </h2>
            <p className="max-w-md text-white/70">
              Thành viên Elementa nhận early access cho Year Collection, mời sự kiện kín và discount đặc biệt theo cấp.
            </p>
            <div className="flex gap-6 pt-4 font-mono text-xs uppercase tracking-widest text-white/40">
              <span>· Free shipping</span>
              <span>· Members-only drops</span>
              <span>· 30-day returns</span>
            </div>
          </div>
        </div>
      </div>

      {/* Form pane */}
      <div className="flex items-center justify-center bg-white px-4 py-24 dark:bg-ink-950 sm:px-8 lg:px-16">
        <div className="w-full max-w-md space-y-8">
          <div className="space-y-2 lg:hidden">
            <AtomicLogo />
          </div>

          {/* Tab switch */}
          <div className="grid grid-cols-2 gap-1 rounded-full border border-black/[0.06] bg-ink-50 p-1 dark:border-white/[0.06] dark:bg-ink-800">
            {(['login', 'register'] as Mode[]).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`rounded-full py-2 font-mono text-[10px] uppercase tracking-widest transition-all ${
                  mode === m
                    ? 'bg-ink-900 text-white dark:bg-amber-500 dark:text-ink-900'
                    : 'text-muted'
                }`}
              >
                {m === 'login' ? 'Đăng nhập' : 'Đăng ký'}
              </button>
            ))}
          </div>

          <div className="space-y-2">
            <p className="lab-label">{mode === 'login' ? '// Welcome back' : '// Welcome to the lab'}</p>
            <h2 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
              {mode === 'login' ? 'Đăng nhập' : 'Tạo tài khoản'}
            </h2>
            <p className="text-muted">
              {mode === 'login' ? (
                <>Chưa có tài khoản? <button onClick={() => setMode('register')} className="text-amber-500 underline">Đăng ký miễn phí</button></>
              ) : (
                <>Đã có tài khoản? <button onClick={() => setMode('login')} className="text-amber-500 underline">Đăng nhập</button></>
              )}
            </p>
          </div>

          {/* Social login */}
          <div className="space-y-2">
            <Button variant="outline" fullWidth leftIcon={<Apple className="h-4 w-4" />}>
              Tiếp tục với Apple
            </Button>
            <Button variant="outline" fullWidth>
              <span className="mr-2 inline-flex h-4 w-4 items-center justify-center rounded-full bg-white text-[10px] font-bold text-ink-900">G</span>
              Tiếp tục với Google
            </Button>
          </div>

          <div className="flex items-center gap-3 text-muted">
            <div className="h-px flex-1 bg-current opacity-20" />
            <span className="font-mono text-[10px] uppercase tracking-widest">hoặc dùng email</span>
            <div className="h-px flex-1 bg-current opacity-20" />
          </div>

          {/* Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              navigate('/account');
            }}
            className="space-y-4"
          >
            {mode === 'register' && (
              <Input label="Họ và tên" placeholder="Nguyễn Minh Anh" required />
            )}
            <Input
              label="Email"
              type="email"
              placeholder="ban@email.com"
              leftIcon={<Mail className="h-4 w-4" />}
              required
            />
            <Input
              label="Mật khẩu"
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              leftIcon={<Lock className="h-4 w-4" />}
              rightSlot={
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="p-1 text-muted hover:text-amber-500"
                  aria-label={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              }
              required
            />

            {mode === 'login' && (
              <div className="flex items-center justify-between text-caption">
                <label className="inline-flex items-center gap-2">
                  <input type="checkbox" className="rounded border-ink-300 text-amber-500 focus:ring-amber-500 dark:border-ink-600 dark:bg-ink-800" />
                  Ghi nhớ tôi
                </label>
                <Link to="#" className="text-amber-500 hover:underline">
                  Quên mật khẩu?
                </Link>
              </div>
            )}

            <Button type="submit" size="lg" fullWidth rightIcon={<ArrowRight className="h-4 w-4" />}>
              {mode === 'login' ? 'Đăng nhập' : 'Tạo tài khoản'}
            </Button>
          </form>

          <p className="text-center text-caption text-muted">
            Khi tiếp tục, bạn đồng ý với{' '}
            <Link to="#" className="underline">Điều khoản</Link> và{' '}
            <Link to="#" className="underline">Chính sách bảo mật</Link>.
          </p>
        </div>
      </div>
    </div>
  );
}
