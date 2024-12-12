import { RiArrowDropDownFill } from "react-icons/ri";
import { useNavigate, useParams } from "react-router-dom";
// import * as db from "../../Database";
import { updateAssignment } from "./reducer";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import * as assignmentsClient from "./client";
export default function AssignmentEditor() {
    const { cid, aid } = useParams();
    // const assignments = db.assignments;
    
    // const assignment = assignments.find((assignment) => assignment.course === cid && assignment._id === aid);
    
    const fetchAssignmentDetails = async (assignmentId: string) => {

        const assignment = await assignmentsClient.getAssignmentById(assignmentId);
        // console.log(assignment);
        setAssignmentName(assignment.title);
        setDescription(assignment.description);
        setPoints(assignment.points);
        setDueDate(assignment.dueDate);
        setAvailableDate(assignment.availableDate);
        setLoading(false);
    };

    useEffect(() => {
        if (aid) {
            fetchAssignmentDetails(aid)
        }
    }, [aid]);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [assignmentName, setAssignmentName] = useState("");
    const [description, setDescription] = useState("");
    const [points, setPoints] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [availableDate, setAvailableDate] = useState("");
    const [loading, setLoading] = useState(true)
    

    const saveAssignment = async (assignment: any) => {
        await assignmentsClient.updateAssignment(assignment);
        dispatch(updateAssignment(assignment));
    };
    if (loading){
        return <div>Assignment not found</div>
    }
    return (
        
        <div id="wd-assignments-editor" style={{marginLeft:"2%", marginRight:"2%"}}>
            <label htmlFor="wd-name" >Assignment Name</label>
            <br />
            <input id="wd-name" value={assignmentName} className="form-control mb-2"
            onChange={(e) => setAssignmentName(e.target.value)}/><br />
            <textarea id="wd-description" rows={10} cols={50} className="form-control mb-2" 
            value={description} onChange={(e) => setDescription(e.target.value)}>
            </textarea>
            
            <br />
            <br />

            <div >
            <div className="d-flex">
                <div className="w-50 pe-5">
                    <label htmlFor="wd-points" className="float-end" style={{marginTop:"5px"}}>Points</label>
                </div>
                <div className="w-50 pe-3">
                    <input id="wd-points" value={points} className="form-control mb-2"
                    onChange={(e) => setPoints(e.target.value)}/>
                </div>
            </div>
            <br />

            <div className="d-flex">
                <div className="w-50 pe-5">
                <label htmlFor="wd-group" className="float-end" style={{marginTop:"5px"}}>Assignment Group</label>
                </div>
                <div className="w-50 pe-3" style={{position:"relative"}}>
                    <select name="assignment-group" id="wd-group" className="form-control mb-2">
                        <option value="" disabled selected>ASSIGNMENTS</option>
                        <option value="VAL1">Option 1</option>
                        <option value="VAL1">Option 2</option>
                    </select>
                    <RiArrowDropDownFill className="fs-1" style={{position:"absolute", top:"1%", right:"3%", pointerEvents:"none"}}/>
                </div>
            </div>
            <br />

            <div className="d-flex">
                <div className="w-50 pe-5">
                <label htmlFor="wd-display-grade-as" className="float-end" style={{marginTop:"5px"}}>Display Grade as</label>
                </div>
                <div className="w-50 pe-3" style={{position:"relative"}}>
                    <select name="display-grade" id="wd-display-grade-as" className="form-control mb-2">
                        <option value="VAL1">Percentage</option>
                        <option value="VAL1">Option 2</option>
                    </select>
                    <RiArrowDropDownFill className="fs-1" style={{position:"absolute", top:"1%", right:"3%", pointerEvents:"none"}}/>
                </div>
            </div>
            <br />
            
            <div className="d-flex ps-3 pe-3" >
                <div className="w-50 pe-5">
                <label htmlFor="wd-submission-type" className="float-end" style={{marginTop:"5px"}}>Submission Type</label>
                </div>
                <div className="w-50 border p-3">
                    <div style={{position:"relative"}}>
                    <select name="submission-type" id="wd-submission-type" className="form-control mb-2">
                        <option value="VAL1">Online</option>
                        <option value="VAL1">Option 2</option>
                    </select>
                    <RiArrowDropDownFill className="fs-1" style={{position:"absolute", top:"1%", right:"1%", pointerEvents:"none"}}/>
                    </div>

                    <br />

                    <div>
                    <label htmlFor="wd-entry-checkbox-type" ><strong>Online Entry Options</strong></label>
                    <br />
                    <br />
                    <input type="checkbox" name="check-entry" id="wd-text-entry" className="form-check-input"/>
                    <label htmlFor="wd-text-entry" className="form-check-label ps-3 mb-2">Text Entry</label><br />

                    <input type="checkbox" name="check-entry" id="wd-website-url" className="form-check-input"/>
                    <label htmlFor="wd-website-url" className="form-check-label ps-3 mb-2">Website URL</label><br/>

                    <input type="checkbox" name="check-entry" id="wd-media-recording" className="form-check-input"/>
                    <label htmlFor="wd-media-recording" className="form-check-label ps-3 mb-2">Media Recordings</label><br/>

                    <input type="checkbox" name="check-entry" id="wd-student-annotation" className="form-check-input"/>
                    <label htmlFor="wd-student-annotation" className="form-check-label ps-3 mb-2">Student Annotations</label><br />

                    <input type="checkbox" name="check-entry" id="wd-file-upload" className="form-check-input"/>
                    <label htmlFor="wd-file-upload" className="form-check-label ps-3">File Uploads</label><br />
                    </div>
                </div>
            </div>
            <br />
            
            <div className="d-flex ps-3 pe-3" >
                <div className="w-50 pe-5">
                <label htmlFor="wd-assign-to" className="float-end" style={{marginTop:"5px"}}> Assign</label> 
                </div>
                <div className="w-50 border p-3">
                    <div>
                        <label htmlFor="wd-assign-to" className="mb-2"><strong>Assign to</strong></label>
                        <input type="text" id="wd-assign-to" value={"Everyone"} className="form-control mb-2"/>
                    </div>

                    <br />

                    <div>
                        <label htmlFor="wd-due-date" className="mb-2"><strong>Due</strong></label>
                        <input type="datetime-local" id="wd-due-date" name="due-date" value={dueDate} className="form-control mb-2"
                        onChange={(e) => setDueDate(e.target.value)}/>
                    </div>

                    <br />

                    <div className="row">
                        <div className="col-md-6 mb-2">
                            <label htmlFor="wd-available-from" className="mb-2"><strong>Available From</strong></label>
                            <input type="datetime-local" id="wd-available-from" name="available-from" value={availableDate} className="form-control mb-2"
                            onChange={(e) => setAvailableDate(e.target.value)}/>
                        </div>

                        <div className="col-md-6 mb-2">
                            <label htmlFor="wd-due-date" className="mb-2"><strong>Until</strong></label>
                            <input type="datetime-local" id="wd-available-until" name="available-until" value={dueDate} className="form-control mb-2"
                            onChange={(e) => setDueDate(e.target.value)}/>
                        </div>
                    </div>
                    
                </div>
            </div>
            <br />
            
            </div>

            <hr />

            <div className="pe-3">
                <button id="wd-assignment-save" className="btn btn-danger float-end"
                onClick={() => {
                    saveAssignment({_id: aid,
                            title: assignmentName,
                            description: description,
                            points: points,
                            dueDate: dueDate,
                            availableDate: availableDate,
                            })
                    navigate(`/Kanbas/Courses/${cid}/Assignments`);
                }}
                >
                    Save
                </button>
                <button id="wd-assignment-cancel" className="btn btn-secondary float-end me-2"><a href={`#/Kanbas/Courses/${cid}/Assignments`} className="text-decoration-none text-black">Cancel</a></button>
            </div>

        </div>
    );
}    