import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faHeart, faShare } from "@fortawesome/free-solid-svg-icons";
import "./palettes.page.css";

type PaletteType = "All Palettes" | "Traditional" | "Modern" | "Custom";

export function PalettesPage() {
  return (
    <div className="palettes-page">
      {/* Search Bar */}
      <div className="search-container">
        <FontAwesomeIcon icon={faSearch} className="search-icon" />
        <input
          type="text"
          placeholder="Search palettes"
          className="search-input"
        />
      </div>

      {/* Filter Tabs */}
      <div className="filter-tabs">
        <button className="filter-tab active">All Palettes</button>
        <button className="filter-tab">Traditional</button>
        <button className="filter-tab">Modern</button>
        <button className="filter-tab">Custom</button>
      </div>

      {/* Palettes Grid */}
      <div className="palettes-list">
        <div className="palette-card">
          <div className="palette-header">
            <h3>Traditional Persian</h3>
            <button className="like-button">
              <FontAwesomeIcon icon={faHeart} />
            </button>
          </div>
          <div className="color-squares">
            <div
              className="color-square"
              style={{ background: "#1a1f2c" }}
            ></div>
            <div
              className="color-square"
              style={{ background: "#2f3542" }}
            ></div>
            <div
              className="color-square"
              style={{ background: "#57606f" }}
            ></div>
            <div
              className="color-square"
              style={{ background: "#a4b0be" }}
            ></div>
          </div>
          <div className="palette-footer">
            <span>4 colors</span>
            <button className="share-button">
              <FontAwesomeIcon icon={faShare} />
            </button>
          </div>
        </div>

        <div className="palette-card">
          <div className="palette-header">
            <h3>Modern Blend</h3>
            <button className="like-button active">
              <FontAwesomeIcon icon={faHeart} />
            </button>
          </div>
          <div className="color-squares">
            <div
              className="color-square"
              style={{ background: "#1a1f2c" }}
            ></div>
            <div
              className="color-square"
              style={{ background: "#2f3542" }}
            ></div>
            <div
              className="color-square"
              style={{ background: "#57606f" }}
            ></div>
            <div
              className="color-square"
              style={{ background: "#a4b0be" }}
            ></div>
            <div
              className="color-square"
              style={{ background: "#dfe4ea" }}
            ></div>
          </div>
          <div className="palette-footer">
            <span>5 colors</span>
            <button className="share-button">
              <FontAwesomeIcon icon={faShare} />
            </button>
          </div>
        </div>

        {/* Add more palette cards as needed */}
      </div>
    </div>
  );
}
