import { FC, useMemo } from "react";
import "./ColorAnalysis.css";

interface ColorAnalysisProps {
  title: string;
  color: string;
  sample: string | null;
  isActive: boolean;
  selectedColors: Array<{ color: string; name: string; ratio: number }>;
  onClick: () => void;
}

export const ColorAnalysis: FC<ColorAnalysisProps> = ({
  title,
  color,
  sample,
  isActive,
  onClick,
}) => {
  const rgbaValues = useMemo(() => {
    const match = color.match(
      /rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/
    );
    if (match) {
      return {
        red: parseInt(match[1]),
        green: parseInt(match[2]),
        blue: parseInt(match[3]),
        alpha: match[4] ? parseFloat(match[4]) : 1,
      };
    }
    return null;
  }, [color]);

  const colorComponents = useMemo(
    () => [
      { name: "Red", value: rgbaValues?.red ?? 0 },
      { name: "Green", value: rgbaValues?.green ?? 0 },
      { name: "Blue", value: rgbaValues?.blue ?? 0 },
      { name: "Alpha", value: Math.round((rgbaValues?.alpha ?? 1) * 100) },
    ],
    [rgbaValues]
  );

  return (
    <div
      className={`color-analysis ${isActive ? "active" : ""}`}
      onClick={onClick}
    >
      <div className="analysis-header">
        <h2>{title}</h2>
      </div>

      <div className="color-composition">
        <div className="selected-area-preview">
          {sample ? (
            <img src={sample} alt={title} className="preview-crop" />
          ) : (
            <div
              className="selected-color-square"
              style={{ background: color }}
            />
          )}
        </div>
        <div className="composition-details">
          {colorComponents.map((component, index) => (
            <div key={index} className="composition-row">
              <span>{component.name}</span>
              <span>
                {component.name === "Alpha"
                  ? `${component.value}%`
                  : component.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
