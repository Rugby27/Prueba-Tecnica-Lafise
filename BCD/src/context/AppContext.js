"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUser = async (userId) => {
    const res = await fetch(`/api/users/${userId}`);
    if (!res.ok) throw new Error("Error al obtener el usuario");
    return await res.json();
  };

  const fetchTransactions = async (accountId) => {
    const res = await fetch(`/api/accounts/${accountId}/transactions`);
    if (!res.ok) throw new Error("Error al obtener las transacciones");
    return await res.json();
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const userId = "1";
        const accountId = "1";

        const userData = await fetchUser(userId);
        const transactionsData = await fetchTransactions(accountId);

        setUser(userData);
        setTransactions(transactionsData);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const filterTransactionsByDate = (start, end) => {
    if (!start || !end) return [];

    return transactions.filter((tx) => {
      const date = new Date(tx.date);
      return date >= new Date(start) && date <= new Date(end);
    });
  };

  return (
    <AppContext.Provider
      value={{
        user,
        transactions,
        filterTransactionsByDate,
        isLoading,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
