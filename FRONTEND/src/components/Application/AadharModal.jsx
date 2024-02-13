import React from "react";

// AadharModal component takes imageUrl and onClose as props
const AadharModal = ({ imageUrl, onClose }) => {
  return (
    // Outer div for the modal with aadhar-modal class
    <div className="aadhar-modal">
      {/* Inner div for the modal content with modal-content class */}
      <div className="modal-content">
        {/* Close button represented by '×' symbol, onClick triggers the onClose function */}
        <span className="close" onClick={onClose}>
          &times;
        </span>
        {/* Image tag displaying the Aadhar card image using the provided imageUrl */}
        <img src={imageUrl} alt="aadhar" />
      </div>
    </div>
  );
};

// Exporting AadharModal component as the default export
export default AadharModal;
