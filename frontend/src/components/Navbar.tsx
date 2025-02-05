import React, { useState } from "react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";

const Navbar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = () => {
    console.log("Searching for:", searchQuery);
  };

  return (
    <div className="flex py-4 px-8 bg-white justify-between items-center border-b-2">
      <Link to="/" className="text-blue-600 text-3xl">
        EduFlex
      </Link>
      <div className="flex items-center gap-6">
        <nav className="">
          <ul className="flex space-x-6 text-gray-500">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
          </ul>
        </nav>
        <SearchBar
          value={searchQuery}
          onChange={handleSearchChange}
          onSearch={handleSearch} // Pass the search handler to the SearchBar
          placeholder="Search courses..."
        />
      </div>
    </div>
  );
};

export default Navbar;
