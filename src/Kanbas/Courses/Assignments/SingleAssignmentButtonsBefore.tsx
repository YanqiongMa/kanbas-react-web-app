import React from "react";
import { MdOutlineAssignment } from "react-icons/md";
import { BsGripVertical } from "react-icons/bs";

const SingleAssignmentButtonsBefore = () => (
  <div className="float-start">
    <BsGripVertical className="me-2 fs-3" />
    <MdOutlineAssignment className="me-2 fs-3 text-success" />
  </div>
);

export default SingleAssignmentButtonsBefore;
