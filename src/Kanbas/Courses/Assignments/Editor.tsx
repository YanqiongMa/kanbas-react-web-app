import React, { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addAssignment, updateAssignment } from "./reducer";
import { RootState } from "../../store";
import * as coursesClient from "../client";
import * as assignmentsClient from "./client";

type Assignment = {
  _id?: string;
  title: string;
  course: string;
  modules: string;
  description: string;
  points: string;
  due_date: string;
  available_date: string;
  available_until_date: string;
};

const AssignmentEditor: React.FC = () => {
  const { cid, aid } = useParams<{ cid: string; aid: string }>();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const assignments = useSelector((state: RootState) => state.assignmentsReducer.assignments);

  const initialAssignment: Assignment = {
    title: "",
    course: cid || "",
    modules: "",
    description: "",
    points: "",
    due_date: "",
    available_date: "",
    available_until_date: "",
    ...(assignments.find((a) => a._id === aid)
      ? {
          ...assignments.find((a) => a._id === aid),
          points: String(assignments.find((a) => a._id === aid)!.points),
          due_date: assignments.find((a) => a._id === aid)?.dueDate || "",
          available_date: assignments.find((a) => a._id === aid)?.availableDate || "",
          available_until_date: assignments.find((a) => a._id === aid)?.availableDate || "",
        }
      : {}),
  };

  const [assignment, setAssignment] = useState<Assignment>(initialAssignment);

  const handleSave = async () => {
    if (assignment.title.trim()) {
      if (assignment._id) {
        const updatedAssignment = await assignmentsClient.updateAssignment(assignment);
        dispatch({
          type: "UPDATE_ASSIGNMENT",
          payload: updatedAssignment,
        });
      } else {
        const newAssignment = await coursesClient.createAssignmentsForCourse(cid!, assignment);
        dispatch({
          type: "ADD_ASSIGNMENT",
          payload: newAssignment,
        });
      }
      navigate(`/Kanbas/Courses/${cid}/Assignments`);
    }
  };
  

  const handleChange = (field: keyof Assignment, value: string) => {
    setAssignment((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div>
      <form id="assignment-form" className="g-3">
        <InputField label="Assignment Name" value={assignment.title} onChange={(e) => handleChange("title", e.target.value)} />
        <TextAreaField label="Description" value={assignment.description} onChange={(e) => handleChange("description", e.target.value)} />
        <InputField label="Points" value={assignment.points} onChange={(e) => handleChange("points", e.target.value)} />

        <SelectField label="Assignment Group" options={["Assignments", "Quizzes", "Project"]} />
        <SelectField label="Display Grade As" options={["Percentage", "Points"]} />

        <SubmissionTypeSelect />
        <AssignmentDateInputs assignment={assignment} onDateChange={handleChange} />

        <hr />
        <button type="button" className="btn btn-lg btn-danger me-1 float-end" onClick={handleSave}>
          Save
        </button>
        <Link to={`/Kanbas/Courses/${cid}/Assignments`}>
          <button type="button" className="btn btn-lg btn-secondary me-1 float-end">
            Cancel
          </button>
        </Link>
      </form>
    </div>
  );
};

interface InputFieldProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<InputFieldProps> = ({ label, value, onChange }) => (
  <div className="mb-3">
    <label className="form-label">{label}</label>
    <input type="text" className="form-control" value={value} onChange={onChange} />
  </div>
);

interface TextAreaFieldProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const TextAreaField: React.FC<TextAreaFieldProps> = ({ label, value, onChange }) => (
  <div className="mb-3">
    <label className="form-label">{label}</label>
    <textarea className="form-control" rows={5} value={value} onChange={onChange}></textarea>
  </div>
);

interface SelectFieldProps {
  label: string;
  options: string[];
}

const SelectField: React.FC<SelectFieldProps> = ({ label, options }) => (
  <div className="row mb-3">
    <label className="col-sm-2 col-form-label text-end">{label}</label>
    <div className="col">
      <select className="form-select">
        {options.map((opt) => (
          <option key={opt} value={opt.toUpperCase()}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  </div>
);

const SubmissionTypeSelect: React.FC = () => (
  <fieldset className="row mb-3">
    <legend className="col-form-label col-sm-2 pt-0 text-end">Submission Type</legend>
    <div className="col">
      <div className="border rounded p-3">
        <select className="form-select mb-3">
          <option value="Online">Online</option>
          <option value="Offline">InPerson</option>
        </select>
        <legend className="form_input_header_label col-form-label col-sm-3 pt-0 mb-2">
          Online Entry Options
        </legend>
        {["Text Entry", "Website URL", "Media Recordings", "File Uploads"].map((option) => (
          <div className="form-check" key={option}>
            <input type="checkbox" className="form-check-input" id={`wd-${option.toLowerCase().replace(" ", "-")}`} />
            <label htmlFor={`wd-${option.toLowerCase().replace(" ", "-")}`} className="form-check-label ms-2">
              {option}
            </label>
          </div>
        ))}
      </div>
    </div>
  </fieldset>
);

interface AssignmentDateInputsProps {
  assignment: Assignment;
  onDateChange: (field: keyof Assignment, date: string) => void;
}

const AssignmentDateInputs: React.FC<AssignmentDateInputsProps> = ({ assignment, onDateChange }) => (
  <fieldset className="row mb-5">
    <legend className="col-form-label col-sm-2 pt-0 text-end">Assign</legend>
    <div className="col">
      <div className="border rounded p-3">
        <DateField label="Due Date" value={assignment.due_date} onChange={(date) => onDateChange("due_date", date)} />
        <DateField label="Available From" value={assignment.available_date} onChange={(date) => onDateChange("available_date", date)} />
        <DateField label="Available Until" value={assignment.available_until_date} onChange={(date) => onDateChange("available_until_date", date)} />
      </div>
    </div>
  </fieldset>
);

interface DateFieldProps {
  label: string;
  value: string;
  onChange: (date: string) => void;
}

const DateField: React.FC<DateFieldProps> = ({ label, value, onChange }) => (
  <div className="col-md-6 mb-3">
    <label className="form-label">{label}</label>
    <input type="date" className="form-control" value={value} onChange={(e) => onChange(e.target.value)} />
  </div>
);

export default AssignmentEditor;
