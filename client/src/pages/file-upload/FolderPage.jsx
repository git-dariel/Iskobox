import "chart.js/auto";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
  updateDoc
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { File, FileText, FolderCog, Image, Trash, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import toast, { Toaster } from "react-hot-toast";
import Modal from "react-modal";
import { db, storage } from "../../../firebase";
import { RiFolderAddLine } from "react-icons/ri";
import { RiFileAddLine } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";

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
      await fetchFolders(); // Fetch folders and implicitly update state
      await fetchAllFiles(); // Fetch files and implicitly update state
      updateFolderUsageChartData(); // Call this after the states are updated
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

  const updateFolderUsageChartData = async () => {
    // Helper function to recursively count files for a given folder
    const countFilesInFolder = async (folderId) => {
      let fileCount = 0;
      const qFiles = query(collection(db, "files"), where("folderId", "==", folderId));
      const filesSnapshot = await getDocs(qFiles);
      fileCount += filesSnapshot.docs.length; // Count files directly under this folder
  
      // Now, find and process all subfolders
      const qSubfolders = query(collection(db, "folders"), where("parentId", "==", folderId));
      const subfoldersSnapshot = await getDocs(qSubfolders);
      for (const subfolderDoc of subfoldersSnapshot.docs) {
        const subfolderId = subfolderDoc.id;
        const subfolderFileCount = await countFilesInFolder(subfolderId); // Recursive call
        fileCount += subfolderFileCount;
      }
      
      console.log(`Folder ID: ${folderId}, File Count: ${fileCount}`);
      return fileCount;
    };
    
      // Function to process a single folder
    const processFolder = async (folder) => {
      const totalFiles = await countFilesInFolder(folder.id);
      const maxFileCount = 3; // Adjust based on your application's logic
      const usagePercentage = Math.min((totalFiles / maxFileCount) * 100, 100);

      return {
        folderId: folder.id,
        folderName: folder.name,
        usagePercentage,
      };
    };

      // Process root folders
    const rootFoldersData = await Promise.all(folders.map(folder => processFolder(folder)));

    // Process subfolders if any
    let subFoldersData = [];
    if (currentFolder && currentFolder.subfolders) {
      subFoldersData = await Promise.all(currentFolder.subfolders.map(folder => processFolder(folder)));
    }
  
    setFolderUsageChartData([...rootFoldersData, ...subFoldersData]);
  };

  const fetchAllFiles = async () => {
    const q = query(collection(db, "files"));
    const querySnapshot = await getDocs(q);
    const filesArray = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setFiles(filesArray);
  };

  function getFileIcon(fileName) {
    const extension = fileName.split(".").pop().toLowerCase();
    switch (extension) {
      case "jpg":
      case "jpeg":
      case "png":
      case "gif":
        return <Image className="w-12 h-12 text-gray-500" />;
      case "pdf":
        // Use the File icon as a fallback for PDFs
        return <File className="w-12 h-12 text-red-500" />;
      case "doc":
      case "docx":
        return <FileText className="w-12 h-12 text-blue-500" />;
      // Add more cases as needed
      default:
        return <File className="w-12 h-12 text-gray-500" />;
    }
  }

  function isImageFile(fileName) {
    const extension = fileName.split(".").pop().toLowerCase();
    return ["jpg", "jpeg", "png", "gif"].includes(extension);
  }

  const handleFileChange = async (e) => {
    const file = e.target.files[0]; // Get the file
    if (!file || !currentFolder) return;

    const storageRef = ref(storage, `folders/${currentFolder.id}/${file.name}`);
    try {
      // Upload the file to Firebase Storage
      const snapshot = await uploadBytes(storageRef, file);

      // Get the URL to the uploaded file
      const url = await getDownloadURL(snapshot.ref);

      // Save a reference to the file in Firestore
      const filesCollectionRef = collection(db, "files");
      const docRef = await addDoc(filesCollectionRef, {
        name: file.name,
        folderId: currentFolder.id,
        url: url,
      });

      // Update local state to show the file immediately
      const newFile = {
        id: docRef.id,
        name: file.name,
        folderId: currentFolder.id,
        url: url,
      };
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
      console.error("Error uploading file: ", error);
      toast.error("Error uploading file");
    }
  };

  const fetchFolderDetails = async (folderId) => {
    const folderDocRef = doc(db, "folders", folderId);
    const folderDoc = await getDoc(folderDocRef);
    if (folderDoc.exists()) {
      return { id: folderDoc.id, ...folderDoc.data() };
    } else {
      console.log("No such folder!");
      return null; // Handle the case where the folder doesn't exist
    }
  };

  const fetchSubfoldersAndFiles = async (folderId) => {
    // Fetch subfolders
    const qFolders = query(collection(db, "folders"), where("parentId", "==", folderId));
    const querySnapshotFolders = await getDocs(qFolders);
    const subfoldersArray = querySnapshotFolders.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  
    // Fetch files
    const qFiles = query(collection(db, "files"), where("folderId", "==", folderId));
    const querySnapshotFiles = await getDocs(qFiles);
    const filesArray = querySnapshotFiles.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  
    // Update state
    setCurrentFolder((prevState) => ({
      ...prevState,
      subfolders: subfoldersArray,
    }));
    setFiles(filesArray);
  };

  //fetching the folders from firebase
  const fetchFolders = async () => {
    const q = query(collection(db, "folders"), where("parentId", "==", null));
    const querySnapshot = await getDocs(q);
    const foldersArray = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      subfolders: [], // Initialize subfolders as empty
    }));
    setFolders(foldersArray);
  };

  const handleAddFolder = async (e) => {
    e.preventDefault();
    if (newFolderName.trim() !== "") {
      const isDuplicate = currentFolder?.subfolders?.some(
        (folder) => folder.name === newFolderName
      );

      if (!isDuplicate) {
        // Prepare new folder data
        const newFolderData = {
          name: newFolderName,
          parentId: currentFolder ? currentFolder.id : null, // Set parentId if it's a subfolder
        };

        try {
          // Add new folder to Firestore
          const docRef = await addDoc(collection(db, "folders"), newFolderData);
          const newFolder = { id: docRef.id, ...newFolderData, subfolders: [] };

          // Update local state
          if (currentFolder) {
            // If it's a subfolder, add it to the current folder's subfolders
            const updatedSubfolders = [...currentFolder.subfolders, newFolder];
            setCurrentFolder({
              ...currentFolder,
              subfolders: updatedSubfolders,
            });
          } else {
            // If it's a root folder, add it to the folders array
            setFolders((prevFolders) => [...prevFolders, newFolder]);
          }
          updateFolderUsageChartData();

          toast("Folder Created Successfully", {
            icon: "👏",
            style: {
              borderRadius: "10px",
              background: "#333",
              color: "#fff",
            },
          });
          setNewFolderName("");
          setModalOpen(false);
        } catch (error) {
          console.error("Error adding document: ", error);
        }
      } else {
        alert(
          "Folder with the same name already exists. Please choose a different name."
        );
      }
    }
  };

  const handleFolderDoubleClick = async (folder) => {
    // update the folder path for UI breadcrumbs
    if (currentFolder) {
      setFolderPath([...folderPath, folder.name]);
    } else {
      setFolderPath((prevPath) => [
        ...prevPath,
        { id: folder.id, name: folder.name },
      ]);
    }
    setCurrentFolder(folder);

    //Fetch subfolders
    const foldersCollectionRef = collection(db, "folders");
    const q = query(foldersCollectionRef, where("parentId", "==", folder.id));
    const querySnapshot = await getDocs(q);
    const subfoldersArray = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      subfolders: [], // Assuming subfolders are not nested further for simplicity
    }));

    setCurrentFolder((prevState) => ({
      ...prevState,
      subfolders: subfoldersArray,
    }));

    // Fetch files for the current folder
    const filesCollectionRef = collection(db, "files");
    const qFiles = query(
      filesCollectionRef,
      where("folderId", "==", folder.id)
    );
    const querySnapshotFiles = await getDocs(qFiles);
    const filesArray = querySnapshotFiles.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setFiles(filesArray);
  };

  const handleBreadcrumbClick = async (index) => {
    // Navigate to root
    if (index === 0) {
      setCurrentFolder(null);
      setFolderPath([]);
      setFiles([]); // Ensure files list is cleared
      fetchFolders(); // Fetch and display root folders
      updateFolderUsageChartData();
      fetchAllFiles();
      return;
    }

    // Navigate based on breadcrumb index
    const newPath = folderPath.slice(0, index + 1);
    setFolderPath(newPath);

    const clickedFolderId = newPath[index].id;
    const clickedFolderDetails = await fetchFolderDetails(clickedFolderId);
    if (clickedFolderDetails) {
      setCurrentFolder(clickedFolderDetails);
      fetchSubfoldersAndFiles(clickedFolderId);
    } else {
      // Handle case where folder details could not be fetched
      console.error("Failed to fetch folder details.");
    }
  };

  const deleteFolder = async (folderId) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this folder?"
    );
    if (isConfirmed) {
      try {
        await deleteDoc(doc(db, "folders", folderId));

        // If it's a subfolder, update the currentFolder's subfolders state
        if (currentFolder) {
          const updatedSubfolders = currentFolder.subfolders.filter(
            (folder) => folder.id !== folderId
          );
          setCurrentFolder({ ...currentFolder, subfolders: updatedSubfolders });
        } else {
          // If it's a root folder, update the folders state
          setFolders((prevFolders) =>
            prevFolders.filter((folder) => folder.id !== folderId)
          );
        }
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
        toast.error("Error deleting folder");
      }
    } else {
      console.log("Folder deletion cancelled.");
    }
  };

  const deleteFile = async (fileId) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this file?"
    );
    if (isConfirmed) {
      try {
        await deleteDoc(doc(db, "files", fileId));
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
        toast.error("Error deleting file");
      }
    }
  };

  function truncateFileName(fileName, maxLength = 20) {
    if (fileName.length <= maxLength) return fileName;
    const extension = fileName.substring(fileName.lastIndexOf(".") + 1);
    const baseName = fileName.substring(0, fileName.lastIndexOf("."));
    if (baseName.length <= maxLength - (extension.length + 3)) {
      return fileName;
    }
    return `${baseName.substring(
      0,
      maxLength - (extension.length + 3)
    )}...${extension}`;
  }

  //Update the foldername
  const handleEditFolder = async (e) => {
    e.preventDefault();
    if (!editingFolder || editedFolderName.trim() === "") return;
  
    try {
      const folderRef = doc(db, "folders", editingFolder.id);
      await updateDoc(folderRef, {
        name: editedFolderName,
      });
  
      // Update the local state to reflect the change
      setFolders((prevFolders) =>
        prevFolders.map((folder) =>
          folder.id === editingFolder.id ? { ...folder, name: editedFolderName } : folder
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
    } catch (error) {
      console.error("Error updating folder name: ", error);
      toast.error("Error updating folder name");
    }
  
    setEditModalOpen(false);
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
                          "rgba(54, 162, 235, 0.6)",
                          "rgba(201, 203, 207, 0.6)",
                        ],
                        borderColor: [
                          "rgba(54, 162, 235, 1)",
                          "rgba(201, 203, 207, 1)",
                        ],
                        borderWidth: 1,
                      },
                    ],
                  }}
                  options={{
                    circumference: 180,
                    rotation: -90,
                    cutout: "80%",
                    maintainAspectRatio: false,
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
              onClick={() => handleBreadcrumbClick(0)}
            >
              Root
            </span>
            {folderPath.map((folder, index) => (
              <React.Fragment key={folder.id}>
                <span> / </span>
                <span
                  style={{ color: "blue" }}
                  className="breadcrumb-item cursor-pointer"
                  onClick={() => handleBreadcrumbClick(index + 1)}
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
            onChange={handleFileChange}
          />
        </div>

        <div className="mx-12 text-center mb-5">
            {/* Folder List */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-5">
              {(currentFolder ? currentFolder.subfolders : folders).map((folder) => {
                // Find the usage data for this folder
                const usageData = folderUsageChartData.find(data => data.folderName === folder.name);
                const filePercentage = usageData ? usageData.usagePercentage.toFixed(0) : '0'; // Default to '0' if not found

                return (
                  <div
                    key={folder.id}
                    className="group cursor-pointer p-4 border border-gray-200 rounded-lg hover:shadow-lg flex flex-col items-center justify-center space-y-2"
                    onClick={() => handleFolderDoubleClick(folder)}
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
                        onClick={(eveny) => {
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
                        onClick={(event) => {
                          event.stopPropagation();
                          deleteFolder(folder.id);
                        }}
                        title="Delete Folder"
                      >
                        <Trash className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
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
                      onClick={() => deleteFile(file.id)}
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
                  onClick={handleEditFolder}
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
