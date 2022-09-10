import React, { useContext } from "react";
import "./navbar.css";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./../../context/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const handlRoute = () => {
    navigate("/");
  };
  const { dispatch, user } = useContext(AuthContext);
  const handleLogin = () => {
    navigate("/login");
  };
  const handleClick = () => {
    dispatch({ type: "LOGOUT" });
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
        {user ? (
          <>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              className="userDeatils"
            >
              <p>{user.username} </p>
              <button className="navbar_button" onClick={handleClick}>
                Log Out
              </button>
            </div>
          </>
        ) : (
          <div className="navbar_items">
            <button className="navbar_button">SignUp</button>
            <button className="navbar_button" onClick={handleLogin}>
              login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
