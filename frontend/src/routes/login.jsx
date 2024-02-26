import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

function Login() {

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
        setUser(e.target[0].value);
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
  
    return (
      <>
        <form onSubmit={handleSubmit}>
          <label htmlFor="user_name">Username:</label>
          <input type="text" name="user_name" id="user_name" />
  
          <label htmlFor="password">Password:</label>
          <input type="password" name="password" id="password" />
  
          <input type="submit" value="Submit" />
        </form>
        {user && (<Navigate to='/' replace={true} />)}
      </>
    )
  }
  
  export default Login
  