import React from 'react';
import { useResume } from '../hooks/useResume';
import './EditorialAbout.css';

export default function About() {
  const { resumeData } = useResume();
  return (
    <section className="about-section" id="about">
      <div className="about-container reveal reveal-up">
        <h2 className="section-title">About Me</h2>
        
        <div className="about-content">
          <div className="about-text">
            <p>
              I am a multidisciplinary engineer focused on building robust, scalable 
              systems that solve real-world problems. With a background spanning software 
              development, artificial intelligence, and electronics, I thrive at the 
              intersection of hardware and software.
            </p>
            <p>
              My approach to engineering is rooted in first principles thinking. Whether 
              I'm architecting a cloud backend, developing a fluid user interface, or 
              designing an embedded system, I prioritize clean code, performance, and 
              an exceptional user experience.
            </p>
            <p>
              Currently, I'm focused on developing applications that leverage modern 
              web technologies and AI to create intuitive digital ecosystems.
            </p>
          </div>
          <div className="about-image-wrapper">
            {/* Placeholder for a portrait or abstract graphic */}
            {resumeData?.profile_image_url ? (
              <img src={resumeData.profile_image_url} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <div className="about-image-placeholder">
                <span className="about-image-text">AK</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
