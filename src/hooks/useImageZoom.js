import { useState } from "react";

const useImageZoom = ({
  initialZoom = 1,
  minZoom = 1,
  maxZoom = 3,
  step = 0.1,
}) => {
  const [zoom, setZoom] = useState(initialZoom);

  const handleZoomChange = (e) => {
    setZoom(parseFloat(e.target.value));
  };

  return {
    zoom,
    setZoom,
    handleZoomChange,
    minZoom,
    maxZoom,
    step,
  };
};

export default useImageZoom;
