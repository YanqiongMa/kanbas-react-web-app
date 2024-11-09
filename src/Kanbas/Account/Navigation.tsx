import { RootState } from "../store";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

export default function AccountNavigation() {
  const { pathname } = useLocation();
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  
  const links = currentUser 
    ? [{ name: "Profile", path: "/profile" }]
    : [{ name: "Sign In", path: "/signin" }, { name: "Sign Up", path: "/signup" }];

  return (
    <nav id="account-navigation" className="wd list-group fs-5 rounded-0 me-2">
      {links.map(({ name, path }) => (
        <Link
          key={name}
          to={path}
          className={`list-group-item border-0 fs-5 ${
            pathname === path ? "active text-primary" : "text-secondary"
          }`}
        >
          {name}
        </Link>
      ))}
    </nav>
  );
}
