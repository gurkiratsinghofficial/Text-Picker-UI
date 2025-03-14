import { useEffect, useRef } from "react";

export const useCalculatePosition = () => {
  const imageRef = useRef(null);

  const calculatePosition = (position) => {
    const img = imageRef?.current;
    const imgWidth = img?.clientWidth;
    const imgHeight = img?.clientHeight;
    const imgNaturalWidth = img?.naturalWidth;
    const imgNaturalHeight = img?.naturalHeight;
    const ratioX = imgWidth / imgNaturalWidth;
    const ratioY = imgHeight / imgNaturalHeight;

    return {
      left: position?.minX * ratioX,
      top: position?.minY * ratioY,
      width: (position?.maxX - position?.minX) * ratioX,
      height: (position?.maxY - position?.minY) * ratioY,
    };
  };

  const calculateCoordinates = (size) => {
    const img = imageRef?.current;
    const imgWidth = img?.clientWidth;
    const imgHeight = img?.clientHeight;
    const imgNaturalWidth = img?.naturalWidth;
    const imgNaturalHeight = img?.naturalHeight;
    const ratioX = imgNaturalWidth / imgWidth;
    const ratioY = imgNaturalHeight / imgHeight;

    return {
      minX: size.left * ratioX,
      minY: size.top * ratioY,
      maxX: (size.left + size.width) * ratioX,
      maxY: (size.top + size.height) * ratioY,
    };
  };

  useEffect(() => {
    const img = imageRef.current;
    if (img) {
      img.addEventListener("load", calculatePosition);
    }

    return () => {
      if (img) {
        img.removeEventListener("load", calculatePosition);
      }
    };
  }, [imageRef]);

  return [imageRef, calculatePosition, calculateCoordinates];
};
