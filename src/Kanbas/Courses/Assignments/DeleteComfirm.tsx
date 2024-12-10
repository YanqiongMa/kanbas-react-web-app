import React from "react";

const DeleteComfirm = ({
  dialogTitle,
  deleteAssignment,
}: {
  dialogTitle: string;
  deleteAssignment: () => void;
}) => (
  <div
    id="wd-delete-dialog"
    className="modal fade"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
  >
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">{dialogTitle}</div>
        <div className="m-3">
          Are you sure you want to delete this assignment?
        </div>
        <div className="d-flex justify-content-center m-3 gap-2">
          <button
            type="button"
            className="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Cancel
          </button>
          <button
            onClick={deleteAssignment}
            type="button"
            data-bs-dismiss="modal"
            className="btn btn-danger"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default DeleteComfirm;
