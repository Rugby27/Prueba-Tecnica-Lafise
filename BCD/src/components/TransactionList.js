export default function TransactionList({ transactions }) {
  if (!Array.isArray(transactions)) {
    return <div className="bg-white p-4 rounded shadow">No hay transacciones para mostrar.</div>;
  }

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="font-semibold mb-2">Historial de transacciones</h2>
      <ul className="space-y-2">
        {transactions.map((tx, index) => {
          const safeKey =
            tx.id ??
            `${tx.date ?? "fecha"}-${tx.from ?? "origen"}-${tx.to ?? "destino"}-${index}`;

          return (
            <li key={safeKey}>
              <div>{tx.date ?? "Fecha no disponible"}</div>
              <div>
                De: <strong>{tx.from ?? "?"}</strong> a <strong>{tx.to ?? "?"}</strong>
              </div>
              <div className="text-sm text-gray-600">
                Monto: {tx.amount ?? "?"} NIO
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
