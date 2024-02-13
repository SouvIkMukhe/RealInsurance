import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Context } from "../../main";

const PostInsurance = () => {
  // State variables to manage form data
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [location, setLocation] = useState("");
  const [premiumFrom, setPremiumFrom] = useState("");
  const [premiumTo, setPremiumTo] = useState("");
  const [fixedPremium, setFixedPremium] = useState("");
  const [premiumType, setPremiumType] = useState("default");

  // Context for user authorization
  const { isAuthorized, user } = useContext(Context);

  // Function to handle insurance post submission
  const handleInsurancePost = async (e) => {
    e.preventDefault();

    // Clear premium values based on the selected premium type
    if (premiumType === "Fixed Premium") {
      setPremiumFrom("");
      setPremiumTo("");
    } else if (premiumType === "Ranged Premium") {
      setFixedPremium("");
    } else {
      setPremiumFrom("");
      setPremiumTo("");
      setFixedPremium("");
    }

    // Send a POST request to the server to create a new insurance
    await axios
      .post(
        "http://localhost:4000/api/v1/insurance/post",
        fixedPremium.length >= 4
          ? {
              title,
              description,
              category,
              country,
              city,
              location,
              fixedPremium,
            }
          : {
              title,
              description,
              category,
              country,
              city,
              location,
              premiumFrom,
              premiumTo,
            },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        toast.success(res.data.message);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  // Navigation hook for redirecting unauthorized users
  const navigateTo = useNavigate();
  if (!isAuthorized || (user && user.role !== "Admin")) {
    navigateTo("/");
  }

  return (
    <>
      <div className="insurance_post page">
        <div className="container">
          <h3>POST NEW INSURANCE</h3>
          <form onSubmit={handleInsurancePost}>
            {/* Input fields for insurance details */}
            <div className="wrapper">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Insurance Title"
              />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Select Category</option>
                <option value="Health">Health</option>
                <option value="Fire">Fire</option>
                <option value="Life">Life</option>
                <option value="Building">Building</option>
                <option value="Car">Car</option>
                <option value="Bike">Bike</option>
                {/* Add other category options here */}
              </select>
            </div>
            <div className="wrapper">
              <input
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                placeholder="Country"
              />
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="City"
              />
            </div>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Location"
            />
            {/* Premium type selection and corresponding input fields */}
            <div className="premium_wrapper">
              <select
                value={premiumType}
                onChange={(e) => setPremiumType(e.target.value)}
              >
                <option value="default">Select Premium Type</option>
                <option value="Fixed Premium">Fixed Premium</option>
                <option value="Ranged Premium">Ranged Premium</option>
              </select>
              <div>
                {premiumType === "default" ? (
                  <p>Please provide Premium Type *</p>
                ) : premiumType === "Fixed Premium" ? (
                  <input
                    type="number"
                    placeholder="Enter Fixed Premium"
                    value={fixedPremium}
                    onChange={(e) => setFixedPremium(e.target.value)}
                  />
                ) : (
                  <div className="ranged_premium">
                    <input
                      type="number"
                      placeholder="Premium From"
                      value={premiumFrom}
                      onChange={(e) => setPremiumFrom(e.target.value)}
                    />
                    <input
                      type="number"
                      placeholder="Premium To"
                      value={premiumTo}
                      onChange={(e) => setPremiumTo(e.target.value)}
                    />
                  </div>
                )}
              </div>
            </div>
            {/* Textarea for insurance description */}
            <textarea
              rows="10"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Insurance Description"
            />
            {/* Submit button */}
            <button type="submit">Create Insurance</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default PostInsurance;
