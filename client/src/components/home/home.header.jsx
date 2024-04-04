import React, { useState } from "react";
import FileFolderButton from "../common/buttons/file.folder";
import ToggleViewButton from "../common/buttons/toggle.view";

const Header = ({
  selectedButton,
  handleButtonClick,
  isGridView,
  toggleView,
}) => {
  return (
    <div className="bg-white max-w-full rounded-t-xl z-10">
      <div className="container mx-auto p-4">
        <div className="px-3">
          <h1 className="text-xl text-gray-800">Welcome to Sharehub</h1>
        </div>
        <div className="flex justify-between p-3">
          <FileFolderButton
            selectedButton={selectedButton}
            handleButtonClick={handleButtonClick}
          />
          <div>
            <ToggleViewButton isGridView={isGridView} toggleView={toggleView} />
          </div>
          {/* Add more components here */}
        </div>
      </div>
    </div>
  );
};

export default Header;
