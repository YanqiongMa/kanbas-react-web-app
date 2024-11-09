import { useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRouteEditor({ children }: ProtectedRouteProps) {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { cid: courseId } = useParams();

  return currentUser.role === "FACULTY" ? (
    <>{children}</>
  ) : (
    <Navigate to={`/Kanbas/Courses/${courseId}/Assignments`} />
  );
}
