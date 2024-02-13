import React from "react";
import { FaBuilding, FaSuitcase, FaUsers, FaUserPlus } from "react-icons/fa";

// HeroSection component
const HeroSection = () => {
  // Details for statistics cards
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

  // Render the HeroSection component
  return (
    <>
      <div className="heroSection">
        <div className="container">
          {/* Title and description */}
          <div className="title">
            <h1>Discover Insurance Tailored for You</h1>
            <p>
              Explore a diverse range of insurance options designed to meet your unique
              needs and financial goals. We understand that life is full of uncertainties,
              and our mission is to provide you with comprehensive coverage that brings
              peace of mind.
            </p>
          </div>
          {/* Image */}
          <div className="image">
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

export default HeroSection;
