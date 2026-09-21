import React from 'react';
import { useTheme } from '../context/ThemeContext';
import './ThemeToggle.css';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="theme-toggle" onClick={toggleTheme}>
      <span className={theme === 'editorial' ? 'active' : 'inactive'}>
        {theme === 'editorial' ? '●' : '○'} EDITORIAL
      </span>
      <span className="divider">|</span>
      <span className={theme === 'terminal' ? 'active' : 'inactive'}>
        {theme === 'terminal' ? '●' : '○'} TERMINAL
      </span>
    </div>
  );
}
