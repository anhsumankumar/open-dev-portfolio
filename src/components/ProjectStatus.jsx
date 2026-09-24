import React from 'react';
import './ProjectStatus.css';

const STATUS_CONFIG = {
  'completed': { label: 'COMPLETED' },
  'in-development': { label: 'IN DEVELOPMENT' },
  'research': { label: 'RESEARCH' },
  'archived': { label: 'ARCHIVED' },
};

export default function ProjectStatus({ status }) {
  const config = STATUS_CONFIG[status] || { label: status?.toUpperCase() };
  
  return (
    <span className="project-status">
      &#9679; {config.label}
    </span>
  );
}
