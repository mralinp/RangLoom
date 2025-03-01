import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faHeart, faShare } from "@fortawesome/free-solid-svg-icons";
import "./palettes.page.css";
import { useState } from "react";

type PaletteType = "All Palettes" | "Traditional" | "Modern" | "Custom";

interface Palette {
  id: string;
  name: string;
  type: Exclude<PaletteType, "All Palettes">;
  colors: string[];
  isLiked: boolean;
}

const INITIAL_PALETTES: Palette[] = [
  {
    id: "1",
    name: "Traditional Persian",
    type: "Traditional",
    colors: ["#1a1f2c", "#2f3542", "#57606f", "#a4b0be"],
    isLiked: false,
  },
  {
    id: "2",
    name: "Modern Blend",
    type: "Modern",
    colors: ["#1a1f2c", "#2f3542", "#57606f", "#a4b0be", "#dfe4ea"],
    isLiked: true,
  },
  {
    id: "3",
    name: "Custom Mix",
    type: "Custom",
    colors: ["#1a1f2c", "#57606f", "#a4b0be"],
    isLiked: false,
  },
];

export function PalettesPage() {
  const [selectedType, setSelectedType] = useState<PaletteType>("All Palettes");
  const [palettes, setPalettes] = useState<Palette[]>(INITIAL_PALETTES);
  const [searchQuery, setSearchQuery] = useState("");

  const handleFilterClick = (type: PaletteType) => {
    setSelectedType(type);
  };

  const handleLikeToggle = (paletteId: string) => {
    setPalettes(
      palettes.map((palette) =>
        palette.id === paletteId
          ? { ...palette, isLiked: !palette.isLiked }
          : palette
      )
    );
  };

  const filteredPalettes = palettes.filter((palette) => {
    if (selectedType !== "All Palettes" && palette.type !== selectedType)
      return false;
    if (
      searchQuery &&
      !palette.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
      return false;
    return true;
  });

  return (
    <div className="palettes-page">
      <div className="top-section">
        <div className="search-container">
          <FontAwesomeIcon icon={faSearch} className="search-icon" />
          <input
            type="text"
            placeholder="Search palettes"
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="filter-tabs">
        {["All Palettes", "Traditional", "Modern", "Custom"].map((type) => (
          <button
            key={type}
            className={`filter-tab ${selectedType === type ? "active" : ""}`}
            onClick={() => handleFilterClick(type as PaletteType)}
          >
            {type}
          </button>
        ))}
      </div>

      <div className="palettes-list">
        {filteredPalettes.map((palette) => (
          <div key={palette.id} className="palette-card">
            <div className="palette-header">
              <h3>{palette.name}</h3>
              <button
                className={`like-button ${palette.isLiked ? "active" : ""}`}
                onClick={() => handleLikeToggle(palette.id)}
              >
                <FontAwesomeIcon icon={faHeart} />
              </button>
            </div>
            <div className="color-squares">
              {palette.colors.map((color, index) => (
                <div
                  key={index}
                  className="color-square"
                  style={{ background: color }}
                />
              ))}
            </div>
            <div className="palette-footer">
              <span>{palette.colors.length} colors</span>
              <button className="share-button">
                <FontAwesomeIcon icon={faShare} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
