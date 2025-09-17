// "use client";
// import React, { useState } from "react";
// import { useForm } from "react-hook-form";
// import { useDispatch } from "react-redux";
// import { useRouter } from "next/navigation";
// import { IoIosArrowDown } from "react-icons/io";
// import {
//   Bold,
//   Italic,
//   Underline,
//   List,
//   AlignLeft,
//   AlignCenter,
//   AlignRight,
//   Link,
//   Image,
//   FileText,
//   Paperclip,
//   X,
//   Upload,
// } from "lucide-react";
// import { asyncCreateCompany } from "@/store/actions/companyAction";

// const AddCompanyProfile = () => {
//   const form = useForm();
//   const [activeTab, setActiveTab] = useState("account");
//   const dispatch = useDispatch();
//   const router = useRouter();

//   const [files, setFiles] = useState({
//     profilePicture: null,
//     bannerImage: null,
//   });

//   const tabs = [
//     { key: "account", label: "Account Details" },
//     { key: "profile", label: "Profile" },
//     { key: "cyber", label: "Cyber Profile" },
//   ];

//   const renderActiveForm = () => {
//     switch (activeTab) {
//       case "account":
//         return (
//           <AccountDetailsForm form={form} files={files} setFiles={setFiles} />
//         );
//       case "profile":
//         return <ProfileForm form={form} files={files} setFiles={setFiles} />;
//       case "cyber":
//         return (
//           <CyberProfileForm form={form} files={files} setFiles={setFiles} />
//         );
//       default:
//         return (
//           <AccountDetailsForm form={form} files={files} setFiles={setFiles} />
//         );
//     }
//   };

//   const handleFinalSubmit = (e) => {
//     e.preventDefault();
//     const values = form.getValues();
//     const formData = new FormData();

//     // Append fields, handle arrays appropriately
//     Object.entries(values).forEach(([key, value]) => {
//       if (Array.isArray(value)) {
//         value.forEach((val) => formData.append(`${key}[]`, val));
//       } else if (value !== undefined && value !== null) {
//         formData.append(key, value);
//       }
//     });

//     // Append files
//     if (files.profilePicture)
//       formData.append("profilePicture", files.profilePicture);
//     if (files.bannerImage) formData.append("bannerImage", files.bannerImage);

//     dispatch(asyncCreateCompany(formData)); // Replace with your action
//     console.log("Final submission:", Object.fromEntries(formData));
//     router.push("/dashboard/companies"); // Replace with your route
//   };

//   return (
//     <div className="w-full bg-white h-fit">
//       <div className="mb-8">
//         {/* Tab Navigation */}
//         <div className="flex w-fit border border-[#E7E3E4] rounded-[4px] overflow-hidden">
//           {tabs.map((tab) => (
//             <button
//               key={tab.key}
//               onClick={() => setActiveTab(tab.key)}
//               className={`py-3 px-4 font-medium cursor-pointer border-r border-border last:border-r-0  text-sm transition-colors ${
//                 activeTab === tab.key
//                   ? "text-black/80 bg-gray-200"
//                   : "text-gray-500 bg-white"
//               }`}
//             >
//               {tab.label}
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* Active Form */}
//       {renderActiveForm()}

//       {/* Navigation Buttons */}
//       <div className="flex justify-between items-center pt-6">
//         <div>
//           {/* Previous Button */}
//           {activeTab !== "account" && (
//             <button
//               type="button"
//               onClick={() => {
//                 const currentIndex = tabs.findIndex(
//                   (tab) => tab.key === activeTab
//                 );
//                 if (currentIndex > 0) {
//                   setActiveTab(tabs[currentIndex - 1].key);
//                 }
//               }}
//               className="px-6 py-2 border border-gray-300 text-gray-600 rounded hover:bg-gray-50"
//             >
//               Previous
//             </button>
//           )}
//         </div>

