import axios from "@/utils/axios";

export const signIn = (user) => axios.post("/admin/signin", user);

export const getCurrentUser = () => axios.get("/auth/current");

export const signOut = () => axios.get("/auth/signout");