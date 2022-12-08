import React, { useState } from "react";
import { useAuth } from "./../../hooks/useAuth";
import {
  AiOutlineMenuUnfold,
  AiOutlineMenuFold,
  AiFillHome,
} from "react-icons/ai";
import { TbDeviceAnalytics, TbLogout } from "react-icons/tb";
import "./MenuBar.css";

export const MenuBar = () => {
  const { logout } = useAuth();
  const [navbarOpen, setNavbarOpen] = useState(false);

  const handleToggle = () => {
    setNavbarOpen(!navbarOpen);
  };

  return (
    <div className="Menubar">
      <ul className={`MenuItems ${navbarOpen ? "showMenu" : ""}`}>
        <li className="MenuItem hambergerIcon" onClick={handleToggle}>
          {navbarOpen ? (
            <AiOutlineMenuFold className="MenuIcon" />
          ) : (
            <AiOutlineMenuUnfold className="MenuIcon" />
          )}
        </li>
        <li className="MenuItem" title="Home">
          <AiFillHome className="MenuIcon" />
          {navbarOpen && <p className="MenuText">Home</p>}
        </li>
        <li className="MenuItem" title="Reports">
          <TbDeviceAnalytics className="MenuIcon" />
          {navbarOpen && <p className="MenuText">Reports</p>}
        </li>
        <li className="MenuItem" onClick={logout} title="Logout">
          <TbLogout className="MenuIcon" />
          {navbarOpen && <p className="MenuText">Logout</p>}
        </li>
      </ul>
    </div>
  );
};
