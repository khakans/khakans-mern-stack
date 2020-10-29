import React, { Component } from "react";
import { Link } from "react-router-dom";

class Navbar extends Component {
  render() {
    return (
      <div className="navigation">
        <nav className="navbar navbar-expand-lg navbar-light bg-warning">
          <div className="container">
            <Link className="navbar-brand" to="/dashboard">
              E-Commerce
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarResponsive"
              aria-controls="navbarResponsive"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarResponsive">
              <ul className="navbar-nav ml-auto">
                <li>
                  <Link className="nav-link" to="/seller">
                    Seller  
                  </Link>
                </li>
                <li>
                  <Link className="nav-link" to="/buyer">
                    Buyer
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

export default Navbar;
