import React from 'react';
import { useResume } from '../hooks/useResume';
import './TerminalProjectGrid.css';

import portfolioData from '../config/portfolio.json';

export default function TerminalAbout() {
  const { resumeData } = useResume();
  return (
    <div className="t-section reveal reveal-up" id="about">
      <div className="t-section-header">
        <span className="t-orange">// 02</span> 
        <h2>SYSTEM_PROFILE</h2>
      </div>
      <div className="t-content-block" style={{ color: 'var(--t-text-secondary)', lineHeight: 1.8 }}>
        <p>&gt; RUNNING IDENTIFICATION_PROTOCOL...</p>
        <p>&gt; MATCH FOUND: {portfolioData.firstName.toUpperCase()} {portfolioData.lastName.toUpperCase()}.</p>

          {resumeData?.profile_image_url && (
            <div style={{ marginBottom: '2rem', display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
              <div style={{ border: '1px solid var(--t-orange)', padding: '0.5rem', width: '200px', flexShrink: 0, position: 'relative' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, width: '10px', height: '10px', borderTop: '2px solid var(--t-orange)', borderLeft: '2px solid var(--t-orange)' }}></div>
                <div style={{ position: 'absolute', top: 0, right: 0, width: '10px', height: '10px', borderTop: '2px solid var(--t-orange)', borderRight: '2px solid var(--t-orange)' }}></div>
                <div style={{ position: 'absolute', bottom: 0, left: 0, width: '10px', height: '10px', borderBottom: '2px solid var(--t-orange)', borderLeft: '2px solid var(--t-orange)' }}></div>
                <div style={{ position: 'absolute', bottom: 0, right: 0, width: '10px', height: '10px', borderBottom: '2px solid var(--t-orange)', borderRight: '2px solid var(--t-orange)' }}></div>
                <img src={resumeData.profile_image_url} alt="Target" style={{ width: '100%', display: 'block', filter: 'grayscale(30%)' }} />
                <div style={{ position: 'absolute', bottom: '0.5rem', right: '0.5rem', color: 'var(--t-orange)', fontSize: '0.7rem', backgroundColor: 'rgba(0,0,0,0.8)', padding: '2px 4px' }}>SCAN_COMPLETE</div>
              </div>
              <div style={{ color: 'var(--t-orange)', fontSize: '0.9rem', fontFamily: 'var(--t-mono)' }}>
                <p>&gt; BIO_METRICS: VERIFIED</p>
                <p>&gt; CLEARANCE: LEVEL_9</p>
                <p>&gt; STATUS: ACTIVE_DEVELOPMENT</p>
              </div>
            </div>
          )}
  
        <div style={{ marginTop: '1.5rem' }}>
          {portfolioData.bio.paragraphs.map((paragraph, index) => (
            <p key={index} style={{marginBottom: '1rem'}}>
              &gt; {paragraph}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}