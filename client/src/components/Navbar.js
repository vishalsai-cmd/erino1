import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; 

function Navbar() {
  return (
    <nav>
      <div className="container">
        <Link to="/" className="text-xl">
          Contact Manager
        </Link>
        <Link to="/add" className="bg-blue-500">
          Add Contact
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
