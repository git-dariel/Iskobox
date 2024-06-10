import React, { useState, useEffect } from 'react';
import { fetchFolders } from '../../services/folders/folder.service';
import { fetchFilesInFolder } from '../../services/files/file-service';
import { fetchFoldersForUser } from '../../services/folders/folder.service';
import FileItem from './file.item';
import FolderItem from './folder.item';
import { useUpdate } from '@/helpers/update.context';
import { useAuth } from '@/helpers/auth.context';

const FileView = ({ selectedView, isGridView, currentFolderId }) => {
  const [files, setFiles] = useState([]);
  const [folders, setFolders] = useState([]);
  const { updateCount } = useUpdate();
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      if (currentUser) {
        if (currentUser.role === 'Admin') {
          if (selectedView === 'folders') {
            const fetchedFolders = await fetchFolders(currentFolderId);
            setFolders(fetchedFolders);
          } else if (selectedView === 'files') {
            const fetchedFiles = await fetchFilesInFolder(currentFolderId);
            setFiles(fetchedFiles);
          }
        } else if (currentUser.role === 'Faculty') {
          const testData = await fetchFoldersForUser(currentUser.email);
          if (selectedView === 'folders') {
            setFolders(testData.folders);
          } else if (selectedView === 'files') {
            setFiles(testData.files);
          }
        }
      }
    };

    fetchData();
  }, [updateCount, currentUser, selectedView, currentFolderId]);

  return (
    <div className='mt-4'>
      {selectedView === 'files' && (
        <div>
          <h2 className='text-sm m-2'>Files</h2>
          <div
            className={`${
              isGridView
                ? 'grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center justify-center'
                : ' '
            }`}
          >
            {files.length > 0 ? (
              files.map((file) => <FileItem key={file.id} file={file} isGridView={isGridView} />)
            ) : (
              <div className='flex flex-col flex-1 items-center justify-center mt-10'>
                No files found.
              </div>
            )}
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
            }`}
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
              <div className='flex flex-col flex-1 items-center justify-center mt-10'>
                No folders found.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FileView;
