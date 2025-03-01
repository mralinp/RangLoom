import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagicWandSparkles } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import "./blending.page.css";
import { ColorAnalysis } from "../components/ColorAnalysis";
import { ImageCanvas } from "../components/ImageCanvas";
import { ColorPalette } from "../components/ColorPalette";
import { PaletteSelector } from "../components/PaletteSelector";
import CreateLayout from "../layouts/create.layout";

interface LocationState {
  imageUrl?: string;
}

interface ColorPalette {
  name: string;
  colors: string[];
}

export const BlendingPage = () => {
  const location = useLocation();
  const { imageUrl } = (location.state as LocationState) || {};

  const [selectedColors] = useState([
    { color: "#1a1f2c", name: "Base Red", ratio: 45 },
    { color: "#2f3542", name: "Base Brown", ratio: 35 },
    { color: "#57606f", name: "Base Black", ratio: 20 },
  ]);

  const [blendedColor, setBlendedColor] = useState<string>(
    "rgba(74, 74, 74, 1)"
  );
  const [currentSample, setCurrentSample] = useState<string | null>(null);
  const [baseColor, setBaseColor] = useState<string>("rgba(74, 74, 74, 1)");
  const [baseSample, setBaseSample] = useState<string | null>(null);
  const [activeSelection, setActiveSelection] = useState<"base" | "selected">(
    "selected"
  );

  const [selectedPalette, setSelectedPalette] = useState<string>("Classic");
  const [showPaletteSelector, setShowPaletteSelector] = useState(false);

  const handleCrop = (croppedUrl: string, meanColor: string) => {
    if (activeSelection === "base") {
      setBaseColor(meanColor);
      setBaseSample(croppedUrl);
    } else {
      setBlendedColor(meanColor);
      setCurrentSample(croppedUrl);
    }
  };

  const allPalettes: ColorPalette[] = [
    {
      name: "Classic",
      colors: ["#1a1f2c", "#2f3542", "#57606f", "#a4b0be"],
    },
    {
      name: "Modern",
      colors: [
        "#2c3e50",
        "#34495e",
        "#7f8c8d",
        "#95a5a6",
        "#bdc3c7",
        "#ecf0f1",
      ],
    },
    {
      name: "Persian",
      colors: ["#c0392b", "#d35400", "#e67e22", "#f39c12"],
    },
    {
      name: "Custom",
      colors: [
        "#8e44ad",
        "#9b59b6",
        "#2980b9",
        "#3498db",
        "#16a085",
        "#27ae60",
      ],
    },
    // Add more palettes here
  ];

  const handlePaletteSelect = (name: string) => {
    setSelectedPalette(name);
    setShowPaletteSelector(false);
  };

  return (
    <CreateLayout title="Color Analysis">
      <div className="blending-page">
        <div className="preview-container">
          <ImageCanvas imageUrl={imageUrl} onCrop={handleCrop} />
          <div className="content-scroll">
            <div className="palette-section">
              <div className="section-header">
                <h2>Select Color Palette</h2>
                <button
                  className="view-all"
                  onClick={() => setShowPaletteSelector(true)}
                >
                  View All
                </button>
              </div>

              <div className="palette-options">
                {allPalettes.map((palette) => (
                  <ColorPalette
                    key={palette.name}
                    name={palette.name}
                    colors={palette.colors}
                    isSelected={selectedPalette === palette.name}
                    onClick={() => setSelectedPalette(palette.name)}
                  />
                ))}
              </div>
            </div>

            <ColorAnalysis
              title="Base Color"
              color={baseColor}
              sample={baseSample}
              isActive={activeSelection === "base"}
              selectedColors={selectedColors}
              onClick={() => setActiveSelection("base")}
            />

            <ColorAnalysis
              title="Sample Color"
              color={blendedColor}
              sample={currentSample}
              isActive={activeSelection === "selected"}
              selectedColors={selectedColors}
              onClick={() => setActiveSelection("selected")}
            />

            <button className="generate-button">
              <FontAwesomeIcon icon={faMagicWandSparkles} />
              <span>Generate Mix Recipe</span>
            </button>
          </div>
        </div>

        {showPaletteSelector && (
          <PaletteSelector
            palettes={allPalettes}
            selectedPalette={selectedPalette}
            onSelect={handlePaletteSelect}
            onClose={() => setShowPaletteSelector(false)}
          />
        )}
      </div>
    </CreateLayout>
  );
};
