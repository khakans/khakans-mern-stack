import React, { Component } from "react";
import { Link } from "react-router-dom";

class Navbar extends Component {
  render() {
    return (
      <div className="navigation">
        <nav className="navbar navbar-expand-lg navbar-dark bg-warning">
          <div className="container">
            <Link className="navbar-brand" style={{fontSize: 15, fontWeight: 700}} to="/dashboard">
              E-COMMERCE
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
                  <Link className="nav-link" style={{fontSize: 15, fontWeight: 700}} to="/seller">
                    MY STORE  
                  </Link>
                </li>
                <li>
                  <Link className="nav-link" style={{fontSize: 15, fontWeight: 700}} to="/buyer">
                    MY ACCOUNT
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
