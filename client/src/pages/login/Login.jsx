import React, { useContext, useState } from "react";
import "./login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./../../context/AuthContext";
const Login = () => {
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { loading, dispatch } = useContext(AuthContext);
  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/auth/login", {
        username: credentials.username,
        password: credentials.password,
      });
      setError("");
      console.log("Entered in this block");
      // console.log("login success message is " + res.response);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      navigate("/");
    } catch (err) {
      setError(err.response.data);
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
      // setError("");
    }
  };

  return (
    <div className="login">
      <div className="lContainer">
        <input
          type="text"
          placeholder="username"
          id="username"
          onChange={handleChange}
          className="lInput"
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          onChange={handleChange}
          className="lInput"
        />
        <button
          disabled={!credentials.username || !credentials.password}
          onClick={handleClick}
          className="lButton"
        >
          Login
        </button>
        {error != "" && <span>{error}</span>}
      </div>
    </div>
  );
};

export default Login;
