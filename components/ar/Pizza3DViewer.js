"use client";
import React, { useEffect, useState } from "react";
import ModelLoadingState from "./ModelLoadingState";

const Pizza3DViewer = ({ glb, usdz, fallbackImage, scaleX = 1, scaleY = 1, scaleZ = 1 }) => {
  const [isClient, setIsClient] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // dynamically import model-viewer on the client side only
    import('@google/model-viewer').catch(console.error);
  }, []);

  if (!isClient) {
    return (
      <div style={{ position: 'relative', width: '100%', height: '400px', background: '#f8f9fa', borderRadius: '10px' }}>
        <img src={fallbackImage} alt="pizza fallback" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
      </div>
    );
  }

  const scaleString = `${scaleX} ${scaleY} ${scaleZ}`;

  return (
    <div style={{ position: 'relative', width: '100%', height: '400px', background: '#f8f9fa', borderRadius: '10px', overflow: 'hidden' }}>
      {!isLoaded && <ModelLoadingState />}
      <model-viewer
        src={glb}
        ios-src={usdz}
        alt="A 3D model of a pizza"
        camera-controls
        auto-rotate
        ar
        ar-modes="webxr scene-viewer quick-look"
        ar-scale="fixed"
        rotation-per-second="10deg"
        interaction-prompt="auto"
        scale={scaleString}
        style={{ width: '100%', height: '100%' }}
        onLoad={() => setIsLoaded(true)}
        onError={() => setIsLoaded(true)} // avoid infinite spinner on error
      >
        <div slot="poster" style={{width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
           <img src={fallbackImage} alt="pizza fallback" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
        </div>
      </model-viewer>
    </div>
  );
};

export default Pizza3DViewer;
