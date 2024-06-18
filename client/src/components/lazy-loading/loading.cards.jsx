import React from 'react';

function LoadingCards() {
  return (
    <section className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={index}
          className='bg-gray-100 p-4 rounded-lg shadow-md mb-4 flex items-center relative animate-pulse'
        >
          <div className='w-4 h-4 absolute top-0 right-0 mt-1 mr-2 bg-gray-300 rounded-full' />
          <div className='p-1'>
            <div className='bg-gray-300 h-4 w-3/4 rounded mb-2' />
            <div className='bg-gray-400 h-6 w-1/2 rounded mb-1' />
            <div className='bg-gray-300 h-3 w-full rounded' />
          </div>
        </div>
      ))}
    </section>
  );
}

export default LoadingCards;
