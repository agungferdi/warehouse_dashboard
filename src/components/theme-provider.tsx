'use client';

import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

type Theme = 'light' | 'dark';

type ThemeContextValue = {
  theme: Theme;
  setTheme: (t: Theme) => void;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

function applyThemeClass(theme: Theme) {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  if (theme === 'dark') root.classList.add('dark');
  else root.classList.remove('dark');
}

export function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [theme, setThemeState] = useState<Theme>('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const stored = localStorage.getItem('theme') as Theme | null;
      const systemDark = window.matchMedia(
        '(prefers-color-scheme: dark)',
      ).matches;
      const initialTheme = stored || (systemDark ? 'dark' : 'light');
      setThemeState(initialTheme);
      applyThemeClass(initialTheme);
    } catch {
      applyThemeClass('light');
    }
  }, []);

  const value = useMemo<ThemeContextValue>(
    () => ({
      theme,
      setTheme: (newTheme: Theme) => {
        setThemeState(newTheme);
        applyThemeClass(newTheme);
        try {
          localStorage.setItem('theme', newTheme);
        } catch {}
      },
      toggleTheme: () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setThemeState(newTheme);
        applyThemeClass(newTheme);
        try {
          localStorage.setItem('theme', newTheme);
        } catch {}
      },
    }),
    [theme],
  );

  if (!mounted) return <>{children}</>;

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}
