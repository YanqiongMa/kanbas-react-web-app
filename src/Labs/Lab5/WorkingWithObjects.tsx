import React, { useState } from "react";

const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;

export default function WorkingWithObjects() {
  const [assignment, setAssignment] = useState({
    id: 1,
    title: "NodeJS Assignment",
    description: "Create a NodeJS server with ExpressJS",
    due: "2021-10-10",
    completed: false,
    score: 0,
  });

  const [module, setModule] = useState({
    id: "CS101",
    name: "Introduction to Programming",
    description: "A beginner's guide to programming.",
    course: "Computer Science",
    completed: false,
    score: 0,
  });

  return (
    <div id="wd-working-with-objects">
    <h3>Working With Objects</h3>
  
    <h4>Assignment Object</h4>
    <a href={`${REMOTE_SERVER}/lab5/assignment`} className="btn btn-primary">
      Get Assignment
    </a>
    <a href={`${REMOTE_SERVER}/lab5/assignment/title`} className="btn btn-primary">
      Get Assignment Title
    </a>
  
    <div className="d-flex align-items-center mb-2">
      <input
        className="form-control w-75 me-2"
        value={assignment.title}
        onChange={(e) =>
          setAssignment({ ...assignment, title: e.target.value })
        }
      />
      <a
        href={`${REMOTE_SERVER}/lab5/assignment/title/${assignment.title}`}
        className="btn btn-primary"
      >
        Update Assignment Title
      </a>
    </div>
  
    <hr />
  
    <h4>Module Object</h4>
    <a href={`${REMOTE_SERVER}/lab5/module`} className="btn btn-primary">
      Get Module
    </a>
    <a href={`${REMOTE_SERVER}/lab5/module/name`} className="btn btn-primary">
      Get Module Name
    </a>
  
    <div className="d-flex align-items-center mb-2">
      <input
        className="form-control w-75 me-2"
        value={module.name}
        onChange={(e) =>
          setModule({ ...module, name: e.target.value })
        }
      />
      <a
        href={`${REMOTE_SERVER}/lab5/module/name/${module.name}`}
        className="btn btn-primary"
      >
        Update Module Name
      </a>
    </div>
  
    <div className="d-flex align-items-center mb-2">
      <input
        className="form-control w-75 me-2"
        value={module.description}
        onChange={(e) =>
          setModule({ ...module, description: e.target.value })
        }
      />
      <a
        href={`${REMOTE_SERVER}/lab5/module/description/${module.description}`}
        className="btn btn-primary"
      >
        Update Module Description
      </a>
    </div>
  
    <div className="d-flex align-items-center mb-2">
      <input
        type="number"
        className="form-control w-75 me-2"
        value={module.score}
        onChange={(e) =>
          setModule({ ...module, score: parseInt(e.target.value, 10) })
        }
      />
      <a
        href={`${REMOTE_SERVER}/lab5/module/score/${module.score}`}
        className="btn btn-primary"
      >
        Update Module Score
      </a>
    </div>
  
    <div className="d-flex align-items-center mb-2">
      <input
        type="checkbox"
        checked={module.completed}
        onChange={(e) =>
          setModule({ ...module, completed: e.target.checked })
        }
      />
      <a
        href={`${REMOTE_SERVER}/lab5/module/completed/${module.completed}`}
        className="btn btn-primary ms-2"
      >
        Update Module Completed
      </a>
    </div>
  </div>  
  );
}
