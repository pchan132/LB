import { useState } from "react";

const data = ["Apple", "Banana", "Cherry", "Mango", "Orange", "Pineapple", "Strawberry"];

export default function AutoComplete() {
  const [query, setQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  // Handle input change and filter results
  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    setFilteredData(
      value ? data.filter((item) => item.toLowerCase().includes(value.toLowerCase())) : []
    );
  };

  // Handle item selection
  const handleSelect = (value) => {
    setQuery(value);
    setFilteredData([]); // Hide suggestions after selection
  };

  return (
    <div className="relative w-72 mx-auto mt-10">
      <input
        type="text"
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        placeholder="Search..."
        value={query}
        onChange={handleChange}
      />
      {filteredData.length > 0 && (
        <ul className="absolute left-0 right-0 bg-white border border-gray-300 rounded-md mt-1 shadow-lg">
          {filteredData.map((item, index) => (
            <li
              key={index}
              className="p-2 hover:bg-blue-100 cursor-pointer"
              onClick={() => handleSelect(item)}
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
