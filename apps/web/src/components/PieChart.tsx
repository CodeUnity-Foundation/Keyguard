"use client";

import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import { useTheme } from "next-themes";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function PieChart() {
  const { theme } = useTheme(); 

  const data = {
    labels: ["One", "Two", "Three"],
    datasets: [
      {
        data: [100, 50, 100],
        backgroundColor: ["rgb(255, 99, 132)", "rgb(54, 162, 235)", "rgb(255, 205, 86)"],
        hoverOffset: 5,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "right" as const,
        align: "center" as const,
        labels: {
          color: theme === "dark" ? "white" : "black",
          usePointStyle: true,
        },
      },
    },
  };

  return (
    <div className="flex flex-col items-center">
      <div className="w-full pt-7">
        <Pie data={data} options={options} height={200} />
      </div>
    </div>
  );
}
