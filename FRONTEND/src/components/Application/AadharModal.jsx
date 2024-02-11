import React from "react";

const AadharModal = ({ imageUrl, onClose }) => {
  return (
    <div className="aadhar-modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <img src={imageUrl} alt="aadhar" />
      </div>
    </div>
  );
};

export default AadharModal;
