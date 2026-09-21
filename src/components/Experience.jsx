import React from 'react';
import { useTheme } from '../context/ThemeContext';
import EditorialExperience from './EditorialExperience';
import TerminalExperience from './TerminalExperience';

export default function Experience() {
  const { theme } = useTheme();
  return theme === 'terminal' ? <TerminalExperience /> : <EditorialExperience />;
}