//         <div className="flex space-x-4">
//           {activeTab === "cyber" ? (
//             // Final Submit Buttons - Only show on last tab
//             <>
//               <button
//                 type="button"
//                 className="px-6 py-2 border border-gray-300 text-gray-600 rounded hover:bg-gray-50"
//                 onClick={() => form.reset()}
//               >
//                 Discard
//               </button>
//               <button
//                 type="button"
//                 onClick={handleFinalSubmit}
//                 className="px-6 py-2 bg-blue-600 rounded text-white hover:bg-blue-700"
//               >
//                 Save
//               </button>
//             </>
//           ) : (
//             // Next Button - Show on all tabs except last
//             <button
//               type="button"
//               onClick={() => {
//                 const currentIndex = tabs.findIndex(
//                   (tab) => tab.key === activeTab
//                 );
//                 if (currentIndex < tabs.length - 1) {
//                   setActiveTab(tabs[currentIndex + 1].key);
//                 }
//               }}
//               className="px-6 py-2 bg-blue-600 rounded text-white hover:bg-blue-700"
//             >
//               Next
//             </button>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddCompanyProfile;

// // Account Details Form Component
// const AccountDetailsForm = ({ form, files, setFiles }) => {
//   const [errors, setErrors] = useState({});
//   const [dropdownStates, setDropdownStates] = useState({});

//   const locationOptions = [
//     "New York",
//     "London",
//     "Tokyo",
//     "Paris",
//     "Sydney",
//     "Mumbai",
//     "Berlin",
//     "Toronto",
//     "Singapore",
//     "Dubai",
//   ];

//   const roleOptions = ["Founder", "Co Founder", "Hr"];

//   const toggleDropdown = (name) => {
//     setDropdownStates((prev) => ({
//       ...prev,
//       [name]: !prev[name],
//     }));
//   };

//   const selectOption = (name, option) => {
//     form.setValue(name, option);
//     setDropdownStates((prev) => ({ ...prev, [name]: false }));
//   };

//   const CustomSelect = ({ name, options, placeholder, error, ...register }) => {
//     const isOpen = dropdownStates[name];
//     const selectedValue = form.watch(name) || "";

//     return (
//       <div className="relative">
//         <input type="hidden" {...register} />
//         <div
//           onClick={() => toggleDropdown(name)}
//           className={`w-full text-[#6F6F6F] cursor-pointer text-[14px] font-normal p-[14px_16px] border border-[#ECECEC] ${
//             isOpen ? "rounded-t-[8px] border-b-0" : "rounded-[8px]"
//           } outline-none flex justify-between items-center bg-white`}
//         >
//           <span className={selectedValue ? "text-[#333]" : "text-[#999]"}>
//             {selectedValue || placeholder}
//           </span>
//           <IoIosArrowDown
//             className={`text-2xl text-[#6F6F6F] transition-transform ${
//               isOpen ? "rotate-180" : ""
//             }`}
//           />
//         </div>

//         {isOpen && (
//           <div className="absolute top-full left-0 right-0 bg-white border border-[#ECECEC] shadow-lg z-10 max-h-[200px] overflow-y-auto">
//             <div className="bg-[#4472C4] text-white px-4 flex items-center h-[40px] text-[14px] font-medium">
//               {placeholder}
//             </div>
//             {options.map((option, index) => (
//               <div
//                 key={index}
//                 onClick={() => selectOption(name, option)}
//                 className="px-4 flex items-center h-[40px] text-[14px] text-[#333] hover:bg-[#f5f5f5] cursor-pointer border-b border-[#f0f0f0] last:border-b-0"
//               >
//                 {option}
//               </div>
//             ))}
//           </div>
//         )}

//         {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
//       </div>
//     );
//   };

//   const ImageUpload = ({ label, type, required = false }) => {
//     const image = files[type];
//     const [preview, setPreview] = useState(null);

//     const handleFileChange = (event) => {
//       const file = event.target.files[0];
//       if (file) {
//         setFiles((prev) => ({ ...prev, [type]: file }));

//         // Create preview URL
//         const reader = new FileReader();
//         reader.onload = (e) => setPreview(e.target.result);
//         reader.readAsDataURL(file);
//       }
//     };

//     const handleRemove = () => {
//       setFiles((prev) => ({ ...prev, [type]: null }));
//       setPreview(null);
//       // Clear the input
//       const input = document.getElementById(`upload-${type}`);
//       if (input) input.value = "";
//     };

