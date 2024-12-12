import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import * as db from "./Database";
import { useSelector } from "react-redux";
import { fetchAllCourses } from "./Courses/client";
import {
  /*fetchEnrollmentsForUser,*/ enrollInCourse,
  unenrollFromCourse,
} from "./client";
export default function Dashboard({
  courses,
  setCourses,
  course,
  setCourse,
  addNewCourse,
  deleteCourse,
  updateCourse,
  enrolling,
  setEnrolling,
  updateEnrollment,
}: {
  courses: any[];
  setCourses: any;
  course: any;
  setCourse: (course: any) => void;
  addNewCourse: () => void;
  deleteCourse: (course: any) => void;
  updateCourse: () => void;
  enrolling: boolean;
  setEnrolling: (enrolling: boolean) => void;
  updateEnrollment: (courseId: string, enrolled: boolean) => void;
}) {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  // const {enrollments} = db;
  const [allCourses, setAllCourses] = useState<any[]>([]);
  const [showCourses, setShowCourses] = useState(false);
  const [enrolledCourses, setEnrolledCourses] = useState<any[]>([]);
  // const [enrollmentStatus, setEnrollmentStatus] = useState<{ [key: string]: boolean }>(() => {
  //     const initialStatus: { [key: string]: boolean } = {};
  //     courses.forEach((course) => {
  //         const isAlreadyEnrolled = enrollments.some((enrollment) => enrollment.user === currentUser._id && enrollment.course === course._id
  //         );
  //         initialStatus[course._id] = isAlreadyEnrolled;
  //     });
  //     return initialStatus;
  // });
  const [enrollmentStatus, setEnrollmentStatus] = useState<{
    [key: string]: boolean;
  }>({});
  // const checkEnrollmentStatus = (course: any) => {
  //     setEnrollmentStatus((ogStatus) => ({...ogStatus, [course._id]: !ogStatus[course._id]}))
  // };
  // const displayedCourses = showCourses ? courses : courses.filter((course) => enrollmentStatus[course._id]);
  const [displayedCourses, setDisplayedCourses] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const allCoursesData = await fetchAllCourses();
      setAllCourses(allCoursesData);

      // const userEnrollments = await fetchEnrollmentsForUser(currentUser._id);
      // setDisplayedCourses(userEnrollments);
      // console.log(enrolledCourses);

      const enrolledCourseDetails = allCoursesData.filter((course: any) =>
        enrolledCourses.some(
          (enrollment: any) => enrollment.course === course._id
        )
      );
      setDisplayedCourses(enrolledCourseDetails);

      const status: { [key: string]: boolean } = {};
      enrolledCourses.forEach((enrollment: any) => {
        status[enrollment.course] = true;
      });
      setEnrollmentStatus(status);
    };
    fetchData();
  }, [currentUser._id]);

  // const handleEnroll = async (courseId: string) => {
  //     await enrollInCourse(currentUser._id, courseId);
  //     setEnrollmentStatus((prev) =>  ({...prev, [courseId]: true}));
  //     if (!showCourses) {
  //         setDisplayedCourses((prev) => [...prev, allCourses.find((course) => course._id === courseId)])
  //     }
  //     const enrolledCourse = allCourses.find((course) => course._id === courseId);

  //     if (enrolledCourse) {
  //         setDisplayedCourses((prev) => {
  //             if (!prev.some((course) => course._id === courseId)) {
  //                 return [...prev, enrolledCourse];
  //             }
  //             return prev
  //         })
  //     }
  // };

  // const handleUnenroll = async (courseId: string) => {
  //     await unenrollFromCourse(currentUser._id, courseId);
  //     setEnrollmentStatus((prev) =>  ({...prev, [courseId]: false}));
  //     if (!showCourses) {
  //         setDisplayedCourses((prev) => [...prev, allCourses.filter((course) => course._id !== courseId)])
  //     }
  // };

  // const toggleCourses = async () => {
  //     setShowCourses((prev) => !prev)
  //     if (!showCourses) {
  //         setDisplayedCourses(allCourses);
  //     } else {
  //         const enrolledCourses = courses.filter((course: any) =>
  //             enrollmentStatus[course._id]
  //         );
  //         setDisplayedCourses(enrolledCourses);
  //     }
  // };
  // console.log(displayedCourses);
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">
        Dashboard
        <button
          onClick={() => setEnrolling(!enrolling)}
          className="float-end btn btn-primary"
        >
          {enrolling ? "My Courses" : "All Courses"}
        </button>
      </h1>{" "}
      <hr />
      {
        currentUser.role === "FACULTY" ? (
          <>
            <h5>
              New Course
              <button
                className="btn btn-primary float-end"
                id="wd-add-new-course-click"
                onClick={addNewCourse}
              >
                Add
              </button>
              <button
                className="btn btn-warning float-end me-2"
                id="wd-update-course-click"
                onClick={updateCourse}
              >
                Update
              </button>
            </h5>
            <br />
            <input
              value={course.name}
              className="form-control mb-2"
              onChange={(e) => setCourse({ ...course, name: e.target.value })}
            />
            <textarea
              value={course.description}
              className="form-control"
              onChange={(e) =>
                setCourse({ ...course, description: e.target.value })
              }
            ></textarea>
            <h2 id="wd-dashboard-published">
              Published Courses{" "}
              {
                courses.length /*courses.filter((course) => enrollments.some((enrollment) => enrollment.user === currentUser._id && enrollment.course === course._id)).length*/
              }
            </h2>{" "}
            <hr />
            <div id="wd-dashboard-courses" className="row">
              <div className="row row-cols-1 row-cols-md-5 g-4">
                {courses
                  // .filter((course) =>
                  //     enrollments.some(
                  //     (enrollment) =>
                  //         enrollment.user === currentUser._id &&
                  //         enrollment.course === course._id
                  //     )
                  // )
                  .map((course: any) => (
                    <div
                      className="wd-dashboard-course col"
                      style={{ width: "300px" }}
                    >
                      <div className="card rounded-3 overflow-hidden">
                        <Link
                          className="wd-dashboard-course-link text-decoration-none text-dark"
                          to={`/Kanbas/Courses/${course._id}/Home`}
                        >
                          <img
                            src={`/images/reactjs.jpg`}
                            width="100%"
                            height={160}
                            alt="Course Logo"
                          />
                          <div className="card-body">
                            <h5 className="wd-dashboard-course-title card-title">
                              {enrolling && (
                                <button
                                  onClick={(event) => {
                                    event.preventDefault();
                                    updateEnrollment(
                                      course._id,
                                      !course.enrolled
                                    );
                                  }}
                                  className={`btn ${
                                    course.enrolled
                                      ? "btn-danger"
                                      : "btn-success"
                                  } float-end`}
                                >
                                  {course.enrolled ? "Unenroll" : "Enroll"}
                                </button>
                              )}
                              {course.name}
                            </h5>
                            <p
                              className="wd-dashboard-course-title card-text overflow-y-hidden"
                              style={{ maxHeight: 100 }}
                            >
                              {course.description}
                            </p>
                            <button className="btn btn-primary"> Go </button>
                            <button
                              onClick={(event) => {
                                event.preventDefault();
                                deleteCourse(course._id);
                                setCourses((prev: any) =>
                                  prev.filter((c: any) => c._id !== course._id)
                                );
                              }}
                              className="btn btn-danger float-end"
                              id="wd-delete-course-click"
                            >
                              Delete
                            </button>
                            <button
                              onClick={(event) => {
                                event.preventDefault();
                                setCourse(course);
                              }}
                              className="btn btn-warning float-end"
                              id="wd-edit-course-click"
                            >
                              Edit
                            </button>
                          </div>
                        </Link>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </>
        ) : (
          <>
            {/* <h5>New Course
                    <button className="btn btn-primary float-end" id="wd-add-new-course-click" onClick={addNewCourse}>
                        Add
                    </button>
                    <button className="btn btn-warning float-end me-2" id="wd-update-course-click" onClick={updateCourse}>
                        Update
                    </button>
                </h5><br />
                <input value={course.name} className="form-control mb-2" onChange={(e) => setCourse({...course, name: e.target.value})}/>
                <textarea value={course.description} className="form-control" onChange={(e) => setCourse({...course, description: e.target.value})}></textarea> */}
            <h2 id="wd-dashboard-published">
              Published Courses{" "}
              {
                courses.length /*courses.filter((course) => enrollments.some((enrollment) => enrollment.user === currentUser._id && enrollment.course === course._id)).length*/
              }
            </h2>{" "}
            <hr />
            <div id="wd-dashboard-courses" className="row">
              <div className="row row-cols-1 row-cols-md-5 g-4">
                {courses
                  // .filter((course) =>
                  //     enrollments.some(
                  //     (enrollment) =>
                  //         enrollment.user === currentUser._id &&
                  //         enrollment.course === course._id
                  //     )
                  // )
                  .map((course: any) => (
                    <div
                      className="wd-dashboard-course col"
                      style={{ width: "300px" }}
                    >
                      <div className="card rounded-3 overflow-hidden">
                        <Link
                          className="wd-dashboard-course-link text-decoration-none text-dark"
                          to={`/Kanbas/Courses/${course._id}/Home`}
                        >
                          <img
                            src={`/images/reactjs.jpg`}
                            width="100%"
                            height={160}
                            alt="Course Logo"
                          />
                          <div className="card-body">
                            <h5 className="wd-dashboard-course-title card-title">
                              {enrolling && (
                                <button
                                  onClick={(event) => {
                                    event.preventDefault();
                                    updateEnrollment(
                                      course._id,
                                      !course.enrolled
                                    );
                                  }}
                                  className={`btn ${
                                    course.enrolled
                                      ? "btn-danger"
                                      : "btn-success"
                                  } float-end`}
                                >
                                  {course.enrolled ? "Unenroll" : "Enroll"}
                                </button>
                              )}
                              {course.name}
                            </h5>
                            <p
                              className="wd-dashboard-course-title card-text overflow-y-hidden"
                              style={{ maxHeight: 100 }}
                            >
                              {course.description}
                            </p>
                            <button className="btn btn-primary"> Go </button>
                            <button
                              onClick={(event) => {
                                event.preventDefault();
                                deleteCourse(course._id);
                                setCourses((prev: any) =>
                                  prev.filter((c: any) => c._id !== course._id)
                                );
                              }}
                              className="btn btn-danger float-end"
                              id="wd-delete-course-click"
                            >
                              Delete
                            </button>
                            <button
                              onClick={(event) => {
                                event.preventDefault();
                                setCourse(course);
                              }}
                              className="btn btn-warning float-end"
                              id="wd-edit-course-click"
                            >
                              Edit
                            </button>
                          </div>
                        </Link>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </>
        )
        // (<>
        // <button id="wd-enrollments-button" className="btn btn-primary float-end me-2"
        // onClick={toggleCourses
        // }>
        //     Enrollments
        // </button>
        // {
        //     showCourses ? (
        //         <div className="row row-cols-1 row-cols-md-5 g-4">
        //             {displayedCourses
        //                 .map((course: any) => {
        //                     // const isEnrolled = enrollments.some((enrollment) => enrollment.user===currentUser._id &&
        //                     //                                                     enrollment.course===course._id)
        //                     const isEnrolled = enrollmentStatus[course._id];
        //                     return (
        //                 <div className="wd-dashboard-course col" style={{ width: "300px" }}>
        //                     <div className="card rounded-3 overflow-hidden">
        //                     <Link className="wd-dashboard-course-link text-decoration-none text-dark"
        //                             to={`/Kanbas/Courses/${course._id}/Home`}>
        //                         <img src={`/images/reactjs.jpg`} width="100%" height={160} alt="Course Logo"/>
        //                         <div className="card-body">
        //                         <h5 className="wd-dashboard-course-title card-title">
        //                             {course.name}
        //                         </h5>
        //                         <p className="wd-dashboard-course-title card-text overflow-y-hidden" style={{maxHeight: 100}}>
        //                             {course.description}
        //                         </p>
        //                         {isEnrolled ?
        //                             (<button className="btn btn-primary"> Go </button>):
        //                             (<button className="btn btn-primary" onClick={(event) => event.preventDefault()}> Go </button>)}
        //                         {
        //                             isEnrolled ? (
        //                                 <button className="btn btn-danger float-end" id="wd-unenroll-course-click"
        //                                 onClick={(event) => {event.preventDefault();
        //                                                     handleUnenroll(course._id)
        //                                                     // checkEnrollmentStatus(course);
        //                                 }}>
        //                                     Unenroll
        //                                 </button>
        //                             ) :
        //                             (
        //                                 <button className="btn btn-success float-end" id="wd-enroll-course-click"
        //                                 onClick={(event) => {event.preventDefault();
        //                                                     handleEnroll(course._id)
        //                                                     // checkEnrollmentStatus(course);
        //                                 }}>
        //                                     Enroll
        //                                 </button>
        //                             )
        //                         }
        //                         </div>
        //                     </Link>
        //                     </div>
        //                 </div>
        //             )})}
        //         </div>
        //     ) :
        //     (
        //         <div className="row row-cols-1 row-cols-md-5 g-4">
        //             {displayedCourses
        //                 .filter(
        //                     (course) => enrollmentStatus[course._id]
        //                 )
        //                 // .filter((course) =>
        //                 //     enrollments.some(
        //                 //     (enrollment) =>
        //                 //         enrollment.user === currentUser._id &&
        //                 //         enrollment.course === course._id
        //                 //     )
        //                 // )
        //                 .map((course: any) => (
        //                 <div className="wd-dashboard-course col" style={{ width: "300px" }}>
        //                     <div className="card rounded-3 overflow-hidden">
        //                     <Link className="wd-dashboard-course-link text-decoration-none text-dark"
        //                             to={`/Kanbas/Courses/${course._id}/Home`}>
        //                         <img src={`/images/reactjs.jpg`} width="100%" height={160} alt="Course Logo"/>
        //                         <div className="card-body">
        //                         <h5 className="wd-dashboard-course-title card-title">
        //                             {course.name}
        //                         </h5>
        //                         <p className="wd-dashboard-course-title card-text overflow-y-hidden" style={{maxHeight: 100}}>
        //                             {course.description}
        //                         </p>
        //                         <button className="btn btn-primary"> Go </button>
        //                         <button className="btn btn-danger float-end" id="wd-unenroll-course-click"
        //                         onClick={(event) => {event.preventDefault()
        //                                             handleUnenroll(course._id)
        //                                             // checkEnrollmentStatus(course)
        //                         }}>
        //                             Unenroll
        //                         </button>
        //                         </div>
        //                     </Link>
        //                     </div>
        //                 </div>
        //             ))}
        //         </div>
        //     )
        // }
        // </>)}
      }
    </div>
  );
}
