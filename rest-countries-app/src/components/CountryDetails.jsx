export default function CountryDetails({ country, onClose }) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg w-96 relative">
          <button onClick={onClose} className="absolute top-2 right-2 text-red-600 font-bold">X</button>
          <img src={country.flags.svg} alt={country.name.common} className="h-32 w-full object-cover rounded" />
          <h2 className="text-2xl font-bold mt-2">{country.name.common}</h2>
          <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
          <p><strong>Region:</strong> {country.region}</p>
          <p><strong>Capital:</strong> {country.capital?.[0]}</p>
          <p><strong>Languages:</strong> {country.languages ? Object.values(country.languages).join(", ") : "N/A"}</p>
        </div>
      </div>
    );
  }
  