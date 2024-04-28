import React from "react";

const OvalButton = ({ onClick, icon, text, title }) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center py-2 px-4 bg-blue-500 text-white hover:bg-blue-600 rounded-full transition-all duration-200 ease-in-out  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400"
      title={title}
    >
      {icon && <span>{icon}</span>}
      {text}
    </button>
  );
};

export default OvalButton;
