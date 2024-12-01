import { Link } from "react-router-dom";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { unenroll, enroll, toggleEnrollmentsOn } from "./reducer";

export default function Dashboard({
  courses,
  course,
  setCourse,
  addNewCourse,
  deleteCourse,
  updateCourse,
}: {
  courses: any[];
  course: any;
  setCourse: (course: any) => void;
  addNewCourse: () => void;
  deleteCourse: (course: any) => void;
  updateCourse: () => void;
}) {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { enrollments, enrollmentsOn } = useSelector(
    (state: any) => state.enrollmentsReducer
  );
  const dispatch = useDispatch();

  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      {currentUser.role === "STUDENT" && (
        <div>
          <button
            className="btn btn-primary float-end"
            id="wd-add-new-course-click"
            onClick={(e) => dispatch(toggleEnrollmentsOn())}
          >
            Enrollments
          </button>
        </div>
      )}
      {currentUser.role === "FACULTY" && (
        <div>
          <div className="row align-items-center mb-2">
            <h5 className="col mb-0 d-flex align-items-center">
              New Course
              <button
                className="btn btn-warning me-2 ms-auto"
                onClick={updateCourse}
                id="wd-update-course-click"
              >
                Update
              </button>
              <button
                className="btn btn-primary"
                id="wd-add-new-course-click"
                onClick={addNewCourse}
              >
                Add
              </button>
            </h5>
          </div>

          <input
            value={course.name}
            className="form-control mb-2"
            onChange={(e) => setCourse({ ...course, name: e.target.value })}
          />
          <textarea
            value={course.description}
            className="form-control mb-2"
            onChange={(e) =>
              setCourse({ ...course, description: e.target.value })
            }
          />
          <hr />
        </div>
      )}
      <h2 id="wd-dashboard-published">
        Published Courses (
        {
          courses.filter((course) =>
            enrollments.some(
              (enrollment: { user: any; course: any }) =>
                (enrollment.user === currentUser._id &&
                  enrollment.course === course._id &&
                  ((!enrollmentsOn && currentUser.role === "STUDENT") ||
                    currentUser.role !== "STUDENT")) ||
                (currentUser.role === "STUDENT" && enrollmentsOn)
            )
          ).length
        }
        )
      </h2>{" "}
      <hr />
      <div id="wd-dashboard-courses" className="mt-4 mb-4">
        <div className="row row-cols-1 row-cols-md-5 g-4">
          {courses
            .map((course) => (
              <div
                className="wd-dashboard-course col"
                style={{ width: "300px" }}
                key={course._id}
              >
                <div className="card rounded-3 overflow-hidden shadow-sm ">
                  <Link
                    className="wd-dashboard-course-link text-decoration-none text-dark "
                    to={`/Kanbas/Courses/${course._id}/Home`}
                  >
                    <img
                      src={`/images/${course._id}.jpg`}
                      onError={(e) => (e.currentTarget.src = "/images/reactjs.jpg")}
                      width="100%"
                      height={160}
                      alt={course.name}
                    />
                    <div className="card-body ">
                      <h5 className="wd-dashboard-course-title card-title">
                        {course.name}
                      </h5>
                      <p
                        className="wd-dashboard-course-title card-text overflow-y-hidden"
                        style={{ maxHeight: 100 }}
                      >
                        {course.description}
                      </p>
                      <Link
                        className="wd-dashboard-course-button"
                        to={`/Kanbas/Courses/${course._id}/Home`}
                      >
                        <button className="btn btn-primary"> Go </button>
                      </Link>
                      {currentUser.role === "FACULTY" && (
                        <span>
                          <button
                            onClick={(event) => {
                              event.preventDefault();
                              deleteCourse(course._id);
                            }}
                            className="btn btn-danger float-end"
                            id={`wd-delete-course-click-${course._id}`}
                          >
                            Delete
                          </button>
                          <button
                            id={`wd-edit-course-click-${course._id}`}
                            onClick={(event) => {
                              event.preventDefault();
                              setCourse(course);
                            }}
                            className="btn btn-warning me-2 float-end"
                          >
                            Edit
                          </button>
                        </span>
                      )}
                      {currentUser.role === "STUDENT" && enrollmentsOn && (
                        <span>
                          {enrollments.some(
                            (enrollment: { user: any; course: any }) =>
                              enrollment.user === currentUser._id &&
                              enrollment.course === course._id
                          ) && (
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                dispatch(
                                  unenroll({
                                    user: currentUser._id,
                                    course: course._id,
                                  })
                                );
                              }}
                              className="btn btn-danger float-end"
                              id={`unenroll-button-${course._id}`}
                            >
                              Unenroll
                            </button>
                          )}
                          {!enrollments.some(
                            (enrollment: { user: any; course: any }) =>
                              enrollment.user === currentUser._id &&
                              enrollment.course === course._id
                          ) && (
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                dispatch(
                                  enroll({
                                    user: currentUser._id,
                                    course: course._id,
                                  })
                                );
                              }}
                              className="btn btn-success float-end"
                              id={`enroll-button-${course._id}`}
                            >
                              Enroll
                            </button>
                          )}
                        </span>
                      )}
                    </div>
                  </Link>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
