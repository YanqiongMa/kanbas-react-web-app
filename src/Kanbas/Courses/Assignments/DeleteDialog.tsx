import React from "react";

function DialogHeader() {
  return (
    <div className="modal-header">
      <h1 className="modal-title fs-5" id="staticBackdropLabel">
        Remove this assignment?
      </h1>
    </div>
  );
}

function DialogFooter({
  assignmentId,
  deleteAssignment,
}: {
  assignmentId: string;
  deleteAssignment: (assignmentId: string) => void;
}) {
  return (
    <div className="modal-footer">
      <button
        type="button"
        className="btn btn-secondary"
        data-bs-dismiss="modal"
      >
        Cancel
      </button>
      <button
        type="button"
        data-bs-dismiss="modal"
        className="btn btn-danger"
        onClick={() => deleteAssignment(assignmentId)}
      >
        Yes
      </button>
    </div>
  );
}

export default function DeleteDialog({
  assignmentId,
  deleteAssignment,
}: {
  assignmentId: string;
  deleteAssignment: (assignmentId: string) => void;
}) {
  return (
    <div
      id="wd-add-module-dialog"
      className="modal fade"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <DialogHeader />
          <DialogFooter assignmentId={assignmentId} deleteAssignment={deleteAssignment} />
        </div>
      </div>
    </div>
  );
}
