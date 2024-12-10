import { createSlice } from "@reduxjs/toolkit";
import { assignments } from "../../Database";
const initialState = {
    assignments: [],
}

const assignmentsSlice = createSlice({
    name: "assignments",
    initialState,
    reducers: {
        setAssignments: (state, action) => {
            state.assignments = action.payload;
        },
        addAssignment: (state, action) => {
            const newAssignment = action.payload;
            state.assignments = [...state.assignments, newAssignment] as any;
        },
        deleteAssignment: (state, { payload: assignmentId}) => {
            state.assignments = state.assignments.filter((assignment : any ) => assignment._id !== assignmentId) as any;
        },
        editAssignment: (state, assignmentId) => {
            state.assignments = state.assignments.map((assignment: any) => 
                assignment._id === assignmentId ? { ...assignment, editing: true } : assignment) as any
        },
        updateAssignment: (state, {payload: assignment}) => {
            state.assignments = state.assignments.map((a : any) => a._id === assignment._id ? assignment : a) as any
        },            
    }
})

export const { setAssignments, addAssignment, deleteAssignment, editAssignment, updateAssignment } = assignmentsSlice.actions;
export default assignmentsSlice.reducer;