import React, { useState } from "react";
import FileFolderButton from "../common/buttons/file.folder";
import ToggleViewButton from "../common/buttons/toggle.view";
import FileCrumbs from "../common/filecrumb";
import AddNewButton from "../common/buttons/add.new";
import CircleButton from "../common/buttons/circle.button";
import { FaUserTag } from "react-icons/fa6";

const Header = ({
  selectedButton,
  handleButtonClick,
  isGridView,
  toggleView,
}) => {
  return (
    <div className="bg-white max-w-full rounded-t-xl z-10">
      <div className=" mx-auto p-4">
        <div className="flex">
          <h1 className="text-xl text-gray-800 pl-3 pr-1">Sharehub</h1>
          {/* <FileCrumbs /> */}
          <AddNewButton />
        </div>

        <div className="flex p-3">
          <FileFolderButton
            selectedButton={selectedButton}
            handleButtonClick={handleButtonClick}
          />

          <div className="flex justify-end gap-5 w-full">
            <CircleButton title={"Tag an uploader"} icon={<FaUserTag />} />

            <ToggleViewButton isGridView={isGridView} toggleView={toggleView} />
          </div>
          {/* Add more components here */}
        </div>
      </div>
    </div>
  );
};

export default Header;
