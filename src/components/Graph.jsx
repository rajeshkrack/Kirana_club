import React, { useRef, useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Card, Text } from "@shopify/polaris";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Graph = ({ contests, filterPhase, filterType }) => {
  const chartRef = useRef(null);
  const [filteredContests, setFilteredContests] = useState(contests);

  useEffect(() => {
    // Filtering contests based on phase and type before rendering the chart
    const filtered = contests.filter((contest) => {
      const matchesPhase = filterPhase ? contest.phase === filterPhase : true;
      const matchesType = filterType ? contest.type === filterType : true;
      return matchesPhase && matchesType;
    });
    setFilteredContests(filtered);
  }, [contests, filterPhase, filterType]);

  const data = {
    labels: filteredContests.map((contest) => contest.name),
    datasets: [
      {
        label: "Duration (Seconds)",
        data: filteredContests.map((contest) => contest.durationSeconds),
        backgroundColor: "rgba(75,192,192,0.6)", // Greenish color
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Contest Durations",
        font: {
          size: 18,
        },
        color: "#333",
      },
      tooltip: {
        callbacks: {
          title: function (tooltipItem) {
            return `Contest: ${tooltipItem[0].label}`;
          },
          label: function (tooltipItem) {
            const contest = filteredContests[tooltipItem.dataIndex];
            const duration = contest.durationSeconds;
            return `Duration: ${duration} seconds`;
          },
        },
      },
    },
  };

  return (
    <div className="mt-8 mx-auto max-w-6xl">
      <Card title="Contest Durations" sectioned>
        <div className="flex flex-col gap-4 bg-white p-6 rounded-lg shadow-lg">
          <Text variation="strong" className="text-xl font-semibold text-gray-800">
            Contest Durations
          </Text>
          <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
            <Bar ref={chartRef} data={data} options={options} />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Graph;
