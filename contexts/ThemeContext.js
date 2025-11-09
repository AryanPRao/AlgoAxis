import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('dark');
  const [mounted, setMounted] = useState(false);

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('interviewmate-theme') || 'dark';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
    setMounted(true);
  }, []);

  // Save theme to localStorage and update DOM
  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('interviewmate-theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  // Prevent flash of wrong theme
  if (!mounted) {
    return null;
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isDark: theme === 'dark' }}>
      {children}
    </ThemeContext.Provider>
  );
}
