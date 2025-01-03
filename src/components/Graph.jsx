import React, { useRef, useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Card, TextStyle, Stack } from "@shopify/polaris";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Graph = ({ contests, filterPhase, filterType }) => {
  const chartRef = useRef(null);
  const [filteredContests, setFilteredContests] = useState(contests);

  useEffect(() => {
    // Filtering contests based on phase and type before rendering the chart
    const filtered = contests.filter(contest => {
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
        backgroundColor: "rgba(75,192,192,0.6)",
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
    <div className="mt-8">
      <Card title="Contest Durations" sectioned>
        <Stack vertical>
          <TextStyle variation="strong">
            <h2>Contest Durations</h2>
          </TextStyle>
          <Bar ref={chartRef} data={data} options={options} />
        </Stack>
      </Card>
    </div>
  );
};

export default Graph;
