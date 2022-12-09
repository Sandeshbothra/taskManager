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
  const login = async (formData) => {
    const { username, password } = formData;
    let docs = await getDocs(collection(db, "user"));
    let userObj = null;
    docs.forEach((doc) => {
      let user = doc.data();
      if (user.username == username) {
        userObj = { ...user, id: doc.id };
      }
    });
    if (userObj) {
      if (userObj.password == password) {
        setUser({ id: userObj.id, username: formData.username });
        setTimeout(() => {
          navigate("/");
        }, 500);
        return { status: "Success", message: "User Logged in successfully" };
      } else {
        return { status: error ? "Failed" : "Success", errorObj: error };
      }
    } else {
      addDoc(collection(db, "user"), formData).then((res) => {
        setUser({ id: res.id, username: formData.username });
        setTimeout(() => {
          navigate("/");
        }, 500);
        return {
          status: "Success",
          message: "User Create and Logged in successfully",
        };
      });
    }
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
