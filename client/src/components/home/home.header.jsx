import React from "react";
import FileFolderButton from "../common/buttons/file.folder";

const Header = () => {
  return (
    <div className="bg-white max-w-full rounded-t-xl z-10">
      <div className="container mx-auto p-4">
        <div className="px-3">
          <h1 className="text-xl text-gray-800">Welcome to Sharehub</h1>
        </div>
        <div className="p-3">
          <FileFolderButton />
          {/* Add more components here */}
        </div>
      </div>
    </div>
  );
};

export default Header;
