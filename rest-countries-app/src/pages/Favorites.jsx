import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchByCode } from "../api";
import { FaHeart, FaArrowLeft, FaRegHeart } from "react-icons/fa";
import { TbHeartOff } from "react-icons/tb";

function Favorites() {
  const [favorites, setFavorites] = useState(() => JSON.parse(localStorage.getItem("favorites")) || []);
  const [favoriteCountries, setFavoriteCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFavorites = async () => {
      setLoading(true);
      try {
        if (favorites.length > 0) {
          const results = await Promise.all(favorites.map(code => fetchByCode(code)));
          setFavoriteCountries(results.map(res => res[0]));
        }
        setLoading(false);
      } catch (err) {
        console.error("Error fetching favorite countries:", err);
        setError("Failed to load favorite countries. Please try again later.");
        setLoading(false);
      }
    };
    
    fetchFavorites();
  }, [favorites]);

  const toggleFavorite = (e, code) => {
    e.stopPropagation();
    const updated = favorites.filter((c) => c !== code);
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
    setFavoriteCountries(favoriteCountries.filter((c) => c.cca3 !== code));
  };

  const handleSelectCountry = (country) => {
    navigate(`/country/${country.cca3}`);
  };

  const goBack = () => {
    navigate(-1);
  };

  if (loading && favorites.length > 0) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-lg text-gray-700">Loading your favorites...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-md text-center">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Oops!</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 pb-12">
      <div className="max-w-6xl mx-auto px-6 pt-8">
        {/* Header with back button */}
        <div className="flex items-center mb-8">
          <button 
            onClick={goBack}
            className="mr-4 p-2 rounded-full bg-white shadow-md hover:shadow-lg transition duration-300 hover:bg-gray-50"
          >
            <FaArrowLeft className="text-gray-600" />
          </button>
          <h1 className="text-3xl font-bold text-gray-800 flex items-center">
            <FaHeart className="text-yellow-500 mr-3" />
            Favorite Countries
          </h1>
        </div>

        {/* Stats Bar */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-8">
          <div className="flex flex-wrap items-center justify-between">
            <p className="text-gray-700">
              You have <span className="font-bold text-yellow-500">{favoriteCountries.length}</span> {favoriteCountries.length === 1 ? 'country' : 'countries'} in your favorites
            </p>
            {favoriteCountries.length > 0 && (
              <button
                onClick={() => {
                  setFavorites([]);
                  localStorage.setItem("favorites", JSON.stringify([]));
                  setFavoriteCountries([]);
                }}
                className="text-red-500 hover:text-red-700 font-medium text-sm py-1 px-3 rounded-md hover:bg-red-50 transition duration-300"
              >
                Clear All Favorites
              </button>
            )}
          </div>
        </div>

        {/* Empty State */}
        {favoriteCountries.length === 0 && (
          <div className="bg-white rounded-xl p-10 text-center shadow-md animate-fadeIn">
            <TbHeartOff className="mx-auto text-6xl text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-3">No favorite countries yet</h3>
            <p className="text-gray-500 mb-6">Explore countries and add them to your favorites by clicking the heart icon</p>
            <button
              onClick={() => navigate("/")}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Explore Countries
            </button>
          </div>
        )}

        {/* Countries Grid */}
        {favoriteCountries.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 animate-fadeIn">
            {favoriteCountries.map((country) => (
              <CountryCard 
                key={country.cca3}
                country={country}
                onSelect={handleSelectCountry}
                onToggleFavorite={toggleFavorite}
                isFavorite={true}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// Inline CountryCard component to avoid dependency on external component
function CountryCard({ country, onSelect, onToggleFavorite}) {
  return (
    <div 
      className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition duration-300 cursor-pointer transform hover:-translate-y-1"
      onClick={() => onSelect(country)}
    >
      <div className="relative h-40">
        <img
          src={country.flags.svg}
          alt={`Flag of ${country.name.common}`}
          className="h-full w-full object-cover"
        />
        <button
          onClick={(e) => onToggleFavorite(e, country.cca3)}
          className="absolute top-2 right-2 bg-white rounded-full p-2 shadow-md transition duration-300 hover:scale-110"
          title="Remove from Favorites"
        >
          <FaHeart className="text-yellow-500 text-lg" />
        </button>
      </div>
      <div className="p-4">
        <h2 className="text-lg font-bold text-gray-800 mb-2 line-clamp-1">{country.name.common}</h2>
        <div className="space-y-1 text-sm text-gray-600">
          <p><span className="font-medium">Population:</span> {country.population.toLocaleString()}</p>
          <p><span className="font-medium">Region:</span> {country.region}</p>
          <p><span className="font-medium">Capital:</span> {country.capital?.[0] || "N/A"}</p>
        </div>
      </div>
    </div>
  );
}

export default Favorites;