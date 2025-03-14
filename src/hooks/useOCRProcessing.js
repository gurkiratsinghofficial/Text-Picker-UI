import { useState } from "react";
import axios from "axios";

const useOCRProcessing = () => {
  const [textData, setTextData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleUpload = async (image) => {
    if (!image) {
      setError("Please select an image first.");
      return;
    }

    setLoading(true);
    setError("");
    const formData = new FormData();
    formData.append("image", image);

    try {
      const response = await axios.post(
        "https://text-picker-backend.onrender.com/api/extractTextCoordinates",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (response.data.success) {
        setTextData(response.data.textCoordinates);
      } else {
        setError(response.data.error || "Failed to extract text.");
      }
    } catch (err) {
      setError(err.response?.data?.error || "Error connecting to server.");
    } finally {
      setLoading(false);
    }
  };

  return {
    textData,
    loading,
    error,
    handleUpload,
  };
};

export default useOCRProcessing;
