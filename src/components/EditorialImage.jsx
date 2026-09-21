import React from 'react';
import './EditorialImage.css';

export default function EditorialImage() {
  return (
    <div className="image-section image-reveal">
      <div className="image-container">
        <img 
          src="/images/mountain-editorial.jpg" 
          alt="Mountain landscape" 
          className="editorial-img"
        />
        <div className="image-overlay-text">
          <span className="image-number">01</span>
          <p className="image-quote">
            "Better<br />
            Systems<br />
            Brighter<br />
            People"
          </p>
        </div>
      </div>
      
      <div className="side-column">
        <ul className="side-nav">
          <li>IDEA</li>
          <li>DESIGN</li>
          <li>BUILD</li>
          <li>TEST</li>
          <li>ITERATE</li>
        </ul>
        <div className="side-line"></div>
        <div className="side-footer">
          AK / 2025
        </div>
      </div>
    </div>
  );
}
