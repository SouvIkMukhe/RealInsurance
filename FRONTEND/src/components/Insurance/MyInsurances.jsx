import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaCheck } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { Context } from "../../main";
import { useNavigate } from "react-router-dom";

const MyInsurances = () => {
  const [myInsurances, setMyInsurances] = useState([]);
  const [editingMode, setEditingMode] = useState(null);
  const { isAuthorized, user } = useContext(Context);

  const navigateTo = useNavigate();
  //Fetching all insurances
  useEffect(() => {
    const fetchInsurances = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/api/v1/insurance/getmyinsurances",
          { withCredentials: true }
        );
        setMyInsurances(data.myInsurances);
      } catch (error) {
        toast.error(error.response.data.message);
        setMyInsurances([]);
      }
    };
    fetchInsurances();
  }, []);
  if (!isAuthorized || (user && user.role !== "Admin")) {
    navigateTo("/");
  }

  //Function For Enabling Editing Mode
  const handleEnableEdit = (insuranceId) => {
    //Here We Are Giving Id in setEditingMode because We want to enable only that insurance whose ID has been send.
    setEditingMode(insuranceId);
  };

  //Function For Disabling Editing Mode
  const handleDisableEdit = () => {
    setEditingMode(null);
  };

  //Function For Updating The Insurance
  const handleUpdateInsurance = async (insuranceId) => {
    const updatedInsurance = myInsurances.find((insurance) => insurance._id === insuranceId);
    await axios
      .put(`http://localhost:4000/api/v1/insurance/update/${insuranceId}`, updatedInsurance, {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message);
        setEditingMode(null);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  //Function For Deleting Insurance
  const handleDeleteInsurance = async (insuranceId) => {
    await axios
      .delete(`http://localhost:4000/api/v1/insurance/delete/${insuranceId}`, {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message);
        setMyInsurances((prevInsurances) => prevInsurances.filter((insurance) => insurance._id !== insuranceId));
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  const handleInputChange = (insuranceId, field, value) => {
    // Update the insurance object in the insurances state with the new value
    setMyInsurances((prevInsurances) =>
      prevInsurances.map((insurance) =>
        insurance._id === insuranceId ? { ...insurance, [field]: value } : insurance
      )
    );
  };

  return (
    <>
      <div className="myInsurances page">
        <div className="container">
          <h1>Your Posted Insurances</h1>
          {myInsurances.length > 0 ? (
            <>
              <div className="banner">
                {myInsurances.map((element) => (
                  <div className="card" key={element._id}>
                    <div className="content">
                      <div className="short_fields">
                        <div>
                          <span>Title:</span>
                          <input
                            type="text"
                            disabled={
                              editingMode !== element._id ? true : false
                            }
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
                        <div>
                          {" "}
                          <span>Country:</span>
                          <input
                            type="text"
                            disabled={
                              editingMode !== element._id ? true : false
                            }
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
                        <div>
                          <span>City:</span>
                          <input
                            type="text"
                            disabled={
                              editingMode !== element._id ? true : false
                            }
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
                            disabled={
                              editingMode !== element._id ? true : false
                            }
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
                        <div>
                          <span>
                            Premium:{" "}
                            {element.fixedPremium ? (
                              <input
                                type="number"
                                disabled={
                                  editingMode !== element._id ? true : false
                                }
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
                                  disabled={
                                    editingMode !== element._id ? true : false
                                  }
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
                                  disabled={
                                    editingMode !== element._id ? true : false
                                  }
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
                            disabled={
                              editingMode !== element._id ? true : false
                            }
                          >
                            <option value={true}>TRUE</option>
                            <option value={false}>FALSE</option>
                          </select>
                        </div>
                      </div>
                      <div className="long_field">
                        <div>
                          <span>Description:</span>{" "}
                          <textarea
                            rows={5}
                            value={element.description}
                            disabled={
                              editingMode !== element._id ? true : false
                            }
                            onChange={(e) =>
                              handleInputChange(
                                element._id,
                                "description",
                                e.target.value
                              )
                            }
                          />
                        </div>
                        <div>
                          <span>Location: </span>
                          <textarea
                            value={element.location}
                            rows={5}
                            disabled={
                              editingMode !== element._id ? true : false
                            }
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
              You've not posted any insurance or may be you deleted all of your insurances!
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default MyInsurances;