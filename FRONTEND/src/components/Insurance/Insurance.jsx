import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../main";

const Insurances = () => {
  // State to store the list of insurances
  const [insurances, setInsurances] = useState([]);
  
  // Access global state using Context API
  const { isAuthorized } = useContext(Context);

  // Hook to navigate to a different route
  const navigateTo = useNavigate();

  // Effect to fetch all available insurances on component mount
  useEffect(() => {
    try {
      axios
        .get("http://localhost:4000/api/v1/insurance/getall", {
          withCredentials: true,
        })
        .then((res) => {
          setInsurances(res.data);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  // Redirect to home if user is not authorized
  if (!isAuthorized) {
    navigateTo("/");
  }

  return (
    <section className="insurances page">
      <div className="container">
        <h1>ALL AVAILABLE INSURANCES</h1>
        <div className="banner">
          {/* Render each insurance card */}
          {insurances.insurances &&
            insurances.insurances.map((element) => {
              return (
                <div className="card" key={element._id}>
                  <p>{element.title}</p>
                  <p>{element.category}</p>
                  <p>{element.country}</p>
                  {/* Link to view insurance details */}
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
