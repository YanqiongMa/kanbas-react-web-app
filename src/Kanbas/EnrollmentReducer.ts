import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Enrollment {
  user: string;
  course: string;
}

interface EnrollmentState {
  enrollments: Enrollment[];
}

const initialState: EnrollmentState = {
  enrollments: [],
};

const enrollmentSlice = createSlice({
  name: 'enrollments',
  initialState,
  reducers: {
    enrollCourse: (state, action: PayloadAction<{ userId: string; courseId: string }>) => {
      state.enrollments.push({ user: action.payload.userId, course: action.payload.courseId });
    },
    unenrollCourse: (state, action: PayloadAction<{ userId: string; courseId: string }>) => {
      state.enrollments = state.enrollments.filter(
        (enrollment) =>
          !(enrollment.user === action.payload.userId && enrollment.course === action.payload.courseId)
      );
    },
    loadEnrollments: (state, action: PayloadAction<Enrollment[]>) => {
      state.enrollments = action.payload;
    },
  },
});

export const { enrollCourse, unenrollCourse, loadEnrollments } = enrollmentSlice.actions;
export default enrollmentSlice.reducer;