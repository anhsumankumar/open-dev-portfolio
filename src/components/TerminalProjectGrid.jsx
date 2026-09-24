import React from 'react';
import { useProjects } from '../hooks/useProjects';
import './TerminalProjectGrid.css';

export default function TerminalProjectGrid() {
  const { projects, loading } = useProjects(true);

  return (
    <div className="t-section reveal reveal-up" id="projects">
      <div className="t-section-header">
        <span className="t-orange">// 03</span> 
        <h2>SYSTEM_PROJECTS_DIR</h2>
      </div>
      
      <div className="t-projects-list">
        {loading ? (
          <div className="t-loading">FETCHING_DATA...</div>
        ) : (
          projects.map((proj, idx) => (
            <div key={proj.id} className="t-project-row">
              <div className="t-hex-code" style={{color:'var(--t-text-secondary)', fontSize:'0.7rem', width:'80px'}}>
                0x{Math.random().toString(16).substr(2, 4).toUpperCase()}
              </div>
              <div className="t-proj-id">[ PRJ_{String(idx+1).padStart(3, '0')} ]</div>
              <div className="t-proj-title">{proj.title?.toUpperCase()}</div>
              <div className="t-proj-status t-orange">STATUS: {proj.status?.toUpperCase()}</div>
              <a href={`/projects/${proj.slug}`} className="t-proj-link">&gt; EXECUTE</a>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
