import React, { useState } from "react";
import { useLocalStorage } from "../../../hooks/useLocalStorage";
import { collection, addDoc, getDocs, getFirestore } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";

export const LoginForm = () => {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const db = getFirestore();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    let docs = await getDocs(collection(db, "user"));
    let userObj = null;
    docs.forEach((doc) => {
      let u = doc.data();
      if (u.username == username) {
        userObj = { ...u, id: doc.id };
      }
    });
    if (userObj) {
      if (userObj.password == password) {
        setErrorMsg(null);
        setSuccessMessage("User Logged in successfully");
        login({ id: userObj.id, username: username })
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        setErrorMsg("Invaid Password");
      }
    } else {
      addDoc(collection(db, "user"), formData).then((res) => {
        login({ id: res.id, username: formData.username })
        setErrorMsg(null);
        setSuccessMessage("User Create and Logged in successfully");
        setTimeout(() => {
          navigate("/");
        }, 500);
      });
    }
  };

  return (
    <form className="LoginForm" onSubmit={handleLogin}>
      <input
        type={"text"}
        name="username"
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
      ></input>
      <input
        type="password"
        name="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      ></input>
      {(errorMsg || successMessage) && (
        <p className={errorMsg ? "error" : "success"}>
          {errorMsg || successMessage}
        </p>
      )}

      <button type={"submit"} value="submit" className="primary-btn">
        LOGIN
      </button>
    </form>
  );
};
