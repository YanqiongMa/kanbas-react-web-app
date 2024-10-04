import { Link, useLocation } from "react-router-dom";
import React from 'react';
import { AiOutlineDashboard } from "react-icons/ai";
import { IoCalendarOutline } from "react-icons/io5";
import { LiaBookSolid, LiaCogSolid } from "react-icons/lia";
import { FaInbox, FaRegCircleUser } from "react-icons/fa6";

export default function KanbasNavigation() {
  const location = useLocation();

  // Function to determine if a link is active
  const isActive = (path: string) => location.pathname === path;


  return (
    <div id="wd-kanbas-navigation" style={{ width: 110 }} 
         className="list-group rounded-0 position-fixed
         bottom-0 top-0 d-none d-md-block bg-black z-2">

      {/* Northeastern Logo */}
      <a id="wd-neu-link" target="_blank" 
         href="https://www.northeastern.edu/" 
         rel="noopener noreferrer" 
         className="list-group-item bg-black border-0 text-center">
        <img src="/images/NEU.png" width="75px" alt="NEU" />
      </a><br />

      {/* Account Link */}
      <Link to="/Kanbas/Account" id="wd-account-link"
        className={`list-group-item text-center border-0 ${isActive("/Kanbas/Account") ? "bg-white text-danger" : "bg-black text-white"}`}>
        <FaRegCircleUser className="fs-1 text-white" /><br />
        Account
      </Link><br />

      {/* Dashboard Link */}
      <Link to="/Kanbas/Dashboard" id="wd-dashboard-link"
        className={`list-group-item text-center border-0 ${isActive("/Kanbas/Dashboard") ? "bg-white text-danger" : "bg-black text-white"}`}>
        <AiOutlineDashboard className="fs-1 text-danger" /><br />
        Dashboard
      </Link><br />

      {/* Courses Link */}
      <Link to="/Kanbas/Courses" id="wd-course-link"
        className={`list-group-item text-center border-0 ${isActive("/Kanbas/Courses") ? "bg-white text-danger" : "bg-black text-white"}`}>
        <LiaBookSolid className="fs-1 text-danger" /><br />
        Courses
      </Link><br />

      {/* Calendar Link */}
      <Link to="/Kanbas/Calendar" id="wd-calendar-link"
        className={`list-group-item text-center border-0 ${isActive("/Kanbas/Calendar") ? "bg-white text-danger" : "bg-black text-white"}`}>
        <IoCalendarOutline className="fs-1 text-danger" /><br />
        Calendar
      </Link><br />

      {/* Inbox Link */}
      <Link to="/Kanbas/Inbox" id="wd-inbox-link"
        className={`list-group-item text-center border-0 ${isActive("/Kanbas/Inbox") ? "bg-white text-danger" : "bg-black text-white"}`}>
        <FaInbox className="fs-1 text-danger" /><br />
        Inbox
      </Link><br />

      {/* Settings Link */}
      <Link to="/Kanbas/Settings" id="wd-settings-link"
        className={`list-group-item text-center border-0 ${isActive("/Kanbas/Settings") ? "bg-white text-danger" : "bg-black text-white"}`}>
        <LiaCogSolid className="fs-1 text-danger" /><br />
        Settings
      </Link><br />
    </div>
  );
}
