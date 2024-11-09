import { useSelector } from "react-redux";
import DeleteButton from "./DeleteButton";
import ConfirmButton from "./ConfirmButton";
import OptionsButton from "./OptionsButton";
import DeleteDialog from "./DeleteDialog";

export default function LControlButtons({
  assignmentId,
  currentAssignmentId,
  setId,
  deleteAssignment,
}: {
  assignmentId: string;
  currentAssignmentId: string;
  setId: (id: string) => void;
  deleteAssignment: (assignmentId: string) => void;
}) {
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  return (
    <div className="float-end d-flex">
      {currentUser.role === "FACULTY" && (
        <DeleteButton onClick={(e) => setId(assignmentId)} />
      )}
      <ConfirmButton />
      <OptionsButton />
      <DeleteDialog
        assignmentId={currentAssignmentId}
        deleteAssignment={deleteAssignment}
      />
    </div>
  );
}
