"use client";
import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

const ARInstructionsModal = ({ show, onHide, onLaunchAR, isSupported }) => {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>See Your Pizza in Your Space</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isSupported ? (
          <div>
            <p><strong>AR is not available on this device/browser.</strong></p>
            <p>You can still rotate the 3D pizza preview and view the selected physical dimensions.</p>
          </div>
        ) : (
          <div>
            <ol>
              <li className="mb-2">Allow camera access if requested.</li>
              <li className="mb-2">Point your phone at a well-lit table or flat surface.</li>
              <li className="mb-2">Move your phone slowly until the surface is detected.</li>
              <li className="mb-2">Place the pizza and move around it to compare the selected size.</li>
            </ol>
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        {isSupported && (
          <Button variant="danger" onClick={onLaunchAR}>
            Continue to AR
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default ARInstructionsModal;
