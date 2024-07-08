import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-bold">Book App</div>
        <div className="flex space-x-8">
          <Link to="/books" className="text-white hover:text-gray-300">Books</Link>
          <Link to="/login" className="text-white hover:text-gray-300">Login</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
