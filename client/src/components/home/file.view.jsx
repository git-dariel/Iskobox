import React, { useState, useEffect } from 'react';
import { fetchFolders } from '../../services/folders/folder.service';
import { fetchFoldersForUser } from '../../services/folders/folder.service';
import { fetchAllFiles, fetchFilesInFolder } from '../../services/files/file-service';
import FileItem from './file.item';
import FolderItem from './folder.item';
import { useUpdate } from '@/helpers/update.context';
import { useAuth } from '@/helpers/auth.context';
import CommentForm from '../comment/commentform';

const FileView = ({ selectedView, isGridView, currentFolderId }) => {
  const [files, setFiles] = useState([]);
  const [folders, setFolders] = useState([]);
  const [openedFolders, setOpenedFolders] = useState([]);
  const { updateCount } = useUpdate();
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      const effectiveFolderId = currentFolderId === undefined ? null : currentFolderId;

      if (currentUser && currentUser.role === 'Admin') {
        const fetchedFolders = await fetchFolders(effectiveFolderId);
        console.log('Admin folders:', fetchedFolders);
        setFolders(fetchedFolders);
        if (currentFolderId) {
          const fetchedFiles = await fetchFilesInFolder(currentFolderId);
          setFiles(fetchedFiles);
        } else {
          const allFiles = await fetchAllFiles();
          setFiles(allFiles);
        }
      } else if (currentUser && currentUser.role === 'Faculty') {
        const testData = await fetchFoldersForUser(currentUser.email);
        console.log('Folders and files for current user:', testData);
        setFolders(testData.folders);
        setFiles(testData.files);
      }
    };

    fetchData();
  }, [currentFolderId, updateCount, currentUser]);

  const handleFolderDoubleClick = (folderId) => {
    if (!openedFolders.includes(folderId)) {
      setOpenedFolders([...openedFolders, folderId]);
    }
  };

  return (
    <div className='mt-4'>
      {selectedView === 'files' && (
        <div className='ml-3'>
          <h2 className='text-sm m-2'>Files</h2>
          <div
            className={`${
              isGridView
                ? 'grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center justify-center'
                : ' '
            } `}
          >
            {files.length > 0 ? (
              files.map((file) => <FileItem key={file.id} file={file} isGridView={isGridView} />)
            ) : (
              <div className='flex flex-col flex-1 items-center justify-center mt-10'>Empty</div>
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
              <div className='flex flex-col flex-1 items-center justify-center mt-10'>Empty</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FileView;
