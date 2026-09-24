import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { supabase } from '../lib/supabase';
import { Link } from 'react-router-dom';
import './Admin.css';

export default function AdminProfile() {
  const { user, signOut } = useAuth(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  
  // Basic Profile
  const [profile, setProfile] = useState({
    full_name: '',
    first_name: '',
    last_name: '',
    email: '',
  });

  // Complex Fields
  const [bioText, setBioText] = useState('');
  const [socials, setSocials] = useState({ github: '', linkedin: '', twitter: '' });
  
  const [skills, setSkills] = useState([]); // [{ title: '', itemsString: '' }]
  const [experiences, setExperiences] = useState([]);

  useEffect(() => {
    async function fetchProfile() {
      const { data } = await supabase.from('profile').select('*').eq('id', 1).maybeSingle();
      if (data) {
        setProfile({
          full_name: data.full_name || '',
          first_name: data.first_name || '',
          last_name: data.last_name || '',
          email: data.email || '',
        });
        
        // Parse Bio
        if (data.bio && data.bio.paragraphs) {
          setBioText(data.bio.paragraphs.join('\n\n'));
        }

        // Parse Socials
        if (data.socials) {
          setSocials({
            github: data.socials.github || '',
            linkedin: data.socials.linkedin || '',
            twitter: data.socials.twitter || '',
          });
        }

        // Parse Skills
        if (data.skills && Array.isArray(data.skills)) {
          setSkills(data.skills.map(s => ({
            title: s.title || '',
            itemsString: s.items ? s.items.join(', ') : ''
          })));
        }

        // Parse Experiences
        if (data.experience && Array.isArray(data.experience)) {
          setExperiences(data.experience);
        }
      }
    }
    fetchProfile();
  }, []);

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleSocialChange = (e) => {
    const { name, value } = e.target;
    setSocials(prev => ({ ...prev, [name]: value }));
  };

  // --- Skills Management ---
  const addSkillCategory = () => setSkills([...skills, { title: '', itemsString: '' }]);
  const updateSkill = (index, field, value) => {
    const newSkills = [...skills];
    newSkills[index][field] = value;
    setSkills(newSkills);
  };
  const removeSkill = (index) => setSkills(skills.filter((_, i) => i !== index));

  // --- Experience Management ---
  const addExperience = () => setExperiences([...experiences, { role: '', company: '', period: '', description: '' }]);
  const updateExperience = (index, field, value) => {
    const newExp = [...experiences];
    newExp[index][field] = value;
    setExperiences(newExp);
  };
  const removeExperience = (index) => setExperiences(experiences.filter((_, i) => i !== index));

  // --- Save Logic ---
  const handleSave = async () => {
    setSaving(true);
    setMessage('');
    try {
      
      // Format Bio
      const formattedBio = {
        paragraphs: bioText.split('\n').map(p => p.trim()).filter(p => p !== '')
      };

      // Format Skills
      const formattedSkills = skills.map(s => ({
        title: s.title,
        items: s.itemsString.split(',').map(item => item.trim()).filter(item => item !== '')
      }));

      // Ensure Experiences have IDs (just sequential for rendering keys)
      const formattedExperiences = experiences.map((exp, idx) => ({
        ...exp,
        id: idx + 1
      }));

      const payload = {
        id: 1,
        full_name: profile.full_name,
        first_name: profile.first_name,
        last_name: profile.last_name,
        email: profile.email,
        bio: formattedBio,
        socials: socials,
        experience: formattedExperiences,
        skills: formattedSkills
      };

      const { error } = await supabase.from('profile').upsert(payload);
      if (error) throw error;
      
      setMessage('Profile updated successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      console.error(err);
      setMessage('Failed to update profile.');
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
          <Link to="/admin/resume" className="admin-nav-item">Resume</Link>
          <Link to="/admin/profile" className="admin-nav-item active">Profile</Link>
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
          <h1>Edit Profile</h1>
          <button onClick={handleSave} disabled={saving} className="admin-btn admin-btn-primary">
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>

        {message && (
          <div style={{ padding: '1rem', marginBottom: '1.5rem', backgroundColor: message.includes('success') ? 'rgba(0,200,0,0.1)' : 'rgba(255,0,0,0.1)', color: message.includes('success') ? 'green' : 'red', borderRadius: '4px' }}>
            {message}
          </div>
        )}

        <div style={{ display: 'grid', gap: '2rem' }}>
          
          {/* BASIC INFO */}
          <section className="admin-card">
            <h2 style={{ marginBottom: '1rem', fontSize: '1.2rem' }}>Basic Information</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
              <div>
                <label>Full Name</label>
                <input name="full_name" value={profile.full_name} onChange={handleProfileChange} style={inputStyle} />
              </div>
              <div>
                <label>Email</label>
                <input name="email" value={profile.email} onChange={handleProfileChange} style={inputStyle} />
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label>First Name</label>
                <input name="first_name" value={profile.first_name} onChange={handleProfileChange} style={inputStyle} />
              </div>
              <div>
                <label>Last Name</label>
                <input name="last_name" value={profile.last_name} onChange={handleProfileChange} style={inputStyle} />
              </div>
            </div>
          </section>

          {/* BIO */}
          <section className="admin-card">
            <h2 style={{ marginBottom: '1rem', fontSize: '1.2rem' }}>About Me (Bio)</h2>
            <p style={{ fontSize: '0.85rem', color: '#666', marginBottom: '0.5rem' }}>Separate paragraphs with a blank line.</p>
            <textarea value={bioText} onChange={(e) => setBioText(e.target.value)} style={textareaStyle} rows={6} placeholder="Write your bio here..." />
          </section>

          {/* SOCIAL LINKS */}
          <section className="admin-card">
            <h2 style={{ marginBottom: '1rem', fontSize: '1.2rem' }}>Social Links</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
              <div>
                <label>GitHub Profile URL</label>
                <input name="github" value={socials.github} onChange={handleSocialChange} style={inputStyle} placeholder="https://github.com/..." />
              </div>
              <div>
                <label>LinkedIn Profile URL</label>
                <input name="linkedin" value={socials.linkedin} onChange={handleSocialChange} style={inputStyle} placeholder="https://linkedin.com/in/..." />
              </div>
              <div>
                <label>Twitter/X Profile URL</label>
                <input name="twitter" value={socials.twitter} onChange={handleSocialChange} style={inputStyle} placeholder="https://twitter.com/..." />
              </div>
            </div>
          </section>

          {/* SKILLS */}
          <section className="admin-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h2 style={{ fontSize: '1.2rem' }}>Skills</h2>
              <button onClick={addSkillCategory} className="admin-btn admin-btn-secondary" style={{ padding: '0.3rem 0.6rem', fontSize: '0.8rem' }}>+ Add Skill Category</button>
            </div>
            {skills.map((skill, index) => (
              <div key={index} style={{ padding: '1rem', border: '1px solid #ddd', borderRadius: '4px', marginBottom: '1rem', background: '#fafafa' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', marginBottom: '0.5rem' }}>
                  <div style={{ flex: 1 }}>
                    <label>Category Title (e.g., Frontend)</label>
                    <input value={skill.title} onChange={(e) => updateSkill(index, 'title', e.target.value)} style={inputStyle} />
                  </div>
                  <button onClick={() => removeSkill(index)} style={deleteBtnStyle}>Remove</button>
                </div>
                <div>
                  <label>Skills (Comma separated, e.g., React, Node.js, Python)</label>
                  <input value={skill.itemsString} onChange={(e) => updateSkill(index, 'itemsString', e.target.value)} style={inputStyle} />
                </div>
              </div>
            ))}
            {skills.length === 0 && <p style={{ color: '#666' }}>No skills added yet.</p>}
          </section>

          {/* EXPERIENCE */}
          <section className="admin-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h2 style={{ fontSize: '1.2rem' }}>Experience</h2>
              <button onClick={addExperience} className="admin-btn admin-btn-secondary" style={{ padding: '0.3rem 0.6rem', fontSize: '0.8rem' }}>+ Add Experience</button>
            </div>
            {experiences.map((exp, index) => (
              <div key={index} style={{ padding: '1rem', border: '1px solid #ddd', borderRadius: '4px', marginBottom: '1rem', background: '#fafafa' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr auto', gap: '1rem', marginBottom: '1rem' }}>
                  <div>
                    <label>Role / Title</label>
                    <input value={exp.role} onChange={(e) => updateExperience(index, 'role', e.target.value)} style={inputStyle} />
                  </div>
                  <div>
                    <label>Company (Optional)</label>
                    <input value={exp.company} onChange={(e) => updateExperience(index, 'company', e.target.value)} style={inputStyle} />
                  </div>
                  <div>
                    <label>Period (Optional, e.g. 2021 - Present)</label>
                    <input value={exp.period} onChange={(e) => updateExperience(index, 'period', e.target.value)} style={inputStyle} />
                  </div>
                  <div style={{ display: 'flex', alignItems: 'flex-end' }}>
                    <button onClick={() => removeExperience(index)} style={deleteBtnStyle}>Remove</button>
                  </div>
                </div>
                <div>
                  <label>Description</label>
                  <textarea value={exp.description} onChange={(e) => updateExperience(index, 'description', e.target.value)} style={textareaStyle} rows={3} />
                </div>
              </div>
            ))}
            {experiences.length === 0 && <p style={{ color: '#666' }}>No experience added yet.</p>}
          </section>

        </div>
      </div>
    </div>
  );
}

const inputStyle = { width: '100%', padding: '0.75rem', border: '1px solid var(--border-color)', borderRadius: '4px' };
const textareaStyle = { ...inputStyle, fontFamily: 'inherit' };
const deleteBtnStyle = { background: '#fef2f2', color: '#ef4444', border: '1px solid #fecaca', padding: '0.75rem', borderRadius: '4px', cursor: 'pointer', height: 'fit-content', marginTop: '1.2rem' };
