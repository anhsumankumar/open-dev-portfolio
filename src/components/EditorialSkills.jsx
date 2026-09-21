import React from 'react';
import './EditorialSkills.css';

const SKILL_CATEGORIES = [
  {
    title: "Frontend Development",
    skills: ["React", "Next.js", "JavaScript (ES6+)", "HTML5/CSS3", "Tailwind CSS", "Framer Motion"]
  },
  {
    title: "Backend & Cloud",
    skills: ["Node.js", "Express", "Python", "Supabase", "Firebase", "PostgreSQL", "REST APIs"]
  },
  {
    title: "Hardware & Electronics",
    skills: ["C/C++", "Arduino", "Raspberry Pi", "IoT Protocols", "PCB Design Basics"]
  },
  {
    title: "Tools & Methodologies",
    skills: ["Git", "GitHub Actions", "Docker", "Agile/Scrum", "Figma"]
  }
];

export default function Skills() {
  return (
    <section className="skills-section" id="skills">
      <div className="skills-container fade-in-up">
        <h2 className="section-title">Technical Expertise</h2>
        
        <div className="skills-grid">
          {SKILL_CATEGORIES.map((category, index) => (
            <div key={index} className="skill-category">
              <h3 className="category-title">{category.title}</h3>
              <ul className="skill-list">
                {category.skills.map((skill, idx) => (
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
