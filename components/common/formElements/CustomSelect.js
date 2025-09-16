import React, { useState, useRef, useEffect } from "react";
// import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";

const CustomSelect = ({
  options = [],
  value,
  onChange,
  placeholder = "Select an option",
  className = "",
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close dropdown when pressing Escape
  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscapeKey);
    return () => document.removeEventListener("keydown", handleEscapeKey);
  }, []);

  const handleToggle = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  const handleOptionClick = (optionValue) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  const getOptionValue = (option) => {
    return typeof option === "string" ? option : option.value;
  };

  const getOptionLabel = (option) => {
    return typeof option === "string" ? option : option.label;
  };

  const getDisplayValue = () => {
    if (!value) return placeholder;

    const selectedOption = options.find(
      (option) => getOptionValue(option) === value
    );
    return selectedOption ? getOptionLabel(selectedOption) : placeholder;
  };

  return (
    <div className={`relative ${className}`} ref={selectRef}>
      {/* Select trigger */}
      <div
        className={`
          bg-white border h-[42px] w-[140px] border-border rounded-[4px] px-4 py-2 
          outline-none cursor-pointer flex items-center gap-5 justify-between
          ${disabled ? "bg-gray-100 cursor-not-allowed opacity-60" : ""}
        
        `}
        onClick={handleToggle}
        tabIndex={disabled ? -1 : 0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleToggle();
          }
        }}
      >
        <span
          className={`${!value ? "text-gray-400" : "text-gray-900"} text-sm`}
        >
          {getDisplayValue()}
        </span>
        <IoIosArrowDown
          className={`text-icon transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </div>

      {/* Dropdown options */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-[4px] shadow-lg z-50 max-h-60 overflow-y-auto">
          {options.length === 0 ? (
            <div className="px-4 py-2 text-gray-500">No options available</div>
          ) : (
            options.map((option, index) => {
              const optionValue = getOptionValue(option);
              const optionLabel = getOptionLabel(option);
              const isSelected = value === optionValue;

              return (
                <div
                  key={index}
                  className={`
                    px-4 py-2 cursor-pointer transition-colors duration-150
                    ${
                      isSelected
                        ? "bg-blue-50 text-blue-900 font-medium"
                        : "text-gray-900 hover:bg-gray-50"
                    }
                  `}
                  onClick={() => handleOptionClick(optionValue)}
                  onMouseDown={(e) => e.preventDefault()} // Prevent blur before click
                >
                  {optionLabel}
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
};

// // Example usage component
// const ExampleUsage = () => {
//   const [statusFilter, setStatusFilter] = useState("All Users");
//   const [categoryFilter, setCategoryFilter] = useState("");
//   const [priorityFilter, setPriorityFilter] = useState("");

//   // Example with simple string array
//   const statusOptions = [
//     "All Users",
//     "Active",
//     "Inactive",
//     "Pending",
//     "Suspended",
//   ];

//   // Example with object array (value-label pairs)
//   const categoryOptions = [
//     { value: "tech", label: "Technology" },
//     { value: "business", label: "Business" },
//     { value: "design", label: "Design" },
//     { value: "marketing", label: "Marketing" },
//     { value: "sales", label: "Sales" },
//   ];

//   const priorityOptions = [
//     { value: "high", label: "🔴 High Priority" },
//     { value: "medium", label: "🟡 Medium Priority" },
//     { value: "low", label: "🟢 Low Priority" },
//   ];

//   return (
//     <div className="p-6 space-y-6 max-w-md">
//       <h2 className="text-xl font-semibold mb-4">
//         Custom Div-Based Select Examples
//       </h2>

//       {/* Example 1: Simple string array */}
//       <div>
//         <label className="block text-sm font-medium mb-2">Status Filter</label>
//         <CustomSelect
//           options={statusOptions}
//           value={statusFilter}
//           onChange={setStatusFilter}
//         />
//         <p className="text-xs text-gray-600 mt-1">Selected: {statusFilter}</p>
//       </div>

//       {/* Example 2: Object array with placeholder */}
//       <div>
//         <label className="block text-sm font-medium mb-2">
//           Category Filter
//         </label>
//         <CustomSelect
//           options={categoryOptions}
//           value={categoryFilter}
//           onChange={setCategoryFilter}
//           placeholder="Choose a category"
//         />
//         <p className="text-xs text-gray-600 mt-1">
//           Selected: {categoryFilter || "None"}
//         </p>
//       </div>

//       {/* Example 3: With emojis and custom styling */}
//       <div>
//         <label className="block text-sm font-medium mb-2">
//           Priority Filter
//         </label>
//         <CustomSelect
//           options={priorityOptions}
//           value={priorityFilter}
//           onChange={setPriorityFilter}
//           placeholder="Select priority level"
//           className="mb-2"
//         />
//         <p className="text-xs text-gray-600 mt-1">
//           Selected: {priorityFilter || "None"}
//         </p>
//       </div>

//       {/* Example 4: Disabled state */}
//       <div>
//         <label className="block text-sm font-medium mb-2">
//           Disabled Select
//         </label>
//         <CustomSelect
//           options={statusOptions}
//           value="Active"
//           onChange={() => {}}
//           disabled={true}
//         />
//       </div>

//       {/* Reset buttons */}
//       <div className="flex gap-2 pt-4">
//         <button
//           className="px-3 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded"
//           onClick={() => setCategoryFilter("")}
//         >
//           Reset Category
//         </button>
//         <button
//           className="px-3 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded"
//           onClick={() => setPriorityFilter("")}
//         >
//           Reset Priority
//         </button>
//       </div>
//     </div>
//   );
// };

export default CustomSelect;
