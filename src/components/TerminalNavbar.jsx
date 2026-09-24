import React from 'react';
import ThemeToggle from './ThemeToggle';
import './TerminalNavbar.css';
import logoConfig from '../config/logo.json';

export default function TerminalNavbar() {
  const initials = logoConfig.logoText;

  return (
    <div className="t-nav-container t-animate">
      <div className="t-nav-top-strip">
        <div className="t-nav-info">
          <span className="t-orange">02</span>
          <span className="t-separator">/</span>
          <span>TERMINAL / ENGINEERING INTERFACE</span>
        </div>
        <div className="t-nav-sys">
          // SCROLL_TO_EXPLORE
        </div>
      </div>
      
      <div className="t-nav-main">
        <div className="t-nav-left">
          <div className="t-logo">{initials}</div>
          <div className="t-role">ENGINEER :: DEVELOPER :: BUILDER</div>
        </div>
        <div className="t-nav-right">
          <nav className="t-links">
            <a href="#home" className="active">[01] HOME</a>
            <a href="#about">[02] ABOUT</a>
            <a href="#projects">[03] PROJECTS</a>
            <a href="#experience">[04] LAB</a>
            <a href="#skills">[05] SKILLS</a>
            <a href="#contact">[06] CONTACT</a>
          </nav>
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
}
