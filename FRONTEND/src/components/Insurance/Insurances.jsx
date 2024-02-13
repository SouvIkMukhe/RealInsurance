import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../main";

// Insurances component
const Insurances = () => {
  // State to store the list of insurances
  const [insurances, setInsurances] = useState([]);

  // Context to check user authorization
  const { isAuthorized } = useContext(Context);

  // Hook for navigation
  const navigateTo = useNavigate();

  // Fetch all insurances from the server upon component mount
  useEffect(() => {
    try {
      axios
        .get("http://localhost:4000/api/v1/insurance/getall", {
          withCredentials: true,
        })
        .then((res) => {
          // Update the state with the fetched insurances
          setInsurances(res.data);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  // Redirect to the home page if not authorized
  if (!isAuthorized) {
    navigateTo("/");
  }

  // Render the Insurances component
  return (
    <section className="insurances page">
      <div className="container">
        {/* Section title */}
        <h1>ALL AVAILABLE INSURANCE</h1>
        {/* Banner displaying insurance cards */}
        <div className="banner">
          {insurances.insurances &&
            insurances.insurances.map((element) => {
              return (
                <div className="card" key={element._id}>
                  {/* Displaying insurance details */}
                  <p>{element.title}</p>
                  <p>{element.category}</p>
                  <p>{element.country}</p>
                  {/* Link to view detailed insurance information */}
                  <Link to={`/insurance/${element._id}`}>Insurance Details</Link>
                </div>
              );
            })}
        </div>
      </div>
    </section>
  );
};

export default Insurances;
