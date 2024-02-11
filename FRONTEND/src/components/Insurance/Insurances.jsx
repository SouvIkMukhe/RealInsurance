import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../main";

const Insurances = () => {
  const [insurances, setInsurances] = useState([]);
  const { isAuthorized } = useContext(Context);
  const navigateTo = useNavigate();
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
  if (!isAuthorized) {
    navigateTo("/");
  }

  return (
    <section className="insurances page">
      <div className="container">
        <h1>ALL AVAILABLE INSURANCE</h1>
        <div className="banner">
          {insurances.insurances &&
            insurances.insurances.map((element) => {
              return (
                <div className="card" key={element._id}>
                  <p>{element.title}</p>
                  <p>{element.category}</p>
                  <p>{element.country}</p>
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
