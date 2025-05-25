import React, { useState, useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';

const AddTransaction = () => {
  const { addTransaction } = useContext(GlobalContext);

  const [text, setText] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');

  const onSubmit = e => {
    e.preventDefault();

    if (!text || !amount || !category || !date) {
      alert('Please fill all fields');
      return;
    }

    const newTransaction = {
      id: Math.floor(Math.random() * 100000000),
      text,
      amount: -amount,
      category,
      date,
    };

    addTransaction(newTransaction);

    setText('');
    setAmount('');
    setCategory('');
    setDate('');
  };

  return (
    <>
      <h3>Add new transaction</h3>
      <form onSubmit={onSubmit}>
        <div className="form-control">
          <label htmlFor="text">Text</label>
          <input
            type="text"
            id="text"
            placeholder="Enter description..."
            value={text}
            onChange={e => setText(e.target.value)}
            required
          />
        </div>
        <div className="form-control">
          <label htmlFor="amount">
            Amount <br />
          </label>
          <input
            type="number"
            id="amount"
            placeholder="Enter amount..."
            value={amount}
            onChange={e => setAmount(Math.abs(e.target.value))}
            required
          />
        </div>
        <div className="form-control">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            value={category}
            onChange={e => setCategory(e.target.value)}
            required
          >
            <option value="">Select category</option>
            <option value="Food">Food</option>
            <option value="Bills">Bills</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="form-control">
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={e => setDate(e.target.value)}
            required
          />
        </div>
        <button className="btn">Add transaction</button>
      </form>
    </>
  );
};

export default AddTransaction;
