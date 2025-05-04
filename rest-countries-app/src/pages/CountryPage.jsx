import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchByCode } from "../api";

function CountryPage() {
  const { code } = useParams();
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    fetchByCode(code)
      .then((data) => {
        setCountry(data[0]);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching country data:", err);
        setLoading(false);
      });
  }, [code]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-lg text-gray-700">Loading country information...</p>
        </div>
      </div>
    );
  }

  if (!country) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center p-8 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-red-600">Country Not Found</h2>
          <p className="mt-2 text-gray-600">We couldn't find information for this country.</p>
          <button
            onClick={() => navigate(-1)}
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 shadow-md"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-5xl mx-auto animate-fadeIn">
        {/* Back Button */}
        <div className="mb-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-4 py-2 bg-white text-blue-700 rounded-lg hover:bg-blue-700 hover:text-white transition duration-300 shadow-md"
          >
            <span className="font-bold">←</span> Back to Countries
          </button>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-xl overflow-hidden shadow-xl">
          {/* Flag Banner */}
          <div className="relative h-64 overflow-hidden">
            <img
              src={country.flags.svg}
              alt={`Flag of ${country.name.common}`}
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end">
              <div className="p-6">
                <h1 className="text-4xl font-bold text-white mb-2">{country.name.common}</h1>
                <p className="text-white/90 text-lg">{country.name.official}</p>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-6">
            {/* Quick Facts */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
              <div className="bg-blue-50 p-4 rounded-lg text-center shadow-sm">
                <p className="text-sm text-blue-600 font-medium">Population</p>
                <p className="text-xl font-bold">{country.population.toLocaleString()}</p>
              </div>
              <div className="bg-indigo-50 p-4 rounded-lg text-center shadow-sm">
                <p className="text-sm text-indigo-600 font-medium">Region</p>
                <p className="text-xl font-bold">{country.region}</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg text-center shadow-sm">
                <p className="text-sm text-purple-600 font-medium">Capital</p>
                <p className="text-xl font-bold">{country.capital?.[0] || "N/A"}</p>
              </div>
              <div className="bg-pink-50 p-4 rounded-lg text-center shadow-sm">
                <p className="text-sm text-pink-600 font-medium">Subregion</p>
                <p className="text-xl font-bold">{country.subregion || "N/A"}</p>
              </div>
            </div>

            {/* Detailed Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left Column */}
              <div className="space-y-4">
                <div className="bg-gray-50 p-5 rounded-lg shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Languages</h3>
                  <div className="flex flex-wrap gap-2">
                    {country.languages ? 
                      Object.values(country.languages).map((lang, idx) => (
                        <span key={idx} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                          {lang}
                        </span>
                      )) : 
                      <span className="text-gray-500">Information not available</span>
                    }
                  </div>
                </div>

                <div className="bg-gray-50 p-5 rounded-lg shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Currencies</h3>
                  <div className="flex flex-wrap gap-2">
                    {country.currencies ? 
                      Object.values(country.currencies).map((currency, idx) => (
                        <span key={idx} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                          {currency.name} ({currency.symbol})
                        </span>
                      )) : 
                      <span className="text-gray-500">Information not available</span>
                    }
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-4">
                <div className="bg-gray-50 p-5 rounded-lg shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Timezones</h3>
                  <div className="flex flex-wrap gap-2">
                    {country.timezones ? 
                      country.timezones.map((timezone, idx) => (
                        <span key={idx} className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
                          {timezone}
                        </span>
                      )) :
                      <span className="text-gray-500">Information not available</span>
                    }
                  </div>
                </div>

                {country.flags?.alt && (
                  <div className="bg-gray-50 p-5 rounded-lg shadow-sm">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Flag Meaning</h3>
                    <p className="text-gray-700">{country.flags.alt}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Border Countries Section */}
            {country.borders?.length > 0 && (
              <div className="mt-8 bg-gray-50 p-5 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Border Countries</h3>
                <div className="flex flex-wrap gap-3">
                  {country.borders.map((borderCode) => (
                    <button
                      key={borderCode}
                      onClick={() => navigate(`/country/${borderCode}`)}
                      className="px-4 py-2 bg-white border border-blue-200 text-blue-700 rounded-lg hover:bg-blue-600 hover:text-white transition duration-300 shadow-sm"
                    >
                      {borderCode}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="text-center text-gray-500 mt-8">
          <p>Data provided by REST Countries API</p>
        </div>
      </div>
    </div>
  );
}

export default CountryPage;