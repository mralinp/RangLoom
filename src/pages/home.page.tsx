import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faUpload } from "@fortawesome/free-solid-svg-icons";
import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";
import { useNavigate } from "react-router-dom";

import "./home.page.css";

export function HomePage() {
  const navigate = useNavigate();

  const captureImage = () => {
    navigate("/camera"); // Navigate to camera page
  };

  const uploadImage = async () => {
    const image = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Photos,
      quality: 90,
    });
    console.log(image);
  };

  return (
    <div className="home-page">
      <div className="header">
        <h1>Find Your Perfect Color Match</h1>
        <p>Capture, analyze, and recreate carpet colors</p>
      </div>

      <div className="action-buttons">
        <button className="action-button primary" onClick={captureImage}>
          <FontAwesomeIcon icon={faCamera} /> Capture Image
        </button>
        <button className="action-button secondary" onClick={uploadImage}>
          <FontAwesomeIcon icon={faUpload} /> Upload Image
        </button>
      </div>

      <section className="recent-matches">
        <h2>Recent Matches</h2>
        <div className="matches-grid">
          <div className="match-card">
            <div className="match-image">Carpet Sample 1</div>
            <div className="color-dots">
              <span
                className="color-dot"
                style={{ background: "#94A3B8" }}
              ></span>
              <span
                className="color-dot"
                style={{ background: "#475569" }}
              ></span>
              <span
                className="color-dot"
                style={{ background: "#1E293B" }}
              ></span>
            </div>
          </div>
          <div className="match-card">
            <div className="match-image">Carpet Sample 2</div>
            <div className="color-dots">
              <span
                className="color-dot"
                style={{ background: "#94A3B8" }}
              ></span>
              <span
                className="color-dot"
                style={{ background: "#475569" }}
              ></span>
              <span
                className="color-dot"
                style={{ background: "#1E293B" }}
              ></span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
