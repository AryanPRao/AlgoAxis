'use client'

import { useTheme } from '../contexts/ThemeContext';
import { motion } from 'framer-motion';
import { MoonIcon, SunIcon } from 'lucide-react';
import { useId } from 'react';

export default function ThemeToggle() {
  const { theme, toggleTheme, isDark } = useTheme();
  const id = useId();

  return (
    <motion.div 
      className="theme-toggle-container"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      data-state={isDark ? 'checked' : 'unchecked'}
    >
      <span
        id={`${id}-light`}
        className="theme-icon-label light-icon"
        aria-controls={id}
        onClick={() => !isDark ? null : toggleTheme()}
        style={{ cursor: isDark ? 'pointer' : 'default' }}
      >
        <SunIcon className="icon-size" aria-hidden="true" />
      </span>
      
      <button
        id={id}
        className="theme-switch"
        onClick={toggleTheme}
        aria-labelledby={`${id}-dark ${id}-light`}
        aria-label="Toggle between dark and light mode"
        role="switch"
        aria-checked={isDark}
      >
        <span className="theme-switch-thumb" data-state={isDark ? 'checked' : 'unchecked'} />
      </button>
      
      <span
        id={`${id}-dark`}
        className="theme-icon-label dark-icon"
        aria-controls={id}
        onClick={() => isDark ? null : toggleTheme()}
        style={{ cursor: !isDark ? 'pointer' : 'default' }}
      >
        <MoonIcon className="icon-size" aria-hidden="true" />
      </span>
    </motion.div>
  );
}
