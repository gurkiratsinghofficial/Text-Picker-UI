import { FaCloudUploadAlt } from "react-icons/fa";

const UploadSection = ({ error, handleImageChange }) => {
  return (
    <div className="full-container">
      <div className="upload-card">
        {error && <p className="error-message">{error}</p>}
        <input
          type="file"
          accept="image/*"
          id="file-upload"
          onChange={handleImageChange}
          hidden
        />
        <label htmlFor="file-upload" className="upload-icon">
          <FaCloudUploadAlt size={50} />
          <p>Click to Upload Image</p>
        </label>
      </div>
    </div>
  );
};

export default UploadSection;
