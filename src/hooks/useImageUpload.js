import { useState } from "react";

const useImageUpload = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [zoom, setZoom] = useState(1);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
      setZoom(1);
    }
  };

  const handleReset = () => {
    setImage(null);
    setPreview(null);
    setZoom(1);
  };

  return {
    image,
    preview,
    zoom,
    setZoom,
    handleImageChange,
    handleReset,
  };
};

export default useImageUpload;
