import React, { useEffect, useRef, useState } from "react";

const NewFolderForm = ({ onClose, onCreateFolder, setFolders }) => {
  const modalRef = useRef(null);
  const [folderName, setFolderName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreateFolder(folderName)
      .then((newFolder) => {
        // Update folders array in parent component
        setFolders((prevFolders) => [...prevFolders, newFolder]);
      })
      .catch((error) => {
        // Handle error
        console.error(error);
      });
    onClose();
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 flex items-center justify-center p-4 bg-gray-500 bg-opacity-75 transition-opacity duration-300 ease-in-out">
      <div
        ref={modalRef}
        className="bg-white rounded-md shadow-lg max-w-sm lg:max-w-xl w-full overflow-hidden"
      >
        <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            Create New Folder
          </h3>
        </div>
        <form onSubmit={handleSubmit} className="px-4 py-5 space-y-6 sm:p-6">
          <div className="flex flex-col">
            <label
              htmlFor="folderName"
              className="block text-sm font-medium text-gray-700"
            >
              Folder Name
            </label>
            <input
              type="text"
              id="folderName"
              value={folderName}
              onChange={(e) => setFolderName(e.target.value)}
              className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md px-3 py-2"
              placeholder="Enter folder name"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="inline-flex items-center px-2 py-1 border border-transparent rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewFolderForm;
