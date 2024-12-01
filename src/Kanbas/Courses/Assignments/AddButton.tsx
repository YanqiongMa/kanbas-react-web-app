import { BsPlus } from "react-icons/bs";
import ProtectedRouteRole from "../ProtectedRouteRole";

export default function AddButton() {
  return (
    <ProtectedRouteRole>
      <BsPlus className="fs-4" />
    </ProtectedRouteRole>
  );
}
