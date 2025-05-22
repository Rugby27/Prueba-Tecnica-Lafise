"use client";

import { useState } from "react";
import TransferForm from "../components/TransferForm";
import AccountCard from "../components/AccountCard";
import TransactionFilter from "../components/TransactionFilter";
import TransactionList from "../components/TransactionList";
import { useAppContext } from "../context/AppContext";


export default function Home() {
  const { user, transactions, filterTransactionsByDate, isLoading } = useAppContext();
  const [filteredTx, setFilteredTx] = useState([]);

  const handleFilter = (start, end) => {
    const result = filterTransactionsByDate(start, end);
    setFilteredTx(result || []);
  };

  if (isLoading) return <p className="text-white">Cargando datos...</p>;
  if (!user) return <p className="text-white">No se encontró el usuario.</p>;

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold mb-4">Transferencias</h1>

      <AccountCard account={{ name: user.nombre, balance: user.saldo }} />

      <TransferForm />

      <TransactionFilter onFilter={handleFilter} />

      <TransactionList transactions={filteredTx.length > 0 ? filteredTx : transactions} />
    </div>
  );
}
