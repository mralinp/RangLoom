import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faCircleInfo,
  faMagicWandSparkles,
  faPlus,
  faMinus,
} from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./blending.page.css";

interface LocationState {
  imageUrl?: string;
}

interface ColorPalette {
  name: string;
  colors: string[];
}

export function BlendingPage() {
  const location = useLocation();
  const { imageUrl } = (location.state as LocationState) || {};
  const navigate = useNavigate();

  const [selectedColors] = useState([
    { color: "#1a1f2c", name: "Base Red", ratio: 45 },
    { color: "#2f3542", name: "Base Brown", ratio: 35 },
    { color: "#57606f", name: "Base Black", ratio: 20 },
  ]);

  const [blendedColor, setBlendedColor] = useState("#4A4A4A");
  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedAreaPreview, setSelectedAreaPreview] = useState<string>("");
  const [selectedPalette, setSelectedPalette] = useState<string>("Classic");
  const [showPaletteSelector, setShowPaletteSelector] = useState(false);

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 0.25, 10));
  };

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 0.25, 0.5));
  };

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
    setDragStart({ x: clientX - position.x, y: clientY - position.y });
  };

  const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;

    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;

    setPosition({
      x: clientX - dragStart.x,
      y: clientY - dragStart.y,
    });
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const calculateMeanColor = () => {
    const canvas = canvasRef.current;
    const img = document.querySelector(".preview-image") as HTMLImageElement;

    if (!canvas || !img || !img.complete) return;

    const rect = document
      .querySelector(".selection-box")
      ?.getBoundingClientRect();
    const imgRect = img.getBoundingClientRect();

    if (!rect) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = rect.width;
    canvas.height = rect.height;

    // Calculate the center of the selection box in viewport coordinates
    const selectionCenterX = rect.left + rect.width / 2;
    const selectionCenterY = rect.top + rect.height / 2;

    // Calculate the center of the image in viewport coordinates
    const imageCenterX = imgRect.left + imgRect.width / 2;
    const imageCenterY = imgRect.top + imgRect.height / 2;

    // Calculate the offset from image center to selection center
    const offsetX = (selectionCenterX - imageCenterX) / zoom;
    const offsetY = (selectionCenterY - imageCenterY) / zoom;

    // Calculate the source coordinates in the original image
    const sourceX = img.naturalWidth / 2 + offsetX - rect.width / (2 * zoom);
    const sourceY = img.naturalHeight / 2 + offsetY - rect.height / (2 * zoom);
    const sourceWidth = rect.width / zoom;
    const sourceHeight = rect.height / zoom;

    try {
      // Clear the canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw the selected portion of the image
      ctx.drawImage(
        img,
        sourceX,
        sourceY,
        sourceWidth,
        sourceHeight,
        0,
        0,
        canvas.width,
        canvas.height
      );

      // Save the cropped preview
      setSelectedAreaPreview(canvas.toDataURL());

      // Get pixel data for mean color calculation
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      // Only calculate mean color if we have valid pixel data
      if (data.length > 0) {
        let r = 0,
          g = 0,
          b = 0;
        const pixels = data.length / 4;

        for (let i = 0; i < data.length; i += 4) {
          r += data[i];
          g += data[i + 1];
          b += data[i + 2];
        }

        r = Math.round(r / pixels);
        g = Math.round(g / pixels);
        b = Math.round(b / pixels);

        const meanColor = `#${r.toString(16).padStart(2, "0")}${g
          .toString(16)
          .padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
        setBlendedColor(meanColor.toUpperCase());
      }
    } catch (error) {
      console.error("Error calculating mean color:", error);
    }
  };

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const updateSample = () => {
      if (imageUrl) {
        timeoutId = setTimeout(calculateMeanColor, 100);
      }
    };

    updateSample();

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [imageUrl, position, zoom, isDragging]);

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

  const renderPaletteColors = (colors: string[]) => {
    if (colors.length <= 4) {
      return colors.map((color, index) => (
        <div
          key={index}
          className="mini-square"
          style={{ background: color }}
        ></div>
      ));
    }

    return (
      <>
        {colors.slice(0, 3).map((color, index) => (
          <div
            key={index}
            className="mini-square"
            style={{ background: color }}
          ></div>
        ))}
        <div className="mini-square more-colors">...</div>
      </>
    );
  };

  const handleBack = () => {
    navigate("/");
  };

  return (
    <div className="blending-page">
      <div className="header">
        <button className="nav-button" onClick={handleBack}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        <h1>Color Analysis</h1>
        <button className="nav-button">
          <FontAwesomeIcon icon={faCircleInfo} />
        </button>
      </div>

      <div className="preview-container">
        <div className="image-preview">
          {imageUrl ? (
            <>
              <div
                className="image-container"
                onMouseDown={handleDragStart}
                onMouseMove={handleDragMove}
                onMouseUp={handleDragEnd}
                onMouseLeave={handleDragEnd}
                onTouchStart={handleDragStart}
                onTouchMove={handleDragMove}
                onTouchEnd={handleDragEnd}
              >
                <img
                  src={imageUrl}
                  alt="Uploaded carpet"
                  className="preview-image"
                  style={{
                    transform: `scale(${zoom}) translate(${position.x}px, ${position.y}px)`,
                  }}
                />
              </div>
              <canvas ref={canvasRef} style={{ display: "none" }} />
            </>
          ) : (
            <div className="preview-text">No image uploaded</div>
          )}
          <div className="selection-box" />
          <div className="zoom-controls">
            <button className="zoom-button" onClick={handleZoomIn}>
              <FontAwesomeIcon icon={faPlus} />
            </button>
            <button className="zoom-button" onClick={handleZoomOut}>
              <FontAwesomeIcon icon={faMinus} />
            </button>
          </div>
        </div>

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
                <div
                  key={palette.name}
                  className={`palette-option ${
                    selectedPalette === palette.name ? "selected" : ""
                  }`}
                  onClick={() => setSelectedPalette(palette.name)}
                >
                  <div className="color-squares">
                    {renderPaletteColors(palette.colors)}
                  </div>
                  <span>{palette.name}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="color-analysis">
            <div className="analysis-header">
              <h2>Selected Area Color</h2>
              <span className="color-hex">{blendedColor}</span>
            </div>

            <div className="color-composition">
              <div className="selected-area-preview">
                {selectedAreaPreview ? (
                  <img
                    src={selectedAreaPreview}
                    alt="Selected area"
                    className="preview-crop"
                  />
                ) : (
                  <div
                    className="selected-color-square"
                    style={{ background: blendedColor }}
                  />
                )}
              </div>
              <div className="composition-details">
                {selectedColors.map((color, index) => (
                  <div key={index} className="composition-row">
                    <span>{color.name}</span>
                    <span>{color.ratio}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <button className="generate-button">
            <FontAwesomeIcon icon={faMagicWandSparkles} />
            <span>Generate Mix Recipe</span>
          </button>
        </div>
      </div>

      {showPaletteSelector && (
        <div className="palette-selector-overlay">
          <div className="palette-selector">
            <div className="selector-header">
              <h2>Color Palettes</h2>
              <button
                className="close-button"
                onClick={() => setShowPaletteSelector(false)}
              >
                ×
              </button>
            </div>
            <div className="palette-grid">
              {allPalettes.map((palette) => (
                <div
                  key={palette.name}
                  className={`palette-card ${
                    selectedPalette === palette.name ? "selected" : ""
                  }`}
                  onClick={() => handlePaletteSelect(palette.name)}
                >
                  <div className="palette-preview">
                    {palette.colors.map((color, index) => (
                      <div
                        key={index}
                        className="color-preview"
                        style={{ background: color }}
                      />
                    ))}
                  </div>
                  <span className="palette-name">{palette.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
