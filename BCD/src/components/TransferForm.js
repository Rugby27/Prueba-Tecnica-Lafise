"use client";

import React, { useState } from "react";
import { useAppContext } from "../context/AppContext";

const TransferForm = () => {
  const { user, isLoading } = useAppContext();
  const [playerId, setPlayerId] = useState("");
  const [destinationClub, setDestinationClub] = useState("");
  const [transferFee, setTransferFee] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!playerId || !destinationClub || !transferFee) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    const data = {
      jugador: playerId,
      usuario: user.id,
      club_destino: destinationClub,
      tarifa_transferencia: transferFee,
    };

    try {
      const res = await fetch("/api/transactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error("Error al registrar la transferencia.");
      }

      alert("Transferencia realizada con éxito.");
      setPlayerId("");
      setDestinationClub("");
      setTransferFee("");
    } catch (error) {
      console.error(error);
      alert("Error al registrar la transferencia.");
    }
  };

  if (isLoading) return <p>Cargando datos...</p>;
  if (!user) return <p>Error al cargar usuario.</p>;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block mb-1">ID:</label>
        <input
          type="text"
          value={playerId}
          onChange={(e) => setPlayerId(e.target.value)}
          className="w-full p-2 bg-gray-800 text-white"
          required
        />
      </div>

      <div>
        <label className="block mb-1">Destino:</label>
        <input
          type="text"
          value={destinationClub}
          onChange={(e) => setDestinationClub(e.target.value)}
          className="w-full p-2 bg-gray-800 text-white"
          required
        />
      </div>

      <div>
        <label className="block mb-1">Tarifa de transferencia (NIO):</label>
        <input
          type="number"
          value={transferFee}
          onChange={(e) => setTransferFee(e.target.value)}
          className="w-full p-2 bg-gray-800 text-white"
          required
        />
      </div>

      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
      >
        Enviar Transferencia
      </button>
    </form>
  );
};

export default TransferForm;