export default function DeleteAssignment({ dialogTitle, assignmentId, deleteAssignment, modalId }:{
    dialogTitle: string; assignmentId: string; deleteAssignment: (assignmentId: string) => void; modalId: string;
}) {
    return (
        <div id={modalId} className="modal fade" data-bs-backdrop="static" data-bs-keyboard="false">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="staticBackdropLabel">
                            {dialogTitle}
                        </h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div className="modal-body">
                        Are you sure you want to remove the assignment?
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                            No
                        </button>
                        <button onClick={() => deleteAssignment(assignmentId)} type="button" data-bs-dismiss="modal" className="btn btn-danger">
                            Yes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}