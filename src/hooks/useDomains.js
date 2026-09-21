import { useState, useEffect, useCallback } from 'react';
import { domainService } from '../services/domainService';

export function useDomains() {
  const [domains, setDomains] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDomains = useCallback(async () => {
    try {
      setLoading(true);
      const data = await domainService.getDomains();
      setDomains(data);
      setError(null);
    } catch (err) {
      console.error('Error fetching domains:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDomains();
  }, [fetchDomains]);

  return { domains, loading, error, refreshDomains: fetchDomains };
}
