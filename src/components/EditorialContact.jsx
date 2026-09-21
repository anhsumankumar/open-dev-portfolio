import React from 'react';
import './EditorialContact.css';

export default function Contact() {
  return (
    <footer className="contact-section" id="contact">
      <div className="contact-container reveal reveal-up">
        <div className="contact-content">
          <h2 className="contact-title">Let's Build Something Great.</h2>
          <p className="contact-subtitle">
            Currently open for new opportunities and interesting collaborations.
          </p>

          <a href="https://mail.google.com/mail/?view=cm&fs=1&to=anshumankumartech07@gmail.com" target="_blank" rel="noopener noreferrer" className="contact-email">
            anshumankumartech07@gmail.com
          </a>

          <div className="contact-socials">
            <a href="https://github.com/anhsumankumar" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href="https://x.com/anhsumankumar" target="_blank" rel="noopener noreferrer">X(Twitter)</a>
            <a href="https://www.instagram.com/anshumankumar0007/" target="_blank" rel="noopener noreferrer">Instagram</a>

          </div>
        </div>

        <div className="contact-footer">
          <p>&copy; {new Date().getFullYear()} Anshuman Kumar. All rights reserved.</p>
          <a href="#top" className="back-to-top">Back to top ↑</a>
        </div>
      </div>
    </footer>
  );
}
