import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../main";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import AadharModal from "./AadharModal";

// Component to display user's insurance applications
const MyApplications = () => {
  const { user } = useContext(Context);
  const [applications, setApplications] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [aadharImageUrl, setAadharImageUrl] = useState("");

  const { isAuthorized } = useContext(Context);
  const navigateTo = useNavigate();

  // Fetch user's applications based on their role
  useEffect(() => {
    try {
      if (user && user.role === "Insurance Seeker") {
        axios
          .get("http://localhost:4000/api/v1/application/insuranceseeker/getall", {
            withCredentials: true,
          })
          .then((res) => {
            setApplications(res.data.applications);
          });
      } else {
        axios
          .get("http://localhost:4000/api/v1/application/admin/getall", {
            withCredentials: true,
          })
          .then((res) => {
            setApplications(res.data.applications);
          });
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }, [isAuthorized]);

  // Redirect to login page if not authorized
  if (!isAuthorized) {
    navigateTo("/");
  }

  // Delete a user's application
  const deleteApplication = (id) => {
    try {
      axios
        .delete(`http://localhost:4000/api/v1/application/delete/${id}`, {
          withCredentials: true,
        })
        .then((res) => {
          toast.success(res.data.message);
          setApplications((prevApplication) =>
            prevApplication.filter((application) => application._id !== id)
          );
        });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  // Open modal to view Aadhar image
  const openModal = (imageUrl) => {
    setAadharImageUrl(imageUrl);
    setModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <section className="my_applications page">
      {user && user.role === "Insurance Seeker" ? (
        <div className="container">
          <h1>My Applications</h1>
          {applications.length <= 0 ? (
            <>
              {" "}
              <h4>No Applications Found</h4>{" "}
            </>
          ) : (
            applications.map((element) => {
              return (
                <InsuranceSeekerCard
                  element={element}
                  key={element._id}
                  deleteApplication={deleteApplication}
                  openModal={openModal}
                />
              );
            })
          )}
        </div>
      ) : (
        <div className="container">
          <h1>Applications From Admin Seekers</h1>
          {applications.length <= 0 ? (
            <>
              <h4>No Applications Found</h4>
            </>
          ) : (
            applications.map((element) => {
              return (
                <AdminCard
                  element={element}
                  key={element._id}
                  openModal={openModal}
                />
              );
            })
          )}
        </div>
      )}
      {modalOpen && (
        <AadharModal imageUrl={aadharImageUrl} onClose={closeModal} />
      )}
    </section>
  );
};

export default MyApplications;

// Component to display insurance seeker's application card
const InsuranceSeekerCard = ({ element, deleteApplication, openModal }) => {
  return (
    <>
      <div className="insurance_seeker_card">
        <div className="detail">
          <p>
            <span>Name:</span> {element.name}
          </p>
          <p>
            <span>Email:</span> {element.email}
          </p>
          <p>
            <span>Phone:</span> {element.phone}
          </p>
          <p>
            <span>Address:</span> {element.address}
          </p>
          <p>
            <span>Cover Letter:</span> {element.coverLetter}
          </p>
        </div>
        <div className="aadhar">
          <img
            src={element.aadhar.url}
            alt="aadhar"
            onClick={() => openModal(element.aadhar.url)}
          />
        </div>
        <div className="btn_area">
          <button onClick={() => deleteApplication(element._id)}>
            Delete Application
          </button>
        </div>
      </div>
    </>
  );
};

// Component to display admin's application card
const AdminCard = ({ element, openModal }) => {
  return (
    <>
      <div className="insurance_seeker_card">
        <div className="detail">
          <p>
            <span>Name:</span> {element.name}
          </p>
          <p>
            <span>Email:</span> {element.email}
          </p>
          <p>
            <span>Phone:</span> {element.phone}
          </p>
          <p>
            <span>Address:</span> {element.address}
          </p>
          <p>
            <span>Cover Letter:</span> {element.coverLetter}
          </p>
        </div>
        <div className="aadhar">
          <img
            src={element.aadhar.url}
            alt="aadhar"
            onClick={() => openModal(element.aadhar.url)}
          />
        </div>
      </div>
    </>
  );
};
