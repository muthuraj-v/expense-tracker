import React from "react";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

interface ChartConfig {
  type: "bar";
  height: number;
  series: { name: string; data: number[] }[];
  options: ApexOptions;
}
interface ChartProps {
  expenses: number[];
  list: string[];
}
const BarChart: React.FC<ChartProps> = ({ expenses, list }) => {
  const chartConfig: ChartConfig = {
    type: "bar",
    height: 240,
    series: [
      {
        name: "Expenses",
        data: expenses,
      },
    ],
    options: {
      chart: {
        toolbar: { show: false },
      },
      dataLabels: { enabled: false },
      colors: ["#020617"],
      plotOptions: {
        bar: {
          columnWidth: "40%",
          borderRadius: 2,
        },
      },
      xaxis: {
        categories: list,
        labels: {
          style: {
            colors: "#616161",
            fontSize: "12px",
            fontFamily: "inherit",
            fontWeight: 400,
          },
        },
      },
      yaxis: {
        labels: {
          style: {
            colors: "#616161",
            fontSize: "12px",
            fontFamily: "inherit",
            fontWeight: 400,
          },
        },
      },
      grid: {
        borderColor: "#dddddd",
        strokeDashArray: 5,
        xaxis: { lines: { show: true } },
        padding: { top: 5, right: 20 },
      },
      fill: { opacity: 0.8 },
      tooltip: { theme: "dark" },
    },
  };

  return (
    <div className="bg-white shadow rounded p-4">
      <h2 className="text-lg font-semibold text-gray-800 mb-2">
        Expense Chart
      </h2>
      <Chart
        type={chartConfig.type}
        height={chartConfig.height}
        series={chartConfig.series}
        options={chartConfig.options}
      />
    </div>
  );
};

export default BarChart;
