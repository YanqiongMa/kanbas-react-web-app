import React from "react";
import { Link } from "react-router-dom";
import EnrollButtons from "./EnrollButtons";
export default function CourseCard({
    course,
    isFaculty,
    isStudent,
    enrolling,
    setEnrolling,
    setCourse,
    deleteCourse,
    updateEnrollment
  }: {
    course: any;
    isFaculty: boolean;
    isStudent: boolean;
    enrolling: boolean;
    setEnrolling: (enrolling: boolean) => void;
    setCourse: (course: any) => void;
    deleteCourse: (courseId: string) => void;
    updateEnrollment: (courseId: string, enrolled: boolean) => void;
  }) {
    return (
        <div className="wd-dashboard-course col" style={{ width: "270px" }}>
          <div className="card rounded-3 overflow-hidden">
            <Link
              className="wd-dashboard-course-link text-decoration-none text-dark"
              to={`/Kanbas/Courses/${course._id}/Home`}
            >
              <div className="card-body">
                <h5 className="wd-dashboard-course-title card-title">
                {enrolling && (                
                <button onClick={(event) => {
                            event.preventDefault();
                            updateEnrollment(course._id, !course.enrolled);
                        }}
                        className={`btn ${ course.enrolled ? "btn-danger" : "btn-success" } float-end`} >
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
                { isFaculty && (
                          <>
                            <button onClick={(event) => {
                              event.preventDefault();
                              console.log(course);
                              deleteCourse(course._id);
                            }} className="btn btn-danger float-end"
                            id="wd-delete-course-click"
                            >
                              Delete
                            </button>
                            <button id="wd-edit-course-click"
                              onClick={(event) => {
                                event.preventDefault();
                                console.log(course);
                                setCourse(course);
                              }}
                              className="btn btn-warning me-2 float-end">
                              Edit
                            </button>
                          </>
                        )}
              </div>
            </Link>
          </div>
        </div>
      );
  }