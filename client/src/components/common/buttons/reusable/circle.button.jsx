import React from "react";

const CircleButton = ({ onClick, icon, text, title }) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center p-2 bg-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-all duration-200 ease-in-out  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
      title={title}
    >
      {icon && <span>{icon}</span>}
      {text}
    </button>
  );
};

export default CircleButton;
