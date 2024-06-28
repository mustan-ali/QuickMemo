import React from "react";
import ProfileInfo from "./ProfileInfo";
import { useNavigate } from "react-router-dom";
import SearchBar from "../SearchBar";

const Navbar = ({ userInfo, onSearch, onClearSearch }) => {
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = React.useState("");

  const handleSearch = () => {
    if (searchQuery) {
      onSearch(searchQuery);
    }
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    onClearSearch();
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="bg-white flex justify-between items-center px-6 py-2 drop-shadow">
      <h2 className="text-xl font-medium text-black py-2">QuickMemo</h2>
      <SearchBar
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        handleSearch={handleSearch}
        onClearSearch={handleClearSearch}
      />
      <ProfileInfo onLogout={handleLogout} userInfo={userInfo} />
    </div>
  );
};

export default Navbar;
