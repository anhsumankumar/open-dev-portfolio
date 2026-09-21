import React from 'react';
import './TerminalProjectGrid.css';

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

export default function TerminalSkills() {
  return (
    <div className="t-section reveal reveal-up" id="skills">
      <div className="t-section-header">
        <span className="t-orange">// 05</span> 
        <h2>CAPABILITIES_MATRIX</h2>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
        {SKILL_CATEGORIES.map((cat, idx) => (
          <div key={idx} style={{ border: '1px solid var(--t-border)', padding: '1.5rem', background: 'rgba(255,255,255,0.02)' }}>
            <h3 style={{ color: 'var(--t-orange)', marginBottom: '1.5rem', fontSize: '1rem', borderBottom: '1px dashed var(--t-border)', paddingBottom: '0.5rem' }}>
              [{String(idx + 1).padStart(2, '0')}] {cat.title.toUpperCase()}
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', color: 'var(--t-text-secondary)' }}>
              {cat.skills.map((skill, sIdx) => (
                <div key={sIdx} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ color: 'var(--t-orange)', fontSize: '0.8rem' }}>&gt;</span>
                  <span style={{ fontSize: '0.9rem' }}>{skill}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}