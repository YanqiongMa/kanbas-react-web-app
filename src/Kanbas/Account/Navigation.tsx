import { Link, useLocation } from "react-router-dom";
import React from 'react';

export default function AccountNavigation() {
  const location = useLocation();

  // Helper function to check if a link is active
  const isActive = (path: string) => location.pathname === path;

  return (
    <div id="wd-account-navigation" className="wd list-group fs-5 rounded-0">
      <Link to="/Kanbas/Account/Signin" id="wd-account-signin-link"
        className={`list-group-item ${isActive("/Kanbas/Account/Signin") ? 'active' : 'text-danger'} border border-0`}>
        Signin
      </Link>

      <Link to="/Kanbas/Account/Signup" id="wd-account-signup-link"
        className={`list-group-item ${isActive("/Kanbas/Account/Signup") ? 'active' : 'text-danger'} border border-0`}>
        Signup
      </Link>

      <Link to="/Kanbas/Account/Profile" id="wd-account-profile-link"
        className={`list-group-item ${isActive("/Kanbas/Account/Profile") ? 'active' : 'text-danger'} border border-0`}>
        Profile
      </Link>
    </div>
  );
}
