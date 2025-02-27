import { useEffect } from "react";
import { Camera } from "@capacitor/camera";
import "./camera.page.css";

export function CameraPage() {
  useEffect(() => {
    const startCamera = async () => {
      try {
        await Camera.requestPermissions();
        // Additional camera initialization can go here
      } catch (error) {
        console.error("Camera permission denied", error);
      }
    };

    startCamera();
  }, []);

  return (
    <div className="camera-page">
      <div className="camera-view">
        {/* Camera stream will be mounted here */}
      </div>
      <div className="camera-controls">
        <button className="capture-button">
          <span className="capture-icon"></span>
        </button>
      </div>
    </div>
  );
}
