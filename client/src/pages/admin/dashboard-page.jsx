import React, { useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import Cards from "@/components/dashboard/cards";
import mockedConfig from "@/configs/mocked.config";

// Register the required components for Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

function DashboardContent() {
  // Define data and options for the Pie Chart
  const pieData = {
    labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    datasets: [
      {
        label: "# of Votes",
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

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

  return (
    <div className="flex h-screen bg-[#f8fafd]">
      {/* Cards */}
      <div className="m-2 w-[70%]">
        <Cards data={mockedConfig.dashboardCardData} />
        <div className="bg-gray-200">
          {/* Add other dashboard contents here */}
        </div>
      </div>
      <div className="w-[30%] h-full">
        <Pie data={pieData} options={pieOptions} />
        <Pie data={pieData} options={pieOptions} />
      </div>
    </div>
  );
}

export default DashboardContent;
