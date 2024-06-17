import React, { useState } from 'react';
import SideBar from '@/components/layout/SideBar';
import FileView from '@/components/home/file.view';
import Header from '@/components/home/home.header';

const Home = () => {
  const [selectedView, setSelectedView] = useState('folders');
  const [isGridView, setIsGridView] = useState(
    localStorage.getItem('isGridView') === 'true' || false
  );
  const [currentFolderId, setCurrentFolderId] = useState(null);

  const handleViewChange = (view) => {
    setSelectedView(view);
    setCurrentFolderId(null);
  };

  const toggleView = () => {
    const newGridView = !isGridView;
    setIsGridView(newGridView);
    localStorage.setItem('isGridView', newGridView.toString());
  };

  return (
    <div className='flex w-full h-screen'>
      <SideBar />
      <div className='flex flex-col flex-1'>
        <div className='flex flex-col flex-1'>
          <div className='flex flex-col flex-1 overflow-hidden'>
            <Header
              selectedButton={selectedView}
              handleButtonClick={handleViewChange}
              isGridView={isGridView}
              toggleView={toggleView}
            />

            <div className='flex h-[72vh]'>
              <div className='flex flex-col flex-1 bg-white w-[70%] overflow-hidden'>
                <div className='flex-1 overflow-auto'>
                  <FileView
                    selectedView={selectedView}
                    isGridView={isGridView}
                    currentFolderId={currentFolderId}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
