import { Link, useLocation, useParams } from "react-router-dom";
export default function CoursesNavigation() {
  const { pathname }= useLocation();
  const { cid } = useParams();
  const links = ["Home", "Modules", "Piazza", "Zoom", "Assignments", "Quizzes", "Grades", "People"];

  return (
    <div id="wd-courses-navigation" className="wd list-group fs-5 rounded-0" style={{marginRight: '30px'}}>
      {links.map((link) => (
        <Link key={link} to={`/Kanbas/Courses/${cid}/${link}`} id={`wd-course-${link.toLowerCase()}-link`}
          className={`list-group-item ${pathname.includes(link) ? "active text-black" : "text-danger"} border border-0`}> {link} </Link>
      ))}
    </div>
);}
