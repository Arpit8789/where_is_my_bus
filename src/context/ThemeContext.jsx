import { createContext, useContext, useState, useEffect } from 'react';
import { STORAGE_KEYS } from '@/utils/constants';
import { getLocalStorage, setLocalStorage } from '@/utils/helpers';

const ThemeContext = createContext(null);

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  // Initialize theme from localStorage
  useEffect(() => {
    const storedTheme = getLocalStorage(STORAGE_KEYS.THEME, 'light');
    setTheme(storedTheme);
    applyTheme(storedTheme);
  }, []);

  // Apply theme to document
  const applyTheme = (themeName) => {
    if (themeName === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  // Toggle theme
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    setLocalStorage(STORAGE_KEYS.THEME, newTheme);
    applyTheme(newTheme);
  };

  // Set specific theme
  const setThemeMode = (themeName) => {
    setTheme(themeName);
    setLocalStorage(STORAGE_KEYS.THEME, themeName);
    applyTheme(themeName);
  };

  const value = {
    theme,
    toggleTheme,
    setThemeMode,
    isDark: theme === 'dark',
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

// Custom hook to use theme context
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

export default ThemeContext;
