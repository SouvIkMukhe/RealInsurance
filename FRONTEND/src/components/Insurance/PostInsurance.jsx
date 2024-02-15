import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Context } from "../../main";
const PostInsurance = () => {
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

  const { isAuthorized, user } = useContext(Context);

  const handleInsurancePost = async (e) => {
    e.preventDefault();
    if (premiumType === "Fixed Premium") {
      setPremiumFrom("");
      setPremiumFrom("");
    } else if (premiumType === "Ranged Premium") {
      setFixedPremium("");
    } else {
      setPremiumFrom("");
      setPremiumTo("");
      setFixedPremium("");
    }
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
                <option value="Life and Health Insurance">Life and Health Insurance</option>
                <option value="Car Insurance">
                Car Insurance
                </option>
                <option value="Home Insurance">
                Home Insurance
                </option>
                <option value="Two Wheeler Insurance">
                Two Wheeler Insurance
                </option>
                <option value="Term insurance">Term insurance</option>
                <option value="Travel Insurance">
                Travel Insurance
                </option>
                <option value="Fire Insurance">Fire Insurance</option>
                <option value="Marine Insurance">
                Marine Insurance
                </option>
                <option value="Insurance insurance">
                Insurance insurance
                </option>
                <option value="Data Insurance">Data Insurance</option>
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
            <textarea
              rows="10"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Insurance Description"
            />
            <button type="submit">Create Insurance</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default PostInsurance;
