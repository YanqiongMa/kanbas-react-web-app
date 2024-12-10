import Account from "./Account"
import Courses from "./Courses"
import Dashboard from "./Dashboard"
import KanbasNavigation from "./Navigation"
import {Routes, Route, Navigate} from "react-router-dom"
import ProtectedRoute from "./Account/ProtectedRoute"
import { useState, useEffect} from "react";
import * as courseClient from "./Courses/client";
import * as db from "./Database"
import './style.css'
import { Provider, useSelector } from "react-redux"
import store from "./store"
import Session from "./Account/Session";
import * as userClient from "./Account/client";

export default function Kanbas() {
  const [courses, setCourses] = useState<any[]>([]);
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const [enrolling, setEnrolling] = useState<boolean>(false);
  const findCoursesForUser = async () => {
    try {
      const courses = await userClient.findCoursesForUser(currentUser._id);
      console.log(courses);
      setCourses(courses);
    } catch (error) {
      console.error(error);
    }
  };
  const updateEnrollment = async (courseId: string, enrolled: boolean) => {
    if (enrolled) {
      await userClient.enrollIntoCourse(currentUser._id, courseId);
    } else {
      await userClient.unenrollFromCourse(currentUser._id, courseId);
    }
    setCourses(
      courses.map((course) => {
        if (course._id === courseId) {
          return { ...course, enrolled: enrolled };
        } else {
          return course;
        }
      })
    );
  };
 
  const fetchCourses = async () => {
    try {
      const allCourses = await courseClient.fetchAllCourses();
      const enrolledCourses = await userClient.findCoursesForUser(
        currentUser._id
      );
      const courses = allCourses.map((course: any) => {
        if (enrolledCourses.find((c: any) => c._id === course._id)) {
          return { ...course, enrolled: true };
        } else {
          return course;
        }
      });
      setCourses(courses);
    } catch (error) {
      console.error(error);
    }
  }; 

  const refreshCourses = () => {
    fetchCourses();
  };

  useEffect(() => {
    if (enrolling) {
      fetchCourses();
    } else {
      findCoursesForUser();
    }
  }, [currentUser, enrolling]);

    const [course, setCourse] = useState<any>({
      _id: "0",
      name: "New Course",
      number: "New Number",
      startDate: "2023-09-10",
      endDate: "2023-12-15",
      //image: "/images/reactjs.jpg",
      description: "New Description",
    });

    const addNewCourse = async () => {
      const newCourse = await userClient.createCourse(currentUser, course);
      setCourses([...courses, newCourse]);
    };
  
    const deleteCourse = async (courseId: string) => {
      const status = await courseClient.deleteCourse(currentUser._id, courseId);
      setCourses(courses.filter((course) => course._id !== courseId));
    };   
  
    const updateCourse = async () => {
      await courseClient.updateCourse(course);
      setCourses(courses.map((c) => {
        if (c._id === course._id) { return course; }
        else { return c; }
      }));
    };

    return (
        <Provider store={store}>
          <Session>
            <div id="wd-kanbas">
                <KanbasNavigation />
                <div className="wd-main-content-offset p-3">
                    <Routes>
                        <Route path='/' element={<Navigate to='/Kanbas/Account'/>}/>
                        <Route path="/Account/*" element={<Account />} />
                        <Route path="/Dashboard" element={
                          <ProtectedRoute>
                            <Dashboard
                            courses={courses}
                            course={course}
                            setCourse={setCourse}
                            addNewCourse={addNewCourse}
                            deleteCourse={deleteCourse}
                            updateCourse={updateCourse}
                            refreshCourses={refreshCourses}
                            enrolling={enrolling} 
                            setEnrolling={setEnrolling}
                            updateEnrollment={updateEnrollment}
                            />
                          </ProtectedRoute>
                        } />
                        <Route path="/Courses/:cid/*" element={<ProtectedRoute><Courses courses={courses} /></ProtectedRoute>} />
                        <Route path="/Calendar" element={<div>Calendar</div>} />
                        <Route path="/Inbox" element={<div>Inbox</div>} />
                    </Routes>
                </div>
            </div>
            </Session>
        </Provider>
    )
}