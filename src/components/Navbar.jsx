import React from 'react';
import { useTheme } from '../context/ThemeContext';
import EditorialNavbar from './EditorialNavbar';
import TerminalNavbar from './TerminalNavbar';

export default function Navbar() {
  const { theme } = useTheme();
  return theme === 'terminal' ? <TerminalNavbar /> : <EditorialNavbar />;
}
