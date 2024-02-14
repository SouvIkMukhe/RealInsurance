// Import React and necessary components/libraries
import React from "react";
import { useContext } from "react";
import { Context } from "../../main";
import { Navigate } from "react-router-dom";

// Importing components used in the Home page
import HeroSection from "./HeroSection";
import HowItWorks from "./HowItWorks";
import PopularCategories from "./PopularCategories";
import PopularCompanies from "./PopularCompanies";

// Functional component for the Home page
const Home = () => {
  // Accessing the global context for authorization
  const { isAuthorized } = useContext(Context);

  // Redirect to the login page if not authorized
  if (!isAuthorized) {
    return <Navigate to={"/login"} />;
  }

  return (
    <>
      {/* Home Page UI */}
      <section className="homePage page">
        {/* Displaying components for different sections of the home page */}
        <HeroSection />
        <HowItWorks />
        <PopularCategories />
        <PopularCompanies />
      </section>
    </>
  );
};

// Export the Home component
export default Home;
