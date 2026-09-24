import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const ProfileContext = createContext();

export function ProfileProvider({ children }) {
  const [profileData, setProfileData] = useState({
    name: 'Loading...',
    firstName: 'Loading',
    lastName: '...',
    email: '',
    bio: { paragraphs: ['Loading profile information...'] },
    socials: { github: '', linkedin: '', twitter: '' },
    experience: [],
    skills: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const { data, error } = await supabase.from('profile').select('*').eq('id', 1).maybeSingle();
        if (error) throw error;
        
        if (data) {
          setProfileData({
            name: data.full_name || 'Your Name',
            firstName: data.first_name || 'Your',
            lastName: data.last_name || 'Name',
            email: data.email || '',
            bio: data.bio || { paragraphs: ['Welcome to my portfolio.'] },
            socials: data.socials || {},
            experience: data.experience || [],
            skills: data.skills || []
          });
          
          // Dynamically update document title
          if (data.full_name) {
            document.title = `${data.full_name} | Portfolio`;
          }
        }
      } catch (err) {
        console.error('Failed to fetch profile', err);
      } finally {
        setLoading(false);
      }
    }
    fetchProfile();
  }, []);

  return (
    <ProfileContext.Provider value={profileData}>
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfileData() {
  const context = useContext(ProfileContext);
  if (!context) {
    // Return safe fallback if used outside provider (though shouldn't happen)
    return {
      name: '', firstName: '', lastName: '', email: '',
      bio: { paragraphs: [] }, socials: {}, experience: [], skills: []
    };
  }
  return context;
}
