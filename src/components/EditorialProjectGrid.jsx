import React from 'react';
import { useProjects } from '../hooks/useProjects';
import ProjectCard from './ProjectCard';
import './EditorialProjectGrid.css';

export default function ProjectGrid() {
  const { projects, loading, error } = useProjects(true);

  if (error) {
    return (
      <section className="projects-section">
        <div className="projects-container">
          <div className="projects-error">
            <p>Developer Notice: Could not load projects.</p>
            <p className="error-details">{error}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="projects-section" id="projects">
      <div className="projects-container reveal reveal-up">
        
        <header className="projects-header">
          <span className="projects-label">02 / PROJECTS</span>
          <h2 className="projects-title">Featured Work</h2>
          <p className="projects-subtitle">Selected systems, experiments and products I've built.</p>
          <hr className="projects-divider" />
        </header>
        
        {loading ? (
          <div className="projects-loading">
            <div className="spinner"></div>
            <p>Loading projects...</p>
          </div>
        ) : projects.length === 0 ? (
          <div className="projects-empty">
            <p>No projects to display right now. Check back soon!</p>
          </div>
        ) : (
          <div className="projects-content-wrapper">
            <div className="projects-sidebar-decor">
              <div className="decor-line"></div>
              <span className="decor-text">INDEX // 2026</span>
              <div className="decor-symbols">
                <span>+</span>
                <span>+</span>
                <span>+</span>
              </div>
              <div className="decor-line"></div>
            </div>

            <div className="project-grid">
              {projects.map((project, index) => (
                <div className={`reveal reveal-up delay-${(index % 4 + 1) * 100}`} key={project.id}><ProjectCard project={project} index={index} /></div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
