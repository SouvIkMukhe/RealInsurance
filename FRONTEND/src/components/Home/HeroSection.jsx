// Import React and necessary components/libraries
import React from "react";
import { FaBuilding, FaSuitcase, FaUsers, FaUserPlus } from "react-icons/fa";

// Functional component for the Hero Section of the website
const HeroSection = () => {
  // Details for the statistics cards
  const details = [
    {
      id: 1,
      title: "1,23,441",
      subTitle: "Live Insurance",
      icon: <FaSuitcase />,
    },
    {
      id: 2,
      title: "91220",
      subTitle: "Companies",
      icon: <FaBuilding />,
    },
    {
      id: 3,
      title: "2,34,200",
      subTitle: "Insurance Seekers",
      icon: <FaUsers />,
    },
    {
      id: 4,
      title: "1,03,761",
      subTitle: "Admins",
      icon: <FaUserPlus />,
    },
  ];

  return (
    <>
      {/* Hero Section UI */}
      <div className="heroSection">
        <div className="container">
          <div className="title">
            {/* Title and sub-title for the hero section */}
            <h1>Secure Your Future with Insurances</h1>
            <h1>Explore Policies to Your Needs</h1>
            <p>
              Discover the peace of mind that comes with choosing the perfect insurance coverage. Buy insurance that safeguards your future and meets your unique requirements. Find the protection you need for a confident and secure tomorrow.
            </p>
          </div>
          <div className="image">
            {/* Hero image */}
            <img src="/heroT.png" alt="hero" />
          </div>
        </div>
        {/* Statistics cards */}
        <div className="details">
          {details.map((element) => {
            return (
              <div className="card" key={element.id}>
                <div className="icon">{element.icon}</div>
                <div className="content">
                  {/* Displaying statistics title and sub-title */}
                  <p>{element.title}</p>
                  <p>{element.subTitle}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

// Export the HeroSection component
export default HeroSection;
