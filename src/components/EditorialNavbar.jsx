import React from 'react';
import './EditorialNavbar.css';
import ThemeToggle from './ThemeToggle';
import { useProfileData } from '../context/ProfileContext';
import logoConfig from '../config/logo.json';

export default function Navbar() {
  const portfolioData = useProfileData();
  const initials = logoConfig.logoText;
  return (
    <nav className="navbar fade-in-up">
      <div className="nav-left">
        <a href="/" className="logo">{initials}</a>
        <div className="divider"></div>
        <ul className="nav-links">
          <li><a href="/" className="active">Home</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#projects">Projects</a></li>
          <li><a href="#experience">Experience</a></li>
          <li><a href="#skills">Skills</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </div>
      
      <div className="nav-right">
        <ThemeToggle />
        <a href={`https://mail.google.com/mail/?view=cm&fs=1&to=${portfolioData.email}`} target="_blank" rel="noopener noreferrer" className="build-link">Let's Build</a>
        <span className="indicator"></span>
      </div>
    </nav>
  );
}
