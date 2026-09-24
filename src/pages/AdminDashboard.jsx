import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { useProjects } from '../hooks/useProjects';
import { Link } from 'react-router-dom';
import { projectService } from '../services/projectService';
import './Admin.css';

export default function AdminDashboard() {
  const { user, signOut } = useAuth(true); // require auth
  const { projects, loading, error, refreshProjects } = useProjects(false); // fetch all projects

  const handlePublishToggle = async (project) => {
    try {
      await projectService.updateProject(project.id, { published: !project.published });
      refreshProjects();
    } catch (err) {
      alert("Failed to update publish status");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      try {
        await projectService.deleteProject(id);
        refreshProjects();
      } catch (err) {
        alert("Failed to delete project");
      }
    }
  };

  if (!user) return null; // handled by useAuth redirect

  return (
    <div className="admin-layout">
      <div className="admin-sidebar">
        <div className="admin-sidebar-header">
          <h2>Portfolio Admin</h2>
        </div>
        <nav className="admin-nav">
          <Link to="/admin" className="admin-nav-item active">Projects</Link>
          <Link to="/admin/domains" className="admin-nav-item">Domains</Link>
          <Link to="/admin/resume" className="admin-nav-item">Resume</Link>
          <Link to="/admin/profile" className="admin-nav-item">Profile</Link>
          <a href="/" target="_blank" rel="noopener noreferrer" className="admin-nav-item">View Site</a>
        </nav>
        <div className="admin-logout">
          <button onClick={signOut} className="admin-btn admin-btn-secondary" style={{width: '100%'}}>
            Logout
          </button>
        </div>
      </div>
      
      <div className="admin-main">
        <div className="admin-header">
          <h1>Projects</h1>
          <Link to="/admin/projects/new" className="admin-btn admin-btn-primary">
            + Add Project
          </Link>
        </div>

        {error && <div className="admin-error">{error}</div>}
        
        <div className="admin-table-container">
          {loading ? (
            <div style={{padding: '2rem', textAlign: 'center'}}>Loading projects...</div>
          ) : (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Project</th>
                  <th>Status</th>
                  <th>Order</th>
                  <th>Published</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {projects.length === 0 ? (
                  <tr>
                    <td colSpan="5" style={{textAlign: 'center'}}>No projects found. Create one!</td>
                  </tr>
                ) : (
                  projects.map(project => (
                    <tr key={project.id}>
                      <td>
                        <strong>{project.title}</strong>
                        {project.featured && <span style={{marginLeft: '0.5rem', fontSize: '0.75rem', backgroundColor: '#fef3c7', color: '#92400e', padding: '0.1rem 0.3rem', borderRadius: '4px'}}>Featured</span>}
                      </td>
                      <td>{project.status}</td>
                      <td>{project.sort_order}</td>
                      <td>
                        <span className={`status-badge ${project.published ? 'published' : 'draft'}`}>
                          {project.published ? 'Published' : 'Draft'}
                        </span>
                      </td>
                      <td>
                        <div className="admin-actions">
                          <button 
                            onClick={() => handlePublishToggle(project)}
                            className="admin-btn admin-btn-secondary"
                            style={{padding: '0.4rem 0.75rem', fontSize: '0.8rem'}}
                          >
                            {project.published ? 'Unpublish' : 'Publish'}
                          </button>
                          <Link 
                            to={`/admin/projects/${project.id}/edit`}
                            className="admin-btn admin-btn-secondary"
                            style={{padding: '0.4rem 0.75rem', fontSize: '0.8rem'}}
                          >
                            Edit
                          </Link>
                          <button 
                            onClick={() => handleDelete(project.id)}
                            className="admin-btn admin-btn-danger"
                            style={{padding: '0.4rem 0.75rem', fontSize: '0.8rem'}}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
