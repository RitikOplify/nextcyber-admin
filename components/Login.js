"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import SectionWrapper from "./common/SectionWrapper";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

// ✅ Validation schema
const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const Login = () => {
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    mode: "onBlur", // validates on blur (optimized for UX)
  });

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      console.log("Submitting login data:", data);
      setTimeout(() => {
        router.push("/dashboard/students");
        toast.success("Logged in");
        setLoading(false);
      }, 2000);
      // 🔥 call your API here, e.g. await login(data);
    } catch (err) {
      console.error("Login error:", err);
    } finally {
      // setLoading(false);
    }
  };
  return (
    <SectionWrapper>
      {loading ? (
        <div className="max-w-[1440px] min-h-screen mx-auto px-5 sm:px-10 py-10 sm:py-20 flex flex-col gap-6 items-center justify-center">
          <span className="loader"></span>
        </div>
      ) : (
        <div className="max-w-[1440px] min-h-screen mx-auto px-5 sm:px-10 py-10 sm:py-20 flex flex-col gap-6 items-center justify-center">
          {/* Logo */}
          <Image
            src={"/logo.png"}
            alt="nextcybr-logo"
            width={512}
            height={95}
            className="w-[196px] h-auto"
          />

          {/* Heading */}
          <div className="text-center">
            <h1 className="text-lg font-semibold text-[#1B1C1E]">Login</h1>
            <p className="text-[13px] text-[#6A6B6C] mt-3">
              Please enter your credentials to sign in!
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-4 flex w-full sm:w-[360px] flex-col items-center justify-center gap-5"
          >
            {/* Email */}
            <div className="w-full flex flex-col gap-1.5">
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-4.5 text-[#434345]"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                defaultValue={"admin@nextcybr.in"}
                // placeholder="you@example.com"
                {...register("email")}
                className={`w-full rounded border flex items-center px-3 h-[42px] outline-none text-sm text-[#6A6B6C] ${
                  errors.email ? "border-red-500" : "border-[#E7E3E4]"
                }`}
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div className="w-full flex flex-col gap-1.5">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-4.5 text-[#434345]"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                defaultValue={"nextcybr"}
                // placeholder="********"
                {...register("password")}
                className={`block w-full rounded border px-3 py-3 outline-none text-sm  text-[#6A6B6C] ${
                  errors.password ? "border-red-500" : "border-[#E7E3E4]"
                }`}
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Forgot password */}
            <div className="flex justify-start w-full -mt-2.5">
              <Link
                href="/forgot-password"
                className="text-sm font-medium text-[#434345] hover:underline"
              >
                Forgot password
              </Link>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-md px-4 h-[42px] flex items-center justify-center cursor-pointer text-[13px] bg-primary text-white font-medium hover:bg-primary/90 disabled:cursor-not-allowed disabled:bg-primary/75 mt-[10px]"
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </form>
        </div>
      )}
    </SectionWrapper>
  );
};

export default Login;
