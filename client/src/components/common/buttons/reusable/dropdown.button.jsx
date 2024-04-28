import React, { useState } from "react";
import { IoChevronDown } from "react-icons/io5";

const DropdownButton = ({ buttonText, options, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionSelect = (optionId) => {
    onSelect(optionId);
    toggleDropdown();
  };

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
        type="button"
      >
        {buttonText}
        <IoChevronDown className="ml-2" />
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 z-10 w-56 mt-2 p-3 bg-white rounded-lg shadow">
          <ul className="space-y-2 text-sm">
            {options.map((option) => (
              <li
                key={option.id}
                onClick={() => handleOptionSelect(option.id)}
                className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 px-3 py-2 rounded-md"
              >
                {option.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DropdownButton;
