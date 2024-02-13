import React, { useContext, useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiLock2Fill } from "react-icons/ri";
import { FaPencilAlt } from "react-icons/fa";
import { FaPhoneFlip } from "react-icons/fa6";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { Context } from "../../main";

// Register component
const Register = () => {
  // State variables for user input
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  // Context for user authorization and user data
  const { isAuthorized, setIsAuthorized } = useContext(Context);

  // Function to handle user registration
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
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
      toast.success(data.message);
      // Clear form fields after successful registration
      setName("");
      setEmail("");
      setPassword("");
      setPhone("");
      setRole("");
      setIsAuthorized(true);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  // Redirect to home if already authorized
  if (isAuthorized) {
    return <Navigate to={'/'} />;
  }

  // Render the registration form
  return (
    <>
      <section className="authPage">
        <div className="container">
          <div className="header">
            <img src="/RealInsurance2.png" alt="logo" />
            <h3>Create a new account</h3>
          </div>
          <form>
            <div className="inputTag">
              {/* Dropdown to select user role */}
              <label>Register As</label>
              <div>
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                  <option value="">Select Role</option>
                  <option value="Admin">Admin</option>
                  <option value="Insurance Seeker">Insurance Seeker</option>
                </select>
                <FaRegUser />
              </div>
            </div>
            <div className="inputTag">
              {/* Input for user's name */}
              <label>Name</label>
              <div>
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
              {/* Input for email address */}
              <label>Email Address</label>
              <div>
                <input
                  type="email"
                  placeholder="sou@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <MdOutlineMailOutline />
              </div>
            </div>
            <div className="inputTag">
              {/* Input for phone number */}
              <label>Phone Number</label>
              <div>
                <input
                  type="number"
                  placeholder="00000000"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                <FaPhoneFlip />
              </div>
            </div>
            <div className="inputTag">
              {/* Input for password */}
              <label>Password</label>
              <div>
                <input
                  type="password"
                  placeholder="Your Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <RiLock2Fill />
              </div>
            </div>
            {/* Button to submit the registration form */}
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

export default Register;
