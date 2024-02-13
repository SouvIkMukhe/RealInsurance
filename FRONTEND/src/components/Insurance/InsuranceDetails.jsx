import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Context } from "../../main";

// InsuranceDetails component
const InsuranceDetails = () => {
  // Extracting the 'id' parameter from the URL
  const { id } = useParams();

  // State to store insurance details
  const [insurance, setInsurance] = useState({});
  // State to store the updated status
  const [updatedStatus, setUpdatedStatus] = useState("");

  // Hook for navigation
  const navigateTo = useNavigate();

  // Context to check user authorization
  const { isAuthorized, user } = useContext(Context);

  // Fetch insurance details from the server upon component mount
  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/v1/insurance/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        setInsurance(res.data.insurance);
      })
      .catch((error) => {
        // Redirect to the 'notfound' page if insurance is not found
        navigateTo("/notfound");
      });
  }, [id]);

  // Function to handle status update
  const handleStatusUpdate = async () => {
    try {
      // Send a PATCH request to update the status
      const response = await axios.patch(
        `http://localhost:4000/api/v1/insurance/update-status/${id}`,
        { status: updatedStatus },
        { withCredentials: true }
      );

      // Handle success response
      console.log(response.data.message);
      // Optionally, you can update the local state or perform any additional actions
    } catch (error) {
      // Handle error
      console.error("Error updating status:", error.message);
    }
  };

  // Redirect to login page if not authorized
  if (!isAuthorized) {
    navigateTo("/login");
  }

  // Render the InsuranceDetails component
  return (
    <section className="insuranceDetail page">
      <div className="container">
        {/* Section title */}
        <h3>Insurance Details</h3>
        {/* Banner displaying insurance details */}
        <div className="banner">
          <p>
            Title: <span> {insurance.title}</span>
          </p>
          <p>
            Category: <span>{insurance.category}</span>
          </p>
          <p>
            Country: <span>{insurance.country}</span>
          </p>
          <p>
            City: <span>{insurance.city}</span>
          </p>
          <p>
            Location: <span>{insurance.location}</span>
          </p>
          <p>
            Description: <span>{insurance.description}</span>
          </p>
          <p>
            Insurance Posted On: <span>{insurance.insurancePostedOn}</span>
          </p>
          <p>
            Premium:{" "}
            {insurance.fixedPremium ? (
              <span>{insurance.fixedPremium}</span>
            ) : (
              <span>
                {insurance.premiumFrom} - {insurance.premiumTo}
              </span>
            )}
          </p>
          {/* Render 'Apply Now' link if the user is not an Admin */}
          {user && user.role === "Admin" ? (
            <>
              <div>
                <label htmlFor="status">Update Status:</label>
                <select
                  id="status"
                  value={updatedStatus}
                  onChange={(e) => setUpdatedStatus(e.target.value)}
                >
                  <option value="accepted">Accepted</option>
                  <option value="rejected">Rejected</option>
                  {/* Add more options if needed */}
                </select>
              </div>
              <button onClick={handleStatusUpdate}>Update Status</button>
            </>
          ) : (
            <Link to={`/application/${insurance._id}`}>Apply Now</Link>
          )}
        </div>
      </div>
    </section>
  );
};

export default InsuranceDetails;
