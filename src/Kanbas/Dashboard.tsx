import { Link } from "react-router-dom";
import React from 'react';
export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses (12)</h2> <hr />
      <div id="wd-dashboard-courses">
      <div className="wd-dashboard-course">
          <img src="/images/reactjs.jpg" width={200} alt="React JS"/>
          <div>
          <h5>CS1234 React JS</h5>
            <p className="wd-dashboard-course-title">
              Full Stack software developer
            </p>
            <Link to="/Kanbas/Courses/1234/Home">
                <button className="wd-go-btn">Go</button>
            </Link>
          </div>
        </div>
        <div className="wd-dashboard-course">
          <img src="/images/reactjs.jpg" width={200} alt="React JS"/>
          <div>
          <h5>CS1234 React JS</h5>
            <p className="wd-dashboard-course-title">
              Full Stack software developer
            </p>
            <Link to="/Kanbas/Courses/1234/Home">
                <button className="wd-go-btn">Go</button>
            </Link>
            </div>
        </div>
        <div className="wd-dashboard-course">
          <img src="/images/reactjs.jpg" width={200} alt="React JS"/>
          <div>
          <h5>CS1234 React JS</h5>
            <p className="wd-dashboard-course-title">
              Full Stack software developer
            </p>
            <Link to="/Kanbas/Courses/1234/Home">
                <button className="wd-go-btn">Go</button>
            </Link>
          </div>
        </div>
        <div className="wd-dashboard-course">
          <img src="/images/reactjs.jpg" width={200} alt="React JS"/>
          <div>
          <h5>CS1234 React JS</h5>
            <p className="wd-dashboard-course-title">
              Full Stack software developer
            </p>
            <Link to="/Kanbas/Courses/1234/Home">
                <button className="wd-go-btn">Go</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}