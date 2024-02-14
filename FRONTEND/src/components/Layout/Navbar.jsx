// Import necessary dependencies
import React, { useContext, useState } from "react";
import { Context } from "../../main";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { GiHamburgerMenu } from "react-icons/gi";

// Navbar component
const Navbar = () => {
  // State to manage the visibility of the menu
  const [show, setShow] = useState(false);

  // Accessing context for user authentication
  const { isAuthorized, setIsAuthorized, user } = useContext(Context);

  // Accessing the navigate function from react-router-dom
  const navigateTo = useNavigate();

  // Function to handle user logout
  const handleLogout = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/v1/user/logout",
        {
          withCredentials: true,
        }
      );
      toast.success(response.data.message);
      setIsAuthorized(false);
      navigateTo("/login");
    } catch (error) {
      // Handle errors in case of logout failure
      toast.error(error.response.data.message);
      setIsAuthorized(true);
    }
  };

  // JSX rendering
  return (
    <nav className={isAuthorized ? "navbarShow" : "navbarHide"}>
      <div className="container">
        <div className="logo">
          <img src="/RealInsurance.png" alt="logo" />
        </div>
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
        {/* Hamburger menu icon */}
        <div className="hamburger">
          <GiHamburgerMenu onClick={() => setShow(!show)} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
