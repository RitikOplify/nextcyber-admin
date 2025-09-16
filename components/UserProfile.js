"use client";
import React, { useState } from "react";
import AccountDetailsForm from "./AccountDetailsForm";
import ProfileForm from "./ProfileForm";
import TechnicalForm from "./TechnicalForm";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { asyncCreateStudent } from "@/store/actions/studentActions";
import { useRouter } from "next/navigation";
const UserProfile = () => {
  const form = useForm();
  const [activeTab, setActiveTab] = useState("account");
  const dispatch = useDispatch();
  const router = useRouter();

  const [files, setFiles] = useState({
    profilePicture: null,
    resume: null,
  });

  const tabs = [
    { key: "account", label: "Account Details" },
    { key: "profile", label: "Profile" },
    { key: "technical", label: "Technical" },
  ];

  const renderActiveForm = () => {
    switch (activeTab) {
      case "account":
        return (
          <AccountDetailsForm form={form} files={files} setFiles={setFiles} />
        );
      case "profile":
        return <ProfileForm form={form} files={files} setFiles={setFiles} />;
      case "technical":
        return <TechnicalForm form={form} files={files} setFiles={setFiles} />;
      default:
        return (
          <AccountDetailsForm form={form} files={files} setFiles={setFiles} />
        );
    }
  };

  const handleFinalSubmit = (e) => {
    e.preventDefault();
    const values = form.getValues();
    const formData = new FormData();

    // Append fields, handle arrays appropriately
    Object.entries(values).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((val) => formData.append(`${key}[]`, val));
      } else if (value !== undefined && value !== null) {
        formData.append(key, value);
      }
    });

    // Append files
    if (files.profilePicture)
      formData.append("profilePicture", files.profilePicture);
    if (files.resume) formData.append("resume", files.resume);

    dispatch(asyncCreateStudent(formData));
    router.push("/dashboard/students");
  };

  return (
    <div className="w-full h-fit">
      <div className="mb-8">
        <div className="flex w-fit border border-[#E7E4E4] rounded-[4px] overflow-hidden">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`py-3 px-4 cursor-pointer text-sm font-medium border-r last:border-r-0 ${
                activeTab === tab.key
                  ? "bg-gray-200 text-black"
                  : "bg-white text-gray-500"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {renderActiveForm()}

      {activeTab === "technical" && (
        <div className="flex justify-end space-x-4 pt-6">
          <button
            type="button"
            className="px-6 py-2 border border-gray-300 text-gray-600 rounded hover:bg-gray-50"
            onClick={() => form.reset()}
          >
            Discard
          </button>
          <button
            type="button"
            onClick={handleFinalSubmit}
            className="px-6 py-2 bg-blue-600 rounded text-white hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
