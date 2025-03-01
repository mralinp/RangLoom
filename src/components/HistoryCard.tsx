import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShare } from "@fortawesome/free-solid-svg-icons";
import "./HistoryCard.css";

interface HistoryCardProps {
  id: string;
  image?: string;
  colors: string[];
  style?: "Traditional" | "Modern";
  timestamp: string;
  recipeMix: number[];
}

export const HistoryCard: React.FC<HistoryCardProps> = ({
  id,
  image,
  colors,
  style = "Traditional",
  timestamp,
  recipeMix,
}) => {
  return (
    <div className="history-card">
      <div className="card-header">
        <div className="sample-info">
          <span className="sample-id">Sample #{id}</span>
          <span className="timestamp">{timestamp}</span>
        </div>
      </div>

      <div className="card-content">
        <div className="image-container">
          {image ? (
            <img src={image} alt={`Sample ${id}`} />
          ) : (
            <div className="placeholder">Carpet Image</div>
          )}
        </div>

        <div className="colors-section">
          <div className="color-swatches">
            {colors.map((color, index) => (
              <div
                key={index}
                className="color-swatch"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
          <div className="style-info">
            <span>{style}</span>
            <span>{colors.length} colors</span>
          </div>
        </div>
      </div>

      <div className="recipe-mix">
        Recipe Mix:{" "}
        {recipeMix.map((percentage, index) => (
          <React.Fragment key={index}>
            {index > 0 && " / "}
            {percentage}%
          </React.Fragment>
        ))}
        <FontAwesomeIcon icon={faShare} className="share-icon" />
      </div>
    </div>
  );
};
