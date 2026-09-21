import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { projectService } from '../services/projectService';
import ProjectStatus from '../components/ProjectStatus';
import './ProjectDetail.css';

export default function ProjectDetail() {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);
        const data = await projectService.getProjectBySlug(slug);
        setProject(data);
      } catch (err) {
        console.error(err);
        setError("Project not found");
      } finally {
        setLoading(false);
      }
    };
    
    fetchProject();
  }, [slug]);

  if (loading) return <div className="project-detail-loading"><div className="spinner"></div></div>;
  
  if (error || !project) {
    return (
      <div className="project-detail-error">
        <h2>Project Not Found</h2>
        <p>The project you are looking for does not exist or has been removed.</p>
        <Link to="/" className="back-link">← Back to Home</Link>
      </div>
    );
  }

  return (
    <article className="project-detail fade-in-up">
      <div className="project-detail-nav">
        <Link to="/#projects" className="back-link">← Back</Link>
      </div>
      
      <header className="project-detail-header">
        <div className="project-detail-meta">
          {project.category && <span className="project-category">{project.category}</span>}
          <ProjectStatus status={project.status} />
        </div>
        
        <h1 className="project-title">{project.title}</h1>
        
        <div className="project-links">
          {project.live_url && (
            <a href={project.live_url} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              View Live Demo
            </a>
          )}
          {project.github_url && (
            <a href={project.github_url} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
              View Source
            </a>
          )}
        </div>
      </header>

      {project.cover_image_url && (
        <div className="project-hero-image">
          <img src={project.cover_image_url} alt={`${project.title} cover`} />
        </div>
      )}

      <div className="project-content-grid">
        <div className="project-main-content">
          <h3>Overview</h3>
          <p className="project-description">
            {project.long_description || project.short_description}
          </p>
        </div>
        
        <aside className="project-sidebar">
          {project.technologies && project.technologies.length > 0 && (
            <div className="project-tech-stack">
              <h3>Technologies</h3>
              <div className="tech-tags">
                {project.technologies.map((tech, index) => (
                  <span key={index} className="tech-tag">{tech}</span>
                ))}
              </div>
            </div>
          )}
        </aside>
      </div>

      {project.image_urls && project.image_urls.length > 0 && (
        <section className="project-gallery">
          <h3>Gallery</h3>
          <div className="gallery-grid">
            {project.image_urls.map((url, index) => (
              <div key={index} className="gallery-item">
                <img src={url} alt={`Gallery ${index + 1}`} loading="lazy" />
              </div>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
