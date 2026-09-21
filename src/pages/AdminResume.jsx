import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { supabase } from '../lib/supabase';
import { Link } from 'react-router-dom';
import './Admin.css';

export default function AdminResume() {
  const { user, signOut } = useAuth(true);
  const [content, setContent] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    async function fetchResume() {
      const { data, error } = await supabase.from('resume').select('*').eq('id', 1).maybeSingle();
      if (data) {
        setContent(data.content || '');
        setProfileImage(data.profile_image_url || '');
      }
    }
    fetchResume();
  }, []);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setUploading(true);
      const fileExt = file.name.split('.').pop();
      const fileName = `profile-${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('portfolio-images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from('portfolio-images').getPublicUrl(filePath);
      
      if (data && data.publicUrl) {
        setProfileImage(data.publicUrl);
        setMessage('Image uploaded successfully. Don\'t forget to save changes!');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      setMessage('Error uploading image: ' + error.message);
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage('');
    try {
      const { error } = await supabase
        .from('resume')
        .upsert({ id: 1, content: content, profile_image_url: profileImage });
        
      if (error) throw error;
      setMessage('Resume updated successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      console.error(err);
      setMessage('Failed to update resume.');
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
          <Link to="/admin" className="admin-nav-item">Projects</Link>
          <Link to="/admin/domains" className="admin-nav-item">Domains</Link>
          <Link to="/admin/resume" className="admin-nav-item active">Resume</Link>
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
          <h1>Edit Resume & Profile</h1>
          <button 
            onClick={handleSave} 
            disabled={saving || uploading}
            className="admin-btn admin-btn-primary"
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>

        {message && (
          <div style={{ padding: '1rem', marginBottom: '1.5rem', backgroundColor: message.includes('success') ? 'rgba(0,200,0,0.1)' : 'rgba(255,0,0,0.1)', color: message.includes('success') ? 'green' : 'red', borderRadius: '4px' }}>
            {message}
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '2rem' }}>
          
          {/* Editor Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <h3>Resume Text</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              Enter your resume text below. It will automatically be rendered dynamically based on the active theme.
            </p>
            <textarea 
              value={content}
              onChange={(e) => setContent(e.target.value)}
              style={{ 
                width: '100%', 
                minHeight: '500px', 
                padding: '1rem', 
                fontFamily: 'monospace',
                fontSize: '14px',
                lineHeight: '1.6',
                border: '1px solid var(--border-color)',
                borderRadius: '4px',
                backgroundColor: '#fff',
                color: '#333'
              }}
              placeholder="Type your resume content here..."
            />
          </div>

          {/* Photo Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <h3>Profile Photo</h3>
            <div style={{ 
              border: '1px solid var(--border-color)', 
              borderRadius: '4px', 
              padding: '1rem',
              backgroundColor: '#fff',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1rem'
            }}>
              {profileImage ? (
                <img 
                  src={profileImage} 
                  alt="Profile" 
                  style={{ width: '200px', height: '200px', objectFit: 'cover', borderRadius: '4px', border: '1px solid #eee' }} 
                />
              ) : (
                <div style={{ width: '200px', height: '200px', backgroundColor: '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#aaa', borderRadius: '4px' }}>
                  No Image
                </div>
              )}
              
              <div style={{ width: '100%' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 'bold' }}>Upload New Photo</label>
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handleImageUpload}
                  disabled={uploading}
                  style={{ width: '100%', fontSize: '0.9rem' }}
                />
                {uploading && <span style={{ fontSize: '0.8rem', color: '#666' }}>Uploading...</span>}
              </div>

              <div style={{ width: '100%', marginTop: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 'bold' }}>Or Paste Image URL</label>
                <input 
                  type="text" 
                  value={profileImage}
                  onChange={(e) => setProfileImage(e.target.value)}
                  style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}
                  placeholder="https://..."
                />
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
