import React from "react";

const RoundedContainer = ({ children }) => {
  return (
    <div className="flex p-4 rounded-md shadow-lg bg-gray-100 w-full">
      {children}
    </div>
  );
};

export default RoundedContainer;
