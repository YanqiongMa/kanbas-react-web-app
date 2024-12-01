import React, { useState } from "react";

const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;

export default function QueryParameters() {
  const [a, setA] = useState(0);
  const [b, setB] = useState(0);

  return (
    <div id="wd-query-parameters">
      <h3>Query Parameters</h3>
      
      {/* Input fields for 'a' and 'b' */}
      <input
        id="wd-query-parameter-a"
        className="form-control mb-2"
        defaultValue={a}
        type="number"
        onChange={(e) => setA(Number(e.target.value))}
        placeholder="Enter value for A"
      />
      <input
        id="wd-query-parameter-b"
        className="form-control mb-2"
        defaultValue={b}
        type="number"
        onChange={(e) => setB(Number(e.target.value))}
        placeholder="Enter value for B"
      />

      {/* Links for operations */}
      <a
        id="wd-query-parameter-add"
        className="btn btn-primary m-2"
        href={`${REMOTE_SERVER}/lab5/calculator?operation=add&a=${a}&b=${b}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        Add {a} + {b}
      </a>
      <a
        id="wd-query-parameter-subtract"
        className="btn btn-secondary m-2"
        href={`${REMOTE_SERVER}/lab5/calculator?operation=subtract&a=${a}&b=${b}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        Subtract {a} - {b}
      </a>
      <a
        id="wd-query-parameter-multiply"
        className="btn btn-success m-2"
        href={`${REMOTE_SERVER}/lab5/calculator?operation=multiply&a=${a}&b=${b}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        Multiply {a} * {b}
      </a>
      <a
        id="wd-query-parameter-divide"
        className="btn btn-danger m-2"
        href={`${REMOTE_SERVER}/lab5/calculator?operation=divide&a=${a}&b=${b}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        Divide {a} / {b}
      </a>

      <hr />
    </div>
  );
}
