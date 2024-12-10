import React from "react";
import GreenCheckmark from "../Modules/GreenCheckmark";
import { IoEllipsisVertical } from "react-icons/io5";
import { FaTrash } from "react-icons/fa";

const SingleAssignmentButtons = ({
  assignmentId,
  deleteAssignment,
}: {
  assignmentId: string;
  deleteAssignment: (assignmentId: string) => void;
}) => {
  const handleDelete = () => {
    const confirm = window.confirm(
      "Are you sure you want to delete this assignment? This action cannot be undone."
    );
    if (confirm) {
      deleteAssignment(assignmentId);
    }
  };

  return (
    <div className="float-end">
      <FaTrash
        className="fs-5 text-danger me-2 mb-1"
        onClick={handleDelete}
      />
      <GreenCheckmark />
      <IoEllipsisVertical className="fs-4" />
    </div>
  );
};

export default SingleAssignmentButtons;
