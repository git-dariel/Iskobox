import React, { useState, useEffect } from 'react';
import SideMenu from '../layout/side-menu';
import TopNavigation from '../layout/top-nav';
import Header from './home.header';
import { fetchFolders, processFolder } from '../../services/folders/folder.service';
import FolderItem from './folder.item';
import NewFolderForm from '../modals/new.folder';

const FolderOpen = () => {
  const [selectedView, setSelectedView] = useState(localStorage.getItem('selectedView') || 'files');
  const [isGridView, setIsGridView] = useState(
    localStorage.getItem('isGridView') === 'true' || false
  );
  const [folderStack, setFolderStack] = useState([]);
  const [folderContents, setFolderContents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentFolderId, setCurrentFolderId] = useState(null);

  useEffect(() => {
    fetchFolderContents(null);
  }, []);

  const fetchFolderContents = async (folderId) => {
    setIsLoading(true);
    try {
      const folders = await fetchFolders(folderId);
      const processedFolders = folders.map((folder) => processFolder(folder));
      setFolderContents(processedFolders);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching folders:', error);
      setIsLoading(false);
    }
  };

  const handleFolderDoubleClick = (folderId) => {
    setCurrentFolderId(folderId);
    setFolderStack([...folderStack, folderId]);
    fetchFolderContents(folderId);
  };

  const handleViewChange = (view) => {
    setSelectedView(view);
    localStorage.setItem('selectedView', view);
  };

  const toggleView = () => {
    const newGridView = !isGridView;
    setIsGridView(newGridView);
    localStorage.setItem('isGridView', newGridView.toString());
  };

  const navigateBack = () => {
    if (folderStack.length > 1) {
      const previousFolderId = folderStack.pop();
      fetchFolderContents(previousFolderId).then((folders) => {
        setFolderContents(folders);
      });
    } else {
      setFolderStack([]);
      setFolderContents([]);
    }
    setFolderStack([...folderStack]);
  };

  return (
    <div className='flex h-screen mx-1 bg-[#f8fafd]'>
      <SideMenu />
      <div className='flex flex-col flex-1 '>
        <TopNavigation />
        <div className='flex flex-col flex-1'>
          <div className='flex flex-col flex-1' style={{ scrollbarWidth: 'thin' }}>
            <Header
              selectedButton={selectedView}
              handleButtonClick={handleViewChange}
              isGridView={isGridView}
              toggleView={toggleView}
              navigateBack={navigateBack}
              currentFolderId={currentFolderId}
              setFolders={setFolderContents}
            />
            {isLoading ? (
              <div className='flex flex-col flex-1 items-center justify-center'>Loading...</div>
            ) : (
              <div>
                {folderContents.length === 0 ? (
                  <div className='flex flex-col flex-1 items-center justify-center'>
                    This folder is empty.
                  </div>
                ) : (
                  <div className='flex flex-col flex-1'>
                    {folderContents.map((folder) => (
                      <FolderItem
                        key={folder.id}
                        folder={folder}
                        isGridView={isGridView}
                        onDoubleClick={handleFolderDoubleClick}
                        usagePercentage={folder.usagePercentage}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FolderOpen;
