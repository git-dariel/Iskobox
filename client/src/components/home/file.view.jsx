import React, { useState, useEffect } from 'react';
import { fetchFolders } from '../../services/folders/folder.service';
import { fetchAllFiles, fetchFilesInFolder } from '../../services/files/file-service';
import FileItem from './file.item';
import FolderItem from './folder.item';

const FileView = ({ selectedView, isGridView, currentFolderId }) => {
  const [files, setFiles] = useState([]);
  const [folders, setFolders] = useState([]);
  const [openedFolders, setOpenedFolders] = useState([]);

  const handleFolderDoubleClick = (folderId) => {
    if (!openedFolders.includes(folderId)) {
      setOpenedFolders([...openedFolders, folderId]);
      console.log('Open folder:', folderId);
    }
  };

  useEffect(() => {
    console.log('Current Folder ID:', currentFolderId); // Debugging line
    if (currentFolderId) {
      fetchFilesInFolder(currentFolderId).then((fetchedFiles) => {
        console.log('Files fetched:', fetchedFiles); // Debugging line
        setFiles(fetchedFiles);
      });
    } else {
      fetchAllFiles().then(setFiles);
    }
    fetchFolders().then(setFolders);
  }, [currentFolderId]);

  return (
    <div className='mt-4'>
      {selectedView === 'files' && (
        <div>
          <h2 className='text-sm m-2'>Files</h2> {/* Updated from "Name" to "Files" */}
          <div
            className={`${
              isGridView
                ? 'grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center justify-center'
                : ' '
            } `}
          >
            {files.map((file) => (
              <FileItem key={file.id} file={file} isGridView={isGridView} />
            ))}
          </div>
        </div>
      )}

      {selectedView === 'folders' && (
        <div>
          <h2 className='text-sm m-2'>Folders</h2>
          <div
            className={`${
              isGridView
                ? 'grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center justify-center'
                : ' '
            } `}
          >
            {folders.map((folder) => (
              <FolderItem
                key={folder.id}
                folder={folder}
                isGridView={isGridView}
                onDoubleClick={() => handleFolderDoubleClick(folder.id)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FileView;
