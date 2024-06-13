import React from 'react';
import { NavLink } from 'react-router-dom';
import { BarChart3, BarChartBig, LayoutDashboard, Home } from 'lucide-react';

function SideBar() {
  return (
    <div className='hidden md:flex flex-col min-w-64'>
      <div className='flex items-center justify-center h-16 bg-gray-800'>
        <span className='mx-5 w-full mt-5 font-semibold text-xl text-gray-100'>Iskobox</span>
      </div>
      <div className='flex flex-col flex-1 relative '>
        <nav
          className='flex-1 py-4 bg-gray-800 overflow-y-auto'
          style={{ maxHeight: '100vh', scrollbarWidth: 'thin' }}
        >
          <NavLink
            to='/'
            className='flex items-center px-4 py-2 pb-5 text-base text-gray-100 hover:text-gray-400'
          >
            <Home className='h-6 w-6  mr-2' /> Home
          </NavLink>
          <div>
            <NavLink
              to='/dashboard'
              className='flex items-center px-4 py-2 pb-5 text-sm text-gray-100 hover:text-gray-400'
            >
              <LayoutDashboard className='h-6 w-6 mr-2' /> Dashboard
            </NavLink>
            <NavLink
              to='/dashboard/'
              className='flex items-center px-4 py-2 pb-5 text-sm text-gray-100 hover:text-gray-400'
            >
              <BarChart3 className='h-6 w-6 mr-2' /> Number of Completed Files
            </NavLink>
            <NavLink
              to='/dashboard/'
              className='flex items-center px-4 py-2 pb-5 text-sm text-gray-100 hover:text-gray-400'
            >
              <BarChartBig className='h-6 w-6 mr-2' /> Number of Pending Files
            </NavLink>
          </div>
        </nav>
      </div>
    </div>
  );
}

export default SideBar;
