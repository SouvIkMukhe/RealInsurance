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

const PopularCategories = () => {
  const categories = [
    {
      id: 1,
      title: "Life and Health",
      subTitle: "30 Open Schemes",
      icon: <MdOutlineDesignServices />,
    },
    {
      id: 2,
      title: "Mobile and Laptop",
      subTitle: "500 Open Schemes",
      icon: <TbAppsFilled />,
    },
    {
      id: 3,
      title: "Building",
      subTitle: "200 Open Schemes",
      icon: <MdOutlineWebhook />,
    },
    {
      id: 4,
      title: "Desktop",
      subTitle: "1000+ Open Schemes",
      icon: <FaReact />,
    },
    {
      id: 5,
      title: "Bank",
      subTitle: "150 Open Schemes",
      icon: <MdAccountBalance />,
    },
    {
      id: 6,
      title: "Tech",
      subTitle: "867 Open Schemes",
      icon: <GiArtificialIntelligence />,
    },
    {
      id: 7,
      title: "Video ",
      subTitle: "50 Open Schemes",
      icon: <MdOutlineAnimation />,
    },
    {
      id: 8,
      title: "Game ",
      subTitle: "80 Open Schemes",
      icon: <IoGameController />,
    },
  ];
  return (
    <div className="categories">
      <h3>POPULAR CATEGORIES</h3>
      <div className="banner">
        {categories.map((element) => {
          return (
            <div className="card" key={element.id}>
              <div className="icon">{element.icon}</div>
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

export default PopularCategories;