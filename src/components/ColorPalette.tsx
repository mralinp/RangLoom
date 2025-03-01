import { FC } from "react";
import "./ColorPalette.css";

interface ColorPaletteProps {
  name: string;
  colors: string[];
  isSelected: boolean;
  onClick: () => void;
  viewType?: "grid" | "preview";
}

export const ColorPalette: FC<ColorPaletteProps> = ({
  name,
  colors,
  isSelected,
  onClick,
  viewType = "preview",
}) => {
  const renderPreviewColors = () => {
    if (colors.length <= 4) {
      return colors.map((color, index) => (
        <div
          key={index}
          className="mini-square"
          style={{ background: color }}
        />
      ));
    }

    return (
      <>
        {colors.slice(0, 3).map((color, index) => (
          <div
            key={index}
            className="mini-square"
            style={{ background: color }}
          />
        ))}
        <div className="mini-square more-colors">...</div>
      </>
    );
  };

  if (viewType === "grid") {
    return (
      <div
        className={`palette-card ${isSelected ? "selected" : ""}`}
        onClick={onClick}
      >
        <div className="palette-preview">
          {colors.map((color, index) => (
            <div
              key={index}
              className="color-preview"
              style={{ background: color }}
            />
          ))}
        </div>
        <span className="palette-name">{name}</span>
      </div>
    );
  }

  return (
    <div
      className={`palette-option ${isSelected ? "selected" : ""}`}
      onClick={onClick}
    >
      <div className="color-squares">{renderPreviewColors()}</div>
      <span>{name}</span>
    </div>
  );
};
