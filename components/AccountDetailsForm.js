"use client";
import React, { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { IoIosArrowDown } from "react-icons/io";
import { IoCloseCircle } from "react-icons/io5";

const AccountDetailsForm = ({ form, files, setFiles }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    clearErrors,
  } = form;

  const [dropdownStates, setDropdownStates] = useState({});
  const watchedValues = watch();

  // Preview for profile picture
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    if (files.profilePicture) {
      const objectUrl = URL.createObjectURL(files.profilePicture);
      setImagePreview(objectUrl);

      // Clean up to avoid memory leaks
      return () => URL.revokeObjectURL(objectUrl);
    } else {
      setImagePreview(null);
    }
  }, [files.profilePicture]);

  // Handle dropdown toggle
  const toggleDropdown = (name) => {
    setDropdownStates((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  // Select option (single)
  const selectOption = (name, option) => {
    setValue(name, option);
    setDropdownStates((prev) => ({ ...prev, [name]: false }));
    clearErrors(name);
  };

  // State and functions for multi-select nationalities/languages
  const [selectedNationalities, setSelectedNationalities] = useState(
    watch("nationalities") || []
  );

  const [selectedLanguages, setSelectedLanguages] = useState(
    watch("language") || []
  );

  // Sync parent form values when these update
  useEffect(() => {
    setValue("nationalities", selectedNationalities);
  }, [selectedNationalities, setValue]);

  useEffect(() => {
    setValue("language", selectedLanguages);
  }, [selectedLanguages, setValue]);

  // Select option multi-select
  const selectMultiOption = (name, option) => {
    const currentValues =
      name === "nationalities" ? selectedNationalities : selectedLanguages;
    const setCurrentValues =
      name === "nationalities"
        ? setSelectedNationalities
        : setSelectedLanguages;

    if (!currentValues.includes(option)) {
      const newValues = [...currentValues, option];
      setCurrentValues(newValues);
      clearErrors(name);
    }
    setDropdownStates((prev) => ({ ...prev, [name]: false }));
  };

  // Remove from multi-select
  const removeSelectedOption = (name, option) => {
    const currentValues =
      name === "nationalities" ? selectedNationalities : selectedLanguages;
    const setCurrentValues =
      name === "nationalities"
        ? setSelectedNationalities
        : setSelectedLanguages;

    const newValues = currentValues.filter((item) => item !== option);
    setCurrentValues(newValues);
  };

  // CustomSelect component
  const CustomSelect = ({
    name,
    options,
    placeholder,
    error,
    isMulti = false,
    direction,
  }) => {
    const isOpen = dropdownStates[name];
    const selectedValue = watchedValues[name];

    return (
      <div className="relative">
        <div
          onClick={() => toggleDropdown(name)}
          className={`w-full text-[#6F6F6F] cursor-pointer text-[14px] font-normal p-[14px_16px] border border-[#ECECEC] ${
            isOpen ? "rounded-t-[8px] border-b-0" : "rounded-[8px]"
          } outline-none flex justify-between items-center bg-white`}
        >
          <span
            className={selectedValue?.length ? "text-[#333]" : "text-[#999]"}
          >
            {isMulti
              ? selectedValue && selectedValue.length > 0
                ? selectedValue.join(", ")
                : placeholder
              : selectedValue || placeholder}
          </span>
          <IoIosArrowDown
            className={`text-2xl text-[#6F6F6F] transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </div>

        {isOpen && (
          <div
            className={`absolute ${
              direction === "up" ? "bottom-full" : "top-full"
            } left-0 right-0 bg-white border border-[#ECECEC] shadow-lg z-10 max-h-[200px] overflow-y-auto`}
          >
            <div className="bg-[#4472C4] text-white px-4 flex items-center h-[40px] text-[14px] font-medium">
              {placeholder}
            </div>
            {options.map((option, index) => (
              <div
                key={index}
                onClick={() =>
                  isMulti
                    ? selectMultiOption(name, option)
                    : selectOption(name, option)
                }
                className="px-4 flex items-center h-[40px] text-[14px] text-[#333] hover:bg-[#f5f5f5] cursor-pointer border-b border-[#f0f0f0] last:border-b-0"
              >
                {option}
              </div>
            ))}
          </div>
        )}
        {!isMulti && (
          <input
            type="hidden"
            {...register(name, { required: `${placeholder} is required` })}
          />
        )}

        {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
      </div>
    );
  };

  // Handle file drop for profile picture
  const onDrop = (acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      setFiles((prev) => ({ ...prev, profilePicture: file }));
      setValue("profilePicture", file.name); // For validation
      clearErrors("profilePicture");
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: { "image/*": [".jpeg", ".jpg", ".png", ".gif"] },
    onDrop,
    noClick: false,
    multiple: false,
    maxFiles: 1,
  });

  const removeImage = () => {
    setFiles((prev) => ({ ...prev, profilePicture: null }));
    setValue("profilePicture", null);
    setImagePreview(null);
  };

  // Form submit handler (mostly for debugging here)
  const onSubmit = (data) => {
    console.log("Account Details Data:", data);
    console.log("Selected Nationalities:", selectedNationalities);
    console.log("Selected Languages:", selectedLanguages);
    console.log("Profile Picture File:", files.profilePicture);
  };

  // Options
  const locationOptions = [
    "New York",
    "London",
    "Tokyo",
    "Paris",
    "Sydney",
    "Mumbai",
    "Berlin",
    "Toronto",
    "Singapore",
    "Dubai",
  ];

  const currencyOptions = [
    "USD",
    "EUR",
    "GBP",
    "JPY",
    "AUD",
    "CAD",
    "CHF",
    "CNY",
    "INR",
    "SGD",
  ];

  const nationalityOptions = [
    "American",
    "British",
    "Canadian",
    "Australian",
    "German",
    "French",
    "Japanese",
    "Indian",
    "Chinese",
    "Brazilian",
  ];

  const languageOptions = [
    "English",
    "Spanish",
    "French",
    "German",
    "Chinese",
    "Japanese",
    "Portuguese",
    "Russian",
    "Arabic",
    "Hindi",
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Profile Picture Upload */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Profile Picture <span className="text-red-500">*</span>
          </label>

          {!imagePreview ? (
            <div {...getRootProps()} className="cursor-pointer">
              <input {...getInputProps()} />
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors">
                <div className="text-6xl text-gray-400 mb-4">📁</div>
                <p className="text-gray-600">
                  <span className="text-blue-600 font-medium">
                    Upload a file
                  </span>{" "}
                  or drag and drop
                </p>
                <p className="text-gray-400 text-sm mt-1">
                  PNG, JPG, GIF up to 5MB
                </p>
              </div>
            </div>
          ) : (
            <div className="relative inline-block">
              <img
                src={imagePreview}
                alt="Profile preview"
                className="w-32 h-32 object-cover rounded-lg border-2 border-gray-300"
              />
              <button
                type="button"
                onClick={removeImage}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
              >
                <IoCloseCircle size={16} />
              </button>
            </div>
          )}

          {errors.profilePicture && (
            <p className="text-red-500 text-sm mt-1">
              Profile picture is required
            </p>
          )}
        </div>
      </div>

      {/* Names */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            First Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="Enter first name"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            {...register("firstName", { required: "First name is required" })}
          />
          {errors.firstName && (
            <p className="text-red-500 text-sm mt-1">
              {errors.firstName.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Last Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="Enter last name"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            {...register("lastName", { required: "Last name is required" })}
          />
          {errors.lastName && (
            <p className="text-red-500 text-sm mt-1">
              {errors.lastName.message}
            </p>
          )}
        </div>
      </div>

      {/* Location and Currency */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Location <span className="text-red-500">*</span>
          </label>
          <CustomSelect
            name="location"
            options={locationOptions}
            placeholder="Select location"
            error={errors.location}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Currency <span className="text-red-500">*</span>
          </label>
          <CustomSelect
            name="currency"
            options={currencyOptions}
            placeholder="Select currency"
            error={errors.currency}
          />
        </div>
      </div>

      {/* Gender */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Gender
        </label>
        <div className="flex space-x-4">
          <label className="flex items-center">
            <input
              type="radio"
              value="male"
              className="mr-2"
              {...register("gender")}
            />
            Male
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              value="female"
              className="mr-2"
              {...register("gender")}
            />
            Female
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              value="prefer-not-to-say"
              className="mr-2"
              {...register("gender")}
            />
            Prefer not to say
          </label>
        </div>
      </div>

      {/* Toggles */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Become anonymous</p>
            <p className="text-sm text-gray-500">
              This will hide your name and the companies you have worked for.
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              {...register("anonymous")}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Looking for work</p>
            <p className="text-sm text-gray-500">
              It will show recruiters that you are actively looking for a new
              position.
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              {...register("lookingForWork")}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>
      </div>

      {/* Nationalities */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Nationalities <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <CustomSelect
            name="nationalities"
            options={nationalityOptions}
            placeholder="Select nationalities"
            error={errors.nationalities}
            isMulti={true}
          />
          {selectedNationalities.length > 0 && (
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">
                Selected Nationalities
              </p>
              <div className="flex flex-wrap gap-2">
                {selectedNationalities.map((nat, i) => (
                  <div
                    key={i}
                    className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center"
                  >
                    {nat}
                    <button
                      type="button"
                      onClick={() => removeSelectedOption("nationalities", nat)}
                      className="ml-2 text-blue-600 hover:text-blue-800"
                    >
                      {/* <IoClose size={14} /> */}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Languages */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Language <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <CustomSelect
            name="language"
            options={languageOptions}
            placeholder="Select language"
            error={errors.language}
            isMulti={true}
          />
          {selectedLanguages.length > 0 && (
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">
                Selected Languages
              </p>
              <div className="flex flex-wrap gap-2">
                {selectedLanguages.map((lang, i) => (
                  <div
                    key={i}
                    className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm flex items-center"
                  >
                    {lang}
                    <button
                      type="button"
                      onClick={() => removeSelectedOption("language", lang)}
                      className="ml-2 text-green-600 hover:text-green-800"
                    >
                      {/* <IoClose size={14} /> */}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Salary & Hourly Rate */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Expected Salary
          </label>
          <input
            type="text"
            placeholder="Enter your salary"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            {...register("expectedSalary")}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Hourly Rate
          </label>
          <input
            type="text"
            placeholder="Enter your hourly rate"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            {...register("hourlyRate")}
          />
        </div>
      </div>

      {/* Form Actions */}
      <div className="flex justify-end space-x-4 pt-6">
        <button
          type="button"
          className="px-6 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          Discard Changes
        </button>
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Save Changes
        </button>
      </div>
    </form>
  );
};

export default AccountDetailsForm;
