import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./camera.page.css";

export function CameraPage() {
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [error, setError] = useState<string>("");

  const stopCameraStream = () => {
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach((track) => track.stop());
    }
  };

  const requestCameraAccess = async () => {
    setError(""); // Clear previous errors
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setError(
          "Your browser doesn't support camera access. Please try a different browser."
        );
        return;
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "environment",
          width: { ideal: 1920 },
          height: { ideal: 1080 },
        },
        audio: false,
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error("Camera error:", error);
      setError(
        "Camera access was denied. Please check your camera permissions and try again."
      );
    }
  };

  useEffect(() => {
    requestCameraAccess();
    return () => {
      stopCameraStream();
    };
  }, []);

  const handleCapture = async () => {
    try {
      if (videoRef.current) {
        const canvas = document.createElement("canvas");
        canvas.width = videoRef.current.videoWidth;
        canvas.height = videoRef.current.videoHeight;
        canvas.getContext("2d")?.drawImage(videoRef.current, 0, 0);
        const imageUrl = canvas.toDataURL("image/jpeg");

        stopCameraStream();
        navigate("/blending", { state: { imageUrl } });
      }
    } catch (error) {
      console.error("Capture error:", error);
      setError("Failed to capture image. Please try again.");
    }
  };

  return (
    <div className="camera-page">
      {error ? (
        <div className="camera-error">
          <p>{error}</p>
          <div className="error-buttons">
            <button onClick={requestCameraAccess}>Try Again</button>
            <button onClick={() => navigate(-1)}>Go Back</button>
          </div>
        </div>
      ) : (
        <>
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="camera-view"
          />
          <div className="camera-controls">
            <button className="capture-button" onClick={handleCapture}>
              <span className="capture-icon"></span>
            </button>
          </div>
        </>
      )}
    </div>
  );
}
