import { Link, useLocation, useParams } from "react-router-dom";
import React from 'react';

export default function CoursesNavigation() {
  const { cid } = useParams();  
  const location = useLocation();  

  const links = ["Home", "Modules", "Piazza", "Zoom", "Assignments", "Quizzes", "Grades", "People"];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div id="wd-courses-navigation" className="wd list-group fs-5 rounded-0">
      {links.map((link) => {
        const linkPath = `/Kanbas/Courses/${cid}/${link}`; 
        return (
          <Link key={link} to={linkPath}
            className={`list-group-item ${isActive(linkPath) ? 'active' : 'text-danger'} border border-0`}>
            {link}
          </Link>
        );
      })}
    </div>
  );
}
