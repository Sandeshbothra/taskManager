import React from "react";
import "./Login.css";

export const Login = (props) => {
  return (
    <div className="LoginContainer">
      <div className="LoginPage">
        <h2 className="LoginHeader">Login Form</h2>
        {props.children}
      </div>
    </div>
  );
};
