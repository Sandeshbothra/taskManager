import React, { useState } from "react";
import { useAuth } from "./../../../hooks/useAuth";

export const LoginForm = () => {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const handleLogin = (e) => {
    e.preventDefault();
    console.log(login({ username, password }));
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
    </form>
  );
};
