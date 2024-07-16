import React from "react";

const CircleButton = ({
  onClick,
  icon,
  text,
  title,
  bgColor = "bg-transparent",
  hoverBg = "hover:bg-gray-200",
}) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center p-2 m-1 ${bgColor} text-gray-600 hover:text-gray-900 hover:${hoverBg} rounded-full transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400`}
      title={title}
    >
      {icon && <span>{icon}</span>}
      {text}
    </button>
  );
};

export default CircleButton;
