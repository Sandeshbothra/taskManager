import React from "react";
import { useAuth } from "./../../hooks/useAuth";
import "./MenuBar.css";

export const MenuBar = () => {
  const { logout } = useAuth();

  return (
    <div className="Menubar">
      <ul className="MenuItems">
        <li className="MenuItem">Home</li>
        <li className="MenuItem">Reports</li>
        <li className="MenuItem" onClick={logout}>
          Logout
        </li>
      </ul>
    </div>
  );
};
