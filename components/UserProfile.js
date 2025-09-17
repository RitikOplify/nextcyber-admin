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
  const form = useForm({
    mode: "onChange", // Enable real-time validation
    reValidateMode: "onChange",
  });

  const [activeTab, setActiveTab] = useState("account");
  const dispatch = useDispatch();
  const router = useRouter();

  const [files, setFiles] = useState({
    profilePicture: null,
    resume: null,
  });

  // State for dynamic data from ProfileForm
  const [educationList, setEducationList] = useState([]);
  const [workExperienceList, setWorkExperienceList] = useState([]);

  const tabs = [
    { key: "account", label: "Account Details" },
    { key: "profile", label: "Profile" },
    { key: "technical", label: "Technical" },
  ];

  // Define required fields for each step
  const stepFields = {
    account: [
      "firstName",
      "lastName",
      "location",
      "currency",
      "nationalities",
      "language",
    ],
    profile: ["resume"], // Add other profile fields as needed
    technical: [], // Add technical fields as needed
  };

  // Validate current step before allowing navigation
  const validateCurrentStep = async () => {
    const fieldsToValidate = stepFields[activeTab];
    if (fieldsToValidate && fieldsToValidate.length > 0) {
      const isValid = await form.trigger(fieldsToValidate);
      return isValid;
    }
    return true;
  };

  // Handle tab change with validation
  const handleTabChange = async (newTab) => {
    const currentIndex = tabs.findIndex((tab) => tab.key === activeTab);
    const newIndex = tabs.findIndex((tab) => tab.key === newTab);

    // Only validate if moving forward
    if (newIndex > currentIndex) {
      const isValid = await validateCurrentStep();
      if (!isValid) {
        // Show error message or handle invalid state
        console.log("Current step has validation errors");
        return;
      }
    }

    setActiveTab(newTab);
  };

  // Handle Next button click with validation
  const handleNext = async () => {
    const currentIndex = tabs.findIndex((tab) => tab.key === activeTab);

    if (currentIndex < tabs.length - 1) {
      const nextTab = tabs[currentIndex + 1].key;

      // Use the same validation logic as handleTabChange
      const isValid = await validateCurrentStep();
      if (!isValid) {
        // Show error message or handle invalid state
        console.log("Current step has validation errors");
        return;
      }

      setActiveTab(nextTab);
    }
  };

  // Handle Previous button click (no validation needed)
  const handlePrevious = () => {
    const currentIndex = tabs.findIndex((tab) => tab.key === activeTab);
    if (currentIndex > 0) {
      setActiveTab(tabs[currentIndex - 1].key);
    }
  };

  const renderActiveForm = () => {
    switch (activeTab) {
      case "account":
        return (
          <AccountDetailsForm form={form} files={files} setFiles={setFiles} />
        );
      case "profile":
        return (
          <ProfileForm
            form={form}
            files={files}
            setFiles={setFiles}
            educationList={educationList}
            setEducationList={setEducationList}
            workExperienceList={workExperienceList}
            setWorkExperienceList={setWorkExperienceList}
          />
        );
      case "technical":
        return <TechnicalForm form={form} files={files} setFiles={setFiles} />;
      default:
        return (
          <AccountDetailsForm form={form} files={files} setFiles={setFiles} />
        );
    }
  };

  const handleFinalSubmit = async (e) => {
    e.preventDefault();

    // Validate all form fields before submission
    const isFormValid = await form.trigger();
    if (!isFormValid) {
      console.log("Form has validation errors");
      return;
    }

    const values = form.getValues();
    const formData = new FormData();

    // Append basic form fields (non-arrays)
    Object.entries(values).forEach(([key, value]) => {
      if (!Array.isArray(value) && value !== undefined && value !== null) {
        formData.append(key, value);
      }
    });

    // Handle arrays by converting them to JSON strings
    if (values.nationalities && values.nationalities.length > 0) {
      formData.append("nationalities", JSON.stringify(values.nationalities));
    }

    if (values.language && values.language.length > 0) {
      formData.append("language", JSON.stringify(values.language));
    }

    if (values.certificates && values.certificates.length > 0) {
      formData.append("certificates", JSON.stringify(values.certificates));
    }

    if (values.skills && values.skills.length > 0) {
      formData.append("skills", JSON.stringify(values.skills));
    }

    // Append files
    if (files.profilePicture) {
      formData.append("profilePicture", files.profilePicture);
    }
    if (files.resume) {
      formData.append("resume", files.resume);
    }

    // Append education list
    if (educationList.length > 0) {
      formData.append("education", JSON.stringify(educationList));
    }

    // Append work experience list
    if (workExperienceList.length > 0) {
      formData.append("workExperience", JSON.stringify(workExperienceList));
    }

    console.log("Final FormData:", formData);

    try {
      await dispatch(asyncCreateStudent(formData, "", router));
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="w-full h-fit">
      <div className="mb-8">
        <div className="flex w-fit border border-[#E7E4E4] rounded-[4px] overflow-hidden">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => handleTabChange(tab.key)}
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

      <div className="flex justify-between items-center pt-6">
        <div>
          {/* Previous Button */}
          {activeTab !== "account" && (
            <button
              type="button"
              onClick={handlePrevious}
              className="px-6 py-2 border border-gray-300 text-gray-600 rounded hover:bg-gray-50"
            >
              Previous
            </button>
          )}
        </div>

        <div className="flex space-x-4">
          {activeTab === "technical" ? (
            // Final Submit Buttons - Only show on last tab
            <>
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
            </>
          ) : (
            // Next Button with validation - Show on all tabs except last
            <button
              type="button"
              onClick={handleNext}
              className="px-6 py-2 bg-blue-600 rounded text-white hover:bg-blue-700"
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
