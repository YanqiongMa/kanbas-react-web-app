import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addEnrollment, deleteEnrollment, setEnrollments } from "./reducer";
import { enroll, unenroll } from "./client";

export default function EnrollButtons({ courseId }: { courseId: string }) {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { enrollments } = useSelector((state: any) => state.enrollmentReducer);

  const isEnrolled = enrollments.some(
    (enrollment: any) =>
      enrollment.user === currentUser._id && enrollment.course === courseId
  );

  const handleEnroll = async () => {
    try {
      const updatedEnrollments = await enroll(currentUser._id, courseId);
      dispatch(addEnrollment({ user: currentUser._id, course: courseId }));
      dispatch(setEnrollments(updatedEnrollments));
    } catch (error) {
      console.error("Error enrolling:", error);
    }
  };

  const handleUnenroll = async () => {
    try {
      const updatedEnrollments = await unenroll(currentUser._id, courseId);
      dispatch(deleteEnrollment({ user: currentUser._id, course: courseId }));
      dispatch(setEnrollments(updatedEnrollments));
    } catch (error) {
      console.error("Error unenrolling:", error);
    }
  };

  return isEnrolled ? (
    <button
      className="btn btn-danger float-end"
      onClick={(e) => {
        e.preventDefault();
        handleUnenroll();
      }}
    >
      Unenroll
    </button>
  ) : (
    <button
      className="btn btn-primary float-end"
      onClick={(e) => {
        e.preventDefault();
        handleEnroll();
      }}
    >
      Enroll
    </button>
  );
}
