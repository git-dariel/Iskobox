import NewFolderForm from "@/components/modals/new.folder";
import ProgressBar from "@/components/ui/line.progressbar";
import { useAuth } from "@/helpers/auth.context";
import { useUpdate } from "@/helpers/update.context";
import { uploadFile } from "@/services/files/file-service";
import {
  addAssigneeToFolder,
  addFolder,
  fetchFolderDetailsWithUploadLimit,
} from "@/services/folders/folder.service";
import React, { useRef, useState } from "react";
import { MdOutlineCreateNewFolder, MdOutlineUploadFile } from "react-icons/md";
import { Toaster, toast } from "sonner";

const AddNewButton = ({ parentId }) => {
  const [isContextMenuOpen, setIsContextMenuOpen] = useState(false);
  const [contextMenuPosition, setContextMenuPosition] = useState({
    x: 0,
    y: 0,
  });
  const [showNewFolderForm, setShowNewFolderForm] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({});

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
    const files = Array.from(event.target.files);
    if (files.length > 0) {
      const newProgress = {};
      files.forEach((file) => {
        newProgress[file.name] = 0;
      });
      setUploadProgress(newProgress);

      try {
        const folderDetails = await fetchFolderDetailsWithUploadLimit(parentId);
        if (folderDetails && folderDetails.fileCount + files.length > folderDetails.uploadLimit) {
          throw new Error("Upload limit reached for this folder");
        }

        await Promise.all(files.map((file) =>
          uploadFile(file, parentId, (percentComplete) => {
            setUploadProgress((prevProgress) => ({
              ...prevProgress,
              [file.name]: percentComplete,
            }));
          })
        ));
        
        // Clear progress once all files are uploaded
        setUploadProgress({});
        triggerUpdate();
        toast.success("Files uploaded successfully");
      } catch (err) {
        toast.error(`Failed to upload files: ${err.message}`);
      }
    }
  };

  const handleCreateFolder = async (folderData) => {
    const effectiveParentId = parentId === undefined ? null : parentId;
    const loadingToastId = toast.loading("Creating folder...");
    try {
      const folderResponse = await addFolder({ ...folderData, parentId: effectiveParentId });
      const newFolderId = folderResponse.id;
      triggerUpdate();
      setShowNewFolderForm(false);
      if (currentUser.role === "Faculty") {
        const fullName = `${currentUser.firstname} ${currentUser.lastname}`;
        await addAssigneeToFolder(newFolderId, {
          userId: currentUser.email,
          name: fullName,
          role: "Owner",
          description: "Creator of the folder",
        });
        triggerUpdate();
      }
      toast.dismiss(loadingToastId);
      toast.success("Folder created successfully");
    } catch (err) {
      toast.dismiss(loadingToastId);
      setShowNewFolderForm(false);
      toast.error(`Error: ${err.message}`);
    }
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
          multiple
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
      <div className="fixed bottom-4 right-4 py-2 px-4 w-full md:w-1/3 lg:w-1/4 bg-white shadow-lg border rounded-lg">
        {Object.keys(uploadProgress).map((fileName) => (
          <div key={fileName} className="mb-2">
            <span>Uploading {fileName}</span>
            <ProgressBar progress={uploadProgress[fileName]} />
          </div>
        ))}
      </div>
    </>
  );
};

export default AddNewButton;