//     return (
//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-2">
//           {label} {required && <span className="text-red-500">*</span>}
//         </label>
//         {!image ? (
//           <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors cursor-pointer">
//             <input
//               type="file"
//               accept="image/*"
//               onChange={handleFileChange}
//               className="hidden"
//               id={`upload-${type}`}
//             />
//             <label htmlFor={`upload-${type}`} className="cursor-pointer">
//               <Upload className="mx-auto text-gray-400 mb-4" size={48} />
//               <p className="text-gray-600">
//                 <span className="text-blue-600 font-medium">Upload a file</span>{" "}
//                 or drag and drop
//               </p>
//               <p className="text-gray-400 text-sm mt-1">
//                 PNG, JPG, GIF up to 5MB
//               </p>
//             </label>
//           </div>
//         ) : (
//           <div className="relative inline-block">
//             <img
//               src={
//                 preview ||
//                 (typeof image === "string" ? image : URL.createObjectURL(image))
//               }
//               alt="Preview"
//               className="w-32 h-32 object-cover rounded-lg border-2 border-gray-300"
//             />
//             <button
//               type="button"
//               onClick={handleRemove}
//               className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
//             >
//               <X size={16} />
//             </button>
//           </div>
//         )}
//       </div>
//     );
//   };

//   return (
//     <div className="space-y-6">
//       {/* Image Uploads */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <ImageUpload
//           label="Profile Picture"
//           type="profilePicture"
//           required={true}
//         />
//         <ImageUpload label="Banner Image" type="bannerImage" required={true} />
//       </div>

//       {/* Name Fields */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             First Name <span className="text-red-500">*</span>
//           </label>
//           <input
//             type="text"
//             placeholder="Enter first name"
//             {...form.register("firstName", {
//               required: "First name is required",
//             })}
//             className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
//           />
//           {form.formState.errors.firstName && (
//             <p className="text-red-500 text-sm mt-1">
//               {form.formState.errors.firstName.message}
//             </p>
//           )}
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Last Name <span className="text-red-500">*</span>
//           </label>
//           <input
//             type="text"
//             placeholder="Enter last name"
//             {...form.register("lastName", {
//               required: "Last name is required",
//             })}
//             className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
//           />
//           {form.formState.errors.lastName && (
//             <p className="text-red-500 text-sm mt-1">
//               {form.formState.errors.lastName.message}
//             </p>
//           )}
//         </div>
//       </div>

//       {/* Role within company */}
//       <div className="w-full">
//         <label className="block text-sm font-medium text-gray-700 mb-2">
//           Role within the company
//         </label>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <CustomSelect
//             name="role"
//             options={roleOptions}
//             placeholder="Select Role"
//             {...form.register("role")}
//           />
//         </div>
//       </div>

//       {/* Gender */}
//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-2">
//           Gender
//         </label>
//         <div className="flex space-x-4">
//           {["Male", "Female", "Prefer not to say"].map((option) => (
//             <label key={option} className="flex items-center cursor-pointer">
//               <input
//                 type="radio"
//                 value={option.toLowerCase().replace(/\s+/g, "-")}
//                 {...form.register("gender")}
//                 className="mr-2"
//               />
//               {option}
//             </label>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// // Profile Form Component
// const ProfileForm = ({ form, files, setFiles }) => {
//   const [dropdownStates, setDropdownStates] = useState({});

//   const locationOptions = [
//     "New York",
//     "London",
//     "Tokyo",
//     "Paris",
//     "Sydney",
//     "Mumbai",
//     "Berlin",
//     "Toronto",
//     "Singapore",
//     "Dubai",
//   ];

//   const industryOptions = [
//     "Technology",
//     "Healthcare",
//     "Finance",
//     "Education",
//     "Manufacturing",
//     "Retail",
//     "Real Estate",
//     "Transportation",
//     "Entertainment",
//     "Consulting",
//   ];

//   const companySizeOptions = [
//     "1-10 employees",
//     "11-50 employees",
//     "51-200 employees",
//     "201-500 employees",
//     "501-1000 employees",
//     "1000+ employees",
//   ];

//   const toggleDropdown = (name) => {
//     setDropdownStates((prev) => ({
//       ...prev,
//       [name]: !prev[name],
//     }));
//   };

//   const selectOption = (name, option) => {
//     form.setValue(name, option);
//     setDropdownStates((prev) => ({ ...prev, [name]: false }));
//   };

//   const CustomSelect = ({ name, options, placeholder, error, ...register }) => {
//     const isOpen = dropdownStates[name];
//     const selectedValue = form.watch(name) || "";

