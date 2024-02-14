import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Context } from "../../main";

const InsuranceDetails = () => {
  // Get the insurance ID from the route parameters
  const { id } = useParams();

  // State to store the details of the insurance
  const [insurance, setInsurance] = useState({});

  // Hook to navigate to a different route
  const navigateTo = useNavigate();

  // Access global state using Context API
  const { isAuthorized, user } = useContext(Context);

  // Effect to fetch insurance details on component mount
  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/v1/insurance/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        setInsurance(res.data.insurance);
      })
      .catch((error) => {
        // Redirect to NotFound page if insurance is not found
        navigateTo("/notfound");
      });
  }, []);

  // Redirect to login page if user is not authorized
  if (!isAuthorized) {
    navigateTo("/login");
  }

  return (
    <section className="insuranceDetail page">
      <div className="container">
        <h3>Insurance Details</h3>
        <div className="banner">
          {/* Display insurance details */}
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
          {/* Display Apply Now link for non-admin users */}
          {user && user.role === "Admin" ? (
            <></>
          ) : (
            <Link to={`/application/${insurance._id}`}>Apply Now</Link>
          )}
        </div>
      </div>
    </section>
  );
};

export default InsuranceDetails;
