'use client';

import { useCallback, useState } from 'react';

/**
 * Reads the given CSS properties back off a rendered element once it is in the document.
 *
 * The foundation pages print what the browser resolved a token to, never a copy of the Figma
 * measurement - the same trick the colour swatches use for their hex readouts. Attach
 * `measure` where a ref would go; it runs as soon as the node exists.
 */
export function useComputedStyle(properties: readonly string[]) {
  const [values, setValues] = useState<Record<string, string> | null>(null);
  // The property list is fixed per call site, so joining it gives the callback a stable
  // identity without asking every caller to memoise an array literal.
  const key = properties.join(',');

  const measure = useCallback(
    (element: HTMLElement | null) => {
      if (!element) {
        return;
      }

      const style = getComputedStyle(element);

      setValues(Object.fromEntries(key.split(',').map((property) => [property, style.getPropertyValue(property).trim()])));
    },
    [key],
  );

  return { measure, values };
}
