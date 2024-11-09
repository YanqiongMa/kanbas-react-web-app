import { useSelector } from "react-redux";
import { ReactNode } from "react";

interface ProtectedRouteRoleProps {
  children: ReactNode;
}

export default function ProtectedRouteRole({ children }: ProtectedRouteRoleProps) {
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  return currentUser.role === "FACULTY" ? <>{children}</> : <></>;
}
