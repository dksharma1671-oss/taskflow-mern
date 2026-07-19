import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { FiMenu, FiX, FiMoon, FiSun } from "react-icons/fi";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dark, setDark] = useState(document.documentElement.classList.contains("dark"));

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const toggleDark = () => {
    document.documentElement.classList.toggle("dark");
    setDark(!dark);
  };

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-16">
        <Link to="/" className="text-xl font-bold text-primary-600 dark:text-primary-500">
          TaskFlow
        </Link>

        <div className="hidden md:flex items-center gap-6">
          {user ? (
            <>
              <Link to="/dashboard" className="hover:text-primary-600">Dashboard</Link>
              <Link to="/profile" className="hover:text-primary-600">Profile</Link>
              <button onClick={toggleDark} className="text-lg">
                {dark ? <FiSun /> : <FiMoon />}
              </button>
              <button
                onClick={handleLogout}
                className="bg-primary-600 text-white px-4 py-1.5 rounded-lg hover:bg-primary-700 text-sm"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button onClick={toggleDark} className="text-lg">
                {dark ? <FiSun /> : <FiMoon />}
              </button>
              <Link to="/login" className="hover:text-primary-600">Login</Link>
              <Link
                to="/register"
                className="bg-primary-600 text-white px-4 py-1.5 rounded-lg hover:bg-primary-700 text-sm"
              >
                Register
              </Link>
            </>
          )}
        </div>

        <button className="md:hidden text-2xl" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-800 px-4 pb-4 flex flex-col gap-3 border-t dark:border-gray-700">
          {user ? (
            <>
              <Link to="/dashboard" onClick={() => setMenuOpen(false)}>Dashboard</Link>
              <Link to="/profile" onClick={() => setMenuOpen(false)}>Profile</Link>
              <button onClick={handleLogout} className="text-left text-red-600">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={() => setMenuOpen(false)}>Login</Link>
              <Link to="/register" onClick={() => setMenuOpen(false)}>Register</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
