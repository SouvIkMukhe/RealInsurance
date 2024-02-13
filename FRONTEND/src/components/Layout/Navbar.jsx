import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../main";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { GiHamburgerMenu } from "react-icons/gi";

// Navbar component
const Navbar = () => {
  // State to manage the display of the mobile menu
  const [show, setShow] = useState(false);

  // Context to check user authorization
  const { isAuthorized, setIsAuthorized, user } = useContext(Context);

  // Hook for programmatic navigation
  const navigateTo = useNavigate();

  // Function to handle user logout
  const handleLogout = async () => {
    try {
      // Make a request to logout endpoint
      const response = await axios.get("http://localhost:4000/api/v1/user/logout", {
        withCredentials: true,
      });

      // Display success toast
      toast.success(response.data.message);

      // Update authorization state and navigate to login page
      setIsAuthorized(false);
      navigateTo("/login");
    } catch (error) {
      // Display error toast and maintain authorization state
      toast.error(error.response.data.message);
      setIsAuthorized(true);
    }
  };

  // Render the Navbar component
  return (
    <nav className={isAuthorized ? "navbarShow" : "navbarHide"}>
      <div className="container">
        <div className="logo">
          <img src="/RealInsurance.png" alt="logo" />
        </div>
        {/* Navigation menu */}
        <ul className={!show ? "menu" : "show-menu menu"}>
          <li>
            <Link to={"/"} onClick={() => setShow(false)}>
              HOME
            </Link>
          </li>
          <li>
            <Link to={"/insurance/getall"} onClick={() => setShow(false)}>
              ALL INSURANCES
            </Link>
          </li>
          <li>
            <Link to={"/applications/me"} onClick={() => setShow(false)}>
              {user && user.role === "Admin"
                ? "APPLICANT'S APPLICATIONS"
                : "MY APPLICATIONS"}
            </Link>
          </li>
          {/* Display additional options for Admin users */}
          {user && user.role === "Admin" ? (
            <>
              <li>
                <Link to={"/insurance/post"} onClick={() => setShow(false)}>
                  POST NEW INSURANCE
                </Link>
              </li>
              <li>
                <Link to={"/insurance/me"} onClick={() => setShow(false)}>
                  VIEW YOUR INSURANCES
                </Link>
              </li>
            </>
          ) : (
            <></>
          )}
          {/* Logout button */}
          <button onClick={handleLogout}>LOGOUT</button>
        </ul>
        {/* Hamburger menu icon for mobile */}
        <div className="hamburger">
          <GiHamburgerMenu onClick={() => setShow(!show)} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
