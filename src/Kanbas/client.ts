import axios from "axios";
export const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
export const ENROLLMENTS_API = `${REMOTE_SERVER}/api/enrollments`;
const axiosWithCredentials = axios.create({ withCredentials: true });

export const fetchEnrollmentsForUser = async (userId: string) => {
    const { data } = await axiosWithCredentials.get(ENROLLMENTS_API, {params: {userId}});
    return data;
};

export const enrollInCourse = async (userId: string, courseId: string) => {
    const { data } = await axiosWithCredentials.post(ENROLLMENTS_API, {userId, courseId});
    return data;
};

export const unenrollFromCourse = async (userId: string, courseId: string) => {
    const { data } = await axiosWithCredentials.delete(ENROLLMENTS_API, {data: {userId, courseId}});
    return data;
};