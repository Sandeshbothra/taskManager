import React from "react";
import { Layout } from "./components/Layout/Layout";
import { Provider } from "react-redux";
import { Outlet } from "react-router-dom";
import { store } from "./store/store";
import "./App.css";

const App = () => {
  return (
    <Provider store={store}>
      <Layout>
        <Outlet />
      </Layout>
    </Provider>
  );
};

export default App;
