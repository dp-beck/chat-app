import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, redirect, RouterProvider } from 'react-router-dom';
import Root from './routes/root.jsx';
import Login from './routes/login.jsx';

//I want it to redirect if the user is not logged in. How do I know if the user is logged in?
// If the user has a valid auth token; how to check for valid 

const loader = async () => {
  const response = await fetch('http://localhost:3000/api/protected', {
    headers: {
      Authorization: `Bearer ${localStorage.token}`,
    }
  });
  console.log(response.status);
  if (response.status === 401) {
    return redirect("/login");
  }
  return null;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    loader: loader,
  },
  {
    path: '/login',
    element: <Login />
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
