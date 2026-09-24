import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export function useProfile() {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProfile() {
      try {
        setLoading(true);
        const { data, error } = await supabase.from('profile').select('*').eq('id', 1).maybeSingle();
        if (error) throw error;
        
        if (data) {
          setProfileData({
            name: data.full_name,
            firstName: data.first_name,
            lastName: data.last_name,
            email: data.email,
            bio: data.bio || { paragraphs: [] },
            socials: data.socials || {},
            experience: data.experience || [],
            skills: data.skills || []
          });
        }
      } catch (err) {
        console.error('Failed to fetch profile', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    }
    fetchProfile();
  }, []);

  return { profileData, loading, error };
}
