import React, { useContext, useState, useEffect } from 'react';
import { GlobalContext } from '../context/GlobalState';
import Transaction from './Transaction';
import Filters from './Filters';

const History = () => {
  const { transactions } = useContext(GlobalContext);
  const [filteredTransactions, setFilteredTransactions] = useState(transactions);

  const handleFilter = ({ category, dateFrom, dateTo }) => {
    let filtered = [...transactions];

    if (category) filtered = filtered.filter(t => t.category === category);
    if (dateFrom) filtered = filtered.filter(t => new Date(t.date) >= new Date(dateFrom));
    if (dateTo) filtered = filtered.filter(t => new Date(t.date) <= new Date(dateTo));

    setFilteredTransactions(filtered);
  };

  useEffect(() => {
    setFilteredTransactions(transactions);
  }, [transactions]);

  const pageStyle = {
    backgroundColor: '#f9f9f9',
    color: '#000',
    padding: '0.5rem',
    minHeight: '100vh',
    transition: 'all 0.3s ease',
  };

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '1rem',
    fontFamily: 'sans-serif',
    backgroundColor: '#ffffff',
    color: '#000000',
  };

  const thStyle = {
    padding: '0.75rem',
    border: '0.5px solid #444',
    textAlign: 'center',
    backgroundColor: '#f4f4f4',
    color: '#000',
  };

  return (
    <div style={pageStyle}>
      <h3>History</h3>
      <Filters onFilter={handleFilter} />
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>Description</th>
            <th style={thStyle}>Category</th>
            <th style={thStyle}>Amount</th>
            <th style={thStyle}>Date</th>
            <th style={thStyle}>Delete</th>
            <th style={thStyle}>Edit</th>
          </tr>
        </thead>
        <tbody>
          {filteredTransactions.length > 0 ? (
            filteredTransactions.map(transaction => (
              <Transaction key={transaction.id} transaction={transaction} />
            ))
          ) : (
            <tr>
              <td colSpan="6" style={{ textAlign: 'center', padding: '1rem' }}>
                No transactions found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default History;
