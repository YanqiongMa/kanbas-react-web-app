import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  quizzes: [],
};

const quizzesSlice = createSlice({
  name: "quizzes",
  initialState,
  reducers: {
    setQuizzes: (state, action) => {
      state.quizzes = action.payload;
    },

    addQuiz: (state, { payload: quiz }) => {
      const newQuiz: any = {
        _id: quiz._id,
        title: quiz.title,
        description: quiz.description,
        courseId: quiz.courseId,
        dueDate: quiz.dueDate,
        points: quiz.points,
        availabilityDate: quiz.availabilityDate,
        quizType: quiz.quizType,
        timeLimit: quiz.timeLimit,
        assignmentGroup: quiz.assignmentGroup,
        shuffleForEachStudent: quiz.shuffleForEachStudent,
        allowMultipleAttempts: quiz.allowMultipleAttempts,
        isPublished: quiz.isPublished,
        viewResponse: quiz.viewResponse,
        showCorrectAnswers: quiz.showCorrectAnswers,
        accessCode: quiz.accessCode,
        singleQuestionAtATime: quiz.singleQuestionAtATime,
        cameraRequired: quiz.cameraRequired,
        lockQuestionsAfterAnswering: quiz.lockQuestionsAfterAnswering,
        questions: quiz.questions,
      };
      state.quizzes = [...state.quizzes, newQuiz] as any;
    },

    deleteQuiz: (state, { payload: quizId }) => {
      state.quizzes = state.quizzes.filter((q: any) => q._id !== quizId) as any;
    },

    updateQuiz: (state, { payload: quiz }) => {
      console.log("Payload _id:", quiz._id);
      state.quizzes = state.quizzes.map((q: any) =>
        q._id === quiz._id ? quiz : q
      ) as any;
    },
  },
});

export const { addQuiz, deleteQuiz, updateQuiz, setQuizzes } =
  quizzesSlice.actions;
export default quizzesSlice.reducer;
