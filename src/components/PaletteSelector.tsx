import { FC } from "react";
import { ColorPalette } from "./ColorPalette";
import "./PaletteSelector.css";

interface ColorPalette {
  name: string;
  colors: string[];
}

interface PaletteSelectorProps {
  palettes: ColorPalette[];
  selectedPalette: string;
  onSelect: (name: string) => void;
  onClose: () => void;
}

export const PaletteSelector: FC<PaletteSelectorProps> = ({
  palettes,
  selectedPalette,
  onSelect,
  onClose,
}) => {
  return (
    <div className="palette-selector-overlay">
      <div className="palette-selector">
        <div className="selector-header">
          <h2>Color Palettes</h2>
          <button className="close-button" onClick={onClose}>
            ×
          </button>
        </div>
        <div className="palette-grid">
          {palettes.map((palette) => (
            <ColorPalette
              key={palette.name}
              name={palette.name}
              colors={palette.colors}
              isSelected={selectedPalette === palette.name}
              onClick={() => onSelect(palette.name)}
              viewType="grid"
            />
          ))}
        </div>
      </div>
    </div>
  );
};
