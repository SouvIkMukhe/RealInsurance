import React from "react";
import { useContext } from "react";
import { Context } from "../../main";
import { Navigate } from "react-router-dom";
import HeroSection from "./HeroSection";
import HowItWorks from "./HowItWorks";
import PopularCategories from "./PopularCategories";
import PopularCompanies from "./PopularCompanies";

// Home component
const Home = () => {
  // Accessing user authorization status from the context
  const { isAuthorized } = useContext(Context);

  // Redirect to login page if not authorized
  if (!isAuthorized) {
    return <Navigate to={"/login"} />;
  }

  // Render the Home component
  return (
    <>
      <section className="homePage page">
        {/* Hero section */}
        <HeroSection />
        {/* Section explaining how it works */}
        <HowItWorks />
        {/* Section displaying popular insurance categories */}
        <PopularCategories />
        {/* Section displaying popular insurance companies */}
        <PopularCompanies />
      </section>
    </>
  );
};

export default Home;
