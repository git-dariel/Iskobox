import React, { useState, useRef } from 'react';
import { IoAdd } from 'react-icons/io5';
import { MdOutlineCreateNewFolder, MdOutlineUploadFile } from 'react-icons/md';
import ContextMenu from '@/components/contextmenu/add.menu';
import NewFolderForm from '@/components/modals/new.folder';
import { uploadFile } from '@/services/files/file-service';
import { addFolder } from '@/services/folders/folder.service';
import { Toaster, toast } from 'sonner';
import { useUpdate } from '@/helpers/update.context';
import { bouncy } from 'ldrs';

const AddNewButton = ({ parentId }) => {
  const [isContextMenuOpen, setIsContextMenuOpen] = useState(false);
  const [contextMenuPosition, setContextMenuPosition] = useState({
    x: 0,
    y: 0,
  });
  const [showNewFolderForm, setShowNewFolderForm] = useState(false);
  const buttonRef = useRef(null);
  const fileInputRef = useRef(null);
  const { triggerUpdate } = useUpdate();
  const [loading, setLoading] = useState(false);
  bouncy.register();

  const options = [
    { label: 'New Folder', icon: MdOutlineCreateNewFolder },
    { label: 'Upload File', icon: MdOutlineUploadFile },
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
      setLoading(true);
      try {
        await uploadFile(file, parentId);
        toast.success('File uploaded successfully');
        triggerUpdate();
      } catch (error) {
        console.error('Error uploading file:', error);
        toast.error('Failed to upload file');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleCreateFolder = async (folderData) => {
    setLoading(true);
    try {
      const effectiveParentId = parentId === undefined ? null : parentId;
      await addFolder({ ...folderData, parentId: effectiveParentId });
      toast.success('Folder created successfully');
      triggerUpdate();
    } catch (error) {
      console.error('Error creating folder:', error);
      toast.error(`Error: ${error.message}`);
    } finally {
      setLoading(false);
      setShowNewFolderForm(false);
    }
  };

  return (
    <>
      <Toaster />
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
          onCreate={handleCreateFolder}
          parentId={parentId}
        />
      )}
      {loading && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75'>
          <l-bouncy size='60' color='black'></l-bouncy>
        </div>
      )}
    </>
  );
};

export default AddNewButton;
