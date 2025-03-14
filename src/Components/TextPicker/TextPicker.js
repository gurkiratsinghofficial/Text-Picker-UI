/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useMemo, useState } from "react";
import { useAnnotationClick } from "./hooks/useAnnotationClick";
import { useCalculatePosition } from "./hooks/useCalculatePosition";
import { useFocusListener } from "./hooks/useFocusListener";
import { useRandomColor } from "./hooks/useRandomColor";

const LoadingMessages = [
  `See it! Clear it! Move it!`,
  `Embrace the Future: Ditch the Paperwork!`,
  `From Piles to Progress: Go Paperless Today!`,
  `Paperwork Begone! Streamline Your Work with KlearNow.`,
  `Unleash Efficiency: Say Goodbye to Paperwork!`,
  `Less Paper, More Power: Choose a Paperless Path.`,
  `Paperwork-Free Zone Ahead!`,
  `Leave Paper in the Past: Opt for Digital Efficiency.`,
  `Simplify, Streamline, Succeed: Ditch the Paperwork.`,
  `Break Free from the Binders: Go Paperless and Thrive!`,
  `Customs made easy: Go paperless, go KlearNow!`,
];

/**
 *
 * @param {imageUrl} String
 * @param {annotations} Array
 * @returns
 */
const TextPicker = ({
  imageUrl = null,
  annotations = [],
  zoom = 1,
  loadingComponent,
  rotate = 0,
  containerClass,
}) => {
  const [imageRef, calculatePosition] = useCalculatePosition();
  const [_randomColor, getRandomColor] = useRandomColor();
  const { focusedElementRef, isInputFocussed } = useFocusListener();
  const [imageLoaded, setImageLoaded] = useState(false);
  const handleAnnotationClick = useAnnotationClick(focusedElementRef); // <-- ♥ Heart of the component

  const handleImageLoad = () => setImageLoaded(true);
  const handleMouseOver = (e) => (e.target.style.transform = `scale(1.15)`);
  const handleMouseOut = (e) => (e.target.style.transform = `scale(1)`);
  const handleClick = (annotation) => handleAnnotationClick(annotation);

  const loadingMessage = useMemo(() => {
    const randomIndex = Math.floor(Math.random() * LoadingMessages.length);
    return LoadingMessages[randomIndex];
  }, [imageUrl]);

  const annotationColors = useMemo(() => {
    return annotations.map((_, index) => getRandomColor(index));
  }, [annotations]);

  const containerStyle = {
    position: "relative",
    transform: rotate ? `rotate(${rotate}deg)` : undefined,
    height: "100%",
    overflow: "scroll",
    display: "block",
  };
  const imageStyle = {
    width: "100%",
    visibility: imageLoaded ? "visible" : "hidden",
    transformOrigin: "left top",
    transform: `scale(${zoom})`,
  };
  const [refs, setRefs] = useState([]);
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = (event, node) => {
    setIsDragging(true);
    setRefs([node]);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (event) => {
    if (!isDragging) {
      return;
    }

    const node = event.target;
    const currentRefs = [...refs];
    const index = currentRefs.indexOf(node);

    if (index === -1) {
      currentRefs.push(node);
      setRefs(currentRefs);
    }
  };

  useEffect(() => {
    setImageLoaded(false); // Reset isImageLoaded to false when imageUrl changes
  }, [imageUrl]);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    } else {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);
  const divRefs = refs.map((ref) => ref);

  return (
    <>
      {imageUrl && Array.isArray(annotations) ? (
        <div style={containerStyle} className={containerClass}>
          <img
            src={imageUrl}
            alt="annotated"
            ref={imageRef}
            style={imageStyle}
            onLoad={handleImageLoad}
          />
          {imageLoaded ? (
            <div
              style={{
                position: "absolute",
                height: "100%",
                width: "100%",
                top: "0",
                left: "0",
                transform: `scale(${zoom})`,
                transformOrigin: "left top",
              }}
            >
              {annotations.map((annotation, index) => {
                console.log(
                  annotation.border,
                  "annotation.border",
                  calculatePosition(annotation.border)
                );
                const annotationStyle = {
                  position: "absolute",
                  backgroundColor: annotationColors[index],
                  opacity: 0.3,
                  cursor: "copy",
                  transition: "transform 0.2s ease-in-out",
                  pointerEvents: isInputFocussed ? "all" : "none",
                  ...calculatePosition(annotation.border),
                };
                return (
                  <div
                    onMouseDown={(event) =>
                      handleMouseDown(event, divRefs[index])
                    }
                    ref={(node) => (divRefs[index] = node)}
                    key={index}
                    style={annotationStyle}
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}
                    onClick={handleClick.bind(null, annotation)}
                  />
                );
              })}
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                height: "100%",
              }}
            >
              <i style={{ color: "grey" }}>
                {loadingComponent} {loadingMessage}
              </i>
            </div>
          )}
        </div>
      ) : (
        <div>🛠️ KNTextPicker: Please feed correct props</div>
      )}
    </>
  );
};

export default TextPicker;
