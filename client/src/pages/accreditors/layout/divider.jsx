import React from "react";

const Divider = ({ sectionTitle }) => {
  return (
    <div className="relative w-full h-32 bg-neutral-50 overflow-hidden flex items-center justify-center">
      {/* Title in the Center */}
      <h1 className="absolute text-3xl font-bold z-10 text-gray-600">
        {sectionTitle}
      </h1>

      {/* Dark Green Shape (Top Left) */}
      <div className="absolute top-0 left-0 w-1/3 h-full bg-green-900 transform -rotate-12 origin-bottom-left"></div>
      {/* Yellow Shape (Top Left Overlapping) */}
      <div className="absolute top-0 left-0 w-1/4 h-full bg-yellow-500 transform -rotate-12 origin-bottom-left translate-x-1/4"></div>
      {/* Yellow Shape (Top Right) */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-yellow-500 transform rotate-12 origin-top-right"></div>
    </div>
  );
};

export default Divider;
