import React from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { ResponsiveContainer } from "recharts";

const ProgressBar = () => {
  const progressData = 75; //just to visualize progress
  return (
    <div className="flex m-2 w-full">
      <CircularProgressbar
        value={progressData}
        text={`${progressData}%`}
        styles={{
          root: {
            width: "100%",
            filter: "drop-shadow(0px 0px 10px rgba(50, 50, 50, 0.7))",
          },
          path: {
            stroke: "#2d3748",
            strokeLinecap: "round",
            transition: "stroke-dashoffset 0.5s ease 0s",
          },
          trail: { stroke: "none" },
          text: {
            fill: "#2d3748",
            fontSize: 20,
            dominantBaseline: "middle",
            textAnchor: "middle",
          },
        }}
      />
    </div>
  );
};

export default ProgressBar;
