import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useTheme } from '../context/ThemeContext';
import { Link } from 'react-router-dom';

export default function Resume() {
  const { theme } = useTheme();
  const [content, setContent] = useState('Loading resume data...');
  const [profileImage, setProfileImage] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
    async function fetchResume() {
      const { data, error } = await supabase.from('resume').select('*').eq('id', 1).maybeSingle();
      if (error) {
        console.error('Error fetching resume:', error);
        setContent('Error loading resume from database. Please ensure the "resume" table is created and contains id=1.');
      } else if (data) {
        setContent(data.content);
        if (data.profile_image_url) setProfileImage(data.profile_image_url);
      }
    }
    fetchResume();
  }, []);

  if (theme === 'terminal') {
    return (
      <div className="terminal-layout" style={{ paddingTop: '8rem' }}>
        <div style={{ marginBottom: '2rem' }}>
          <Link to="/" style={{ color: 'var(--t-text-secondary)', textDecoration: 'none' }}>[ &larr; BACK_TO_HOME ]</Link>
        </div>
        <div style={{ padding: '2rem', border: '1px solid var(--t-border)', whiteSpace: 'pre-wrap', lineHeight: '1.6', background: 'var(--t-panel)' }}>
          
          {profileImage && (
            <div style={{ marginBottom: '2rem', display: 'flex', gap: '2rem', alignItems: 'flex-start', paddingBottom: '2rem', borderBottom: '1px dashed var(--t-border)' }}>
              <div style={{ border: '1px solid var(--t-orange)', padding: '0.5rem', width: '150px', flexShrink: 0, position: 'relative' }}>
                <img src={profileImage} alt="Profile" style={{ width: '100%', display: 'block', filter: 'grayscale(30%)' }} />
              </div>
              <div style={{ color: 'var(--t-orange)', fontSize: '0.9rem', fontFamily: 'var(--t-mono)' }}>
                <p>&gt; FILE_TYPE: DOSSIER</p>
                <p>&gt; ID_MATCH: CONFIRMED</p>
              </div>
            </div>
          )}
  
          <div style={{ color: 'var(--t-orange)', marginBottom: '2rem', fontFamily: 'var(--t-mono)' }}>&gt; EXECUTE GET_RESUME_DATA...</div>
          <div style={{ color: 'var(--t-text-primary)', fontFamily: 'var(--t-mono)' }}>
            {content}
          </div>
        </div>
      </div>
    );
  }

  
  // Format content for Editorial Theme
  const formattedContent = content.split('\n').map((line, idx) => {
    const trimmed = line.trim();
    if (trimmed === '') return <div key={idx} style={{ height: '1rem' }}></div>;
    
    // Heading: ALL CAPS
    if (trimmed === trimmed.toUpperCase() && trimmed.length < 40 && trimmed.length > 2 && !trimmed.includes('-')) {
      return (
        <h3 key={idx} style={{ 
          fontFamily: 'var(--font-serif)', 
          fontSize: '2rem', 
          marginTop: '3.5rem', 
          marginBottom: '1.5rem',
          color: 'var(--text-primary)',
          borderBottom: '1px solid var(--border-color)',
          paddingBottom: '0.5rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.8rem',
          letterSpacing: '0.05em'
        }}>
          <span style={{ color: 'var(--accent)', fontSize: '1.2rem', opacity: 0.8 }}>❖</span> {trimmed}
        </h3>
      );
    }
    
    // Bullet point: Starts with - or *
    if (trimmed.startsWith('-') || trimmed.startsWith('*')) {
      return (
        <div key={idx} style={{ display: 'flex', gap: '1rem', marginBottom: '0.8rem', paddingLeft: '1.5rem' }}>
          <span style={{ color: 'var(--accent)', fontSize: '1.2rem', lineHeight: '1.2' }}>•</span>
          <span style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: '1.6' }}>{trimmed.substring(1).trim()}</span>
        </div>
      );
    }

    // Standard paragraph
    return <p key={idx} style={{ marginBottom: '1rem', color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: '1.8' }}>{line}</p>;
  });

  return (
    <div style={{ backgroundColor: 'var(--bg-color)', minHeight: '100vh', padding: '6rem 2rem' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        
        <Link to="/" style={{ 
          display: 'inline-flex', 
          alignItems: 'center',
          gap: '0.5rem',
          marginBottom: '4rem', 
          textDecoration: 'none', 
          color: 'var(--text-secondary)', 
          fontWeight: '500',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          fontSize: '0.85rem',
          transition: 'color 0.3s ease'
        }}>
          <span style={{ fontSize: '1.2rem' }}>&larr;</span> Return
        </Link>
        
        <div style={{
          backgroundColor: '#ffffff',
          padding: '5rem 6rem',
          borderRadius: '2px',
          boxShadow: '0 20px 40px rgba(0,0,0,0.03)',
          border: '1px solid rgba(0,0,0,0.05)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          
          {/* Subtle Watermark */}
          <div style={{
            position: 'absolute',
            top: '-20px',
            right: '-20px',
            fontSize: '15rem',
            fontFamily: 'var(--font-serif)',
            color: 'var(--text-primary)',
            opacity: '0.02',
            userSelect: 'none',
            pointerEvents: 'none'
          }}>
            CV
          </div>

          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <span style={{ color: 'var(--accent)', fontSize: '1.5rem', marginBottom: '1rem', display: 'inline-block' }}>❦</span>
            <h1 style={{ 
              fontFamily: 'var(--font-serif)', 
              fontSize: '4.5rem', 
              fontWeight: 300, 
              letterSpacing: '-0.02em',
              color: 'var(--text-primary)',
              lineHeight: '1',
              margin: '0'
            }}>Curriculum Vitae</h1>
            <div style={{ 
              width: '40px', 
              height: '1px', 
              backgroundColor: 'var(--accent)', 
              margin: '2rem auto 0',
              opacity: 0.5
            }}></div>
          </div>
          
          
            {profileImage && (
              <div style={{ marginBottom: '3rem', display: 'flex', justifyContent: 'center' }}>
                <img src={profileImage} alt="Profile" style={{ width: '150px', height: '150px', borderRadius: '50%', objectFit: 'cover', border: '1px solid var(--border-color)', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }} />
              </div>
            )}
  
          <div style={{ position: 'relative', zIndex: 1 }}>
            {formattedContent}
          </div>

        </div>
      </div>
    </div>
  );
}
