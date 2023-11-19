import React from "react";
import "./main.css";
import { useState } from "react";
import axios from "axios";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const body = {
      username: username,
      password: password,
    };
    try {
      const result = await axios.post("https://dummyjson.com/auth/login", body);
      console.log(result);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form action="" className="login-page">
      <label htmlFor="">Username</label>
      <input
        type="text"
        name="username"
        onChange={(e) => {
          console.log(e.target.value);
          setUsername(e.target.value);
        }}
      />
      {username}
      <label htmlFor="">Password</label>
      <input
        type="password"
        name="password"
        onChange={(e) => {
          console.log(e.target.value);
          setPassword(e.target.value);
        }}
      />

      <button className="btn btn-primary" onClick={handleSubmit}>
        Login
      </button>
    </form>
  );
}
