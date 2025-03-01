import { FC, useRef, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import "./ImageCanvas.css";

interface ImageCanvasProps {
  imageUrl: string | undefined;
  onCrop: (croppedUrl: string, meanColor: string) => void;
}

export const ImageCanvas: FC<ImageCanvasProps> = ({ imageUrl, onCrop }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(1);
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const SELECTION_SIZE = 48;
  const [initialPinchDistance, setInitialPinchDistance] = useState<
    number | null
  >(null);
  const [initialScale, setInitialScale] = useState<number>(1);

  useEffect(() => {
    if (!imageUrl) return;

    const img = new Image();
    img.src = imageUrl;
    img.onload = () => {
      setImage(img);
      drawImage(img);
    };
  }, [imageUrl]);

  const drawImage = (img: HTMLImageElement | null = image) => {
    const canvas = canvasRef.current;
    if (!canvas || !img) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw image
    ctx.save();
    ctx.translate(position.x, position.y);
    ctx.scale(scale, scale);
    ctx.drawImage(img, 0, 0);
    ctx.restore();

    // Calculate selection box center position
    const centerX = canvas.width / 2 - SELECTION_SIZE / 2;
    const centerY = canvas.height / 2 - SELECTION_SIZE / 2;

    // Draw dark overlay
    ctx.fillStyle = "rgba(0, 0, 0, 0.5)";

    // Draw overlay in four parts around the selection box
    ctx.fillRect(0, 0, canvas.width, centerY); // Top
    ctx.fillRect(0, centerY, centerX, SELECTION_SIZE); // Left
    ctx.fillRect(
      centerX + SELECTION_SIZE,
      centerY,
      canvas.width - (centerX + SELECTION_SIZE),
      SELECTION_SIZE
    ); // Right
    ctx.fillRect(
      0,
      centerY + SELECTION_SIZE,
      canvas.width,
      canvas.height - (centerY + SELECTION_SIZE)
    ); // Bottom

    // Draw white border around selection box
    ctx.strokeStyle = "white";
    ctx.lineWidth = 2;
    ctx.strokeRect(centerX, centerY, SELECTION_SIZE, SELECTION_SIZE);
  };

  const calculateMeanColor = (imageData: ImageData): string => {
    const data = imageData.data;
    let r = 0,
      g = 0,
      b = 0,
      a = 0;
    const pixels = data.length / 4;

    for (let i = 0; i < data.length; i += 4) {
      r += data[i];
      g += data[i + 1];
      b += data[i + 2];
      a += data[i + 3];
    }

    r = Math.round(r / pixels);
    g = Math.round(g / pixels);
    b = Math.round(b / pixels);
    a = Math.round(a / pixels);

    return `rgba(${r}, ${g}, ${b}, ${(a / 255).toFixed(2)})`;
  };

  const cropSelection = () => {
    const canvas = canvasRef.current;
    if (!canvas || !image) return;

    const cropCanvas = document.createElement("canvas");
    cropCanvas.width = SELECTION_SIZE;
    cropCanvas.height = SELECTION_SIZE;
    const ctx = cropCanvas.getContext("2d");
    if (!ctx) return;

    // Calculate center position of selection box
    const centerX = canvas.width / 2 - SELECTION_SIZE / 2;
    const centerY = canvas.height / 2 - SELECTION_SIZE / 2;

    // Calculate the source coordinates in the original image space
    const sourceX = (centerX - position.x) / scale;
    const sourceY = (centerY - position.y) / scale;

    // Draw the selected portion of the image
    ctx.drawImage(
      image,
      sourceX,
      sourceY,
      SELECTION_SIZE / scale,
      SELECTION_SIZE / scale,
      0,
      0,
      SELECTION_SIZE,
      SELECTION_SIZE
    );

    // Get image data to calculate mean color
    const imageData = ctx.getImageData(0, 0, SELECTION_SIZE, SELECTION_SIZE);
    const meanColor = calculateMeanColor(imageData);
    const croppedUrl = cropCanvas.toDataURL("image/jpeg");

    onCrop(croppedUrl, meanColor);
  };

  const handleMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    const clientX =
      "touches" in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    const clientY =
      "touches" in e ? e.touches[0].clientY : (e as React.MouseEvent).clientY;

    setStartPos({
      x: clientX - position.x,
      y: clientY - position.y,
    });
  };

  const handleMouseMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;

    const clientX =
      "touches" in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    const clientY =
      "touches" in e ? e.touches[0].clientY : (e as React.MouseEvent).clientY;

    setPosition({
      x: clientX - startPos.x,
      y: clientY - startPos.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    cropSelection();
  };

  const handleZoom = (delta: number) => {
    setScale((prev) => {
      const newScale = delta > 0 ? prev * 1.1 : prev / 1.1;
      return Math.min(Math.max(0.1, newScale), 5);
    });
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    handleZoom(e.deltaY > 0 ? -1 : 1);
  };

  const getTouchDistance = (touches: React.TouchList) => {
    if (touches.length < 2) return 0;
    const dx = touches[0].clientX - touches[1].clientX;
    const dy = touches[0].clientY - touches[1].clientY;
    return Math.sqrt(dx * dx + dy * dy);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      e.preventDefault();
      setInitialPinchDistance(getTouchDistance(e.touches));
      setInitialScale(scale);
    } else {
      handleMouseDown(e);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 2 && initialPinchDistance) {
      e.preventDefault();
      const currentDistance = getTouchDistance(e.touches);
      const scaleFactor = currentDistance / initialPinchDistance;
      const newScale = initialScale * scaleFactor;

      setScale(Math.min(Math.max(0.1, newScale), 5));
    } else {
      handleMouseMove(e);
    }
  };

  const handleTouchEnd = () => {
    setInitialPinchDistance(null);
    handleMouseUp();
  };

  useEffect(() => {
    if (image) {
      drawImage();
      cropSelection();
    }
  }, [position, scale, image]);

  return (
    <div className="canvas-container">
      <canvas
        ref={canvasRef}
        width={window.innerWidth}
        height={300}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onWheel={handleWheel}
        className="image-canvas"
      />
      <div className="zoom-controls">
        <button className="zoom-button" onClick={() => handleZoom(1)}>
          <FontAwesomeIcon icon={faPlus} />
        </button>
        <button className="zoom-button" onClick={() => handleZoom(-1)}>
          <FontAwesomeIcon icon={faMinus} />
        </button>
      </div>
    </div>
  );
};
