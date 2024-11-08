import LessonControlButtons from "./LessonControlButtons";
import ModulesControls from "./ModulesControls";
import ModuleControlButtons from "./ModuleControlButtons";
import BsGripVertical from "./BsGripVertical";
import { useParams } from "react-router";
import React, { useState } from "react";
import { addModule, editModule, updateModule, deleteModule }
  from "./reducer";
import { useSelector, useDispatch } from "react-redux";


export default function Modules() {
  const { cid } = useParams();
  const [moduleName, setModuleName] = useState("");
  const { modules } = useSelector((state: any) => state.modulesReducer);
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  return (
    <div className="wd-modules">
      <ul id="wd-modules" className="list-group rounded-0">
        {currentUser.role === "FACULTY" && (
          <ModulesControls moduleName={moduleName} setModuleName={setModuleName}
            addModule={() => {
              dispatch(addModule({ name: moduleName, course: cid }));
              setModuleName("");
            }} />
        )}
        <br />
        {modules
          .filter((module: any) => module.course === cid)
          .map((module: any) => (
            <li className="wd-module list-group-item p-0 mb-5 fs-5 border-gray">
              <div className="wd-title p-3 ps-2 bg-secondary">
                {currentUser.role === "FACULTY" && <BsGripVertical />}
                {!module.editing && module.name}
                {module.editing && (
                  <input className="form-control w-50 d-inline-block"
                    onChange={(e) =>
                      dispatch(
                        updateModule({ ...module, name: e.target.value })
                      )
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        updateModule({ ...module, editing: false });
                      }
                    }}
                    defaultValue={module.name} />
                )}
                {currentUser.role === "FACULTY" && (
                  <ModuleControlButtons moduleId={module._id}
                    deleteModule={(moduleId) => {
                      dispatch(deleteModule(moduleId));
                    }}
                    editModule={(moduleId) => dispatch(editModule(moduleId))} />
                )}
              </div>
              {
                module.lessons && (
                  <ul className="wd-lessons list-group rounded-0">
                    {module.lessons.map((lesson: any) => (
                      <li className="wd-lesson list-group-item p-3 ps-1">
                        {currentUser.role === "FACULTY" && <BsGripVertical />}
                        {lesson.name}
                        {currentUser.role === "FACULTY" && <LessonControlButtons />}
                      </li>
                    ))}
                  </ul>
                )
              }
            </li>
          ))}
      </ul>
    </div >
  );
}