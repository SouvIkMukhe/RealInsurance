import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Context } from "../../main";
const InsuranceDetails = () => {
  const { id } = useParams();
  const [insurance, setInsurance] = useState({});
  const navigateTo = useNavigate();

  const { isAuthorized, user } = useContext(Context);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/v1/insurance/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        setInsurance(res.data.insurance);
      })
      .catch((error) => {
        navigateTo("/notfound");
      });
  }, []);

  if (!isAuthorized) {
    navigateTo("/login");
  }

  return (
    <section className="insuranceDetail page">
      <div className="container">
        <h3>Insurance Details</h3>
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
