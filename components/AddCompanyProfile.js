import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import {
  Bold,
  Italic,
  Underline,
  List,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Link,
  Image,
  FileText,
  Paperclip,
  X,
  Upload,
} from "lucide-react";

const AddCompanyProfile = () => {
  const [activeTab, setActiveTab] = useState("account");

  const tabs = [
    { key: "account", label: "Account Details" },
    { key: "profile", label: "Profile" },
    { key: "cyber", label: "Cyber Profile" },
  ];

  const renderActiveForm = () => {
    switch (activeTab) {
      case "account":
        return <AccountDetailsTab />;
      case "profile":
        return <ProfileTab />;
      case "cyber":
        return <CyberProfileTab />;
      default:
        return <AccountDetailsTab />;
    }
  };

  return (
    <div className="w-full bg-white h-fit">
      <div className="mb-8">
        {/* Tab Navigation */}
        <div className="flex w-fit border border-[#E7E3E4] rounded-[4px] overflow-hidden">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`py-3 px-4 font-medium cursor-pointer border-r border-border last:border-r-0  text-sm transition-colors ${
                activeTab === tab.key
                  ? "text-black/80 bg-gray-200"
                  : "text-gray-500 bg-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Active Form */}
      {renderActiveForm()}
    </div>
  );
};

// Account Details Tab Component
const AccountDetailsTab = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    role: "",
    gender: "",
  });
  const [errors, setErrors] = useState({});
  const [dropdownStates, setDropdownStates] = useState({});
  const [profileImage, setProfileImage] = useState(null);
  const [bannerImage, setBannerImage] = useState(null);

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

  const handleInputChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const toggleDropdown = (name) => {
    setDropdownStates((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  const selectOption = (name, option) => {
    handleInputChange(name, option);
    setDropdownStates((prev) => ({ ...prev, [name]: false }));
  };

  const CustomSelect = ({ name, options, placeholder, error }) => {
    const isOpen = dropdownStates[name];
    const selectedValue = formData[name];

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

        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </div>
    );
  };

  const ImageUpload = ({ label, image, setImage, required = false }) => {
    const handleFileChange = (event) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => setImage(e.target.result);
        reader.readAsDataURL(file);
      }
    };

    return (
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        {!image ? (
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors cursor-pointer">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
              id={`upload-${label}`}
            />
            <label htmlFor={`upload-${label}`} className="cursor-pointer">
              <Upload className="mx-auto text-gray-400 mb-4" size={48} />
              <p className="text-gray-600">
                <span className="text-blue-600 font-medium">Upload a file</span>{" "}
                or drag and drop
              </p>
              <p className="text-gray-400 text-sm mt-1">
                PNG, JPG, GIF up to 5MB
              </p>
            </label>
          </div>
        ) : (
          <div className="relative inline-block">
            <img
              src={image}
              alt="Preview"
              className="w-32 h-32 object-cover rounded-lg border-2 border-gray-300"
            />
            <button
              type="button"
              onClick={() => setImage(null)}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
            >
              <X size={16} />
            </button>
          </div>
        )}
      </div>
    );
  };

  const handleSubmit = () => {
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = "First name is required";
    if (!formData.lastName) newErrors.lastName = "Last name is required";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log("Account Details:", formData);
    }
  };

  return (
    <div className="space-y-6">
      {/* Image Uploads */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ImageUpload
          label="Profile Picture"
          image={profileImage}
          setImage={setProfileImage}
          required={true}
        />
        <ImageUpload
          label="Banner Image"
          image={bannerImage}
          setImage={setBannerImage}
          required={true}
        />
      </div>

      {/* Name Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            First Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="Enter first name"
            value={formData.firstName}
            onChange={(e) => handleInputChange("firstName", e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          />
          {errors.firstName && (
            <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Last Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="Enter last name"
            value={formData.lastName}
            onChange={(e) => handleInputChange("lastName", e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          />
          {errors.lastName && (
            <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
          )}
        </div>
      </div>

      {/* Role within company */}
      <div className="w-full">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Role within the company
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <CustomSelect
            name="role"
            options={locationOptions}
            placeholder="Select location"
            error={errors.role}
          />
        </div>
      </div>

      {/* Gender */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Gender
        </label>
        <div className="flex space-x-4">
          {["Male", "Female", "Prefer not to say"].map((option) => (
            <label key={option} className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="gender"
                value={option.toLowerCase().replace(/\s+/g, "-")}
                checked={
                  formData.gender === option.toLowerCase().replace(/\s+/g, "-")
                }
                onChange={(e) => handleInputChange("gender", e.target.value)}
                className="mr-2"
              />
              {option}
            </label>
          ))}
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
          type="button"
          onClick={handleSubmit}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

// Profile Tab Component
const ProfileTab = () => {
  const [formData, setFormData] = useState({
    companyName: "",
    companyEmail: "",
    companyWebsite: "",
    headquarters: "",
    founded: "",
    companySize: "",
    industry: "",
    facebook: "",
    linkedin: "",
    instagram: "",
    twitter: "",
    glassdoor: "",
  });
  const [errors, setErrors] = useState({});
  const [dropdownStates, setDropdownStates] = useState({});

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

  const industryOptions = [
    "Technology",
    "Healthcare",
    "Finance",
    "Education",
    "Manufacturing",
    "Retail",
    "Real Estate",
    "Transportation",
    "Entertainment",
    "Consulting",
  ];

  const companySizeOptions = [
    "1-10 employees",
    "11-50 employees",
    "51-200 employees",
    "201-500 employees",
    "501-1000 employees",
    "1000+ employees",
  ];

  const handleInputChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const toggleDropdown = (name) => {
    setDropdownStates((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  const selectOption = (name, option) => {
    handleInputChange(name, option);
    setDropdownStates((prev) => ({ ...prev, [name]: false }));
  };

  const CustomSelect = ({ name, options, placeholder, error }) => {
    const isOpen = dropdownStates[name];
    const selectedValue = formData[name];

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

        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </div>
    );
  };

  const handleSubmit = () => {
    const newErrors = {};
    if (!formData.companyName)
      newErrors.companyName = "Company name is required";
    if (!formData.companyEmail)
      newErrors.companyEmail = "Company email is required";
    if (!formData.headquarters)
      newErrors.headquarters = "Headquarters is required";
    if (!formData.founded) newErrors.founded = "Founded year is required";
    if (!formData.companySize)
      newErrors.companySize = "Company size is required";
    if (!formData.industry) newErrors.industry = "Industry is required";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log("Profile Data:", formData);
    }
  };

  return (
    <div className="space-y-8">
      <h2 className="text-xl font-semibold text-gray-800">General</h2>

      <div className="space-y-6">
        {/* Company Details Row 1 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Company Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter company name"
              value={formData.companyName}
              onChange={(e) => handleInputChange("companyName", e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
            {errors.companyName && (
              <p className="text-red-500 text-sm mt-1">{errors.companyName}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Company Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              placeholder="Enter company email"
              value={formData.companyEmail}
              onChange={(e) =>
                handleInputChange("companyEmail", e.target.value)
              }
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
            {errors.companyEmail && (
              <p className="text-red-500 text-sm mt-1">{errors.companyEmail}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Company Website Link
            </label>
            <input
              type="url"
              placeholder="Enter company URL link"
              value={formData.companyWebsite}
              onChange={(e) =>
                handleInputChange("companyWebsite", e.target.value)
              }
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>
        </div>

        {/* Company Details Row 2 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Headquarters <span className="text-red-500">*</span>
            </label>
            <CustomSelect
              name="headquarters"
              options={locationOptions}
              placeholder="Search"
              error={errors.headquarters}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Founded <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Year"
              value={formData.founded}
              onChange={(e) => handleInputChange("founded", e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
            {errors.founded && (
              <p className="text-red-500 text-sm mt-1">{errors.founded}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Company size <span className="text-red-500">*</span>
            </label>
            <CustomSelect
              name="companySize"
              options={companySizeOptions}
              placeholder="Select your company size"
              error={errors.companySize}
            />
          </div>
        </div>

        {/* Industry */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Industry <span className="text-red-500">*</span>
            </label>
            <CustomSelect
              name="industry"
              options={industryOptions}
              placeholder="Select your industry"
              error={errors.industry}
            />
          </div>
        </div>

        {/* Social Section */}
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-gray-800">Social</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Facebook
              </label>
              <input
                type="text"
                placeholder="Facebook"
                value={formData.facebook}
                onChange={(e) => handleInputChange("facebook", e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                LinkedIn
              </label>
              <input
                type="text"
                placeholder="LinkedIn"
                value={formData.linkedin}
                onChange={(e) => handleInputChange("linkedin", e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Instagram
              </label>
              <input
                type="text"
                placeholder="Instagram"
                value={formData.instagram}
                onChange={(e) => handleInputChange("instagram", e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                X/Twitter
              </label>
              <input
                type="text"
                placeholder="X/Twitter"
                value={formData.twitter}
                onChange={(e) => handleInputChange("twitter", e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Glassdoor
              </label>
              <input
                type="text"
                placeholder="Glassdoor"
                value={formData.glassdoor}
                onChange={(e) => handleInputChange("glassdoor", e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>
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
            type="button"
            onClick={handleSubmit}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

// Cyber Profile Tab Component
const CyberProfileTab = () => {
  const [formData, setFormData] = useState({
    companyTagline: "",
    about: "",
  });
  const [editorContent, setEditorContent] = useState("");

  const handleInputChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const ToolbarButton = ({ icon: Icon, onClick, isActive = false, title }) => (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className={`p-2 rounded hover:bg-gray-100 ${
        isActive ? "bg-gray-200" : ""
      }`}
    >
      <Icon size={16} />
    </button>
  );

  const handleSubmit = () => {
    console.log("Cyber Profile Data:", {
      ...formData,
      about: editorContent,
    });
  };

  return (
    <div className="space-y-8">
      <h2 className="text-xl font-semibold text-gray-800">Profile Detail</h2>

      <div className="space-y-6">
        {/* Company Tagline */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Company Tagline
          </label>
          <input
            type="text"
            placeholder="Enter company tagline"
            value={formData.companyTagline}
            onChange={(e) =>
              handleInputChange("companyTagline", e.target.value)
            }
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          />
        </div>

        {/* About Section with Rich Text Editor */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            About
          </label>

          {/* Toolbar */}
          <div className="border border-gray-300 rounded-t-lg bg-gray-50 px-3 py-2 flex items-center space-x-1 flex-wrap">
            <select className="text-sm border-none bg-transparent outline-none">
              <option>Heading</option>
              <option>Subheading</option>
              <option>Normal</option>
            </select>

            <div className="w-px h-6 bg-gray-300 mx-2"></div>

            <ToolbarButton icon={Bold} title="Bold" />
            <ToolbarButton icon={Italic} title="Italic" />
            <ToolbarButton icon={Underline} title="Underline" />

            <div className="w-px h-6 bg-gray-300 mx-2"></div>

            <ToolbarButton icon={List} title="List" />

            <div className="w-px h-6 bg-gray-300 mx-2"></div>

            <ToolbarButton icon={AlignLeft} title="Align Left" />
            <ToolbarButton icon={AlignCenter} title="Align Center" />
            <ToolbarButton icon={AlignRight} title="Align Right" />

            <div className="w-px h-6 bg-gray-300 mx-2"></div>

            <ToolbarButton icon={Link} title="Insert Link" />
            <ToolbarButton icon={Image} title="Insert Image" />
            <ToolbarButton icon={FileText} title="Insert File" />
            <ToolbarButton icon={Paperclip} title="Attach File" />
          </div>

          {/* Editor Content Area */}
          <textarea
            placeholder="Enter Text Here..."
            value={editorContent}
            onChange={(e) => setEditorContent(e.target.value)}
            className="w-full h-64 p-3 border-l border-r border-b border-gray-300 rounded-b-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
          />
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
            type="button"
            onClick={handleSubmit}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddCompanyProfile;
