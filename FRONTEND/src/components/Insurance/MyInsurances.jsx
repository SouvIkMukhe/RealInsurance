// Import necessary dependencies
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaCheck } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { Context } from "../../main";
import { useNavigate } from "react-router-dom";

// MyInsurances component
const Myinsurances = () => {
  // State variables
  const [myinsurances, setMyinsurances] = useState([]);
  const [editingMode, setEditingMode] = useState(null);
  const { isAuthorized, user } = useContext(Context);

  const navigateTo = useNavigate();

  // Fetching user's insurances on component mount
  useEffect(() => {
    const fetchInsurances = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/api/v1/admin/getmyadmins",
          { withCredentials: true }
        );
        setMyinsurances(data.myinsurances);
      } catch (error) {
        toast.error(error.response.data.message);
        setMyinsurances([]);
      }
    };
    fetchInsurances();
  }, []);

  // Redirect to home if not authorized or not an admin
  if (!isAuthorized || (user && user.role !== "Admin")) {
    navigateTo("/");
  }

  // Enable Editing Mode for a specific insurance
  const handleEnableEdit = (adminId) => {
    setEditingMode(adminId);
  };

  // Disable Editing Mode
  const handleDisableEdit = () => {
    setEditingMode(null);
  };

  // Update the insurance details
  const handleUpdateInsurance = async (adminId) => {
    const updatedInsurance = myinsurances.find((admin) => admin._id === adminId);
    try {
      const res = await axios.put(
        `http://localhost:4000/api/v1/admin/update/${adminId}`,
        updatedInsurance,
        { withCredentials: true }
      );
      toast.success(res.data.message);
      setEditingMode(null);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  // Delete an insurance
  const handleDeleteInsurance = async (adminId) => {
    try {
      const res = await axios.delete(
        `http://localhost:4000/api/v1/admin/delete/${adminId}`,
        { withCredentials: true }
      );
      toast.success(res.data.message);
      setMyinsurances((previnsurances) =>
        previnsurances.filter((admin) => admin._id !== adminId)
      );
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  // Handle input changes for an insurance
  const handleInputChange = (adminId, field, value) => {
    setMyinsurances((previnsurances) =>
      previnsurances.map((admin) =>
        admin._id === adminId ? { ...admin, [field]: value } : admin
      )
    );
  };

  // JSX rendering
  return (
    <>
      <div className="myinsurances page">
        <div className="container">
          <h1>Your Posted insurances</h1>
          {myinsurances.length > 0 ? (
            <>
              <div className="banner">
                {myinsurances.map((element) => (
                  <div className="card" key={element._id}>
                    <div className="content">
                      {/* Short Fields Section */}
                      <div className="short_fields">
                        {/* Title */}
                        <div>
                          <span>Title:</span>
                          <input
                            type="text"
                            disabled={editingMode !== element._id}
                            value={element.title}
                            onChange={(e) =>
                              handleInputChange(
                                element._id,
                                "title",
                                e.target.value
                              )
                            }
                          />
                        </div>
                        {/* Country */}
                        <div>
                          {" "}
                          <span>Country:</span>
                          <input
                            type="text"
                            disabled={editingMode !== element._id}
                            value={element.country}
                            onChange={(e) =>
                              handleInputChange(
                                element._id,
                                "country",
                                e.target.value
                              )
                            }
                          />
                        </div>
                        {/* City */}
                        <div>
                          <span>City:</span>
                          <input
                            type="text"
                            disabled={editingMode !== element._id}
                            value={element.city}
                            onChange={(e) =>
                              handleInputChange(
                                element._id,
                                "city",
                                e.target.value
                              )
                            }
                          />
                        </div>
                        {/* Category */}
                        <div>
                          <span>Category:</span>
                          <select
                            value={element.category}
                            onChange={(e) =>
                              handleInputChange(
                                element._id,
                                "category",
                                e.target.value
                              )
                            }
                            disabled={editingMode !== element._id}
                          >
                            <option value="Life and Health Insurance">Life and Health Insurance</option>
                <option value="Car Insurance">
                Car Insurance
                </option>
                <option value="Home Insurance">
                Home Insurance
                </option>
                <option value="Two Wheeler Insurance">
                Two Wheeler Insurance
                </option>
                <option value="Term insurance">Term insurance</option>
                <option value="Travel Insurance">
                Travel Insurance
                </option>
                <option value="Fire Insurance">Fire Insurance</option>
                <option value="Marine Insurance">
                Marine Insurance
                </option>
                <option value="Insurance insurance">
                Insurance insurance
                </option>
                <option value="Data Insurance">Data Insurance</option>
                          </select>
                        </div>
                        {/* Premium */}
                        <div>
                          <span>
                            Premium:{" "}
                            {element.fixedPremium ? (
                              <input
                                type="number"
                                disabled={editingMode !== element._id}
                                value={element.fixedPremium}
                                onChange={(e) =>
                                  handleInputChange(
                                    element._id,
                                    "fixedPremium",
                                    e.target.value
                                  )
                                }
                              />
                            ) : (
                              <div>
                                <input
                                  type="number"
                                  disabled={editingMode !== element._id}
                                  value={element.premiumFrom}
                                  onChange={(e) =>
                                    handleInputChange(
                                      element._id,
                                      "premiumFrom",
                                      e.target.value
                                    )
                                  }
                                />
                                <input
                                  type="number"
                                  disabled={editingMode !== element._id}
                                  value={element.premiumTo}
                                  onChange={(e) =>
                                    handleInputChange(
                                      element._id,
                                      "premiumTo",
                                      e.target.value
                                    )
                                  }
                                />
                              </div>
                            )}
                          </span>
                        </div>
                        {/* Expired */}
                        <div>
                          {" "}
                          <span>Expired:</span>
                          <select
                            value={element.expired}
                            onChange={(e) =>
                              handleInputChange(
                                element._id,
                                "expired",
                                e.target.value
                              )
                            }
                            disabled={editingMode !== element._id}
                          >
                            <option value={true}>TRUE</option>
                            <option value={false}>FALSE</option>
                          </select>
                        </div>
                      </div>

                      {/* Long Fields Section */}
                      <div className="long_field">
                        {/* Description */}
                        <div>
                          <span>Description:</span>{" "}
                          <textarea
                            rows={5}
                            value={element.description}
                            disabled={editingMode !== element._id}
                            onChange={(e) =>
                              handleInputChange(
                                element._id,
                                "description",
                                e.target.value
                              )
                            }
                          />
                        </div>
                        {/* Location */}
                        <div>
                          <span>Location: </span>
                          <textarea
                            value={element.location}
                            rows={5}
                            disabled={editingMode !== element._id}
                            onChange={(e) =>
                              handleInputChange(
                                element._id,
                                "location",
                                e.target.value
                              )
                            }
                          />
                        </div>
                      </div>
                    </div>
                    {/* Out Of Content Class */}
                    <div className="button_wrapper">
                      <div className="edit_btn_wrapper">
                        {editingMode === element._id ? (
                          <>
                            <button
                              onClick={() => handleUpdateInsurance(element._id)}
                              className="check_btn"
                            >
                              <FaCheck />
                            </button>
                            <button
                              onClick={() => handleDisableEdit()}
                              className="cross_btn"
                            >
                              <RxCross2 />
                            </button>
                          </>
                        ) : (
                          <button
                            onClick={() => handleEnableEdit(element._id)}
                            className="edit_btn"
                          >
                            Edit
                          </button>
                        )}
                      </div>
                      <button
                        onClick={() => handleDeleteInsurance(element._id)}
                        className="delete_btn"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <p>
              You've not posted any admin or may be you deleted all of your admins!
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default Myinsurances;
