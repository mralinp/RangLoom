import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import "./palettes.page.css";
import { useState } from "react";
import { PaletteCard } from "../components/PaletteCard";
import { MainLayout } from "../layouts/main.layout";

type PaletteType = "All Palettes" | "Traditional" | "Modern" | "Custom";

interface Palette {
  id: string;
  name: string;
  type: Exclude<PaletteType, "All Palettes">;
  colors: string[];
  isLiked: boolean;
  likes: number;
}

const INITIAL_PALETTES: Palette[] = [
  {
    id: "1",
    name: "Traditional Persian",
    type: "Traditional",
    colors: ["#2c3e50", "#e74c3c", "#ecf0f1", "#3498db", "#2980b9"],
    isLiked: false,
    likes: 124,
  },
  {
    id: "2",
    name: "Modern Blend",
    type: "Modern",
    colors: ["#2d3436", "#636e72", "#b2bec3", "#dfe6e9"],
    isLiked: true,
    likes: 89,
  },
  {
    id: "3",
    name: "Desert Sunset",
    type: "Traditional",
    colors: ["#ff9f43", "#ee5253", "#ff6b6b", "#feca57"],
    isLiked: false,
    likes: 245,
  },
  {
    id: "4",
    name: "Ocean Breeze",
    type: "Modern",
    colors: ["#00cec9", "#81ecec", "#00b894", "#55efc4", "#2980b9"],
    isLiked: true,
    likes: 167,
  },
  {
    id: "5",
    name: "Forest Walk",
    type: "Traditional",
    colors: ["#6ab04c", "#badc58", "#ff7979", "#eb4d4b"],
    isLiked: false,
    likes: 92,
  },
  {
    id: "6",
    name: "Urban Night",
    type: "Modern",
    colors: ["#2f3640", "#353b48", "#718093", "#7f8fa6", "#dcdde1"],
    isLiked: false,
    likes: 188,
  },
  {
    id: "7",
    name: "Cherry Blossom",
    type: "Traditional",
    colors: ["#f8a5c2", "#f78fb3", "#574b90", "#303952"],
    isLiked: true,
    likes: 276,
  },
  {
    id: "8",
    name: "Custom Neon",
    type: "Custom",
    colors: ["#18dcff", "#32ff7e", "#ff4d4d", "#7d5fff", "#ffaf40"],
    isLiked: false,
    likes: 143,
  },
  {
    id: "9",
    name: "Minimal Gray",
    type: "Modern",
    colors: ["#d2dae2", "#808e9b", "#485460", "#1e272e"],
    isLiked: false,
    likes: 156,
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
    <MainLayout title="Palettes">
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
            <PaletteCard
              key={palette.id}
              id={palette.id}
              name={palette.name}
              colors={palette.colors}
              likes={palette.likes}
              isLiked={palette.isLiked}
              onLikeToggle={handleLikeToggle}
            />
          ))}
        </div>
      </div>
    </MainLayout>
  );
}