//     return (
//       <div className="relative">
//         <input type="hidden" {...register} />
//         <div
//           onClick={() => toggleDropdown(name)}
//           className={`w-full text-[#6F6F6F] cursor-pointer text-[14px] font-normal p-[14px_16px] border border-[#ECECEC] ${
//             isOpen ? "rounded-t-[8px] border-b-0" : "rounded-[8px]"
//           } outline-none flex justify-between items-center bg-white`}
//         >
//           <span className={selectedValue ? "text-[#333]" : "text-[#999]"}>
//             {selectedValue || placeholder}
//           </span>
//           <IoIosArrowDown
//             className={`text-2xl text-[#6F6F6F] transition-transform ${
//               isOpen ? "rotate-180" : ""
//             }`}
//           />
//         </div>

//         {isOpen && (
//           <div className="absolute top-full left-0 right-0 bg-white border border-[#ECECEC] shadow-lg z-10 max-h-[200px] overflow-y-auto">
//             <div className="bg-[#4472C4] text-white px-4 flex items-center h-[40px] text-[14px] font-medium">
//               {placeholder}
//             </div>
//             {options.map((option, index) => (
//               <div
//                 key={index}
//                 onClick={() => selectOption(name, option)}
//                 className="px-4 flex items-center h-[40px] text-[14px] text-[#333] hover:bg-[#f5f5f5] cursor-pointer border-b border-[#f0f0f0] last:border-b-0"
//               >
//                 {option}
//               </div>
//             ))}
//           </div>
//         )}

//         {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
//       </div>
//     );
//   };

//   return (
//     <div className="space-y-8">
//       <h2 className="text-xl font-semibold text-gray-800">General</h2>

//       <div className="space-y-6">
//         {/* Company Details Row 1 */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Company Name <span className="text-red-500">*</span>
//             </label>
//             <input
//               type="text"
//               placeholder="Enter company name"
//               {...form.register("companyName", {
//                 required: "Company name is required",
//               })}
//               className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
//             />
//             {form.formState.errors.companyName && (
//               <p className="text-red-500 text-sm mt-1">
//                 {form.formState.errors.companyName.message}
//               </p>
//             )}
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Company Email <span className="text-red-500">*</span>
//             </label>
//             <input
//               type="email"
//               placeholder="Enter company email"
//               {...form.register("companyEmail", {
//                 required: "Company email is required",
//               })}
//               className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
//             />
//             {form.formState.errors.companyEmail && (
//               <p className="text-red-500 text-sm mt-1">
//                 {form.formState.errors.companyEmail.message}
//               </p>
//             )}
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Company Website Link
//             </label>
//             <input
//               type="url"
//               placeholder="Enter company URL link"
//               {...form.register("companyWebsite")}
//               className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
//             />
//           </div>
//         </div>

//         {/* Company Details Row 2 */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Headquarters <span className="text-red-500">*</span>
//             </label>
//             <CustomSelect
//               name="headquarters"
//               options={locationOptions}
//               placeholder="Search"
//               {...form.register("headquarters", {
//                 required: "Headquarters is required",
//               })}
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Founded <span className="text-red-500">*</span>
//             </label>
//             <input
//               type="text"
//               placeholder="Year"
//               {...form.register("founded", {
//                 required: "Founded year is required",
//               })}
//               className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
//             />
//             {form.formState.errors.founded && (
//               <p className="text-red-500 text-sm mt-1">
//                 {form.formState.errors.founded.message}
//               </p>
//             )}
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Company size <span className="text-red-500">*</span>
//             </label>
//             <CustomSelect
//               name="companySize"
//               options={companySizeOptions}
//               placeholder="Select your company size"
//               {...form.register("companySize", {
//                 required: "Company size is required",
//               })}
//             />
//           </div>
//         </div>

//         {/* Industry */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Industry <span className="text-red-500">*</span>
//             </label>
//             <CustomSelect
//               name="industry"
//               options={industryOptions}
//               placeholder="Select your industry"
//               {...form.register("industry", {
//                 required: "Industry is required",
//               })}
//             />
//           </div>
//         </div>

