import React, { useState } from 'react';
import { useProjects } from '../hooks/useProjects';
import { useDomains } from '../hooks/useDomains';
import './HeroStats.css';

export default function HeroStats() {
  const { projects, loading: projLoading } = useProjects(true); // published projects
  const { domains, loading: domLoading } = useDomains();
  
  const [showDomains, setShowDomains] = useState(false);

  const numProjects = projLoading ? '...' : projects.length;
  const numDomains = domLoading ? '...' : domains.length;

  const stats = [
    { value: numProjects, label: 'Projects', isInteractive: false },
    { value: numDomains, label: 'Domains', isInteractive: true },
    { value: '1', label: 'Goal', isInteractive: false },
    { value: '∞', label: 'Curiosity', isInteractive: false }
  ];

  return (
    <div className="hero-stats-wrapper">
      <div className="hero-stats">
        {stats.map((stat, index) => (
          <React.Fragment key={index}>
            <div 
              className={`stat-item ${stat.isInteractive ? 'interactive' : ''}`}
              onClick={() => { if (stat.isInteractive) setShowDomains(!showDomains); }}
            >
              <span className="stat-value">{stat.value}</span>
              <span className="stat-label">
                {stat.label} {stat.isInteractive && <span className="chevron">{showDomains ? '▲' : '▼'}</span>}
              </span>
            </div>
            {index < stats.length - 1 && <div className="stat-divider"></div>}
          </React.Fragment>
        ))}
      </div>
      
      {showDomains && !domLoading && domains.length > 0 && (
        <div className="domains-dropdown reveal reveal-up delay-100 is-visible">
          <div className="domains-grid">
            {domains.map(domain => (
              <div key={domain.id} className="domain-card">
                <h4 className="domain-name">{domain.name}</h4>
                <p className="domain-desc">{domain.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
