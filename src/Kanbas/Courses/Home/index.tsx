import Modules from "../Modules";
import CourseStatus from "./Status";
import React from 'react';

export default function Home() {
  return (
    <div className="d-flex" id="wd-home" style={{ margin: '0 20px' }}>
      <div className="flex-fill">
        <Modules />
      </div>
      <div
        className="d-none d-md-block col-md-2"
        style={{
          marginLeft: '20px',
          display: window.innerWidth < 768 ? 'none' : 'block', 
        }}
      >
        <CourseStatus />
      </div>
    </div>
  );
}
