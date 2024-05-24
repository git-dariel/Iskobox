import React from "react";
import { Pie, Bar } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import Cards from "@/components/dashboard/cards";
import mockedConfig from "@/configs/mocked.config";
import { barData, pieData } from "@/configs/dashboard.test.data.config";

// Register the required components for Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

function DashboardContent() {
  const pieOptions = {
    responsive: true,
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
    <div className="flex">
      {/* Cards */}
      <div className="m-2 w-[70%]">
        <Cards data={mockedConfig.dashboardCardData} />
        <div className="flex w-full">
          <Bar data={barData} options={barOptions} />
        </div>
      </div>
      <div className="w-[30%] h-fit">
        <Pie data={pieData} options={pieOptions} />
      </div>
    </div>
  );
}

export default DashboardContent;
