import { type PropsWithChildren } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faPalette,
  faHistory,
  faCog,
  faBars,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { useLocation, useNavigate } from "react-router-dom";
import "./main.layout.css";

export function MainLayout({ children }: PropsWithChildren) {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="layout">
      {/* Top Navigation Bar */}
      <nav className="top-nav">
        <button className="menu-button">
          <FontAwesomeIcon icon={faBars} />
        </button>
        <h1 className="nav-title">Rang Loom</h1>
        <button className="menu-button">
          <FontAwesomeIcon icon={faUser} />
        </button>
      </nav>

      {/* Main Content Area */}
      <main className="main-content">{children}</main>

      {/* Bottom Menu Bar */}
      <nav className="bottom-nav">
        <button
          className={`nav-button ${location.pathname === "/" ? "active" : ""}`}
          onClick={() => navigate("/")}
        >
          <FontAwesomeIcon icon={faHome} />
          <span>Home</span>
        </button>
        <button
          className={`nav-button ${
            location.pathname === "/palettes" ? "active" : ""
          }`}
          onClick={() => navigate("/palettes")}
        >
          <FontAwesomeIcon icon={faPalette} />
          <span>Palettes</span>
        </button>
        <button
          className={`nav-button ${
            location.pathname === "/history" ? "active" : ""
          }`}
          onClick={() => navigate("/history")}
        >
          <FontAwesomeIcon icon={faHistory} />
          <span>History</span>
        </button>
        <button
          className={`nav-button ${
            location.pathname === "/settings" ? "active" : ""
          }`}
          onClick={() => navigate("/settings")}
        >
          <FontAwesomeIcon icon={faCog} />
          <span>Settings</span>
        </button>
      </nav>
    </div>
  );
}
