import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import ProjectStatus from './ProjectStatus';
import './ProjectCard.css';

export default function ProjectCard({ project, index }) {
  // Format number as 01, 02, etc.
  const num = String(index + 1).padStart(2, '0');
  
  return (
    <Link to={`/projects/${project.slug}`} className="project-card">
      <div className="project-card-image-wrapper">
        {project.cover_image_url ? (
          <img 
            src={project.cover_image_url} 
            alt={project.title} 
            className="project-card-image" 
          />
        ) : (
          <div className="project-card-image-placeholder">
            <span className="placeholder-text">NO IMAGE</span>
          </div>
        )}
      </div>
      
      <div className="project-card-content">
        <div className="project-card-meta">
          <span className="project-number">{num}</span>
          <span className="meta-divider">—</span>
          {project.category && (
            <span className="project-category">{project.category.toUpperCase()}</span>
          )}
          <span className="meta-divider">/</span>
          <ProjectStatus status={project.status} />
        </div>
        
        <h3 className="project-card-title">{project.title}</h3>
        <p className="project-card-description">{project.short_description}</p>
        
        {project.technologies && project.technologies.length > 0 && (
          <div className="project-card-tech">
            {project.technologies.map((tech, i) => (
              <span key={i} className="tech-tag">{tech}</span>
            ))}
          </div>
        )}

        <div className="project-card-action">
          <ArrowRight className="action-arrow" size={18} strokeWidth={1.5} />
        </div>
      </div>
    </Link>
  );
}
