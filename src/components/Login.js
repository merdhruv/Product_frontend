import React from "react";
import "./main.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const body = {
      username: username,
      password: password,
    };
    try {
      const result = await axios.post("http://127.0.0.1:1902/api/user/auth/login", body);
      if(result.data.token){
        localStorage.setItem("token", result.data.token);
        navigate('/products',{replace:true});
      }
      else{
        throw "invalid username password";
      }
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
          setUsername(e.target.value);
        }}
      />
      <label htmlFor="">Password</label>
      <input
        type="password"
        name="password"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />

      <button className="btn btn-primary" onClick={handleSubmit}>
        Login
      </button>
    </form>
  );
}
