import { FaHeart, FaRegHeart } from "react-icons/fa";

export default function CountryCard({
  country,
  onSelect,
  onToggleFavorite,
  isFavorite,
}) {
  return (
    <div className="border p-5 rounded-lg shadow hover:shadow-xl relative ">
      <button
        onClick={() => onToggleFavorite(country.cca3)}
        className="absolute top-1 right-1 text-2xl bg-white rounded-full p-1 shadow"
        title={isFavorite ? "Remove from Favorites" : "Add to Favorites"}
      >
        {isFavorite ? (
          <FaHeart className="text-yellow-400" />
        ) : (
          <FaRegHeart className="text-black-400" />
        )}
      </button>

      <div onClick={() => onSelect(country)} className="cursor-pointer">
        <img
          src={country.flags.svg}
          alt={country.name.common}
          className="h-32 w-full object-cover rounded"
        />
        <h2 className="text-lg font-bold mt-2">{country.name.common}</h2>
        <p>Population: {country.population.toLocaleString()}</p>
        <p>Region: {country.region}</p>
        <p>Capital: {country.capital?.[0]}</p>
      </div>
    </div>
  );
}
