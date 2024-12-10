import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

export default function AccountNavigation() {
  const { pathname } = useLocation();
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  // Define links based on user's login state
  const links = currentUser ? ["Profile"] : ["Signin", "Signup"];
  
  // Determine the active link's CSS classes
  const getLinkClass = (path: string) =>
    `list-group-item ${
      pathname.includes(path) ? "active text-black" : "text-danger"
    } border border-0`;

  return (
    <div
      id="wd-account-navigation"
      className="wd list-group fs-5 rounded-0"
      style={{ marginRight: "30px" }}
    >
      {links.map((link: string) => (
        <Link
          key={link}
          to={`/Kanbas/Account/${link}`}
          className={getLinkClass(link)}
        >
          {link}
        </Link>
      ))}

      {currentUser && currentUser.role === "ADMIN" && (
        <Link
          to="/Kanbas/Account/Users"
          className={getLinkClass("Users")}
        >
          Users
        </Link>
      )}
    </div>
  );
}
