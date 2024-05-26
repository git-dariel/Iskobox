import React from "react";
import { Pie, Bar } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import Cards from "@/components/dashboard/cards";
import mockedConfig from "@/configs/mocked.config";
import { barData, pieData } from "@/configs/dashboard.test.data.config";
import RoundedContainer from "@/components/layout/rounded.container";
import ProgressBar from "@/components/dashboard/progress.bar";

// Register the required components for Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

function DashboardContent() {
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
      className="flex flex-wrap w-full h-screen overflow-y-auto"
      style={{ scrollbarWidth: "none" }}
    >
      <div className="flex flex-col w-full md:w-2/3 p-4 gap-4">
        <Cards data={mockedConfig.dashboardCardData} />
        <div className="flex flex-col gap-4">
          <RoundedContainer>
            <div className="flex w-full h-64 md:h-96">
              <Bar data={barData} options={barOptions} />
            </div>
          </RoundedContainer>
          <RoundedContainer>
            <div className="flex w-full h-64 md:h-96">
              <Bar data={barData} options={barOptions} />
            </div>
          </RoundedContainer>
        </div>
      </div>
      <div className="flex flex-col w-full md:w-1/3 p-4 gap-4">
        <RoundedContainer>
          <ProgressBar />
        </RoundedContainer>
        <RoundedContainer>
          <div className="flex w-full h-64 md:h-96">
            <Pie data={pieData} options={pieOptions} />
          </div>
        </RoundedContainer>
      </div>
    </div>
  );
}

export default DashboardContent;
