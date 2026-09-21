import React from 'react';
import { useTheme } from '../context/ThemeContext';
import EditorialContact from './EditorialContact';
import TerminalContact from './TerminalContact';

export default function Contact() {
  const { theme } = useTheme();
  return theme === 'terminal' ? <TerminalContact /> : <EditorialContact />;
}
