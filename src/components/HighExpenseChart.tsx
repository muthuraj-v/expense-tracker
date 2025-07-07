import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

interface Expense {
  category: string;
  amount: number;
}

interface HighExpenseChartProps {
  expenses: Expense[];
}

const HighExpenseChart: React.FC<HighExpenseChartProps> = ({ expenses }) => {
  const sortedExpenses = [...expenses]
    .sort((a, b) => b.amount - a.amount)
    .slice(0, 5);

  const data = {
    labels: sortedExpenses.map((exp) => exp.category),
    datasets: [
      {
        label: "Expenses",
        data: sortedExpenses.map((exp) => exp.amount),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#8BC34A",
          "#FF9800",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto" }}>
      <h3>Top Spending Categories</h3>
      <Pie data={data} />
    </div>
  );
};

export default HighExpenseChart;
