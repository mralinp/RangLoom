import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faShare,
  faEllipsis,
} from "@fortawesome/free-solid-svg-icons";
import "./PaletteCard.css";

interface PaletteCardProps {
  id: string;
  name: string;
  colors: string[];
  likes: number;
  isLiked: boolean;
  onLikeToggle: (id: string) => void;
}

export function PaletteCard({
  id,
  name,
  colors,
  likes,
  isLiked,
  onLikeToggle,
}: PaletteCardProps) {
  const MAX_VISIBLE_COLORS = 4;
  const hasMoreColors = colors.length > MAX_VISIBLE_COLORS;
  const visibleColors = hasMoreColors
    ? colors.slice(0, MAX_VISIBLE_COLORS - 1)
    : colors;

  return (
    <div className="palette-card">
      <div className="palette-header">
        <h3>{name}</h3>
        <div className="like-container">
          <span className="likes-count">{likes}</span>
          <button
            className={`like-button ${isLiked ? "active" : ""}`}
            onClick={() => onLikeToggle(id)}
          >
            <FontAwesomeIcon icon={faHeart} />
          </button>
        </div>
      </div>
      <div className="color-samples">
        {visibleColors.map((color, index) => (
          <div
            key={index}
            className="color-square"
            style={{ backgroundColor: color }}
          />
        ))}
        {hasMoreColors && (
          <div className="color-square more-colors">
            <FontAwesomeIcon icon={faEllipsis} />
          </div>
        )}
      </div>
      <div className="palette-footer">
        <span>{colors.length} colors</span>
        <button className="share-button">
          <FontAwesomeIcon icon={faShare} />
        </button>
      </div>
    </div>
  );
}
