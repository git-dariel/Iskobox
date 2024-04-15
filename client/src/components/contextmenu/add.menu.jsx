import React, { useState, useEffect, useRef } from "react";

const ContextMenu = ({ xPos, yPos, options, onClose, handleOptionClick }) => {
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div
      ref={menuRef}
      className="fixed top-0 left-0 z-50 bg-white shadow-md rounded-md p-2 max-w-52"
      style={{ transform: `translate(${xPos}px, ${yPos}px)` }}
    >
      {options.map((option, index) => (
        <button
          key={index}
          className="flex items-center text-left text-gray-700 hover:bg-gray-100 
          focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 
          py-1 px-2 w-full rounded-md"
          onClick={() => handleOptionClick(option)}
        >
          {option.icon && <option.icon className="mr-2" />}
          <span>{option.label}</span>
        </button>
      ))}
    </div>
  );
};

export default ContextMenu;
