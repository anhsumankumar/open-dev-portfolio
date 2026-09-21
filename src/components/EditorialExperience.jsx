import React from 'react';
import './Experience.css';
import portfolioData from '../config/portfolio.json';

export default function Experience() {
  return (
    <section className="experience-section" id="experience">
      <div className="experience-container fade-in-up">
        <h2 className="section-title">Experience</h2>
        
        <div className="experience-timeline">
          {portfolioData.experience.map((exp) => (
            <div key={exp.id} className="timeline-item">
              <div className="timeline-meta">
                <span className="timeline-period">{exp.period}</span>
                <span className="timeline-company">{exp.company}</span>
              </div>
              <div className="timeline-content">
                <h3 className="timeline-role">{exp.role}</h3>
                <p className="timeline-desc">{exp.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
