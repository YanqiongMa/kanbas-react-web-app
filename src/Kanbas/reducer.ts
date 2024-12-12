import { createSlice } from "@reduxjs/toolkit";
import { enrollments } from "./Database";

const enrollmentSlice = createSlice({
    name: "enrollment",
    initialState: {
        enrollments: enrollments
    },
    reducers: {
        enrollCourse: (state, action) => {
            const { userId, courseId } = action.payload;
            if (!state.enrollments.some(enrollment => enrollment.user === userId && enrollment.course === courseId)){
                state.enrollments.push({_id: new Date().getTime().toString(), user: userId, course: courseId});
            }
        },
        unenrollCourse: (state, action) => {
            const { userId, courseId } = action.payload;
            state.enrollments = state.enrollments.filter(
                enrollment => !(enrollment.user === userId && enrollment.course === courseId)
            );
        }
    }
})

export const { enrollCourse, unenrollCourse } = enrollmentSlice.actions;
export default enrollmentSlice.reducer;