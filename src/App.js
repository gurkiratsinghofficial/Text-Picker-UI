import useImageUpload from "./hooks/useImageUpload";
import useOCRProcessing from "./hooks/useOCRProcessing";
import UploadSection from "./Components/UploadSection";
import Controls from "./Components/Controls";
import Preview from "./Components/Preview";
import "./App.css";
import useImageZoom from "./hooks/useImageZoom";
import Documentation from "./Components/Documentation";

function App() {
  const { image, preview, handleImageChange, handleReset } = useImageUpload();
  const { textData, loading, error, handleUpload } = useOCRProcessing();
  const { zoom, handleZoomChange, minZoom, maxZoom, step } = useImageZoom({
    initialZoom: 1,
    minZoom: 1,
    maxZoom: 3,
    step: 0.1,
  });
  return (
    <div className="app-container">
      <div className="left-panel">
        <Documentation />
      </div>
      <div className="right-panel">
        {preview ? (
          <>
            <Controls
              handleUpload={() => handleUpload(image)}
              handleReset={handleReset}
              loading={loading}
              zoom={zoom}
              handleZoomChange={handleZoomChange}
              minZoom={minZoom}
              maxZoom={maxZoom}
              step={step}
            />
            <Preview preview={preview} textData={textData} zoom={zoom} />
          </>
        ) : (
          <UploadSection error={error} handleImageChange={handleImageChange} />
        )}
      </div>
    </div>
  );
}

export default App;
