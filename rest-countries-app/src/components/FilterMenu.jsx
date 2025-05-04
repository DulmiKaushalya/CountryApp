export default function FilterMenu({ onFilter }) {
    const regions = ["Africa", "Americas", "Asia", "Europe", "Oceania"];
  
    return (
      <select className="p-2 border rounded" onChange={(e) => onFilter(e.target.value)}>
        <option value="">Filter by Region</option>
        {regions.map((region) => (
          <option key={region} value={region}>
            {region}
          </option>
        ))}
      </select>
    );
  }
  