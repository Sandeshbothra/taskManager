import React from "react";
import "./Layout.css";
import { MenuBar } from "./../MenuBar/MenuBar";

export const Layout = (props) => {
  return (
    <div className="Layout">
      <MenuBar />
      <div className="main-container">{props.children}</div>
    </div>
  );
};
