import React from 'react';

export default function Modules() {
    
  return (
    <div className="wd-module-container">
      <div className="wd-module-controls">
        <button className="wd-collapse-btn">Collapse All</button>
        <button className="wd-progress-btn">View Progress</button>
        <select className="wd-module-select" id="wd-select-genre">
          <option selected value="PUBLISH_ALL">Publish All</option>
          <option value="WEEK_1">Week 1</option>
        </select>
        <button className="wd-add-module-btn">+ Module</button>
      </div>
  
      <ul className="wd-modules-list">
        <li className="wd-module-item">
          <div className="wd-module-title">Week 1,Lecture 1 - Course Introduction, Syllabus, Agenda</div>
          <ul className="wd-lesson-group">
            <li className="wd-lesson-item">
              <span className="wd-lesson-title">LEARNING OBJECTIVES</span>
              <ul className="wd-lesson-content">
                <li className="wd-content-item">Introduction to the course</li>
                <li className="wd-content-item">Learn what is Web Development</li>
              </ul>
            </li>
          </ul>
  
          <ul className="wd-lesson-group">
            <li className="wd-lesson-item">
              <span className="wd-lesson-title">READING</span>
              <ul className="wd-lesson-content">
                <li className="wd-content-item">Full Stack Developer-Chapter 1 -Introduction</li>
                <li className="wd-content-item">Full Stack Developer-Chapter 2-Creating User</li>
              </ul>
            </li>
          </ul>
  
          <ul className="wd-lesson-group">
            <li className="wd-lesson-item">
              <span className="wd-lesson-title">SLIDES</span>
              <ul className="wd-lesson-content">
                <li className="wd-content-item">Introduction to Web Development</li>
                <li className="wd-content-item">Creating an HT'TP server with Node.js</li>
                <li className="wd-content-item">Creating a React Application</li>
              </ul>
            </li>
          </ul>
        </li>
  
        <li className="wd-module-item">
          <div className="wd-module-title">Week 1,Lecture 2-Formatting User Interfaces with HTML</div>
          <ul className="wd-lesson-group">
            <li className="wd-lesson-item">
              <span className="wd-lesson-title">LEARNING OBJECTIVES</span>
              <ul className="wd-lesson-content">
                <li className="wd-content-item">Learn how to create user interfaces with IITM</li>
                <li className="wd-content-item">Deploy the assignment to Netlify</li>
              </ul>
            </li>
          </ul>
  
          <ul className="wd-lesson-group">
            <li className="wd-lesson-item">
              <span className="wd-lesson-title">SLIDES</span>
              <ul className="wd-lesson-content">
                <li className="wd-content-item">Introduction to HITML and the DOM</li>
                <li className="wd-content-item">Formatting Web content with Headings and</li>
                <li className="wd-content-item">Formatting content with Lists and Tables</li>
              </ul>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
}
  