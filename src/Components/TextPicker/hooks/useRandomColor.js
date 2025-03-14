import { useState, useMemo } from "react";

export const useRandomColor = () => {
  const [color] = useState("#000000");

  const getRandomColor = useMemo(() => {
    const letters = "0123456789ABCDEF";
    return () => {
      let newColor = "#";
      for (let i = 0; i < 6; i++) {
        newColor += letters[Math.floor(Math.random() * 16)];
      }
      return newColor;
    };
  }, []);

  return [color, getRandomColor];
};
