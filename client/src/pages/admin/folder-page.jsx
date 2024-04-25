import {
  handleBreadcrumbClick,
  handleFolderDoubleClick,
} from "@/helpers/folder-helpers";
import {
  deleteFile,
  fetchAllFiles,
  uploadFile,
} from "@/services/files/file-service";
import {
  addFolder,
  deleteFolder,
  fetchFolderDetails,
  fetchFolders,
  updateFolderName,
} from "@/services/folders/folder.service";
import "chart.js/auto";
import { collection, getDocs } from "firebase/firestore";
import { FolderCog, Trash, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import toast, { Toaster } from "react-hot-toast";
import { FaRegEdit } from "react-icons/fa";
import { RiFileAddLine, RiFolderAddLine } from "react-icons/ri";
import Modal from "react-modal";
import { db } from "../../database/firebase-connection";
import {
  getFileIcon,
  isImageFile,
  truncateFileName,
} from "../../helpers/file-helpers";

function FolderPage({ isGridView }) {
  const [folders, setFolders] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");
  const [currentFolder, setCurrentFolder] = useState(null);
  const [folderPath, setFolderPath] = useState([]);
  const [files, setFiles] = useState([]);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [folderUsageChartData, setFolderUsageChartData] = useState([]);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [editingFolder, setEditingFolder] = useState(null);
  const [editedFolderName, setEditedFolderName] = useState("");

  useEffect(() => {
    const fetchInitialDataAndUpdateChart = async () => {
      const fetchedFolders = await fetchFolders();
      setFolders(fetchedFolders);
      await fetchFiles();
      updateFolderUsageChartData();
    };

    fetchInitialDataAndUpdateChart();
  }, []);

  useEffect(() => {
    updateFolderUsageChartData();
  }, [folders, files]);

  useEffect(() => {
    Modal.setAppElement("#root");
    fetchFolders();
  }, []);

  // Update the Folder Data
  const updateFolderUsageChartData = async () => {
    const allFoldersSnapshot = await getDocs(collection(db, "folders"));
    const allFilesSnapshot = await getDocs(collection(db, "files"));

    const allFolders = new Map();
    allFoldersSnapshot.forEach((doc) => {
      allFolders.set(doc.id, { ...doc.data(), id: doc.id, fileCount: 0 });
    });

    // Count files for each folder
    allFilesSnapshot.forEach((doc) => {
      const folderId = doc.data().folderId;
      if (allFolders.has(folderId)) {
        allFolders.get(folderId).fileCount += 1;
      }
    });

    const countFilesInFolder = (folderId) => {
      let fileCount = allFolders.get(folderId).fileCount;
      for (const [id, folder] of allFolders) {
        if (folder.parentId === folderId) {
          fileCount += countFilesInFolder(id);
        }
      }
      return fileCount;
    };
    const processFolder = (folder) => {
      const totalFiles = countFilesInFolder(folder.id);
      // Adjust based on your application's logic
      const maxFileCount = 3;
      const usagePercentage = Math.min((totalFiles / maxFileCount) * 100, 100);

      return {
        folderId: folder.id,
        folderName: folder.name,
        usagePercentage,
      };
    };
    const folderUsageData = Array.from(allFolders.values()).map(processFolder);
    setFolderUsageChartData(folderUsageData);
  };

  // Add Folder
  const handleAddFolder = async (e) => {
    e.preventDefault();
    if (newFolderName.trim() !== "") {
      const folderData = {
        name: newFolderName,
        parentId: currentFolder ? currentFolder.id : null,
      };

      try {
        const newFolder = await addFolder(folderData);
        if (currentFolder) {
          const updatedSubfolders = [...currentFolder.subfolders, newFolder];
          setCurrentFolder({
            ...currentFolder,
            subfolders: updatedSubfolders,
          });
        } else {
          setFolders((prevFolders) => [...prevFolders, newFolder]);
        }
        toast("Folder Created Successfully", {
          icon: "👏",
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
        updateFolderUsageChartData();
        setNewFolderName("");
        setModalOpen(false);
      } catch (error) {
        console.error("Error adding folder: ", error);
        toast.error("Error adding folder");
      }
    }
  };

  // Delete the Folder
  const handleDeleteFolder = async (event, folderId) => {
    event.stopPropagation();
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this folder?"
    );
    if (isConfirmed) {
      try {
        await deleteFolder(folderId);
        if (currentFolder && currentFolder.id === folderId) {
          setCurrentFolder(null);
        }
        setFolders((prevFolders) =>
          prevFolders.filter((folder) => folder.id !== folderId)
        );
        updateFolderUsageChartData();
        toast("Folder deleted successfully", {
          icon: "🗑️",
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
      } catch (error) {
        console.error("Error deleting folder: ", error);
      }
    }
  };

  // Update the Folder Nane
  const handleUpdateFolderName = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (!editingFolder || editedFolderName.trim() === "") return;

    try {
      await updateFolderName(editingFolder.id, editedFolderName);
      setFolders((prevFolders) =>
        prevFolders.map((folder) =>
          folder.id === editingFolder.id
            ? { ...folder, name: editedFolderName }
            : folder
        )
      );
      if (currentFolder && currentFolder.id === editingFolder.id) {
        setCurrentFolder((prev) => ({ ...prev, name: editedFolderName }));
      }
      toast("Folder name updated successfully", {
        icon: "✅",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
      setEditModalOpen(false);
      setEditingFolder(null);
      setEditedFolderName("");
    } catch (error) {
      console.error("Error updating the folder name: ", error);
    }
  };

  // Fetch folder details
  const handleFetchFolderDetails = async (folderId) => {
    try {
      const folderDetails = await fetchFolderDetails(folderId);
      if (folderDetails) {
        setCurrentFolder(folderDetails);
      } else {
        console.error("Failed to fetch folder details.");
      }
    } catch (error) {
      console.error("Error fetching folder details: ", error);
    }
  };

  // Fetch all files
  const fetchFiles = async () => {
    const filesArray = await fetchAllFiles();
    setFiles(filesArray);
  };

  // Add File
  const handleAddFile = async (e) => {
    const file = e.target.files[0];
    if (!file || !currentFolder) return;
    try {
      const newFile = await uploadFile(file, currentFolder.id);
      setFiles((prevFiles) => [...prevFiles, newFile]);
      updateFolderUsageChartData();
      toast("File uploaded successfully", {
        icon: "👏",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    } catch (error) {
      console.error("Error adding file: ", error);
    }
  };

  // Delete file
  const handleDeleteFile = async (fileId) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this file?"
    );
    if (isConfirmed) {
      try {
        await deleteFile(fileId);
        setFiles((prevFiles) => prevFiles.filter((file) => file.id !== fileId));
        updateFolderUsageChartData();
        toast("File deleted successfully", {
          icon: "🗑️",
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
      } catch (error) {
        console.error("Error deleting file: ", error);
      }
    }
  };

  // Double Click
  const onFolderDoubleClick = async (folder) => {
    await handleFolderDoubleClick(
      folder,
      setCurrentFolder,
      setFolderPath,
      db,
      setFiles
    );
  };

  // Navigation
  const breadcrumbClickHandler = async (index) => {
    await handleBreadcrumbClick(
      index,
      folderPath,
      setCurrentFolder,
      setFolderPath,
      setFiles,
      fetchFolders,
      updateFolderUsageChartData,
      fetchAllFiles,
      handleFetchFolderDetails
    );
  };

  return (
    <div
      className={`${
        isGridView ? "flex-col m-2 p-2 border" : "w-full border-y"
      } text-sm flex  items-center space-x-2 border-gray-200 hover:bg-gray-100`}
    >
      <div className="mx-12 text-center mb-5">
        {/* Folder List */}
        <div className="flex">
          {(currentFolder ? currentFolder.subfolders : folders).map(
            (folder) => {
              // Find the usage data for this folder
              const usageData = folderUsageChartData.find(
                (data) => data.folderName === folder.name
              );
              const filePercentage = usageData
                ? usageData.usagePercentage.toFixed(0)
                : "0"; // Default to '0' if not found

              return (
                <div
                  key={folder.id}
                  className="flex text-sm items-center justify-center"
                  onDoubleClick={() => onFolderDoubleClick(folder)}
                >
                  <div>
                    <FolderCog />
                  </div>
                  <div>{folder.name}</div>
                </div>
              );
            }
          )}
        </div>
      </div>

      {previewUrl && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-4 rounded-lg max-w-3xl max-h-full overflow-auto">
            <img
              src={previewUrl}
              alt="Preview"
              className="max-w-full max-h-full"
            />
            <button
              onClick={() => setPreviewUrl(null)}
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 focus:outline-none"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Modal for adding a new folder */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setModalOpen(false)}
        contentLabel="Customize Folder Name"
        className="fixed inset-0 overflow-y-auto"
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div className="fixed inset-0 transition-opacity" aria-hidden="true">
            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
          </div>

          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>

          <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
            <X
              className="cursor-pointer p-1 float-end"
              onClick={() => setModalOpen(false)}
            />
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100 sm:mx-0 sm:h-10 sm:w-10">
                  <FolderCog />
                </div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Customize Folder Name
                  </h3>
                  <div className="mt-2 flex items-center justify-center">
                    <div>
                      <input
                        type="text"
                        className="border p-2 mb-4 w-full"
                        placeholder="Enter folder name"
                        value={newFolderName}
                        onChange={(e) => setNewFolderName(e.target.value)}
                      />
                      <button
                        type="button"
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none"
                        onClick={handleAddFolder}
                      >
                        Save Folder
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>

      {/* Modal for editing a folder name */}
      <Modal
        isOpen={isEditModalOpen}
        onRequestClose={() => setEditModalOpen(false)}
        contentLabel="Edit Folder Name"
        className="fixed inset-0 overflow-y-auto"
      >
        <div className="flex items-center justify-center min-h-screen">
          <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full p-4">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Edit Folder Name
            </h3>
            <div className="mt-2">
              <input
                type="text"
                className="border p-2 mb-4 w-full"
                placeholder="Enter new folder name"
                value={editedFolderName}
                onChange={(e) => setEditedFolderName(e.target.value)}
              />
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none mr-2"
                onClick={(event) => handleUpdateFolderName(event)}
              >
                Save
              </button>
              <button
                type="button"
                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 focus:outline-none"
                onClick={() => setEditModalOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </Modal>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}

export default FolderPage;
