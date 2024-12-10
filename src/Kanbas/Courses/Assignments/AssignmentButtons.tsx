import { FaPlus, FaSearch } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";

const AssignmentButtons = ({ isFaculty }: { isFaculty: boolean }) => {
  const { assignments } = useSelector((state: any) => state.assignmentsReducer);
  const { cid } = useParams();
  const navigate = useNavigate();

  const handleAddAssignment = () => {
    const newId = `A${new Date().getTime()}`;
    navigate(`/Kanbas/Courses/${cid}/Assignments/${newId}`);
  };

  return (
    <div className="mb-3 d-flex justify-content-between align-items-center">
      {/* Search Bar */}
      <div className="d-flex flex-grow-1" style={{ marginRight: "15px" }}>
        <div className="input-group">
          <span className="input-group-text">
            <FaSearch />
          </span>
          <input
            id="wd-search-assignment"
            type="text"
            className="form-control"
            placeholder="Search for Assignments"
          />
        </div>
      </div>

      {/* Faculty Buttons */}
      {isFaculty && (
        <div className="d-flex">
          <button
            id="wd-add-assignment"
            className="btn btn-lg btn-danger text-white me-1 float-end"
            onClick={handleAddAssignment}
          >
            <FaPlus className="fs-5" /> Assignment
          </button>
          <button
            id="wd-add-assignment-group"
            className="btn btn-lg btn-secondary me-1 float-end"
          >
            <FaPlus className="fs-5" /> Group
          </button>
        </div>
      )}
    </div>
  );
};

export default AssignmentButtons;
