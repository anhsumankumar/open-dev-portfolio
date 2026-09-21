import { useState, useEffect } from 'react';
import { projectService } from '../services/projectService';

export function useProjects(publishedOnly = false) {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProjects();
  }, [publishedOnly]);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = publishedOnly 
        ? await projectService.getPublishedProjects()
        : await projectService.getAllProjects();
      setProjects(data);
    } catch (err) {
      console.error("Error fetching projects:", err.message || JSON.stringify(err));
      setError(`Failed to load projects: ${err.message || 'Check console'}`);
    } finally {
      setLoading(false);
    }
  };

  const refreshProjects = () => {
    fetchProjects();
  };

  return { projects, loading, error, refreshProjects };
}
