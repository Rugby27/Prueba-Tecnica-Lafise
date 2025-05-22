"use client";

import React, { useState, useEffect } from "react";

export default function AccountCard() {
  const [user, setUser] = useState(null);
  const [accountNumber, setAccountNumber] = useState("");
  const [accountData, setAccountData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch("http://localhost:5566/users/123"); 
        if (!res.ok) throw new Error("Error cargando usuario");
        const data = await res.json();
        setUser(data);
      } catch (e) {
        setError(e.message);
      }
    }
    fetchUser();
  }, []);

  const fetchAccountData = async (number) => {
    setLoading(true);
    setError(null);
    setAccountData(null);

    try {
      if (!number || number.trim() === "") {
        throw new Error("Número de cuenta inválido");
      }

      const existeCuenta = user.products.some(
        (p) => p.type === "Account" && p.id === number
      );

      if (!existeCuenta) {
        throw new Error("Cuenta no encontrada entre tus productos");
      }

      const res = await fetch(`http://localhost:5566/accounts/${number}`);
      if (!res.ok) {
        if (res.status === 404) throw new Error("Cuenta no encontrada");
        else throw new Error("Error al obtener datos de la cuenta");
      }
      const cuenta = await res.json();

      setAccountData(cuenta);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchAccountData(accountNumber);
  };

  if (error && !user) return <p>Error: {error}</p>;
  if (!user) return <p>Cargando usuario...</p>;

  return (
    <div className="border p-4 rounded shadow bg-white max-w-sm mx-auto">
      <form onSubmit={handleSubmit} className="mb-4">
        <label htmlFor="accountNumber" className="block mb-2 font-semibold">
          Número de cuenta:
        </label>
        <input
          id="accountNumber"
          type="text"
          value={accountNumber}
          onChange={(e) => setAccountNumber(e.target.value)}
          className="w-full p-2 border rounded mb-2"
          placeholder="Ingrese número de cuenta"
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          disabled={loading}
        >
          {loading ? "Buscando..." : "Visualizar saldo"}
        </button>
      </form>

      {error && <p className="text-red-600 mb-2">{error}</p>}

      {accountData && (
        <div>
          <h2 className="text-xl font-semibold">{accountData.alias}</h2>
          <p className="text-gray-700">
            Saldo:{" "}
            {accountData.balance.toLocaleString("es-NI", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}{" "}
            {accountData.currency}
          </p>
        </div>
      )}
    </div>
  );
}
