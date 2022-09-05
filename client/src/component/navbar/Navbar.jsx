import React from "react";
import "./navbar.css";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const handlRoute = () => {
    navigate("/");
  };
  return (
    <div className="navbar">
      <div className="navContainer">
        <div
          onClick={handlRoute}
          className="navbar_logo"
          style={{ cursor: "pointer" }}
        >
          Booking.com
        </div>
        <div className="navbar_items">
          <button className="navbar_button">SignUp</button>
          <button className="navbar_button">login</button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
