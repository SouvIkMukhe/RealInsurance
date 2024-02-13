// Import necessary modules and files
import axios from "axios";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { Context } from "../../main";

// Application component
const Application = () => {
  // State variables for form inputs and file
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [aadhar, setAadhar] = useState(null);

  // Context for user authorization
  const { isAuthorized, user } = useContext(Context);

  // Navigation hook
  const navigateTo = useNavigate();

  // Get insurance ID from route parameters
  const { id } = useParams();

  // Function to handle file input changes
  const handleFileChange = (event) => {
    const aadhar = event.target.files[0];
    setAadhar(aadhar);
  };

  // Function to handle application form submission
  const handleApplication = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("address", address);
    formData.append("coverLetter", coverLetter);
    formData.append("aadhar", aadhar);
    formData.append("insuranceId", id);

    try {
      // Send application data to the server using Axios
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/application/post",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Reset form fields, show success toast, and navigate to the insurance page
      setName("");
      setEmail("");
      setCoverLetter("");
      setPhone("");
      setAddress("");
      setAadhar("");
      toast.success(data.message);
      navigateTo("/insurance/getall");
    } catch (error) {
      // Display error toast if the server request fails
      toast.error(error.response.data.message);
    }
  };

  // Function to handle admin decision
  const handleAdminDecision = async (decision) => {
    try {
      // Send admin decision to the server using Axios
      const { data } = await axios.patch(
        `http://localhost:4000/api/v1/application/adminDecision/${id}`,
        { decision },
        { withCredentials: true }
      );

      // Show success toast and navigate to the insurance page
      toast.success(data.message);
      navigateTo("/insurance/getall");
    } catch (error) {
      // Display error toast if the server request fails
      toast.error(error.response.data.message);
    }
  };

  // Redirect to home if not authorized or user is an admin
  if (!isAuthorized || (user && user.role === "Admin")) {
    navigateTo("/");
  }

  // Render the application form
  return (
    <section className="application">
      <div className="container">
        <h3>Application Form</h3>
        {/* Form for the user to fill out the insurance application */}
        <form onSubmit={handleApplication}>
          {/* Input fields for user information */}
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="number"
            placeholder="Your Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <input
            type="text"
            placeholder="Your Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          {/* Textarea for the cover letter */}
          <textarea
            placeholder="CoverLetter..."
            value={coverLetter}
            onChange={(e) => setCoverLetter(e.target.value)}
          />
          <div>
            {/* Input for selecting Aadhar file */}
            <label
              style={{ textAlign: "start", display: "block", fontSize: "20px" }}
            >
              Select Aadhar
            </label>
            <input
              type="file"
              accept=".pdf, .jpg, .png"
              onChange={handleFileChange}
              style={{ width: "100%" }}
            />
          </div>
          {/* Button to submit the application form */}
          <button type="submit">Send Application</button>
        </form>

        {/* Admin actions */}
        
      </div>
    </section>
  );
};

// Export the Application component as the default export
export default Application;
