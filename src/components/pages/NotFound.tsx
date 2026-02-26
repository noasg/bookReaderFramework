import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-xl mb-6">Pagina nu a fost gasita</p>

      <Link
        to="/"
        className="px-6 py-2 bg-black text-white rounded hover:bg-gray-800 transition"
      >
        Inapoi la pagina principala
      </Link>
    </div>
  );
}
