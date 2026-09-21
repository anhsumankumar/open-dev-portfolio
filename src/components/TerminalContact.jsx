import React from 'react';
import './TerminalProjectGrid.css';

export default function TerminalContact() {
  return (
    <div className="t-section reveal reveal-up" id="contact" style={{ borderTop: '1px solid var(--t-border)', paddingTop: '4rem', marginTop: '4rem' }}>
      <div className="t-section-header">
        <span className="t-orange">// 06</span> 
        <h2>ESTABLISH_CONNECTION</h2>
      </div>
      
      <div className="t-content-block" style={{ textAlign: 'center', margin: '4rem 0' }}>
        <h2 style={{ fontSize: '3rem', color: 'var(--t-text-primary)', marginBottom: '1rem', fontFamily: 'var(--t-sans)' }}>LET'S BUILD SOMETHING GREAT.</h2>
        <p style={{ color: 'var(--t-text-secondary)', marginBottom: '3rem', fontSize: '1.1rem' }}>
          &gt; Currently open for new opportunities and interesting collaborations.
        </p>
        
        <a href="https://mail.google.com/mail/?view=cm&fs=1&to=anshumankumartech07@gmail.com" target="_blank" rel="noopener noreferrer" className="t-btn-primary" style={{ fontSize: '1.2rem', padding: '1rem 3rem', display: 'inline-block', textDecoration: 'none' }}>
          INITIATE_HANDSHAKE
        </a>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--t-border)', paddingTop: '2rem', color: 'var(--t-text-secondary)', fontSize: '0.85rem' }}>
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          <a href="https://github.com/anhsumankumar" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--t-text-secondary)', textDecoration: 'none' }}>[ GITHUB ]</a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--t-text-secondary)', textDecoration: 'none' }}>[ LINKEDIN ]</a>
          <a href="https://x.com/anhsumankumar" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--t-text-secondary)', textDecoration: 'none' }}>[ X(TWITTER) ]</a>
          <a href="https://www.instagram.com/anshumankumar0007/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--t-text-secondary)', textDecoration: 'none' }}>[ INSTAGRAM ]</a>
        </div>
        <div>
          &copy; {new Date().getFullYear()} ANSHUMAN KUMAR. ALL RIGHTS RESERVED.
        </div>
        <a href="#top" style={{ color: 'var(--t-orange)', textDecoration: 'none' }}>
          ^ BACK_TO_TOP
        </a>
      </div>
    </div>
  );
}