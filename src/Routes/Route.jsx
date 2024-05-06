import React from 'react';
import {
    createBrowserRouter,
  } from "react-router-dom";
  import Home from '../Pages/Home/Home';
import ErrorPage from '../Pages/ErrorPage/ErrorPage';
import Root from '../Layout/Root';
import Login from '../Pages/Login/Login';
import Register from '../Pages/Register/Register';
import JobDetails from '../Pages/JobDetails/JobDetails';

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root></Root>,
      errorElement: <ErrorPage></ErrorPage>,
      children: [
        {
            path: '/',
            element: <Home></Home>,
        },
        {
            path: '/login',
            element: <Login></Login>,
        },
        {
            path: '/register',
            element: <Register></Register>
        },
        {
          path: '/job/:id',
          element: <JobDetails></JobDetails>,
          loader: ({params})=> fetch(`${import.meta.env.VITE_API_URL}/job/${params.id}`)
        }
      ]
    },
  ]);

export default router;