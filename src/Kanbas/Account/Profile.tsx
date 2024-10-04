import { Link } from "react-router-dom";
import React from 'react';

export default function Profile() {
  return (
    <div id="wd-profile-screen" className="container mt-5" style={{ maxWidth: "400px" }}>
      <h1>Profile</h1>
      <form>
        <div className="mb-3">
          <input id="wd-username" value="alice" className="form-control" placeholder="username" />
        </div>

        <div className="mb-3">
          <input id="wd-password" value="123" className="form-control" type="password" placeholder="password" />
        </div>

        <div className="mb-3">
          <input id="wd-firstname" value="Alice" className="form-control" placeholder="First Name" />
        </div>

        <div className="mb-3">
          <input id="wd-lastname" value="Wonderland" className="form-control" placeholder="Last Name" />
        </div>

        {/* Date Input with Calendar Picker */}
        <div className="mb-3">
          <input id="wd-dob" value="2000-01-01" className="form-control" type="date" />
        </div>

        <div className="mb-3">
          <input id="wd-email" value="alice@wonderland.com" className="form-control" type="email" placeholder="email" />
        </div>

        <div className="mb-3">
          <select id="wd-role" className="form-control">
            <option value="USER" selected>User</option>
            <option value="ADMIN">Admin</option>
            <option value="FACULTY">Faculty</option>
            <option value="STUDENT">Student</option>
          </select>
        </div>

        <Link to="/Kanbas/Account/Signin" className="btn btn-danger w-100">
          Signout
        </Link>
      </form>
    </div>
  );
}
