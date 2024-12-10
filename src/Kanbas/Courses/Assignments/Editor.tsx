import { FaCalendar } from "react-icons/fa";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addAssignment, updateAssignment } from "./reducer";
import * as coursesClient from "../client";
import * as assignmentsClient from "./client";

export default function AssignmentEditor() {
  const { aid, cid } = useParams();
  const { assignments } = useSelector((state: any) => state.assignmentsReducer);
  const assignment = assignments.find((a: any) => a._id === aid);
  const [points, setPoints] = useState(assignment?.points || 100);
  const [name, setName] = useState(assignment?.title || "");
  const [description, setDescription] = useState(assignment?.description || "");
  const [due, setDue] = useState(
    assignment?.due ? new Date(assignment.due) : new Date()
  );
  const [availableFrom, setAvailableFrom] = useState(
    assignment?.availableFrom ? new Date(assignment.availableFrom) : new Date()
  );
  const [availableUntil, setAvailableUntil] = useState(
    assignment?.availableUntil
      ? new Date(assignment.availableUntil)
      : new Date()
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const createAssignmentForCourse = async () => {
    if (!cid) return;
    const newAssignment = {
      title: name,
      description,
      points,
      due: due.toISOString(),
      availableFrom: availableFrom.toISOString(),
      availableUntil: availableUntil.toISOString(),
      course: cid,
      _id: aid,
    };
    const assignment = await coursesClient.createAssignmentForCourse(
      cid,
      newAssignment
    );
    dispatch(addAssignment(assignment));
  };

  const saveAssignment = async (assignment: any) => {
    if (!cid) return;
    await assignmentsClient.updateAssignment(assignment);
    dispatch(updateAssignment(assignment));
  };

  const handleSave = () => {
    const updatedAssignment = assignment
      ? {
          ...assignment,
          points,
          title: name,
          description,
          due: due.toLocaleString("en-US", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          }),
          availableFrom: availableFrom.toLocaleString("en-US", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          }),
          availableUntil: availableUntil.toLocaleString("en-US", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          }),
          course: cid,
        }
      : null;

    if (updatedAssignment) saveAssignment(updatedAssignment);
    else createAssignmentForCourse();

    navigate(`/Kanbas/Courses/${cid}/Assignments`);
  };

  return (
    <div id="wd-assignments-editor">
      <form>
        <div className="row mb-3">
          <label htmlFor="wd-name" className="col-sm-2 col-form-label">
            Assignment Name
          </label>
          <input
            id="wd-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="row mb-3">
          <textarea
            id="wd-description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="form-control"
            rows={10}
          />
        </div>
        <div className="row mb-3 col-sm-12 float-end">
          <label
            htmlFor="wd-points"
            className="col-sm-2 col-form-label d-flex justify-content-end"
          >
            Points
          </label>
          <div className="col-sm-10">
            <input
              id="wd-points"
              value={points}
              type="number"
              onChange={(e) => setPoints(parseInt(e.target.value))}
              className="form-control"
            />
          </div>
        </div>
        <div className="row mb-3 col-sm-12 float-end">
          <label
            htmlFor="wd-group"
            className="col-sm-2 col-form-label d-flex justify-content-end"
          >
            Assignment Group
          </label>
          <div className="col-sm-10">
            <select id="wd-group" className="form-select">
              <option value="assignments">ASSIGNMENTS</option>
            </select>
          </div>
        </div>
        <div className="row mb-3 col-sm-12 float-end">
          <label
            htmlFor="wd-display-grade-as"
            className="col-sm-2 col-form-label d-flex justify-content-end"
          >
            Display Grade as
          </label>
          <div className="col-sm-10">
            <select id="wd-display-grade-as" className="form-select">
              <option value="percentage">Percentage</option>
              <option value="complete">Complete</option>
              <option value="points">Points</option>
            </select>
          </div>
        </div>
        <div className="row mb-3 col-sm-12 float-end">
          <label
            htmlFor="wd-submission-type"
            className="col-sm-2 col-form-label d-flex justify-content-end"
          >
            Submission Type
          </label>
          <div className="col-sm-10">
            <div className="border border-1 rounded-2 p-3">
              <select id="wd-submission-type" className="form-select">
                <option value="online">Online</option>
                <option value="paper">Paper</option>
              </select>
              <div className="mt-3">
                <label htmlFor="wd-text-entry" className="mb-3">
                  <b>Online Entry Options</b>
                </label>
                <div className="form-check mb-3">
                  <input
                    type="checkbox"
                    id="wd-text-entry"
                    className="form-check-input"
                  />
                  <label htmlFor="wd-text-entry" className="form-check-label">
                    Text Entry
                  </label>
                </div>
                <div className="form-check mb-3">
                  <input
                    type="checkbox"
                    id="wd-website-url"
                    className="form-check-input"
                  />
                  <label htmlFor="wd-website-url">Website URL</label>
                </div>
                <div className="form-check mb-3">
                  <input
                    type="checkbox"
                    id="wd-media-recordings"
                    className="form-check-input"
                  />
                  <label htmlFor="wd-media-recordings">
                    Media Recordings
                  </label>
                </div>
                <div className="form-check mb-3">
                  <input
                    type="checkbox"
                    id="wd-student-annotation"
                    className="form-check-input"
                  />
                  <label htmlFor="wd-student-annotation">
                    Student Annotation
                  </label>
                </div>
                <div className="form-check mb-3">
                  <input
                    type="checkbox"
                    id="wd-file-upload"
                    className="form-check-input"
                  />
                  <label htmlFor="wd-file-upload">File Uploads</label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row mb-3 col-sm-12 float-end">
          <label
            htmlFor="wd-assign"
            className="col-sm-2 col-form-label d-flex justify-content-end"
          >
            Assign
          </label>
          <div className="col-sm-10">
            <div className="border border-1 rounded-2 p-3">
              <div>
                <label htmlFor="wd-assign-to" className="form-label">
                  <b>Assign to</b>
                </label>
                <input type="text" value="Everyone" className="form-control" />
              </div>
              <div className="mb-4">
                <label htmlFor="wd-due" className="form-label">
                  <b>Due</b>
                </label>
                <div className="input-group">
                  <input
                    type="datetime-local"
                    id="wd-due"
                    value={due.toISOString().slice(0, 16)}
                    onChange={(e) => setDue(new Date(e.target.value))}
                    className="form-control"
                  />
                  <span className="input-group-text">
                    <FaCalendar />
                  </span>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-6">
                  <label htmlFor="wd-available-from" className="form-label">
                    <b>Available From</b>
                  </label>
                  <div className="input-group">
                    <input
                      type="datetime-local"
                      id="wd-available-from"
                      value={availableFrom.toISOString().slice(0, 16)}
                      onChange={(e) => setAvailableFrom(new Date(e.target.value))}
                      className="form-control"
                    />
                    <span className="input-group-text">
                      <FaCalendar />
                    </span>
                  </div>
                </div>
                <div className="col-sm-6">
                  <label htmlFor="wd-available-until" className="form-label">
                    <b>Until</b>
                  </label>
                  <div className="input-group">
                    <input
                      type="datetime-local"
                      id="wd-available-until"
                      value={availableUntil.toISOString().slice(0, 16)}
                      onChange={(e) =>
                        setAvailableUntil(new Date(e.target.value))
                      }
                      className="form-control"
                    />
                    <span className="input-group-text">
                      <FaCalendar />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr className="mt-5" />
        <div className="row float-end">
          <div className="d-flex justify-item-end gap-2">
            <Link
              to={`/Kanbas/Courses/${cid}/Assignments`}
              id="wd-cancel"
              className="btn btn-lg btn-secondary border border-1 border-dark"
            >
              Cancel
            </Link>
            <button
              onClick={handleSave}
              id="wd-save"
              className="btn btn-lg btn-danger"
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
