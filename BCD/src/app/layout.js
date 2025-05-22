import "../styles/globals.css";
import { AppProvider } from "../context/AppContext";

export const metadata = {
  title: "Transferencias",
  description: "Formulario de transferencias de jugadores",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className="bg-black text-white min-h-screen font-sans">
        <AppProvider>
          <main className="max-w-4xl mx-auto px-4 py-8">{children}</main>
        </AppProvider>
      </body>
    </html>
  );
}
