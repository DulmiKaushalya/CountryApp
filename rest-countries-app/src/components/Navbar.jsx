import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("token");

  const navLinkStyle = (path) =>
    `px-5 py-3 text-lg rounded hover:bg-blue-600 hover:text-white transition ${
      location.pathname === path ? "bg-blue-600 text-white" : "text-blue-700"
    }`;

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-lg mb-8">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <h1 className="text-3xl font-extrabold text-blue-700">🌍 Country Explorer</h1>
        <div className="flex space-x-6">
          <Link to="/" className={navLinkStyle("/")}>
            Home
          </Link>
          <Link to="/favorites" className={navLinkStyle("/favorites")}>
            Favorites ⭐
          </Link>

          {!isLoggedIn ? (
            <Link to="/login" className={navLinkStyle("/login")}>
              Login
            </Link>
          ) : (
            <button
              onClick={handleLogout}
              className="px-5 py-3 text-lg rounded bg-red-500 text-white hover:bg-red-600 transition"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
