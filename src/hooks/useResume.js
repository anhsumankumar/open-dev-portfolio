import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export function useResume() {
  const [resumeData, setResumeData] = useState({ content: '', profile_image_url: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchResume() {
      try {
        const { data, error } = await supabase.from('resume').select('*').eq('id', 1).maybeSingle();
        if (data) {
          setResumeData(data);
        }
      } catch (err) {
        console.error('Failed to fetch resume', err);
      } finally {
        setLoading(false);
      }
    }
    fetchResume();
  }, []);

  return { resumeData, loading };
}
