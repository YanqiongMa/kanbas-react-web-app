import { Link, useParams, useLocation } from "react-router-dom";

export default function CoursesNavigation() {
  const links = ["Home", "Modules", "Piazza", "Zoom", "Assignments", "Quizzes", "Grades", "People"];
  const { cid } = useParams();
  const location = useLocation();

  const generateLinkPath = (link: string) => `/Kanbas/Courses/${cid}/${link}`;

  return (
    <div id="wd-courses-navigation" className="wd list-group fs-5 rounded-0">
      {links.map((link, index) => (
        <Link
          key={index}
          to={generateLinkPath(link)}
          className={`list-group-item border border-0 ${location.pathname.includes(link) ? 'active' : 'text-danger'}`}
          id={`wd-course-${link.toLowerCase()}-link`}
        >
          {link}
        </Link>
      ))}
    </div>
  );
}