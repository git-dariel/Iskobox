import React from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { ResponsiveContainer } from "recharts";

const ProgressBar = ({ progress }) => {
  // Function to determine the pastel trail color based on progress
  const getTrailColor = (progress) => {
    if (progress < 25) {
      return "#FFA0A0"; // Lighter Red
    } else if (progress < 40) {
      return "#FF8080"; // Light Red
    } else if (progress < 50) {
      return "#FFCC66"; // Light Orange
    } else if (progress < 60) {
      return "#FFD699"; // Light Orange-Yellow
    } else if (progress < 70) {
      return "#FFFF99"; // Light Yellow
    } else if (progress < 80) {
      return "#D4E157"; // Light Yellow-Green
    } else if (progress < 90) {
      return "#9CCC65"; // Light Green-Yellow
    } else {
      return "#99CC99"; // Light Green
    }
  };

  const trailColor = getTrailColor(progress);

  return (
    <div className="w-full">
      <h2 className="text-xl font-bold mb-1 text-gray-800">Overall Progress</h2>
      <div className="flex m-2 mt-7 items-center justify-center w-full">
        {/* <ResponsiveContainer width="100%" height="55%"> */}
        <CircularProgressbar
          value={progress}
          text={`${progress}%`}
          styles={{
            root: {
              width: "320px",
              filter: "drop-shadow(0px 0px 10px rgba(0, 0, 0, 0.1))",
            },
            path: {
              stroke: trailColor,
              strokeLinecap: "round",
              transition: "stroke-dashoffset 0.5s ease 0s",
            },
            trail: {
              stroke: "#f0f0f0",
              strokeLinecap: "round",
              transform: "rotate(0.25turn)",
              transformOrigin: "center center",
            },
            text: {
              fill: trailColor,
              fontSize: 20,
              dominantBaseline: "middle",
              textAnchor: "middle",
            },
          }}
        />
        {/* </ResponsiveContainer> */}
      </div>
    </div>
  );
};

export default ProgressBar;
