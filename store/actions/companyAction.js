import toast from "react-hot-toast";
import { addCompanyApi, getCompanyApi } from "@/api/companyApi";
import { addCompany, setCompany } from "../slices/companySlice";

const getErrorMessage = (error) =>
  error?.response?.data?.message ||
  error?.message ||
  "Something went wrong. Please try again.";

export const asyncCreateCompany =
  (company, setIsLoading, router) => async (dispatch) => {
    if (typeof setIsLoading === "function") setIsLoading(true);
    try {
      await toast.promise(addCompanyApi(company), {
        loading: "Adding Company...",
        success: (response) => {
          const { data } = response;
          dispatch(addCompany(data.company));
          router.push("/dashboard/companies");
          return data.message || "Company Created successfully!";
        },
        error: (err) => {
          console.log(err);

          return (
            err?.response?.data?.message ||
            err?.message ||
            "Failed to create company!"
          );
        },
      });
    } catch {
    } finally {
      if (typeof setIsLoading === "function") setIsLoading(false);
    }
  };

export const asyncGetCompanies = (params, setIsLoading) => async (dispatch) => {
  if (typeof setIsLoading === "function") setIsLoading(true);
  try {
    const { data } = await getCompanyApi(params);
    dispatch(setCompany(data.company));
  } catch (error) {
    console.error(getErrorMessage(error));
  } finally {
    if (typeof setIsLoading === "function") setIsLoading(false);
  }
};
