import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../main";
import axios from "axios";
import toast from "react-hot-toast";
import AadharModal from "./AadharModal";
import { useNavigate } from "react-router-dom";

const MyApplications = () => {
  const { user } = useContext(Context);
  const [applications, setApplications] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [aadharImageUrl, setAadharImageUrl] = useState("");

  const { isAuthorized } = useContext(Context);
  const navigateTo = useNavigate();

  const handleApplicationAction = async (id, action) => {
    try {
      const res = await axios.patch(
        `http://localhost:4000/api/v1/application/${action}/${id}`,
        null,
        {
          withCredentials: true,
        }
      );

      toast.success(res.data.message);

      setApplications((prevApplications) => {
        return prevApplications.map((app) =>
          app._id === id ? { ...app, status: action } : app
        );
      });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    try {
      const fetchApplications = async () => {
        let response;

        if (user && user.role === "Admin") {
          response = await axios.get("http://localhost:4000/api/v1/application/admin/getall", {
            withCredentials: true,
          });
        } else {
          response = await axios.get("http://localhost:4000/api/v1/application/insuranceseeker/getall", {
            withCredentials: true,
          });
        }

        setApplications(response.data.applications);
      };

      fetchApplications();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }, [isAuthorized]);

  if (!isAuthorized) {
    navigateTo("/");
  }

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

  const openModal = (imageUrl) => {
    setAadharImageUrl(imageUrl);
    setModalOpen(true);
  };

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
          <h1>Applications From Insurance Seekers</h1>
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
                  handleApplicationAction={handleApplicationAction}
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
            <span>CoverLetter:</span> {element.coverLetter}
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

const AdminCard = ({ element, openModal, handleApplicationAction }) => {
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
            <span>CoverLetter:</span> {element.coverLetter}
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
          <button onClick={() => handleApplicationAction(element._id, "accept")}>
            Accept Application
          </button>
          <button onClick={() => handleApplicationAction(element._id, "reject")}>
            Reject Application
          </button>
        </div>
      </div>
    </>
  );
};
