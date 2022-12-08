import React, { useState } from "react";
import { firebaseDB } from "./../../../api/firebase_config";
import { getDatabase, ref, onValue, set, push } from "firebase/database";
import { useNavigate } from "react-router-dom";

export const SignupForm = () => {
  const db = getDatabase();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  const handleSignup = (e) => {
    e.preventDefault()
    if(password != confirmPassword){
        setErrors({confirmPassword:"Password did not matched"})
    }
    const userRef = ref(db, "/users");
    onValue(userRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        Object.keys(data).forEach((key) => {
          console.log(data, key);
        });
      }else{
        push(ref(db, 'users'), {
            username,
            password, 
            created_on:new Date().getTime(), 
        }).then((response) => {
            navigate('/');
        })
      }
    });
  };

  return (
    <form className="LoginForm" onSubmit={handleSignup}>
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
      <input
        type="password"
        name="password"
        placeholder="Confirm Password"
        onChange={(e) => setconfirmPassword(e.target.value)}
      ></input>
      <button type={"submit"} value="submit" className="primary-btn">
        Sign Up
      </button>

      <button className="secondary-btn" onClick={() => navigate('/login')}>
        Already a Member ! Login
      </button>
    </form>
  );
};
