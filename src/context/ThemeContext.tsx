import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

type Theme = 'light' | 'dark';
type Language = 'vi' | 'en';

interface ThemeContextValue {
  theme: Theme;
  language: Language;
  toggleTheme: () => void;
  setLanguage: (lang: Language) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

const STORAGE_KEY = 'ritafa.preferences.v1';

interface StoredPrefs {
  theme: Theme;
  language: Language;
}

function readInitial(): StoredPrefs {
  if (typeof window === 'undefined') return { theme: 'dark', language: 'vi' };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as StoredPrefs;
  } catch {
    /* ignore corrupt storage */
  }
  // Dark Mode First — REQS §5.1
  const prefersDark =
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-color-scheme: dark)').matches;
  return { theme: prefersDark ? 'dark' : 'dark', language: 'vi' };
}

/**
 * Global theme + language provider.
 * Persists choice to localStorage; mirrors to <html class="dark">.
 */
export function ThemeProvider({ children }: { children: ReactNode }) {
  const initial = readInitial();
  const [theme, setTheme] = useState<Theme>(initial.theme);
  const [language, setLanguageState] = useState<Language>(initial.language);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') root.classList.add('dark');
    else root.classList.remove('dark');
    root.style.colorScheme = theme;
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ theme, language }));
  }, [theme, language]);

  const toggleTheme = useCallback(
    () => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark')),
    [],
  );

  const setLanguage = useCallback((lang: Language) => setLanguageState(lang), []);

  const value = useMemo<ThemeContextValue>(
    () => ({ theme, language, toggleTheme, setLanguage }),
    [theme, language, toggleTheme, setLanguage],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}
