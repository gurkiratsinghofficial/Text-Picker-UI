import TextPicker from "./TextPicker/TextPicker";

const Preview = ({ preview, textData, zoom }) => {
  return (
    <div className="full-container">
      <TextPicker
        containerClass="right-panel-child"
        annotations={textData}
        imageUrl={preview}
        zoom={zoom}
      />
    </div>
  );
};

export default Preview;
