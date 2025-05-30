import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';

const IncomeExpenses = () => {
  const { transactions } = useContext(GlobalContext);
  const amounts = transactions.map(tx => tx.amount);

  const expense = (
    amounts.reduce((acc, item) => acc + item, 0)
  ).toFixed(2);

  return (
    <div className="inc-exp-container">
      <div>
        <h4>Expense</h4>
        <p className="money minus">{expense}</p>
      </div>
    </div>
  );
};

export default IncomeExpenses;
