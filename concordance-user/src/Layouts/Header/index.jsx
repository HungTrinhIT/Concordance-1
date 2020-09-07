import React from "react";
import "./Header.css";
import { Link, NavLink } from "react-router-dom";
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
              <NavLink
                className="nav-link"
                exact={true}
                activeClassName="is-active"
                to="/"
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                to="/search"
                activeClassName="is-active"
              >
                Search
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                to="/statistics"
                activeClassName="is-active"
              >
                Statistics
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                to="/help"
                activeClassName="is-active"
              >
                Help
              </NavLink>
            </li>
          </ul>
        </div>
        {/* End navbar item */}

        <div className="direct-admin">
          <a href="http://localhost:3001/login" target="_blank">
            Go to admin<i className="fa fa-directions ml-3"></i>
          </a>
        </div>
      </nav>
    </header>
  );
}
