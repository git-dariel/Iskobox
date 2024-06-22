import React, { useState, useEffect } from "react";
import { Pie, Bar } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import Cards from "@/components/dashboard/cards";
import UserDropdown from "@/components/users/user-profile";
import LoadingCards from "@/components/lazy-loading/loading.cards";
import LoadingProgressBar from "@/components/lazy-loading/loading.progressbar";
import LoadingPie from "@/components/lazy-loading/loading.pie";
import { getDashboardCardData } from "@/configs/mocked.config";
import { barData, pieData } from "@/configs/dashboard.test.data.config";
import RoundedContainer from "@/components/layout/rounded.container";
import ProgressBar from "@/components/dashboard/progress.bar";
import { countAllFiles } from "@/services/files/file-service";
import {
  countAllFolders,
  countPendingFilesInFolders,
  countCompletedFilesInFolders,
  calculateOverallProgress,
  countFilesInRootFolders,
} from "@/services/folders/folder.service";

// Register the required components for Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

function DashboardContent() {
  const [cardData, setCardData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [overallProgress, setOverallProgress] = useState(0);
  const [pieChartData, setPieChartData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const totalFiles = await countAllFiles();
      const totalFolders = await countAllFolders();
      const data = await getDashboardCardData(totalFiles, totalFolders);
      setCardData(data);

      const progressData = await calculateOverallProgress();
      setOverallProgress(progressData.progressPercentage.replace("%", ""));

      const rootFolderData = await countFilesInRootFolders();
      updatePieChartData(rootFolderData);
      setIsLoading(false);
    };
    fetchData();

    const unsubscribePending = countPendingFilesInFolders((pendingFiles) => {
      setCardData((prevData) => {
        const newData = prevData.map((card) => {
          if (card.title === "Pending Files") {
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
          if (card.title === "Completed Files") {
            return { ...card, value: completedFiles };
          }
          return card;
        });
        return newData;
      });
    });

    return () => {
      if (typeof unsubscribePending === "function") {
        unsubscribePending();
      }
      if (typeof unsubscribeCompleted === "function") {
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
          label: "Number of Uploaded Files",
          data,
          backgroundColor: [
            "rgba(255, 179, 186, 0.6)", // Pastel Red
            "rgba(255, 223, 186, 0.6)", // Pastel Orange
            "rgba(255, 255, 186, 0.6)", // Pastel Yellow
            "rgba(186, 255, 201, 0.6)", // Pastel Green
            "rgba(186, 225, 255, 0.6)", // Pastel Blue
            "rgba(196, 178, 255, 0.6)", // Pastel Purple
            "rgba(255, 178, 255, 0.6)", // Pastel Pink
            "rgba(234, 255, 208, 0.6)", // Pastel Mint
            "rgba(255, 218, 193, 0.6)", // Pastel Peach
            "rgba(255, 253, 208, 0.6)", // Pastel Lemon
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
            "rgba(199, 199, 199, 1)",
            "rgba(163, 204, 255, 1)",
            "rgba(255, 105, 180, 1)",
            "rgba(255, 165, 0, 1)",
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
        position: "top",
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
        position: "top",
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
      class="flex flex-col h-screen w-full relative bg-gradient-to-tl from-slate-50 to-slate-400 overflow-y-auto"
      style={{ scrollbarWidth: "none" }}
    >
      <div
        className="flex flex-col h-full p-4 rounded-2xl overflow-y-auto scroll-m-0 md:m-5 md:mb-0 mb-12"
        style={{ background: "rgba(255, 255, 255, 0.54)", scrollbarWidth: "none" }}
      >
        <div class="flex justify-between gap-2 mb-1">
          <h1 class="text-xl md:text-2xl font-bold text-gray-800 mb-1">Dashboard</h1>
          <div className="relative">
            <UserDropdown />
          </div>
        </div>
        {isLoading ? <LoadingCards /> : <Cards data={cardData} />}
        <div className="flex flex-col md:flex-row gap-4">
          <RoundedContainer>
            {isLoading ? <LoadingProgressBar /> : <ProgressBar progress={overallProgress} />}
          </RoundedContainer>
          <RoundedContainer>
            <div className="flex w-full h-48 sm:h-64 md:h-96">
              {isLoading ? <LoadingPie /> : <Pie data={pieChartData} options={pieOptions} />}
            </div>
          </RoundedContainer>
        </div>
      </div>
    </div>
  );
}

export default DashboardContent;
