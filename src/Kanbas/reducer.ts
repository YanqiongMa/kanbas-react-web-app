import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { enrollments as initialEnrollments } from "../Kanbas/Database";

interface Enrollment {
  _id: string;
  user: string;
  course: string;
}

interface EnrollmentsState {
  enrollments: Enrollment[];
  enrollmentsOn: boolean;
}

const initialState: EnrollmentsState = {
  enrollments: initialEnrollments,
  enrollmentsOn: false,
};

const enrollmentsSlice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {
    enroll: (state, action: PayloadAction<Omit<Enrollment, "_id">>) => {
      const { user, course } = action.payload;
      const newEnrollment: Enrollment = {
        _id: new Date().getTime().toString(),
        user,
        course,
      };
      state.enrollments.push(newEnrollment);
    },
    unenroll: (state, action: PayloadAction<{ user: string; course: string }>) => {
      const { user, course } = action.payload;
      state.enrollments = state.enrollments.filter(
        (enrollment) => enrollment.user !== user || enrollment.course !== course
      );
    },
    toggleEnrollmentsOn: (state) => {
      state.enrollmentsOn = !state.enrollmentsOn;
    },
  },
});

export const { enroll, unenroll, toggleEnrollmentsOn } = enrollmentsSlice.actions;
export default enrollmentsSlice.reducer;
