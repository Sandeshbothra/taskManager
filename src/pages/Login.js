import React from "react";
import "./Login.css";

export const Login = (props) => {
  return (
    <div className="LoginPage">
      {props.children}
    </div>
  );
};
