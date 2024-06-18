import React, { useState, useEffect } from 'react';
import { Pie, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import Cards from '@/components/dashboard/cards';
import { getDashboardCardData } from '@/configs/mocked.config';
import { barData, pieData } from '@/configs/dashboard.test.data.config';
import RoundedContainer from '@/components/layout/rounded.container';
import ProgressBar from '@/components/dashboard/progress.bar';
import { countAllFiles } from '@/services/files/file-service';
import {
  countAllFolders,
  countPendingFilesInFolders,
  countCompletedFilesInFolders,
} from '@/services/folders/folder.service';

// Register the required components for Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

function DashboardContent() {
  const [cardData, setCardData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const totalFiles = await countAllFiles();
      const totalFolders = await countAllFolders();
      const data = await getDashboardCardData(totalFiles, totalFolders);
      setCardData(data);
    };
    fetchData();

    const unsubscribePending = countPendingFilesInFolders((pendingFiles) => {
      setCardData((prevData) => {
        const newData = prevData.map((card) => {
          if (card.title === 'Pending Files') {
            return { ...card, value: pendingFiles };
          }
          return card;
        });
        return newData;
      });
    });

    const unsubscribeCompleted = countCompletedFilesInFolders((completedFiles) => {
      setCardData((prevData) => {
        const newData = prevData.map((card) => {
          if (card.title === 'Completed Files') {
            return { ...card, value: completedFiles };
          }
          return card;
        });
        return newData;
      });
    });

    return () => {
      if (typeof unsubscribePending === 'function') {
        unsubscribePending();
      }
      if (typeof unsubscribeCompleted === 'function') {
        unsubscribeCompleted();
      }
    };
  }, []);

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        enabled: true,
      },
    },
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        enabled: true,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div
      className='flex flex-wrap w-full h-screen overflow-y-auto'
      style={{ scrollbarWidth: 'none' }}
    >
      <div className='flex flex-col w-full md:w-2/3 p-4 gap-4'>
        <Cards data={cardData} />
        <div className='flex flex-col gap-4'>
          <RoundedContainer>
            <div className='flex w-full h-64 md:h-96'>
              <Bar data={barData} options={barOptions} />
            </div>
          </RoundedContainer>
          <RoundedContainer>
            <div className='flex w-full h-64 md:h-96'>
              <Bar data={barData} options={barOptions} />
            </div>
          </RoundedContainer>
        </div>
      </div>
      <div className='flex flex-col w-full md:w-1/3 p-4 gap-4'>
        <RoundedContainer>
          <ProgressBar />
        </RoundedContainer>
        <RoundedContainer>
          <div className='flex w-full h-64 md:h-96'>
            <Pie data={pieData} options={pieOptions} />
          </div>
        </RoundedContainer>
      </div>
    </div>
  );
}

export default DashboardContent;
