import React from 'react';
import Balance from './components/Balance';
import History from './components/History';
import AddTransaction from './components/AddTransaction';
import Chart from './components/Chart';

function App() {
  return (
    <div className="container">
      <h2>EXPENSE TRACKER</h2>
      <Balance />
      <Chart />
      <AddTransaction />
      <History />
    </div>
  );
}

export default App;
