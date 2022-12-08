import React , { createContext, useContext, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "./useLocalStorage";
import { getDatabase, ref, onValue, set, push } from "firebase/database";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser, removeUser] = useLocalStorage("user", null);
  const navigate = useNavigate();
  const db = getDatabase();

  useEffect(() => {
    if(user){
        navigate('/') 
    }else{
        navigate("/login");
    }
  },[user])

  // call this function when you want to authenticate the user
  const login = async (formData) => {
    const challengeRef = ref(db, "/users");
    const error = null;
    onValue(challengeRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        let userObj = null;
        Object.keys(data).forEach((key) => {
          if (data[key].username == formData.username) {
            userObj = { id: key, username: formData.username };
          }
        });
        if (userObj) {
          setUser(userObj);
        } else {
          error = { ...errors, username: "User not found" };
        }
      }
    });
    return { status: error ? "Failed" : "Success", errorObj: error };
  };

  // call this function to sign out logged in user
  const logout = () => {
    removeUser();
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