export default function SearchBar({ onSearch }) {
    return (
      <input
        type="text"
        placeholder="Search by country name"
        className="w-full p-2 border rounded shadow"
        onChange={(e) => onSearch(e.target.value)}
      />
    );
  }
  