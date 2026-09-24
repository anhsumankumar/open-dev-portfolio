import React from 'react';
import './Contact.css';
import { useProfileData } from '../context/ProfileContext';

export default function Contact() {
  const portfolioData = useProfileData();
  return (
    <footer className="contact-section" id="contact">
      <div className="contact-container reveal reveal-up">
        <div className="contact-content">
          <h2 className="contact-title">Let's Build Something Great.</h2>
          <p className="contact-subtitle">
            Currently open for new opportunities and interesting collaborations.
          </p>

          <a href={`https://mail.google.com/mail/?view=cm&fs=1&to=${portfolioData.email}`} target="_blank" rel="noopener noreferrer" className="contact-email">
            {portfolioData.email}
          </a>

          <div className="contact-socials">
            <a href={portfolioData.socials.github} target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href={portfolioData.socials.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href={portfolioData.socials.twitter} target="_blank" rel="noopener noreferrer">X(Twitter)</a>
          </div>
        </div>

        <div className="contact-footer">
          <p>&copy; {new Date().getFullYear()} {portfolioData.name}. All rights reserved.</p>
          <a href="#top" className="back-to-top">Back to top ↑</a>
        </div>
      </div>
    </footer>
  );
}
