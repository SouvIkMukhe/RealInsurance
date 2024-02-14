import React from "react";

// AadharModal component displays a modal with an image of an Aadhar card.
// Props:
//   - imageUrl: the URL of the Aadhar card image to be displayed
//   - onClose: a function to be called when the modal is closed
const AadharModal = ({ imageUrl, onClose }) => {
  return (
    <div className="aadhar-modal">
      <div className="modal-content">
        {/* Close button (×) triggers the onClose function */}
        <span className="close" onClick={onClose}>
          &times;
        </span>
        {/* Display Aadhar card image */}
        <img src={imageUrl} alt="aadhar" />
      </div>
    </div>
  );
};

export default AadharModal;
