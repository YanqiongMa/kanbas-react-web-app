import axios from "axios";
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const ENROLLMENTS_API = `${REMOTE_SERVER}/api/enrollments`;

export const fetchAllCourses = async () => {
    const { data } = await axios.get(`${ENROLLMENTS_API}/all`);
    return data;
};

export const enroll = async (userId: string, courseId: string) => {
    try {
      const response = await axios.post(ENROLLMENTS_API, { userId, courseId });
      return response.data;
    } catch (error) {
      console.error("Error enrolling user:", error);
      throw error;
    }
};

export const unenroll = async (userId: string, courseId: string) => {
    try {
      const response = await axios.delete(ENROLLMENTS_API, {
        data: { userId, courseId },
      });
      return response.data;
    } catch (error) {
      console.error("Error unenrolling user:", error);
      throw error;
    }
};

export const fetchUserEnrollments = async (userId: string) => {
    const { data } = await axios.get(`${ENROLLMENTS_API}/${userId}`);
    return data;
}

  
