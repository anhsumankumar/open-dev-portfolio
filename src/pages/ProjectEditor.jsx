import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { projectService } from '../services/projectService';
import { storageService } from '../services/storageService';
import { useAuth } from '../hooks/useAuth';
import './Admin.css';

const INITIAL_STATE = {
  title: '',
  slug: '',
  short_description: '',
  long_description: '',
  category: '',
  status: 'in-development',
  technologies: '',
  cover_image_url: '',
  image_urls: '',
  github_url: '',
  live_url: '',
  featured: false,
  sort_order: 0,
  published: false
};

export default function ProjectEditor() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const { user } = useAuth(true);
  
  const [formData, setFormData] = useState(INITIAL_STATE);
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [coverFile, setCoverFile] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (isEdit) {
      fetchProject();
    }
  }, [id]);

  const fetchProject = async () => {
    try {
      setLoading(true);
      // We need to fetch by ID. The projectService has getProjectBySlug, but we need getProjectById for the editor.
      // Let's use supabase directly here or we can just fetch all and find, or we can assume we add a getProjectById in service
      // Let's implement getting project by ID directly here to save time, or add it to service. 
      // Actually, I can just use projectService.getAllProjects and find it, or update projectService.
      // We'll assume I should have added getProjectById. Let's do it with supabase here directly.
      const { supabase } = await import('../lib/supabase');
      const { data, error } = await supabase.from('projects').select('*').eq('id', id).single();
      if (error) throw error;
      
      setFormData({
        ...data,
        technologies: data.technologies ? data.technologies.join(', ') : '',
        image_urls: data.image_urls ? data.image_urls.join('\n') : ''
      });
    } catch (err) {
      setError("Failed to load project details.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSave = async (e, publish = false) => {
    e?.preventDefault();
    setSaving(true);
    setError(null);
    setMessage('');
    
    try {
      let finalCoverUrl = formData.cover_image_url;
      
      if (coverFile) {
        finalCoverUrl = await storageService.uploadImage(coverFile, 'projects/cover');
      }

      const projectData = {
        ...formData,
        technologies: formData.technologies.split(',').map(t => t.trim()).filter(Boolean),
        image_urls: formData.image_urls.split('\n').map(u => u.trim()).filter(Boolean),
        cover_image_url: finalCoverUrl,
        published: publish ? true : formData.published,
      };

      if (isEdit) {
        await projectService.updateProject(id, projectData);
        setMessage('Project saved successfully.');
      } else {
        await projectService.createProject(projectData);
        navigate('/admin');
      }
    } catch (err) {
      console.error(err);
      setError(err.message || 'Failed to save project');
    } finally {
      setSaving(false);
    }
  };

  if (!user) return null;

  return (
    <div className="admin-layout">
      <div className="admin-sidebar">
        <div className="admin-sidebar-header">
          <h2>Portfolio Admin</h2>
        </div>
        <nav className="admin-nav">
          <Link to="/admin" className="admin-nav-item">Back to Projects</Link>
        </nav>
      </div>
      
      <div className="admin-main">
        <div className="admin-header">
          <h1>{isEdit ? 'Edit Project' : 'Add Project'}</h1>
        </div>

        {error && <div className="admin-error">{error}</div>}
        {message && <div className="admin-success">{message}</div>}

        {loading ? (
          <div>Loading...</div>
        ) : (
          <form className="admin-login-card" style={{maxWidth: '800px'}} onSubmit={(e) => handleSave(e, false)}>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label htmlFor="slug">Slug</label>
              <input type="text" id="slug" name="slug" value={formData.slug} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label htmlFor="short_description">Short Description</label>
              <textarea id="short_description" name="short_description" value={formData.short_description} onChange={handleChange} rows="2" required />
            </div>

            <div className="form-group">
              <label htmlFor="long_description">Long Description</label>
              <textarea id="long_description" name="long_description" value={formData.long_description} onChange={handleChange} rows="6" />
            </div>

            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem'}}>
              <div className="form-group">
                <label htmlFor="category">Category</label>
                <input type="text" id="category" name="category" value={formData.category} onChange={handleChange} />
              </div>

              <div className="form-group">
                <label htmlFor="status">Status</label>
                <select id="status" name="status" value={formData.status} onChange={handleChange}>
                  <option value="completed">Completed</option>
                  <option value="in-development">In Development</option>
                  <option value="research">Research</option>
                  <option value="archived">Archived</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="technologies">Technologies (comma separated)</label>
              <input type="text" id="technologies" name="technologies" value={formData.technologies} onChange={handleChange} />
            </div>

            <div className="form-group">
              <label>Cover Image</label>
              {formData.cover_image_url && (
                <div style={{marginBottom: '0.5rem'}}>
                  <img src={formData.cover_image_url} alt="Cover" style={{height: '100px', borderRadius: '4px'}} />
                </div>
              )}
              <input type="file" accept="image/*" onChange={(e) => setCoverFile(e.target.files[0])} />
            </div>

            <div className="form-group">
              <label htmlFor="image_urls">Gallery Image URLs (one per line)</label>
              <textarea id="image_urls" name="image_urls" value={formData.image_urls} onChange={handleChange} rows="3" />
            </div>

            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem'}}>
              <div className="form-group">
                <label htmlFor="github_url">GitHub URL</label>
                <input type="url" id="github_url" name="github_url" value={formData.github_url} onChange={handleChange} />
              </div>

              <div className="form-group">
                <label htmlFor="live_url">Live URL</label>
                <input type="url" id="live_url" name="live_url" value={formData.live_url} onChange={handleChange} />
              </div>
            </div>

            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem'}}>
              <div className="form-group" style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                <input type="checkbox" id="featured" name="featured" checked={formData.featured} onChange={handleChange} style={{width: 'auto'}} />
                <label htmlFor="featured" style={{margin: 0}}>Featured</label>
              </div>

              <div className="form-group" style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                <input type="checkbox" id="published" name="published" checked={formData.published} onChange={handleChange} style={{width: 'auto'}} />
                <label htmlFor="published" style={{margin: 0}}>Published</label>
              </div>

              <div className="form-group">
                <label htmlFor="sort_order">Sort Order</label>
                <input type="number" id="sort_order" name="sort_order" value={formData.sort_order} onChange={handleChange} />
              </div>
            </div>

            <div style={{display: 'flex', gap: '1rem', marginTop: '2rem'}}>
              <button type="submit" className="admin-btn admin-btn-primary" disabled={saving}>
                {saving ? 'Saving...' : 'Save'}
              </button>
              <button type="button" className="admin-btn admin-btn-secondary" onClick={(e) => handleSave(e, true)} disabled={saving}>
                Save & Publish
              </button>
              <Link to="/admin" className="admin-btn admin-btn-secondary" style={{marginLeft: 'auto'}}>
                Cancel
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
