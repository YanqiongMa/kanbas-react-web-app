import { courses } from "../Database";
import CoursesNavigation from "./Navigation";
import Modules from "./Modules";
import { useLocation } from "react-router-dom";
import { Routes, Route, Navigate, useParams } from "react-router-dom";
import Home from "./Home";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/Editor";
import { FaAlignJustify } from "react-icons/fa";
import PeopleTable from "./People/Table";
import { useSelector } from "react-redux";
import * as coursesClient from "./client";
import { useEffect, useState } from "react";

export default function Courses({courses}: {courses: any[]}) {
    const { cid } = useParams();
    const course = courses.find((course) => course._id === cid);
    const { pathname } = useLocation();
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const isFaculty = currentUser.role === "FACULTY";
    const [ users, setUsers ] = useState<any[]>([]);
    const fetchUsers = async () => {
        const users = await coursesClient.findUsersForCourse(cid as string);
        setUsers(users);
    }

    useEffect(() => {
        fetchUsers();
      }, [cid]);

    return (
    <div id="wd-courses">
        <h2 className="text-danger">
            <FaAlignJustify className="me-4 fs-4 mb-1" />
            {course && course.name} &gt; {pathname.split("/")[4]}
        </h2> <hr />
        <div className="d-flex">
            <div className="d-none d-md-block">
            <CoursesNavigation/>
            </div>
            <div className="flex-fill">
            <Routes>
            <Route path="Home" element={<Home isFaculty = {isFaculty} />} />
            <Route path="Modules" element={<Modules isFaculty = {isFaculty} />} />
            <Route path="Assignments" element={<Assignments isFaculty={isFaculty} />} />
            <Route path="Assignments/:aid" element={<AssignmentEditor />} />
            <Route path="People" element = {<PeopleTable users={users} />} />
            </Routes>
            </div>
        </div>
    </div>

  );
}
  