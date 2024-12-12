import { createSlice } from "@reduxjs/toolkit";
// import { assignments } from "../../Database";
const initialState = {
    assignments: []
};
const assignmentsSlice = createSlice({
    name: "assignments",
    initialState,
    reducers: {
        setAssignments: (state, action) => {
            state.assignments = action.payload
        },
        addAssignment: (state, {payload: assignment}) => {
            const newAssignment: any = {
                _id: new Date().getTime().toString(),
                description: assignment.description,
                title: assignment.title,
                course: assignment.course,
                dueDate: assignment.dueDate,
                points: assignment.points,
                availableDate: assignment.availableDate
            };
            state.assignments = [...state.assignments, newAssignment] as any;
        },
        deleteAssignment: (state, {payload: assignmentId}) => {
            state.assignments = state.assignments.filter((a: any) => 
                a._id !== assignmentId
        ) as any;
        },
        updateAssignment: (state, { payload: assignment }) => {
            console.log("Payload _id:", assignment._id);
            state.assignments = state.assignments.map((a: any) =>
            a._id === assignment._id ? assignment : a    
        ) as any;
        },
    }
});
export const { addAssignment, deleteAssignment, updateAssignment, setAssignments } = assignmentsSlice.actions;
export default assignmentsSlice.reducer;