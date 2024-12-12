export default function AssignmentEditor({dialogTitle, assignmentName, setAssignmentName, addAssignment, description, setDescription, points, setPoints, dueDate, setDueDate, availableDate, setAvailableDate} : 
    {dialogTitle: string; assignmentName: string; setAssignmentName: (name: string) => void;
        points: string; setPoints: (name: string) => void;
        description: string; setDescription: (name: string) => void;
        dueDate: string; setDueDate: (name: string) => void;
        availableDate: string; setAvailableDate: (name: string) => void;
        addAssignment: () => void;
        })
    {
        return (
            <div id="wd-add-module-dialog" className="modal fade" data-bs-backdrop="static" data-bs-keyboard="false">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">
                                {dialogTitle}
                            </h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div className="modal-body">
                            <input className="form-control" value={assignmentName} placeholder="Assignment Name" 
                            onChange={(e) => setAssignmentName(e.target.value)}/><br/>
                            <input className="form-control" value={description} placeholder="Assignment Description" 
                            onChange={(e) => setDescription(e.target.value)}/><br />
                            <div className="d-flex">
                                <div className="w-50 pe-5">
                                    <label htmlFor="wd-points" className="float-end" style={{marginTop:"5px"}}>Points</label>
                                </div>
                                <div className="w-50 pe-3">
                                    <input id="wd-points" value={points} className="form-control mb-2"
                                    onChange={(e) => setPoints(e.target.value)}/>
                                </div>
                            </div>
                            <br />
                            <div className="d-flex ps-3 pe-3" >
                                <div className="w-50 pe-5">
                                <label htmlFor="wd-assign-to" className="float-end" style={{marginTop:"5px"}}> Assign</label> 
                                </div>
                                <div className="w-50 border p-3">
                                    <div>
                                        <label htmlFor="wd-due-date" className="mb-2"><strong>Due</strong></label>
                                        <input type="datetime-local" id="wd-due-date" name="due-date" value={dueDate} className="form-control mb-2"
                                        onChange={(e) => setDueDate(e.target.value)}/>
                                    </div>

                                    <br />

                                    <div className="row">
                                        <div className="col-md-6 mb-2">
                                            <label htmlFor="wd-available-from" className="mb-2"><strong>Avl From</strong></label>
                                            <input type="datetime-local" id="wd-available-from" name="available-from" value={availableDate} className="form-control mb-2"
                                            onChange={(e) => setAvailableDate(e.target.value)}/>
                                        </div>

                                        <div className="col-md-6 mb-2">
                                            <label htmlFor="wd-due-date" className="mb-2"><strong>Until</strong></label>
                                            <input type="datetime-local" id="wd-available-until" name="available-until" value={dueDate} className="form-control mb-2"
                                            onChange={(e) => setDueDate(e.target.value)}/>
                                        </div>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                                Cancel
                            </button>
                            <button onClick={addAssignment} type="button" data-bs-dismiss="modal" className="btn btn-danger">
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
}