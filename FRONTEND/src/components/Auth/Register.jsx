// Import React and necessary components/libraries
import React, { useContext, useState } from "react";
import { FaRegUser, FaPencilAlt } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiLock2Fill } from "react-icons/ri";
import { FaPhoneFlip } from "react-icons/fa6";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { Context } from "../../main";

// Functional component for the Registration page
const Register = () => {
  // State variables for user input
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  // Accessing the global context for authorization and user information
  const { isAuthorized, setIsAuthorized, user, setUser } = useContext(Context);

  // Function to handle the registration form submission
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      // Make a POST request to the registration API endpoint
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/user/register",
        { name, phone, email, role, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      // Display success toast message on successful registration
      toast.success(data.message);

      // Clear input fields and set authorization status to true
      setName("");
      setEmail("");
      setPassword("");
      setPhone("");
      setRole("");
      setIsAuthorized(true);
    } catch (error) {
      // Display error toast message on registration failure
      toast.error(error.response.data.message);
    }
  };

  // Redirect to the home page if already authorized
  if (isAuthorized) {
    return <Navigate to={'/'} />;
  }

  return (
    <>
      {/* Registration Page UI */}
      <section className="authPage">
        <div className="container">
          <div className="header">
            <img src="/RealInsurance3.png" alt="logo" />
            <h3>Create a new account</h3>
          </div>
          {/* Registration Form */}
          <form>
            <div className="inputTag">
              <label>Register As</label>
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
              <label>Name</label>
              <div>
                {/* Input field for user name */}
                <input
                  type="text"
                  placeholder="Souvik"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <FaPencilAlt />
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
              <label>Phone Number</label>
              <div>
                {/* Input field for phone number */}
                <input
                  type="number"
                  placeholder="0000000000"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                <FaPhoneFlip />
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
            <button type="submit" onClick={handleRegister}>
              Register
            </button>
            {/* Link to the login page */}
            <Link to={"/login"}>Login Now</Link>
          </form>
        </div>
        {/* Banner image */}
        <div className="banner">
          <img src="/register.png" alt="login" />
        </div>
      </section>
    </>
  );
};

// Export the Register component
export default Register;
