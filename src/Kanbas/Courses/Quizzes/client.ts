import axios from "axios";
const axiosWithCredentials = axios.create({ withCredentials: true });

const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const COURSES_API = `${REMOTE_SERVER}/api/courses`;
const QUIZZES_API = `${REMOTE_SERVER}/api/quizzes`;

export const getQuizById = async (quizId: any) => {
  const { data } = await axiosWithCredentials.get(`${QUIZZES_API}/${quizId}`);
  console.log(data);
  return data;
};

export const updateQuiz = async (quiz: any) => {
  const { data } = await axiosWithCredentials.put(
    `${QUIZZES_API}/${quiz._id}`,
    quiz
  );
  return data;
};

export const getQuizzesForCourse = async (courseId: string) => {
  const { data } = await axiosWithCredentials.get(
    `${COURSES_API}/${courseId}/quizzes`
  );
  return data;
};

export const deleteQuiz = async (quizId: string) => {
  const response = await axiosWithCredentials.delete(
    `${QUIZZES_API}/${quizId}`
  );
  return response.data;
};

export const createQuiz = async (courseId: string, quiz: any) => {
  const response = await axiosWithCredentials.post(
    `${COURSES_API}/${courseId}/quizzes`,
    quiz
  );
  return response.data;
};

// get the latest quiz attempt for a quiz
export const getLatestAttempt = async (qid: any, sid: any) => {
  const response = await axiosWithCredentials.get(
    `${QUIZZES_API}/${qid}/${sid}`
  );
  return response.data;
};

// submit quiz
export const submitQuiz = async (quizAttempt: any) => {
  const response = await axiosWithCredentials.post(
    `${QUIZZES_API}/submitquiz`,
    quizAttempt
  );
  return response.data;
};

export const publishQuiz = async (quizId: string) => {
  const { data } = await axiosWithCredentials.get(`${QUIZZES_API}/${quizId}/publish`);
  return data;
};

export const unpublishQuiz = async (quizId: string) => {
  const { data } = await axiosWithCredentials.get(`${QUIZZES_API}/${quizId}/unpublish`);
  return data;
};
