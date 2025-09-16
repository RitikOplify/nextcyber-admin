// AddEducationModal.js
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { IoIosArrowDown } from "react-icons/io";

const AddEducationModal = ({ isOpen, onClose, onSave, editData }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    clearErrors,
    reset,
  } = useForm();

  const [dropdownStates, setDropdownStates] = useState({});
  const watchedValues = watch();

  const levelOptions = [
    "School",
    "High School",
    "Undergraduate",
    "Graduate",
    "Post Graduate",
    "Doctorate",
    "Certificate",
    "Diploma",
  ];

  useEffect(() => {
    if (editData) {
      setValue("institute", editData.institute);
      setValue("level", editData.level);
      setValue("startDate", editData.startDate);
      setValue("endDate", editData.endDate);
    } else {
      reset();
    }
  }, [editData, setValue, reset]);

  const toggleDropdown = (name) => {
    setDropdownStates((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  const selectOption = (name, option) => {
    setValue(name, option);
    setDropdownStates((prev) => ({ ...prev, [name]: false }));
    clearErrors(name);
  };

  const CustomSelect = ({ name, options, placeholder, error }) => {
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
          <span className={selectedValue ? "text-[#333]" : "text-[#999]"}>
            {selectedValue || placeholder}
          </span>
          <IoIosArrowDown
            className={`text-2xl text-[#6F6F6F] transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </div>

        {isOpen && (
          <div className="absolute top-full left-0 right-0 bg-white border border-[#ECECEC] shadow-lg z-10 max-h-[200px] overflow-y-auto">
            <div className="bg-[#4472C4] text-white px-4 flex items-center h-[40px] text-[14px] font-medium">
              {placeholder}
            </div>
            {options.map((option, index) => (
              <div
                key={index}
                onClick={() => selectOption(name, option)}
                className="px-4 flex items-center h-[40px] text-[14px] text-[#333] hover:bg-[#f5f5f5] cursor-pointer border-b border-[#f0f0f0] last:border-b-0"
              >
                {option}
              </div>
            ))}
          </div>
        )}

        <input
          type="hidden"
          {...register(name, { required: `${placeholder} is required` })}
        />

        {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
      </div>
    );
  };

  const onSubmit = (data) => {
    onSave(data);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center p-4 z-[2000]">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-800">
              {editData ? "Edit Education" : "Add Education"}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              {/* <IoClose size={24} /> */}
            </button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Institute and Level */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Institute <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter institute name"
                  className="w-full p-[14px_16px] border border-[#ECECEC] rounded-[8px] outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  {...register("institute", {
                    required: "Institute is required",
                  })}
                />
                {errors.institute && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.institute.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Level <span className="text-red-500">*</span>
                </label>
                <CustomSelect
                  name="level"
                  options={levelOptions}
                  placeholder="Select level"
                  error={errors.level}
                />
              </div>
            </div>

            {/* Start Date and End Date */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Start Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  placeholder="Enter start date"
                  className="w-full p-[14px_16px] border border-[#ECECEC] rounded-[8px] outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  {...register("startDate", {
                    required: "Start date is required",
                  })}
                />
                {errors.startDate && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.startDate.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  End Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  placeholder="Enter end date"
                  className="w-full p-[14px_16px] border border-[#ECECEC] rounded-[8px] outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  {...register("endDate", { required: "End date is required" })}
                />
                {errors.endDate && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.endDate.message}
                  </p>
                )}
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex justify-end space-x-3 pt-6">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddEducationModal;
