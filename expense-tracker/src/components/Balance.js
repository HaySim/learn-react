import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';

const Balance = () => {
  const { transactions } = useContext(GlobalContext);
  const amounts = transactions.map(tx => tx.amount);

  const total = amounts.reduce((acc, item) => acc + Number(item), 0).toFixed(2);

  return (
    <>
      <h4>Your Spending</h4>
      <h1>£{total}</h1>
    </>
  );
};

export default Balance;
