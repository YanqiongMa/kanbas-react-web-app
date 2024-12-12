// export default function CourseStatus() {
//     return (
//       <div id="wd-course-status">
//         <h2>Course Status</h2>
//         <button id="wd-course-unpublish">Unpublish</button> <button id="wd-course-publish">Publish</button>
//         <br />
//         <br />
//         <button id="wd-import-content">Import Existing Content</button>
//         <br />
//         <button id="wd-import-commons">Import From Commons</button>
//         <br />
//         <button id="wd-choose-page">Choose Home Page</button>
//         <br />
//         <button id="wd-choose-stream">Choose Course Stream</button>
//         <br />
//         <button id="wd-new-announcement">New Announcement</button>
//         <br />
//         <button id="wd-new-analytics">New Analytics</button>
//         <br />
//         {/* Complete on your own */}
//         <button id="wd-course-notifications">View Course Notifications</button>
//       </div>
//   );}
  
import { MdDoNotDisturbAlt } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";
import { BiImport } from "react-icons/bi";
import { LiaFileImportSolid } from "react-icons/lia";
import { FaHome } from "react-icons/fa";
import { IoStatsChart } from "react-icons/io5";
import { TfiAnnouncement } from "react-icons/tfi";
import { IoMdNotifications } from "react-icons/io";
{/* Find more icons */}
export default function CourseStatus() {
  return (
    <div id="wd-course-status" style={{ width: "300px", marginLeft: "30px"}}>
      <h2>Course Status</h2>
      <div className="d-flex">
        <div className="w-50 pe-1">
          <button className="btn btn-lg btn-secondary w-100 text-nowrap ">
            <MdDoNotDisturbAlt className="me-2 fs-5" /> Unpublish </button>
        </div>
        <div className="w-50">
          <button className="btn btn-lg btn-success w-100">
            <FaCheckCircle className="me-2 fs-5" /> Publish </button>
        </div>
      </div><br />
      <button className="btn btn-lg btn-secondary w-100 mt-1 text-start">
        <BiImport className="me-2 fs-5" /> Import Existing Content </button>
      <button className="btn btn-lg btn-secondary w-100 mt-1 text-start">
        <LiaFileImportSolid className="me-2 fs-5" /> Import from Commons </button>
      <button className="btn btn-lg btn-secondary w-100 mt-1 text-start">
        <FaHome className="me-2 fs-5" /> Choose Home Page </button>
      <button className="btn btn-lg btn-secondary w-100 mt-1 text-start">
        <IoStatsChart className="me-2 fs-5" /> View Course Screen </button>
      <button className="btn btn-lg btn-secondary w-100 mt-1 text-start">
        <TfiAnnouncement className="me-2 fs-5" /> New Announcement </button>  
      <button className="btn btn-lg btn-secondary w-100 mt-1 text-start">
        <IoStatsChart className="me-2 fs-5" /> New Analytics </button>
      <button className="btn btn-lg btn-secondary w-100 mt-1 text-start">
        <IoMdNotifications className="me-2 fs-5" /> View Course Notifications </button>
      {/* Complete the rest of the buttons */}
    </div>
);}
