import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Hero.css';
import HeroStats from './HeroStats';
import EditorialImage from './EditorialImage';
import portfolioData from '../config/portfolio.json';

export default function Hero() {
  const navigate = useNavigate();
  return (
    <main className="hero">
      <div className="hero-left">
        <div className="section-indicator reveal reveal-up delay-100">
          <span className="current">01</span>
          <span className="separator">/</span>
          <span className="total">06</span>
        </div>

        <h1 className="hero-title reveal reveal-up delay-200">
          {portfolioData.firstName}<br />{portfolioData.lastName}
        </h1>

        <div className="hero-description reveal reveal-up delay-300">
          <p className="primary-desc">Engineer, Builder, Problem Solver.</p>
          <p className="secondary-desc">
            {portfolioData.bio.paragraphs[0]}
          </p>
        </div>

        <div className="hero-actions reveal reveal-up delay-400 text-shimmer">
          <button className="btn btn-primary" onClick={() => document.getElementById('projects')?.scrollIntoView({behavior: 'smooth'})}>
            Explore My Work <span className="arrow">→</span>
          </button>
          <button className="btn btn-secondary" onClick={() => navigate('/resume')}>
            View Resume
          </button>
        </div>

        <div className="reveal reveal-up delay-400 text-shimmer">
          <HeroStats />
        </div>
      </div>

      <div className="hero-right">
        <EditorialImage />
      </div>
    </main>
  );
}
