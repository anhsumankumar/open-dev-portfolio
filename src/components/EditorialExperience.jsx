import React from 'react';
import './Experience.css';
import { useProfileData } from '../context/ProfileContext';

export default function Experience() {
  const portfolioData = useProfileData();
  return (
    <section className="experience-section" id="experience">
      <div className="experience-container fade-in-up">
        <h2 className="section-title">Experience</h2>
        
        <div className="experience-timeline">
          {portfolioData.experience?.map((exp) => (
            <div key={exp.id} className="timeline-item">
              <div className="timeline-meta">
                {exp.period && <span className="timeline-period">{exp.period}</span>}
                {exp.company && <span className="timeline-company">{exp.company}</span>}
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
