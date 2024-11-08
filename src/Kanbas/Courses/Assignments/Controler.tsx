import React from 'react';
import { BsSearch } from "react-icons/bs";
import './Controller.css';

export default function Controller() {
    return (
        <div className="d-flex justify-content-between align-items-center mb-3">
            <div className="input-group w-75 me-3">
                <span className="input-group-text bg-white border-end-0 input-group-text-custom">
                    <BsSearch className="text-muted" />
                </span>
                <input
                    id="wd-search-assignments"
                    type="text"
                    placeholder="Search..."
                    className="form-control border-start-0 search-input"
                />
            </div>
            <div className="d-flex">
                <button className="btn btn-outline-secondary me-1 group-btn">
                    + Group
                </button>
                <button className="btn assignment-btn">
                    + Assignment
                </button>
            </div>
        </div>
    );
}
