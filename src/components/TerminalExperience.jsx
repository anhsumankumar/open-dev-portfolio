import React from 'react';
import './TerminalProjectGrid.css';

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

export default function TerminalExperience() {
  return (
    <div className="t-section reveal reveal-up" id="experience">
      <div className="t-section-header">
        <span className="t-orange">// 04</span> 
        <h2>EXECUTION_LOGS [LAB]</h2>
      </div>
      <div className="t-projects-list">
        {EXPERIENCES.map((exp, idx) => (
          <div key={exp.id} className="t-project-row" style={{ display: 'block', padding: '1.5rem', marginBottom: '1rem', border: '1px solid var(--t-border)', background: 'rgba(255,255,255,0.02)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <div className="t-proj-title" style={{ fontSize: '1.2rem', color: 'var(--t-orange)' }}>&gt; {exp.role.toUpperCase()}</div>
              <div style={{ color: 'var(--t-text-secondary)', fontSize: '0.85rem' }}>[{exp.period}]</div>
            </div>
            <div style={{ color: 'var(--t-text-primary)', marginBottom: '1rem', fontWeight: 'bold' }}>@ {exp.company.toUpperCase()}</div>
            <div style={{ color: 'var(--t-text-secondary)', fontSize: '0.95rem', lineHeight: '1.6' }}>
              // {exp.description}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}