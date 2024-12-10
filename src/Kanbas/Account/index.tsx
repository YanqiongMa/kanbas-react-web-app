import Signin from "./Signin";
import Profile from "./Profile";
import Users from "./Users";
import Signup from "./Signup";
import { Routes, Route, Navigate } from "react-router-dom";
import AccountNavigation from "./Navigation";
import { useSelector } from "react-redux";

export default function Account() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  return (
    <div id="wd-account-screen">
      <div style={{ display: "flex" }}>
        
        <div style={{ flexShrink: 0 }}>
          <AccountNavigation />
        </div>

        <div style={{ flexGrow: 1 }}>
          <Routes>
            <Route
              path="/"
              element={
                <Navigate
                  to={
                    currentUser
                      ? "/Kanbas/Account/Profile"
                      : "/Kanbas/Account/Signin"
                  }
                />
              }
            />
            <Route path="/Signin" element={<Signin />} />
            <Route path="/Profile" element={<Profile />} />
            <Route path="/Signup" element={<Signup />} />
            <Route path="/Users" element={<Users />} />
            <Route path="/Users/:uid" element={<Users />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
