const Controls = ({
  handleUpload,
  handleReset,
  loading,
  zoom,
  handleZoomChange,
}) => {
  return (
    <div className="bottom-bar">
      <button onClick={handleUpload} disabled={loading} className="upload-btn">
        {loading ? "Processing..." : "Extract Text"}
      </button>
      <button onClick={handleReset} disabled={loading} className="upload-btn">
        Reset
      </button>
      <div className="zoom-container">
        <label>Zoom:</label>
        <input
          disabled={loading}
          type="range"
          value={zoom}
          step={0.1}
          min={1}
          max={3}
          onChange={handleZoomChange}
        />
      </div>
    </div>
  );
};

export default Controls;
