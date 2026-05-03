import { useEffect, useRef, useState, type RefObject } from "react";

/**
 * Measures an element's rendered width and keeps it updated when the element resizes.
 *
 * This hook is useful for layout regions that need to react to the actual available
 * space instead of relying on a fixed value.
 *
 * @typeParam T - The HTMLElement subtype to observe.
 * @returns A tuple containing the element ref and its current width in pixels.
 */
type ElementWidthResult<T extends HTMLElement> = readonly [
  RefObject<T | null>,
  number,
];

export function useElementWidth<T extends HTMLElement>(): ElementWidthResult<T> {
  const ref = useRef<T>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    const element = ref.current;
    const updateWidth = () => {
      setWidth(element.getBoundingClientRect().width);
    };

    updateWidth();

    const observer = new ResizeObserver(updateWidth);
    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return [ref, width];
}
