import React from 'react';
import { Bar, Pie, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

const Charts = ({ data, type = 'bar' }) => {
  const options = { responsive: true, plugins: { legend: { position: 'top' } } };

  const getChart = () => {
    switch (type) {
      case 'pie': return <Pie data={data} options={options} />;
      case 'doughnut': return <Doughnut data={data} options={options} />;
      default: return <Bar data={data} options={options} />;
    }
  };

  return <div className="chart-container">{getChart()}</div>;
};

export default Charts;