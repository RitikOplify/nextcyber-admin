"use client";
import React, { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { IoIosArrowDown } from "react-icons/io";
import { IoCloseCircle, IoClose } from "react-icons/io5";

const AccountDetailsForm = ({ form, files, setFiles }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    clearErrors,
    trigger,
  } = form;

  const [dropdownStates, setDropdownStates] = useState({});
  const watchedValues = watch();

  // Preview for profile picture
  const [imagePreview, setImagePreview] = useState(null);

  // State for multi-select nationalities/languages
  const [selectedNationalities, setSelectedNationalities] = useState([]);
  const [selectedLanguages, setSelectedLanguages] = useState([]);

  // Initialize multi-select values from form state
  useEffect(() => {
    const formNationalities = watch("nationalities");
    const formLanguages = watch("language");

    if (formNationalities && Array.isArray(formNationalities)) {
      setSelectedNationalities(formNationalities);
    }
    if (formLanguages && Array.isArray(formLanguages)) {
      setSelectedLanguages(formLanguages);
    }
  }, []);

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

  // Register profile picture field for validation
  useEffect(() => {
    register("profilePicture", {
      required: "Profile picture is required",
      validate: {
        fileType: (value) => {
          if (!files.profilePicture) return "Profile picture is required";
          const allowedTypes = [
            "image/jpeg",
            "image/jpg",
            "image/png",
            "image/gif",
          ];
          return (
            allowedTypes.includes(files.profilePicture.type) ||
            "Only JPEG, JPG, PNG, and GIF files are allowed"
          );
        },
        fileSize: (value) => {
          if (!files.profilePicture) return true;
          const maxSize = 5 * 1024 * 1024; // 5MB
          return (
            files.profilePicture.size <= maxSize ||
            "File size must be less than 5MB"
          );
        },
      },
    });

    // Register multi-select fields for validation
    register("nationalities", {
      required: "At least one nationality is required",
      validate: (value) => {
        return (
          (value && value.length > 0) || "At least one nationality is required"
        );
      },
    });

    register("language", {
      required: "At least one language is required",
      validate: (value) => {
        return (
          (value && value.length > 0) || "At least one language is required"
        );
      },
    });
  }, [register, files.profilePicture]);

  // Sync parent form values when multi-select updates
  useEffect(() => {
    setValue("nationalities", selectedNationalities);
    if (selectedNationalities.length > 0) {
      clearErrors("nationalities");
    }
  }, [selectedNationalities, setValue, clearErrors]);

  useEffect(() => {
    setValue("language", selectedLanguages);
    if (selectedLanguages.length > 0) {
      clearErrors("language");
    }
  }, [selectedLanguages, setValue, clearErrors]);

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
    // Trigger validation for the field
    trigger(name);
  };

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

  // Enhanced CustomSelect component with proper validation
  const CustomSelect = ({
    name,
    options,
    placeholder,
    error,
    isMulti = false,
    direction,
    required = false,
  }) => {
    const isOpen = dropdownStates[name];
    const selectedValue = watchedValues[name];

    return (
      <div className="relative">
        <div
          onClick={() => toggleDropdown(name)}
          className={`w-full text-[#6F6F6F] cursor-pointer text-[14px] font-normal p-[14px_16px] border ${
            error ? "border-red-500" : "border-[#ECECEC]"
          } ${
            isOpen ? "rounded-t-[8px] border-b-0" : "rounded-[8px]"
          } outline-none flex justify-between items-center bg-white hover:border-gray-400 transition-colors`}
        >
          <span
            className={
              selectedValue?.length || (!isMulti && selectedValue)
                ? "text-[#333]"
                : "text-[#999]"
            }
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
            } left-0 right-0 bg-white border border-[#ECECEC] shadow-lg z-10 max-h-[200px] overflow-y-auto rounded-b-[8px]`}
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

        {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
      </div>
    );
  };

  // Handle file drop for profile picture
  const onDrop = (acceptedFiles, rejectedFiles) => {
    if (rejectedFiles.length > 0) {
      const error = rejectedFiles[0].errors[0];
      setValue("profilePicture", null);
      return;
    }

    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      setFiles((prev) => ({ ...prev, profilePicture: file }));
      setValue("profilePicture", file.name);
      clearErrors("profilePicture");
      trigger("profilePicture");
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "image/*": [".jpeg", ".jpg", ".png", ".gif"] },
    onDrop,
    noClick: false,
    multiple: false,
    maxFiles: 1,
    maxSize: 5 * 1024 * 1024, // 5MB
  });

  const removeImage = () => {
    setFiles((prev) => ({ ...prev, profilePicture: null }));
    setValue("profilePicture", null);
    setImagePreview(null);
  };

  // Form submit handler
  const onSubmit = async (data) => {
    console.log("Account Details Data:", data);
    console.log("Selected Nationalities:", selectedNationalities);
    console.log("Selected Languages:", selectedLanguages);
    console.log("Profile Picture File:", files.profilePicture);
  };

  // Options arrays
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
              <div
                className={`border-2 border-dashed ${
                  isDragActive
                    ? "border-blue-500 bg-blue-50"
                    : errors.profilePicture
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded-lg p-8 text-center hover:border-gray-400 transition-colors`}
              >
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
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
              >
                <IoCloseCircle size={16} />
              </button>
            </div>
          )}

          {errors.profilePicture && (
            <p className="text-red-500 text-sm mt-1">
              {errors.profilePicture.message}
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
            className={`w-full p-3 border ${
              errors.firstName ? "border-red-500" : "border-gray-300"
            } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors`}
            {...register("firstName", {
              required: "First name is required",
              minLength: {
                value: 2,
                message: "First name must be at least 2 characters",
              },
              pattern: {
                value: /^[A-Za-z\s]+$/,
                message: "First name can only contain letters",
              },
            })}
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
            className={`w-full p-3 border ${
              errors.lastName ? "border-red-500" : "border-gray-300"
            } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors`}
            {...register("lastName", {
              required: "Last name is required",
              minLength: {
                value: 2,
                message: "Last name must be at least 2 characters",
              },
              pattern: {
                value: /^[A-Za-z\s]+$/,
                message: "Last name can only contain letters",
              },
            })}
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
            required={true}
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
            required={true}
          />
        </div>
      </div>

      {/* Gender */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Gender
        </label>
        <div className="flex space-x-6">
          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              value="male"
              className="mr-2 w-4 h-4 text-blue-600 focus:ring-blue-500"
              {...register("gender")}
            />
            <span className="text-sm">Male</span>
          </label>
          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              value="female"
              className="mr-2 w-4 h-4 text-blue-600 focus:ring-blue-500"
              {...register("gender")}
            />
            <span className="text-sm">Female</span>
          </label>
          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              value="prefer-not-to-say"
              className="mr-2 w-4 h-4 text-blue-600 focus:ring-blue-500"
              {...register("gender")}
            />
            <span className="text-sm">Prefer not to say</span>
          </label>
        </div>
      </div>

      {/* Toggles */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div>
            <p className="font-medium text-gray-800">Become anonymous</p>
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
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div>
            <p className="font-medium text-gray-800">Looking for work</p>
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
            required={true}
          />
          {selectedNationalities.length > 0 && (
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">
                Selected Nationalities ({selectedNationalities.length})
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
                      className="ml-2 text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      <IoClose size={14} />
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
            required={true}
          />
          {selectedLanguages.length > 0 && (
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">
                Selected Languages ({selectedLanguages.length})
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
                      className="ml-2 text-green-600 hover:text-green-800 transition-colors"
                    >
                      <IoClose size={14} />
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
            type="number"
            placeholder="Enter your salary"
            min="0"
            step="1000"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors"
            {...register("expectedSalary", {
              min: {
                value: 0,
                message: "Salary must be a positive number",
              },
              pattern: {
                value: /^\d+$/,
                message: "Please enter a valid number",
              },
            })}
          />
          {errors.expectedSalary && (
            <p className="text-red-500 text-sm mt-1">
              {errors.expectedSalary.message}
            </p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Hourly Rate
          </label>
          <input
            type="number"
            placeholder="Enter your hourly rate"
            min="0"
            step="1"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors"
            {...register("hourlyRate", {
              min: {
                value: 0,
                message: "Hourly rate must be a positive number",
              },
              pattern: {
                value: /^\d+(\.\d{1,2})?$/,
                message: "Please enter a valid hourly rate",
              },
            })}
          />
          {errors.hourlyRate && (
            <p className="text-red-500 text-sm mt-1">
              {errors.hourlyRate.message}
            </p>
          )}
        </div>
      </div>

      {/* Form Actions */}
      {/* <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
        <button
          type="button"
          className="px-6 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          onClick={() => {
            form.reset();
            setSelectedNationalities([]);
            setSelectedLanguages([]);
            setFiles((prev) => ({ ...prev, profilePicture: null }));
          }}
        >
          Discard Changes
        </button>
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Save Changes
        </button>
      </div> */}
    </form>
  );
};

export default AccountDetailsForm;
