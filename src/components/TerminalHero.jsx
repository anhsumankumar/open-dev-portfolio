import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useProjects } from '../hooks/useProjects';
import { useDomains } from '../hooks/useDomains';
import './TerminalHero.css';

export default function TerminalHero() {
  const navigate = useNavigate();
  const { projects, loading: projLoading } = useProjects(true);
  const { domains, loading: domLoading } = useDomains();
  
  const numProjects = projLoading ? '...' : projects.length;
  const numDomains = domLoading ? '...' : domains.length;

  return (
    <div className="t-hero-container reveal reveal-up delay-100">
      <div className="t-main-panel">
        
        {/* LEFT STRIP */}
        <div className="t-hero-left">
          
          {/* <div className="t-workflow">
            <span>IDEA</span>
            <span>DESIGN</span>
            <span>BUILD</span>
            <span>TEST</span>
            <span>ITERATE</span>
          </div> */}
          
        </div>
        
        {/* CENTER CONTENT */}
        <div className="t-hero-center">
          <div className="t-sys-status">
            // SYSTEM ONLINE<br/>
            // PORTFOLIO_V2.1<br/>
            // LOCATION: EARTH<br/>
            // COORDS: [34.0522° N, 118.2437° W]<br/>
            <div className="t-barcode" style={{marginTop:'1rem'}}>
              <div style={{width:'2px'}}></div><div style={{width:'4px'}}></div>
              <div style={{width:'1px'}}></div><div style={{width:'3px'}}></div>
              <div style={{width:'2px'}}></div><div style={{width:'1px'}}></div>
              <div style={{width:'4px'}}></div>
            </div>
          </div>
          
          <h1 className="t-title">
            ANSHUMAN<br/>KUMAR<span className="t-orange">_</span>
          </h1>
          
          <p className="t-desc">
            I BUILD REAL-WORLD SYSTEMS<br/>
            ACROSS SOFTWARE, AI, ELECTRONICS<br/>
            AND AUTOMATION.
          </p>
          
          <div className="t-hero-actions">
            <button className="t-btn t-btn-primary" onClick={() => document.getElementById('projects')?.scrollIntoView({behavior: 'smooth'})}>&gt; EXPLORE_MY_WORK.exe</button>
            <button className="t-btn t-btn-secondary" onClick={() => navigate('/resume')}>[ VIEW RESUME ]</button>
          </div>
        </div>

        {/* RIGHT: ROBOT AREA */}
        <div className="t-hero-robot">
          <div className="t-callout c-concept">CONCEPT</div>
          <div className="t-callout c-prototype">PROTOTYPE</div>
          <div className="t-callout c-test">TEST</div>
          <div className="t-callout c-deploy">DEPLOY</div>
          
          <img src="/images/terminal-robot-blueprint.png" alt="Robot Blueprint" className="t-robot-img" />
        </div>
        
        {/* FAR RIGHT: STATUS */}
        <div className="t-hero-status">
          <div className="t-status-title">STATUS</div>
          <div className="t-status-list">
            <div className="t-status-item active">[●] IDEAS</div>
            <div className="t-status-item active">[●] PROJECTS</div>
            <div className="t-status-item active">[●] AUTOMATION</div>
            <div className="t-status-item">[○] IMPACT</div>
          </div>
        </div>
        </div>

        <div className="t-hero-actions delay-5 mt-3">
          <a href="#projects" className="t-btn-primary">[ EXECUTE: view_projects.sh ]</a>
          <a href="#contact" className="t-btn-secondary">--contact-flag</a>
        </div>
      </div>
      
      <div className="t-hero-image-wrapper delay-6">
        <div className="t-hero-image-container">
          <div className="t-portrait-placeholder">
            {portfolioData.firstName.toUpperCase()}<br/>{portfolioData.lastName.toUpperCase()}<span className="t-orange">_</span>
          </div>
          <div className="t-image-overlay"></div>
        </div>
      </div>
    </section>
  );
}
