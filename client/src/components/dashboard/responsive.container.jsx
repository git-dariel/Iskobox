import React from "react";

function ResponsiveContainer({ children }) {
  return (
    <div className="flex justify-center items-center w-full h-full p-4">
      <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4">{children}</div>
    </div>
  );
}

export default ResponsiveContainer;
