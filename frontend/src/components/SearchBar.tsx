import React from "react";

interface SearchBarProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSearch: () => void; // Function to trigger the search
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  onSearch,
  placeholder = "Search...",
}) => {
  return (
    <div className="relative m-0">
      {/* Input field */}
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="p-2 pl-4 pr-10 border rounded w-full" // Add padding on the right for the spinner
      />

      {/* Hourglass spinner (clickable) */}
      <button
        onClick={onSearch}
        className="absolute right-2 top-1/2 transform -translate-y-1/2"
        aria-label="Search"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-5 h-5 text-gray-500"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 2a10 10 0 11-7.707 17.707A10 10 0 012 12a10 10 0 1117.707-7.707A9.98 9.98 0 0112 2z"
          />
        </svg>
      </button>
    </div>
  );
};

export default SearchBar;
