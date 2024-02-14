// Import React and necessary components/libraries
import React from "react";
import { FaUserPlus } from "react-icons/fa";
import { MdFindInPage } from "react-icons/md";
import { IoMdSend } from "react-icons/io";

// Functional component for the How It Works section of the website
const HowItWorks = () => {
  return (
    <>
      {/* How It Works Section UI */}
      <div className="howitworks">
        <div className="container">
          {/* Title for the How It Works section */}
          <h3>How RealInsurance Works</h3>
          {/* Banner with cards explaining the process */}
          <div className="banner">
            {/* Card 1 - Create Your Account */}
            <div className="card">
              <FaUserPlus />
              <p>Create Your Account</p>
              <p>
                Begin your insurance journey by setting up your account. Discover the ease of managing and securing your future with personalized services designed just for you.
              </p>
            </div>
            {/* Card 2 - Explore Insurance Options/Submit an Insurance Application */}
            <div className="card">
              <MdFindInPage />
              <p>Explore Insurance Options/Submit an Insurance Application</p>
              <p>
                Discover a world of insurance possibilities tailored to your needs. Take the first step towards financial security by exploring our range of insurance options or submitting an application to safeguard what matters most.
              </p>
            </div>
            {/* Card 3 - Apply for Insurance/Find the Right Coverage */}
            <div className="card">
              <IoMdSend />
              <p>Apply for Insurance/Find the Right Coverage</p>
              <p>
                Secure your future by applying for the insurance that suits your needs. Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur, culpa.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// Export the HowItWorks component
export default HowItWorks;
