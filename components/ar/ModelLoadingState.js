"use client";
import React from "react";

const ModelLoadingState = () => {
  return (
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(255,255,255,0.8)',
      zIndex: 10
    }}>
      <div className="spinner-border text-danger" role="status">
        <span className="visually-hidden">Loading 3D preview...</span>
      </div>
    </div>
  );
};

export default ModelLoadingState;
