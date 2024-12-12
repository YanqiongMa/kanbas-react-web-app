import { FaSearch } from "react-icons/fa";
import { IoEllipsisVertical } from "react-icons/io5";
import AssignmentEditor from "./AssignmentEditor";
import '../../styles.css';
export default function AssignmentControls(
    { assignmentName, setAssignmentName, points, setPoints, description, setDescription, dueDate, setDueDate, availableDate, setAvailableDate, addAssignment}: 
    { assignmentName: string; setAssignmentName: (title: string) => void; addAssignment: () => void;
        points: string; setPoints: (points: string) => void;
        description: string; setDescription: (description: string) => void;
        dueDate: string; setDueDate: (dueDate: string) => void;
        availableDate: string; setAvailableDate: (availableDate: string) => void;
    }
) {
    return (
        <div>
            <div className="search-box-container me-1">
                <FaSearch className="search-icon fs-3"/>        
                <input id="wd-search-assignment" type="search"
                    placeholder="Search for Assignment" className="search-input"/>
            </div>
        <button id="wd-options-assignment" className="btn btn-lg btn-secondary me-1 float-end"><IoEllipsisVertical /></button>
        <button id="wd-add-assignment" className="btn btn-lg btn-danger me-1 float-end"
        data-bs-toggle="modal" data-bs-target="#wd-add-module-dialog">
            + Assignment
        </button>
        <button id="wd-add-assignment-group" className="btn btn-lg btn-secondary me-1 float-end">
            + Group
        </button>
        <AssignmentEditor dialogTitle="Add Assignment" assignmentName={assignmentName} setAssignmentName={setAssignmentName} 
        points={points} setPoints={setPoints} description={description} setDescription={setDescription}
        dueDate={dueDate} setDueDate={setDueDate} availableDate={availableDate} setAvailableDate={setAvailableDate} 
        addAssignment={addAssignment}/>
        </div>
    )
}