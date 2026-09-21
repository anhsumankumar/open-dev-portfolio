import React from 'react';
import './Hero.css';
import portfolioData from '../config/portfolio.json';

export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-content">
        <div className="hero-text fade-in-up">
          <p className="hero-greeting">Hello, I'm</p>
          <h1 className="hero-title">
            {portfolioData.firstName}<br />{portfolioData.lastName}
          </h1>
          <h2 className="hero-subtitle">Software Engineer & Problem Solver.</h2>
          <div className="hero-cta delay-2">
            <a href="#projects" className="btn btn-primary">View Work</a>
            <a href="#contact" className="btn btn-secondary">Get in Touch</a>
          </div>
        </div>
        <div className="hero-image image-reveal delay-1">
          {/* Using a sleek placeholder for the portrait */}
          <div className="portrait-placeholder">
            <div className="abstract-shape shape-1"></div>
            <div className="abstract-shape shape-2"></div>
            <div className="abstract-shape shape-3"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
