import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./../../../hooks/useAuth";

export const LoginForm = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const handleLogin = (e) => {
    e.preventDefault();
    login({username})
  };

  return (
    <form className="LoginForm" onSubmit={handleLogin}>
      <input
        type={"text"}
        name="username"
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
      ></input>
      <input
        type="password"
        name="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      ></input>
      <button type={"submit"} value="submit" className="primary-btn">
        LOGIN
      </button>

      <button className="secondary-btn" onClick={() => navigate("/signup")}>
        Signup
      </button>
    </form>
  );
};
