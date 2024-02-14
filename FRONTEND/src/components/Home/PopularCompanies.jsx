// Import React and necessary components/libraries
import React from "react";
import { FaMicrosoft, FaApple } from "react-icons/fa";
import { SiTesla } from "react-icons/si";

// Functional component for displaying popular companies
const PopularCompanies = () => {
  // Companies data
  const companies = [
    {
      id: 1,
      title: "Microsoft",
      location: "Street 10 Delhi, India",
      openPositions: 10,
      icon: <FaMicrosoft />,
    },
    {
      id: 2,
      title: "Tesla",
      location: "Street 10 Delhi, India",
      openPositions: 5,
      icon: <SiTesla />,
    },
    {
      id: 3,
      title: "Apple",
      location: "Street 10 Delhi, India",
      openPositions: 20,
      icon: <FaApple />,
    },
  ];

  // Render the PopularCompanies component
  return (
    <div className="companies">
      <div className="container">
        {/* Section title */}
        <h3>TOP COMPANIES</h3>
        {/* Banner containing company cards */}
        <div className="banner">
          {companies.map((element) => {
            return (
              <div className="card" key={element.id}>
                {/* Company icon and details */}
                <div className="content">
                  <div className="icon">{element.icon}</div>
                  <div className="text">
                    <p>{element.title}</p>
                    <p>{element.location}</p>
                  </div>
                </div>
                {/* Button displaying open positions */}
                <button>Open Positions {element.openPositions}</button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// Export the PopularCompanies component
export default PopularCompanies;
