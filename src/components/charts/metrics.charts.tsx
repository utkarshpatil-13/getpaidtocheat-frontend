import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register the required components
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend);

// Define the shape of the data prop
interface Metric {
  id: number;
  thumbnail: string;
  title: string;
  description: string;
  metrics: {
    views: number;
    likes: number;
    comments : number;
    engagementScore : number;
  };
}

interface MetricsChartProps {
  data: Metric[]; // Array of metric data
}

const MetricsChart: React.FC<MetricsChartProps> = ({ data }) => {
  const chartData = {
    labels: data.length ? data.map((video) => video.title) : ["No Data"],
    datasets: [
      {
        label: "Views",
        data: data.length ? data.map((video) => video.metrics.views) : [0],
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true,
      },
      {
        label: "Likes",
        data: data.length ? data.map((video) => video.metrics.likes) : [0],
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Video Analytics",
      },
    },
  };

  return (
    <div className="metrics-chart">
      <Line data={chartData} options={options} />
    </div>
  );
};

export default MetricsChart;