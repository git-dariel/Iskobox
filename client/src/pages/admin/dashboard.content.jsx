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
  calculateOverallProgress,
  countFilesInRootFolders,
} from '@/services/folders/folder.service';
import UserDropdown from '@/components/users/user-profile';

// Register the required components for Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

function DashboardContent() {
  const [cardData, setCardData] = useState([]);
  const [overallProgress, setOverallProgress] = useState(0);
  const [pieChartData, setPieChartData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    const fetchData = async () => {
      const totalFiles = await countAllFiles();
      const totalFolders = await countAllFolders();
      const data = await getDashboardCardData(totalFiles, totalFolders);
      setCardData(data);
      const progressData = await calculateOverallProgress();
      setOverallProgress(progressData.progressPercentage.replace('%', ''));

      const rootFolderData = await countFilesInRootFolders();
      updatePieChartData(rootFolderData);
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

  const updatePieChartData = (rootFolderData) => {
    const labels = rootFolderData.map((folder) => folder.folderName);
    const data = rootFolderData.map((folder) => folder.totalFiles);

    setPieChartData({
      labels,
      datasets: [
        {
          label: 'Number of Uploaded Files',
          data,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
          ],
          borderWidth: 1,
        },
      ],
    });
  };

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
      class='flex flex-col h-screen w-full relative bg-gradient-to-tl from-slate-50 to-slate-400 overflow-y-auto'
      style={{ scrollbarWidth: 'none' }}
    >
      <div
        className='flex flex-col h-full m-5 p-4 rounded-2xl overflow-y-auto scroll-m-0'
        style={{ background: 'rgba(255, 255, 255, 0.54)', scrollbarWidth: 'none' }}
      >
        <div class='flex justify-between gap-2 mb-1'>
          <h1 class='text-2xl font-bold text-gray-800 mb-1'>Dashboard</h1>
          <div className='relative'>
            <UserDropdown />
          </div>
        </div>
        <Cards data={cardData} />
        <div className='flex flex-col gap-4'>
          <div className='flex gap-5'>
            <RoundedContainer>
              <ProgressBar progress={overallProgress} />
            </RoundedContainer>
            <RoundedContainer>
              <div className='flex w-full h-64 md:h-96'>
                <Pie data={pieChartData} options={pieOptions} />
              </div>
            </RoundedContainer>
          </div>

          {/* <RoundedContainer>
            <div className='flex w-full h-64 md:h-96'>
              <Bar data={barData} options={barOptions} />
            </div>
          </RoundedContainer>
          <RoundedContainer>
            <div className='flex w-full h-64 md:h-96'>
              <Bar data={barData} options={barOptions} />
            </div>
          </RoundedContainer> */}
        </div>
      </div>
      {/* <div className='flex flex-col w-full md:w-1/3 p-4 gap-4'>
        <RoundedContainer>
          <ProgressBar />
        </RoundedContainer>
        <RoundedContainer>
          <div className='flex w-full h-64 md:h-96'>
            <Pie data={pieData} options={pieOptions} />
          </div>
        </RoundedContainer>
      </div> */}
    </div>
  );
}

export default DashboardContent;
