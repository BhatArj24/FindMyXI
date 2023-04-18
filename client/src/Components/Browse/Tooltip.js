import React, { useState } from "react";
import Modal from 'react-bootstrap/Modal';

import "./Tooltip.css"; // Import CSS for styling

const Tooltip = ({ text, children }) => {
  const [showModal, setShowModal] = useState(false);

  const handleMouseEnter = () => {
    setShowModal(true);
  };

  const handleMouseLeave = () => {
    setShowModal(false);
  };

  return (
    <div className="tooltip-container">
      <div
        className="tooltip-icon"
        onClick={handleMouseEnter}
      >
        i
      </div>
      {showModal && (
        <Modal show={showModal} onHide={()=>setShowModal(false)} >
            <Modal.Header closeButton>
                <Modal.Title>Availability Table Information</Modal.Title>
            </Modal.Header>
            <div style={{padding:"15px"}}>{children}</div>
        </Modal>
      )}
    </div>
  );
};

export default Tooltip;
