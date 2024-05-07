import React, { useState, useRef } from 'react';
import { IoAdd } from 'react-icons/io5';
import { MdOutlineCreateNewFolder, MdOutlineUploadFile, MdDriveFolderUpload } from 'react-icons/md';
import ContextMenu from '@/components/contextmenu/add.menu';
import NewFolderForm from '@/components/modals/new.folder';
import { uploadFile } from '@/services/files/file-service';

const AddNewButton = ({ parentId, setFolders }) => {
  const [isContextMenuOpen, setIsContextMenuOpen] = useState(false);
  const [contextMenuPosition, setContextMenuPosition] = useState({
    x: 0,
    y: 0,
  });
  const [showNewFolderForm, setShowNewFolderForm] = useState(false);
  const buttonRef = useRef(null);
  const fileInputRef = useRef(null);

  const options = [
    { label: 'New Folder', icon: MdOutlineCreateNewFolder },
    { label: 'Upload File', icon: MdOutlineUploadFile },
    { label: 'Upload Folder', icon: MdDriveFolderUpload },
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
    if (option.label === 'New Folder') {
      setShowNewFolderForm(true);
    } else if (option.label === 'Upload File') {
      fileInputRef.current.click();
    } else {
      console.log(`${option.label} clicked`);
    }
    setIsContextMenuOpen(false);
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const updatedFolder = await uploadFile(file, parentId);
      setFolders((prevFolders) => [...prevFolders, updatedFolder]);
    }
  };

  return (
    <>
      <button
        ref={buttonRef}
        className='border border-gray-700 rounded-full shadow-md m-1 p-[1px] hover:bg-gray-100 transition-all duration-200 ease-in-out'
        onClick={handleButtonClick}
      >
        <IoAdd />
      </button>
      <input
        type='file'
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
      {isContextMenuOpen && (
        <ContextMenu
          xPos={contextMenuPosition.x}
          yPos={contextMenuPosition.y}
          options={options}
          onClose={closeContextMenu}
          handleOptionClick={handleOptionClick}
        />
      )}
      {showNewFolderForm && (
        <NewFolderForm
          onClose={() => setShowNewFolderForm(false)}
          setFolders={setFolders}
          parentId={parentId}
        />
      )}
    </>
  );
};

export default AddNewButton;
