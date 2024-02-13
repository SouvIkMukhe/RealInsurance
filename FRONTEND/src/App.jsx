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
import Insurances from "./components/Insurance/Insurances";
import InsuranceDetails from "./components/Insurance/InsuranceDetails";
import Application from "./components/Application/Application";
import MyApplications from "./components/Application/MyApplications";
import PostInsurance from "./components/Insurance/PostInsurance";
import NotFound from "./components/NotFound/NotFound";
import MyInsurances from "./components/Insurance/MyInsurances";

const App = () => {
  const { isAuthorized, setIsAuthorized, setUser } = useContext(Context);

  // Fetch user data when the component mounts
  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Fetch user data from the server
        const response = await axios.get(
          "http://localhost:4000/api/v1/user/getuser",
          {
            withCredentials: true,
          }
        );
        // Set user data and mark as authorized if successful
        setUser(response.data.user);
        setIsAuthorized(true);
      } catch (error) {
        // If there's an error, mark as unauthorized
        setIsAuthorized(false);
      }
    };
    fetchUser();
  }, [isAuthorized]);

  // Render the main application structure
  return (
    <>
      <BrowserRouter>
        {/* Render the navigation bar */}
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
        {/* Render the footer */}
        <Footer />
        {/* Render the toast notifications */}
        <Toaster />
      </BrowserRouter>
    </>
  );
};

export default App;
