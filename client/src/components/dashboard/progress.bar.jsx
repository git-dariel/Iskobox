import React from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { ResponsiveContainer } from 'recharts';

const ProgressBar = ({ progress }) => {
  return (
    <div className='w-full'>
      <h2 className='text-xl font-bold mb-1 text-gray-800'>Overall Progress</h2>
      <div className='flex m-2 mt-7 items-center justify-center w-full'>
        <CircularProgressbar
          value={progress}
          text={`${progress}%`}
          styles={{
            root: {
              width: '320px',
              filter: 'drop-shadow(0px 0px 10px rgba(50, 50, 50, 0.7))',
            },
            path: {
              stroke: '#2d3748',
              strokeLinecap: 'round',
              transition: 'stroke-dashoffset 0.5s ease 0s',
            },
            trail: { stroke: 'none' },
            text: {
              fill: '#2d3748',
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

export default ProgressBar;
