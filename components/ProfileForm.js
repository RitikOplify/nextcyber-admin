"use client";
// ProfileForm.js
import React, { useState } from "react";

import { useDropzone } from "react-dropzone";
import { IoAdd } from "react-icons/io5";
import { FiEdit, FiTrash2, FiCalendar } from "react-icons/fi";
import AddEducationModal from "./AddEducationModal";
import AddWorkExperienceModal from "./AddWorkExperienceModal";

const ProfileForm = ({ form }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    clearErrors,
  } = form;

  // State for resume upload
  const [selectedResume, setSelectedResume] = useState(null);
  const [resumePreview, setResumePreview] = useState(null);

  // State for modals
  const [showEducationModal, setShowEducationModal] = useState(false);
  const [showWorkModal, setShowWorkModal] = useState(false);
  const [editingEducation, setEditingEducation] = useState(null);
  const [editingWork, setEditingWork] = useState(null);

  // State for education and work experience lists
  const [educationList, setEducationList] = useState([
    {
      id: 1,
      institute: "Army Public School",
      level: "School",
      startDate: "May 2001",
      endDate: "Apr 2002",
    },
  ]);

  const [workExperienceList, setWorkExperienceList] = useState([]);

  // Resume drag and drop functionality
  const onDrop = (acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      setSelectedResume(file);
      setValue("resume", file);
      clearErrors("resume");

      // For PDF files, show file name as preview
      if (file.type === "application/pdf") {
        setResumePreview({
          type: "pdf",
          name: file.name,
          size: (file.size / 1024 / 1024).toFixed(2) + " MB",
        });
      }
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "application/pdf": [".pdf"],
      "application/msword": [".doc"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        [".docx"],
    },
    onDrop,
    noClick: false,
    multiple: false,
    maxFiles: 1,
  });

  const removeResume = () => {
    setSelectedResume(null);
    setResumePreview(null);
    setValue("resume", null);
  };

  // Education handlers
  const handleAddEducation = (educationData) => {
    if (editingEducation) {
      setEducationList((prev) =>
        prev.map((edu) =>
          edu.id === editingEducation.id
            ? { ...educationData, id: editingEducation.id }
            : edu
        )
      );
      setEditingEducation(null);
    } else {
      const newEducation = {
        ...educationData,
        id: Date.now(),
      };
      setEducationList((prev) => [...prev, newEducation]);
    }
    setShowEducationModal(false);
  };

  const handleEditEducation = (education) => {
    setEditingEducation(education);
    setShowEducationModal(true);
  };

  const handleDeleteEducation = (id) => {
    setEducationList((prev) => prev.filter((edu) => edu.id !== id));
  };

  // Work experience handlers
  const handleAddWorkExperience = (workData) => {
    if (editingWork) {
      setWorkExperienceList((prev) =>
        prev.map((work) =>
          work.id === editingWork.id
            ? { ...workData, id: editingWork.id }
            : work
        )
      );
      setEditingWork(null);
    } else {
      const newWork = {
        ...workData,
        id: Date.now(),
      };
      setWorkExperienceList((prev) => [...prev, newWork]);
    }
    setShowWorkModal(false);
  };

  const handleEditWork = (work) => {
    setEditingWork(work);
    setShowWorkModal(true);
  };

  const handleDeleteWork = (id) => {
    setWorkExperienceList((prev) => prev.filter((work) => work.id !== id));
  };

  // Form submission
  const onSubmit = (data) => {
    console.log("Profile Data:", data);
    console.log("Education List:", educationList);
    console.log("Work Experience List:", workExperienceList);
    console.log("Resume:", selectedResume);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Resume Upload */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Resume <span className="text-red-500">*</span>
            </label>

            {!resumePreview ? (
              <div {...getRootProps()} className="cursor-pointer">
                <input {...getInputProps()} />
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors">
                  <div className="text-6xl text-gray-400 mb-4">📄</div>
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
              <div className="relative inline-block p-4 border border-gray-300 rounded-lg bg-gray-50">
                <div className="flex items-center space-x-3">
                  <div className="text-3xl">📄</div>
                  <div>
                    <p className="font-medium text-gray-800">
                      {resumePreview.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      {resumePreview.size}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={removeResume}
                    className="ml-auto bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                  >
                    {/* <IoClose size={16} /> */}
                  </button>
                </div>
              </div>
            )}

            {errors.resume && (
              <p className="text-red-500 text-sm mt-1">Resume is required</p>
            )}
          </div>
        </div>

        {/* Education Section */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <h3 className="text-lg font-medium text-gray-800">Education</h3>
              <div className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                {educationList.length}
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                setEditingEducation(null);
                setShowEducationModal(true);
              }}
              className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              <IoAdd size={20} />
              <span>Add Education</span>
            </button>
          </div>

          {/* Education List */}
          <div className="grid grid-cols-3 gap-5">
            {educationList.map((education) => (
              <div
                key={education.id}
                className="border border-gray-200 rounded-lg p-4 bg-white"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-medium text-gray-800">
                      {education.institute}
                    </h4>
                    <p className="text-sm text-gray-600">{education.level}</p>
                    <div className="flex items-center space-x-1 text-sm text-gray-500 mt-1">
                      <FiCalendar size={14} />
                      <span>
                        {education.startDate} - {education.endDate}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      type="button"
                      onClick={() => handleEditEducation(education)}
                      className="p-2 text-gray-400 hover:text-blue-600"
                    >
                      <FiEdit size={16} />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteEducation(education.id)}
                      className="p-2 text-gray-400 hover:text-red-600"
                    >
                      <FiTrash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Work Experience Section */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <h3 className="text-lg font-medium text-gray-800">
                Work Experience
              </h3>
              <div className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                {workExperienceList.length}
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                setEditingWork(null);
                setShowWorkModal(true);
              }}
              className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              <IoAdd size={20} />
              <span>Add Work Experience</span>
            </button>
          </div>

          {/* Work Experience List */}
          <div className="space-y-3">
            {workExperienceList.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <p>No work experience added yet.</p>
                <p className="text-sm">
                  Click &quot;Add Work Experience&quot; to get started.
                </p>
              </div>
            ) : (
              workExperienceList.map((work) => (
                <div
                  key={work.id}
                  className="border border-gray-200 rounded-lg p-4 bg-white"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-medium text-gray-800">
                        {work.jobTitle}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {work.companyName}
                      </p>
                      <div className="flex items-center space-x-1 text-sm text-gray-500 mt-1">
                        <FiCalendar size={14} />
                        <span>
                          {work.startDate} - {work.endDate || "Present"}
                        </span>
                      </div>
                      {work.description && (
                        <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                          {work.description}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        type="button"
                        onClick={() => handleEditWork(work)}
                        className="p-2 text-gray-400 hover:text-blue-600"
                      >
                        <FiEdit size={16} />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteWork(work.id)}
                        className="p-2 text-gray-400 hover:text-red-600"
                      >
                        <FiTrash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
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

      {/* Modals */}
      {showEducationModal && (
        <AddEducationModal
          isOpen={showEducationModal}
          onClose={() => {
            setShowEducationModal(false);
            setEditingEducation(null);
          }}
          onSave={handleAddEducation}
          editData={editingEducation}
        />
      )}

      {showWorkModal && (
        <AddWorkExperienceModal
          isOpen={showWorkModal}
          onClose={() => {
            setShowWorkModal(false);
            setEditingWork(null);
          }}
          onSave={handleAddWorkExperience}
          editData={editingWork}
        />
      )}
    </div>
  );
};

export default ProfileForm;
