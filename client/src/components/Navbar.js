import React from "react";
import { Link } from "react-router-dom";
import { BiHomeAlt2 } from "react-icons/bi";
import { CgLogIn } from "react-icons/cg";
import { CgProfile } from "react-icons/cg";
import "./css/Navbar.css";

const Navbar = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user) {
    return (
      <nav className="navbar navbar-expand navbar-white bg-white">
        <div className="container-fluid">
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav mx-auto">
              <li className="nav-item">
                <Link className="nav-link" to={`/users/${user.uid}`}>
                  <CgProfile />
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  <BiHomeAlt2 />
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  <CgLogIn />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  } else {
    return (
      <nav className="navbar navbar-expand navbar-white bg-white">
        <div className="container-fluid">
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav mx-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  <BiHomeAlt2 />
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  <CgLogIn />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
};

export default Navbar;
