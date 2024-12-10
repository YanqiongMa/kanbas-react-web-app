import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { enroll, fetchAllCourses, fetchUserEnrollments } from './client';
import EnrollButtons from './EnrollButtons';
import { setEnrollments } from './reducer';
import CourseCard from './CourseCard';

export default function Dashboard(
  { courses, course, setCourse, addNewCourse,
    deleteCourse, updateCourse, refreshCourses, enrolling, setEnrolling, updateEnrollment  }: {
    courses: any[]; course: any; setCourse: (course: any) => void;
    addNewCourse: () => void; deleteCourse: (course: any) => void;
    updateCourse: () => void; refreshCourses: () => void;
    enrolling: boolean; setEnrolling: (enrolling: boolean) => void;
    updateEnrollment: (courseId: string, enrolled: boolean) => void;
  })
   {
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const isFaculty = currentUser.role === "FACULTY";
    const isStudent = currentUser.role === "STUDENT";
  return (
    <div id='wd-dashboard'>
        <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
        {/* Show enrollment */}
        <button
          onClick={() => setEnrolling(!enrolling)}
          className="float-end btn btn-primary"
        >
          {enrolling ? "Enrolled" : "All"}
        </button>
        
        {/* FOR FACULTY: edit courses */}
        { isFaculty && (
          <>
            <h5>New Course
              <button 
                className="btn btn-primary float-end"
                id="wd-add-new-course-click"
                onClick={addNewCourse} 
              >
                Add 
              </button>
              <button 
                className="btn btn-warning float-end me-2"
                onClick={updateCourse} id="wd-update-course-click"
              >
                Update
              </button>
            </h5> <br />
            <input value={course.name} className="form-control mb-2"
              onChange={(e) => setCourse({ ...course, name: e.target.value }) } />
            <textarea value={course.description} className="form-control"
                  onChange={(e) => setCourse({ ...course, description: e.target.value }) } />
            <hr />
          </>
        )}

      {/* <h2 id="wd-dashboard-published">Published Courses ({courses.length})</h2> */}
      <h2 id="wd-dashboard-published">
        {enrolling ? "All" : "Enrolled"} ({courses.length})
      </h2>
      <hr />

      <div id='wd-dashboard-courses' className='row'>
        <div className="row row-cols-1 row-cols-md-5 g-4">
          {courses.map((course) => (
                <CourseCard
                  key={course._id}
                  enrolling={enrolling}
                  setEnrolling={setEnrolling}
                  course={course}
                  isFaculty={isFaculty}
                  isStudent={isStudent}
                  setCourse={setCourse}
                  deleteCourse={deleteCourse}
                  updateEnrollment={updateEnrollment}
                />
              ))}

        </div>
      </div>
    </div>
  );
}
