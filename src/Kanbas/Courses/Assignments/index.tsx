import React, { useState } from 'react';
import { BsGripVertical } from "react-icons/bs";
import { FaClipboardList, FaCaretDown } from "react-icons/fa";
import ModuleControlButtons from '../Modules/ModuleControlButtons';
import LessonControlButtons from '../Modules/LessonControlButtons';
import Controller from './Controler';
import { useParams } from 'react-router-dom'; 
import * as db from "../../Database"; 

export default function Assignments() {
    const { cid } = useParams();
    const assignments = db.assignments.filter((assignment) => assignment.course === cid);

    const [modules, setModules] = useState<any[]>(db.modules); // 假设 db.modules 是一个数组

    const moduleId = "assignments-module";
    const deleteModule = (id: string) => {
        console.log(`Deleting module with id: ${id}`);
    };

    const editModule = (moduleId: string) => {
        setModules(modules.map((m: any) => (m._id === moduleId ? { ...m, editing: true } : m)));
    };

    const updateModule = (module: any) => {
        setModules(modules.map((m: any) => (m._id === module._id ? module : m)));
    };

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
                                ASSIGNMENTS
                            </div>
                            <span className="px-2 py-1 border rounded" style={{ borderColor: '#d3d3d3' }}>
                                40% of Total
                            </span>
                            <ModuleControlButtons  moduleId={moduleId} deleteModule={deleteModule} editModule={editModule}/>
                        </div>

                        <ul className="wd-lessons list-group rounded-0">
                            {assignments.map((assignment) => (
                                <li key={assignment._id} className="wd-lesson list-group-item p-3 d-flex justify-content-between align-items-start">
                                    <div className="d-flex flex-column">
                                        <div className="d-flex align-items-center mb-1">
                                            <BsGripVertical className="me-3 fs-4 text-muted" />
                                            <FaClipboardList className="text-success me-2 fs-4" />
                                            <a className="wd-assignment-link text-dark fw-bold text-decoration-none" href={`#/Kanbas/Courses/${assignment.course}/Assignments/${assignment._id}`}>
                                                {assignment.title}
                                            </a>
                                        </div>
                                        <div className="d-flex align-items-center small">
                                            <span className="text-danger">{assignment.course}</span>
                                            <span className="ms-3 text-black">| Not available until {assignment.avaDate}</span>
                                            <span className="ms-3 text-black">| <strong>Due</strong> {assignment.dueDate}</span>
                                            <span className="ms-3 text-black">| 100 pts</span>
                                        </div>
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <LessonControlButtons />
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    );
}
