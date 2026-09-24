import React from 'react';
import { useResume } from '../hooks/useResume';
import { useProfileData } from '../context/ProfileContext';
import './About.css'; // Updated CSS name

export default function About() {
  const portfolioData = useProfileData();
  const { resumeData } = useResume();
  return (
    <section className="about-section" id="about">
      <div className="about-container reveal reveal-up">
        <h2 className="section-title">About Me</h2>
        
        <div className="about-content">
          <div className="about-text">
            {portfolioData.bio.paragraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
          <div className="about-image-wrapper">
            {/* Placeholder for a portrait or abstract graphic */}
            {resumeData?.profile_image_url ? (
              <img src={resumeData.profile_image_url} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <div className="about-image-placeholder">
                <span className="about-image-text">
                  {portfolioData.firstName.charAt(0)}{portfolioData.lastName.charAt(0)}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
