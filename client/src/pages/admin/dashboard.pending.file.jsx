import RoundedContainer from "@/components/layout/rounded.container";
import UserDropdown from "@/components/users/user-profile";
import SideBar from "@/components/layout/SideBar";
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import { fetchEmptySubfoldersPerRootFolder } from "@/services/folders/folder.service";
import React, { useEffect, useState, useMemo } from "react";
import { Bar } from "react-chartjs-2";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Register the required components for Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

function DashboardPending() {
  const [rootFolders, setRootFolders] = useState([]);
  const [selectedRootFolder, setSelectedRootFolder] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedFolders = await fetchEmptySubfoldersPerRootFolder();
        setRootFolders(fetchedFolders);
      } catch (error) {
        console.error("Error fetching empty subfolders:", error);
      }
    };

    fetchData();
  }, []);

  const handleRootFolderChange = (value) => {
    const selectedFolder = rootFolders.find((f) => f.rootFolderName === value);
    setSelectedRootFolder(selectedFolder);
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

  const getBarData = () => {
    if (selectedRootFolder) {
      return {
        labels: selectedRootFolder.emptySubfolders,
        datasets: [
          {
            label: "Number of Empty Subfolders",
            data: selectedRootFolder.emptySubfolders.map(() => 1),
            backgroundColor: "rgba(54, 162, 235, 0.5)",
          },
        ],
      };
    }
    return { labels: [], datasets: [] };
  };

  const barData = useMemo(getBarData, [selectedRootFolder]);

  return (
    <div className="flex w-full h-screen">
      <SideBar />
      <div
        className="flex flex-col h-screen w-full relative bg-gradient-to-tl from-slate-50 to-slate-400 overflow-y-auto"
        style={{ scrollbarWidth: "none" }}
      >
        <div
          className="flex flex-col h-full m-5 p-4 rounded-2xl overflow-y-auto scroll-m-0"
          style={{ background: "rgba(255, 255, 255, 0.54)", scrollbarWidth: "none" }}
        >
          <div className="flex justify-between gap-2 mb-1">
            <h1 className="text-2xl font-bold text-gray-800 mb-1">Dashboard</h1>
            <div className="relative">
              <UserDropdown />
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <Select onValueChange={handleRootFolderChange}>
              <SelectTrigger className="w-[17rem]">
                <SelectValue placeholder="Select a Root Folder" />
              </SelectTrigger>
              <SelectContent>
                {rootFolders.map((folder) => (
                  <SelectItem key={folder.rootFolderName} value={folder.rootFolderName}>
                    {folder.rootFolderName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <RoundedContainer>
              <div className="flex w-full h-64 md:h-[30rem]">
                <Bar data={barData} options={barOptions} />
              </div>
            </RoundedContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardPending;
