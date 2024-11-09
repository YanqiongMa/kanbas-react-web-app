import { MdOutlineAccountCircle } from "react-icons/md";
import { IoSettings, IoSpeedometerOutline } from "react-icons/io5";
import { LiaBookSolid } from "react-icons/lia";
import { FaInbox, FaCalendar } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

export default function KanbasNavigation() {
  const { pathname } = useLocation();
  const links = [
    { label: "Account", path: "/Kanbas/Account", icon: MdOutlineAccountCircle },
    { label: "Dashboard", path: "/Kanbas/Dashboard", icon: IoSpeedometerOutline },
    { label: "Courses", path: "/Kanbas/Courses", icon: LiaBookSolid },
    { label: "Calendar", path: "/Kanbas/Calendar", icon: FaCalendar },
    { label: "Inbox", path: "/Kanbas/Inbox", icon: FaInbox },
    { label: "Labs", path: "/Labs", icon: IoSettings },
  ];

  return (
    <div
      id="wd-kanbas-navigation"
      className="list-group rounded-0 position-fixed bottom-0 top-0 d-none d-md-block bg-black z-2"
      style={{ width: 120 }}
    >
      <a
        id="wd-neu-link"
        href="https://www.northeastern.edu/"
        target="_blank"
        rel="noopener noreferrer"
        className="list-group-item bg-black border-0 text-center"
      >
        <img src="/images/neu.png" alt="NEU Logo" className="img-fluid" style={{ width: 200, height: 70 }} />
      </a>
      {links.map((link) => (
        <Link
          key={link.path}
          to={link.path}
          id={`wd-${link.label.toLowerCase()}-link`}
          className={`list-group-item text-center border-0 ${
            pathname.includes(link.label) ? "bg-white text-danger" : "bg-black text-white"
          }`}
        >
          {link.icon({ className: `fs-1 ${link.label === 'Account' && pathname.includes('Account') ? 'text-danger' : link.label === 'Account' ? 'text-white' : 'text-danger'}` })}
          <br />
          {link.label}
        </Link>
      ))}
    </div>
  );
}