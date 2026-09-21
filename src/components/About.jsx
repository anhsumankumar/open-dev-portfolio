import React from 'react';
import { useTheme } from '../context/ThemeContext';
import EditorialAbout from './EditorialAbout';
import TerminalAbout from './TerminalAbout';

export default function About() {
  const { theme } = useTheme();
  return theme === 'terminal' ? <TerminalAbout /> : <EditorialAbout />;
}
