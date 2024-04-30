import React, { useState, useEffect, useRef } from 'react';
import SideMenu from '../layout/side-menu';
import TopNavigation from '../layout/top-nav';
import Header from './home.header';
import { fetchFolders, processFolder } from '../../services/folders/folder.service'; // Import processFolder
import FolderItem from './folder.item';

const FolderOpen = () => {
  const [selectedView, setSelectedView] = useState(localStorage.getItem('selectedView') || 'files');
  const [isGridView, setIsGridView] = useState(localStorage.getItem('isGridView') === 'true' || false);
  const [folderStack, setFolderStack] = useState([]); 
  const [folderContents, setFolderContents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const hasFetchedRootFolders = useRef(false);

  useEffect(() => {
    if (!hasFetchedRootFolders.current) {
      console.log("Component mounted, fetching root folders");
      fetchFolderContents(null);
      hasFetchedRootFolders.current = true;
    }
  }, []);

  const fetchFolderContents = async (folderId) => {
    setIsLoading(true);
    try {
      const folders = await fetchFolders(folderId);
      const processedFolders = folders.map(folder => processFolder(folder));
      console.log("Fetched and processed folders:", processedFolders); 
      setFolderContents(processedFolders);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching folders:', error);
      setIsLoading(false);
    }
  };

  const handleFolderDoubleClick = (folderId) => {
    console.log("Double clicked folder ID:", folderId);
    setFolderStack(currentStack => {
      if (!currentStack.includes(folderId)) {
        console.log("Current stack before adding new folder:", currentStack);
        const newStack = [...currentStack, folderId];
        fetchFolderContents(folderId);
        return newStack;
      }
      return currentStack;
    });
  };

  // const handleFolderDoubleClick = (folderId) => {
  //   setFolderStack([...folderStack, folderId]);
  //   fetchFolderContents(folderId);
  // };

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
    setFolderStack(currentStack => {
      if (currentStack.length > 1) {
        const newStack = currentStack.slice(0, -1);
        console.log("New stack after pop:", newStack);
        fetchFolderContents(newStack[newStack.length - 1]);
        return newStack;
      } else if (currentStack.length === 1) {
        console.log("Navigating back to root");
        fetchFolderContents(null);
        return [];
      }
      return currentStack; // Return current stack if already at root to prevent unnecessary fetch
    });
  };

  // const navigateBack = () => {
  //   if (folderStack.length > 1) {
  //     const previousFolderId = folderStack.pop(); 
  //     fetchFolderContents(previousFolderId).then((folders) => {
  //       setFolderContents(folders);
  //     });
  //   } else {
  //     setFolderStack([]); 
  //     setFolderContents([]); 
  //   }
  //   setFolderStack([...folderStack]);
  // };

  return (
    <div className='flex h-screen mx-1 bg-[#f8fafd]'>
      {console.log("Rendering FolderOpen")}
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
                        usagePercentage={folder.usagePercentage} // Pass usage percentage to FolderItem
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