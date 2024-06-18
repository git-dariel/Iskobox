import React from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const LoadingProgressBar = () => {
  return (
    <div className='w-full'>
      <h2 className='text-xl font-bold mb-1 text-gray-800'>Loading Progress...</h2>
      <div className='flex m-2 mt-7 items-center justify-center w-full animate-pulse'>
        <CircularProgressbar
          value={50} // Static value for visual effect
          styles={{
            root: {
              width: '320px',
              filter: 'drop-shadow(0px 0px 10px rgba(50, 50, 50, 0.5))',
            },
            path: {
              stroke: '#ccc', // Lighter color to indicate loading
              strokeLinecap: 'round',
              transition: 'stroke-dashoffset 0.5s ease 0s',
            },
            trail: {
              stroke: '#eee',
              strokeLinecap: 'round',
              transform: 'rotate(0.25turn)',
              transformOrigin: 'center center',
            },
            text: {
              fill: '#aaa', // Lighter color to indicate loading
              fontSize: 20,
              dominantBaseline: 'middle',
              textAnchor: 'middle',
            },
          }}
        />
      </div>
    </div>
  );
};

export default LoadingProgressBar;
