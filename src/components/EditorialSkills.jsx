import React from 'react';
import './Skills.css';
import { useProfileData } from '../context/ProfileContext';

export default function Skills() {
  const portfolioData = useProfileData();
  return (
    <section className="skills-section" id="skills">
      <div className="skills-container fade-in-up">
        <h2 className="section-title">Technical Expertise</h2>
        
        <div className="skills-grid">
          {portfolioData.skills?.map((category, index) => (
            <div key={index} className="skill-category">
              <h3 className="category-title">{category.title}</h3>
              <ul className="skill-list">
                {category.items?.map((skill, idx) => (
                  <li key={idx} className="skill-item">{skill}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
