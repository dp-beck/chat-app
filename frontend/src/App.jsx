import { useEffect, useState } from 'react'
import './App.css'

function App() {

  const [user, setUser] = useState({});

  const loginUser = () => {
    fetch('http://localhost:3000/api/users/login', {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
    }).then((res) => {
      return res.json()
    }).then((data) => {
      localStorage.setItem('token', data.token);
      console.log("You are Logged in");
    })
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    loginUser();
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevProps) => ({
      ...prevProps,
      [name]: value
    }));
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="user_name">Username:</label>
        <input type="text" name="user_name" id="user_name" onChange={handleInputChange} />

        <label htmlFor="password">Password:</label>
        <input type="text" name="password" id="password" onChange={handleInputChange} />

        <input type="submit" value="Submit" />
      </form>
    </>
  )
}

export default App
