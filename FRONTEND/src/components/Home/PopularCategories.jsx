// Import React and necessary components/libraries
import React from "react";
import {
  MdOutlineDesignServices,
  MdOutlineWebhook,
  MdAccountBalance,
  MdOutlineAnimation,
} from "react-icons/md";
import { TbAppsFilled } from "react-icons/tb";
import { FaReact } from "react-icons/fa";
import { GiArtificialIntelligence } from "react-icons/gi";
import { IoGameController } from "react-icons/io5";
import { FaCar } from "react-icons/fa";
import { MdOutlineTwoWheeler } from "react-icons/md";
import { FaFire } from "react-icons/fa";
import { MdOutlineHome } from "react-icons/md";
import { MdOutlineAirplanemodeActive } from "react-icons/md";
import { MdOutlineDirectionsBoat } from "react-icons/md";
import { FaShieldAlt } from "react-icons/fa";

// PopularCategories component
const PopularCategories = () => {
  // Categories data
  const categories = [
    {
      id: 1,
      title: "Life and Health Insurance",
      subTitle: "30 Open Schemes",
      icon: <MdOutlineDesignServices />,
    },
    {
      id: 2,
      title: "Car Insurance",
      subTitle: "500 Open Schemes",
      icon: <FaCar />,
    },
    {
      id: 3,
      title: "Home Insurance",
      subTitle: "200 Open Schemes",
      icon: <MdOutlineHome />,
    },
    {
      id: 4,
      title: "Two Wheeler Insurance",
      subTitle: "1000+ Open Schemes",
      icon: <MdOutlineTwoWheeler />,
    },
    {
      id: 5,
      title: "Term insurance",
      subTitle: "150 Open Schemes",
      icon: <FaShieldAlt />,
    },
    {
      id: 6,
      title: "Travel Insurance",
      subTitle: "867 Open Schemes",
      icon: <MdOutlineAirplanemodeActive />,
    },
    {
      id: 7,
      title: "Fire Insurance",
      subTitle: "50 Open Schemes",
      icon: <FaFire />,
    },
    {
      id: 8,
      title: "Marine Insurance ",
      subTitle: "80 Open Schemes",
      icon: <MdOutlineDirectionsBoat />,
    },
  ];

  // Render the PopularCategories component
  return (
    <div className="categories">
      {/* Section title */}
      <h3>POPULAR CATEGORIES</h3>
      {/* Banner containing category cards */}
      <div className="banner">
        {categories.map((element) => {
          return (
            <div className="card" key={element.id}>
              {/* Category icon */}
              <div className="icon">{element.icon}</div>
              {/* Category title and subtitle */}
              <div className="text">
                <p>{element.title}</p>
                <p>{element.subTitle}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Export the PopularCategories component
export default PopularCategories;
