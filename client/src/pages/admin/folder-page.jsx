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

function FolderPage() {
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
    <div className="h-full w-full">
      <div className="border-2">
        <h2 className="text-2xl font-bold text-left m-5 text-gray-600">
          Folder Usage
        </h2>
        <div className="w-full flex flex-row justify-center items-center cursor-default">
          {folderUsageChartData.map((data, index) => (
            <div
              key={index}
              className=""
              style={{ width: "200px", height: "200px", margin: "0 auto" }}
            >
              <div>
                <h3 className=" text-gray-600 text-2xl font-semibold text-center">
                  {data.folderName}
                </h3>
              </div>
              <div>
                <Doughnut
                  data={{
                    labels: ["Used", "Free"],
                    datasets: [
                      {
                        label: "Folder Usage",
                        data: [
                          data.usagePercentage,
                          100 - data.usagePercentage,
                        ],
                        backgroundColor: [
                          data.usagePercentage >= 100
                            ? "rgba(255, 99, 132, 0.6)" // Red for full
                            : data.usagePercentage > 60
                            ? "rgba(255, 159, 64, 0.6)" // Orange for quite full
                            : "rgba(54, 162, 235, 0.6)", // Blue for not full
                          "rgba(201, 203, 207, 0.6)",
                        ],
                        borderColor: [
                          data.usagePercentage >= 100
                            ? "rgba(255, 99, 132, 1)"
                            : data.usagePercentage > 75
                            ? "rgba(255, 159, 64, 1)"
                            : "rgba(54, 162, 235, 1)",
                          "rgba(201, 203, 207, 1)",
                        ],
                        borderWidth: 1,
                      },
                    ],
                  }}
                  options={{
                    circumference: 360, // Changed to 360 for full circle
                    rotation: 270, // Adjusted for starting point to be at the top
                    cutout: "80%",
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        display: false, // Optionally hide the legend if you want
                      },
                    },
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="border-2">
        <div className="flex p-5">
          <h2 className="text-2xl font-bold text-left text-gray-600">
            Folders
          </h2>
        </div>
        <div className="mx-10 flex">
          <div>
            <button
              type="button"
              className="bg-blue-500 mx-2 p-2 text-white rounded hover:bg-blue-600 focus:outline-none"
              onClick={() => setModalOpen(true)}
            >
              <div className="flex flex-row">
                <RiFolderAddLine className=" pr-1 text-2xl" />
                Add Folder
              </div>
            </button>

            {/* Add File Button and Hidden File Input */}
            <button
              type="button"
              className=" bg-green-500 mx-2 p-2 text-white rounded hover:bg-green-600 focus:outline-none"
              onClick={() => document.getElementById("fileInput").click()}
            >
              <div className="flex flex-row">
                <RiFileAddLine className=" pr-1 text-2xl" />
                Add File
              </div>
            </button>
          </div>
          <div className="border-2 inline-block mx-5"></div>
          {/* Breadcrumb Navigation */}
          <div className="breadcrumbs w-flex p-2 rounded text-center">
            <span
              style={{ color: "blue" }}
              className="breadcrumb-item cursor-pointer"
              onClick={() => breadcrumbClickHandler(0)}
            >
              Root
            </span>
            {folderPath.map((folder, index) => (
              <React.Fragment key={folder.id}>
                <span> / </span>
                <span
                  style={{ color: "blue" }}
                  className="breadcrumb-item cursor-pointer"
                  onClick={() => breadcrumbClickHandler(index + 1)}
                >
                  {folder.name}
                </span>
              </React.Fragment>
            ))}
          </div>

          <input
            type="file"
            id="fileInput"
            style={{ display: "none" }}
            onChange={handleAddFile}
          />
        </div>

        <div className="mx-12 text-center mb-5">
          {/* Folder List */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-5">
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
                    className="group cursor-pointer p-4 border border-gray-200 rounded-lg hover:shadow-lg flex flex-col items-center justify-center space-y-2"
                    onDoubleClick={() => onFolderDoubleClick(folder)}
                  >
                    <div className="bg-blue-100 p-4 rounded-full">
                      <FolderCog className="w-8 h-8 text-blue-500" />
                    </div>
                    <div className="text-sm font-medium text-gray-700 truncate w-full text-center">
                      {folder.name}
                    </div>
                    {/* Display the file percentage here */}
                    <div className="text-xs font-semibold">
                      {filePercentage}% Files
                    </div>
                    <div className="opacity-0 group-hover:opacity-100 transition duration-150 ease-in-out">
                      {/* edit button */}
                      <button
                        type="button"
                        className="bg-blue-500 text-white p-1 rounded hover:bg-blue-600 focus:outline-none mx-1"
                        title="Edit Folder"
                        onClick={(event) => {
                          event.stopPropagation();
                          setEditingFolder(folder);
                          setEditedFolderName(folder.name);
                          setEditModalOpen(true);
                        }}
                      >
                        <FaRegEdit className="w-4 h-4" />
                      </button>

                      {/* delete button */}
                      <button
                        type="button"
                        className="bg-red-500 text-white p-1 rounded hover:bg-red-600 focus:outline-none mx-1"
                        onClick={(event) =>
                          handleDeleteFolder(event, folder.id)
                        }
                        title="Delete Folder"
                      >
                        <Trash className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              }
            )}
          </div>
        </div>
      </div>

      {/* Files List */}
      <div className=" border-2">
        <h3 className="text-2xl text-gray-600 font-semibold m-5">Files</h3>

        <div className="mx-12 mb-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {files.length > 0 ? (
              files.map((file) => (
                <div
                  key={file.id}
                  className="border rounded-lg hover:shadow-md overflow-hidden flex flex-col"
                >
                  <div className="flex justify-between items-center p-4">
                    <div className="flex items-center space-x-3">
                      {getFileIcon(file.name)}
                      <span className="text-sm font-medium truncate">
                        {truncateFileName(file.name)}
                      </span>
                    </div>
                    <button
                      onClick={() => handleDeleteFile(file.id)}
                      className="text-red-500 hover:text-red-600"
                      title="Delete File"
                    >
                      <Trash className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="flex-grow p-3 bg-gray-100 flex items-center justify-center">
                    {isImageFile(file.name) ? (
                      <img
                        src={file.url}
                        alt="Preview"
                        className="max-h-36 w-auto"
                        onClick={() => setPreviewUrl(file.url)}
                      />
                    ) : (
                      <a
                        href={file.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:text-blue-600 underline"
                      >
                        Open
                      </a>
                    )}
                  </div>
                  <div className="p-4 bg-white flex justify-between items-center">
                    <a
                      href={file.url}
                      download
                      className="text-sm text-gray-500 hover:text-gray-600"
                    >
                      Download
                    </a>
                    {isImageFile(file.name) && (
                      <button
                        onClick={() => setPreviewUrl(file.url)}
                        className="text-sm text-blue-500 hover:text-blue-600"
                      >
                        Preview
                      </button>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No files in this folder.</p>
            )}
          </div>
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