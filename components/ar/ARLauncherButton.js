"use client";
import React, { useState, useEffect } from "react";

const ARLauncherButton = ({ glb, usdz, onOpenModal }) => {
  const [arSupported, setArSupported] = useState(false);
  
  useEffect(() => {
    // Quick check if WebXR or iOS Quick Look might be supported
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    const isAndroid = /android/i.test(navigator.userAgent);
    
    // In a real implementation we'd check window.XRSession or a tag support
    if (isIOS || isAndroid) {
      setArSupported(true);
    }
  }, []);

  return (
    <button 
      onClick={onOpenModal} 
      className="theme-btn bg-red-2" 
      style={{border:'none', cursor:'pointer', width: '100%', marginBottom: '10px'}}
    >
      <i className="fas fa-cube mr-2" style={{marginRight: '8px'}} />
      View in AR
    </button>
  );
};

export default ARLauncherButton;
