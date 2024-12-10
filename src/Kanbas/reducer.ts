import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    enrollments: [],
}

const enrollmentSlice = createSlice({
    name: 'enrollment',
    initialState,
    reducers: {
        setEnrollments: (state, action) => {
            state.enrollments = action.payload;
        },  
        addEnrollment: (state, { payload: enrollment }) => {
            const newEnrollment : any = {
                _id: new Date().getTime().toString(),
                course: enrollment.course,
                user: enrollment.user
            };
            state.enrollments = [...state.enrollments, newEnrollment] as any;
        },
        deleteEnrollment: (state, { payload: enrollment }) => {
            state.enrollments = state.enrollments.filter((e : any) => e.user === enrollment.user && e.course === enrollment.course ) as any;
        }
    }
})

export const { setEnrollments, addEnrollment, deleteEnrollment } = enrollmentSlice.actions;
export default enrollmentSlice.reducer;