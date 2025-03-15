import { useCallback } from "react";

export const useAnnotationClick = (focusedElementRef) => {
  const handleAnnotationClick = useCallback(
    (annotation) => {
      if (!focusedElementRef.current) return;

      const inputEl = focusedElementRef.current;
      const { value, selectionStart, selectionEnd } = inputEl;
      const replacedText = annotation.text;
      const updatedValue =
        value.slice(0, selectionStart) +
        (selectionStart === selectionEnd && inputEl.value ? " " : "") +
        replacedText +
        value.slice(selectionEnd);

      // Get the value setter for this specific input element
      const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
        Object.getPrototypeOf(inputEl),
        "value"
      ).set;

      // Call the setter with the correct 'this' context
      nativeInputValueSetter.call(inputEl, updatedValue);

      const inputEvent = new Event("input", { bubbles: true });
      inputEl.dispatchEvent(inputEvent);

      const changeEvent = new Event("change", { bubbles: true });
      inputEl.dispatchEvent(changeEvent);

      const newCursorPosition =
        selectionStart +
        replacedText.length +
        (selectionStart === selectionEnd ? 1 : 0);

      inputEl.focus();
      setTimeout(() => {
        inputEl.setSelectionRange(newCursorPosition, newCursorPosition);
      });
    },
    [focusedElementRef]
  );
  return handleAnnotationClick;
};
