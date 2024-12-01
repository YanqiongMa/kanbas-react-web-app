import { useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";

export default function ProtectedRouteCourse({ children }: { children: JSX.Element }) {
  const { cid: courseId } = useParams();
  const { currentUser, enrollments } = useSelector((state: any) => ({
    currentUser: state.accountReducer.currentUser,
    enrollments: state.enrollmentsReducer.enrollments,
  }));

  const isEnrolled = currentUser && enrollments.some(
    (enrollment: { user: string; course: string }) =>
      enrollment.user === currentUser._id && enrollment.course === courseId
  );

  return isEnrolled ? children : <Navigate to="/Kanbas/Dashboard" />;
}
