import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate instead of useHistory
import FileView from '@/components/home/file.view';
import Header from '@/components/home/home.header';
import SideMenu from '@/components/layout/side-menu';
import TopNavigation from '@/components/layout/top-nav';

const Home = () => {
  const navigate = useNavigate(); // Create navigate object using useNavigate
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

  const navigateToRoot = () => {
    navigate('/home'); // Use navigate function for navigation
  };

  return (
    <div className='flex h-screen mx-1 bg-[#f8fafd]'>
      <SideMenu />
      <div className='flex flex-col flex-1 '>
        <TopNavigation navigateToRoot={navigateToRoot} />
        <div className='flex flex-col flex-1'>
          {/* Main Content */}
          <div className='flex flex-col flex-1' style={{ scrollbarWidth: 'thin' }}>
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
