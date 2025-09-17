import { addStudent, setStudent } from "../slices/studentSlice";
import toast from "react-hot-toast";
import { addStudentApi, getStudentApi } from "@/api/studentApi.js";
import { fa } from "zod/v4/locales";

const getErrorMessage = (error) =>
  error?.response?.data?.message ||
  error?.message ||
  "Something went wrong. Please try again.";

export const asyncCreateStudent =
  (student, setIsLoading, router) => async (dispatch) => {
    if (typeof setIsLoading === "function") setIsLoading(true);
    try {
      await toast.promise(addStudentApi(student), {
        loading: "Adding Student...",
        success: (response) => {
          const { data } = response;
          dispatch(addStudent(data.student));
          router.push("/dashboard/students");
          return data.message || "Student Created successfully!";
        },
        error: (err) => {
          console.log(err);

          return (
            err?.response?.data?.message ||
            err?.message ||
            "Failed to create student!"
          );
        },
      });
    } catch {
    } finally {
      if (typeof setIsLoading === "function") setIsLoading(false);
    }
  };

export const asyncGetStudents = (params, setIsLoading) => async (dispatch) => {
  if (typeof setIsLoading === "function") setIsLoading(true);

  try {
    const { data } = await getStudentApi(params);
    dispatch(setStudent(data.student));
  } catch (error) {
    console.error(getErrorMessage(error));
  } finally {
    if (typeof setIsLoading === "function") setIsLoading(false);
  }
};
