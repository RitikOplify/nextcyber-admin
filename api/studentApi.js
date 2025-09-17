import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export const addStudentApi = (student) =>
  axiosInstance.post("/student", student);

export const getStudentApi = () => axiosInstance.get("/student");

export const deleteStudentApi = (id) => axiosInstance.delete(`/student/${id}`);
