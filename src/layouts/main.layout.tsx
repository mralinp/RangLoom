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
import "./main.layout.css";

type Page = "home" | "palettes" | "history" | "settings";

interface MainLayoutProps extends PropsWithChildren {
  currentPage: Page;
  onPageChange: (page: Page) => void;
}

export function MainLayout({
  children,
  currentPage,
  onPageChange,
}: MainLayoutProps) {
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
          className={`nav-button ${currentPage === "home" ? "active" : ""}`}
          onClick={() => onPageChange("home")}
        >
          <FontAwesomeIcon icon={faHome} />
          <span>Home</span>
        </button>
        <button
          className={`nav-button ${currentPage === "palettes" ? "active" : ""}`}
          onClick={() => onPageChange("palettes")}
        >
          <FontAwesomeIcon icon={faPalette} />
          <span>Palettes</span>
        </button>
        <button
          className={`nav-button ${currentPage === "history" ? "active" : ""}`}
          onClick={() => onPageChange("history")}
        >
          <FontAwesomeIcon icon={faHistory} />
          <span>History</span>
        </button>
        <button
          className={`nav-button ${currentPage === "settings" ? "active" : ""}`}
          onClick={() => onPageChange("settings")}
        >
          <FontAwesomeIcon icon={faCog} />
          <span>Settings</span>
        </button>
      </nav>
    </div>
  );
}
