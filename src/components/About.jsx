import React from 'react';
import './About.css';
import portfolioData from '../config/portfolio.json';

export default function About() {
  return (
    <section className="about-section" id="about">
      <div className="about-container fade-in-up">
        <h2 className="section-title">About Me</h2>
        
        <div className="about-content">
          <div className="about-text">
            {portfolioData.bio.paragraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
          <div className="about-image-wrapper">
            {/* Placeholder for a portrait or abstract graphic */}
            <div className="about-image-placeholder">
              <span className="about-image-text">
                {portfolioData.firstName.charAt(0)}{portfolioData.lastName.charAt(0)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
