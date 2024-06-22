import { useAuth } from "@/helpers/auth.context";
import React, { useEffect, useState } from "react";
import { fetchAllFiles, fetchFilesInFolder } from "../../services/files/file-service";
import { fetchFolders, fetchFoldersForUser } from "../../services/folders/folder.service";
import FileItem from "./file.item";
import FolderItem from "./folder.item";
import { useUpdate } from "@/helpers/update.context";

const FileView = ({ selectedView, isGridView, currentFolderId }) => {
  const [files, setFiles] = useState([]);
  const [folders, setFolders] = useState([]);
  const [openedFolders, setOpenedFolders] = useState([]);
  const { currentUser } = useAuth();
  const { updateCount } = useUpdate();

  useEffect(() => {
    const fetchData = async () => {
      if (currentUser && currentUser.role === "Admin") {
        const fetchedFolders = await fetchFolders(currentFolderId);
        setFolders(fetchedFolders);
        const fetchedFiles = await fetchFilesInFolder(currentFolderId);
        setFiles(fetchedFiles);
        if (currentFolderId) {
          const fetchedFiles = await fetchFilesInFolder(currentFolderId);
          setFiles(fetchedFiles);
        } else {
          const allFiles = await fetchAllFiles();
          setFiles(allFiles);
        }
      } else if (currentUser && currentUser.role === "Faculty") {
        const testData = await fetchFoldersForUser(currentUser.email, currentFolderId);
        setFolders(testData.folders);
        setFiles(testData.files);
      }
    };

    fetchData();
  }, [currentFolderId, currentUser, updateCount]);

  const handleFolderDoubleClick = (folderId) => {
    if (!openedFolders.includes(folderId)) {
      setOpenedFolders([...openedFolders, folderId]);
    }
  };

  return (
    <div className="mt-4">
      {selectedView === "files" && (
        <div className="ml-3">
          <h2 className="text-sm m-2">Files</h2>
          <div
            className={`${
              isGridView
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center justify-center"
                : " "
            } `}
          >
            {files.length > 0 ? (
              files.map((file) => <FileItem key={file.id} file={file} isGridView={isGridView} />)
            ) : (
              <div className="flex flex-col flex-1 items-center justify-center mt-10">Empty</div>
            )}
          </div>
        </div>
      )}

      {selectedView === "folders" && (
        <div className="ml-2">
          <h2 className="text-sm m-2">Folders</h2>
          <div
            className={`${
              isGridView
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center justify-center"
                : " "
            } `}
          >
            {folders.length > 0 ? (
              folders.map((folder) => (
                <FolderItem
                  key={folder.id}
                  folder={folder}
                  isGridView={isGridView}
                  onDoubleClick={() => handleFolderDoubleClick(folder.id)}
                />
              ))
            ) : (
              <div className="flex flex-col flex-1 items-center justify-center mt-10">Empty</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FileView;
