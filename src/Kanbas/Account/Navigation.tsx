import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
export default function AccountNavigation() {
    const { pathname } = useLocation();
    const active = (path: string) => (pathname.includes(path) ? "active" : "");
    // const acc_links = ["Signin", "Signup", "Profile"];
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const links = currentUser ? ["Profile"] : ["Signin", "Signup"]

    return (
        <div id="wd-account-navigation" style={{marginTop:"10px"}} className="wd list-group fs-5 rounded-0">
            {links.map((acc_link) => (
                <Link key={`/Kanbas/Account/${acc_link}`} to={`/Kanbas/Account/${acc_link}`} className={`list-group-item border border-0
                ${pathname.includes(acc_link) ? "active" : "text-danger"}`}>
                    {acc_link}
                </Link>
            ))}
            {currentUser && currentUser.role === "ADMIN" && (
                <Link to={`/Kanbas/Account/Users`} className={`list-group-item border-0 border-white ${active("Users")}`}> Users </Link>
            )}
        </div>
);}
