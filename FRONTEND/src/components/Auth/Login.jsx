// Import React and necessary components/libraries
import React, { useContext, useState } from "react";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiLock2Fill } from "react-icons/ri";
import { Link, Navigate } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";
import axios from "axios";
import toast from "react-hot-toast";
import { Context } from "../../main";

// Functional component for the Login page
const Login = () => {
  // State variables for user input
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  // Accessing the global context for authorization
  const { isAuthorized, setIsAuthorized } = useContext(Context);

  // Function to handle the login form submission
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Make a POST request to the login API endpoint
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/user/login",
        { email, password, role },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      // Display success toast message on successful login
      toast.success(data.message);

      // Clear input fields and set authorization status to true
      setEmail("");
      setPassword("");
      setRole("");
      setIsAuthorized(true);
    } catch (error) {
      // Display error toast message on login failure
      toast.error(error.response.data.message);
    }
  };

  // Redirect to the home page if already authorized
  if (isAuthorized) {
    return <Navigate to={'/'} />;
  }

  return (
    <>
      {/* Login Page UI */}
      <section className="authPage">
        <div className="container">
          <div className="header">
            <img src="/RealInsurance2.png" alt="logo" />
            <h3>Login to your account</h3>
          </div>
          {/* Login Form */}
          <form>
            <div className="inputTag">
              <label>Login As</label>
              <div>
                {/* Dropdown for selecting user role */}
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                  <option value="">Select Role</option>
                  <option value="Admin">Admin</option>
                  <option value="Insurance Seeker">Insurance Seeker</option>
                </select>
                <FaRegUser />
              </div>
            </div>
            <div className="inputTag">
              <label>Email Address</label>
              <div>
                {/* Input field for email */}
                <input
                  type="email"
                  placeholder="souvik@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <MdOutlineMailOutline />
              </div>
            </div>
            <div className="inputTag">
              <label>Password</label>
              <div>
                {/* Input field for password */}
                <input
                  type="password"
                  placeholder="Your Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <RiLock2Fill />
              </div>
            </div>
            {/* Submit button */}
            <button type="submit" onClick={handleLogin}>
              Login
            </button>
            {/* Link to the registration page */}
            <Link to={"/register"}>Register Now</Link>
          </form>
        </div>
        {/* Banner image */}
        <div className="banner">
          <img src="/login.png" alt="login" />
        </div>
      </section>
    </>
  );
};

// Export the Login component
export default Login;
