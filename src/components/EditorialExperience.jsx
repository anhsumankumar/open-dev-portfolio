import React from 'react';
import './EditorialExperience.css';

const EXPERIENCES = [
  {
    id: 1,
    role: "Full Stack Developer",
    company: "Freelance",
    period: "2023 - Present",
    description: "Developing custom web applications, e-commerce solutions, and administrative dashboards for various clients using modern web technologies.",
  },
  {
    id: 2,
    role: "Project Lead",
    company: "SDCET Connect",
    period: "2023 - 2024",
    description: "Led a team of students in developing a comprehensive digital ecosystem for the college community, focusing on architecture and deployment.",
  },
  {
    id: 3,
    role: "Electronics Hobbyist",
    company: "Personal Projects",
    period: "2021 - Present",
    description: "Designing and building embedded systems, IoT devices, and automated hardware projects.",
  }
];

export default function Experience() {
  return (
    <section className="experience-section" id="experience">
      <div className="experience-container fade-in-up">
        <h2 className="section-title">Experience</h2>
        
        <div className="experience-timeline">
          {EXPERIENCES.map((exp) => (
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
