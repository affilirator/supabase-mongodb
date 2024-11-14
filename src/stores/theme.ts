type Theme = 'light' | 'dark' | 'system';

class ThemeStore {
  private static instance: ThemeStore;
  private theme: Theme;

  private constructor() {
    // Default to dark theme
    this.theme = ((localStorage.getItem('theme') as Theme) || 'dark');
    this.applyTheme();
  }

  static getInstance(): ThemeStore {
    if (!ThemeStore.instance) {
      ThemeStore.instance = new ThemeStore();
    }
    return ThemeStore.instance;
  }

  getCurrentTheme(): Theme {
    return this.theme;
  }

  setTheme(newTheme: Theme): void {
    this.theme = newTheme;
    localStorage.setItem('theme', newTheme);
    this.applyTheme();
  }

  private applyTheme(): void {
    const isDark = this.theme === 'dark' ||
      (this.theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }
}

export const themeStore = ThemeStore.getInstance();