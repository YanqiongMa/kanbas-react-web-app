import { IoEllipsisVertical } from "react-icons/io5";
import { BsGripVertical } from "react-icons/bs";
import GreenCheckmark from "../Modules/GreenCheckmark";
import { BiNotepad } from "react-icons/bi";
import { FaTrash } from "react-icons/fa";
import { deleteAssignment } from "./reducer";
import DeleteAssignment from "./DeleteConfirmation";
export default function AssignmentControlButtons(
    {assignmentId, deleteAssignment} : 
    { 
        assignmentId: string, 
        deleteAssignment: (assignmentId: string) => void; 
    }
) {
    const modalId = `wd-delete-assignment-dialog-${assignmentId}`;
    return (
        <div>
            <div className="float-end">
                <GreenCheckmark />
                <IoEllipsisVertical className="fs-3" />
                <FaTrash className="text-danger me-2 mb-1" type="button" data-bs-toggle="modal" data-bs-target={`#${modalId}`}/>
            </div>

            <div className="float-start">
                <BsGripVertical className="fs-3"/>
                <BiNotepad style={{color: "lightgreen"}} className="fs-3"/>
            </div>
            <DeleteAssignment dialogTitle="Delete Assignment" assignmentId={assignmentId} deleteAssignment={deleteAssignment} modalId={modalId}/>
        </div>

);}