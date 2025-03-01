import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faCloudUpload } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import carpetImage from "../assets/carpet.jpg";
import carpetImage2 from "../assets/carpet2.jpg";
import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";
import { Capacitor } from "@capacitor/core";

import "./home.page.css";
import { MainLayout } from "../layouts/main.layout";

export function HomePage() {
  const navigate = useNavigate();

  const handleTakePhoto = async () => {
    try {
      if (Capacitor.isNativePlatform()) {
        // Use Capacitor Camera on native platforms
        const image = await Camera.getPhoto({
          resultType: CameraResultType.DataUrl,
          source: CameraSource.Camera,
          quality: 90,
        });
        navigate("/blending", { state: { imageUrl: image.dataUrl } });
      } else {
        // Navigate to camera page on web platform
        navigate("/camera");
      }
    } catch (error) {
      console.error("Camera error:", error);
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        navigate("/blending", {
          state: { imageUrl: reader.result },
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <MainLayout title="Home">
      <div className="home-page">
        <div className="home-header">
          <h3>Find Your Perfect Color Match</h3>
          <p>Capture, analyze, and recreate carpet colors</p>
        </div>

        <div className="action-buttons">
          <button className="action-button primary" onClick={handleTakePhoto}>
            <FontAwesomeIcon icon={faCamera} /> Capture Image
          </button>
          <label className="action-button secondary" htmlFor="image-upload">
            <FontAwesomeIcon icon={faCloudUpload} /> Upload Image
            <input
              type="file"
              id="image-upload"
              accept="image/*"
              onChange={handleImageUpload}
              style={{ display: "none" }}
            />
          </label>
        </div>

        <section className="recent-matches">
          <h3>Recent Matches</h3>
          <div className="matches-grid">
            <div className="match-card">
              <div className="match-image">
                <img src={carpetImage} alt="Carpet Sample 1" />
              </div>
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
              <div className="match-image">
                <img src={carpetImage2} alt="Carpet Sample 2" />
              </div>
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
    </MainLayout>
  );
}
