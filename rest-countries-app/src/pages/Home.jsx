import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchAllCountries} from "../api";
import { FaHeart, FaRegHeart, FaSearch } from "react-icons/fa";
import { TbWorldSearch } from "react-icons/tb";
import { IoMdClose } from "react-icons/io";

function Home() {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeRegion, setActiveRegion] = useState("");
  const [favorites, setFavorites] = useState(() => {
    return JSON.parse(localStorage.getItem("favorites")) || [];
  });
  const navigate = useNavigate();

  // Fetch all countries on component mount
  useEffect(() => {
    setLoading(true);
    fetchAllCountries()
      .then(data => {
        setCountries(data);
        setFilteredCountries(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching countries:", err);
        setError("Failed to load countries. Please try again later.");
        setLoading(false);
      });
  }, []);

  // Apply filters whenever dependencies change
  useEffect(() => {
    let result = countries;

    // Apply search filter
    if (searchTerm) {
      result = result.filter(country => 
        country.name.common.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (country.capital && country.capital[0]?.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Apply region filter
    if (activeRegion) {
      result = result.filter(country => country.region === activeRegion);
    }

    setFilteredCountries(result);
  }, [searchTerm, activeRegion, countries]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const clearSearch = () => {
    setSearchTerm("");
  };

  const handleFilter = (region) => {
    setActiveRegion(region === activeRegion ? "" : region);
  };

  const handleSelectCountry = (country) => {
    navigate(`/country/${country.cca3}`);
  };

  const toggleFavorite = (e, code) => {
    e.stopPropagation();
    let updatedFavorites;
    if (favorites.includes(code)) {
      updatedFavorites = favorites.filter((fav) => fav !== code);
    } else {
      updatedFavorites = [...favorites, code];
    }
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  // Removed toggleFavoritesOnly function

  const regions = ["Africa", "Americas", "Asia", "Europe", "Oceania"];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-lg text-gray-700">Exploring the world...</p>
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 pb-12">
      {/* Removed header section */}

      <div className="max-w-6xl mx-auto px-6">
        {/* Search and Filter - Simplified */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Bar */}
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search for a country or capital..."
                value={searchTerm}
                onChange={handleSearch}
                className="w-full pl-10 pr-10 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {searchTerm && (
                <button
                  onClick={clearSearch}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  <IoMdClose className="text-gray-400 hover:text-gray-600" />
                </button>
              )}
            </div>

            {/* Simple Region Filter Dropdown */}
            <select
              value={activeRegion}
              onChange={(e) => handleFilter(e.target.value)}
              className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gradient-to-br"
            >
              <option value="">All Regions</option>
              {regions.map((region) => (
                <option key={region} value={region}>
                  {region}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Results Count - Simplified */}
        <div className="mb-6 flex items-center justify-between">
          <p className="text-gray-600">
            Showing <span className="font-semibold">{filteredCountries.length}</span> {filteredCountries.length === 1 ? 'country' : 'countries'}
            {activeRegion && <span> in <span className="font-semibold">{activeRegion}</span></span>}
          </p>
          
          {(activeRegion || searchTerm) && (
            <button
              onClick={() => {
                setActiveRegion("");
                setSearchTerm("");
              }}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              Clear all filters
            </button>
          )}
        </div>

        {/* No Results */}
        {filteredCountries.length === 0 && (
          <div className="bg-white rounded-xl p-8 text-center shadow-md">
            <TbWorldSearch className="mx-auto text-6xl text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No countries found</h3>
            <p className="text-gray-500 mb-6">Try adjusting your search or filters to find what you're looking for</p>
            <button
              onClick={() => {
                setActiveRegion("");
                setSearchTerm("");
              }}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Countries Grid */}
        {filteredCountries.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 animate-fadeIn">
            {filteredCountries.map((country) => (
              <CountryCard
                key={country.cca3}
                country={country}
                onSelect={handleSelectCountry}
                onToggleFavorite={toggleFavorite}
                isFavorite={favorites.includes(country.cca3)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function CountryCard({ country, onSelect, onToggleFavorite, isFavorite }) {
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
          title={isFavorite ? "Remove from Favorites" : "Add to Favorites"}
        >
          {isFavorite ? (
            <FaHeart className="text-yellow-500 text-lg" />
          ) : (
            <FaRegHeart className="text-gray-400 hover:text-yellow-500 text-lg" />
          )}
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

function CountryListItem({ country, onSelect, onToggleFavorite, isFavorite }) {
  return (
    <div 
      className="bg-white rounded-lg shadow-sm hover:shadow-md transition duration-300 overflow-hidden"
      onClick={() => onSelect(country)}
    >
      <div className="flex items-center cursor-pointer">
        <img
          src={country.flags.svg}
          alt={`Flag of ${country.name.common}`}
          className="h-20 w-28 object-cover"
        />
        <div className="p-4 flex-grow">
          <h2 className="text-lg font-bold text-gray-800">{country.name.common}</h2>
          <div className="text-sm text-gray-600 mt-1">
            <span className="inline-block mr-6"><span className="font-medium">Capital:</span> {country.capital?.[0] || "N/A"}</span>
            <span className="inline-block mr-6"><span className="font-medium">Region:</span> {country.region}</span>
            <span className="inline-block"><span className="font-medium">Population:</span> {country.population.toLocaleString()}</span>
          </div>
        </div>
        <button
          onClick={(e) => onToggleFavorite(e, country.cca3)}
          className="p-3 mr-4 bg-gray-100 rounded-full hover:bg-gray-200 transition duration-300"
          title={isFavorite ? "Remove from Favorites" : "Add to Favorites"}
        >
          {isFavorite ? (
            <FaHeart className="text-yellow-500 text-lg" />
          ) : (
            <FaRegHeart className="text-gray-400 hover:text-yellow-500 text-lg" />
          )}
        </button>
      </div>
    </div>
  );
}

export default Home;