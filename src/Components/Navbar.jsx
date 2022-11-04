import React from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/Icons/Logo.svg";

function Navbar() {
  return (
    <nav>
      <div className="logo">
        <img src={Logo} alt="Logo" />
      </div>
      <ul>
        <li>
          <span className="link">
          <Link to="/">
            Home
          </Link>

          </span>
        </li>
        <li>
          <span className="link">
          <Link to="/errortest">
            Error Test
          </Link>

          </span>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
