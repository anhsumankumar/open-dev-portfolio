import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useDomains } from '../hooks/useDomains';
import { domainService } from '../services/domainService';
import { Link } from 'react-router-dom';
import './Admin.css';

export default function AdminDomains() {
  const { user, signOut } = useAuth(true);
  const { domains, loading, error, refreshDomains } = useDomains();
  
  const [isEditing, setIsEditing] = useState(false);
  const [currentDomain, setCurrentDomain] = useState({ id: null, name: '', description: '' });

  const handleAdd = () => {
    setIsEditing(true);
    setCurrentDomain({ id: null, name: '', description: '' });
  };

  const handleEdit = (domain) => {
    setIsEditing(true);
    setCurrentDomain(domain);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this domain?")) {
      try {
        await domainService.deleteDomain(id);
        refreshDomains();
      } catch (err) {
        alert("Failed to delete domain");
      }
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      if (currentDomain.id) {
        await domainService.updateDomain(currentDomain.id, {
          name: currentDomain.name,
          description: currentDomain.description
        });
      } else {
        await domainService.createDomain({
          name: currentDomain.name,
          description: currentDomain.description
        });
      }
      setIsEditing(false);
      refreshDomains();
    } catch (err) {
      alert("Failed to save domain: " + err.message);
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
          <Link to="/admin" className="admin-nav-item">Projects</Link>
          <Link to="/admin/domains" className="admin-nav-item active">Domains</Link>
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
          <h1>Manage Domains</h1>
          {!isEditing && (
            <button onClick={handleAdd} className="admin-btn admin-btn-primary">
              + Add Domain
            </button>
          )}
        </div>

        {error && <div className="admin-error">{error}</div>}
        
        {isEditing ? (
          <div className="admin-form-container" style={{backgroundColor: 'var(--bg)', padding: '2rem', border: '1px solid var(--border)', borderRadius: '8px'}}>
            <h2>{currentDomain.id ? 'Edit Domain' : 'New Domain'}</h2>
            <form onSubmit={handleSave} style={{display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem'}}>
              <div>
                <label style={{display: 'block', marginBottom: '0.5rem'}}>Domain Name (e.g. AI, Software)</label>
                <input 
                  type="text" 
                  value={currentDomain.name} 
                  onChange={e => setCurrentDomain({...currentDomain, name: e.target.value})}
                  required
                  style={{width: '100%', padding: '0.75rem', background: 'var(--code-bg)', border: '1px solid var(--border)', color: 'var(--text-h)', borderRadius: '4px'}}
                />
              </div>
              <div>
                <label style={{display: 'block', marginBottom: '0.5rem'}}>Description</label>
                <textarea 
                  value={currentDomain.description} 
                  onChange={e => setCurrentDomain({...currentDomain, description: e.target.value})}
                  required
                  rows={4}
                  style={{width: '100%', padding: '0.75rem', background: 'var(--code-bg)', border: '1px solid var(--border)', color: 'var(--text-h)', borderRadius: '4px'}}
                />
              </div>
              <div style={{display: 'flex', gap: '1rem', marginTop: '1rem'}}>
                <button type="submit" className="admin-btn admin-btn-primary">Save Domain</button>
                <button type="button" onClick={() => setIsEditing(false)} className="admin-btn admin-btn-secondary">Cancel</button>
              </div>
            </form>
          </div>
        ) : (
          <div className="admin-table-container">
            {loading ? (
              <div style={{padding: '2rem', textAlign: 'center'}}>Loading domains...</div>
            ) : (
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th style={{width: '150px'}}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {domains.length === 0 ? (
                    <tr>
                      <td colSpan="3" style={{textAlign: 'center'}}>No domains found. Create one!</td>
                    </tr>
                  ) : (
                    domains.map(domain => (
                      <tr key={domain.id}>
                        <td><strong>{domain.name}</strong></td>
                        <td>{domain.description}</td>
                        <td>
                          <button 
                            onClick={() => handleEdit(domain)}
                            className="admin-btn admin-btn-secondary"
                            style={{marginRight: '0.5rem', padding: '0.25rem 0.5rem', fontSize: '0.875rem'}}
                          >
                            Edit
                          </button>
                          <button 
                            onClick={() => handleDelete(domain.id)}
                            className="admin-btn admin-btn-danger"
                            style={{padding: '0.25rem 0.5rem', fontSize: '0.875rem'}}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
