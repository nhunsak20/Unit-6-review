//!No need to change anything in here
import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <nav className="nav-header">
      <h1>SOSMS</h1>
      <div className="nav-links">
        <div>
          <Link to="/dashboard">Dashboard</Link>
        </div>
        <div>
          <Link to="/profile">Profile</Link>
        </div>
      </div>
    </nav>
  );
};

export default Header;
