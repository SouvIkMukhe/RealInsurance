import React, { useContext, useEffect } from "react";
import "./App.css";
import { Context } from "./main";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import { Toaster } from "react-hot-toast";
import axios from "axios";
import Navbar from "./components/Layout/Navbar";
import Footer from "./components/Layout/Footer";
import Home from "./components/Home/Home";
import Insurances from "./components/Insurance/Insurance";
import InsuranceDetails from "./components/Insurance/InsuranceDetails";
import Application from "./components/Application/Application";
import MyApplications from "./components/Application/MyApplications";
import PostInsurance from "./components/Insurance/PostInsurance";
import NotFound from "./components/NotFound/NotFound";
import MyInsurances from "./components/Insurance/MyInsurances";

const App = () => {
  // Access global state using Context API
  const { isAuthorized, setIsAuthorized, setUser } = useContext(Context);

  // Effect to fetch user information on component mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Make a GET request to fetch user details
        const response = await axios.get(
          "http://localhost:4000/api/v1/user/getuser",
          {
            withCredentials: true,
          }
        );
        // Set user details in global state and mark user as authorized
        setUser(response.data.user);
        setIsAuthorized(true);
      } catch (error) {
        // If error occurs, mark user as unauthorized
        setIsAuthorized(false);
      }
    };
    fetchUser();
  }, [isAuthorized]);

  // Render the main application component
  return (
    <>
      <BrowserRouter>
        {/* Render Navbar component */}
        <Navbar />
        <Routes>
          {/* Define routes for different components */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Home />} />
          <Route path="/insurance/getall" element={<Insurances />} />
          <Route path="/insurance/:id" element={<InsuranceDetails />} />
          <Route path="/application/:id" element={<Application />} />
          <Route path="/applications/me" element={<MyApplications />} />
          <Route path="/insurance/post" element={<PostInsurance />} />
          <Route path="/insurance/me" element={<MyInsurances />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        {/* Render Footer component */}
        <Footer />
        {/* Render Toaster component for displaying notifications */}
        <Toaster />
      </BrowserRouter>
    </>
  );
};

export default App;
