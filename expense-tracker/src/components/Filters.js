import React, { useState, useEffect } from 'react';

const Filters = ({ onFilter }) => {
  const [category, setCategory] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  useEffect(() => {
    onFilter({ category, dateFrom, dateTo });
  }, [category, dateFrom, dateTo, onFilter]);

  const containerStyle = {
    display: 'flex',
    gap: '1rem',
    flexWrap: 'wrap',
    alignItems: 'center',
    marginBottom: '1rem',
    padding: '1rem',
    backgroundColor: '#00000',
    border: '1px solid #ccc',
    borderRadius: '8px',
  };

  const fieldStyle = {
    display: 'flex',
    flexDirection: 'column',
  };

  const inputStyle = {
    padding: '0.4rem',
    border: '1px solid #ccc',
    borderRadius: '4px',
    minWidth: '150px',
  };

  const buttonStyle = {
  padding: '0.5rem 1rem',
  borderRadius: '4px',
  backgroundColor: '#444',
  color: '#fff',
  border: 'none',
  cursor: 'pointer',
  marginLeft: 'auto', // this pushes it to the right
};

  return (
    <div style={containerStyle}>
      <div style={fieldStyle}>
        <label>Category</label>
        <select
          value={category}
          onChange={e => setCategory(e.target.value)}
          style={inputStyle}
        >
          <option value="">All Categories</option>
          <option value="Food">Food</option>
          <option value="Bills">Bills</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div style={fieldStyle}>
        <label>From Date</label>
        <input
          type="date"
          value={dateFrom}
          onChange={e => setDateFrom(e.target.value)}
          style={inputStyle}
        />
      </div>

      <div style={fieldStyle}>
        <label>To Date</label>
        <input
          type="date"
          value={dateTo}
          onChange={e => setDateTo(e.target.value)}
          style={inputStyle}
        />
      </div>

      <div><button
        onClick={() => {
          setCategory('');
          setDateFrom('');
          setDateTo('');
        }}
        style={buttonStyle}
      >
        Reset Filters
      </button>
      </div>
    </div>
  );
};

export default Filters;
