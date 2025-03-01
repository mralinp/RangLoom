import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPalette } from "@fortawesome/free-solid-svg-icons";
import "./SplashScreen.css";

export function SplashScreen() {
  return (
    <div className="splash-screen">
      <div className="top-right-logo">
        <FontAwesomeIcon icon={faPalette} className="small-logo" />
      </div>
      <div className="splash-content">
        <div className="logo-container">
          <div className="logo-box">
            <FontAwesomeIcon icon={faPalette} className="logo" />
          </div>
        </div>
        <h1 className="title">Rang Loom</h1>
        <p className="subtitle">Your Color Assistant</p>
        <p className="loading-text">Loading resources...</p>
      </div>
      <div className="footer">
        <p className="version">Version 1.0.0</p>
        <p className="copyright">© 2025 All rights reserved</p>
      </div>
    </div>
  );
}