//         {/* Social Section */}
//         <div className="space-y-6">
//           <h3 className="text-lg font-semibold text-gray-800">Social</h3>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Facebook
//               </label>
//               <input
//                 type="text"
//                 placeholder="Facebook"
//                 {...form.register("facebook")}
//                 className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 LinkedIn
//               </label>
//               <input
//                 type="text"
//                 placeholder="LinkedIn"
//                 {...form.register("linkedin")}
//                 className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Instagram
//               </label>
//               <input
//                 type="text"
//                 placeholder="Instagram"
//                 {...form.register("instagram")}
//                 className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 X/Twitter
//               </label>
//               <input
//                 type="text"
//                 placeholder="X/Twitter"
//                 {...form.register("twitter")}
//                 className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Glassdoor
//               </label>
//               <input
//                 type="text"
//                 placeholder="Glassdoor"
//                 {...form.register("glassdoor")}
//                 className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Cyber Profile Form Component
// const CyberProfileForm = ({ form, files, setFiles }) => {
//   const ToolbarButton = ({ icon: Icon, onClick, isActive = false, title }) => (
//     <button
//       type="button"
//       onClick={onClick}
//       title={title}
//       className={`p-2 rounded hover:bg-gray-100 ${
//         isActive ? "bg-gray-200" : ""
//       }`}
//     >
//       <Icon size={16} />
//     </button>
//   );

//   return (
//     <div className="space-y-8">
//       <h2 className="text-xl font-semibold text-gray-800">Profile Detail</h2>

//       <div className="space-y-6">
//         {/* Company Tagline */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Company Tagline
//           </label>
//           <input
//             type="text"
//             placeholder="Enter company tagline"
//             {...form.register("companyTagline")}
//             className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
//           />
//         </div>

//         {/* About Section with Rich Text Editor */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             About
//           </label>

//           {/* Toolbar */}
//           <div className="border border-gray-300 rounded-t-lg bg-gray-50 px-3 py-2 flex items-center space-x-1 flex-wrap">
//             <select className="text-sm border-none bg-transparent outline-none">
//               <option>Heading</option>
//               <option>Subheading</option>
//               <option>Normal</option>
//             </select>

//             <div className="w-px h-6 bg-gray-300 mx-2"></div>

//             <ToolbarButton icon={Bold} title="Bold" />
//             <ToolbarButton icon={Italic} title="Italic" />
//             <ToolbarButton icon={Underline} title="Underline" />

//             <div className="w-px h-6 bg-gray-300 mx-2"></div>

//             <ToolbarButton icon={List} title="List" />

//             <div className="w-px h-6 bg-gray-300 mx-2"></div>

//             <ToolbarButton icon={AlignLeft} title="Align Left" />
//             <ToolbarButton icon={AlignCenter} title="Align Center" />
//             <ToolbarButton icon={AlignRight} title="Align Right" />

//             <div className="w-px h-6 bg-gray-300 mx-2"></div>

//             <ToolbarButton icon={Link} title="Insert Link" />
//             <ToolbarButton icon={Image} title="Insert Image" />
//             <ToolbarButton icon={FileText} title="Insert File" />
//             <ToolbarButton icon={Paperclip} title="Attach File" />
//           </div>

//           {/* Editor Content Area */}
//           <textarea
//             placeholder="Enter Text Here..."
//             {...form.register("about")}
//             className="w-full h-64 p-3 border-l border-r border-b border-gray-300 rounded-b-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
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
import { asyncCreateCompany } from "@/store/actions/companyAction";

