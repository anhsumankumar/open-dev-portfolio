import React from 'react';
import { useTheme } from '../context/ThemeContext';
import EditorialSkills from './EditorialSkills';
import TerminalSkills from './TerminalSkills';

export default function Skills() {
  const { theme } = useTheme();
  return theme === 'terminal' ? <TerminalSkills /> : <EditorialSkills />;
}
