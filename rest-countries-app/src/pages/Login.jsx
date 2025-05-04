import { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { FaUser, FaLock, FaSignInAlt, FaUserPlus, FaGlobe } from "react-icons/fa";

export default function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get the page user was trying to access before being redirected to login
  const from = location.state?.from || "/";

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    try {
      const res = await fetch("https://countryapp-2.onrender.com", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      
      if (res.ok) {
        localStorage.setItem("token", data.token);
        // Redirect to the page user was trying to access
        navigate(from);
      } else {
        setError(data.message || "Login failed. Please check your credentials.");
      }
    } catch (err) {
      setError("Connection error. Please try again later.");
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        <div className="text-center mb-8">
          <div className="mx-auto h-16 w-16 flex items-center justify-center rounded-full bg-blue-100 mb-4">
            <FaGlobe className="h-8 w-8 text-blue-600" />
          </div>
          <h2 className="text-3xl font-extrabold text-gray-800">Sign in to Country Explorer🌍 </h2>
          <p className="mt-2 text-sm text-gray-600">
            Discover countries from around the world
          </p>
          {from !== "/" && (
            <p className="mt-1 text-sm text-blue-600 font-medium">
              Sign in to continue to your page
            </p>
          )}
        </div>
        
        {error && (
          <div className="mb-4 p-3 rounded-md bg-red-50 border border-red-200">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="username" className="sr-only">Username</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaUser className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="username"
                name="username"
                type="text"
                required
                value={form.username}
                onChange={handleChange}
                placeholder="Username"
                className="appearance-none block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="password" className="sr-only">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaLock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={form.password}
                onChange={handleChange}
                placeholder="Password"
                className="appearance-none block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <div>
            <button
              type="submit"
              disabled={loading}
              className={`group relative w-full flex justify-center py-3 px-4 border border-transparent rounded-lg text-white 
                font-medium ${loading ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"} 
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150`}
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <FaSignInAlt className="h-5 w-5 text-blue-300 group-hover:text-blue-200" />
              </span>
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </div>
        </form>
        
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Don't have an account?</span>
            </div>
          </div>
          
          <div className="mt-6">
            <Link
              to="/register"
              className="w-full flex justify-center items-center py-3 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150"
            >
              <FaUserPlus className="mr-2" />
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
