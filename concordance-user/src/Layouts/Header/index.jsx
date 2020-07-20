import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";
export default function Header() {
  return (
    <header className="header">
      <nav className="navbar navbar-expand-lg  fixed-top ">
        {/* Header Logo */}
        <Link className="navbar-brand logo d-flex align-items-center" to="/">
          <img src="/images/logo1.jpg" className="logo-img mr-3" alt="" />
          <span>CONCORDANCE</span>
        </Link>
        {/* End header logo */}

        {/* Header button toggler */}
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        {/* End button toggler */}

        {/* Navbar item */}
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto navItems">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/search">
                Search
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/statistics">
                Statistics
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/help">
                Help
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/aboutus">
                Contact
              </Link>
            </li>
          </ul>
        </div>
        {/* End navbar item */}
      </nav>
    </header>
  );
}
