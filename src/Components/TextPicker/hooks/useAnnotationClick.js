import { useCallback } from "react";
import { fireEvent } from "@testing-library/react";

export const useAnnotationClick = (focusedElementRef) => {
  const handleAnnotationClick = useCallback(
    (annotation) => {
      // If `focusedElementRef` does not point to a DOM element, return early without doing anything.
      if (!focusedElementRef.current) return;

      // Retrieve the current input element and the start and end positions of the text selection within it.
      const inputEl = focusedElementRef.current;
      const { value, selectionStart, selectionEnd } = inputEl;
      // Replace the selected text with the `annotation.text`, and set the new value of the input element.
      const replacedText = annotation.text;
      const updatedValue =
        value.slice(0, selectionStart) +
        (selectionStart === selectionEnd && inputEl.value ? " " : "") +
        replacedText +
        value.slice(selectionEnd);

      // Simulate a `change` event on the input element to trigger any side-effects that may depend on it.
      // Heart of the component
      //        🢃
      fireEvent.input(inputEl, { target: { value: updatedValue } });
      fireEvent.change(inputEl, { target: { value: updatedValue } });

      // Set the cursor position to the end of the replaced text, accounting for any added spaces.
      const newCursorPosition =
        selectionStart +
        replacedText.length +
        (selectionStart === selectionEnd ? 1 : 0);

      // Set focus to the input element and move the cursor to the new position.
      inputEl.focus();
      setTimeout(() => {
        inputEl.setSelectionRange(newCursorPosition, newCursorPosition);
      });
    },
    [focusedElementRef]
  );
  return handleAnnotationClick;
};
