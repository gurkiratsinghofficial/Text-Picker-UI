import { useEffect, useRef, useState } from "react";

export function useFocusListener() {
  const focusedElementRef = useRef(null);
  const [isInputFocussed, setIsInputFocussed] = useState(null);

  useEffect(() => {
    const handleFocus = (event) => {
      const { tagName, type } = event.target
      if ((tagName === "INPUT" && type === "text") || (tagName === "TEXTAREA" && type === "textarea")) {
        focusedElementRef.current = event.target;
        setIsInputFocussed(true);
      }
    };

    document.addEventListener("focusin", handleFocus);

    return () => {
      document.removeEventListener("focusin", handleFocus);
    };
  }, []);
  return { focusedElementRef, isInputFocussed };
}
