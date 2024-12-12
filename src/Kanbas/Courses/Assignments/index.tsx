import { IoEllipsisVertical } from "react-icons/io5";
import AssignmentControls from "./AssignmentControls";
import { BsGripVertical } from "react-icons/bs";
import AssignmentControlButtons from "./AssignmentControlButtons";
import { RiArrowDropDownFill } from "react-icons/ri";
import { useParams, useNavigate } from "react-router";
// import * as db from "../../Database";
import { setAssignments, addAssignment, deleteAssignment, updateAssignment } from "./reducer";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import * as coursesClient from "../client";
import * as assignmentsClient from "./client";
export default function Assignments() {
    function formatDate(dateString: string) {
        const date = new Date(dateString);
        return `${date.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' })} at ${date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}`;
    }
    const { cid, aid } = useParams();
    const { assignments }  = useSelector((state: any) => state.assignmentsReducer);
    const [assignmentName, setAssignmentName] = useState("");
    const [description, setDescription] = useState("");
    const [points, setPoints] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [availableDate, setAvailableDate] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const fetchAssignments = async () => {
        const assignments = await coursesClient.findAssignmentsForCourse(cid as string);
        dispatch(setAssignments(assignments));
    };
    useEffect(() => {
        fetchAssignments();
    }, []);

    const createAssignmentForCourse = async () => {
        if (!cid) return;
        const newAssignment = {title: assignmentName, course: cid, description: description, points: points, dueDate: dueDate, availableDate: availableDate}
        const assignment = await coursesClient.createAssignmentForCourse(cid, newAssignment);
        dispatch(addAssignment(assignment));
    };

    const removeAssignment = async (assignmentId: string) => {
        await assignmentsClient.deleteAssignment(assignmentId);
        dispatch(deleteAssignment(assignmentId));
    };

    const saveAssignment = async (assignment: any) => {
        await assignmentsClient.updateAssignment(assignment);
        dispatch(updateAssignment(assignment));
    };

    return (
        <div id="wd-assignments" style={{marginLeft:"20px", marginRight:"20px"}}>
            <AssignmentControls 
                setAssignmentName={setAssignmentName} 
                assignmentName={assignmentName}
                points={points} 
                setPoints={setPoints}
                description={description}
                setDescription={setDescription}
                dueDate={dueDate}
                setDueDate={setDueDate}
                availableDate={availableDate}
                setAvailableDate={setAvailableDate}
                addAssignment={createAssignmentForCourse}
                // addAssignment={() => {dispatch(addAssignment({title: assignmentName, course: cid, description: description, points: points, dueDate: dueDate, availableDate: availableDate}));
                // setAssignmentName("");
                // setDescription("");
                // setPoints("");
                // setDueDate("");
                // setAvailableDate("");}}
                /><br /><br /><br />
            <ul id="wd-assignment-title" className="list-group rounded-0">
                <li className="wd-assignment-title list-group-item p-0 mb-5 fs-5 border-gray">
                <div className="wd-assignment-title p-3 ps-2 bg-secondary">
                    <BsGripVertical className="me-1 fs-3"/>
                    <RiArrowDropDownFill className="me-2 fs-1" type="button"/>
                    ASSIGNMENTS
                    <IoEllipsisVertical className="float-end fs-3"/>
                    <button className="float-end" style={{ border: "none", background: "none", outline: "none" }}>+</button>
                    <span className="float-end" style={{marginRight:"20px"}}><button style={{ borderRadius: "10px"}}>40% of Total</button></span>
                </div>
                <ul className="wd-assignment-list list-group rounded-0">
                    {assignments
                    // .filter((assignment: any) => assignment.course === cid)
                    .map((assignment: any) => (
                        <li className="wd-assignment-list-item list-group-item p-3 ps-1 wd-lesson">
                            <AssignmentControlButtons
                                assignmentId={assignment._id}
                                deleteAssignment={(assignmentId) => removeAssignment(assignmentId)}/>   
                            <div style={{marginLeft:"75px"}}>
                                <a className="wd-assignment-link text-black"
                                    // href={`#/Kanbas/Courses/${cid}/Assignments/${assignment._id}`}
                                    style={{textDecoration:"none"}}
                                    // onClick={() => fetchAssignmentDetails(assignment._id)}
                                    onClick={() => navigate(`/Kanbas/Courses/${cid}/Assignments/${assignment._id}`)}
                                >
                                    <strong>{assignment._id}-{assignment.title}</strong>
                                </a>
                                <br/>
                                <span><a className="wd-modules-list-link text-danger"
                                    href="https://www.google.com" style={{textDecoration:"none"}}>Multiple Modules</a> | <strong>Not available until</strong> {formatDate(assignment.availableDate)} | </span>
                                <br />
                                <span>
                                    <strong>Due</strong> {formatDate(assignment.dueDate)} | {assignment.points} pts
                                </span>
                            </div>
                        </li>
                    ))}
                </ul>
                </li>
            </ul>
        </div>
    );
}
  