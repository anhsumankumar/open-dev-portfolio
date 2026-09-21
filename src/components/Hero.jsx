import React from 'react';
import { useTheme } from '../context/ThemeContext';
import EditorialHero from './EditorialHero';
import TerminalHero from './TerminalHero';

export default function Hero() {
  const { theme } = useTheme();
  return theme === 'terminal' ? <TerminalHero /> : <EditorialHero />;
}