const AddCompanyProfile = () => {
  const form = useForm({
    mode: "onChange", // Validate on change for better UX
    defaultValues: {
      firstName: "",
      lastName: "",
      role: "",
      gender: "",
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
      companyTagline: "",
      about: "",
    },
  });

  const [activeTab, setActiveTab] = useState("account");
  const dispatch = useDispatch();
  const router = useRouter();
  const [files, setFiles] = useState({
    profilePicture: null,
    bannerImage: null,
  });

  const tabs = [
    { key: "account", label: "Account Details" },
    { key: "profile", label: "Profile" },
    { key: "cyber", label: "Cyber Profile" },
  ];

  // Define fields for each step
  const stepFields = {
    account: ["firstName", "lastName", "role"],
    profile: [
      "companyName",
      "companyEmail",
      "headquarters",
      "founded",
      "companySize",
      "industry",
    ],
    cyber: ["companyTagline", "about"],
  };

  // Validate current step
  const validateCurrentStep = async () => {
    const fieldsToValidate = stepFields[activeTab];
    const isValid = await form.trigger(fieldsToValidate);

    // Additional file validation for account step
    if (activeTab === "account") {
      let fileValidationPassed = true;

      if (!files.profilePicture) {
        form.setError("root.profilePicture", {
          type: "required",
          message: "Profile picture is required",
        });
        fileValidationPassed = false;
      } else {
        form.clearErrors("root.profilePicture");
      }

      if (!files.bannerImage) {
        form.setError("root.bannerImage", {
          type: "required",
          message: "Banner image is required",
        });
        fileValidationPassed = false;
      } else {
        form.clearErrors("root.bannerImage");
      }

      return isValid && fileValidationPassed;
    }

    return isValid;
  };

  // Handle next step with validation
  const handleNext = async () => {
    const isValid = await validateCurrentStep();

    if (isValid) {
      const currentIndex = tabs.findIndex((tab) => tab.key === activeTab);
      if (currentIndex < tabs.length - 1) {
        // Reset form state to clear validation errors for next step
        form.reset({ ...form.getValues() }, { keepValues: true });
        setActiveTab(tabs[currentIndex + 1].key);
      }
    }
  };

  // Handle previous step
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
        return <ProfileForm form={form} files={files} setFiles={setFiles} />;
      case "cyber":
        return (
          <CyberProfileForm form={form} files={files} setFiles={setFiles} />
        );
      default:
        return (
          <AccountDetailsForm form={form} files={files} setFiles={setFiles} />
        );
    }
  };

  const handleFinalSubmit = async (e) => {
    e.preventDefault();

    // Validate all fields before submission
    const isValid = await form.trigger();
    const isCurrentStepValid = await validateCurrentStep();

    if (!isValid || !isCurrentStepValid) {
      // Find first error and navigate to that step
      const errors = form.formState.errors;
      if (
        errors.firstName ||
        errors.lastName ||
        errors.role ||
        errors.root?.profilePicture ||
        errors.root?.bannerImage
      ) {
        setActiveTab("account");
      } else if (
        errors.companyName ||
        errors.companyEmail ||
        errors.headquarters ||
        errors.founded ||
        errors.companySize ||
        errors.industry
      ) {
        setActiveTab("profile");
      }
      return;
    }

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
    if (files.bannerImage) formData.append("bannerImage", files.bannerImage);

    dispatch(asyncCreateCompany(formData, "", router));
    console.log("Final submission:", Object.fromEntries(formData));
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
              className={`py-3 px-4 font-medium cursor-pointer border-r border-border last:border-r-0 text-sm transition-colors ${
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

      {/* Navigation Buttons */}
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
          {activeTab === "cyber" ? (
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
            // Next Button - Show on all tabs except last
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

// Account Details Form Component with Validation
const AccountDetailsForm = ({ form, files, setFiles }) => {
  const [dropdownStates, setDropdownStates] = useState({});
  const {
    formState: { errors },
  } = form;

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

  const roleOptions = ["Founder", "Co Founder", "Hr"];

  const toggleDropdown = (name) => {
    setDropdownStates((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  const selectOption = (name, option) => {
    form.setValue(name, option);
    form.trigger(name); // Trigger validation when value changes
    setDropdownStates((prev) => ({ ...prev, [name]: false }));
  };

  const CustomSelect = ({ name, options, placeholder, ...register }) => {
    const isOpen = dropdownStates[name];
    const selectedValue = form.watch(name) || "";
    const error = errors[name];

    return (
      <div className="relative">
        <input type="hidden" {...register} />
        <div
          onClick={() => toggleDropdown(name)}
          className={`w-full text-[#6F6F6F] cursor-pointer text-[14px] font-normal p-[14px_16px] border ${
            error ? "border-red-500" : "border-[#ECECEC]"
          } ${
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

        {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
      </div>
    );
  };

  const ImageUpload = ({ label, type, required = false }) => {
    const image = files[type];
    const [preview, setPreview] = useState(null);
    const error = errors.root?.[type];

    const handleFileChange = (event) => {
      const file = event.target.files[0];
      if (file) {
        // Validate file type
        const validTypes = [
          "image/jpeg",
          "image/jpg",
          "image/png",
          "image/gif",
        ];
        const maxSize = 5 * 1024 * 1024; // 5MB

        if (!validTypes.includes(file.type)) {
          form.setError(`root.${type}`, {
            type: "fileType",
            message: "Please upload a valid image file (JPG, PNG, GIF)",
          });
          return;
        }

        if (file.size > maxSize) {
          form.setError(`root.${type}`, {
            type: "fileSize",
            message: "File size must be less than 5MB",
          });
          return;
        }

        // Clear any existing errors
        form.clearErrors(`root.${type}`);

        setFiles((prev) => ({ ...prev, [type]: file }));

        // Create preview URL
        const reader = new FileReader();
        reader.onload = (e) => setPreview(e.target.result);
        reader.readAsDataURL(file);
      }
    };

    const handleRemove = () => {
      setFiles((prev) => ({ ...prev, [type]: null }));
      setPreview(null);
      // Clear the input
      const input = document.getElementById(`upload-${type}`);
      if (input) input.value = "";

      if (required) {
        form.setError(`root.${type}`, {
          type: "required",
          message: `${label} is required`,
        });
      }
    };

    return (
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        {!image ? (
          <div
            className={`border-2 border-dashed ${
              error ? "border-red-500" : "border-gray-300"
            } rounded-lg p-8 text-center hover:border-gray-400 transition-colors cursor-pointer`}
          >
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
              id={`upload-${type}`}
            />
            <label htmlFor={`upload-${type}`} className="cursor-pointer">
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
              src={
                preview ||
                (typeof image === "string" ? image : URL.createObjectURL(image))
              }
              alt="Preview"
              className="w-32 h-32 object-cover rounded-lg border-2 border-gray-300"
            />
            <button
              type="button"
              onClick={handleRemove}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
            >
              <X size={16} />
            </button>
          </div>
        )}
        {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Image Uploads */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ImageUpload
          label="Profile Picture"
          type="profilePicture"
          required={true}
        />
        <ImageUpload label="Banner Image" type="bannerImage" required={true} />
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
            {...form.register("firstName", {
              required: "First name is required",
              minLength: {
                value: 2,
                message: "First name must be at least 2 characters",
              },
              maxLength: {
                value: 50,
                message: "First name must be less than 50 characters",
              },
              pattern: {
                value: /^[A-Za-z\s]+$/,
                message: "First name can only contain letters and spaces",
              },
            })}
            className={`w-full p-3 border ${
              errors.firstName ? "border-red-500" : "border-gray-300"
            } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none`}
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
            {...form.register("lastName", {
              required: "Last name is required",
              minLength: {
                value: 2,
                message: "Last name must be at least 2 characters",
              },
              maxLength: {
                value: 50,
                message: "Last name must be less than 50 characters",
              },
              pattern: {
                value: /^[A-Za-z\s]+$/,
                message: "Last name can only contain letters and spaces",
              },
            })}
            className={`w-full p-3 border ${
              errors.lastName ? "border-red-500" : "border-gray-300"
            } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none`}
          />
          {errors.lastName && (
            <p className="text-red-500 text-sm mt-1">
              {errors.lastName.message}
            </p>
          )}
        </div>
      </div>

      {/* Role within company */}
      <div className="w-full">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Role within the company <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <CustomSelect
            name="role"
            options={roleOptions}
            placeholder="Select Role"
            {...form.register("role", {
              required: "Please select a role",
            })}
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
                value={option.toLowerCase().replace(/\s+/g, "-")}
                {...form.register("gender")}
                className="mr-2"
              />
              {option}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

// Profile Form Component with Validation
const ProfileForm = ({ form, files, setFiles }) => {
  const [dropdownStates, setDropdownStates] = useState({});
  const {
    formState: { errors },
  } = form;

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

  const toggleDropdown = (name) => {
    setDropdownStates((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  const selectOption = (name, option) => {
    form.setValue(name, option);
    form.trigger(name);
    setDropdownStates((prev) => ({ ...prev, [name]: false }));
  };

  const CustomSelect = ({ name, options, placeholder, ...register }) => {
    const isOpen = dropdownStates[name];
    const selectedValue = form.watch(name) || "";
    const error = errors[name];

    return (
      <div className="relative">
        <input type="hidden" {...register} />
        <div
          onClick={() => toggleDropdown(name)}
          className={`w-full text-[#6F6F6F] cursor-pointer text-[14px] font-normal p-[14px_16px] border ${
            error ? "border-red-500" : "border-[#ECECEC]"
          } ${
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

        {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
      </div>
    );
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
              {...form.register("companyName", {
                required: "Company name is required",
                minLength: {
                  value: 2,
                  message: "Company name must be at least 2 characters",
                },
                maxLength: {
                  value: 100,
                  message: "Company name must be less than 100 characters",
                },
              })}
              className={`w-full p-3 border ${
                errors.companyName ? "border-red-500" : "border-gray-300"
              } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none`}
            />
            {errors.companyName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.companyName.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Company Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              placeholder="Enter company email"
              {...form.register("companyEmail", {
                required: "Company email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Please enter a valid email address",
                },
              })}
              className={`w-full p-3 border ${
                errors.companyEmail ? "border-red-500" : "border-gray-300"
              } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none`}
            />
            {errors.companyEmail && (
              <p className="text-red-500 text-sm mt-1">
                {errors.companyEmail.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Company Website Link
            </label>
            <input
              type="url"
              placeholder="Enter company URL link"
              {...form.register("companyWebsite", {
                pattern: {
                  value:
                    /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
                  message: "Please enter a valid URL",
                },
              })}
              className={`w-full p-3 border ${
                errors.companyWebsite ? "border-red-500" : "border-gray-300"
              } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none`}
            />
            {errors.companyWebsite && (
              <p className="text-red-500 text-sm mt-1">
                {errors.companyWebsite.message}
              </p>
            )}
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
              {...form.register("headquarters", {
                required: "Please select headquarters location",
              })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Founded <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Year (e.g., 2020)"
              {...form.register("founded", {
                required: "Founded year is required",
                pattern: {
                  value: /^\d{4}$/,
                  message: "Please enter a valid year (YYYY format)",
                },
                validate: (value) => {
                  const year = parseInt(value);
                  const currentYear = new Date().getFullYear();
                  if (year < 1800 || year > currentYear) {
                    return `Year must be between 1800 and ${currentYear}`;
                  }
                  return true;
                },
              })}
              className={`w-full p-3 border ${
                errors.founded ? "border-red-500" : "border-gray-300"
              } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none`}
            />
            {errors.founded && (
              <p className="text-red-500 text-sm mt-1">
                {errors.founded.message}
              </p>
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
              {...form.register("companySize", {
                required: "Please select company size",
              })}
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
              {...form.register("industry", {
                required: "Please select an industry",
              })}
            />
          </div>
        </div>

        {/* Social Section */}
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-gray-800">Social</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                name: "facebook",
                label: "Facebook",
                pattern: /^https?:\/\/(www\.)?facebook\.com\/.+/,
              },
              {
                name: "linkedin",
                label: "LinkedIn",
                pattern: /^https?:\/\/(www\.)?linkedin\.com\/.+/,
              },
              {
                name: "instagram",
                label: "Instagram",
                pattern: /^https?:\/\/(www\.)?instagram\.com\/.+/,
              },
              {
                name: "twitter",
                label: "X/Twitter",
                pattern: /^https?:\/\/(www\.)?(twitter\.com|x\.com)\/.+/,
              },
              {
                name: "glassdoor",
                label: "Glassdoor",
                pattern: /^https?:\/\/(www\.)?glassdoor\.com\/.+/,
              },
            ].map(({ name, label, pattern }) => (
              <div key={name}>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {label}
                </label>
                <input
                  type="text"
                  placeholder={label}
                  {...form.register(name, {
                    pattern: {
                      value: pattern,
                      message: `Please enter a valid ${label} URL`,
                    },
                  })}
                  className={`w-full p-3 border ${
                    errors[name] ? "border-red-500" : "border-gray-300"
                  } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none`}
                />
                {errors[name] && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors[name].message}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Cyber Profile Form Component with Validation
const CyberProfileForm = ({ form, files, setFiles }) => {
  const {
    formState: { errors },
  } = form;

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
            {...form.register("companyTagline", {
              maxLength: {
                value: 200,
                message: "Tagline must be less than 200 characters",
              },
            })}
            className={`w-full p-3 border ${
              errors.companyTagline ? "border-red-500" : "border-gray-300"
            } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none`}
          />
          {errors.companyTagline && (
            <p className="text-red-500 text-sm mt-1">
              {errors.companyTagline.message}
            </p>
          )}
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
            {...form.register("about", {
              maxLength: {
                value: 2000,
                message: "About section must be less than 2000 characters",
              },
            })}
            className={`w-full h-64 p-3 border-l border-r border-b ${
              errors.about ? "border-red-500" : "border-gray-300"
            } rounded-b-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none`}
          />
          {errors.about && (
            <p className="text-red-500 text-sm mt-1">{errors.about.message}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddCompanyProfile;
