import React from 'react';
import { BsGripVertical } from "react-icons/bs";
import { FaClipboardList, FaCaretDown } from "react-icons/fa";
import ModuleControlButtons from '../Modules/ModuleControlButtons';
import LessonControlButtons from '../Modules/LessonControlButtons';
import Controller from './Controler';

export default function Assignments() {
    return (
        <div id="wd-assignments" className="p-4">
            <Controller />
            <div>
            <ul id="wd-modules" className="list-group rounded-0">
                <li className="wd-module list-group-item p-0 mb-4 fs-5 border-gray">
                    <div className="wd-title p-3 bg-light d-flex justify-content-between align-items-center">
                        <div>
                            <BsGripVertical className="me-2 fs-4" />
                            <FaCaretDown />
                            ASSIGINMENTS
                        </div>
                        <span className="px-2 py-1 border rounded" style={{ borderColor: '#d3d3d3' }}>
                                40% of Total
                            </span>
                        <ModuleControlButtons />
                    </div>

                    <ul className="wd-lessons list-group rounded-0">
  {/* Assignment A1 */}
  <li className="wd-lesson list-group-item p-3 d-flex justify-content-between align-items-start">
    <div className="d-flex flex-column">
      <div className="d-flex align-items-center mb-1">
        <BsGripVertical className="me-3 fs-4 text-muted" />
        <FaClipboardList className="text-success me-2 fs-4" /> 
        <a
          className="wd-assignment-link text-dark fw-bold text-decoration-none"
          href="#/Kanbas/Courses/1234/Assignments/456"
        >
          A1
        </a>
      </div>
      <div className="d-flex align-items-center small">
        <span className="text-danger">Multiple Modules</span>
        <span className="ms-3 text-black">| Not available until May 6 at 12:00am</span>
        <span className="ms-3 text-black">| <strong>Due</strong> May 13 at 11:59pm</span>
        <span className="ms-3 text-black">| 100 pts</span>
      </div>
    </div>
    <div className="d-flex align-items-center">
      <LessonControlButtons/>     
    </div>
  </li>

  {/* Assignment A2 */}
  <li className="wd-lesson list-group-item p-3 d-flex justify-content-between align-items-start">
    <div className="d-flex flex-column">
      <div className="d-flex align-items-center mb-1">
        <BsGripVertical className="me-3 fs-4 text-muted" />
        <FaClipboardList className="text-success me-2 fs-4" />
        <a
          className="wd-assignment-link text-dark fw-bold text-decoration-none"
          href="#/Kanbas/Courses/1234/Assignments/457"
        >
          A2
        </a>
      </div>
      <div className="d-flex align-items-center small">
        <span className="text-danger">Multiple Modules</span>
        <span className="ms-3 text-black">| Not available until May 13 at 12:00am</span>
        <span className="ms-3 text-black">| <strong>Due</strong> May 20 at 11:59pm</span>
        <span className="ms-3 text-black">| 100 pts</span>
      </div>
    </div>
    <div className="d-flex align-items-center">
    <LessonControlButtons/>
    </div>
  </li>

  {/* Assignment A3 */}
  <li className="wd-lesson list-group-item p-3 d-flex justify-content-between align-items-start">
    <div className="d-flex flex-column">
      <div className="d-flex align-items-center mb-1">
        <BsGripVertical className="me-3 fs-4 text-muted" />
        <FaClipboardList className="text-success me-2 fs-4" />
        <a
          className="wd-assignment-link text-dark fw-bold text-decoration-none"
          href="#/Kanbas/Courses/1234/Assignments/789"
        >
          A3
        </a>
      </div>
      <div className="d-flex align-items-center small">
        <span className="text-danger">Multiple Modules</span>
        <span className="ms-3 text-black">| Not available until May 20 at 12:00am</span>
        <span className="ms-3 text-black">| <strong>Due</strong> May 27 at 11:59pm</span>
        <span className="ms-3 text-black">| 100 pts</span>
      </div>
    </div>
    <div className="d-flex align-items-center">
    <LessonControlButtons/>
    </div>
  </li>
</ul>

                    </li>
                </ul>
            </div>
        </div>
    );
}
