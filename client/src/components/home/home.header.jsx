import React, { useState } from "react";
import FileFolderButton from "../common/buttons/file.folder";
import ToggleViewButton from "../common/buttons/toggle.view";
import FileCrumbs from "../common/filecrumb";
import AddNewButton from "../common/buttons/add.new";

const Header = ({
  selectedButton,
  handleButtonClick,
  isGridView,
  toggleView,
}) => {
  return (
    <div className="bg-white max-w-full rounded-t-xl z-10">
      <div className="container mx-auto p-4">
        <div className="flex">
          <h1 className="text-xl text-gray-800 pl-3 pr-1">Sharehub</h1>
          {/* <FileCrumbs /> */}
          <AddNewButton />
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
