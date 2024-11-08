import React from "react";
import { Link } from "react-router-dom";
export default function Signup() {
  return (
    <div id="wd-signup-screen">
      <h3>Sign up</h3>
      <input id="wd-username" placeholder="username" className="form-control mb-2" />
      <input id="wd-password" placeholder="password" type="password" className="form-control mb-2" />
      <input id="wd-verify-password" placeholder="verify password" type="password" className="form-control mb-2" />
      <div className="mb-2">
        <div>
          <input id="student-radio" type="radio" name="userGroup" value="student" className="form-check-input" />
          <label htmlFor="student" className="ms-2">Student</label>
        </div>
        <div>
          <input id="student-radio" type="radio" name="userGroup" value="faculty" className="form-check-input" />
          <label htmlFor="faculty" className="ms-2">Faculty</label>
        </div>
      </div>
      <Link id="wd-signup-btn" to="/Kanbas/Account/Profile" className="btn btn-primary w-100 mb-2">Sign up</Link>
      <Link id="wd-signin-link" to="/Kanbas/Account/Signin" >Sign in</Link>
    </div>
  );
}