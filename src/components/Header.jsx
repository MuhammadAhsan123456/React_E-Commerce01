import React, { useState } from "react";
import { FaSearch, FaBars, FaTimes } from "react-icons/fa";

const Header = ({ onSearch, onAddProduct }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {/* Top Row */}
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <button 
              className="md:hidden mr-4 text-gray-700"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <FaTimes size={30} color="blue" /> : <FaBars size={30} color="blue" />}
            </button>
            <h1 className="text-2xl font-bold text-blue-600">FakeStore</h1>
          </div>

          {/* Desktop Nav */}
        <nav className="hidden md:flex justify-center space-x-6 mt-4">
          <a href="#" className="text-gray-700 hover:text-blue-600 font-bold">Home</a>
          <a href="#" className="text-gray-700 hover:text-blue-600 font-bold">Products</a>
          <a href="#" className="text-gray-700 hover:text-blue-600 font-bold">About</a>
          <a href="#" className="text-gray-700 hover:text-blue-600 font-bold">Contact</a>
        </nav>

          {/* Desktop Search + Add Product */}
          <div className="hidden md:flex items-center gap-4">
            <input
              type="text"
              placeholder="Search products..."
              onChange={(e) => onSearch(e.target.value)}
              className="border px-3 py-1 rounded-md text-sm"
            />
            <button
              onClick={onAddProduct}
              className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition cursor-pointer"
            >
              Add Product
            </button>
          </div>

          {/* Mobile Search Icon */}
          <button 
            className="md:hidden text-gray-700"
            onClick={() => setSearchOpen(!searchOpen)}
          >
            <FaSearch size={30} color="blue" />
          </button>
        </div>

        {/* Mobile Search */}
        {searchOpen && (
          <div className="mt-3 md:hidden">
            <input
              type="text"
              placeholder="Search products..."
              onChange={(e) => onSearch(e.target.value)}
              className="border px-3 py-1 rounded-md text-sm w-full"
            />
          </div>
        )}

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <nav className="mt-3 space-y-2 md:hidden">
            <a href="#" className="block text-gray-700 hover:text-blue-600 p-2">Home</a>
            <a href="#" className="block text-gray-700 hover:text-blue-600 p-2">Products</a>
            <a href="#" className="block text-gray-700 hover:text-blue-600 p-2">About</a>
            <a href="#" className="block text-gray-700 hover:text-blue-600 p-2">Contact</a>
            <button
              onClick={onAddProduct}
              className="block w-full text-left bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition p-2"
            >
              Add Product
            </button>
          </nav>
        )}

        
      </div>
    </header>
  );
};

export default Header;
