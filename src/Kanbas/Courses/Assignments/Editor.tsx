import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function AssignmentEditor() {
  return (
    <div id="wd-assignments-editor" className="container mt-4">
      <div className="mb-3">
        <label htmlFor="wd-name" className="form-label">Assignment Name</label>
        <input id="wd-name" className="form-control" defaultValue="A1" />
      </div>

      <div className="mb-3">
        <label htmlFor="wd-description" className="form-label">Description</label>
        <textarea
          id="wd-description"
          className="form-control"
          rows={6}
          defaultValue={`
            The assignment is available online. Submit a link to the landing page of your Web application running on Netlify.
            The landing page should include the following:
            · Your full name and section
            · Links to each of the lab assignments
            · Link to the Kanbas application
            · Links to all relevant source code repositories
            · The Kanbas application should include a link to navigate back to the landing page.
          `}
        />
      </div>

      <div className="row">
        <div className="col-md-4 mb-3">
          <label htmlFor="wd-points" className="form-label">Points</label>
          <input id="wd-points" type="number" className="form-control" defaultValue={100} />
        </div>

        <div className="col-md-4 mb-3">
          <label htmlFor="wd-assignment-group" className="form-label">Assignment Group</label>
          <select
            id="wd-assignment-group"
            className="form-control"
            style={{
              appearance: 'none',
              background: `url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-down"><polyline points="6 9 12 15 18 9"></polyline></svg>') no-repeat right 10px center`,
              backgroundSize: '1em',
              paddingRight: '2.5em',
            }}
          >
            <option value="assignments">ASSIGNMENTS</option>
            <option value="quizzes">QUIZZES</option>
            <option value="exams">EXAMS</option>
            <option value="homework">HOMEWORK</option>
          </select>
        </div>
        <div className="col-md-4 mb-3">
          <label htmlFor="wd-display-grade" className="form-label">Display Grade as</label>
          <select
            id="wd-display-grade"
            className="form-control"
            style={{
              appearance: 'none',
              background: `url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-down"><polyline points="6 9 12 15 18 9"></polyline></svg>') no-repeat right 10px center`,
              backgroundSize: '1em',
              paddingRight: '2.5em',
            }}
          >
            <option value="percentage">Percentage</option>
            <option value="points">Points</option>
          </select>
        </div>
      </div>

      <div
        className="row mb-3"
        style={{
          border: '2px solid #ddd',
          padding: '15px',
          borderRadius: '10px',
          backgroundColor: '#f9f9f9',
          marginBottom: '20px',
        }}
      >
        <div className="col-md-6 mb-3">
          <label htmlFor="wd-submission-type" className="form-label">Submission Type</label>
          <select
            id="wd-submission-type"
            className="form-control"
            style={{
              appearance: 'none',
              background: `url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-down"><polyline points="6 9 12 15 18 9"></polyline></svg>') no-repeat right 10px center`,
              backgroundSize: '1em',
              paddingRight: '2.5em',
            }}
          >
            <option value="online">Online</option>
            <option value="on-paper">On Paper</option>
          </select>
        </div>
        <div className="col-md-6 mb-3">
          <label className="form-label" style={{ fontWeight: 'bold' }}>Online Entry Options</label>
          <div className="form-check">
            <input className="form-check-input" type="checkbox" id="wd-text-entry" />
            <label className="form-check-label" htmlFor="wd-text-entry">Text Entry</label>
          </div>
          <div className="form-check">
            <input className="form-check-input" type="checkbox" id="wd-website-url" defaultChecked />
            <label className="form-check-label" htmlFor="wd-website-url">Website URL</label>
          </div>
          <div className="form-check">
            <input className="form-check-input" type="checkbox" id="wd-media-recordings" />
            <label className="form-check-label" htmlFor="wd-media-recordings">Media Recordings</label>
          </div>
          <div className="form-check">
            <input className="form-check-input" type="checkbox" id="wd-student-annotation" />
            <label className="form-check-label" htmlFor="wd-student-annotation">Student Annotation</label>
          </div>
          <div className="form-check">
            <input className="form-check-input" type="checkbox" id="wd-file-uploads" />
            <label className="form-check-label" htmlFor="wd-file-uploads">File Uploads</label>
          </div>
        </div>
      </div>

      <div
        className="mb-3"
        style={{
          border: '2px solid #ddd',
          padding: '15px',
          borderRadius: '10px',
          backgroundColor: '#f9f9f9',
          marginBottom: '20px',
        }}
      >
        <div className="mb-3">
        <label htmlFor="wd-assign-to" className="form-label" >Assign</label><br />
          <label htmlFor="wd-assign-to" className="form-label" style={{ fontWeight: 'bold' }}>Assign to</label>
          <input id="wd-assign-to" className="form-control" defaultValue="Everyone" readOnly />
        </div>

        <div className="mb-3">
          <label htmlFor="wd-due-date" className="form-label" style={{ fontWeight: 'bold' }}>Due</label>
          <input type="datetime-local" id="wd-due-date" className="form-control" defaultValue="2024-05-13T23:59" />
        </div>

        <div className="mb-3">
          <label className="form-label" style={{ fontWeight: 'bold' }}>Available from / Until</label>
          <div className="d-flex">
            <input
              type="datetime-local"
              id="wd-available-from"
              className="form-control me-2"
              defaultValue="2024-05-06T00:00"
            />
            <input
              type="datetime-local"
              id="wd-until"
              className="form-control"
              defaultValue="2024-05-20T00:00"
            />
          </div>
        </div>
      </div>

      <div className="d-flex justify-content-end mt-4">
        <button className="btn btn-secondary me-2">Cancel</button>
        <button className="btn btn-danger">Save</button>
      </div>
    </div>
  );
}
