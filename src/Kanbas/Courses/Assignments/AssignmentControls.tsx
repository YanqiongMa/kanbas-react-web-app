import React from "react";
import { FaPlus } from "react-icons/fa";
import { IoEllipsisVertical } from "react-icons/io5";

const AssignmentControls = ({ isFaculty }: { isFaculty: boolean }) => (
  <div className="float-end">
    <span
      className="border border-1 border-dark rounded"
      style={{ padding: "6px", fontSize: "18px" }}
    >
      40% of total
    </span>
    {isFaculty && (
      <>
        <FaPlus
          className="fs-5"
          style={{ marginLeft: "12px", marginRight: "10px" }}
        />
        <IoEllipsisVertical className="fs-4" />
      </>
    )}
  </div>
);

export default AssignmentControls;
