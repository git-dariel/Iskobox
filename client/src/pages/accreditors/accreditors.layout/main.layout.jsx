import React from "react";

const MainLayout = ({ children }) => {
  return (
    <div
      className="flex flex-col bg-red-50 h-screen overflow-y-auto"
      style={{ scrollbarWidth: "thin" }}
    >
      {children}
    </div>
  );
};

export default MainLayout;
