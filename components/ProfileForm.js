"use client";
import React, { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { IoAdd, IoClose } from "react-icons/io5";
import { FiEdit, FiTrash2, FiCalendar, FiFileText } from "react-icons/fi";
import AddEducationModal from "./AddEducationModal";
import AddWorkExperienceModal from "./AddWorkExperienceModal";

const ProfileForm = ({
  form,
  files,
  setFiles,
  educationList,
  setEducationList,
  workExperienceList,
  setWorkExperienceList,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    clearErrors,
    trigger,
  } = form;

  // State for resume preview
  const [resumePreview, setResumePreview] = useState(null);

  // State for modals
  const [showEducationModal, setShowEducationModal] = useState(false);
  const [showWorkModal, setShowWorkModal] = useState(false);
  const [editingEducation, setEditingEducation] = useState(null);
  const [editingWork, setEditingWork] = useState(null);

  // Register resume field for validation
  useEffect(() => {
    register("resume", {
      required: "Resume is required",
      validate: {
        fileType: (value) => {
          if (!files.resume) return "Resume is required";
          const allowedTypes = [
            "application/pdf",
            "application/msword",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          ];
          return (
            allowedTypes.includes(files.resume.type) ||
            "Only PDF, DOC, and DOCX files are allowed"
          );
        },
        fileSize: (value) => {
          if (!files.resume) return true;
          const maxSize = 10 * 1024 * 1024; // 10MB
          return (
            files.resume.size <= maxSize || "File size must be less than 10MB"
          );
        },
      },
    });
  }, [register, files.resume]);

  // Update resume preview when file changes
  useEffect(() => {
    if (files.resume) {
      const fileSize = (files.resume.size / 1024 / 1024).toFixed(2);
      setResumePreview({
        type: files.resume.type.includes("pdf") ? "pdf" : "doc",
        name: files.resume.name,
        size: `${fileSize} MB`,
      });
    } else {
      setResumePreview(null);
    }
  }, [files.resume]);

  // Custom file validator for dropzone
  const fileValidator = (file) => {
    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (!allowedTypes.includes(file.type)) {
      return {
        code: "file-invalid-type",
        message: "Only PDF, DOC, and DOCX files are allowed",
      };
    }

    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      return {
        code: "file-too-large",
        message: "File size must be less than 10MB",
      };
    }

    return null;
  };

  // Resume drag and drop functionality
  const onDrop = (acceptedFiles, rejectedFiles) => {
    if (rejectedFiles.length > 0) {
      const error = rejectedFiles[0].errors[0];
      setValue("resume", null);
      return;
    }

    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      setFiles((prev) => ({ ...prev, resume: file }));
      setValue("resume", file.name);
      clearErrors("resume");
      trigger("resume");
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "application/pdf": [".pdf"],
      "application/msword": [".doc"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        [".docx"],
    },
    onDrop,
    validator: fileValidator,
    noClick: false,
    multiple: false,
    maxFiles: 1,
    maxSize: 10 * 1024 * 1024, // 10MB
  });

  const removeResume = () => {
    setFiles((prev) => ({ ...prev, resume: null }));
    setValue("resume", null);
    setResumePreview(null);
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
    if (
      window.confirm("Are you sure you want to delete this education record?")
    ) {
      setEducationList((prev) => prev.filter((edu) => edu.id !== id));
    }
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
    if (
      window.confirm("Are you sure you want to delete this work experience?")
    ) {
      setWorkExperienceList((prev) => prev.filter((work) => work.id !== id));
    }
  };

  // Get file icon based on type
  const getFileIcon = (type) => {
    if (type === "pdf") return "📄";
    return "📝";
  };

  // Form submission
  const onSubmit = async (data) => {
    console.log("Profile Data:", data);
    console.log("Education List:", educationList);
    console.log("Work Experience List:", workExperienceList);
    console.log("Resume:", files.resume);
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
                <div
                  className={`border-2 border-dashed ${
                    isDragActive
                      ? "border-blue-500 bg-blue-50"
                      : errors.resume
                      ? "border-red-500"
                      : "border-gray-300"
                  } rounded-lg p-8 text-center hover:border-gray-400 transition-colors`}
                >
                  <div className="text-6xl text-gray-400 mb-4">📄</div>
                  <p className="text-gray-600">
                    <span className="text-blue-600 font-medium">
                      Upload a file
                    </span>{" "}
                    or drag and drop
                  </p>
                  <p className="text-gray-400 text-sm mt-1">
                    PDF, DOC, DOCX up to 10MB
                  </p>
                </div>
              </div>
            ) : (
              <div className="relative p-4 border border-gray-300 rounded-lg bg-gray-50">
                <div className="flex items-center space-x-3">
                  <div className="text-3xl">
                    {getFileIcon(resumePreview.type)}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-800 truncate">
                      {resumePreview.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      {resumePreview.size}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={removeResume}
                    className="bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                  >
                    <IoClose size={16} />
                  </button>
                </div>
              </div>
            )}

            {errors.resume && (
              <p className="text-red-500 text-sm mt-1">
                {errors.resume.message}
              </p>
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
              className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <IoAdd size={20} />
              <span>Add Education</span>
            </button>
          </div>

          {/* Education List */}
          {educationList.length === 0 ? (
            <div className="text-center w-1/2 py-8 text-gray-500 border-2 border-dashed border-gray-300 rounded-lg">
              <FiFileText size={48} className="mx-auto mb-4 text-gray-400" />
              <p className="font-medium">No education records added yet</p>
              <p className="text-sm">Click &quot;Add Education&quot; to get started</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {educationList.map((education) => (
                <div
                  key={education.id}
                  className="border border-gray-200 rounded-lg p-4 bg-white hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-800 mb-1">
                        {education.institute}
                      </h4>
                      <p className="text-sm text-gray-600 mb-2">
                        {education.level}
                      </p>
                      {education.fieldOfStudy && (
                        <p className="text-sm text-gray-500 mb-2">
                          {education.fieldOfStudy}
                        </p>
                      )}
                      <div className="flex items-center space-x-1 text-xs text-gray-500">
                        <FiCalendar size={12} />
                        <span>
                          {education.startDate} - {education.endDate}
                        </span>
                      </div>
                      {education.grade && (
                        <p className="text-xs text-blue-600 mt-1 font-medium">
                          Grade: {education.grade}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center space-x-1 ml-2">
                      <button
                        type="button"
                        onClick={() => handleEditEducation(education)}
                        className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                        title="Edit education"
                      >
                        <FiEdit size={14} />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteEducation(education.id)}
                        className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                        title="Delete education"
                      >
                        <FiTrash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
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
              className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <IoAdd size={20} />
              <span>Add Work Experience</span>
            </button>
          </div>

          {/* Work Experience List */}
          {workExperienceList.length === 0 ? (
            <div className="text-center w-1/2 py-8 text-gray-500 border-2 border-dashed border-gray-300 rounded-lg">
              <FiFileText size={48} className="mx-auto mb-4 text-gray-400" />
              <p className="font-medium">No work experience added yet</p>
              <p className="text-sm">
                Click &quot;Add Work Experience&quot; to get started
              </p>
            </div>
          ) : (
            <div className="space-y-4 grid grid-cols-3">
              {workExperienceList.map((work) => (
                <div
                  key={work.id}
                  className="border border-gray-200 rounded-lg p-4 bg-white hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-800 mb-1">
                        {work.jobTitle}
                      </h4>
                      <p className="text-sm text-blue-600 font-medium mb-2">
                        {work.companyName}
                      </p>
                      <div className="flex items-center space-x-1 text-sm text-gray-500 mb-2">
                        <FiCalendar size={14} />
                        <span>
                          {work.startDate} - {work.endDate || "Present"}
                        </span>
                      </div>
                      {work.location && (
                        <p className="text-sm text-gray-500 mb-2">
                          📍 {work.location}
                        </p>
                      )}
                      {work.description && (
                        <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                          {work.description}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center space-x-1 ml-4">
                      <button
                        type="button"
                        onClick={() => handleEditWork(work)}
                        className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                        title="Edit work experience"
                      >
                        <FiEdit size={16} />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteWork(work.id)}
                        className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                        title="Delete work experience"
                      >
                        <FiTrash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Form Actions */}
        <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
          <button
            type="button"
            className="px-6 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            onClick={() => {
              form.reset();
              setEducationList([]);
              setWorkExperienceList([]);
              setFiles((prev) => ({ ...prev, resume: null }));
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
