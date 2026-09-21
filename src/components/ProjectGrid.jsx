import React from 'react';
import { useTheme } from '../context/ThemeContext';
import EditorialProjectGrid from './EditorialProjectGrid';
import TerminalProjectGrid from './TerminalProjectGrid';

export default function ProjectGrid() {
  const { theme } = useTheme();
  return theme === 'terminal' ? <TerminalProjectGrid /> : <EditorialProjectGrid />;
}
