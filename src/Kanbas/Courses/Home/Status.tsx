import { MdDoNotDisturbAlt } from "react-icons/md";
import { FaCheckCircle, FaHome, FaProjectDiagram, FaBell } from "react-icons/fa";
import { BiImport, BiAnalyse } from "react-icons/bi";
import { LiaFileImportSolid } from "react-icons/lia";
import { CiBullhorn } from "react-icons/ci";

export default function CourseStatus() {
  return (
    <div id="wd-course-status" style={{ width: "300px" }}>
      <h2>Course Status</h2>
      <div className="d-flex mb-2">
        <button className="btn btn-lg btn-secondary me-2">
          <MdDoNotDisturbAlt className="me-1" /> Unpublish
        </button>
        <button className="btn btn-lg btn-success">
          <FaCheckCircle className="me-1" /> Publish
        </button>
      </div>
      <div className="d-flex flex-column">
        <button className="btn btn-lg btn-secondary mb-2 w-100 text-start">
          <BiImport className="me-1" /> Import Existing Content
        </button>
        <button className="btn btn-lg btn-secondary mb-2 w-100 text-start">
          <LiaFileImportSolid className="me-1" /> Import From Commons
        </button>
        <button className="btn btn-lg btn-secondary mb-2 w-100 text-start">
          <FaHome className="me-1" /> Choose Home Page
        </button>
        <button className="btn btn-lg btn-secondary mb-2 w-100 text-start">
          <FaProjectDiagram className="me-1" /> View Course Stream
        </button>
        <button className="btn btn-lg btn-secondary mb-2 w-100 text-start">
          <CiBullhorn className="me-1" /> New Announcement
        </button>
        <button className="btn btn-lg btn-secondary mb-2 w-100 text-start">
          <BiAnalyse className="me-1" /> New Analytics
        </button>
        <button className="btn btn-lg btn-secondary mb-2 w-100 text-start">
          <FaBell className="me-1" /> View Course Notifications
        </button>
      </div>
    </div>
  );
}