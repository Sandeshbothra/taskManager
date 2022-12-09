import React, { useState } from "react";
import { useAuth } from "./../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { reset } from "./../../store/slice/TaskSlice";
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
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleToggle = () => {
    setNavbarOpen(!navbarOpen);
  };

  const handleLogout = () => {
    logout();
    dispatch(reset())
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
        <li className="MenuItem" title="Home" onClick={() => navigate("/")}>
          <AiFillHome className="MenuIcon" />
          {navbarOpen && <p className="MenuText">Home</p>}
        </li>
        <li
          className="MenuItem"
          title="Reports"
          onClick={() => navigate("/reports")}
        >
          <TbDeviceAnalytics className="MenuIcon" />
          {navbarOpen && <p className="MenuText">Reports</p>}
        </li>
        <li className="MenuItem" onClick={handleLogout} title="Logout">
          <TbLogout className="MenuIcon" />
          {navbarOpen && <p className="MenuText">Logout</p>}
        </li>
      </ul>
    </div>
  );
};
