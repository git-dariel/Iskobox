import React, { useState, useRef } from "react";
import { IoAdd } from "react-icons/io5";
import { MdOutlineCreateNewFolder, MdOutlineUploadFile } from "react-icons/md";
import ContextMenu from "@/components/contextmenu/add.menu";
import NewFolderForm from "@/components/modals/new.folder";
import { uploadFile } from "@/services/files/file-service";
import { addFolder, fetchFolderDetailsWithUploadLimit } from "@/services/folders/folder.service";
import { Toaster, toast } from "sonner";
import { useUpdate } from "@/helpers/update.context";
import { useAuth } from "@/helpers/auth.context";

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
  const { currentUser } = useAuth();

  const options = [
    currentUser.role !== "Faculty" && { label: "New Folder", icon: MdOutlineCreateNewFolder },
    { label: "Upload File", icon: MdOutlineUploadFile },
  ].filter(Boolean);

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
    } else if (option.label === "Upload File") {
      fileInputRef.current.click();
    } else {
      console.log(`${option.label} clicked`);
    }
    setIsContextMenuOpen(false);
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      toast.promise(
        (async () => {
          const folderDetails = await fetchFolderDetailsWithUploadLimit(parentId);
          if (folderDetails && folderDetails.fileCount >= folderDetails.uploadLimit) {
            throw new Error("Upload limit reached for this folder");
          }
          await uploadFile(file, parentId);
          triggerUpdate();
        })(),
        {
          loading: "Uploading file...",
          success: "File uploaded successfully",
          error: (err) => `Failed to upload file: ${err.message}`,
        }
      );
    }
  };

  const handleCreateFolder = async (folderData) => {
    const effectiveParentId = parentId === undefined ? null : parentId;
    toast.promise(addFolder({ ...folderData, parentId: effectiveParentId }), {
      loading: "Creating folder...",
      success: () => {
        triggerUpdate();
        setShowNewFolderForm(false);
        return "Folder created successfully";
      },
      error: (err) => {
        setShowNewFolderForm(false);
        return `Error: ${err.message}`;
      },
    });
  };

  return (
    <>
      <Toaster richColors />
      <div className="flex space-x-2 m-1">
        <button
          className="border border-gray-700 rounded-md shadow-md p-1 hover:bg-gray-100 transition-all duration-200 ease-in-out flex items-center space-x-1 whitespace-nowrap md:p-2 md:border md:border-gray-700 md:rounded-md md:shadow-md md:hover:bg-gray-100 md:transition-all md:duration-200 md:ease-in-out md:flex md:items-center md:space-x-1 md:whitespace-nowrap"
          onClick={() => setShowNewFolderForm(true)}
        >
          <MdOutlineCreateNewFolder size={20} />
          <span className="hidden md:inline text-sm">New Folder</span>
        </button>
        <button
          className="border border-gray-700 rounded-md shadow-md p-1 hover:bg-gray-100 transition-all duration-200 ease-in-out flex items-center space-x-1 whitespace-nowrap md:p-2 md:border md:border-gray-700 md:rounded-md md:shadow-md md:hover:bg-gray-100 md:transition-all md:duration-200 md:ease-in-out md:flex md:items-center md:space-x-1 md:whitespace-nowrap"
          onClick={() => fileInputRef.current.click()}
        >
          <MdOutlineUploadFile size={20} />
          <span className="hidden md:inline text-sm">Upload File</span>
        </button>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
      </div>
      {showNewFolderForm && (
        <NewFolderForm
          onClose={() => setShowNewFolderForm(false)}
          onCreate={handleCreateFolder}
          parentId={parentId}
        />
      )}
    </>
  );
};

export default AddNewButton;
