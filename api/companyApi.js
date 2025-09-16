import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export const addCompanyApi = (company) =>
  axiosInstance.post("/company", company);

export const getCompanyApi = () => axiosInstance.get("/company");