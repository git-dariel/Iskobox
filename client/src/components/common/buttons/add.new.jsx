import React, { useState, useRef } from "react";
import { IoAdd } from "react-icons/io5";
import {
  MdOutlineCreateNewFolder,
  MdOutlineUploadFile,
  MdDriveFolderUpload,
} from "react-icons/md";
import ContextMenu from "@/components/contextmenu/add.menu";
import NewFolderForm from "@/components/modals/new.folder";

const AddNewButton = () => {
  const [isContextMenuOpen, setIsContextMenuOpen] = useState(false);
  const [contextMenuPosition, setContextMenuPosition] = useState({
    x: 0,
    y: 0,
  });
  const [showNewFolderForm, setShowNewFolderForm] = useState(false);
  const buttonRef = useRef(null);

  const options = [
    { label: "New Folder", icon: MdOutlineCreateNewFolder },
    { label: "Upload File", icon: MdOutlineUploadFile },
    { label: "Upload Folder", icon: MdDriveFolderUpload },
  ];

  const handleButtonClick = () => {
    const buttonRect = buttonRef.current.getBoundingClientRect();
    setContextMenuPosition({
      x: buttonRect.left + 30,
      y: buttonRect.bottom + window.scrollY - 25,
    });
    setIsContextMenuOpen(true);
  };

  const closeContextMenu = () => {
    setIsContextMenuOpen(false);
  };

  const handleOptionClick = (option) => {
    if (option.label === "New Folder") {
      setShowNewFolderForm(true);
    } else {
      // Handle other options here
      console.log(`${option.label} clicked`);
    }
    setIsContextMenuOpen(false);
  };

  return (
    <>
      <button
        ref={buttonRef}
        className="border border-gray-700 rounded-full shadow-md m-1 p-[1px] hover:bg-gray-100 transition-all duration-200 ease-in-out"
        onClick={handleButtonClick}
      >
        <IoAdd />
      </button>
      {isContextMenuOpen && (
        <ContextMenu
          xPos={contextMenuPosition.x}
          yPos={contextMenuPosition.y}
          options={options}
          onClose={closeContextMenu}
          handleOptionClick={handleOptionClick} // Pass the function down to ContextMenu
        />
      )}
      {showNewFolderForm && (
        <NewFolderForm onClose={() => setShowNewFolderForm(false)} />
      )}
    </>
  );
};

export default AddNewButton;
