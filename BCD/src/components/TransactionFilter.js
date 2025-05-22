import { useState } from "react";

export default function TransactionFilter({ onFilter }) {
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  const handleFilter = () => {
    onFilter(start, end);
  };

  return (
    <div className="bg-gray-50 p-4 rounded">
      <h2 className="font-semibold mb-2">Filtrar transacciones por fecha</h2>
      <div className="flex gap-2">
        <input
          type="date"
          value={start}
          onChange={(e) => setStart(e.target.value)}
          className="border p-2"
        />
        <input
          type="date"
          value={end}
          onChange={(e) => setEnd(e.target.value)}
          className="border p-2"
        />
        <button
          onClick={handleFilter}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Aplicar filtro
        </button>
      </div>
    </div>
  );
}