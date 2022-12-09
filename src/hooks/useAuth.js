import React, { createContext, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "./useLocalStorage";
import {
  collection,
  addDoc,
  getDocs,
  getFirestore,
  doc,
} from "firebase/firestore";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser, removeUser] = useLocalStorage("user", null);
  const navigate = useNavigate();
  const db = getFirestore();

  // call this function when you want to authenticate the user
  const login = async (userObj) => {
    setUser(userObj)
  };

  // call this function to sign out logged in user
  const logout = () => {
    removeUser();
    navigate("/login");
  };

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
    }),
    [user]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
