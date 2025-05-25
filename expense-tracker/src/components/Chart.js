import React, { useContext } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { GlobalContext } from '../context/GlobalState';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const Chart = () => {
  const { transactions } = useContext(GlobalContext);

  const categories = ['Food', 'Bills', 'Other'];
  
  // Sum amounts by category (only positive amounts for income, negative for expenses)
  const categoryData = categories.map(cat => {
    return transactions
      .filter(tx => tx.category === cat)
      .reduce((acc, tx) => acc + Math.abs(tx.amount), 0);
  });

  const total = categoryData.reduce((a, b) => a + b, 0);

  // If no data, show black outline doughnut (empty chart)
  const data = {
    labels: categories,
    datasets: [
      {
        label: 'Expenses by Category',
        data: total === 0 ? [1] : categoryData,
        backgroundColor:
          total === 0
            ? ['#00000000'] // transparent for no data, but we add border below
            : [
                '#FF6384',
                '#36A2EB',
                '#4BC0C0',
                '#FFCE56',
                '#9966FF',
              ],
        borderColor: total === 0 ? ['#000'] : ['#fff', '#fff', '#fff', '#fff', '#fff'],
        borderWidth: 2,
      },
    ],
  };

  const options = {
    cutout: '70%',
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: '#333',
        },
      },
      tooltip: {
        enabled: true,
      },
    },
  };

  return (
    <div className="chart-container">
      <h3>Spending by Category</h3>
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default Chart;
