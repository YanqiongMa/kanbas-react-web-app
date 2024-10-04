import { IoEllipsisVertical } from "react-icons/io5";
import { BsPlus } from "react-icons/bs"; // Import the BsPlus icon
import GreenCheckmark from "./GreenCheckmark";
import React from 'react';


export default function ModuleControlButtons() {
  return (
    <div className="float-end">
      <GreenCheckmark />
      <BsPlus className="fs-4" /> {/* Add the BsPlus icon */}
      <IoEllipsisVertical className="fs-4" />
    </div>
  );
}
