import React from "react";
import { FaUserPlus } from "react-icons/fa";
import { MdFindInPage } from "react-icons/md";
import { IoMdSend } from "react-icons/io";

const HowItWorks = () => {
  return (
    <>
      <div className="howitworks">
        <div className="container">
          <h3>How InsuranceZee Works</h3>
          <div className="banner">
            <div className="card">
              <FaUserPlus />
              <p>Create Account</p>
              <p>
              Sign up and create your account to unlock a world of opportunities. Enjoy
      personalized services and access exclusive features tailored to your needs.
      Your journey towards a secure future begins with a simple account creation.
              </p>
            </div>
            <div className="card">
              <MdFindInPage />
              <p>Find a Insurance/Post a Insurance</p>
              <p>
              Discover insurance plans tailored to your requirements or share your unique
      coverage offerings. Connect with a community that values protection and
      peace of mind. Whether you're seeking coverage or providing it, find your
      perfect match on our platform.

              </p>
            </div>
            <div className="card">
              <IoMdSend />
              <p>Apply For Insurance Policies</p>
              <p>
              Applying for insurance is a crucial step towards securing your future.
      Employers, recruit skilled candidates who understand the importance of
      safeguarding others. Join a network where insurance meets talent, and
      individuals contribute to building a safer and more protected society.
   
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HowItWorks;
