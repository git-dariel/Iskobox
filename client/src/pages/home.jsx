import React, { useState } from 'react';
import SideBar from '@/components/layout/SideBar';
import FileView from '@/components/home/file.view';
import Header from '@/components/home/home.header';
import TopNavigation from '@/components/layout/top-nav';

const Home = () => {
  const [selectedView, setSelectedView] = useState(localStorage.getItem('selectedView') || 'files');
  const [isGridView, setIsGridView] = useState(
    localStorage.getItem('isGridView') === 'true' || false
  );

  const handleViewChange = (view) => {
    setSelectedView(view);
    localStorage.setItem('selectedView', view);
  };

  const toggleView = () => {
    const newGridView = !isGridView;
    setIsGridView(newGridView);
    localStorage.setItem('isGridView', newGridView.toString());
  };

  return (
    <div className='flex w-full h-screen'>
      <SideBar />
      <div className='flex flex-col flex-1 '>
        <TopNavigation />
        <div className='flex flex-col flex-1'>
          <div className='flex flex-col flex-1' style={{ scrollbarWidth: 'thin' }}>
            <Header
              selectedButton={selectedView}
              handleButtonClick={handleViewChange}
              isGridView={isGridView}
              toggleView={toggleView}
            />
            <div className='flex h-full overflow-hidden'>
              <div className='flex flex-col flex-1 bg-white w-[70%] '>
                <FileView selectedView={selectedView} isGridView={isGridView} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
