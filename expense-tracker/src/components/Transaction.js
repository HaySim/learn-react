import React, { useContext, useState } from 'react';
import { GlobalContext } from '../context/GlobalState';

const Transaction = ({ transaction }) => {
  const { deleteTransaction, editTransaction } = useContext(GlobalContext);
  const sign = transaction.amount < 0 ? '-' : '+';

  const [isEditing, setIsEditing] = useState(false);
  const [editedTransaction, setEditedTransaction] = useState({ ...transaction });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedTransaction({ ...editedTransaction, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    editTransaction({ ...editedTransaction, amount: +editedTransaction.amount });
    setIsEditing(false);
  };

  const tdStyle = {
    padding: '0.75rem',
    border: '1px solid #444',
    textAlign: 'center',
    backgroundColor: '#fff',
    color: '#000',
  };

  return (
    <>
      {isEditing ? (
        <tr>
          <td colSpan="6" style={{ padding: '1rem', textAlign: 'left', backgroundColor: '#fff' }}>
            <form onSubmit={handleSubmit} className="edit-form">
              <input type="text" name="text" value={editedTransaction.text} onChange={handleChange} required />
              <select name="category" value={editedTransaction.category} onChange={handleChange} required>
                <option value="">Select category</option>
                <option value="Food">Food</option>
                <option value="Bills">Bills</option>
                <option value="Other">Other</option>
              </select>
              <input type="number" name="amount" value={editedTransaction.amount} onChange={handleChange} required />
            
              <input type="date" name="date" value={editedTransaction.date} onChange={handleChange} required />
              <button type="submit">Save</button>
              <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
            </form>
          </td>
        </tr>
      ) : (
        <tr>
          <td style={tdStyle}>{transaction.text}</td>
          <td style={tdStyle}>
            <span style={{
              backgroundColor: '#eee',
              padding: '0.25rem 0.5rem',
              borderRadius: '0.5px',
              fontSize: '0.85rem',
              display: 'inline-block',
              color: '#000'
            }}>{transaction.category}</span>
          </td>
          <td style={tdStyle}>{sign}£{Math.abs(transaction.amount)}</td>
          <td style={tdStyle}>{transaction.date}</td>
          <td style={tdStyle}>
            <button onClick={() => deleteTransaction(transaction.id)} style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#dc3545' }}>x</button>
          </td>
          <td style={tdStyle}>
            <button onClick={() => setIsEditing(true)} style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#007bff' }}>✎</button>
          </td>
        </tr>
      )}
    </>
  );
};

export default Transaction;
