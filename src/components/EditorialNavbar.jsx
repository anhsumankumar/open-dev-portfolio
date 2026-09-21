import React from 'react';
import './EditorialNavbar.css';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
  return (
    <nav className="navbar fade-in-up">
      <div className="nav-left">
        <a href="/" className="logo">AK</a>
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
        <a href="https://mail.google.com/mail/?view=cm&fs=1&to=anshumankumartech07@gmail.com" target="_blank" rel="noopener noreferrer" className="build-link">Let's Build</a>
        <span className="indicator"></span>
      </div>
    </nav>
  );
}
