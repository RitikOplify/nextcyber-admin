"use client";

import { useState } from "react";
import Image from "next/image";

const ProfileDashboard = () => {
  const [activeTab, setActiveTab] = useState("Skills & Experience");

  // Dummy data
  const profileData = {
    name: "Pradeep Gusain",
    title: "Network Security Engineer",
    profileImage: "/api/placeholder/60/60", // Replace with actual image path
    bannerImage: "/api/placeholder/800/200", // Replace with actual banner image
    skills: [
      "Python",
      "SIEM",
      "AWS",
      "Security Auditing",
      "Penetration Testing",
    ],
    certifications: ["CompTIA+", "Certified Ethical Hacker (CEH)"],
    experience: [
      {
        id: 1,
        title: "IT Security Intern",
        company: "CyberCorp Inc.",
        duration: "June 2023 - Dec 2023",
        description:
          "Assisted in monitoring security alert, conducting vulnerability assessments and preparing reports on security incidents.",
      },
      {
        id: 2,
        title: "IT Security Intern",
        company: "CyberCorp Inc.",
        duration: "June 2023 - Dec 2023",
        description:
          "Assisted in monitoring security alert, conducting vulnerability assessments and preparing reports on security incidents.",
      },
    ],
    courses: [
      { title: "Introduction to Cybersecurity", date: "2024-05-18" },
      { title: "Cybersecurity Analyst", date: "2024-05-18" },
      { title: "CompTIA Security+", date: "2024-05-18" },
      { title: "Introduction to Cybersecurity", date: "2024-05-18" },
    ],
    mentors: [
      {
        name: "Steve Smith",
        specialty: "Penetration Testing",
        avatar: "/api/placeholder/40/40",
      },
      {
        name: "Nathan Astle",
        specialty: "Penetration Testing",
        avatar: "/api/placeholder/40/40",
      },
      {
        name: "Steve Smith",
        specialty: "Penetration Testing",
        avatar: "/api/placeholder/40/40",
      },
      {
        name: "Nathan Astle",
        specialty: "Penetration Testing",
        avatar: "/api/placeholder/40/40",
      },
    ],
    applications: [
      {
        title: "Security Consultant",
        company: "Wipro",
        remotePolicy: "Full Time",
        appliedOn: "July 25, 2025",
        status: "In Process",
      },
      {
        title: "Security Consultant",
        company: "Wipro",
        remotePolicy: "Full Time",
        appliedOn: "July 25, 2025",
        status: "In Process",
      },
      {
        title: "Security Consultant",
        company: "Wipro",
        remotePolicy: "Full Time",
        appliedOn: "July 25, 2025",
        status: "In Process",
      },
      {
        title: "Security Consultant",
        company: "Wipro",
        remotePolicy: "Full Time",
        appliedOn: "July 25, 2025",
        status: "In Process",
      },
      {
        title: "Security Consultant",
        company: "Wipro",
        remotePolicy: "Full Time",
        appliedOn: "July 25, 2025",
        status: "In Process",
      },
    ],
  };

  const tabs = ["Skills & Experience", "Education", "About"];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Banner */}
      <div className="relative h-48 bg-gradient-to-r from-blue-500 to-cyan-400 overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/api/placeholder/800/200')" }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/80 to-cyan-500/80"></div>
        </div>

        {/* Profile Section */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="flex items-end justify-between max-w-6xl mx-auto">
            <div className="flex items-end space-x-4">
              <div className="relative">
                <img
                  src={profileData.profileImage}
                  alt="Profile"
                  className="w-20 h-20 rounded-full border-4 border-white shadow-lg"
                />
              </div>
              <div className="text-white mb-2">
                <h1 className="text-2xl font-bold">{profileData.name}</h1>
                <p className="text-blue-100">{profileData.title}</p>
              </div>
            </div>
            <button className="bg-white text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2 mb-2">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <span>Download CV</span>
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6">
          <nav className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto p-6">
        {activeTab === "Skills & Experience" && (
          <div className="space-y-8">
            {/* Skills Section */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Skills
              </h2>
              <div className="flex flex-wrap gap-2">
                {profileData.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Certifications Section */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Certifications
              </h2>
              <div className="flex flex-wrap gap-2">
                {profileData.certifications.map((cert, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                  >
                    {cert}
                  </span>
                ))}
              </div>
            </div>

            {/* Experience Section */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">
                  Experience
                </h2>
                <button className="text-blue-600 text-sm hover:text-blue-800">
                  export experience
                </button>
              </div>
              <div className="space-y-6">
                {profileData.experience.map((exp) => (
                  <div key={exp.id} className="relative pl-8">
                    <div className="absolute left-0 top-0 w-3 h-3 bg-blue-500 rounded-full"></div>
                    <div className="absolute left-1.5 top-3 w-0.5 h-full bg-gray-200"></div>
                    <div className="bg-white">
                      <div className="text-sm text-gray-600 mb-1">
                        {exp.duration}
                      </div>
                      <h3 className="font-semibold text-blue-600 hover:text-blue-800 cursor-pointer">
                        {exp.title}
                      </h3>
                      <div className="text-gray-700 font-medium mb-2">
                        {exp.company}
                      </div>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {exp.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Subscribed Courses Section */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-1">
                Subscribed Courses{" "}
                <span className="text-blue-600 font-bold">12</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
                {profileData.courses.map((course, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg border border-gray-200 p-4"
                  >
                    <h3 className="font-medium text-gray-900 text-sm mb-2">
                      {course.title}
                    </h3>
                    <p className="text-xs text-gray-500">
                      Subscribed on: {course.date}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Mentors Section */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-1">
                Mentors Engaged{" "}
                <span className="text-blue-600 font-bold">4</span>
              </h2>
              <div className="flex space-x-4 mt-4">
                {profileData.mentors.map((mentor, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <img
                      src={mentor.avatar}
                      alt={mentor.name}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <div className="font-medium text-gray-900 text-sm">
                        {mentor.name}
                      </div>
                      <div className="text-xs text-gray-500">
                        {mentor.specialty}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Applications Table */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search Job"
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm w-64"
                    />
                    <svg
                      className="w-4 h-4 absolute left-3 top-3 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>
                  <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm">
                    <option>Status</option>
                    <option>In Process</option>
                    <option>Completed</option>
                  </select>
                </div>
              </div>

              {/* Table */}
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Job Title
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Company
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Remote Policy
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Applied On
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {profileData.applications.map((app, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {app.title}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {app.company}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {app.remotePolicy}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {app.appliedOn}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
                            {app.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <span>Rows per page</span>
                  <select className="border border-gray-300 rounded px-2 py-1">
                    <option>10</option>
                    <option>25</option>
                    <option>50</option>
                  </select>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500">1 - 10 of 105</span>
                  <div className="flex space-x-1">
                    {[1, 2, 3, 4, 5].map((page) => (
                      <button
                        key={page}
                        className={`w-8 h-8 text-sm rounded ${
                          page === 1
                            ? "bg-blue-500 text-white"
                            : "text-gray-500 hover:bg-gray-100"
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "Education" && (
          <div className="py-8 text-center text-gray-500">
            Education content would go here
          </div>
        )}

        {activeTab === "About" && (
          <div className="py-8 text-center text-gray-500">
            About content would go here
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileDashboard;
