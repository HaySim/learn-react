import React, { createContext, useReducer, useEffect, useState } from 'react';

const initialState = {
  transactions: [
    {
      id: 1,
      text: 'Groceries',
      amount: -150,
      category: 'Food',
      date: '2025-05-03',
    },
  ],
};

export const GlobalContext = createContext(initialState);

const AppReducer = (state, action) => {
  switch (action.type) {
    case 'LOAD_TRANSACTIONS':
      return {
        ...state,
        transactions: action.payload,
      };
    case 'DELETE_TRANSACTION':
      return {
        ...state,
        transactions: state.transactions.filter(
          (transaction) => transaction.id !== action.payload
        ),
      };
    case 'ADD_TRANSACTION':
      return {
        ...state,
        transactions: [action.payload, ...state.transactions],
      };
    case 'EDIT_TRANSACTION':
      return {
        ...state,
        transactions: state.transactions.map((transaction) =>
          transaction.id === action.payload.id ? action.payload : transaction
        ),
      };
    default:
      return state;
  }
};

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const localData = localStorage.getItem('transactions');
    if (localData) {
      dispatch({ type: 'LOAD_TRANSACTIONS', payload: JSON.parse(localData) });
    }
    setLoading(false);  // Done loading localStorage data
  }, []);

  useEffect(() => {
    if (!loading) {  // Only save after loading is done
      localStorage.setItem('transactions', JSON.stringify(state.transactions));
    }
  }, [state.transactions, loading]);

  // Actions
  function deleteTransaction(id) {
    dispatch({
      type: 'DELETE_TRANSACTION',
      payload: id,
    });
  }

  function addTransaction(transaction) {
    dispatch({
      type: 'ADD_TRANSACTION',
      payload: transaction,
    });
  }

  function editTransaction(transaction) {
    dispatch({
      type: 'EDIT_TRANSACTION',
      payload: transaction,
    });
  }

  // Only render children after loading localStorage data
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <GlobalContext.Provider
      value={{
        transactions: state.transactions,
        deleteTransaction,
        addTransaction,
        editTransaction,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
