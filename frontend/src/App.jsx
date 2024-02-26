import { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {

  const [user, setUser] = useState();

  const loginUser = (e) => {
    fetch('http://localhost:3000/api/users/login', {
      method: 'POST',
      body: JSON.stringify({
        user_name: e.target[0].value,
        password: e.target[1].value,
      }),
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
    }).then((res) => {
      return res.json()
    }).then((data) => {
      localStorage.setItem('token', data.token);
      console.log("You are Logged in");
      console.log(`User: ${user}`);
      console.log(data.token);
    })
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    loginUser(e);
  }

  const handleInputChange = (e) => {
    setUser(e.target.value);
  }
  
  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="user_name">Username:</label>
        <input type="text" name="user_name" id="user_name" onChange={handleInputChange} />

        <label htmlFor="password">Password:</label>
        <input type="password" name="password" id="password" />

        <input type="submit" value="Submit" />
      </form>
    </>
  )
}

export default App
