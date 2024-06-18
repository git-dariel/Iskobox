import React from 'react';
import { Pie } from 'react-chartjs-2';

const LoadingPie = () => {
  const data = {
    labels: ['Loading...'],
    datasets: [
      {
        data: [100],
        backgroundColor: ['#e2e3e5'],
        borderColor: ['#cbccce'],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
  };

  return (
    <div className='flex w-full h-64 md:h-96 animate-pulse'>
      <Pie data={data} options={options} />
    </div>
  );
};

export default LoadingPie;
